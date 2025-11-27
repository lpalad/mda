'use client'

import { useState } from 'react'
import { Lead } from '@/app/types/lead'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { CircleDot, Database, Lightbulb, RefreshCw, TrendingUp } from 'lucide-react'
import {
  getQualityScoreDistribution, getLeadSegmentation, getSourceVsQuality,
  getFeatureImportance, getFunnelByQuality, getQualityHeatmap, getQualityTrendLine,
} from '@/app/lib/generateData'

interface LeadQualityAnalyticsProps {
  leads: Lead[]
}

const QUALITY_COLORS = {
  High: '#10b981',
  Medium: '#f59e0b',
  Low: '#ef4444',
}

// Card primitives
interface CardProps {
  children: React.ReactNode
  className?: string
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-white border border-slate-200 rounded-lg p-6 ${className}`}>
    {children}
  </div>
)

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
)

interface CardTitleProps {
  children: React.ReactNode
  className?: string
}

const CardTitle: React.FC<CardTitleProps> = ({ children, className = '' }) => (
  <h3 className={`text-sm font-semibold text-slate-900 ${className}`}>{children}</h3>
)

interface CardContentProps {
  children: React.ReactNode
  className?: string
}

const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
)

// Sparkline component with SVG
interface SparklineProps {
  values: number[]
  color: string
}

const Sparkline: React.FC<SparklineProps> = ({ values, color }) => {
  const width = 100
  const height = 40
  const padding = 4
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  const minVal = Math.min(...values)
  const maxVal = Math.max(...values)
  const range = maxVal - minVal || 1

  const points = values.map((val, idx) => {
    const x = padding + (idx / (values.length - 1)) * chartWidth
    const y = height - padding - ((val - minVal) / range) * chartHeight
    return `${x},${y}`
  }).join(' ')

  const pathData = `M ${values.map((val, idx) => {
    const x = padding + (idx / (values.length - 1)) * chartWidth
    const y = height - padding - ((val - minVal) / range) * chartHeight
    return `${x},${y}`
  }).join(' L ')}`

  const areaPath = `M ${padding},${height - padding} L ${pathData.substring(2)} L ${width - padding},${height - padding} Z`

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="mt-3 w-full">
      <defs>
        <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#gradient-${color})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" />
    </svg>
  )
}

// Quality card with sparkline
interface LeadQualityCardProps {
  label: string
  percentage: number
  count: number
  trend: number[]
  trendLabel: string
  color: string
}

const LeadQualityCard: React.FC<LeadQualityCardProps> = ({
  label,
  percentage,
  count,
  trend,
  trendLabel,
  color,
}) => {
  return (
    <Card className="animate-stagger">
      <CardHeader>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <p style={{ color }} className="text-3xl font-semibold">
          {percentage}%
        </p>
        <p className="mt-1 text-sm text-slate-700 font-semibold">{count.toLocaleString()} leads</p>
        <Sparkline values={trend} color={color} />
        <p className="mt-2 text-[11px] text-slate-500">{trendLabel}</p>
      </CardContent>
    </Card>
  )
}

// SVG Donut Chart component
interface DonutSegment {
  name: string
  value: number
  color: string
}

interface DonutChartProps {
  segments: DonutSegment[]
}

const DonutChart: React.FC<DonutChartProps> = ({ segments }) => {
  const total: number = segments.reduce((sum, s) => sum + s.value, 0)
  const radius = 45
  const circumference = 2 * Math.PI * radius
  let currentOffset = 0
  const dashArrays = segments.map((segment) => {
    const ratio = segment.value / total
    const offset = currentOffset
    currentOffset += ratio * circumference
    return { offset, ratio, circumference }
  })

  return (
    <div className="flex flex-col items-center">
      <svg width="140" height="140" viewBox="0 0 140 140" className="mb-4">
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="12"
        />
        {segments.map((segment, idx) => {
          const ratio = segment.value / total
          const offset = dashArrays.slice(0, idx).reduce((sum: number, d) => sum + d.circumference * d.ratio, 0)
          return (
            <circle
              key={segment.name}
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth="12"
              strokeLinecap="round"
              style={{
                strokeDasharray: `${ratio * circumference} ${circumference}`,
                transform: `rotate(${(offset / circumference) * 360}deg)`,
                transformOrigin: '70px 70px',
              }}
            />
          )
        })}
      </svg>
      <div className="space-y-2 w-full">
        {segments.map((segment) => (
          <div key={segment.name} className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: segment.color }}
            />
            <span className="text-xs text-slate-600">
              {segment.name} ({Math.round((segment.value / total) * 100)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

const PERIOD_OPTIONS = [
  { value: 'last-7', label: 'Last 7 Days' },
  { value: 'last-30', label: 'Last 30 Days' },
  { value: 'last-90', label: 'Last 90 Days' },
  { value: 'year-to-date', label: 'Year to Date' },
  { value: 'all-time', label: 'All Time' },
]

// Executive Summary Card Data for Lead Quality Analytics
interface LeadQualitySummaryCardData {
  icon: React.ElementType
  number: string
  title: string
  description: string
  highlight?: string
}

const leadQualityExecutiveSummaryCards: LeadQualitySummaryCardData[] = [
  {
    icon: CircleDot,
    number: '01',
    title: 'PROBLEM',
    description: '68% of leads never convert. Sales team wastes 40% of time on low-quality prospects. Need predictive scoring.'
  },
  {
    icon: Database,
    number: '02',
    title: 'DATA USED',
    description: 'CRM lead data, engagement signals, firmographics. 1,200+ leads across 6 channels, 12-month analysis.'
  },
  {
    icon: Lightbulb,
    number: '03',
    title: 'KEY FINDING',
    description: 'Referral leads convert at 3.2x rate vs paid. Engagement score + company size = 78% prediction accuracy.',
    highlight: 'Top 30% leads = 72% revenue'
  },
  {
    icon: RefreshCw,
    number: '04',
    title: 'RECOMMENDATION',
    description: 'Implement ML scoring model. Auto-route high-quality leads to senior reps. Nurture medium-quality via email.'
  },
  {
    icon: TrendingUp,
    number: '05',
    title: 'EXPECTED IMPACT',
    description: 'Projected +35% qualified pipeline. Sales efficiency up 40%. Win rate improves from 18% → 28%.',
    highlight: '+56% win rate improvement'
  }
]

// Executive Summary Card Component for Lead Quality
const LeadQualityExecutiveSummaryCard = ({ card }: { card: LeadQualitySummaryCardData }) => {
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

// Executive Summary Bar Component for Lead Quality
const LeadQualityExecutiveSummaryBar = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
    {leadQualityExecutiveSummaryCards.map((card) => (
      <LeadQualityExecutiveSummaryCard key={card.number} card={card} />
    ))}
  </div>
)

export function LeadQualityAnalytics({ leads }: LeadQualityAnalyticsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('last-30')

  // Apply period-based multiplier to generate different data for each period
  const periodMultipliers: Record<string, number> = {
    'last-7': 0.12,
    'last-30': 1,
    'last-90': 3.2,
    'year-to-date': 8.5,
    'all-time': 12,
  }

  const multiplier = periodMultipliers[selectedPeriod]

  const baseScoreDistribution = getQualityScoreDistribution(leads)
  const segmentation = getLeadSegmentation(leads)
  const baseSourceQuality = getSourceVsQuality(leads)
  const featureImportance = getFeatureImportance()
  const baseFunnelData = getFunnelByQuality(leads)
  const baseHeatmapData = getQualityHeatmap(leads)
  const baseTrendData = getQualityTrendLine(leads)

  // Scale chart data based on multiplier
  const scoreDistribution = baseScoreDistribution.map(item => ({
    ...item,
    count: Math.round(item.count * multiplier),
  }))

  const sourceQuality = baseSourceQuality.map(item => ({
    ...item,
    High: Math.round(item.High * multiplier),
    Medium: Math.round(item.Medium * multiplier),
    Low: Math.round(item.Low * multiplier),
  }))

  const funnelData = baseFunnelData.map(item => ({
    ...item,
    High: Math.round(item.High * multiplier),
    Medium: Math.round(item.Medium * multiplier),
    Low: Math.round(item.Low * multiplier),
  }))

  const heatmapData = baseHeatmapData.map(item => ({
    ...item,
    score: Math.round(item.score * multiplier),
  }))

  const trendData = baseTrendData.map(item => ({
    ...item,
    High: Math.round(item.High * multiplier),
    Medium: Math.round(item.Medium * multiplier),
    Low: Math.round(item.Low * multiplier),
  }))

  // Apply multiplier to metrics for visual change with period selection
  const scaledSegmentation = {
    high: {
      count: Math.round(segmentation.high.count * multiplier),
      percentage: Math.round(Number(segmentation.high.percentage) * (0.8 + Math.random() * 0.4)),
    },
    medium: {
      count: Math.round(segmentation.medium.count * multiplier),
      percentage: Math.round(Number(segmentation.medium.percentage) * (0.8 + Math.random() * 0.4)),
    },
    low: {
      count: Math.round(segmentation.low.count * multiplier),
      percentage: Math.round(Number(segmentation.low.percentage) * (0.8 + Math.random() * 0.4)),
    },
  }

  // Ensure percentages add up to 100
  const totalPercentage = scaledSegmentation.high.percentage + scaledSegmentation.medium.percentage + scaledSegmentation.low.percentage
  scaledSegmentation.high.percentage = Math.round((scaledSegmentation.high.percentage / totalPercentage) * 100)
  scaledSegmentation.medium.percentage = Math.round((scaledSegmentation.medium.percentage / totalPercentage) * 100)
  scaledSegmentation.low.percentage = 100 - scaledSegmentation.high.percentage - scaledSegmentation.medium.percentage

  // Generate trend data for each quality level (7 data points)
  const generateTrend = (base: number, variance: number = 0.05): number[] => {
    return Array.from({ length: 7 }, (_, i) => {
      const variation = (Math.random() - 0.5) * variance * base
      return Math.round(base + (i - 3) * (base * 0.02) + variation)
    })
  }

  const highTrend = generateTrend(scaledSegmentation.high.percentage, 0.03)
  const mediumTrend = generateTrend(scaledSegmentation.medium.percentage, 0.03)
  const lowTrend = generateTrend(scaledSegmentation.low.percentage, 0.03)

  return (
    <section className="space-y-8">
      {/* HEADER */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
          Business Intelligence Platform | Leonard Palad - Principle Business Analyst
        </p>
        <h1 className="text-3xl font-bold text-slate-900">Lead Quality Analytics</h1>
        <p className="text-slate-600 mt-1">Conversion from MQL to SQL by channel.</p>

        {/* Period Filter - Rounded Pills */}
        <div className="mt-6 flex items-center gap-3 flex-wrap">
          {PERIOD_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedPeriod(option.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedPeriod === option.value
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Executive Summary Bar */}
      <LeadQualityExecutiveSummaryBar />

      {/* KPI CARDS + DONUT CHART (Top Section) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-stagger-container">
        {/* High-Quality Card with SVG Sparkline */}
        <LeadQualityCard
          label="High-Quality Leads"
          percentage={scaledSegmentation.high.percentage}
          count={scaledSegmentation.high.count}
          trend={highTrend}
          trendLabel="↑ +3 pts vs last 30 days"
          color={QUALITY_COLORS.High}
        />

        {/* Medium-Quality Card with SVG Sparkline */}
        <LeadQualityCard
          label="Medium-Quality Leads"
          percentage={scaledSegmentation.medium.percentage}
          count={scaledSegmentation.medium.count}
          trend={mediumTrend}
          trendLabel="→ Stable vs last 30 days"
          color={QUALITY_COLORS.Medium}
        />

        {/* Low-Quality Card with SVG Sparkline */}
        <LeadQualityCard
          label="Low-Quality Leads"
          percentage={scaledSegmentation.low.percentage}
          count={scaledSegmentation.low.count}
          trend={lowTrend}
          trendLabel="↓ -2 pts vs last 30 days"
          color={QUALITY_COLORS.Low}
        />

        {/* Quality Mix SVG Donut Chart */}
        <Card className="animate-stagger flex flex-col items-center justify-center">
          <CardHeader>
            <CardTitle className="text-center">Quality Mix</CardTitle>
          </CardHeader>
          <CardContent className="w-full flex flex-col items-center">
            <DonutChart
              segments={[
                { name: 'High', value: scaledSegmentation.high.count, color: QUALITY_COLORS.High },
                { name: 'Medium', value: scaledSegmentation.medium.count, color: QUALITY_COLORS.Medium },
                { name: 'Low', value: scaledSegmentation.low.count, color: QUALITY_COLORS.Low },
              ]}
            />
          </CardContent>
        </Card>
      </div>

      {/* CHART 1 — Quality Score Distribution Histogram */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 animate-scale-in">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Lead Quality Score Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={scoreDistribution}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="range" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
              }}
            />
            <Bar dataKey="count" fill="#0d9488" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* CHART 3 — Lead Source vs Quality Stacked Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 animate-scale-in">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Lead Source vs Quality</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sourceQuality}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="channel" stroke="#64748b" angle={-45} textAnchor="end" height={80} />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
              }}
            />
            <Legend />
            <Bar dataKey="High" stackId="a" fill={QUALITY_COLORS.High} />
            <Bar dataKey="Medium" stackId="a" fill={QUALITY_COLORS.Medium} />
            <Bar dataKey="Low" stackId="a" fill={QUALITY_COLORS.Low} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* CHART 4 — Feature Importance Horizontal Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 animate-scale-in">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Predictive Model: Feature Importance</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={featureImportance}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 200, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis type="number" stroke="#64748b" />
            <YAxis type="category" dataKey="feature" stroke="#64748b" width={190} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
              }}
            />
            <Bar dataKey="importance" fill="#0d9488" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* CHART 5 — Lead Quality Through Funnel */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 animate-scale-in">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Lead Quality Through the Funnel</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={funnelData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="stage" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
              }}
            />
            <Legend />
            <Bar dataKey="High" stackId="a" fill={QUALITY_COLORS.High} />
            <Bar dataKey="Medium" stackId="a" fill={QUALITY_COLORS.Medium} />
            <Bar dataKey="Low" stackId="a" fill={QUALITY_COLORS.Low} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* CHART 6 — Quality Heatmap (Day/Time) */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 animate-scale-in">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Lead Quality by Day & Time</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="text-left p-2 text-slate-600">Hour / Day</th>
                <th className="text-center p-2 text-slate-600">Mon</th>
                <th className="text-center p-2 text-slate-600">Tue</th>
                <th className="text-center p-2 text-slate-600">Wed</th>
                <th className="text-center p-2 text-slate-600">Thu</th>
                <th className="text-center p-2 text-slate-600">Fri</th>
                <th className="text-center p-2 text-slate-600">Sat</th>
                <th className="text-center p-2 text-slate-600">Sun</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 24 }, (_, i) => `${i}:00`).map((hour, hourIdx) => (
                <tr key={hourIdx}>
                  <td className="p-2 font-medium text-slate-700">{hour}</td>
                  {Array.from({ length: 7 }).map((_, dayIdx) => {
                    const cellData = heatmapData.find(d => d.hour === hour && d.day.slice(0, 3) === ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][dayIdx])
                    const score = cellData?.score || 0
                    const intensity = Math.max(0, Math.min(255, score * 2.55))
                    const bgColor = `rgba(13, 148, 136, ${intensity / 255})`

                    return (
                      <td
                        key={dayIdx}
                        className="p-2 text-center font-medium text-white"
                        style={{ backgroundColor: bgColor }}
                      >
                        {score}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CHART 7 — Quality Trend Over Time */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 animate-scale-in">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Lead Quality Trend Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="week" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="High" stroke={QUALITY_COLORS.High} strokeWidth={3} />
            <Line type="monotone" dataKey="Medium" stroke={QUALITY_COLORS.Medium} strokeWidth={3} />
            <Line type="monotone" dataKey="Low" stroke={QUALITY_COLORS.Low} strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
