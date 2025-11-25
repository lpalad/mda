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
    bgColor: 'bg-white',
    bgStyle: 'bg-opacity-65',
  },
  {
    id: 'marketing-roi',
    icon: TrendingUp,
    title: 'Marketing ROI',
    subtitle: 'See what pays.',
    href: '/dashboard?section=marketing-roi',
    bgColor: 'bg-emerald-50',
    bgStyle: 'bg-opacity-40',
  },
  {
    id: 'lead-quality',
    icon: Sparkles,
    title: 'Lead Quality',
    subtitle: 'Know who converts.',
    href: '/dashboard?section=lead-quality',
    bgColor: 'bg-blue-50',
    bgStyle: 'bg-opacity-40',
  },
  {
    id: 'sales-pipeline',
    icon: Zap,
    title: 'Sales Pipeline',
    subtitle: 'Where deals move.',
    href: '/dashboard?section=sales-pipeline',
    bgColor: 'bg-orange-50',
    bgStyle: 'bg-opacity-40',
  },
  {
    id: 'partner-performance',
    icon: Users,
    title: 'Partner Performance',
    subtitle: 'Real contribution.',
    href: '/dashboard?section=partner-performance',
    bgColor: 'bg-slate-900',
    bgStyle: 'bg-opacity-65',
    isDark: true,
  },
  {
    id: 'client-lifetime-value',
    icon: Diamond,
    title: 'Client Lifetime Value',
    subtitle: 'Your most profitable clients.',
    href: '/dashboard?section=client-lifetime-value',
    bgColor: 'bg-yellow-50',
    bgStyle: 'bg-opacity-50',
  },
  {
    id: 'predictive-analytics',
    icon: Wand2,
    title: 'Predictive Analytics',
    subtitle: 'Your next 90 days.',
    href: '/dashboard?section=predictive-analytics',
    bgColor: 'bg-purple-50',
    bgStyle: 'bg-opacity-40',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* HEADER SECTION */}
      <section className="relative overflow-hidden px-6 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-slate-900 mb-6 leading-tight">
            Dashboard that decides.
          </h1>
          <p className="text-lg text-slate-600 font-normal mb-3">
            Not opinions. Not guesses. Data.
          </p>
          <p className="text-base text-slate-500 font-normal max-w-2xl mx-auto leading-relaxed">
            Seven angles on your business. All the truth you need.
          </p>
        </div>
      </section>

      {/* CARDS GRID */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          {/* 6-Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {dashboardSections.slice(0, 6).map((section) => {
              const Icon = section.icon
              return (
                <Link
                  key={section.id}
                  href={section.href}
                  className="group"
                >
                  <div
                    className={`
                      relative h-56 rounded-3xl p-8
                      transition-all duration-300 ease-out
                      cursor-pointer
                      backdrop-blur-xl
                      border border-white border-opacity-20
                      hover:scale-[1.04] hover:-translate-y-1
                      shadow-sm hover:shadow-xl
                      ${section.isDark ? section.bgColor : section.bgColor}
                      ${section.bgStyle}
                    `}
                    style={{
                      background: section.isDark
                        ? 'rgba(28, 30, 38, 0.65)'
                        : section.id === 'marketing-roi'
                        ? 'rgba(232, 255, 242, 0.4)'
                        : section.id === 'lead-quality'
                        ? 'rgba(234, 244, 255, 0.4)'
                        : section.id === 'sales-pipeline'
                        ? 'rgba(246, 242, 237, 0.4)'
                        : section.id === 'client-lifetime-value'
                        ? 'rgba(255, 245, 217, 0.5)'
                        : section.id === 'predictive-analytics'
                        ? 'rgba(241, 231, 255, 0.4)'
                        : 'rgba(255, 255, 255, 0.65)',
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    {/* Icon — Large, Centered, Beautiful */}
                    <div className="flex flex-col items-center justify-center h-full space-y-4">
                      <div className={`transition-all duration-300 ${section.isDark ? 'text-white' : 'text-slate-900'}`}>
                        <Icon className="w-10 h-10 stroke-[1.5]" />
                      </div>

                      {/* Title */}
                      <h3 className={`text-xl font-semibold tracking-tight ${
                        section.isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        {section.title}
                      </h3>

                      {/* Subtitle */}
                      <p className={`text-sm font-normal ${
                        section.isDark ? 'text-white/60' : 'text-slate-500'
                      }`}>
                        {section.subtitle}
                      </p>
                    </div>

                    {/* Subtle Glow on Hover */}
                    <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none ${
                      section.isDark ? 'bg-white' : 'bg-slate-900'
                    }`} />
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Full-Width Predictive Analytics Card */}
          <Link
            href={dashboardSections[6].href}
            className="group block"
          >
            <div
              className={`
                relative h-64 rounded-3xl p-12
                transition-all duration-300 ease-out
                cursor-pointer
                backdrop-blur-xl
                border border-white border-opacity-20
                hover:scale-[1.02] hover:-translate-y-1
                shadow-sm hover:shadow-xl
                flex items-center justify-between
              `}
              style={{
                background: 'rgba(241, 231, 255, 0.4)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div className="flex flex-col items-start space-y-3">
                <Wand2 className="w-10 h-10 text-slate-900 stroke-[1.5]" />
                <h3 className="text-2xl font-semibold text-slate-900 tracking-tight">
                  Predictive Analytics
                </h3>
                <p className="text-sm font-normal text-slate-600">
                  Your next 90 days.
                </p>
              </div>

              {/* Arrow Indicator */}
              <div className="hidden md:flex items-center justify-center">
                <svg className="w-6 h-6 text-slate-900 stroke-[1.5] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>

              {/* Subtle Glow */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-5 bg-slate-900 transition-opacity duration-300 pointer-events-none" />
            </div>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <section className="px-6 py-12 border-t border-slate-200/30">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-slate-500 font-normal">
            Marketing Analytics Dashboard • Built for Leaders Who Demand Data-Driven Decisions
          </p>
        </div>
      </section>
    </div>
  )
}
