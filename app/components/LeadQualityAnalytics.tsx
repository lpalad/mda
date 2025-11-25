'use client'

import { useState } from 'react'
import { Lead } from '@/app/types/lead'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts'
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

const TREND_COLORS = {
  High: 'emerald',
  Medium: 'amber',
  Low: 'rose',
}

// Helper component for trend sparklines
interface TrendBarsProps {
  values: number[]
  variant: 'High' | 'Medium' | 'Low'
}

const TrendBars: React.FC<TrendBarsProps> = ({ values, variant }) => {
  const max = Math.max(...values)
  const colorMap: Record<string, string> = {
    emerald: 'bg-emerald-400/70',
    amber: 'bg-amber-400/70',
    rose: 'bg-rose-400/70',
  }
  const color = TREND_COLORS[variant]
  const bgColor = colorMap[color] || 'bg-slate-400/70'

  return (
    <div className="mt-3 flex h-8 items-end gap-1">
      {values.map((v, i) => {
        const height = (v / max) * 100
        return (
          <div
            key={i}
            className={`flex-1 rounded-sm ${bgColor}`}
            style={{ height: `${height}%`, minHeight: '2px' }}
          />
        )
      })}
    </div>
  )
}

// Helper component for quality cards with trends
interface QualityCardProps {
  label: string
  percentage: number
  count: number
  trend: number[]
  trendLabel: string
  variant: 'High' | 'Medium' | 'Low'
}

const QualityCard: React.FC<QualityCardProps> = ({
  label,
  percentage,
  count,
  trend,
  trendLabel,
  variant,
}) => {
  const colorClass = {
    High: 'text-emerald-600',
    Medium: 'text-amber-600',
    Low: 'text-rose-600',
  }[variant]

  return (
    <div className="flex flex-col rounded-lg border border-slate-200 bg-white/90 p-5 shadow-sm animate-stagger">
      <p className="text-xs font-medium text-slate-600">{label}</p>
      <p className={`mt-2 text-3xl font-semibold ${colorClass}`}>{percentage}%</p>
      <p className="mt-1 text-sm text-slate-700 font-semibold">{count.toLocaleString()} leads</p>

      <TrendBars values={trend} variant={variant} />

      <p className="mt-2 text-[11px] text-slate-500">{trendLabel}</p>
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

  const scoreDistribution = getQualityScoreDistribution(leads)
  const segmentation = getLeadSegmentation(leads)
  const sourceQuality = getSourceVsQuality(leads)
  const featureImportance = getFeatureImportance()
  const funnelData = getFunnelByQuality(leads)
  const heatmapData = getQualityHeatmap(leads)
  const trendData = getQualityTrendLine(leads)

  // Apply multiplier to metrics for visual change with period selection
  const scaledSegmentation = {
    high: {
      count: Math.round(segmentation.high.count * multiplier),
      percentage: Math.round(segmentation.high.percentage * (0.8 + Math.random() * 0.4)),
    },
    medium: {
      count: Math.round(segmentation.medium.count * multiplier),
      percentage: Math.round(segmentation.medium.percentage * (0.8 + Math.random() * 0.4)),
    },
    low: {
      count: Math.round(segmentation.low.count * multiplier),
      percentage: Math.round(segmentation.low.percentage * (0.8 + Math.random() * 0.4)),
    },
  }

  // Ensure percentages add up to 100
  const totalPercentage = scaledSegmentation.high.percentage + scaledSegmentation.medium.percentage + scaledSegmentation.low.percentage
  scaledSegmentation.high.percentage = Math.round((scaledSegmentation.high.percentage / totalPercentage) * 100)
  scaledSegmentation.medium.percentage = Math.round((scaledSegmentation.medium.percentage / totalPercentage) * 100)
  scaledSegmentation.low.percentage = 100 - scaledSegmentation.high.percentage - scaledSegmentation.medium.percentage

  const donutData = [
    { name: 'High', value: scaledSegmentation.high.count, fill: QUALITY_COLORS.High },
    { name: 'Medium', value: scaledSegmentation.medium.count, fill: QUALITY_COLORS.Medium },
    { name: 'Low', value: scaledSegmentation.low.count, fill: QUALITY_COLORS.Low },
  ]

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
        <h1 className="text-3xl font-bold text-slate-900">Lead Quality Analytics</h1>
        <p className="text-slate-600 mt-1">B2B Law Firm - Marketing Performance Dashboard</p>

        {/* Period Filter */}
        <div className="mt-4 flex items-center gap-3">
          <span className="text-sm font-medium text-slate-700">Period:</span>
          <div className="flex gap-2 flex-wrap">
            {PERIOD_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedPeriod(option.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedPeriod === option.value
                    ? 'bg-primary text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI CARDS + DONUT CHART (Top Section) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-stagger-container">
        {/* High-Quality Card with Trend */}
        <QualityCard
          label="High-Quality Leads"
          percentage={scaledSegmentation.high.percentage}
          count={scaledSegmentation.high.count}
          trend={highTrend}
          trendLabel="↑ +3 pts vs last 30 days"
          variant="High"
        />

        {/* Medium-Quality Card with Trend */}
        <QualityCard
          label="Medium-Quality Leads"
          percentage={scaledSegmentation.medium.percentage}
          count={scaledSegmentation.medium.count}
          trend={mediumTrend}
          trendLabel="→ Stable vs last 30 days"
          variant="Medium"
        />

        {/* Low-Quality Card with Trend */}
        <QualityCard
          label="Low-Quality Leads"
          percentage={scaledSegmentation.low.percentage}
          count={scaledSegmentation.low.count}
          trend={lowTrend}
          trendLabel="↓ -2 pts vs last 30 days"
          variant="Low"
        />

        {/* Quality Mix Donut Chart */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 animate-stagger">
          <p className="text-xs font-medium text-slate-700 text-center">Quality Mix</p>
          <p className="text-[11px] text-slate-500 text-center mb-3">Last 30 Days</p>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={donutData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
              >
                {donutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Legend */}
          <div className="mt-4 space-y-2 border-t border-slate-100 pt-3">
            <div className="flex items-center gap-2 text-[11px]">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-slate-700">High ({scaledSegmentation.high.percentage}%)</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <div className="h-2 w-2 rounded-full bg-amber-500" />
              <span className="text-slate-700">Medium ({scaledSegmentation.medium.percentage}%)</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <div className="h-2 w-2 rounded-full bg-rose-500" />
              <span className="text-slate-700">Low ({scaledSegmentation.low.percentage}%)</span>
            </div>
          </div>
        </div>
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
