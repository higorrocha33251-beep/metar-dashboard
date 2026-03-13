'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { format } from 'date-fns';

interface ChartData {
  time: string;
  temp: number;
  wind: number;
  gust: number | null;
  pressure: number;
}

export default function MetarChart({ icao }: { icao: string }) {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`/api/metar?icao=${icao}&hours=72`);
        const json = await res.json();
        
        if (json.data) {
          const formatted = json.data.map((item: any) => ({
            time: format(new Date(item.observed), 'dd/MM HH:mm'),
            temp: item.temperature?.fahrenheit || 0,
            wind: item.wind?.speed_kts || 0,
            gust: item.wind?.gust_kts || null,
            pressure: item.barometer?.hg || 0
          })).reverse();
          
          setData(formatted);
        }
      } catch (error) {
        console.error('Error fetching history', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHistory();
  }, [icao]);

  if (loading) return <div className="h-96 bg-slate-900 animate-pulse rounded-xl"></div>;

  const stats = {
    max: Math.max(...data.map(d => d.temp)),
    min: Math.min(...data.map(d => d.temp)),
    avg: (data.reduce((acc, d) => acc + d.temp, 0) / data.length).toFixed(1),
    maxWind: Math.max(...data.map(d => d.wind))
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
          <p className="text-slate-500 text-xs uppercase tracking-wider">Máxima 72h</p>
          <p className="text-2xl font-bold text-orange-500">{stats.max}°F</p>
        </div>
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
          <p className="text-slate-500 text-xs uppercase tracking-wider">Mínima 72h</p>
          <p className="text-2xl font-bold text-cyan-400">{stats.min}°F</p>
        </div>
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
          <p className="text-slate-500 text-xs uppercase tracking-wider">Média</p>
          <p className="text-2xl font-bold text-yellow-500">{stats.avg}°F</p>
        </div>
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
          <p className="text-slate-500 text-xs uppercase tracking-wider">Max Vento</p>
          <p className="text-2xl font-bold text-blue-400">{stats.maxWind}kt</p>
        </div>
      </div>

      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
        <h3 className="text-white font-bold mb-4">Temperatura (72h)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#475569" fontSize={12} interval="preserveStartEnd" />
              <YAxis stroke="#475569" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }} />
              <Area type="monotone" dataKey="temp" stroke="#f97316" fillOpacity={1} fill="url(#tempGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
        <h3 className="text-white font-bold mb-4">Vento (nós)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#475569" fontSize={12} />
              <YAxis stroke="#475569" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }} />
              <Line type="monotone" dataKey="wind" stroke="#06b6d4" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="gust" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
