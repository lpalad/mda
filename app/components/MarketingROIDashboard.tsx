'use client'

import React, { useState, useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ScatterChart, Scatter, Cell, ComposedChart,
  Line, ReferenceLine
} from 'recharts'
import {
  TrendingUp, ChevronDown,
  Database, Lightbulb, RefreshCw, CircleDot
} from 'lucide-react'

// ==================== TYPES ====================

type Period = '30d' | '90d' | '6m' | '12m'

interface SummaryCardData {
  icon: React.ElementType
  number: string
  title: string
  description: string
  highlight?: string
}

interface ChannelDataType {
  channel: string
  spend: number
  revenue: number
  roas: number
  cac: number
  ltvCac: number
}

interface ScatterDataType {
  name: string
  spend: number
  revenue: number
  roas: number
  conversions: number
}

interface TrendDataType {
  month: string
  spend: number
  revenue: number
  roas: number
}

// ==================== PERIOD MULTIPLIERS ====================

const periodMultipliers: Record<Period, { spend: number; revenue: number; roas: number; cac: number; payback: number; trend: string }> = {
  '30d': { spend: 0.33, revenue: 0.30, roas: 0.92, cac: 1.08, payback: 1.15, trend: '-2.1%' },
  '90d': { spend: 1.0, revenue: 1.0, roas: 1.0, cac: 1.0, payback: 1.0, trend: '+12.4%' },
  '6m': { spend: 2.1, revenue: 2.3, roas: 1.08, cac: 0.92, payback: 0.88, trend: '+18.7%' },
  '12m': { spend: 4.2, revenue: 4.8, roas: 1.15, cac: 0.85, payback: 0.75, trend: '+24.3%' }
}

const periodLabels: Record<Period, string> = {
  '30d': 'Last 30 Days',
  '90d': 'Last 90 Days',
  '6m': 'Last 6 Months',
  '12m': 'Last 12 Months'
}

// ==================== BASE DATA ====================

const baseChannelData: ChannelDataType[] = [
  { channel: 'Referrals', spend: 28000, revenue: 168000, roas: 6.0, cac: 185, ltvCac: 10.0 },
  { channel: 'SEO', spend: 35000, revenue: 158000, roas: 4.5, cac: 220, ltvCac: 7.5 },
  { channel: 'Google Ads', spend: 85000, revenue: 272000, roas: 3.2, cac: 380, ltvCac: 3.7 },
  { channel: 'LinkedIn', spend: 62000, revenue: 167000, roas: 2.7, cac: 520, ltvCac: 3.0 },
  { channel: 'Meta Ads', spend: 78000, revenue: 179000, roas: 2.3, cac: 445, ltvCac: 2.7 },
  { channel: 'Display', spend: 41000, revenue: 49000, roas: 1.2, cac: 680, ltvCac: 1.4 }
]

const baseScatterData: ScatterDataType[] = [
  { name: 'Brand Search', spend: 12, revenue: 54, roas: 4.5, conversions: 45 },
  { name: 'Competitor KW', spend: 28, revenue: 84, roas: 3.0, conversions: 72 },
  { name: 'Retargeting', spend: 8.5, revenue: 42.5, roas: 5.0, conversions: 38 },
  { name: 'Lookalike US', spend: 22, revenue: 55, roas: 2.5, conversions: 55 },
  { name: 'Lookalike EU', spend: 18, revenue: 36, roas: 2.0, conversions: 40 },
  { name: 'Cold Prospecting', spend: 35, revenue: 52.5, roas: 1.5, conversions: 62 },
  { name: 'Newsletter Promo', spend: 5, revenue: 30, roas: 6.0, conversions: 28 },
  { name: 'Webinar Ads', spend: 15, revenue: 52.5, roas: 3.5, conversions: 48 },
  { name: 'Display Generic', spend: 25, revenue: 20, roas: 0.8, conversions: 22 },
  { name: 'Social Awareness', spend: 32, revenue: 28.8, roas: 0.9, conversions: 35 },
  { name: 'Partner Co-brand', spend: 10, revenue: 45, roas: 4.5, conversions: 42 },
  { name: 'Influencer', spend: 18, revenue: 32.4, roas: 1.8, conversions: 30 }
]

