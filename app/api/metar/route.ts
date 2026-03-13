// app/api/metar/route.ts
import { NextResponse } from 'next/server';

// Usa variável de ambiente (segurança) ou fallback (só para dev local)
const CHECKWX_API_KEY = process.env.CHECKWX_API_KEY || '99de521b4a8c4b04aad9736116a6eb83';

// Headers CORS para permitir chamadas do seu frontend
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const icao = searchParams.get('icao')?.toUpperCase().trim();
  const hours = searchParams.get('hours') || '72';
  
  if (!icao || icao.length !== 4) {
    return NextResponse.json(
      { error: 'ICAO code required (4 characters)' }, 
      { status: 400, headers: corsHeaders }
    );
  }
  
  try {
    // CORREÇÃO CRÍTICA: Removido espaço após a barra na URL
    const checkwxUrl = `https://api.checkwx.com/metar/${icao}/decoded?x-api-key=${CHECKWX_API_KEY}&hours=${hours}`;
    
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // 8s timeout
    
    const response = await fetch(checkwxUrl, {
      headers: { 'Accept': 'application/json' },
      signal: controller.signal,
      next: { revalidate: 60 }
    });
    
    clearTimeout(timeout);
    
    if (response.ok) {
      const data = await response.json();
      return NextResponse.json({
        source: 'checkwx',
        icao,
        data: data.data || [],
        timestamp: new Date().toISOString()
      }, { headers: corsHeaders });
    }
    
    throw new Error(`CheckWX failed: ${response.status}`);
    
  } catch (error) {
    console.log(`CheckWX failed for ${icao}, trying NOAA...`);
    
    try {
      // CORREÇÃO CRÍTICA: Removido espaço após a barra na URL
      const noaaUrl = `https://tgftp.nws.noaa.gov/data/observations/metar/stations/${icao}.TXT`;
      
      const controller = new AbortController();
