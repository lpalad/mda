'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, TrendingUp, Users, Target, Zap, BarChart3, Filter } from 'lucide-react'

// Branding Header Component
const BrandingHeader = () => {
  const [currentDateTime, setCurrentDateTime] = useState('')

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      setCurrentDateTime(now.toLocaleDateString('en-AU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }))
    }
    updateDateTime()
    const interval = setInterval(updateDateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-between mb-6">
      <p className="text-lg font-bold uppercase tracking-wide text-slate-700">
        Business Intelligence Platform | Leonard Palad - Principle Business Analyst
      </p>
      <p className="text-sm text-slate-500">{currentDateTime}</p>
    </div>
  )
}

// Helper Components

const MetricPill = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-2 shadow-sm">
    <p className="text-[11px] uppercase tracking-wide text-slate-500">{label}</p>
    <p className="text-sm font-semibold text-slate-900">{value}</p>
  </div>
)

const StatusBadge = ({ label }: { label: string }) => (
  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-600">
    {label}
  </span>
)

const MiniBars = () => (
  <div className="mt-4 flex h-10 items-end gap-1.5">
    {[12, 18, 28, 20, 30].map((h, i) => (
      <div
        key={i}
        className="w-2 rounded-full bg-indigo-500/80"
        style={{ height: `${h}px` }}
      />
    ))}
  </div>
)

const MiniSpark = () => (
  <div className="mt-4 flex h-10 items-end gap-1">
    {[8, 14, 10, 18, 22, 20, 26].map((h, i) => (
      <div
        key={i}
        className="w-[5px] rounded-full bg-emerald-500/80"
        style={{ height: `${h}px` }}
      />
    ))}
  </div>
)

const MiniFunnel = () => (
  <div className="mt-3 flex h-10 flex-col justify-between">
    <div className="h-[6px] w-full rounded-full bg-sky-500/30" />
    <div className="h-[6px] w-3/4 rounded-full bg-sky-500/50" />
    <div className="h-[6px] w-2/4 rounded-full bg-sky-500/70" />
    <div className="h-[6px] w-1/3 rounded-full bg-sky-500" />
  </div>
)

const MiniDonut = () => (
  <div className="mt-2 flex items-center gap-3">
    <div className="relative h-10 w-10">
      <svg className="h-10 w-10" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="15" fill="none" stroke="#f1f5f9" strokeWidth="3" />
        <circle cx="20" cy="20" r="15" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="56.55 94.25" />
      </svg>
      <div className="absolute inset-3 rounded-full bg-white" />
    </div>
    <div className="space-y-0.5 text-[11px] text-slate-500">
      <p>
        <span className="mr-1 inline-block h-2 w-2 rounded-full bg-emerald-500" />
        SQL
      </p>
      <p>
        <span className="mr-1 inline-block h-2 w-2 rounded-full bg-slate-300" />
        Working / Disqualified
      </p>
    </div>
  </div>
)

const MiniSegments = () => (
  <div className="mt-3 flex h-10 items-end gap-1">
    <div className="flex flex-col gap-0.5 flex-1">
      <div className="h-3 rounded-sm bg-emerald-500/80" />
      <div className="h-2 rounded-sm bg-blue-500/80" />
      <div className="h-1.5 rounded-sm bg-violet-500/80" />
    </div>
    <div className="flex flex-col gap-0.5 flex-1">
      <div className="h-2.5 rounded-sm bg-emerald-500/80" />
      <div className="h-2.5 rounded-sm bg-blue-500/80" />
      <div className="h-2 rounded-sm bg-violet-500/80" />
    </div>
    <div className="flex flex-col gap-0.5 flex-1">
      <div className="h-3.5 rounded-sm bg-emerald-500/80" />
      <div className="h-2 rounded-sm bg-blue-500/80" />
      <div className="h-1 rounded-sm bg-violet-500/80" />
    </div>
    <div className="flex flex-col gap-0.5 flex-1">
      <div className="h-4 rounded-sm bg-emerald-500/80" />
      <div className="h-1.5 rounded-sm bg-blue-500/80" />
      <div className="h-1.5 rounded-sm bg-violet-500/80" />
    </div>
  </div>
)

const MiniFunnelStages = () => (
  <div className="mt-3 flex h-10 flex-col items-center justify-center gap-0.5">
    <div className="h-[5px] w-full rounded-full bg-teal-500/30" />
    <div className="h-[5px] w-[85%] rounded-full bg-teal-500/45" />
    <div className="h-[5px] w-[65%] rounded-full bg-teal-500/60" />
    <div className="h-[5px] w-[45%] rounded-full bg-teal-500/75" />
    <div className="h-[5px] w-[30%] rounded-full bg-teal-500" />
  </div>
)

const SectionCard = ({
  icon: Icon,
  title,
  kpi,
  subtitle,
  status,
  footer,
  visual,
  href,
}: {
  icon: any
  title: string
  kpi: string
  subtitle: string
  status: string
  footer: string
  visual: React.ReactNode
  href: string
}) => (
  <Link href={href} className="group block h-full">
    <div className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg ring-1 ring-slate-100">
      <div>
        <div className="mb-4 flex flex-row items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-900 text-slate-50">
              <Icon className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          </div>
          <StatusBadge label={status} />
        </div>

        <p className="text-2xl font-semibold text-slate-900">{kpi}</p>
        <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
        {visual}
      </div>

      <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500">
        <span>{footer}</span>
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600">
          View dashboard
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </div>
  </Link>
)

