'use client'

import React, { useState, useMemo } from 'react'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ComposedChart, ScatterChart, Scatter, Cell
} from 'recharts'
import { TrendingUp, TrendingDown, DollarSign, Users, Target, Zap, ArrowRight, ChevronDown, CircleDot, Database, Lightbulb, RefreshCw } from 'lucide-react'

// Types
interface ChannelData {
  channel: string
  spend: number
  impressions: number
  clicks: number
  ctr: number
  cpc: number
  newUsers: number
  leads: number
  mql: number
  sql: number
  opportunities: number
  sales: number
  revenue: number
  cpl: number
  cac: number
  roas: number
  conversionRate: number
}

interface MonthlyTrend {
  month: string
  spend: number
  revenue: number
  leads: number
  sales: number
  cac: number
  roas: number
  leadToMql: number
  mqlToSql: number
  sqlToOpp: number
  oppToSale: number
}

interface FunnelStage {
  stage: string
  value: number
  rate: number
}

type Period = '3m' | '6m' | '12m'

// Generate realistic channel data
const generateChannelData = (period: Period): ChannelData[] => {
  const multiplier = period === '3m' ? 0.25 : period === '6m' ? 0.5 : 1

  const baseData: ChannelData[] = [
    {
      channel: 'Google Ads',
      spend: 125000,
      impressions: 2500000,
      clicks: 62500,
      ctr: 2.5,
      cpc: 2.0,
      newUsers: 45000,
      leads: 3125,
      mql: 1875,
      sql: 938,
      opportunities: 375,
      sales: 150,
      revenue: 450000,
      cpl: 40,
      cac: 833,
      roas: 3.6,
      conversionRate: 4.8
    },
    {
      channel: 'LinkedIn Ads',
      spend: 85000,
      impressions: 850000,
      clicks: 17000,
      ctr: 2.0,
      cpc: 5.0,
      newUsers: 12000,
      leads: 1700,
      mql: 1190,
      sql: 714,
      opportunities: 321,
      sales: 128,
      revenue: 512000,
      cpl: 50,
      cac: 664,
      roas: 6.0,
      conversionRate: 7.5
    },
    {
      channel: 'Meta Ads',
      spend: 65000,
      impressions: 3250000,
      clicks: 97500,
      ctr: 3.0,
      cpc: 0.67,
      newUsers: 72000,
      leads: 2925,
      mql: 1463,
      sql: 585,
      opportunities: 175,
      sales: 58,
      revenue: 145000,
      cpl: 22,
      cac: 1121,
      roas: 2.2,
      conversionRate: 2.0
    },
    {
      channel: 'Organic Search',
      spend: 35000,
      impressions: 1750000,
      clicks: 87500,
      ctr: 5.0,
      cpc: 0.4,
      newUsers: 65000,
      leads: 4375,
      mql: 2625,
      sql: 1313,
      opportunities: 525,
      sales: 210,
      revenue: 630000,
      cpl: 8,
      cac: 167,
      roas: 18.0,
      conversionRate: 4.8
    },
    {
      channel: 'Email Marketing',
      spend: 15000,
      impressions: 500000,
      clicks: 25000,
      ctr: 5.0,
      cpc: 0.6,
      newUsers: 5000,
      leads: 2500,
      mql: 1750,
      sql: 1050,
      opportunities: 420,
      sales: 189,
      revenue: 472500,
      cpl: 6,
      cac: 79,
      roas: 31.5,
      conversionRate: 7.6
    },
    {
      channel: 'Referral',
      spend: 25000,
      impressions: 125000,
      clicks: 12500,
      ctr: 10.0,
      cpc: 2.0,
      newUsers: 8500,
      leads: 1875,
      mql: 1500,
      sql: 1050,
      opportunities: 525,
      sales: 263,
      revenue: 788000,
      cpl: 13,
      cac: 95,
      roas: 31.5,
      conversionRate: 14.0
    }
  ]

  return baseData.map(channel => ({
    ...channel,
    spend: Math.round(channel.spend * multiplier),
    impressions: Math.round(channel.impressions * multiplier),
    clicks: Math.round(channel.clicks * multiplier),
    newUsers: Math.round(channel.newUsers * multiplier),
    leads: Math.round(channel.leads * multiplier),
    mql: Math.round(channel.mql * multiplier),
    sql: Math.round(channel.sql * multiplier),
    opportunities: Math.round(channel.opportunities * multiplier),
    sales: Math.round(channel.sales * multiplier),
    revenue: Math.round(channel.revenue * multiplier)
  }))
}