const baseTrendData: TrendDataType[] = [
  { month: 'Jan', spend: 52, revenue: 146, roas: 2.8 },
  { month: 'Feb', spend: 58, revenue: 168, roas: 2.9 },
  { month: 'Mar', spend: 62, revenue: 192, roas: 3.1 },
  { month: 'Apr', spend: 68, revenue: 218, roas: 3.2 },
  { month: 'May', spend: 72, revenue: 238, roas: 3.3 },
  { month: 'Jun', spend: 78, revenue: 265, roas: 3.4 },
  { month: 'Jul', spend: 82, revenue: 279, roas: 3.4 },
  { month: 'Aug', spend: 85, revenue: 298, roas: 3.5 },
  { month: 'Sep', spend: 88, revenue: 290, roas: 3.3 },
  { month: 'Oct', spend: 92, revenue: 313, roas: 3.4 },
  { month: 'Nov', spend: 95, revenue: 328, roas: 3.5 },
  { month: 'Dec', spend: 98, revenue: 343, roas: 3.5 }
]

const recommendations = [
  { impact: 'HIGH IMPACT', color: 'emerald', text: 'Cut 20% of budget from channels with ROAS < 1.5x (Display), expected CAC improvement ~12%.' },
  { impact: 'HIGH IMPACT', color: 'emerald', text: 'Reinvest $15K into top 2 channels by LTV:CAC (Referrals, SEO) — projected +$67K revenue.' },
  { impact: 'MEDIUM', color: 'amber', text: 'Cap low-CLV campaigns and route spend to campaigns with CLV > $1,200.' },
  { impact: 'QUICK WIN', color: 'cyan', text: 'Scale Retargeting budget by 40% — consistently delivers 5.0x ROAS with low variance.' },
  { impact: 'MONITOR', color: 'slate', text: 'LinkedIn CAC trending up 8% MoM — review audience targeting before next budget cycle.' }
]

// ==================== HELPER FUNCTIONS ====================

const formatCurrency = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
  return `$${value.toFixed(0)}`
}

const formatCurrencyShort = (value: number) => {
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
  return `$${value}`
}

const getROASColor = (roas: number) => {
  if (roas >= 3) return 'text-emerald-600'
  if (roas >= 2) return 'text-amber-600'
  return 'text-rose-600'
}

const getLTVCACColor = (ltvCac: number) => {
  if (ltvCac >= 5) return 'text-emerald-600'
  if (ltvCac >= 3) return 'text-amber-600'
  return 'text-rose-600'
}

const getBarColor = (roas: number, isFirst: boolean) => {
  if (roas < 1.5) return '#f43f5e'
  if (isFirst) return '#14b8a6'
  return '#5eead4'
}

const getScatterColor = (roas: number) => {
  if (roas >= 2) return '#14b8a6'
  if (roas >= 1) return '#f59e0b'
  return '#f43f5e'
}

// ==================== COMPONENTS ====================

const ExecutiveSummaryCard = ({ card }: { card: SummaryCardData }) => {
  const Icon = card.icon
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50">
          <Icon className="h-5 w-5 text-teal-500" />
        </div>
        <span className="text-sm font-semibold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">
          {card.number}
        </span>
      </div>
      <h3 className="text-xs font-bold uppercase tracking-wide text-gray-900 mt-3">
        {card.title}
      </h3>
      <p className="text-xs text-gray-500 leading-relaxed mt-2 flex-1">
        {card.description}
      </p>
      {card.highlight && (
        <p className="text-xs font-semibold text-teal-600 mt-2">
          {card.highlight}
        </p>
      )}
    </div>
  )
}

const LargeKPICard = ({
  label,
  value,
  trend,
  trendUp,
  subtext
}: {
  label: string
  value: string
  trend: string
  trendUp: boolean
  subtext: string
}) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
    <div className="flex items-center justify-between mb-2">
      <span className="uppercase text-xs text-gray-500 font-medium tracking-wide">{label}</span>
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${
        trendUp
          ? 'bg-teal-50 text-teal-600 border-teal-200'
          : 'bg-rose-50 text-rose-600 border-rose-200'
      }`}>
        <TrendingUp className={`w-3.5 h-3.5 ${!trendUp ? 'rotate-180' : ''}`} />
        {trend}
      </span>
    </div>
    <div className="text-3xl font-bold text-gray-900">{value}</div>
    <div className="text-xs text-gray-400 mt-1">{subtext}</div>
  </div>
)

const SmallKPICard = ({
  label,
  value,
  trend,
  trendUp,
  subtext
}: {
  label: string
  value: string
  trend: string
  trendUp: boolean
  subtext: string
}) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
    <div className="flex items-center justify-between mb-2">
      <span className="uppercase text-xs text-gray-500 font-medium tracking-wide">{label}</span>
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${
        trendUp
          ? 'bg-teal-50 text-teal-600 border-teal-200'
          : 'bg-rose-50 text-rose-600 border-rose-200'
      }`}>
        <TrendingUp className={`w-3 h-3 ${!trendUp ? 'rotate-180' : ''}`} />
        {trend}
      </span>
    </div>
    <div className="text-2xl font-bold text-gray-900">{value}</div>
    <div className="text-xs text-gray-400 mt-1">{subtext}</div>
  </div>
)

