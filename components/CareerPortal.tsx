'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Briefcase,
  CheckCircle,
  ChevronDown,
  Clock,
  ExternalLink,
  Filter,
  HardHat,
  MapPin,
  Search,
  Sparkles,
  TrendingUp,
  Users,
  Wrench,
  Zap,
} from 'lucide-react';
import React, { useMemo, useState } from 'react';

// Job data structure matching Wix hiring system
interface Job {
  id: string;
  title: string;
  category: JobCategory;
  location: string;
  type: 'Full-time' | 'Contract' | 'Apprentice';
  urgency: 'high' | 'medium' | 'normal';
  description: string;
  requirements: string[];
}

type JobCategory =
  | 'Welding'
  | 'Pipefitting'
  | 'Electrical'
  | 'Operations'
  | 'QA/QC'
  | 'Management'
  | 'Administration'
  | 'General Labour';

// Jobs data synced with Wix hiring system
const JOBS: Job[] = [
  {
    id: 'cwb-welder',
    title: 'CWB Welder',
    category: 'Welding',
    location: 'Pierceland',
    type: 'Full-time',
    urgency: 'high',
    description: 'Structural and general welding with CWB Division 2 certification.',
    requirements: ['CWB Division 2', 'Multi-process capability', 'Overhead/vertical welding'],
  },
  {
    id: 'labourer',
    title: 'General Labourer',
    category: 'General Labour',
    location: 'Various',
    type: 'Full-time',
    urgency: 'high',
    description:
      'Support fabrication and construction activities. No previous experience required but preferred.',
    requirements: ['Physical fitness', 'Safety oriented', 'Team player'],
  },
  {
    id: 'journeyman-pipefitter',
    title: 'Journeyman Pipefitter',
    category: 'Pipefitting',
    location: 'Pierceland Yard',
    type: 'Full-time',
    urgency: 'high',
    description: 'ABSA certified pressure piping fabrication and field installation.',
    requirements: ['Journeyman ticket', 'ABSA experience', 'Blueprint reading'],
  },
  {
    id: 'b-pressure-welder',
    title: 'B-Pressure Welder',
    category: 'Welding',
    location: 'Shop & Field',
    type: 'Full-time',
    urgency: 'high',
    description: 'CWB certified B-Pressure welding for structural and pressure piping projects.',
    requirements: ['B-Pressure ticket', 'CWB certification', 'FCAW/SMAW experience'],
  },
  {
    id: 'qc-inspector',
    title: 'QC Inspector',
    category: 'QA/QC',
    location: 'Fabrication Shop',
    type: 'Full-time',
    urgency: 'medium',
    description: 'Quality control inspection for fabrication projects.',
    requirements: ['QC certification', 'Welding inspection experience', 'Documentation skills'],
  },
  {
    id: 'tig-welder',
    title: 'TIG/Stainless Welder',
    category: 'Welding',
    location: 'Shop',
    type: 'Full-time',
    urgency: 'medium',
    description: 'Precision TIG welding for stainless steel and specialty metals.',
    requirements: ['GTAW certification', 'Stainless experience', 'Precision work'],
  },
  {
    id: 'apprentice-welder',
    title: '1st-3rd Year Welder Apprentice',
    category: 'Welding',
    location: 'Pierceland',
    type: 'Apprentice',
    urgency: 'medium',
    description: 'Learn from industry veterans in a hands-on production environment.',
    requirements: ['Enrolled in apprenticeship', 'Safety oriented', 'Eager to learn'],
  },
  {
    id: 'journeyman-electrician',
    title: 'Journeyman Electrician',
    category: 'Electrical',
    location: 'Field',
    type: 'Full-time',
    urgency: 'medium',
    description: 'Industrial electrical installations and maintenance.',
    requirements: ['Journeyman ticket', 'Industrial experience', 'PLC knowledge'],
  },
  {
    id: 'apprentice-electrician',
    title: '1st-4th Year Electrician Apprentice',
    category: 'Electrical',
    location: 'Field',
    type: 'Apprentice',
    urgency: 'normal',
    description: 'Gain experience in industrial electrical work.',
    requirements: ['Enrolled in apprenticeship', 'Basic electrical knowledge'],
  },
  {
    id: 'steamfitter',
    title: 'Journeyman Steamfitter',
    category: 'Pipefitting',
    location: 'Field Operations',
    type: 'Full-time',
    urgency: 'medium',
    description: 'High-pressure steam system installation and maintenance.',
    requirements: ['Journeyman ticket', 'Steam system experience', 'Safety certifications'],
  },
  {
    id: 'crane-operator',
    title: 'Crane Operator',
    category: 'Operations',
    location: 'Yard & Field',
    type: 'Full-time',
    urgency: 'medium',
    description: 'Mobile and overhead crane operations for fabrication and construction.',
    requirements: ['Valid crane ticket', 'Rigging knowledge', 'Safety record'],
  },
  {
    id: 'heavy-duty-mechanic',
    title: 'Heavy Duty Mechanic',
    category: 'Operations',
    location: 'Pierceland',
    type: 'Full-time',
    urgency: 'normal',
    description: 'Maintenance and repair of heavy industrial equipment.',
    requirements: ['HD Mechanic ticket', 'Fleet maintenance experience'],
  },
  {
    id: 'project-manager',
    title: 'Project Manager',
    category: 'Management',
    location: 'Pierceland HQ',
    type: 'Full-time',
    urgency: 'medium',
    description: 'Lead fabrication and construction projects from conception to completion.',
    requirements: ['Project management experience', 'Industrial background', 'Leadership skills'],
  },
  {
    id: 'estimator',
    title: 'Estimator',
    category: 'Management',
    location: 'Pierceland HQ',
    type: 'Full-time',
    urgency: 'normal',
    description: 'Prepare accurate estimates for fabrication and construction bids.',
    requirements: ['Estimating experience', 'Industry knowledge', 'Software proficiency'],
  },
  {
    id: 'foreman',
    title: 'Shop Foreman',
    category: 'Management',
    location: 'Fabrication Shop',
    type: 'Full-time',
    urgency: 'medium',
    description: 'Supervise daily shop operations and crew management.',
    requirements: ['Trade background', 'Supervisory experience', 'Production planning'],
  },
  {
    id: 'administrator',
    title: 'Administrator',
    category: 'Administration',
    location: 'Pierceland HQ',
    type: 'Full-time',
    urgency: 'normal',
    description: 'Administrative support for operations and project teams.',
    requirements: ['Office experience', 'Computer proficiency', 'Communication skills'],
  },
];

