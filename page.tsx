'use client';

import { CITIES } from './lib/cities';
import CityCard from './components/CityCard';
import { RefreshCw, Radio } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Radio className="text-cyan-400 animate-pulse" size={24} />
            <div>
              <h1 className="text-xl font-bold text-white">METAR Command Center</h1>
              <p className="text-xs text-slate-500">Dados primários METAR/NOAA • Atualização em tempo real</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>CheckWX API Online</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <RefreshCw size={14} />
              <span>Auto-refresh: 60s</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CITIES.map((city) => (
            <CityCard key={city.icao} city={city} />
          ))}
        </div>
      </div>

      <footer className="border-t border-slate-800 mt-12 py-6 text-center text-slate-600 text-sm">
        <p>Fontes: CheckWX API • NOAA TGFTP • AviationWeather.gov</p>
        <p className="mt-1">Dados atualizados diretamente das estações meteorológicas oficiais (METAR)</p>
      </footer>
    </main>
  );
}