const PredictiveCard = () => (
  <Link href="/marketing-roi" className="group block col-span-1 mt-4 sm:col-span-3">
    <div className="grid gap-6 rounded-3xl border border-slate-800 bg-slate-900 p-6 text-slate-50 shadow-lg ring-1 ring-slate-800 transition-all duration-200 group-hover:-translate-y-1 group-hover:border-slate-700 group-hover:shadow-xl">
      <div>
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Predictive Analytics
            </p>
            <h2 className="mt-2 text-2xl font-bold">Your next 90 days, forecasted.</h2>
            <p className="mt-2 text-sm text-slate-400">
              Revenue forecast based on current pipeline, conversions, and historical patterns.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Forecasted Revenue
            </p>
            <p className="mt-2 text-3xl font-bold">$2.8M</p>
            <p className="mt-1 flex items-center gap-1 text-xs text-emerald-400">
              <TrendingUp className="h-3 w-3" /> +19% vs last 90 days
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Confidence Range
            </p>
            <p className="mt-2 text-2xl font-bold">$2.3M – $3.1M</p>
            <p className="mt-1 text-xs text-slate-400">95% confidence interval</p>
          </div>
        </div>

        <div className="mt-6 border-t border-slate-800 pt-6">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Revenue Forecast
          </p>
          <div className="flex items-end gap-2">
            {[40, 50, 45, 55, 60, 50, 65, 70].map((height, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-emerald-500"
                style={{ height: `${height * 0.8}px` }}
              />
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs text-slate-400">Low risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-amber-500" />
              <span className="text-xs text-slate-400">Medium risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <span className="text-xs text-slate-400">High risk</span>
            </div>
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50 group-hover:gap-3">
            Open Forecast Workspace
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-4 text-[11px] text-slate-500">
          Model trained on 18 months of closed deals, channel attribution, and seasonal patterns.
        </p>
      </div>
    </div>
  </Link>
)

export default function DashboardHub() {
  return (
    <div className="min-h-screen w-full bg-slate-50 px-4 py-8 text-slate-900 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        {/* Branding Header */}
        <BrandingHeader />

        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">
            Revenue Intelligence Hub
          </h1>
          <p className="max-w-2xl text-sm text-slate-600">
            Seven decision views designed for CMOs and RevOps leaders to see ROI, pipeline and risk in one place.
          </p>
        </div>

        {/* Top Metrics */}
        <div className="flex flex-wrap gap-3">
          <MetricPill label="Overall Marketing ROI" value="3.4x" />
          <MetricPill label="Pipeline Coverage" value="3.7x" />
          <MetricPill label="Churn Risk" value="12% of ARR" />
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Marketing ROI */}
          <SectionCard
            icon={TrendingUp}
            title="Marketing ROI"
            kpi="3.4x"
            subtitle="Attribution model across all paid & owned channels."
            status="High impact"
            footer="See what pays."
            visual={<MiniBars />}
            href="/marketing-roi"
          />

          {/* Lead Quality */}
          <SectionCard
            icon={Target}
            title="Lead Quality"
            kpi="78% SQL"
            subtitle="Conversion from MQL to SQL by channel."
            status="Strong"
            footer="Know who converts."
            visual={<MiniDonut />}
            href="/lead-quality"
          />

          {/* Sales Pipeline */}
          <SectionCard
            icon={Zap}
            title="Sales Pipeline"
            kpi="$4.2M"
            subtitle="Open pipeline across all stages."
            status="3.1x coverage"
            footer="Where deals move."
            visual={<MiniFunnel />}
            href="/sales-pipeline"
          />

          {/* Partner Performance */}
          <SectionCard
            icon={Users}
            title="Partner Performance"
            kpi="$1.1M"
            subtitle="Partner-sourced revenue and cycle time."
            status="Strategic"
            footer="Real contribution."
            visual={<MiniSpark />}
            href="/partner-performance"
          />

          {/* CLV & Segmentation */}
          <SectionCard
            icon={BarChart3}
            title="CLV & Segmentation"
            kpi="$12.4M"
            subtitle="Customer segments by RFM analysis & lifetime value."
            status="3.8x LTV:CAC"
            footer="Know your best customers."
            visual={<MiniSegments />}
            href="/clv-segmentation"
          />

          {/* Acquisition & Funnel */}
          <SectionCard
            icon={Filter}
            title="Acquisition & Funnel"
            kpi="8.5x ROAS"
            subtitle="Channel spend efficiency and conversion funnel health."
            status="Efficient"
            footer="Track spend to revenue."
            visual={<MiniFunnelStages />}
            href="/acquisition-funnel"
          />

          {/* Predictive Analytics Card spanning full width */}
          <PredictiveCard />
        </div>
      </div>
    </div>
  )
}