const CATEGORIES: JobCategory[] = [
  'Welding',
  'Pipefitting',
  'Electrical',
  'Operations',
  'QA/QC',
  'Management',
  'Administration',
  'General Labour',
];

const CATEGORY_ICONS: Record<JobCategory, React.ReactNode> = {
  Welding: <Zap className="h-4 w-4" />,
  Pipefitting: <Wrench className="h-4 w-4" />,
  Electrical: <Sparkles className="h-4 w-4" />,
  Operations: <HardHat className="h-4 w-4" />,
  'QA/QC': <CheckCircle className="h-4 w-4" />,
  Management: <TrendingUp className="h-4 w-4" />,
  Administration: <Briefcase className="h-4 w-4" />,
  'General Labour': <Users className="h-4 w-4" />,
};

const CATEGORY_COLORS: Record<JobCategory, { bg: string; text: string; border: string }> = {
  Welding: { bg: 'bg-red-500/10', text: 'text-red-500', border: 'border-red-500/30' },
  Pipefitting: { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/30' },
  Electrical: { bg: 'bg-yellow-500/10', text: 'text-yellow-500', border: 'border-yellow-500/30' },
  Operations: { bg: 'bg-orange-500/10', text: 'text-orange-500', border: 'border-orange-500/30' },
  'QA/QC': { bg: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500/30' },
  Management: { bg: 'bg-purple-500/10', text: 'text-purple-500', border: 'border-purple-500/30' },
  Administration: { bg: 'bg-cyan-500/10', text: 'text-cyan-500', border: 'border-cyan-500/30' },
  'General Labour': {
    bg: 'bg-slate-500/10',
    text: 'text-slate-400',
    border: 'border-slate-500/30',
  },
};

// Wix application portal URL
const WIX_APPLY_URL = 'https://mps.cms.work/hiring/apply';

export default function CareerPortal() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<JobCategory | 'All'>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);

  // Filter jobs based on search and filters
  const filteredJobs = useMemo(() => {
    return JOBS.filter((job) => {
      const matchesSearch =
        searchQuery === '' ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
      const matchesType = selectedType === 'All' || job.type === selectedType;

      return matchesSearch && matchesCategory && matchesType;
    });
  }, [searchQuery, selectedCategory, selectedType]);

  // Count jobs by urgency
  const urgentCount = JOBS.filter((j) => j.urgency === 'high').length;

  return (
    <section id="careers" className="relative overflow-hidden bg-[#060a12] px-6 py-32">
      {/* Animated Background Grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,30,48,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(20,30,48,0.5)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black_70%,transparent_100%)] bg-[size:50px_50px]"></div>
      </div>

      {/* Glowing Orbs */}
      <div className="pointer-events-none absolute top-0 left-1/4 h-96 w-96 -translate-y-1/2 rounded-full bg-red-600/10 blur-3xl"></div>
      <div className="pointer-events-none absolute right-1/4 bottom-0 h-96 w-96 translate-y-1/2 rounded-full bg-blue-600/10 blur-3xl"></div>

      <div className="relative z-10 mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-16 grid gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 text-xs font-bold tracking-widest text-blue-500 uppercase">
              <Users className="h-4 w-4" /> Careers at MPS
            </div>
            <h2 className="mb-6 text-5xl leading-tight font-black tracking-tight text-white md:text-6xl">
              BUILD YOUR <br />
              <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                LEGACY.
              </span>
            </h2>
            <p className="mb-8 max-w-lg text-lg leading-relaxed text-slate-400">
              Join Western Canada's premier industrial team. At MPS Group, we offer more than
              competitive wages—we provide a culture of excellence, long-term growth, and a
              commitment to your safety and success.
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap gap-3">
              {['Competitive Rates', 'Long-Term Contracts', 'Advanced Training'].map((perk) => (
                <div
                  key={perk}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-300 backdrop-blur-sm"
                >
                  <CheckCircle className="h-3 w-3 text-green-500" /> {perk}
                </div>
              ))}
            </div>
          </div>

          {/* Stats Panel */}
          <div className="flex items-center">
            <div className="w-full rounded-xl border border-white/10 bg-[#0a0f18]/80 p-6 backdrop-blur-xl">
              <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 animate-ping rounded-full bg-green-500 opacity-50"></div>
                    <div className="relative h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-xs font-bold tracking-widest text-green-500 uppercase">
                    Hiring Active
                  </span>
                </div>
                <a
                  href={WIX_APPLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-bold text-blue-500 transition-colors hover:text-blue-400"
                >
                  Full Portal <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg border border-white/5 bg-white/5 p-4 text-center">
                  <div className="mb-1 font-mono text-3xl font-bold text-white">
                    {JOBS.length}
                    <span className="text-lg text-slate-500">+</span>
                  </div>
                  <div className="text-[10px] tracking-widest text-slate-500 uppercase">
                    Open Positions
                  </div>
                </div>
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-center">
                  <div className="mb-1 font-mono text-3xl font-bold text-red-500">
                    {urgentCount}
                  </div>
                  <div className="text-[10px] tracking-widest text-red-400/80 uppercase">
                    Priority Hires
                  </div>
                </div>
                <div className="rounded-lg border border-white/5 bg-white/5 p-4 text-center">
                  <div className="mb-1 font-mono text-3xl font-bold text-white">2</div>
                  <div className="text-[10px] tracking-widest text-slate-500 uppercase">
                    Provinces
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search positions, skills, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 py-4 pr-4 pl-12 text-white placeholder-slate-500 transition-all outline-none focus:border-red-500/50 focus:bg-white/10"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center justify-center gap-2 rounded-lg border px-6 py-4 text-sm font-bold transition-all lg:w-auto ${
                showFilters
                  ? 'border-red-500/50 bg-red-500/10 text-red-500'
                  : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              <Filter className="h-4 w-4" />
              Filters
              <ChevronDown
                className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`}
              />
            </button>
          </div>

          {/* Filter Options */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                  <div className="grid gap-6 lg:grid-cols-2">
                    {/* Category Filter */}
                    <div>
                      <label className="mb-3 block text-xs font-bold tracking-widest text-slate-400 uppercase">
                        Category
                      </label>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setSelectedCategory('All')}
                          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                            selectedCategory === 'All'
                              ? 'border-red-500 bg-red-500 text-white'
                              : 'border-white/10 text-slate-400 hover:border-white/30'
                          }`}
                        >
                          All
                        </button>
                        {CATEGORIES.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                              selectedCategory === cat
                                ? `${CATEGORY_COLORS[cat].border} ${CATEGORY_COLORS[cat].bg} ${CATEGORY_COLORS[cat].text}`
                                : 'border-white/10 text-slate-400 hover:border-white/30'
                            }`}
                          >
                            {CATEGORY_ICONS[cat]}
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Type Filter */}
                    <div>
                      <label className="mb-3 block text-xs font-bold tracking-widest text-slate-400 uppercase">
                        Employment Type
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['All', 'Full-time', 'Contract', 'Apprentice'].map((type) => (
                          <button
                            key={type}
                            onClick={() => setSelectedType(type)}
                            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                              selectedType === type
                                ? 'border-blue-500 bg-blue-500 text-white'
                                : 'border-white/10 text-slate-400 hover:border-white/30'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing <span className="font-bold text-white">{filteredJobs.length}</span> of{' '}
            {JOBS.length} positions
          </p>
          {(searchQuery || selectedCategory !== 'All' || selectedType !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedType('All');
              }}
              className="text-xs font-bold text-red-500 transition-colors hover:text-red-400"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Job Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredJobs.map((job, index) => (
              <motion.a
                key={job.id}
                href={WIX_APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: index * 0.02 }}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#0a0f18]/80 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/5"
              >
                {/* Urgency Badge */}
                {job.urgency === 'high' && (
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-2 py-1 text-[10px] font-bold tracking-wider text-red-500 uppercase">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500"></span>
                      </span>
                      Priority
                    </div>
                  </div>
                )}

                {/* Category Icon */}
                <div
                  className={`mb-4 inline-flex rounded-lg p-3 ${CATEGORY_COLORS[job.category].bg} ${CATEGORY_COLORS[job.category].text}`}
                >
                  {CATEGORY_ICONS[job.category]}
                </div>

                {/* Title & Location */}
                <h3 className="mb-2 text-lg font-bold text-white transition-colors group-hover:text-red-500">
                  {job.title}
                </h3>
                <div className="mb-3 flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {job.type}
                  </span>
                </div>

                {/* Description */}
                <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-400">
                  {job.description}
                </p>

                {/* Requirements Preview */}
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {job.requirements.slice(0, 3).map((req) => (
                    <span
                      key={req}
                      className="rounded border border-white/5 bg-white/5 px-2 py-0.5 text-[10px] text-slate-400"
                    >
                      {req}
                    </span>
                  ))}
                </div>

                {/* Apply Link */}
                <div className="flex items-center gap-2 text-sm font-bold text-blue-500 transition-colors group-hover:text-blue-400">
                  Apply Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>

                {/* Hover Glow Effect */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-red-500/5 to-transparent"></div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <div className="py-20 text-center">
            <Search className="mx-auto mb-4 h-12 w-12 text-slate-600" />
            <h3 className="mb-2 text-xl font-bold text-white">No positions found</h3>
            <p className="mb-6 text-slate-500">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedType('All');
              }}
              className="rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* CTA Banner */}
        <div className="mt-16 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-red-900/20 via-[#0a0f18] to-blue-900/20 p-8 md:p-12">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div>
              <h3 className="mb-2 text-2xl font-bold text-white">Don&apos;t see your role?</h3>
              <p className="max-w-md text-slate-400">
                We&apos;re always looking for skilled tradespeople. Submit a general application and
                we&apos;ll keep you in mind.
              </p>
            </div>
            <a
              href={WIX_APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex shrink-0 items-center gap-3 rounded-lg bg-red-600 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-red-700 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]"
            >
              Apply Now
              <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
