import { NextResponse } from 'next/server';

const CHECKWX_API_KEY = '99de521b4a8c4b04aad9736116a6eb83';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const icao = searchParams.get('icao');
  const hours = searchParams.get('hours') || '72';
  
  if (!icao) {
    return NextResponse.json({ error: 'ICAO code required' }, { status: 400 });
  }
  
  try {
    const checkwxUrl = `https://api.checkwx.com/metar/${icao}/decoded?x-api-key=${CHECKWX_API_KEY}&hours=${hours}`;
    
    const response = await fetch(checkwxUrl, {
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 60 }
    });
    
    if (response.ok) {
      const data = await response.json();
      return NextResponse.json({
        source: 'checkwx',
        icao,
        data: data.data || []
      });
    }
    
    throw new Error('CheckWX failed');
    
  } catch (error) {
    try {
      const noaaUrl = `https://tgftp.nws.noaa.gov/data/observations/metar/stations/${icao}.TXT`;
      const response = await fetch(noaaUrl, { next: { revalidate: 300 } });
      const text = await response.text();
      
      return NextResponse.json({
        source: 'noaa',
        icao,
        raw: text
      });
    } catch (noaaError) {
      return NextResponse.json(
        { error: 'Both sources failed' }, 
        { status: 500 }
      );
    }
  }
}