// Generate monthly trends
const generateMonthlyTrends = (period: Period): MonthlyTrend[] => {
  const months = period === '3m' ? 3 : period === '6m' ? 6 : 12
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const currentMonth = new Date().getMonth()

  return Array.from({ length: months }, (_, i) => {
    const monthIndex = (currentMonth - months + 1 + i + 12) % 12
    const seasonality = 1 + 0.15 * Math.sin((monthIndex / 12) * Math.PI * 2)
    const growth = 1 + (i / months) * 0.2

    return {
      month: monthNames[monthIndex],
      spend: Math.round(35000 * seasonality * growth),
      revenue: Math.round(250000 * seasonality * growth * (1 + Math.random() * 0.1)),
      leads: Math.round(1400 * seasonality * growth),
      sales: Math.round(85 * seasonality * growth),
      cac: Math.round(400 + Math.random() * 100),
      roas: Number((7 + Math.random() * 3).toFixed(1)),
      leadToMql: Number((58 + Math.random() * 8).toFixed(1)),
      mqlToSql: Number((52 + Math.random() * 8).toFixed(1)),
      sqlToOpp: Number((38 + Math.random() * 8).toFixed(1)),
      oppToSale: Number((42 + Math.random() * 8).toFixed(1))
    }
  })
}

// Channel color palette
const CHANNEL_COLORS: Record<string, string> = {
  'Google Ads': '#4285F4',
  'LinkedIn Ads': '#0077B5',
  'Meta Ads': '#1877F2',
  'Organic Search': '#10b981',
  'Email Marketing': '#f59e0b',
  'Referral': '#8b5cf6'
}

// Executive Summary Card Data
interface SummaryCardData {
  icon: React.ElementType
  number: string
  title: string
  description: string
  highlight?: string
}

const executiveSummaryCards: SummaryCardData[] = [
  {
    icon: CircleDot,
    number: '01',
    title: 'PROBLEM',
    description: 'Marketing spend up 40% YoY but acquisition slowed. Which channels to scale vs cut?'
  },
  {
    icon: Database,
    number: '02',
    title: 'DATA USED',
    description: 'GA4 events, Google/Meta/LinkedIn Ads, CRM pipeline. 192K users, $148K spend.'
  },
  {
    icon: Lightbulb,
    number: '03',
    title: 'KEY FINDING',
    description: 'Meta Retargeting: 5.7x ROAS. Referral burns cash at 0.6x. Funnel leaks at Engaged→Lead.',
    highlight: '70% rev from top 2 channels'
  },
  {
    icon: RefreshCw,
    number: '04',
    title: 'RECOMMENDATION',
    description: 'Cut Referral 80%, shift to Meta Retargeting & Google Search. A/B test landing pages.'
  },
  {
    icon: TrendingUp,
    number: '05',
    title: 'EXPECTED IMPACT',
    description: 'Projected +$52K revenue/quarter. CAC drops from $264 → $217.',
    highlight: '−18% CAC improvement'
  }
]

// Executive Summary Card Component
const ExecutiveSummaryCard = ({ card }: { card: SummaryCardData }) => {
  const Icon = card.icon
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col">
      {/* Top Row: Icon + Step Number */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50">
          <Icon className="h-5 w-5 text-teal-500" />
        </div>
        <span className="text-sm font-semibold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">
          {card.number}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xs font-bold uppercase tracking-wide text-gray-900 mt-3">
        {card.title}
      </h3>

      {/* Description */}
      <p className="text-xs text-gray-500 leading-relaxed mt-2 flex-1">
        {card.description}
      </p>

      {/* Highlight (optional) */}
      {card.highlight && (
        <p className="text-xs font-semibold text-teal-600 mt-2">
          {card.highlight}
        </p>
      )}
    </div>
  )
}

