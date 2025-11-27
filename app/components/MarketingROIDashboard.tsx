'use client'

import React, { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ScatterChart, Scatter, Cell, ComposedChart,
  Line, ReferenceLine
} from 'recharts'
import {
  TrendingUp, TrendingDown, ChevronDown,
  Database, Lightbulb, RefreshCw, CircleDot
} from 'lucide-react'

// ==================== DATA ====================

const executiveSummaryCards = [
  {
    icon: CircleDot,
    number: '01',
    title: 'PROBLEM',
    description: '$328K marketing spend across 6 channels but unclear which drive real ROI. Where to cut vs scale?'
  },
  {
    icon: Database,
    number: '02',
    title: 'DATA USED',
    description: 'Google Ads, Meta, LinkedIn, SEO tools, CRM revenue data. $328K spend, $993K revenue, 90 days.'
  },
  {
    icon: Lightbulb,
    number: '03',
    title: 'KEY FINDING',
    description: 'Referrals: 6.0x ROAS, 10x LTV:CAC. Display: 1.2x ROAS (burning $40K). Top 2 channels 5x more efficient.',
    highlight: 'Referrals = 7x better than Display'
  },
  {
    icon: RefreshCw,
    number: '04',
    title: 'RECOMMENDATION',
    description: 'Cut Display spend by 50% ($20K). Reinvest into Referrals & SEO. Scale retargeting campaigns +40%.'
  },
  {
    icon: TrendingUp,
    number: '05',
    title: 'EXPECTED IMPACT',
    description: 'Projected +$85K revenue/quarter. Blended ROAS improves from 3.0x → 3.8x. CAC drops $370 → $310.',
    highlight: '−16% CAC improvement'
  }
]

const kpiData = [
  { label: 'TOTAL SPEND', value: '$329K', trend: '+12.4%', trendUp: true, subtext: 'vs last 90 days' },
  { label: 'ATTRIBUTED REVENUE', value: '$993K', trend: '+18.2%', trendUp: true, subtext: 'vs last 90 days' },
  { label: 'ROAS', value: '3.0x', trend: '+0.3x', trendUp: true, subtext: 'Target: 3.0x' },
  { label: 'CAC', value: '$370', trend: '-4.7%', trendUp: true, subtext: 'Goal: < $450' },
  { label: 'PAYBACK PERIOD', value: '4.2 mo', trend: '-0.3mo', trendUp: true, subtext: 'Goal: < 6 months' }
]

const channelData = [
  { channel: 'Referrals', spend: 28000, revenue: 168000, roas: 6.0, cac: 185, ltvCac: 10.0 },
  { channel: 'SEO', spend: 35000, revenue: 158000, roas: 4.5, cac: 220, ltvCac: 7.5 },
  { channel: 'Google Ads', spend: 85000, revenue: 272000, roas: 3.2, cac: 380, ltvCac: 3.7 },
  { channel: 'LinkedIn', spend: 62000, revenue: 167000, roas: 2.7, cac: 520, ltvCac: 3.0 },
  { channel: 'Meta Ads', spend: 78000, revenue: 179000, roas: 2.3, cac: 445, ltvCac: 2.7 },
  { channel: 'Display', spend: 41000, revenue: 49000, roas: 1.2, cac: 680, ltvCac: 1.4 }
]

