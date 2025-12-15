'use client';

import CareerPortal from '@/components/CareerPortal';

import WellFiDashboard from '@/components/WellFiDashboard';
import WellFiWidget from '@/components/WellFiWidget';
import { useInView } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  Anchor,
  ArrowRight,
  ChevronRight,
  Clock,
  Container,
  Facebook,
  Flame,
  GitMerge,
  Instagram,
  Linkedin,
  Mail,
  Map,
  MapPin,
  Menu,
  Phone,
  Printer,
  Scan,
  Settings,
  ShieldCheck,
  Truck,
  Twitter,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import AnimatedLogo from '../components/AnimatedLogo';

// --- HELPER COMPONENTS ---

// 1. Reusable Glass Card
const GlassCard = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`relative overflow-hidden rounded-xl border border-white/10 bg-[#0A0F1E]/60 p-6 shadow-2xl backdrop-blur-md ${className}`}
  >
    {children}
  </div>
);

// 2. Animated Stats Widget (Counts up when visible)
interface StatsWidgetProps {
  icon: LucideIcon;
  value: number;
  label: string;
  unit?: string;
  color: 'red' | 'blue';
  decimals?: number;
}

const StatsWidget = ({ icon: Icon, value, label, unit, color, decimals = 0 }: StatsWidgetProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Simple count-up effect on mount
  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value, isInView]);

  return (
    <div ref={ref} className="h-full">
      <GlassCard className="group flex h-full flex-col justify-between transition-colors hover:border-white/20">
        <div
          className={`mb-4 w-fit rounded-lg p-3 ${color === 'red' ? 'bg-red-600/10 text-red-600' : 'bg-blue-600/20 text-blue-500'}`}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <div className="mb-1 font-mono text-3xl font-bold tracking-tighter text-white">
            {count.toLocaleString(undefined, { maximumFractionDigits: decimals })}
            {unit && <span className="ml-1 text-lg text-slate-500">{unit}</span>}
          </div>
          <div className="text-xs font-medium tracking-widest text-slate-400 uppercase">
            {label}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

// 3. Holographic Marker for Hero Animation
const HolographicMarker = ({
  top,
  left,
  label,
  details = [],
  delay = 0,
}: {
  top: string;
  left: string;
  label: string;
  details?: string[];
  delay?: number;
}) => (
  <div className="absolute z-20" style={{ top, left }}>
    {/* Float Animation Wrapper */}
    <div className="relative animate-[float_4s_ease-in-out_infinite]">
      {/* 1. Target Reticle */}
      <div className="absolute -top-3 -left-3 h-6 w-6">
        <div className="absolute inset-0 animate-ping rounded-full bg-red-500/50 opacity-75"></div>
        <div className="absolute inset-0 animate-[spin-slow_4s_linear_infinite] rounded-full border border-dashed border-red-500"></div>
        <div className="absolute inset-2 rounded-full bg-red-500"></div>
      </div>

      {/* 2. Connecting Line */}
      <div
        className="absolute top-3 left-3 h-12 w-12 border-t border-l border-red-500/50"
        style={{ transform: 'skewX(-20deg)' }}
      ></div>

      {/* 3. Data Card */}
      <div
        className="absolute top-8 left-16 w-48 overflow-hidden rounded-sm border-l-2 border-red-500 bg-black/80 p-3 backdrop-blur-md"
        style={{ animation: `fadeIn 0.5s ease-out ${delay}s backwards` }}
      >
        {/* Scanline Effect */}
        <div className="animate-scan-fast absolute inset-0 z-0 bg-gradient-to-b from-transparent via-red-500/10 to-transparent"></div>

        {/* Content */}
        <div className="relative z-10">
          <div className="mb-1 text-[10px] font-bold tracking-widest text-red-500 uppercase">
            {label}
          </div>
          {details.map((detail, i) => (
            <div key={i} className="flex justify-between font-mono text-[9px] text-slate-300">
              <span>{detail.split(':')[0]}</span>
              <span className="text-white">{detail.split(':')[1]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN PAGE COMPONENT ---

function HomeContent() {
  const searchParams = useSearchParams();
  const isEmbedded = searchParams.get('embed') === 'true';

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-hud-bg relative min-h-screen overflow-x-hidden font-sans text-slate-100 selection:bg-red-600/30">
      {/* --- GLOBAL STYLES (For custom animations not in Tailwind) --- */}
      <style jsx global>{`
        @keyframes scan-vertical {
          0% {
            top: -10%;
          }
          100% {
            top: 110%;
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes scan-fast {
          0% {
            top: -100%;
          }
          100% {
            top: 200%;
          }
        }
        .animate-scan-fast {
          animation: scan-fast 2s linear infinite;
        }
        .laser-beam {
          animation: scan-vertical 4s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
        }
        .pipe-gloss-reveal {
          animation: scan-vertical 4s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
        }
        .pipe-texture {
          background-image: repeating-linear-gradient(
            90deg,
            transparent 0px,
            transparent 40px,
            rgba(0, 0, 0, 0.8) 40px,
            rgba(0, 0, 0, 0.8) 42px
          );
          background-size: 100% 100%;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
          will-change: transform;
        }
        @keyframes scan-overlay {
          0% {
            top: -100%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 200%;
            opacity: 0;
          }
        }
        .animate-scan-overlay {
          animation: scan-overlay 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* --- UTILITY TOP BAR --- */}
      {!isEmbedded && (
        <div className="relative z-50 hidden items-center justify-between border-b border-white/5 bg-[#0a0a0a] px-6 py-2 font-mono text-[10px] tracking-wider text-slate-400 lg:flex">
          <div className="flex items-center gap-6">
            <span className="flex cursor-pointer items-center gap-2 transition-colors hover:text-white">
              <Phone className="h-3 w-3" /> (780) 594 8100
            </span>
            <span className="flex cursor-pointer items-center gap-2 transition-colors hover:text-white">
              <Printer className="h-3 w-3" /> (780) 594 8101
            </span>
            <span className="flex cursor-pointer items-center gap-2 transition-colors hover:text-white">
              <Mail className="h-3 w-3" /> info@mpsgroup.ca
            </span>
            <span className="flex cursor-pointer items-center gap-2 transition-colors hover:text-white">
              <Clock className="h-3 w-3" /> Mon-Fri: 8am - 5pm
            </span>
            <span className="flex cursor-pointer items-center gap-2 transition-colors hover:text-white">
              <MapPin className="h-3 w-3" /> Pierceland, SK (HQ)
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 transition-colors hover:text-red-600">
              <ShieldCheck className="h-3 w-3" /> CLIENT PORTAL LOGIN
            </button>
          </div>
        </div>
      )}

      {/* --- MAIN NAVIGATION --- */}
      {!isEmbedded && (
        <nav
          className={`fixed right-0 left-0 z-40 transition-all duration-500 ${scrolled ? 'bg-hud-bg/90 top-0 border-b border-white/10 py-3 backdrop-blur-xl' : 'top-8 bg-transparent py-6'}`}
        >
          <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6">
            {/* Logo Area */}
            <div className="group flex cursor-pointer items-center gap-3">
              <AnimatedLogo />
            </div>

            {/* Main Links */}
            <div className="hidden items-center gap-10 lg:flex">
              {['Services', 'Products', 'Careers'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-xs font-bold tracking-widest text-slate-300 uppercase transition-colors hover:text-red-600"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden items-center gap-6 lg:flex">
              <button className="rounded bg-red-700 px-6 py-3 text-xs font-bold tracking-widest text-white uppercase shadow-lg shadow-red-900/20 transition-all hover:bg-red-800">
                Contact Us
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white lg:hidden"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
      )}

      {/* --- HERO SECTION --- */}
      <section
        id="home"
        className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-20"
      >
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.png"
            alt="MPS Pipe Yard"
            fill
            className="object-cover object-center"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/90"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center opacity-30"></div>

          {/* Holographic Markers */}
          <HolographicMarker
            top="20%"
            left="25%"
            label="PIPE BATCH #A-492"
            details={['OD: 7.00"', 'GRADE: L80', 'THREAD: BTC']}
            delay={1}
          />
          <HolographicMarker
            top="25%"
            left="55%"
            label="INSPECTION STATUS"
            details={['VISUAL: PASS', 'EMI: PASS', 'ULTRASONIC: OK']}
            delay={1.5}
          />
          <HolographicMarker
            top="15%"
            left="75%"
            label="LOGISTICS DATA"
            details={['DEST: CONKLIN', 'ETA: 24HRS']}
            delay={2}
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left Column: Typography & CTA */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded border border-red-500/30 bg-red-500/10 px-3 py-1 text-[10px] font-bold tracking-widest text-red-500 uppercase backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                </span>
                System Online
              </div>

              <h1 className="text-5xl leading-none font-black tracking-tighter text-white md:text-7xl lg:text-8xl">
                CELEBRATING <br />
                <span className="bg-linear-to-r from-white via-slate-400 to-slate-600 bg-clip-text text-transparent">
                  20 YEARS.
                </span>
              </h1>

              <p className="max-w-xl text-lg leading-relaxed text-slate-400">
                136 Acres of industrial capacity. To celebrate our 20th anniversary, we are offering{' '}
                <span className="font-bold text-white">zero storage fees</span> for new pipe. The
                future of logistics is transparent.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="#pipevault-signup"
                  className="group flex items-center justify-center gap-3 rounded bg-red-700 px-8 py-4 text-sm font-bold tracking-widest text-white uppercase transition-all hover:bg-red-600 hover:shadow-[0_0_20px_rgba(211,47,47,0.4)]"
                >
                  Request Storage
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="https://maps.app.goo.gl/8vJ8J8J8J8J8J8J8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 rounded border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold tracking-widest text-white uppercase backdrop-blur-sm transition-all hover:bg-white/10"
                >
                  View Facility Map
                  <Map className="h-4 w-4 text-slate-400 transition-colors group-hover:text-white" />
                </a>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 -z-10 h-24 w-24 rounded-full bg-blue-500/20 blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 -z-10 h-32 w-32 rounded-full bg-red-500/20 blur-3xl"></div>
            </div>

            {/* Right Column: HUD */}
            <div className="relative hidden w-full lg:block">
              <GlassCard>
                {/* HUD Content */}
                <div className="space-y-6 p-6">
                  {/* Capacity Visualization */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold tracking-widest uppercase">
                      <span className="text-slate-400">Yard Capacity</span>
                      <span className="text-red-500">92% Reserved</span>
                    </div>
                    <div className="flex h-2 gap-0.5 overflow-hidden rounded-sm bg-slate-900/50">
                      {Array.from({ length: 40 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-full flex-1 ${i < 35 ? 'bg-red-600' : 'bg-slate-800'}`}
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Data Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded border border-white/5 bg-white/5 p-3">
                      <div className="text-[10px] text-slate-500 uppercase">Storage Inquiries</div>
                      <div className="font-mono text-xl font-bold text-white">12</div>
                    </div>
                    <div className="rounded border border-white/5 bg-white/5 p-3">
                      <div className="text-[10px] text-slate-500 uppercase">Active Racks</div>
                      <div className="font-mono text-xl font-bold text-white">843</div>
                    </div>
                  </div>

                  {/* System Message */}
                  <div className="flex items-center gap-3 rounded border border-green-500/20 bg-green-500/10 p-3">
                    <Scan className="h-4 w-4 animate-pulse text-green-500" />
                    <span className="font-mono text-xs text-green-400">
                      20th Anniversary Promo: ACTIVE
                    </span>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Mobile Only Status Bar */}
            <div className="lg:hidden">
              <div className="flex items-center justify-between rounded border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 animate-ping rounded-full bg-green-500 opacity-75"></div>
                    <div className="relative h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-xs font-bold tracking-widest text-white uppercase">
                    Yard Status: Active
                  </span>
                </div>
                <span className="font-mono text-xs text-slate-400">92% Full</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS STRIP --- */}
      <section className="relative z-20 border-b border-white/5 bg-[#080808] px-6 py-24">
        <div className="mx-auto grid max-w-[1400px] gap-6 md:grid-cols-3">
          <StatsWidget icon={Anchor} value={3148512} label="Lbs Steel Fabricated" color="red" />
          <StatsWidget
            icon={Container}
            value={204765}
            label="Active Inventory"
            unit="lbs"
            color="blue"
          />
          <StatsWidget
            icon={Truck}
            value={1.2}
            label="Avg Trucks per Week"
            decimals={1}
            color="red"
          />
        </div>
      </section>

      {/* --- PARTNER MARQUEE --- */}
      <section className="relative overflow-hidden border-b border-white/5 bg-[#0a0a0a] py-16">
        <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]"></div>
        <div className="relative z-20 mx-auto mb-8 max-w-[1400px] px-6 text-center">
          <p className="text-xs font-bold tracking-widest text-slate-500 uppercase">
            Trusted By Industry Leaders
          </p>
        </div>

        <div className="animate-marquee flex w-max items-center gap-12 px-4 md:gap-24 md:px-12">
          {[
            { name: 'Cenovus', logo: '/images/partners/cenovus.png' },
            { name: 'Canadian Natural', logo: '/images/partners/cnrl.png' },
            { name: 'Strathcona', logo: '/images/partners/strathcona.png' },
            { name: 'Imperial', logo: '/images/partners/imperial.png' },
            { name: 'Cenovus', logo: '/images/partners/cenovus.png' },
            { name: 'Canadian Natural', logo: '/images/partners/cnrl.png' },
            { name: 'Strathcona', logo: '/images/partners/strathcona.png' },
            { name: 'Imperial', logo: '/images/partners/imperial.png' },
            { name: 'Cenovus', logo: '/images/partners/cenovus.png' },
            { name: 'Canadian Natural', logo: '/images/partners/cnrl.png' },
            { name: 'Strathcona', logo: '/images/partners/strathcona.png' },
            { name: 'Imperial', logo: '/images/partners/imperial.png' },
            { name: 'Cenovus', logo: '/images/partners/cenovus.png' },
            { name: 'Canadian Natural', logo: '/images/partners/cnrl.png' },
            { name: 'Strathcona', logo: '/images/partners/strathcona.png' },
            { name: 'Imperial', logo: '/images/partners/imperial.png' },
          ].map((partner, i) => (
            <div
              key={i}
              className="relative h-12 w-32 opacity-50 grayscale transition-all duration-500 hover:scale-110 hover:opacity-100 hover:grayscale-0 md:h-12 md:w-48"
            >
              <Image src={partner.logo} alt={partner.name} fill className="object-contain" />
            </div>
          ))}
        </div>
      </section>

      {/* --- DIVISIONS GRID --- */}
      <section id="services" className="relative px-6 py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <h2 className="mb-4 text-4xl font-bold text-white">Divisions of Excellence</h2>
              <p className="max-w-xl text-slate-400">
                Integrated industrial services designed to reduce downtime and maximize asset
                lifespan.
              </p>
            </div>
            <button className="flex items-center gap-2 text-sm font-bold tracking-widest text-red-500 uppercase transition-colors hover:text-white">
              View All Capabilities <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Service Grid */}
          <div className="mb-12 grid gap-6 md:grid-cols-2">
            {/* Fabrication */}
            <GlassCard className="group cursor-pointer transition-all hover:border-red-500/30 hover:bg-white/5">
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <Image
                  src="/images/fabrication-bg.jpg"
                  alt="Fabrication"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0A0F1E] via-[#0A0F1E]/80 to-[#0A0F1E]/40"></div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="mb-6 flex items-start justify-between">
                  <div className="w-fit rounded-lg bg-red-900/10 p-4 text-red-600 transition-colors group-hover:bg-red-600 group-hover:text-white">
                    <Flame className="h-8 w-8" />
                  </div>
                  <div className="flex items-center gap-2 rounded border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-md">
                    <Activity className="h-3 w-3 text-green-500" />
                    <div className="flex flex-col text-right">
                      <span className="mb-0.5 text-[9px] leading-none tracking-widest text-slate-500 uppercase">
                        Shop Load
                      </span>
                      <span className="text-[10px] leading-none font-bold text-white">
                        84% OPTIMAL
                      </span>
                    </div>
                  </div>
                </div>
                <h3 className="mb-2 text-2xl font-bold text-white">Fabrication</h3>
                <p className="mb-6 text-sm leading-relaxed text-slate-400 transition-colors group-hover:text-slate-200">
                  Large-scale structural steel processing with PythonX robotics. CWB Division 2
                  Certified.
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-red-500 transition-transform group-hover:translate-x-2">
                  View Capacity <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </GlassCard>

            {/* Modular */}
            <GlassCard className="group cursor-pointer transition-all hover:border-blue-500/30 hover:bg-white/5">
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <Image
                  src="/images/modular-bg.jpg"
                  alt="Modular Assembly"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0A0F1E] via-[#0A0F1E]/80 to-[#0A0F1E]/40"></div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="mb-6 w-fit rounded-lg bg-blue-900/10 p-4 text-blue-500 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <Container className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-white">Modular Assembly</h3>
                <p className="mb-6 text-sm leading-relaxed text-slate-400 transition-colors group-hover:text-slate-200">
                  100-acre assembly yard for mega-modules. Full logistics and load-out support.
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-blue-500 transition-transform group-hover:translate-x-2">
                  View Yard Specs <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </GlassCard>

            {/* Pipefitting */}
            <GlassCard className="group cursor-pointer transition-all hover:border-blue-500/30 hover:bg-white/5">
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <Image
                  src="/images/pipefitting-bg.jpg"
                  alt="Pipefitting"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0A0F1E] via-[#0A0F1E]/80 to-[#0A0F1E]/40"></div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="mb-6 w-fit rounded-lg bg-blue-900/10 p-4 text-blue-500 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <GitMerge className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-white">Pipefitting</h3>
                <p className="mb-6 text-sm leading-relaxed text-slate-400 transition-colors group-hover:text-slate-200">
                  ABSA certified pressure piping. Field installation and facility tie-ins.
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-blue-500 transition-transform group-hover:translate-x-2">
                  View Certs <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </GlassCard>

            {/* Machining */}
            <GlassCard className="group cursor-pointer transition-all hover:border-blue-500/30 hover:bg-white/5">
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <Image
                  src="/images/machining-bg.jpg"
                  alt="Machining"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0A0F1E] via-[#0A0F1E]/80 to-[#0A0F1E]/40"></div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="mb-6 w-fit rounded-lg bg-blue-900/10 p-4 text-blue-500 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <Settings className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-white">Machining</h3>
                <p className="mb-6 text-sm leading-relaxed text-slate-400 transition-colors group-hover:text-slate-200">
                  Precision CNC machining for custom components, flange facing, and repair.
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-blue-500 transition-transform group-hover:translate-x-2">
                  View Capabilities <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </GlassCard>
          </div>

          {/* --- CERTIFICATIONS & COMPLIANCE --- */}
          <div className="mt-20 border-t border-white/5 pt-20">
            <div className="mb-12 text-center">
              <h2 className="mb-8 text-xs font-bold tracking-widest text-slate-500 uppercase">
                Certifications & Compliance
              </h2>
              <div className="flex flex-wrap justify-center gap-12 opacity-60 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0">
                {[
                  { name: 'ACSA', logo: '/images/certifications/acsa.png' },
                  { name: 'ComplyWorks', logo: '/images/certifications/complyworks.png' },
                  { name: 'CQN', logo: '/images/certifications/cqn.jpg' },
                  { name: 'ISN', logo: '/images/certifications/isn.png' },
                ].map((cert) => (
                  <div key={cert.name} className="relative h-16 w-32">
                    <Image src={cert.logo} alt={cert.name} fill className="object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* --- DOWNHOLE TECHNOLOGIES --- */}
          <div
            id="products"
            className="mt-32 mb-12 flex scroll-mt-24 items-end justify-between border-t border-white/5 pt-20"
          >
            <div>
              <h2 className="mb-4 text-4xl font-bold text-white">Downhole Technologies</h2>
              <p className="max-w-xl text-slate-400">
                Advanced telemetry and wireless monitoring solutions for the modern wellbore.
              </p>
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-12">
            {/* Left: Content */}
            <div className="lg:col-span-5">
              <div className="mb-12 flex justify-center lg:justify-start">
                <WellFiWidget />
              </div>
              <p className="mb-8 font-mono text-xs tracking-widest text-slate-500 uppercase">
                Wireless Downhole Intelligence
              </p>

              <p className="mb-8 text-lg leading-relaxed text-slate-300">
                Real-time telemetry for critical operations. Transmitting{' '}
                <span className="font-bold text-white">Downhole Temperature</span> and{' '}
                <span className="font-bold text-white">Pressure</span> data instantly, no strings
                attached.
              </p>

              <button className="group flex w-full items-center justify-between rounded border border-white/10 bg-white/5 px-6 py-4 transition-all hover:bg-white/10">
                <span className="text-xs font-bold tracking-widest text-white uppercase">
                  View Tech Specs
                </span>
                <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Right: Live Dashboard UI */}
            <div className="lg:col-span-7">
              <WellFiDashboard />
            </div>
          </div>
        </div>
      </section>

      {/* --- CAREERS SECTION --- */}
      <CareerPortal />

      {/* --- FOOTER --- */}
      <footer className="relative z-10 border-t border-white/10 bg-black px-6 pt-20 pb-10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-8 md:flex-row">
          <p className="text-xs tracking-widest text-slate-600 uppercase">
            © 2025 MPS Group. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            {[
              { icon: Facebook, href: '#' },
              { icon: Linkedin, href: '#' },
              { icon: Twitter, href: '#' },
              { icon: Instagram, href: '#' },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                className="text-slate-600 transition-colors hover:text-white"
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080808]" />}>
      <HomeContent />
    </Suspense>
  );
}
