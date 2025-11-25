'use client'

import Link from 'next/link'
import { BarChart3, TrendingUp, Sparkles, Zap, Users, Diamond, Wand2 } from 'lucide-react'

const dashboardSections = [
  {
    id: 'executive-summary',
    icon: BarChart3,
    title: 'Executive Summary',
    subtitle: 'The firm in one page.',
    href: '/dashboard?section=executive-summary',
    accentColor: 'from-slate-900 to-slate-700',
    isMaster: true,
  },
  {
    id: 'marketing-roi',
    icon: TrendingUp,
    title: 'Marketing ROI',
    subtitle: 'See what pays.',
    href: '/dashboard?section=marketing-roi',
    accentColor: 'from-emerald-600 to-emerald-700',
  },
  {
    id: 'lead-quality',
    icon: Sparkles,
    title: 'Lead Quality',
    subtitle: 'Know who converts.',
    href: '/dashboard?section=lead-quality',
    accentColor: 'from-blue-600 to-blue-700',
  },
  {
    id: 'sales-pipeline',
    icon: Zap,
    title: 'Sales Pipeline',
    subtitle: 'Where deals move.',
    href: '/dashboard?section=sales-pipeline',
    accentColor: 'from-orange-600 to-orange-700',
  },
  {
    id: 'partner-performance',
    icon: Users,
    title: 'Partner Performance',
    subtitle: 'Real contribution.',
    href: '/dashboard?section=partner-performance',
    accentColor: 'from-slate-900 to-slate-800',
    isDark: true,
  },
  {
    id: 'client-lifetime-value',
    icon: Diamond,
    title: 'Client Lifetime Value',
    subtitle: 'Your most profitable clients.',
    href: '/dashboard?section=client-lifetime-value',
    accentColor: 'from-amber-100 to-yellow-100',
  },
  {
    id: 'predictive-analytics',
    icon: Wand2,
    title: 'Predictive Analytics',
    subtitle: 'Your next 90 days.',
    href: '/dashboard?section=predictive-analytics',
    accentColor: 'from-purple-600 to-indigo-700',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* HEADER SECTION */}
      <section className="relative overflow-hidden px-6 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            Dashboard that decides.
          </h1>
          <p className="text-xl text-slate-600 font-light mb-2">
            Not opinions. Not guesses. Data.
          </p>
          <p className="text-base text-slate-500 font-light max-w-2xl mx-auto">
            Seven angles on your business. All the truth you need.
          </p>
        </div>
      </section>

      {/* CARDS GRID */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* MASTER CARD — Executive Summary (spans differently on desktop) */}
            {dashboardSections.slice(0, 1).map((section) => {
              const Icon = section.icon
              return (
                <Link
                  key={section.id}
                  href={section.href}
                  className="group lg:col-span-1 h-full"
                >
                  <div className="relative h-full bg-white rounded-2xl p-8 transition-all duration-300 ease-out hover:shadow-xl hover:scale-[1.02] cursor-pointer border border-slate-100 backdrop-blur-sm">
                    {/* Subtle accent line */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${section.accentColor} rounded-t-2xl`} />

                    {/* Icon Container */}
                    <div className="mb-6">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                        <Icon className="w-6 h-6 text-slate-900 stroke-[1.5]" />
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-1 tracking-tight">
                        {section.title}
                      </h3>
                      <p className="text-sm text-slate-600 font-light">
                        {section.subtitle}
                      </p>
                    </div>

                    {/* Hover glow indicator */}
                    <div className="absolute bottom-6 right-6 w-1.5 h-1.5 bg-slate-200 rounded-full group-hover:bg-slate-400 transition-colors" />
                  </div>
                </Link>
              )
            })}

            {/* REGULAR CARDS */}
            {dashboardSections.slice(1).map((section) => {
              const Icon = section.icon
              return (
                <Link
                  key={section.id}
                  href={section.href}
                  className="group h-full"
                >
                  <div className={`relative h-full rounded-2xl p-8 transition-all duration-300 ease-out hover:shadow-xl hover:scale-[1.02] cursor-pointer border transition-all ${
                    section.isDark
                      ? `bg-gradient-to-br ${section.accentColor} border-slate-800 shadow-lg`
                      : section.id === 'client-lifetime-value'
                      ? `bg-gradient-to-br ${section.accentColor} border-amber-200`
                      : `bg-white border-slate-100`
                  } backdrop-blur-sm`}>

                    {/* Subtle accent line (light cards only) */}
                    {!section.isDark && section.id !== 'client-lifetime-value' && (
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${section.accentColor} rounded-t-2xl`} />
                    )}

                    {/* Icon Container */}
                    <div className="mb-6">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                        section.isDark
                          ? 'bg-white/20 group-hover:bg-white/30'
                          : section.id === 'client-lifetime-value'
                          ? 'bg-amber-200/40 group-hover:bg-amber-300/40'
                          : 'bg-slate-100 group-hover:bg-slate-200'
                      }`}>
                        <Icon className={`w-6 h-6 stroke-[1.5] ${
                          section.isDark ? 'text-white' : 'text-slate-900'
                        }`} />
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className={`text-xl font-semibold mb-1 tracking-tight ${
                        section.isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        {section.title}
                      </h3>
                      <p className={`text-sm font-light ${
                        section.isDark ? 'text-white/75' : 'text-slate-600'
                      }`}>
                        {section.subtitle}
                      </p>
                    </div>

                    {/* Hover glow indicator */}
                    <div className={`absolute bottom-6 right-6 w-1.5 h-1.5 rounded-full transition-colors ${
                      section.isDark
                        ? 'bg-white/30 group-hover:bg-white/60'
                        : 'bg-slate-200 group-hover:bg-slate-400'
                    }`} />
                  </div>
                </Link>
              )
            })}
          </div>

          {/* FULL-WIDTH BOTTOM CARD — Predictive Analytics */}
          <Link
            href={dashboardSections[6].href}
            className="group block"
          >
            <div className="relative bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-700 rounded-2xl p-8 transition-all duration-300 ease-out hover:shadow-2xl hover:scale-[1.01] cursor-pointer border border-purple-500/30 backdrop-blur-sm">
              {/* Grid pattern overlay */}
              <div className="absolute inset-0 opacity-5 bg-grid-pattern rounded-2xl" />

              <div className="relative flex items-center justify-between">
                <div>
                  <div className="mb-4 flex gap-3">
                    <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                      <Wand2 className="w-6 h-6 text-white stroke-[1.5]" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-1 tracking-tight">
                    Predictive Analytics
                  </h3>
                  <p className="text-sm text-white/75 font-light">
                    Your next 90 days.
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="hidden md:flex items-center gap-2 text-white/60 group-hover:text-white/90 transition-colors">
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <section className="px-6 py-12 border-t border-slate-200/50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-slate-500 font-light">
            Marketing Analytics Dashboard • Built for Leaders Who Demand Data-Driven Decisions
          </p>
        </div>
      </section>
    </div>
  )
}