const scatterData = [
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

const trendData = [
  { month: 'Jan', spend: 52, revenue: 146, roas: 2.8 },
  { month: 'Feb', spend: 58, revenue: 168, roas: 2.9 },
  { month: 'Mar', spend: 62, revenue: 192, roas: 3.1 },
  { month: 'Apr', spend: 68, revenue: 218, roas: 3.2 },
  { month: 'May', spend: 72, revenue: 238, roas: 3.3 },
  { month: 'Jun', spend: 78, revenue: 265, roas: 3.4 },
  { month: 'Jul', spend: 82, revenue: 279, roas: 3.4 },
  { month: 'Aug', spend: 85, revenue: 298, roas: 3.5 },
  { month: 'Sep', spend: 88, revenue: 290, roas: 3.3 },
  { month: 'Oct', spend: 92, revenue: 313, roas: 3.4 }
]

const recommendations = [
  { impact: 'HIGH IMPACT', color: 'emerald', text: 'Cut 20% of budget from channels with ROAS < 1.5x (Display), expected CAC improvement ~12%.' },
  { impact: 'HIGH IMPACT', color: 'emerald', text: 'Reinvest $15K into top 2 channels by LTV:CAC (Referrals, SEO) — projected +$67K revenue.' },
  { impact: 'MEDIUM', color: 'amber', text: 'Cap low-CLV campaigns and route spend to campaigns with CLV > $1,200.' },
  { impact: 'QUICK WIN', color: 'cyan', text: 'Scale Retargeting budget by 40% — consistently delivers 5.0x ROAS with low variance.' },
  { impact: 'MONITOR', color: 'slate', text: 'LinkedIn CAC trending up 8% MoM — review audience targeting before next budget cycle.' }
]

// ==================== COMPONENTS ====================

const ExecutiveSummaryCard = ({ card }: { card: typeof executiveSummaryCards[0] }) => {
  const Icon = card.icon
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50">
          <Icon className="h-5 w-5 text-teal-500" />
        </div>
        <span className="text-sm font-semibold text-teal-500">{card.number}</span>
      </div>
      <h3 className="text-xs font-bold uppercase tracking-wide text-gray-900 mb-2">{card.title}</h3>
      <p className="text-xs text-gray-500 leading-relaxed flex-1">{card.description}</p>
      {card.highlight && (
        <p className="text-xs font-semibold text-teal-500 mt-2">{card.highlight}</p>
      )}
    </div>
  )
}

const KPICard = ({ data }: { data: typeof kpiData[0] }) => (
  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-4 py-3 hover:shadow-md hover:scale-[1.02] transition-all cursor-default">
    <div className="flex items-center justify-between mb-1">
      <span className="uppercase text-[10px] text-gray-500 font-medium">{data.label}</span>
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${
        data.trendUp
          ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
          : 'bg-rose-50 text-rose-600 border-rose-200'
      }`}>
        {data.trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {data.trend}
      </span>
    </div>
    <div className="text-2xl font-semibold text-gray-900">{data.value}</div>
    <div className="text-[10px] text-gray-400">{data.subtext}</div>
  </div>
)

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
  if (isFirst) return '#2dd4bf'
  return '#14b8a6'
}

const getScatterColor = (roas: number) => {
  if (roas >= 2) return '#14b8a6'
  if (roas >= 1) return '#f59e0b'
  return '#f43f5e'
}

const formatCurrency = (value: number) => {
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
  return `$${value}`
}

const ImpactPill = ({ impact, color }: { impact: string; color: string }) => {
  const colorClasses: Record<string, string> = {
    emerald: 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300',
    amber: 'bg-amber-500/10 border-amber-500/40 text-amber-300',
    cyan: 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300',
    slate: 'bg-slate-500/10 border-slate-500/40 text-slate-300'
  }
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium border ${colorClasses[color]}`}>
      {impact}
    </span>
  )
}

// Custom tooltip for scatter chart
const ScatterTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: typeof scatterData[0] }> }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-xl">
        <p className="text-white font-medium text-sm mb-1">{data.name}</p>
        <p className="text-slate-300 text-xs">Spend: ${data.spend}K</p>
        <p className="text-slate-300 text-xs">Revenue: ${data.revenue}K</p>
        <p className="text-slate-300 text-xs">ROAS: {data.roas}x</p>
      </div>
    )
  }
  return null
}

// ==================== MAIN COMPONENT ====================