const ImpactPill = ({ impact, color }: { impact: string; color: string }) => {
  const colorClasses: Record<string, string> = {
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    amber: 'bg-amber-50 border-amber-200 text-amber-700',
    cyan: 'bg-cyan-50 border-cyan-200 text-cyan-700',
    slate: 'bg-slate-50 border-slate-200 text-slate-600'
  }
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${colorClasses[color]}`}>
      {impact}
    </span>
  )
}

// ==================== MAIN COMPONENT ====================

export function MarketingROIDashboard() {
  const [metric, setMetric] = useState<'roas' | 'ltvCac'>('roas')
  const [period, setPeriod] = useState<Period>('90d')

  // Get period multiplier
  const multiplier = useMemo(() => periodMultipliers[period], [period])

  // Dynamic Executive Summary Cards based on period
  const executiveSummaryCards: SummaryCardData[] = useMemo(() => {
    const totalSpend = Math.round(329000 * multiplier.spend)
    const totalRevenue = Math.round(993000 * multiplier.revenue)
    const roasValue = (3.0 * multiplier.roas).toFixed(1)
    const cacValue = Math.round(370 * multiplier.cac)
    const projectedImpact = Math.round(85 * multiplier.revenue)

    return [
      {
        icon: CircleDot,
        number: '01',
        title: 'PROBLEM',
        description: `${formatCurrency(totalSpend)} marketing spend across 6 channels but unclear which drive real ROI. Where to cut vs scale?`
      },
      {
        icon: Database,
        number: '02',
        title: 'DATA USED',
        description: `Google Ads, Meta, LinkedIn, SEO tools, CRM revenue data. ${formatCurrency(totalSpend)} spend, ${formatCurrency(totalRevenue)} revenue, ${periodLabels[period].toLowerCase()}.`
      },
      {
        icon: Lightbulb,
        number: '03',
        title: 'KEY FINDING',
        description: `Referrals: ${(6.0 * multiplier.roas).toFixed(1)}x ROAS, ${(10.0 * multiplier.roas).toFixed(0)}x LTV:CAC. Display: ${(1.2 * multiplier.roas).toFixed(1)}x ROAS (burning ${formatCurrency(41000 * multiplier.spend)}). Top 2 channels 5x more efficient.`,
        highlight: 'Referrals = 7x better than Display'
      },
      {
        icon: RefreshCw,
        number: '04',
        title: 'RECOMMENDATION',
        description: `Cut Display spend by 50% (${formatCurrency(20000 * multiplier.spend)}). Reinvest into Referrals & SEO. Scale retargeting campaigns +40%.`
      },
      {
        icon: TrendingUp,
        number: '05',
        title: 'EXPECTED IMPACT',
        description: `Projected +${formatCurrency(projectedImpact * 1000)}/quarter. Blended ROAS improves from ${roasValue}x → ${(parseFloat(roasValue) * 1.27).toFixed(1)}x. CAC drops $${cacValue} → $${Math.round(cacValue * 0.84)}.`,
        highlight: '−16% CAC improvement'
      }
    ]
  }, [multiplier, period])

  // Dynamic KPI values based on period
  const kpiValues = useMemo(() => {
    const baseSpend = 329000
    const baseRevenue = 993000
    const baseRoas = 3.0
    const baseCac = 370
    const basePayback = 4.2

    return {
      totalSpend: Math.round(baseSpend * multiplier.spend),
      totalRevenue: Math.round(baseRevenue * multiplier.revenue),
      roas: (baseRoas * multiplier.roas).toFixed(1),
      cac: Math.round(baseCac * multiplier.cac),
      payback: (basePayback * multiplier.payback).toFixed(1),
      spendTrend: multiplier.trend,
      revenueTrend: period === '30d' ? '-1.8%' : period === '90d' ? '+18.2%' : period === '6m' ? '+22.5%' : '+28.1%',
      roasTrend: period === '30d' ? '-0.2x' : period === '90d' ? '+0.3x' : period === '6m' ? '+0.4x' : '+0.6x',
      cacTrend: period === '30d' ? '+3.2%' : period === '90d' ? '-4.7%' : period === '6m' ? '-7.2%' : '-12.1%',
      paybackTrend: period === '30d' ? '+0.2mo' : period === '90d' ? '-0.3mo' : period === '6m' ? '-0.5mo' : '-0.8mo'
    }
  }, [multiplier, period])

  // Dynamic channel data based on period
  const channelData = useMemo(() => {
    return baseChannelData.map(channel => ({
      ...channel,
      spend: Math.round(channel.spend * multiplier.spend),
      revenue: Math.round(channel.revenue * multiplier.revenue),
      roas: parseFloat((channel.roas * multiplier.roas).toFixed(1)),
      cac: Math.round(channel.cac * multiplier.cac),
      ltvCac: parseFloat((channel.ltvCac * multiplier.roas).toFixed(1))
    }))
  }, [multiplier])

  // Sort channel data by selected metric
  const sortedChannelData = useMemo(() => {
    return [...channelData].sort((a, b) =>
      metric === 'roas' ? b.roas - a.roas : b.ltvCac - a.ltvCac
    )
  }, [channelData, metric])

  // Dynamic scatter data based on period
  const scatterData = useMemo(() => {
    return baseScatterData.map(item => ({
      ...item,
      spend: parseFloat((item.spend * multiplier.spend).toFixed(1)),
      revenue: parseFloat((item.revenue * multiplier.revenue).toFixed(1)),
      roas: parseFloat((item.roas * multiplier.roas).toFixed(1)),
      conversions: Math.round(item.conversions * multiplier.spend)
    }))
  }, [multiplier])

  // Dynamic trend data based on period
  const trendData = useMemo(() => {
    const months = period === '30d' ? 1 : period === '90d' ? 3 : period === '6m' ? 6 : 12
    return baseTrendData.slice(-months).map(item => ({
      ...item,
      spend: Math.round(item.spend * multiplier.spend / (period === '12m' ? 4 : period === '6m' ? 2 : 1)),
      revenue: Math.round(item.revenue * multiplier.revenue / (period === '12m' ? 4 : period === '6m' ? 2 : 1)),
      roas: parseFloat((item.roas * multiplier.roas).toFixed(1))
    }))
  }, [multiplier, period])

  // Custom tooltip for scatter chart
  const ScatterTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: ScatterDataType }> }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
          <p className="text-gray-900 font-medium text-sm mb-1">{data.name}</p>
          <p className="text-gray-600 text-xs">Spend: ${data.spend.toFixed(1)}K</p>
          <p className="text-gray-600 text-xs">Revenue: ${data.revenue.toFixed(1)}K</p>
          <p className="text-gray-600 text-xs">ROAS: {data.roas}x</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-[1400px] mx-auto px-6 py-6">

        {/* ==================== HEADER ==================== */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-gray-500">Where budget goes, what it returns, and where to move it.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value as Period)}
                className="appearance-none bg-slate-800 text-white rounded-lg px-4 py-2.5 pr-10 text-sm font-medium cursor-pointer hover:bg-slate-700 transition-colors"
              >
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="6m">Last 6 Months</option>
                <option value="12m">Last 12 Months</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
              <span className="w-2 h-2 rounded-full bg-teal-500"></span>
              Compare Period
            </button>
          </div>
        </div>

        {/* ==================== SECTION 1: EXECUTIVE SUMMARY ==================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {executiveSummaryCards.map((card) => (
            <ExecutiveSummaryCard key={card.number} card={card} />
          ))}
        </div>

        {/* ==================== SECTION 2: KPI CARDS ==================== */}
        {/* Row 1: Total Spend and Attributed Revenue (2 columns) */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <LargeKPICard
            label="TOTAL SPEND"
            value={formatCurrency(kpiValues.totalSpend)}
            trend={kpiValues.spendTrend}
            trendUp={!kpiValues.spendTrend.startsWith('-')}
            subtext={`vs previous ${periodLabels[period].toLowerCase()}`}
          />
          <LargeKPICard
            label="ATTRIBUTED REVENUE"
            value={formatCurrency(kpiValues.totalRevenue)}
            trend={kpiValues.revenueTrend}
            trendUp={!kpiValues.revenueTrend.startsWith('-')}
            subtext={`vs previous ${periodLabels[period].toLowerCase()}`}
          />
        </div>

        {/* Row 2: ROAS, CAC (2 columns) */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <SmallKPICard
            label="ROAS"
            value={`${kpiValues.roas}x`}
            trend={kpiValues.roasTrend}
            trendUp={!kpiValues.roasTrend.startsWith('-')}
            subtext="Target: 3.0x"
          />
          <SmallKPICard
            label="CAC"
            value={`$${kpiValues.cac}`}
            trend={kpiValues.cacTrend}
            trendUp={kpiValues.cacTrend.startsWith('-')}
            subtext="Goal: < $450"
          />
        </div>

        {/* Row 3: Payback Period (1 column, half width) */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <SmallKPICard
            label="PAYBACK PERIOD"
            value={`${kpiValues.payback} mo`}
            trend={kpiValues.paybackTrend}
            trendUp={kpiValues.paybackTrend.startsWith('-')}
            subtext="Goal: < 6 months"
          />
        </div>

        {/* ==================== SECTION 3: CHANNEL PERFORMANCE ==================== */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 mt-6 shadow-sm">
          {/* Section Header */}
          <div className="border-b border-gray-100 pb-4 mb-5">
            <h2 className="text-lg font-semibold text-gray-900">Marketing ROI</h2>
            <p className="text-xs text-gray-500">Channel efficiency analysis and budget optimization insights</p>
          </div>

          {/* Sub-header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Channel Performance</h3>
              <p className="text-xs text-gray-500">Sorted by {metric === 'roas' ? 'ROAS' : 'LTV:CAC'} (highest to lowest) · {periodLabels[period]}</p>
            </div>
            <select
              value={metric}
              onChange={(e) => setMetric(e.target.value as 'roas' | 'ltvCac')}
              className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 cursor-pointer"
            >
              <option value="roas">Metric: ROAS</option>
              <option value="ltvCac">Metric: LTV:CAC</option>
            </select>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-2 gap-6">
            {/* Left: Bar Chart */}
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sortedChannelData}
                  layout="vertical"
                  margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={true} vertical={false} />
                  <XAxis type="number" stroke="#9ca3af" fontSize={11} tickFormatter={(v) => `${v}x`} />
                  <YAxis type="category" dataKey="channel" stroke="#9ca3af" fontSize={11} width={80} />
                  <Tooltip
                    formatter={(value: number) => [`${value}x`, metric === 'roas' ? 'ROAS' : 'LTV:CAC']}
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                    labelStyle={{ color: '#111827' }}
                  />
                  <Bar
                    dataKey={metric === 'roas' ? 'roas' : 'ltvCac'}
                    radius={[0, 4, 4, 0]}
                  >
                    {sortedChannelData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={getBarColor(entry.roas, index === 0)}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Right: Table */}
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-3 py-2.5 text-left text-xs uppercase text-gray-500 font-medium">Channel</th>
                    <th className="px-3 py-2.5 text-right text-xs uppercase text-gray-500 font-medium">Spend</th>
                    <th className="px-3 py-2.5 text-right text-xs uppercase text-gray-500 font-medium">Revenue</th>
                    <th className="px-3 py-2.5 text-right text-xs uppercase text-gray-500 font-medium">ROAS</th>
                    <th className="px-3 py-2.5 text-right text-xs uppercase text-gray-500 font-medium">CAC</th>
                    <th className="px-3 py-2.5 text-right text-xs uppercase text-gray-500 font-medium">LTV:CAC</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedChannelData.map((row, idx) => (
                    <tr
                      key={row.channel}
                      className={`border-t border-gray-100 hover:bg-gray-50 transition-colors ${
                        idx === 0 ? 'border-l-2 border-l-teal-500' :
                        row.roas < 1.5 ? 'border-l-2 border-l-rose-500' : ''
                      }`}
                    >
                      <td className="px-3 py-2.5 text-gray-900 font-medium">{row.channel}</td>
                      <td className="px-3 py-2.5 text-right text-gray-600">{formatCurrencyShort(row.spend)}</td>
                      <td className="px-3 py-2.5 text-right text-gray-600">{formatCurrencyShort(row.revenue)}</td>
                      <td className={`px-3 py-2.5 text-right font-semibold ${getROASColor(row.roas)}`}>{row.roas}x</td>
                      <td className="px-3 py-2.5 text-right text-gray-600">${row.cac}</td>
                      <td className={`px-3 py-2.5 text-right font-semibold ${getLTVCACColor(row.ltvCac)}`}>{row.ltvCac}x</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ==================== SECTION 4: TWO-COLUMN CHARTS ==================== */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          {/* Left: Scatter Plot */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-gray-900 font-semibold mb-1">Spend vs Revenue (by Campaign)</h3>
            <p className="text-xs text-gray-500 mb-4">Each dot is a campaign · Size = conversions · Line = break-even</p>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    type="number"
                    dataKey="spend"
                    name="Spend"
                    stroke="#9ca3af"
                    fontSize={11}
                    tickFormatter={(v) => `$${v}K`}
                    domain={[0, Math.max(40, ...scatterData.map(d => d.spend)) * 1.1]}
                  />
                  <YAxis
                    type="number"
                    dataKey="revenue"
                    name="Revenue"
                    stroke="#9ca3af"
                    fontSize={11}
                    tickFormatter={(v) => `$${v}K`}
                    domain={[0, Math.max(100, ...scatterData.map(d => d.revenue)) * 1.1]}
                  />
                  <Tooltip content={<ScatterTooltip />} />
                  <ReferenceLine
                    segment={[{ x: 0, y: 0 }, { x: 50, y: 50 }]}
                    stroke="#d1d5db"
                    strokeDasharray="5 5"
                    label={{ value: 'ROAS = 1.0x', fill: '#9ca3af', fontSize: 10, position: 'end' }}
                  />
                  <Scatter name="Campaigns" data={scatterData}>
                    {scatterData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={getScatterColor(entry.roas)}
                        r={Math.sqrt(entry.conversions) * 1.2}
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right: Trend Chart */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-gray-900 font-semibold mb-1">ROI Trend Over Time</h3>
            <p className="text-xs text-gray-500 mb-4">Spend, Revenue & ROAS by Month</p>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={trendData} margin={{ top: 10, right: 30, bottom: 10, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#9ca3af" fontSize={11} />
                  <YAxis
                    yAxisId="left"
                    stroke="#9ca3af"
                    fontSize={11}
                    tickFormatter={(v) => `$${v}K`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#9ca3af"
                    fontSize={11}
                    tickFormatter={(v) => `${v}x`}
                    domain={[2, 5]}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                    labelStyle={{ color: '#111827' }}
                    formatter={(value: number, name: string) => {
                      if (name === 'roas') return [`${value}x`, 'ROAS']
                      return [`$${value}K`, name === 'spend' ? 'Spend' : 'Revenue']
                    }}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: '10px' }}
                    formatter={(value) => <span className="text-gray-600 text-xs capitalize">{value}</span>}
                  />
                  <Bar yAxisId="left" dataKey="spend" fill="#e2e8f0" radius={[2, 2, 0, 0]} name="spend" />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#14b8a6"
                    strokeWidth={2}
                    dot={{ fill: '#14b8a6', r: 3 }}
                    name="revenue"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="roas"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: '#06b6d4', r: 3 }}
                    name="roas"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-gray-500 mt-2">Goal: Maintain ROAS &gt; 3.0x while keeping CAC &lt; $450.</p>
          </div>
        </div>

        {/* ==================== SECTION 5: RECOMMENDATIONS ==================== */}
        <div className="bg-white border-l-4 border-teal-400 rounded-2xl p-6 mt-6 shadow-sm">
          <h3 className="text-gray-900 font-semibold mb-4">Recommended Actions (Based on {periodLabels[period]})</h3>
          <div className="space-y-3">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <ImpactPill impact={rec.impact} color={rec.color} />
                <p className="text-sm text-gray-600">{rec.text}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4">
            Last updated: November 27, 2024 · Based on {periodLabels[period].toLowerCase()} data
          </p>
        </div>

        {/* ==================== FOOTER ==================== */}
        <footer className="text-center text-xs text-gray-500 py-6 mt-6">
          Marketing ROI Dashboard · Portfolio Project · Synthetic Data for Demonstration
        </footer>
      </div>
    </div>
  )
}
