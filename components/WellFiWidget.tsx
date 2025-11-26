'use client';

import { Activity, Wifi, Zap } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function WellFiWidget() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className="group relative flex h-96 w-96 items-center justify-center outline-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* --- HOLOGRAPHIC EMITTER BASE --- */}

      {/* 1. Outer Glow Ring (Static base) */}
      <div className="absolute inset-0 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm transition-all duration-700 group-hover:border-cyan-500/40 group-hover:bg-cyan-500/10"></div>

      {/* 2. Rotating Data Rings */}
      <div className="absolute inset-2 animate-[spin_10s_linear_infinite] rounded-full border border-dashed border-cyan-500/30 opacity-40 transition-opacity duration-500 group-hover:opacity-80"></div>
      <div className="absolute inset-6 animate-[spin_15s_linear_infinite_reverse] rounded-full border border-dotted border-cyan-400/30 opacity-40 transition-opacity duration-500 group-hover:opacity-80"></div>

      {/* 3. Pulsing Signal Waves (The "Wireless" effect) */}
      {/* Wave 1 */}
      <div className="absolute inset-0 -z-10 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full border border-cyan-500/30 opacity-0"></div>
      {/* Wave 2 (Delayed) */}
      <div className="absolute inset-0 -z-10 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full border border-cyan-500/20 opacity-0 delay-700"></div>

      {/* 4. Orbiting Data Particles */}
      <div className="absolute inset-0 animate-[spin_8s_linear_infinite]">
        <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
      </div>
      <div className="absolute inset-0 animate-[spin_12s_linear_infinite_reverse]">
        <div className="absolute top-1/2 -right-1 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
      </div>

      {/* --- CORE CONTENT --- */}
      <div className="relative z-10 flex h-80 w-80 items-center justify-center rounded-full bg-black shadow-2xl transition-transform duration-500 group-hover:scale-110">
        {/* Logo */}
        <div className="relative h-64 w-80 transition-all duration-500 group-hover:brightness-125">
          <Image
            src="/images/wellfi-logo.png"
            alt="WellFi Logo"
            fill
            className="object-contain"
            quality={100}
            priority
          />
        </div>
      </div>

      {/* --- FLOATING METRICS (Appear on Hover) --- */}
      <div
        className={`absolute top-0 -right-16 transition-all duration-500 ${
          isHovered ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
        }`}
      >
        <div className="flex items-center gap-2 rounded border border-cyan-500/30 bg-black/60 px-3 py-1.5 backdrop-blur-md">
          <Wifi className="h-3 w-3 animate-pulse text-cyan-400" />
          <span className="font-mono text-[10px] font-bold text-cyan-100">SIGNAL: 100%</span>
        </div>
      </div>

      <div
        className={`absolute bottom-4 -left-16 transition-all delay-100 duration-500 ${
          isHovered ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
        }`}
      >
        <div className="flex items-center gap-2 rounded border border-red-500/30 bg-black/60 px-3 py-1.5 backdrop-blur-md">
          <Zap className="h-3 w-3 text-red-400" />
          <span className="font-mono text-[10px] font-bold text-red-100">PWR: N/A</span>
        </div>
      </div>

      <div
        className={`absolute -right-12 bottom-0 transition-all delay-200 duration-500 ${
          isHovered ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
        }`}
      >
        <div className="flex items-center gap-2 rounded border border-green-500/30 bg-black/60 px-3 py-1.5 backdrop-blur-md">
          <Activity className="h-3 w-3 text-green-400" />
          <span className="font-mono text-[10px] font-bold text-green-100">DATA: LIVE</span>
        </div>
      </div>
    </button>
  );
}