export function MarketingROIDashboard() {
  const [metric, setMetric] = useState<'roas' | 'ltvCac'>('roas')

  // Sort channel data by selected metric
  const sortedChannelData = [...channelData].sort((a, b) =>
    metric === 'roas' ? b.roas - a.roas : b.ltvCac - a.ltvCac
  )

  return (
    <div className="min-h-screen bg-[#0b1120]">
      <div className="max-w-[1200px] mx-auto px-8 py-6">

        {/* ==================== HEADER ==================== */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-white">Marketing ROI Dashboard</h1>
            <p className="text-sm text-slate-400">Where budget goes, what it returns, and where to move it.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-slate-300 hover:bg-slate-800 transition-colors">
              Last 90 Days
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="px-3 py-2 bg-slate-800/30 border border-slate-700 rounded-lg text-xs text-slate-400 hover:bg-slate-800/50 transition-colors">
              Compare Period
            </button>
          </div>
        </div>

        {/* ==================== SECTION 1: EXECUTIVE SUMMARY ==================== */}
        <div className="grid grid-cols-5 gap-3 mb-6">
          {executiveSummaryCards.map((card) => (
            <ExecutiveSummaryCard key={card.number} card={card} />
          ))}
        </div>

        {/* ==================== SECTION 2: KPI STRIP ==================== */}
        <div className="grid grid-cols-5 gap-3 mb-6">
          {kpiData.map((data, idx) => (
            <KPICard key={idx} data={data} />
          ))}
        </div>

        {/* ==================== SECTION 3: CHANNEL PERFORMANCE ==================== */}
        <div className="bg-[#020617] border border-slate-800 rounded-2xl p-5 mb-6">
          {/* Section Header */}
          <div className="border-b border-slate-800 pb-4 mb-5">
            <h2 className="text-lg font-semibold text-white">Marketing ROI</h2>
            <p className="text-xs text-slate-500">Channel efficiency analysis and budget optimization insights</p>
          </div>

          {/* Sub-header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-300">Channel Performance</h3>
              <p className="text-xs text-slate-500">Sorted by {metric === 'roas' ? 'ROAS' : 'LTV:CAC'} (highest to lowest) · Last 90 days</p>
            </div>
            <select
              value={metric}
              onChange={(e) => setMetric(e.target.value as 'roas' | 'ltvCac')}
              className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-300 cursor-pointer"
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
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
                  <XAxis type="number" stroke="#64748b" fontSize={11} tickFormatter={(v) => `${v}x`} />
                  <YAxis type="category" dataKey="channel" stroke="#64748b" fontSize={11} width={80} />
                  <Tooltip
                    formatter={(value: number) => [`${value}x`, metric === 'roas' ? 'ROAS' : 'LTV:CAC']}
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    labelStyle={{ color: '#f1f5f9' }}
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
            <div className="overflow-hidden rounded-lg border border-slate-700">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100/5">
                    <th className="px-3 py-2 text-left text-[10px] uppercase text-slate-400 font-medium">Channel</th>
                    <th className="px-3 py-2 text-right text-[10px] uppercase text-slate-400 font-medium">Spend</th>
                    <th className="px-3 py-2 text-right text-[10px] uppercase text-slate-400 font-medium">Revenue</th>
                    <th className="px-3 py-2 text-right text-[10px] uppercase text-slate-400 font-medium">ROAS</th>
                    <th className="px-3 py-2 text-right text-[10px] uppercase text-slate-400 font-medium">CAC</th>
                    <th className="px-3 py-2 text-right text-[10px] uppercase text-slate-400 font-medium">LTV:CAC</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedChannelData.map((row, idx) => (
                    <tr
                      key={row.channel}
                      className={`border-t border-slate-700 hover:bg-slate-800/50 transition-colors ${
                        idx === 0 ? 'border-l-2 border-l-emerald-500' :
                        row.roas < 1.5 ? 'border-l-2 border-l-rose-500' : ''
                      }`}
                    >
                      <td className="px-3 py-2 text-slate-200 font-medium">{row.channel}</td>
                      <td className="px-3 py-2 text-right text-slate-300">{formatCurrency(row.spend)}</td>
                      <td className="px-3 py-2 text-right text-slate-300">{formatCurrency(row.revenue)}</td>
                      <td className={`px-3 py-2 text-right font-semibold ${getROASColor(row.roas)}`}>{row.roas}x</td>
                      <td className="px-3 py-2 text-right text-slate-300">${row.cac}</td>
                      <td className={`px-3 py-2 text-right font-semibold ${getLTVCACColor(row.ltvCac)}`}>{row.ltvCac}x</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ==================== SECTION 4: TWO-COLUMN CHARTS ==================== */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Left: Scatter Plot */}
          <div className="bg-[#020617] border border-slate-800 rounded-2xl p-5">
            <h3 className="text-white font-semibold mb-1">Spend vs Revenue (by Campaign)</h3>
            <p className="text-xs text-slate-500 mb-4">Each dot is a campaign · Size = conversions · Line = break-even</p>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis
                    type="number"
                    dataKey="spend"
                    name="Spend"
                    stroke="#64748b"
                    fontSize={11}
                    tickFormatter={(v) => `$${v}K`}
                    domain={[0, 40]}
                  />
                  <YAxis
                    type="number"
                    dataKey="revenue"
                    name="Revenue"
                    stroke="#64748b"
                    fontSize={11}
                    tickFormatter={(v) => `$${v}K`}
                    domain={[0, 100]}
                  />
                  <Tooltip content={<ScatterTooltip />} />
                  <ReferenceLine
                    segment={[{ x: 0, y: 0 }, { x: 40, y: 40 }]}
                    stroke="#475569"
                    strokeDasharray="5 5"
                    label={{ value: 'ROAS = 1.0x', fill: '#64748b', fontSize: 10, position: 'end' }}
                  />
                  <Scatter name="Campaigns" data={scatterData}>
                    {scatterData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={getScatterColor(entry.roas)}
                        r={Math.sqrt(entry.conversions) * 1.5}
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right: Trend Chart */}
          <div className="bg-[#020617] border border-slate-800 rounded-2xl p-5">
            <h3 className="text-white font-semibold mb-1">ROI Trend Over Time</h3>
            <p className="text-xs text-slate-500 mb-4">Spend, Revenue & ROAS by Month</p>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={trendData} margin={{ top: 10, right: 30, bottom: 10, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                  <YAxis
                    yAxisId="left"
                    stroke="#64748b"
                    fontSize={11}
                    tickFormatter={(v) => `$${v}K`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#64748b"
                    fontSize={11}
                    tickFormatter={(v) => `${v}x`}
                    domain={[2, 4]}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    labelStyle={{ color: '#f1f5f9' }}
                    formatter={(value: number, name: string) => {
                      if (name === 'roas') return [`${value}x`, 'ROAS']
                      return [`$${value}K`, name === 'spend' ? 'Spend' : 'Revenue']
                    }}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: '10px' }}
                    formatter={(value) => <span className="text-slate-400 text-xs capitalize">{value}</span>}
                  />
                  <Bar yAxisId="left" dataKey="spend" fill="#475569" radius={[2, 2, 0, 0]} name="spend" />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2dd4bf"
                    strokeWidth={2}
                    dot={{ fill: '#2dd4bf', r: 3 }}
                    name="revenue"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="roas"
                    stroke="#22d3ee"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: '#22d3ee', r: 3 }}
                    name="roas"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-slate-500 mt-2">Goal: Maintain ROAS &gt; 3.0x while keeping CAC &lt; $450.</p>
          </div>
        </div>

        {/* ==================== SECTION 5: RECOMMENDATIONS ==================== */}
        <div className="bg-slate-900 border-l-4 border-teal-400 rounded-2xl p-5 mb-6">
          <h3 className="text-white font-semibold mb-4">Recommended Actions (Based on Current Period)</h3>
          <div className="space-y-3">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <ImpactPill impact={rec.impact} color={rec.color} />
                <p className="text-sm text-slate-300">{rec.text}</p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-slate-500 mt-4">
            Last updated: November 27, 2024 · Based on data from Aug 29 – Nov 27, 2024
          </p>
        </div>

        {/* ==================== FOOTER ==================== */}
        <footer className="text-center text-xs text-slate-600 py-4">
          Marketing ROI Dashboard · Portfolio Project · Synthetic Data for Demonstration
        </footer>
      </div>
    </div>
  )
}
