'use client';

import dynamic from 'next/dynamic';

const PipeBackground = dynamic(() => import('./PipeBackground'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-[#050505]">
      <div className="h-1 w-32 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-full origin-left scale-x-50 animate-pulse bg-[#D32F2F]"></div>
      </div>
    </div>
  ),
});

export default function PipeBackgroundClient() {
  return <PipeBackground />;
}
