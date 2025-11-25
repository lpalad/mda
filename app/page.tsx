'use client'

import Link from 'next/link'
import { BarChart3, TrendingUp, Sparkles, Zap, Users, Diamond, Wand2, ArrowRight, TrendingDown } from 'lucide-react'

const dashboardSections = [
  {
    id: 'executive-summary',
    icon: BarChart3,
    title: 'Executive Summary',
    subtitle: 'The firm in one page.',
    href: '/dashboard?section=executive-summary',
    metric: '18%',
    description: 'Quarter-on-quarter revenue growth.',
    status: 'On track',
    hasChart: true,
  },
  {
    id: 'marketing-roi',
    icon: TrendingUp,
    title: 'Marketing ROI',
    subtitle: 'See what pays.',
    href: '/dashboard?section=marketing-roi',
    metric: '3.4x',
    description: 'Attribution model across all paid & owned channels.',
    status: 'High impact',
    hasChart: true,
  },
  {
    id: 'lead-quality',
    icon: Sparkles,
    title: 'Lead Quality',
    subtitle: 'Know who converts.',
    href: '/dashboard?section=lead-quality',
    metric: '73% SQL',
    description: 'Conversion from MQL to SQL by channel.',
    status: 'Strong',
    hasChart: true,
  },
  {
    id: 'sales-pipeline',
    icon: Zap,
    title: 'Sales Pipeline',
    subtitle: 'Where deals move.',
    href: '/dashboard?section=sales-pipeline',
    metric: '$4.2M',
    description: 'Open pipeline across all stages.',
    status: '3.1x coverage',
    hasChart: true,
  },
  {
    id: 'partner-performance',
    icon: Users,
    title: 'Partner Performance',
    subtitle: 'Real contribution.',
    href: '/dashboard?section=partner-performance',
    metric: '$1.1M',
    description: 'Partner-sourced revenue and cycle time.',
    status: 'Strategic',
    hasChart: true,
  },
  {
    id: 'client-lifetime-value',
    icon: Diamond,
    title: 'Client Lifetime Value',
    subtitle: 'Your most profitable clients.',
    href: '/dashboard?section=client-lifetime-value',
    metric: '$46.2k',
    description: 'Average CLV by segment (SMB, Mid, Enterprise).',
    status: 'Upsell ready',
    hasChart: true,
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* HEADER SECTION */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">SALESCONNECT 360</p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Revenue Intelligence Hub
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl">
              Seven decision views designed for CMOs and RevOps to see ROI, pipeline and risk in one place.
            </p>
          </div>

          {/* TOP KPI CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="border border-slate-200 rounded-lg p-6">
              <p className="text-xs font-semibold text-slate-500 uppercase mb-3">OVERALL MARKETING ROI</p>
              <p className="text-3xl font-bold text-slate-900">3.4x</p>
              <p className="text-sm text-slate-600 mt-2">last 90 days</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-6">
              <p className="text-xs font-semibold text-slate-500 uppercase mb-3">PIPELINE COVERAGE</p>
              <p className="text-3xl font-bold text-slate-900">3.7x</p>
              <p className="text-sm text-slate-600 mt-2">next quarter</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-6">
              <p className="text-xs font-semibold text-slate-500 uppercase mb-3">CHURN RISK</p>
              <p className="text-3xl font-bold text-slate-900">12%</p>
              <p className="text-sm text-slate-600 mt-2">of ARR</p>
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD CARDS GRID */}
      <section className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {dashboardSections.map((section) => {
              const Icon = section.icon
              return (
                <Link
                  key={section.id}
                  href={section.href}
                  className="group"
                >
                  <div className="border border-slate-200 rounded-lg p-6 h-full hover:shadow-lg transition-shadow bg-white">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-slate-900">{section.title}</h3>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                        {section.status}
                      </span>
                    </div>

                    <div className="mb-4">
                      <p className="text-2xl font-bold text-slate-900 mb-2">{section.metric}</p>
                      <p className="text-sm text-slate-600">{section.description}</p>
                    </div>

                    {section.hasChart && (
                      <div className="flex items-end gap-1 h-12 mb-4">
                        <div className="w-full h-6 bg-blue-500/30 rounded"></div>
                        <div className="w-full h-8 bg-blue-500/50 rounded"></div>
                        <div className="w-full h-5 bg-blue-500/25 rounded"></div>
                        <div className="w-full h-9 bg-blue-500/60 rounded"></div>
                        <div className="w-full h-7 bg-blue-500/40 rounded"></div>
                      </div>
                    )}

                    <p className="text-sm text-slate-600 flex items-center gap-1">
                      {section.subtitle}
                      <ArrowRight className="w-4 h-4" />
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* PREDICTIVE ANALYTICS CARD */}
          <Link href="/dashboard?section=predictive-analytics" className="group block">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-8 text-white overflow-hidden relative">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">⚡ PREDICTIVE ANALYTICS</p>
                  <h2 className="text-3xl font-bold mb-3">Your next 90 days, forecasted.</h2>
                  <p className="text-slate-300 max-w-lg">
                    Forecasted revenue, risk and coverage based on current pipeline, conversion patterns and seasonality.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase mb-2">FORECASTED REVENUE</p>
                  <p className="text-4xl font-bold mb-2">$2.8M</p>
                  <p className="text-sm text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" /> +19% vs last 90 days
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase mb-2">CONFIDENCE RANGE</p>
                  <p className="text-2xl font-bold">$2.3M – $3.1M</p>
                </div>
              </div>

              {/* Forecast Chart */}
              <div className="mb-6 pt-6 border-t border-slate-700">
                <div className="flex items-end gap-2 h-16">
                  {[40, 50, 45, 55, 60, 50, 65, 70].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-emerald-500 rounded"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-xs text-slate-300">Low risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    <span className="text-xs text-slate-300">Medium risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span className="text-xs text-slate-300">High risk</span>
                  </div>
                </div>
                <button className="bg-white text-slate-900 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-slate-50 transition-colors flex items-center gap-2 group-hover:gap-3">
                  Open Forecast Workspace
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-400 mt-4">
                Model uses your last 18 months of closed-won, channel attribution and seasonality to project revenue.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <section className="px-6 py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-slate-500">
            Revenue Intelligence Hub • Built for Sales and Marketing Leaders
          </p>
        </div>
      </section>
    </div>
  )
}
