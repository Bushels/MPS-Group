'use client';

import { Activity, Battery, Signal } from 'lucide-react';
import { useEffect, useState } from 'react';

// Simulated Graph Component
const LiveGraph = ({
  color,
  label,
  value,
  unit,
}: {
  color: string;
  label: string;
  value: number;
  unit: string;
}) => {
  const [dataPoints, setDataPoints] = useState<number[]>(Array(20).fill(50));

  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints((prev) => {
        const next = [...prev.slice(1), Math.random() * 40 + 30]; // Random value between 30-70
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-lg border border-white/5 bg-black/40 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
          {label}
        </span>
        <span className={`font-mono text-xl font-bold text-${color}-500`}>
          {value}
          <span className="text-xs text-slate-600">{unit}</span>
        </span>
      </div>

      {/* Graph Visualization */}
      <div className="flex h-12 items-end gap-1">
        {dataPoints.map((point, i) => (
          <div
            key={i}
            className={`w-full rounded-t-sm bg-${color}-500/20 transition-all duration-300`}
            style={{ height: `${point}%` }}
          >
            <div className={`h-1 w-full bg-${color}-500 opacity-50`}></div>
          </div>
        ))}
      </div>

      {/* Scanline Overlay */}
      <div className="animate-scan-fast pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-white/5 to-transparent opacity-20"></div>
    </div>
  );
};

const WellFiDashboard = () => {
  return (
    <div className="bg-hud-bg/80 relative w-full overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
          </div>
          <span className="font-mono text-xs font-bold tracking-widest text-green-500 uppercase">
            Link Established
          </span>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
          <div className="flex items-center gap-1">
            <Signal className="h-3 w-3" /> -82dBm
          </div>
          <div className="flex items-center gap-1">
            <Battery className="h-3 w-3" /> 98%
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-4 p-6">
        {/* Live Graphs */}
        <div className="grid gap-4 sm:grid-cols-2">
          <LiveGraph color="red" label="Bottom Hole Temp" value={142} unit="°C" />
          <LiveGraph color="blue" label="Wellbore Pressure" value={1.59} unit="MPa" />
        </div>

        {/* Data Stream Log */}
        <div className="rounded-lg border border-white/5 bg-black/60 p-4 font-mono text-[10px] text-green-500/80">
          <div className="mb-2 flex items-center justify-between border-b border-white/5 pb-2 text-slate-600">
            <span>DATA_STREAM_LOG</span>
            <Activity className="h-3 w-3 animate-pulse" />
          </div>
          <div className="h-24 space-y-1 overflow-hidden opacity-70">
            <div className="animate-pulse truncate">RX: [10110] BHT_UPDATE: 142.1C ... OK</div>
            <div className="truncate opacity-50">RX: [10111] PRESS_UPDATE: 42.51MPa ... OK</div>
            <div className="truncate opacity-30">TX: [01100] SYNC_ACK ... SENT</div>
            <div className="truncate opacity-20">RX: [10100] BHT_UPDATE: 142.0C ... OK</div>
            <div className="truncate opacity-10">SYS: WATCHDOG_TIMER ... RESET</div>
          </div>
        </div>
      </div>

      {/* Footer Status */}
      <div className="border-t border-white/10 bg-white/5 px-6 py-3 text-center">
        <p className="text-[10px] tracking-[0.2em] text-slate-500 uppercase">
          WellFi Telemetry System v2.4
        </p>
      </div>
    </div>
  );
};

export default WellFiDashboard;
