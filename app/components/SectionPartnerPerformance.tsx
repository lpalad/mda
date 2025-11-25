'use client'

import React, { useState } from 'react'
import { Briefcase, DollarSign, TrendingUp, Users, PieChart, Target, Sparkles } from 'lucide-react'

type PartnerKey = 'Alex Carter' | 'Morgan Lee' | 'Jordan Patel' | 'Taylor Chen'

interface PartnerMetrics {
  partnerRevenue: number
  newClientRevenue: number
  matterProfit: number
  matterMargin: number
  realisation: number
  collection: number
  leverage: number
  utilisation: number
  retention: number
  netGrowth: number
  concentrationTop3: number
  newClients: number
  newMatters: number
  winRate: number
  bdPipelineValue: number
  trendRevenue: number[]
  trendProfit: number[]
}

const PARTNER_DATA: Record<PartnerKey, PartnerMetrics> = {
  'Alex Carter': {
    partnerRevenue: 1240000,
    newClientRevenue: 320000,
    matterProfit: 420000,
    matterMargin: 36,
    realisation: 92,
    collection: 97,
    leverage: 3.4,
    utilisation: 81,
    retention: 94,
    netGrowth: 11,
    concentrationTop3: 48,
    newClients: 7,
    newMatters: 18,
    winRate: 46,
    bdPipelineValue: 930000,
    trendRevenue: [95, 102, 108, 115, 118, 125, 130, 135, 140, 145, 150, 155],
    trendProfit: [32, 36, 38, 42, 44, 48, 51, 54, 58, 61, 65, 68],
  },
  'Morgan Lee': {
    partnerRevenue: 980000,
    newClientRevenue: 240000,
    matterProfit: 310000,
    matterMargin: 32,
    realisation: 88,
    collection: 95,
    leverage: 3.1,
    utilisation: 78,
    retention: 91,
    netGrowth: 8,
    concentrationTop3: 52,
    newClients: 5,
    newMatters: 14,
    winRate: 42,
    bdPipelineValue: 680000,
    trendRevenue: [80, 85, 88, 92, 95, 98, 101, 104, 106, 109, 112, 115],
    trendProfit: [24, 27, 28, 30, 31, 32, 33, 35, 36, 38, 39, 41],
  },
  'Jordan Patel': {
    partnerRevenue: 1520000,
    newClientRevenue: 380000,
    matterProfit: 510000,
    matterMargin: 38,
    realisation: 95,
    collection: 98,
    leverage: 3.7,
    utilisation: 84,
    retention: 96,
    netGrowth: 14,
    concentrationTop3: 44,
    newClients: 9,
    newMatters: 22,
    winRate: 51,
    bdPipelineValue: 1150000,
    trendRevenue: [110, 118, 125, 132, 140, 148, 155, 162, 170, 177, 185, 192],
    trendProfit: [40, 44, 47, 50, 53, 57, 60, 63, 67, 70, 74, 77],
  },
  'Taylor Chen': {
    partnerRevenue: 1100000,
    newClientRevenue: 290000,
    matterProfit: 380000,
    matterMargin: 34,
    realisation: 90,
    collection: 96,
    leverage: 3.3,
    utilisation: 80,
    retention: 92,
    netGrowth: 10,
    concentrationTop3: 50,
    newClients: 6,
    newMatters: 16,
    winRate: 44,
    bdPipelineValue: 820000,
    trendRevenue: [90, 97, 103, 110, 116, 123, 129, 136, 142, 149, 155, 162],
    trendProfit: [28, 32, 34, 37, 39, 42, 44, 47, 50, 53, 55, 58],
  },
}

const PARTNERS: PartnerKey[] = ['Alex Carter', 'Morgan Lee', 'Jordan Patel', 'Taylor Chen']
const PERIODS = ['Last 90 Days', 'Year to Date', 'Last 12 Months']

interface MiniSparklineProps {
  data: number[]
  color: string
}

const MiniSparkline: React.FC<MiniSparklineProps> = ({ data, color }) => {
  const width = 140
  const height = 40
  const padding = 4
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  const minVal = Math.min(...data)
  const maxVal = Math.max(...data)
  const range = maxVal - minVal || 1

  const points = data.map((val, idx) => {
    const x = padding + (idx / (data.length - 1)) * chartWidth
    const y = height - padding - ((val - minVal) / range) * chartHeight
    return `${x},${y}`
  })

  const pathD = `M ${points.join(' L ')}`
  const areaPath = `M ${padding},${height - padding} L ${points.join(' L ')} L ${width - padding},${height - padding} Z`

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full">
      <defs>
        <linearGradient id={`grad-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#grad-${color})`} />
      <path d={pathD} stroke={color} strokeWidth="2" fill="none" />
    </svg>
  )
}

interface MiniDonutProps {
  segments: Array<{ label: string; value: number; color: string }>
}

