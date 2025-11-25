'use client'

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

export function LeadQualityAnalytics({ leads }: LeadQualityAnalyticsProps) {
  const scoreDistribution = getQualityScoreDistribution(leads)
  const segmentation = getLeadSegmentation(leads)
  const sourceQuality = getSourceVsQuality(leads)
  const featureImportance = getFeatureImportance()
  const funnelData = getFunnelByQuality(leads)
  const heatmapData = getQualityHeatmap(leads)
  const trendData = getQualityTrendLine(leads)

  const donutData = [
    { name: 'High', value: segmentation.high.count, fill: QUALITY_COLORS.High },
    { name: 'Medium', value: segmentation.medium.count, fill: QUALITY_COLORS.Medium },
    { name: 'Low', value: segmentation.low.count, fill: QUALITY_COLORS.Low },
  ]

  return (
    <section className="space-y-8">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Lead Quality Analytics</h1>
        <p className="text-slate-600 mt-2">See who converts. See who doesn't. Let the data decide.</p>
      </div>

      {/* KPI CARDS + DONUT CHART (Top Section) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* High-Quality Card */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
          <p className="text-sm text-slate-600 mb-2">High-Quality Leads</p>
          <p className="text-4xl font-bold text-green-600">{segmentation.high.percentage}%</p>
          <p className="text-sm text-slate-700 mt-2 font-semibold">{segmentation.high.count} leads</p>
        </div>

        {/* Medium-Quality Card */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
          <p className="text-sm text-slate-600 mb-2">Medium-Quality Leads</p>
          <p className="text-4xl font-bold text-amber-600">{segmentation.medium.percentage}%</p>
          <p className="text-sm text-slate-700 mt-2 font-semibold">{segmentation.medium.count} leads</p>
        </div>

        {/* Low-Quality Card */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
          <p className="text-sm text-slate-600 mb-2">Low-Quality Leads</p>
          <p className="text-4xl font-bold text-red-600">{segmentation.low.percentage}%</p>
          <p className="text-sm text-slate-700 mt-2 font-semibold">{segmentation.low.count} leads</p>
        </div>

        {/* Donut Chart */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={donutData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {donutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CHART 1 — Quality Score Distribution Histogram */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
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
      <div className="bg-white border border-slate-200 rounded-lg p-6">
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
      <div className="bg-white border border-slate-200 rounded-lg p-6">
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
      <div className="bg-white border border-slate-200 rounded-lg p-6">
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
      <div className="bg-white border border-slate-200 rounded-lg p-6">
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
      <div className="bg-white border border-slate-200 rounded-lg p-6">
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