// Executive Summary Bar Component
const ExecutiveSummaryBar = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
    {executiveSummaryCards.map((card) => (
      <ExecutiveSummaryCard key={card.number} card={card} />
    ))}
  </div>
)

export function AcquisitionFunnel() {
  const [period, setPeriod] = useState<Period>('12m')

  const channelData = useMemo(() => generateChannelData(period), [period])
  const monthlyTrends = useMemo(() => generateMonthlyTrends(period), [period])

  // Calculate totals
  const totals = useMemo(() => {
    return channelData.reduce(
      (acc, ch) => ({
        spend: acc.spend + ch.spend,
        newUsers: acc.newUsers + ch.newUsers,
        leads: acc.leads + ch.leads,
        mql: acc.mql + ch.mql,
        sql: acc.sql + ch.sql,
        opportunities: acc.opportunities + ch.opportunities,
        sales: acc.sales + ch.sales,
        revenue: acc.revenue + ch.revenue
      }),
      { spend: 0, newUsers: 0, leads: 0, mql: 0, sql: 0, opportunities: 0, sales: 0, revenue: 0 }
    )
  }, [channelData])

  // Funnel data
  const funnelData: FunnelStage[] = useMemo(() => [
    { stage: 'New Users', value: totals.newUsers, rate: 100 },
    { stage: 'Leads', value: totals.leads, rate: Number(((totals.leads / totals.newUsers) * 100).toFixed(1)) },
    { stage: 'MQL', value: totals.mql, rate: Number(((totals.mql / totals.leads) * 100).toFixed(1)) },
    { stage: 'SQL', value: totals.sql, rate: Number(((totals.sql / totals.mql) * 100).toFixed(1)) },
    { stage: 'Opportunity', value: totals.opportunities, rate: Number(((totals.opportunities / totals.sql) * 100).toFixed(1)) },
    { stage: 'Closed Won', value: totals.sales, rate: Number(((totals.sales / totals.opportunities) * 100).toFixed(1)) }
  ], [totals])

  // Heatmap data for conversion rates by channel
  const heatmapData = useMemo(() => {
    return channelData.map(ch => ({
      channel: ch.channel,
      'Lead→MQL': Number(((ch.mql / ch.leads) * 100).toFixed(1)),
      'MQL→SQL': Number(((ch.sql / ch.mql) * 100).toFixed(1)),
      'SQL→Opp': Number(((ch.opportunities / ch.sql) * 100).toFixed(1)),
      'Opp→Sale': Number(((ch.sales / ch.opportunities) * 100).toFixed(1))
    }))
  }, [channelData])

  // Format functions
  const formatCurrency = (value: number): string => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
    return `$${value}`
  }

  const formatNumber = (value: number): string => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`
    return value.toString()
  }

  // KPI Card Component
  const KPICard = ({ title, value, subtitle, icon: Icon, trend, trendValue, color = 'primary' }: {
    title: string
    value: string
    subtitle: string
    icon: React.ElementType
    trend?: 'up' | 'down'
    trendValue?: string
    color?: string
  }) => (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg bg-${color === 'primary' ? 'teal' : color}-50`}>
          <Icon className={`w-5 h-5 text-${color === 'primary' ? 'teal' : color}-600`} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
            {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-slate-900 mb-1">{value}</p>
      <p className="text-xs text-slate-500 uppercase tracking-wide">{title}</p>
      <p className="text-sm text-slate-600 mt-1">{subtitle}</p>
    </div>
  )

  // Heatmap cell color
  const getHeatmapColor = (value: number): string => {
    if (value >= 70) return 'bg-emerald-500 text-white'
    if (value >= 55) return 'bg-emerald-400 text-white'
    if (value >= 45) return 'bg-yellow-400 text-slate-900'
    if (value >= 35) return 'bg-orange-400 text-white'
    return 'bg-red-400 text-white'
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Acquisition & Funnel Performance</h1>
          <p className="text-slate-600 mt-1">Track marketing spend efficiency and conversion funnel health</p>
        </div>
        <div className="relative">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as Period)}
            className="appearance-none bg-white border border-slate-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-slate-700 hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
          >
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="12m">Last 12 Months</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Executive Summary Bar */}
      <ExecutiveSummaryBar />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <KPICard
          title="Total Spend"
          value={formatCurrency(totals.spend)}
          subtitle="Marketing investment"
          icon={DollarSign}
          trend="up"
          trendValue="+12%"
        />
        <KPICard
          title="New Users"
          value={formatNumber(totals.newUsers)}
          subtitle={`${formatCurrency(totals.spend / totals.newUsers)} per user`}
          icon={Users}
          trend="up"
          trendValue="+8%"
        />
        <KPICard
          title="Leads"
          value={formatNumber(totals.leads)}
          subtitle={`${formatCurrency(totals.spend / totals.leads)} CPL`}
          icon={Target}
          trend="up"
          trendValue="+15%"
        />
        <KPICard
          title="Opportunities"
          value={formatNumber(totals.opportunities)}
          subtitle={`${((totals.opportunities / totals.leads) * 100).toFixed(1)}% from leads`}
          icon={Zap}
          trend="up"
          trendValue="+10%"
        />
        <KPICard
          title="Sales"
          value={formatNumber(totals.sales)}
          subtitle={`${formatCurrency(totals.spend / totals.sales)} CAC`}
          icon={TrendingUp}
          trend="up"
          trendValue="+18%"
        />
        <KPICard
          title="Efficiency"
          value={`${((totals.revenue / totals.spend)).toFixed(1)}x`}
          subtitle={`${formatCurrency(totals.revenue)} revenue`}
          icon={Target}
          trend="up"
          trendValue="+0.5x"
          color="emerald"
        />
      </div>

      {/* Funnel Visualization */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-6">Conversion Funnel</h2>
        <div className="flex flex-col items-center space-y-2">
          {funnelData.map((stage, index) => {
            const widthPercent = 100 - (index * 15)
            const isLast = index === funnelData.length - 1
            return (
              <div key={stage.stage} className="w-full flex flex-col items-center">
                <div
                  className="relative bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg py-4 px-6 text-white text-center transition-all hover:from-teal-600 hover:to-teal-700"
                  style={{ width: `${widthPercent}%` }}
                >
                  <p className="text-lg font-bold">{formatNumber(stage.value)}</p>
                  <p className="text-sm opacity-90">{stage.stage}</p>
                  {index > 0 && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-teal-600 text-xs font-semibold px-2 py-0.5 rounded-full border border-teal-200">
                      {stage.rate}%
                    </span>
                  )}
                </div>
                {!isLast && (
                  <div className="my-1">
                    <ArrowRight className="w-5 h-5 text-slate-300 rotate-90" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <div className="mt-6 flex justify-center gap-8 text-sm text-slate-600">
          <div className="text-center">
            <p className="text-2xl font-bold text-teal-600">{((totals.sales / totals.newUsers) * 100).toFixed(2)}%</p>
            <p>Overall Conversion</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-teal-600">{formatCurrency(totals.spend / totals.sales)}</p>
            <p>Avg CAC</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-teal-600">{formatCurrency(totals.revenue / totals.sales)}</p>
            <p>Avg Deal Size</p>
          </div>
        </div>
      </div>

      {/* Conversion Heatmap */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Conversion Rates by Channel</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Channel</th>
                <th className="text-center py-3 px-4 font-semibold text-slate-700">Lead→MQL</th>
                <th className="text-center py-3 px-4 font-semibold text-slate-700">MQL→SQL</th>
                <th className="text-center py-3 px-4 font-semibold text-slate-700">SQL→Opp</th>
                <th className="text-center py-3 px-4 font-semibold text-slate-700">Opp→Sale</th>
              </tr>
            </thead>
            <tbody>
              {heatmapData.map((row) => (
                <tr key={row.channel} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 font-medium text-slate-900">{row.channel}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-block w-16 py-1 rounded ${getHeatmapColor(row['Lead→MQL'])}`}>
                      {row['Lead→MQL']}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-block w-16 py-1 rounded ${getHeatmapColor(row['MQL→SQL'])}`}>
                      {row['MQL→SQL']}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-block w-16 py-1 rounded ${getHeatmapColor(row['SQL→Opp'])}`}>
                      {row['SQL→Opp']}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-block w-16 py-1 rounded ${getHeatmapColor(row['Opp→Sale'])}`}>
                      {row['Opp→Sale']}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center justify-end gap-2 text-xs text-slate-500">
          <span>Conversion Rate:</span>
          <span className="px-2 py-0.5 rounded bg-red-400 text-white">&lt;35%</span>
          <span className="px-2 py-0.5 rounded bg-orange-400 text-white">35-44%</span>
          <span className="px-2 py-0.5 rounded bg-yellow-400 text-slate-900">45-54%</span>
          <span className="px-2 py-0.5 rounded bg-emerald-400 text-white">55-69%</span>
          <span className="px-2 py-0.5 rounded bg-emerald-500 text-white">70%+</span>
        </div>
      </div>

      {/* Channel Performance Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Channel Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-3 font-semibold text-slate-700">Channel</th>
                <th className="text-right py-3 px-3 font-semibold text-slate-700">Spend</th>
                <th className="text-right py-3 px-3 font-semibold text-slate-700">CPC</th>
                <th className="text-right py-3 px-3 font-semibold text-slate-700">Leads</th>
                <th className="text-right py-3 px-3 font-semibold text-slate-700">CPL</th>
                <th className="text-right py-3 px-3 font-semibold text-slate-700">Sales</th>
                <th className="text-right py-3 px-3 font-semibold text-slate-700">CAC</th>
                <th className="text-right py-3 px-3 font-semibold text-slate-700">Revenue</th>
                <th className="text-right py-3 px-3 font-semibold text-slate-700">ROAS</th>
              </tr>
            </thead>
            <tbody>
              {channelData.map((ch) => (
                <tr key={ch.channel} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: CHANNEL_COLORS[ch.channel] }}
                      />
                      <span className="font-medium text-slate-900">{ch.channel}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right text-slate-700">{formatCurrency(ch.spend)}</td>
                  <td className="py-3 px-3 text-right text-slate-700">${ch.cpc.toFixed(2)}</td>
                  <td className="py-3 px-3 text-right text-slate-700">{formatNumber(ch.leads)}</td>
                  <td className="py-3 px-3 text-right text-slate-700">${ch.cpl}</td>
                  <td className="py-3 px-3 text-right text-slate-700">{ch.sales}</td>
                  <td className="py-3 px-3 text-right text-slate-700">${ch.cac}</td>
                  <td className="py-3 px-3 text-right font-medium text-slate-900">{formatCurrency(ch.revenue)}</td>
                  <td className="py-3 px-3 text-right">
                    <span className={`font-semibold ${ch.roas >= 10 ? 'text-emerald-600' : ch.roas >= 5 ? 'text-teal-600' : ch.roas >= 3 ? 'text-yellow-600' : 'text-red-500'}`}>
                      {ch.roas.toFixed(1)}x
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50 font-semibold">
                <td className="py-3 px-3 text-slate-900">Total</td>
                <td className="py-3 px-3 text-right text-slate-900">{formatCurrency(totals.spend)}</td>
                <td className="py-3 px-3 text-right text-slate-700">—</td>
                <td className="py-3 px-3 text-right text-slate-900">{formatNumber(totals.leads)}</td>
                <td className="py-3 px-3 text-right text-slate-700">${Math.round(totals.spend / totals.leads)}</td>
                <td className="py-3 px-3 text-right text-slate-900">{totals.sales}</td>
                <td className="py-3 px-3 text-right text-slate-700">${Math.round(totals.spend / totals.sales)}</td>
                <td className="py-3 px-3 text-right text-slate-900">{formatCurrency(totals.revenue)}</td>
                <td className="py-3 px-3 text-right text-teal-600">{(totals.revenue / totals.spend).toFixed(1)}x</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* ROAS vs Spend Scatter */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">ROAS vs Spend by Channel</h2>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="spend"
                name="Spend"
                tickFormatter={(v) => formatCurrency(v)}
                tick={{ fontSize: 12, fill: '#64748b' }}
              />
              <YAxis
                dataKey="roas"
                name="ROAS"
                tickFormatter={(v) => `${v}x`}
                tick={{ fontSize: 12, fill: '#64748b' }}
              />
              <Tooltip
                formatter={(value: number, name: string) =>
                  name === 'Spend' ? formatCurrency(value) : `${value}x`
                }
                labelFormatter={(_, payload) => payload[0]?.payload?.channel || ''}
              />
              <Scatter data={channelData} fill="#0d9488">
                {channelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CHANNEL_COLORS[entry.channel]} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {channelData.map((ch) => (
              <div key={ch.channel} className="flex items-center gap-1.5 text-xs text-slate-600">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: CHANNEL_COLORS[ch.channel] }} />
                {ch.channel}
              </div>
            ))}
          </div>
        </div>

        {/* Spend vs Revenue Distribution */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Spend % vs Revenue %</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={channelData.map(ch => ({
                channel: ch.channel.replace(' Ads', '').replace(' Marketing', ''),
                'Spend %': Number(((ch.spend / totals.spend) * 100).toFixed(1)),
                'Revenue %': Number(((ch.revenue / totals.revenue) * 100).toFixed(1))
              }))}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="channel"
                tick={{ fontSize: 11, fill: '#64748b' }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip formatter={(value: number) => `${value}%`} />
              <Legend />
              <Bar dataKey="Spend %" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Revenue %" fill="#0d9488" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trends Over Time */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Spend & Revenue Trend */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Spend & Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={monthlyTrends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis yAxisId="left" tickFormatter={(v) => formatCurrency(v)} tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `${v}x`} tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip
                formatter={(value: number, name: string) =>
                  name === 'ROAS' ? `${value}x` : formatCurrency(value)
                }
              />
              <Legend />
              <Bar yAxisId="left" dataKey="spend" name="Spend" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="#0d9488" radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="roas" name="ROAS" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b' }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Conversion Rate Trends */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Conversion Rate Trends</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyTrends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 12, fill: '#64748b' }} domain={[30, 70]} />
              <Tooltip formatter={(value: number) => `${value}%`} />
              <Legend />
              <Line type="monotone" dataKey="leadToMql" name="Lead→MQL" stroke="#0d9488" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="mqlToSql" name="MQL→SQL" stroke="#6366f1" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="sqlToOpp" name="SQL→Opp" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="oppToSale" name="Opp→Sale" stroke="#ec4899" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Insights */}
      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl border border-teal-200 p-6">
        <h2 className="text-lg font-semibold text-teal-900 mb-4">Quick Insights</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white/80 rounded-lg p-4">
            <p className="text-sm font-medium text-teal-800">Top Performer</p>
            <p className="text-lg font-bold text-teal-900">Email Marketing</p>
            <p className="text-sm text-teal-700">31.5x ROAS with lowest CAC ($79)</p>
          </div>
          <div className="bg-white/80 rounded-lg p-4">
            <p className="text-sm font-medium text-teal-800">Highest Volume</p>
            <p className="text-lg font-bold text-teal-900">Organic Search</p>
            <p className="text-sm text-teal-700">{formatNumber(channelData.find(c => c.channel === 'Organic Search')?.leads || 0)} leads at $8 CPL</p>
          </div>
          <div className="bg-white/80 rounded-lg p-4">
            <p className="text-sm font-medium text-teal-800">Best Conversion</p>
            <p className="text-lg font-bold text-teal-900">Referral</p>
            <p className="text-sm text-teal-700">14% lead-to-sale conversion rate</p>
          </div>
        </div>
      </div>
    </div>
  )
}
