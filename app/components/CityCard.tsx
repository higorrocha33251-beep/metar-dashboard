'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Wind, Thermometer, Clock, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { City } from '../lib/cities';

interface WeatherData {
  temp: number;
  tempC: number;
  windSpeed: number;
  windGust: number | null;
  windDirection: number;
  pressure: number;
  observed: string;
  raw?: string;
}

export default function CityCard({ city }: { city: City }) {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [countdown, setCountdown] = useState(60);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/metar?icao=${city.icao}&hours=1`);
      const json = await res.json();
      
      if (json.data && json.data.length > 0) {
        const latest = json.data[0];
        setData({
          temp: latest.temperature?.fahrenheit || 0,
          tempC: latest.temperature?.celsius || 0,
          windSpeed: latest.wind?.speed_kts || 0,
          windGust: latest.wind?.gust_kts || null,
          windDirection: latest.wind?.direction || 0,
          pressure: latest.barometer?.hg || 0,
          observed: latest.observed,
          raw: latest.raw_text
        });
      }
      setLastUpdate(new Date());
      setCountdown(60);
    } catch (error) {
      console.error('Error fetching', city.icao, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    
    const timer = setInterval(() => {
      setCountdown(prev => prev > 0 ? prev - 1 : 60);
    }, 1000);
    
    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, [city.icao]);

  if (loading) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-48 animate-pulse">
        <div className="h-4 bg-slate-800 rounded w-3/4 mb-4"></div>
        <div className="h-8 bg-slate-800 rounded w-1/2"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-slate-900 border border-red-900/50 rounded-xl p-6">
        <h3 className="text-red-400 font-bold">{city.name}</h3>
        <p className="text-slate-500 text-sm">Dados indisponíveis</p>
      </div>
    );
  }

  const tempColor = data.temp > 80 ? 'text-orange-500' : 
                    data.temp > 60 ? 'text-yellow-500' : 
                    data.temp > 40 ? 'text-blue-400' : 'text-cyan-400';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition-colors group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
            {city.name}
          </h3>
          <p className="text-slate-400 text-sm">{city.region}</p>
          <p className="text-slate-600 text-xs font-mono mt-1">{city.icao}</p>
        </div>
        <a href={city.noaaUrl} target="_blank" rel="noopener noreferrer" 
           className="text-slate-500 hover:text-cyan-400 transition-colors" title="Ver fonte NOAA">
          <ExternalLink size={16} />
        </a>
      </div>

      <div className="flex items-baseline gap-2 mb-4">
        <span className={`text-6xl font-bold ${tempColor} tracking-tighter`}>
          {Math.round(data.temp)}°
        </span>
        <span className="text-slate-500 text-2xl">F</span>
        <span className="text-slate-600 text-lg ml-2">({data.tempC}°C)</span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center gap-2 text-slate-400">
          <Wind size={16} className="text-cyan-500" />
          <span>{data.windSpeed}kt {data.windGust && `(G${data.windGust}kt)`}
            <span className="text-slate-600 ml-1">/ {data.windDirection}°</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <Thermometer size={16} className="text-cyan-500" />
          <span>{data.pressure.toFixed(2)} inHg</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-800 pt-4">
        <div className="flex items-center gap-2">
          <Clock size={12} />
          <span>{format(new Date(data.observed), 'HH:mm')} local</span>
        </div>
        <div className="flex items-center gap-2">
          <RefreshCw size={12} className={countdown < 10 ? 'animate-spin text-cyan-400' : ''} />
          <span>Próx: {countdown}s</span>
        </div>
      </div>

      <Link href={`/city/${city.icao}`} 
            className="mt-4 block w-full py-2 bg-slate-800 hover:bg-cyan-900/30 text-cyan-400 text-center rounded-lg text-sm font-medium transition-colors">
        Ver Histórico 72h →
      </Link>
    </div>
  );
}