const MiniDonut: React.FC<MiniDonutProps> = ({ segments }) => {
  const total = segments.reduce((sum, s) => sum + s.value, 0)
  const radius = 30
  const circumference = 2 * Math.PI * radius
  let currentOffset = 0

  return (
    <div className="flex items-center gap-4">
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="10" />
        {segments.map((segment, idx) => {
          const ratio = segment.value / total
          const offset = currentOffset
          currentOffset += ratio * circumference
          return (
            <circle
              key={idx}
              cx="40"
              cy="40"
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth="10"
              strokeDasharray={`${ratio * circumference} ${circumference}`}
              strokeDashoffset={-offset}
              style={{ transform: 'rotate(-90deg)', transformOrigin: '40px 40px' }}
            />
          )
        })}
      </svg>
      <div className="space-y-1">
        {segments.map((segment) => (
          <div key={segment.label} className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: segment.color }} />
            <span className="text-[11px] text-slate-600">
              {segment.label}: {Math.round((segment.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

interface MiniFunnelProps {
  stages: number[]
}

const MiniFunnel: React.FC<MiniFunnelProps> = ({ stages }) => {
  const maxWidth = 120
  const maxVal = Math.max(...stages)
  return (
    <div className="space-y-1.5">
      {stages.map((val, idx) => {
        const width = (val / maxVal) * maxWidth
        return (
          <div key={idx} className="flex items-center gap-2">
            <div
              className="h-1.5 rounded-full bg-indigo-500"
              style={{ width: `${width}px`, opacity: 1 - idx * 0.15 }}
            />
            <span className="text-[10px] text-slate-500">{val}</span>
          </div>
        )
      })}
    </div>
  )
}

interface MetricCardProps {
  icon: React.ReactNode
  title: string
  value: React.ReactNode
  secondary?: React.ReactNode
  visual?: React.ReactNode
  badge?: string
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, title, value, secondary, visual, badge }) => (
  <div className="rounded-3xl bg-white/90 border border-slate-200 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
    <div className="flex items-start justify-between mb-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white text-sm">
        {icon}
      </div>
      {badge && <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{badge}</span>}
    </div>
    <h3 className="text-sm font-semibold text-slate-900 mb-2">{title}</h3>
    <p className="text-2xl font-bold text-slate-900 mb-1">{value}</p>
    {secondary && <p className="text-xs text-slate-600 mb-3">{secondary}</p>}
    {visual && <div className="mt-4">{visual}</div>}
  </div>
)

interface Lead {
  id?: string
}

interface PartnerPerformanceProps {
  leads?: Lead[]
}

const PERIOD_MULTIPLIERS: Record<string, number> = {
  'Last 90 Days': 1,
  'Year to Date': 2.5,
  'Last 12 Months': 3.2,
}

export function PartnerPerformance({ leads }: PartnerPerformanceProps) {
  const [activePartner, setActivePartner] = useState<PartnerKey>('Alex Carter')
  const [activePeriod, setActivePeriod] = useState('Last 90 Days')

  const baseMetrics = PARTNER_DATA[activePartner]
  const multiplier = PERIOD_MULTIPLIERS[activePeriod]

  const metrics = {
    partnerRevenue: Math.round(baseMetrics.partnerRevenue * multiplier),
    newClientRevenue: Math.round(baseMetrics.newClientRevenue * multiplier),
    matterProfit: Math.round(baseMetrics.matterProfit * multiplier),
    matterMargin: baseMetrics.matterMargin,
    realisation: baseMetrics.realisation,
    collection: baseMetrics.collection,
    leverage: baseMetrics.leverage,
    utilisation: baseMetrics.utilisation,
    retention: baseMetrics.retention,
    netGrowth: baseMetrics.netGrowth,
    concentrationTop3: baseMetrics.concentrationTop3,
    newClients: Math.round(baseMetrics.newClients * multiplier),
    newMatters: Math.round(baseMetrics.newMatters * multiplier),
    winRate: baseMetrics.winRate,
    bdPipelineValue: Math.round(baseMetrics.bdPipelineValue * multiplier),
    trendRevenue: baseMetrics.trendRevenue.map(v => Math.round(v * multiplier)),
    trendProfit: baseMetrics.trendProfit.map(v => Math.round(v * multiplier)),
  }

  return (
    <section className="space-y-8">
      {/* HEADER */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
          Business Intelligence Platform | Leonard Palad - Principle Business Analyst
        </p>
        <div className="rounded-3xl bg-white/90 border border-slate-200 p-8 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-1">Partner Performance</h1>
              <p className="text-sm text-slate-600">Firm-level view of revenue, profit and client health by partner.</p>
            </div>
            <div className="flex gap-2">
              {PERIODS.map((period) => (
                <button
                  key={period}
                  onClick={() => setActivePeriod(period)}
                  className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${
                    activePeriod === period
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <p className="text-[11px] text-slate-500 italic">Data is synthetic, for demo only.</p>
        </div>
      </div>

      {/* PARTNER SELECTOR */}
      <div className="rounded-3xl bg-white/90 border border-slate-200 p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-slate-700">Partner:</span>
          <div className="flex gap-2 flex-wrap">
            {PARTNERS.map((partner) => (
              <button
                key={partner}
                onClick={() => setActivePartner(partner)}
                className={`px-4 py-1.5 text-sm rounded-full font-medium transition-colors ${
                  activePartner === partner
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {partner}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* METRICS GRID */}
      <div className="grid gap-6 md:grid-cols-3 animate-stagger-container">
        <div className="animate-stagger">
          <MetricCard
            icon={<DollarSign className="h-4 w-4" />}
            title="Partner-Sourced Revenue"
            value={`$${(metrics.partnerRevenue / 1000000).toFixed(1)}M`}
            secondary={`New client revenue: $${(metrics.newClientRevenue / 1000).toFixed(0)}k`}
            badge="▲ +12% vs avg"
            visual={<MiniSparkline data={metrics.trendRevenue} color="#3b82f6" />}
          />
        </div>

        <div className="animate-stagger">
          <MetricCard
            icon={<TrendingUp className="h-4 w-4" />}
            title="Matter Profit & Margin"
            value={`$${(metrics.matterProfit / 1000).toFixed(0)}k`}
            secondary={`Margin: ${metrics.matterMargin}%`}
            visual={
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 flex-1 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${metrics.matterMargin}%` }} />
                  </div>
                  <span className="text-xs text-slate-600">{metrics.matterMargin}%</span>
                </div>
                <p className="text-[11px] text-slate-500">Higher = more profit per matter</p>
              </div>
            }
          />
        </div>

        <div className="animate-stagger">
          <MetricCard
            icon={<Target className="h-4 w-4" />}
            title="Realisation & Collection"
            value={`${metrics.realisation}%`}
            secondary={`Collection: ${metrics.collection}%`}
            visual={
              <div className="space-y-2">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-medium text-slate-700">Realisation</span>
                    <span className="text-[10px] text-slate-600">{metrics.realisation}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${metrics.realisation}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-medium text-slate-700">Collection</span>
                    <span className="text-[10px] text-slate-600">{metrics.collection}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: `${metrics.collection}%` }} />
                  </div>
                </div>
              </div>
            }
          />
        </div>

        <div className="animate-stagger">
          <MetricCard
            icon={<Users className="h-4 w-4" />}
            title="Leverage & Team Utilisation"
            value={`${metrics.leverage.toFixed(1)} : 1`}
            secondary={`Team utilisation: ${metrics.utilisation}%`}
            visual={
              <div className="space-y-2">
                <div className="flex h-6 gap-0.5 rounded overflow-hidden bg-slate-100">
                  <div className="flex-1 bg-slate-900" style={{ flex: `${1 / metrics.leverage}` }} />
                  <div className="flex-1 bg-slate-400" style={{ flex: `${(metrics.leverage - 1) / metrics.leverage}` }} />
                </div>
                <p className="text-[10px] text-slate-500">Ideal band: 3–4x</p>
              </div>
            }
          />
        </div>

        <div className="animate-stagger">
          <MetricCard
            icon={<PieChart className="h-4 w-4" />}
            title="Client Portfolio Quality"
            value={`${metrics.retention}%`}
            secondary={`Retention • Net growth: +${metrics.netGrowth}%`}
            visual={
              <MiniDonut
                segments={[
                  { label: 'Stable', value: 70, color: '#10b981' },
                  { label: 'Watch', value: 20, color: '#f59e0b' },
                  { label: 'At risk', value: 10, color: '#ef4444' },
                ]}
              />
            }
          />
        </div>

        <div className="animate-stagger">
          <MetricCard
            icon={<Sparkles className="h-4 w-4" />}
            title="BD Momentum"
            value={`${metrics.newClients} new`}
            secondary={`Clients • ${metrics.newMatters} matters • Win: ${metrics.winRate}%`}
            visual={
              <div>
                <MiniFunnel stages={[45, 38, 22, 18]} />
                <p className="text-[10px] text-slate-500 mt-2">Next 90 days view</p>
              </div>
            }
          />
        </div>
      </div>

      {/* INSIGHT BOX */}
      <div className="rounded-3xl bg-emerald-50 border border-emerald-200 p-6 animate-scale-in">
        <p className="text-sm text-slate-700">
          <span className="font-semibold text-emerald-900">{activePartner}</span> is delivering strong revenue growth with excellent profit margins. Focus areas: maintain client concentration discipline (top 3 at {metrics.concentrationTop3}%) and continue scaling leverage through associate development.
        </p>
      </div>
    </section>
  )
}
