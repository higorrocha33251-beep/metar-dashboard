import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin } from 'lucide-react';
import { CITIES } from '../../lib/cities';
import MetarChart from '../../components/MetarChart';

export default function CityDetail({ params }: { params: { icao: string } }) {
  const city = CITIES.find(c => c.icao === params.icao.toUpperCase());
  
  if (!city) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 mb-6">
          <ArrowLeft size={20} />
          <span>Voltar ao Dashboard</span>
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="text-cyan-400" size={28} />
            <h1 className="text-4xl font-bold text-white">{city.name}</h1>
          </div>
          <p className="text-xl text-slate-400">{city.region}</p>
          <div className="flex gap-4 mt-4 text-sm">
            <a href={city.noaaUrl} target="_blank" rel="noopener noreferrer"
               className="text-cyan-400 hover:underline">Fonte NOAA →</a>
            <a href={city.windyUrl} target="_blank" rel="noopener noreferrer"
               className="text-cyan-400 hover:underline">Windy.com →</a>
            <a href={city.wundergroundUrl} target="_blank" rel="noopener noreferrer"
               className="text-cyan-400 hover:underline">Weather Underground →</a>
          </div>
        </div>

        <MetarChart icao={city.icao} />
      </div>
    </main>
  );
}
