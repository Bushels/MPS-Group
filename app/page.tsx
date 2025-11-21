'use client';

import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  AlertCircle,
  Anchor,
  ArrowRight,
  CheckCircle,
  ChevronRight,
  Container,
  Cpu,
  Database,
  Flame,
  GitMerge,
  Layers,
  Mail,
  MapPin,
  Menu,
  Phone,
  Scan,
  Settings,
  ShieldCheck,
  Target,
  Truck,
  Users,
  Wrench,
  X,
} from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

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

  // Simple count-up effect on mount
  useEffect(() => {
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
  }, [value]);

  return (
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
        <div className="text-xs font-medium uppercase tracking-widest text-slate-400">{label}</div>
      </div>
    </GlassCard>
  );
};

// --- MAIN PAGE COMPONENT ---

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050505] font-sans text-slate-100 selection:bg-red-600/30">
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
          animation: marquee 30s linear infinite;
        }
      `}</style>

      {/* --- UTILITY TOP BAR --- */}
      <div className="relative z-50 hidden items-center justify-between border-b border-white/5 bg-[#0a0a0a] px-6 py-2 font-mono text-[10px] tracking-wider text-slate-400 lg:flex">
        <div className="flex items-center gap-6">
          <span className="flex cursor-pointer items-center gap-2 transition-colors hover:text-white">
            <Phone className="h-3 w-3" /> 1-800-MPS-WORK
          </span>
          <span className="flex cursor-pointer items-center gap-2 transition-colors hover:text-white">
            <Mail className="h-3 w-3" /> info@mpsgroup.ca
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

      {/* --- MAIN NAVIGATION --- */}
      <nav
        className={`fixed left-0 right-0 z-40 transition-all duration-500 ${scrolled ? 'top-0 border-b border-white/10 bg-[#050505]/90 py-3 backdrop-blur-xl' : 'top-8 bg-transparent py-6'}`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6">
          {/* Logo Area */}
          <div className="group flex cursor-pointer items-center gap-3">
            <div className="relative flex flex-col justify-center">
              <h1 className="text-3xl font-extrabold leading-none tracking-tighter text-red-700">
                MPS
              </h1>
              <div className="mt-1 h-1 w-full origin-left transform rounded-full bg-blue-700 transition-transform group-hover:scale-x-110"></div>
            </div>
            <div className="mx-2 h-8 w-px bg-white/10"></div>
            <div className="flex flex-col justify-center">
              <span className="block text-sm font-bold leading-none tracking-widest text-white">
                GROUP
              </span>
              <span className="mt-0.5 block text-[9px] uppercase tracking-widest text-slate-400">
                Industrial Services
              </span>
            </div>
          </div>

          {/* Main Links */}
          <div className="hidden items-center gap-10 lg:flex">
            {['Services', 'Products', 'Careers', 'About'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs font-bold uppercase tracking-widest text-slate-300 transition-colors hover:text-red-600"
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden items-center gap-6 lg:flex">
            <button className="rounded bg-red-700 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-red-900/20 transition-all hover:bg-red-800">
              Get a Quote
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

      {/* --- HERO SECTION: THE YARD --- */}
      <section className="relative flex h-screen items-center overflow-hidden bg-[#050505]">
        {/* Background Images & Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 h-full w-full overflow-hidden">
            <Image
              src="/images/shop.png"
              alt="MPS 136 Acre Facility"
              fill
              className="object-cover opacity-40 brightness-50 contrast-125 grayscale"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-[#050505]/80"></div>
        </div>

        {/* Laser Scan Effect */}
        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
          {/* The Red Laser Line */}
          <div className="laser-beam absolute left-0 z-20 h-[2px] w-full bg-red-600 shadow-[0_0_20px_#D32F2F,0_0_40px_#D32F2F]"></div>

          {/* The Reveal Mask */}
          <div className="pipe-gloss-reveal absolute inset-0 z-10 h-[30vh] w-full -translate-y-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent mix-blend-overlay"></div>

          {/* The "Glossy Pipe" Texture that gets revealed */}
          <div className="absolute inset-0 h-full w-full opacity-30 mix-blend-overlay">
            <div className="pipe-texture h-full w-full"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-30 mx-auto grid w-full max-w-[1600px] items-center gap-12 px-6 lg:grid-cols-12">
          {/* Left: The Value Prop */}
          <div className="space-y-8 pt-20 lg:col-span-7">
            <div className="inline-flex animate-pulse items-center gap-3 rounded border border-red-900/50 bg-red-900/20 px-4 py-2 text-xs font-bold uppercase tracking-widest text-red-500">
              <Target className="h-4 w-4" /> Limited Capacity Event
            </div>

            <h1 className="text-7xl font-bold leading-[0.85] tracking-tighter text-white md:text-9xl">
              136 ACRES. <br />
              <span className="text-red-600">$0 STORAGE.</span>
            </h1>

            <p className="max-w-xl border-l-2 border-red-600 pl-6 text-xl leading-relaxed text-slate-300">
              Celebrating 20 years of industrial leadership in the Western Canadian Sedimentary
              Basin.
              <strong className="mt-2 block text-white">Supply Chain Certainty Starts Here.</strong>
            </p>

            {/* The Panic Bar */}
            <div className="group relative mt-8 w-full max-w-xl overflow-hidden rounded-lg border border-white/10 bg-slate-900/80 p-1 backdrop-blur-md">
              <div className="flex flex-col gap-4 p-5">
                <div className="flex items-end justify-between text-xs font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-2 text-slate-400">
                    <AlertCircle className="h-3 w-3 text-red-600" /> Yard Capacity Status
                  </span>
                  <span className="animate-pulse text-sm text-red-500">92% RESERVED</span>
                </div>

                {/* Progress Bar */}
                <div className="relative flex h-6 gap-0.5 overflow-hidden rounded border border-white/5 bg-slate-950 p-0.5">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-full flex-1 rounded-sm transition-all duration-500 ${
                        i < 37 ? 'bg-red-700 shadow-[0_0_10px_#D32F2F]' : 'bg-slate-800'
                      }`}
                    ></div>
                  ))}
                </div>

                <div className="mt-1 flex flex-col items-center justify-between gap-4 sm:flex-row">
                  <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500"></span>3
                    new racks reserved today
                  </div>
                  <button className="flex w-full items-center justify-center gap-2 rounded bg-blue-700 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-blue-900/50 transition-all hover:translate-x-1 hover:bg-blue-600 sm:w-auto">
                    Claim Remaining Space <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: PipeVault HUD */}
          <div className="relative hidden lg:col-span-5 lg:block">
            <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/40 p-1 backdrop-blur-md">
              <div className="flex items-center justify-between rounded-t-lg border-b border-white/10 bg-black/40 p-4">
                <div className="flex items-center gap-2 font-mono text-xs text-red-500">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-red-500"></span>
                  PIPEVAULT™ // LIVE INVENTORY
                </div>
                <Database className="h-4 w-4 text-slate-500" />
              </div>

              <div className="relative overflow-hidden bg-[#0a0f16] p-8 text-center">
                <div className="relative z-10 py-4">
                  <div className="relative mb-6 inline-flex">
                    <div className="absolute inset-0 animate-pulse bg-red-600 opacity-20 blur-xl"></div>
                    <Layers className="relative z-10 h-16 w-16 text-red-600" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-white">Secure Your Pipe.</h3>
                  <p className="mx-auto mb-8 max-w-xs text-sm text-slate-400">
                    Reserve space directly in our PipeVault system. Real-time tracking, zero storage
                    fees.
                  </p>
                  <button className="flex w-full items-center justify-center gap-2 rounded bg-blue-700 py-4 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-blue-900/30 transition-all hover:bg-blue-600 hover:shadow-blue-500/50">
                    View Facility Map <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 bg-black/80 p-4">
                <span className="text-[10px] uppercase tracking-widest text-slate-500">
                  136 Acres Total
                </span>
                <div className="flex items-center gap-2">
                  <Scan className="h-3 w-3 text-red-500" />
                  <span className="text-xs font-bold text-white">Scanning Inventory...</span>
                </div>
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
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]"></div>
        <div className="mx-auto mb-8 max-w-[1400px] px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Trusted by Industry Leaders
          </p>
        </div>
        <div className="flex w-full overflow-hidden">
          <div className="flex min-w-full animate-marquee items-center gap-24 px-12">
            {[
              'CENOVUS',
              'CANADIAN NATURAL',
              'STRATHCONA RESOURCES',
              'IMPERIAL',
              'CENOVUS',
              'CANADIAN NATURAL',
              'STRATHCONA RESOURCES',
              'IMPERIAL',
            ].map((partner, i) => (
              <span
                key={i}
                className="cursor-default select-none whitespace-nowrap font-mono text-2xl font-bold uppercase tracking-tighter text-slate-700 transition-colors hover:text-white"
              >
                {partner}
              </span>
            ))}
          </div>
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
            <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-red-500 transition-colors hover:text-white">
              View All Capabilities <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Service Grid */}
          <div className="mb-12 grid gap-6 md:grid-cols-2">
            {/* Fabrication */}
            <GlassCard className="group cursor-pointer transition-all hover:bg-white/5">
              <div className="mb-6 flex items-start justify-between">
                <div className="w-fit rounded-lg bg-red-900/10 p-4 text-red-600 transition-colors group-hover:bg-red-600 group-hover:text-white">
                  <Flame className="h-8 w-8" />
                </div>
                <div className="flex items-center gap-2 rounded border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-md">
                  <Activity className="h-3 w-3 text-green-500" />
                  <div className="flex flex-col text-right">
                    <span className="mb-0.5 text-[9px] uppercase leading-none tracking-widest text-slate-500">
                      Shop Load
                    </span>
                    <span className="text-[10px] font-bold leading-none text-white">
                      84% OPTIMAL
                    </span>
                  </div>
                </div>
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">Fabrication</h3>
              <p className="mb-6 text-sm leading-relaxed text-slate-400">
                Large-scale structural steel processing with PythonX robotics. CWB Division 2
                Certified.
              </p>
              <div className="flex items-center gap-2 text-sm font-bold text-red-500 transition-transform group-hover:translate-x-2">
                View Capacity <ArrowRight className="h-4 w-4" />
              </div>
            </GlassCard>

            {/* Modular */}
            <GlassCard className="group cursor-pointer transition-all hover:bg-white/5">
              <div className="mb-6 w-fit rounded-lg bg-blue-900/10 p-4 text-blue-500 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                <Container className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">Modular Assembly</h3>
              <p className="mb-6 text-sm leading-relaxed text-slate-400">
                100-acre assembly yard for mega-modules. Full logistics and load-out support.
              </p>
              <div className="flex items-center gap-2 text-sm font-bold text-blue-500 transition-transform group-hover:translate-x-2">
                View Yard Specs <ArrowRight className="h-4 w-4" />
              </div>
            </GlassCard>

            {/* Pipefitting */}
            <GlassCard className="group cursor-pointer transition-all hover:bg-white/5">
              <div className="mb-6 w-fit rounded-lg bg-blue-900/10 p-4 text-blue-500 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                <GitMerge className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">Pipefitting</h3>
              <p className="mb-6 text-sm leading-relaxed text-slate-400">
                ABSA certified pressure piping. Field installation and facility tie-ins.
              </p>
              <div className="flex items-center gap-2 text-sm font-bold text-blue-500 transition-transform group-hover:translate-x-2">
                View Certs <ArrowRight className="h-4 w-4" />
              </div>
            </GlassCard>

            {/* Machining */}
            <GlassCard className="group cursor-pointer transition-all hover:bg-white/5">
              <div className="mb-6 w-fit rounded-lg bg-blue-900/10 p-4 text-blue-500 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                <Settings className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">Machining</h3>
              <p className="mb-6 text-sm leading-relaxed text-slate-400">
                Precision CNC machining for custom components, flange facing, and repair.
              </p>
              <div className="flex items-center gap-2 text-sm font-bold text-blue-500 transition-transform group-hover:translate-x-2">
                View Capabilities <ArrowRight className="h-4 w-4" />
              </div>
            </GlassCard>
          </div>

          {/* Innovation Wing (Downhole) */}
          <div
            id="products"
            className="group relative w-full overflow-hidden rounded-2xl border border-red-900/30 bg-[#0F172A]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,#1e293b_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
            <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-red-600/10 blur-[100px] transition-colors duration-700 group-hover:bg-red-600/20"></div>
            <div className="relative z-10 grid items-center gap-12 p-12 lg:grid-cols-2">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-red-900/30 bg-red-900/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-red-500">
                  <Cpu className="h-4 w-4" /> Product Division
                </div>
                <h3 className="text-4xl font-bold text-white">Downhole Technologies</h3>
                <p className="max-w-md text-lg leading-relaxed text-slate-300">
                  Proprietary engineered systems for the extreme. Our <strong>WellFi™</strong> and{' '}
                  <strong>PipeVault™</strong> product lines deliver zero-failure performance.
                </p>
                <div className="flex gap-4 pt-4">
                  <button className="flex items-center gap-2 rounded bg-white px-8 py-4 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-slate-200">
                    Launch Tool Selector <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="relative flex h-full min-h-[200px] items-center justify-center border-l border-white/5 pl-12">
                <div className="animate-pulse font-mono text-xs tracking-[0.5em] text-red-600">
                  {/* SYSTEM ONLINE */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CAREERS SECTION --- */}
      <section
        id="careers"
        className="relative overflow-hidden border-y border-white/5 bg-[#0a0f16] px-6 py-32"
      >
        <div className="relative z-10 mx-auto grid max-w-[1400px] items-center gap-20 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-500">
              <Users className="h-4 w-4" /> Careers at MPS
            </div>
            <h2 className="mb-6 text-5xl font-bold leading-tight text-white">
              BUILD YOUR <br /> <span className="text-red-600">LEGACY.</span>
            </h2>
            <p className="mb-10 max-w-lg text-lg leading-relaxed text-slate-400">
              MPS Group isn&apos;t just a job; it&apos;s a proving ground. We are looking for
              industrial athletes who thrive in high-stakes environments.
            </p>
            <div className="flex flex-wrap gap-4">
              {['Competitive Rates', 'Long-Term Contracts', 'Advanced Training'].map((perk) => (
                <div
                  key={perk}
                  className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-slate-300"
                >
                  <CheckCircle className="h-3 w-3 text-green-500" /> {perk}
                </div>
              ))}
            </div>
          </div>
          <GlassCard className="relative border-white/10 bg-[#050505]/80 backdrop-blur-xl">
            <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-6">
              <div>
                <h3 className="text-xl font-bold text-white">Priority Openings</h3>
                <p className="mt-1 text-xs uppercase tracking-widest text-slate-500">
                  Pierceland & Field Operations
                </p>
              </div>
              <div className="animate-pulse rounded border border-green-500/20 bg-green-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-green-500">
                Hiring Active
              </div>
            </div>
            <div className="space-y-4">
              <div className="group flex cursor-pointer items-center justify-between rounded-lg border border-transparent p-4 transition-all hover:border-white/5 hover:bg-white/5">
                <div className="flex items-center gap-4">
                  <div className="rounded bg-red-900/10 p-2 text-red-600">
                    <Flame className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white group-hover:text-red-500">
                      B-Pressure Welder
                    </div>
                    <div className="text-[10px] uppercase text-slate-500">Shop & Field</div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-white" />
              </div>
              <div className="group flex cursor-pointer items-center justify-between rounded-lg border border-transparent p-4 transition-all hover:border-white/5 hover:bg-white/5">
                <div className="flex items-center gap-4">
                  <div className="rounded bg-blue-900/10 p-2 text-blue-500">
                    <Wrench className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white group-hover:text-blue-500">
                      Journeyman Pipefitter
                    </div>
                    <div className="text-[10px] uppercase text-slate-500">Pierceland Yard</div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-white" />
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="relative z-10 border-t border-white/10 bg-black px-6 pb-10 pt-20">
        <div className="mx-auto max-w-[1400px] text-center">
          <p className="text-xs uppercase tracking-widest text-slate-600">
            © 2025 MPS Group. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
