'use client'

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  Cell,
} from 'recharts'
import { Lead } from '@/app/types/lead'
import {
  getMarketingROIByChannel,
  getCostPerLeadByChannel,
  getSpendVsReturnData,
  getCampaignQuadrantData,
  getTrendData,
} from '@/app/lib/generateData'

interface MarketingROIProps {
  leads: Lead[]
}

export function MarketingROI({ leads }: MarketingROIProps) {
  const roiByChannel = getMarketingROIByChannel(leads)
  const costPerLead = getCostPerLeadByChannel(leads)
  const spendVsReturn = getSpendVsReturnData(leads)
  const quadrantData = getCampaignQuadrantData(leads)
  const trendData = getTrendData(leads)

  const totalSpend = roiByChannel.reduce((sum, c) => sum + c.spend, 0)
  const totalRevenue = roiByChannel.reduce((sum, c) => sum + c.revenue, 0)
  const overallROI = totalSpend > 0 ? Math.round(((totalRevenue - totalSpend) / totalSpend) * 100) : 0
  const avgCostPerHQLead = Math.round(
    costPerLead.reduce((sum, c) => sum + c.costPerLeadHQ, 0) / costPerLead.length
  )

  // Additional metrics for expanded KPI cards
  const conversionActions = Math.round(leads.filter(l => l.status === 'converted').length * 1.3)
  const costPerConversion = totalRevenue > 0 ? Math.round(totalSpend / conversionActions) : 0
  const conversionActionRate = conversionActions > 0 ? ((conversionActions / leads.length) * 100).toFixed(2) : '0.00'

  const getQuadrantColor = (x: number, y: number) => {
    if (y >= 8 && x <= 100) return '#10b981' // Top-right: WINNERS
    if (y >= 8 && x > 100) return '#f59e0b' // Top-left: WATCH
    if (y < 8 && x <= 100) return '#6366f1' // Bottom-right: NURTURE
    return '#ef4444' // Bottom-left: LOSERS
  }

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Marketing ROI</h1>
        <p className="text-slate-600 mt-1">See what pays. Cut what doesn't.</p>
      </div>

      {/* KPI CARDS (Top Section) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Conversion actions Card */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-center text-white">
          <p className="text-sm font-semibold opacity-90 mb-2">Conversion actions</p>
          <p className="text-3xl font-bold">{conversionActions}</p>
          <p className="text-xs opacity-75 mt-2">-39.02%</p>
        </div>

        {/* Total Spend Card */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-center text-white">
          <p className="text-sm font-semibold opacity-90 mb-2">Spend amount</p>
          <p className="text-3xl font-bold">${(totalSpend / 1000).toFixed(1)}k</p>
          <p className="text-xs opacity-75 mt-2">-12.27%</p>
        </div>

        {/* Cost per Conversion Card */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-center text-white">
          <p className="text-sm font-semibold opacity-90 mb-2">Cost/Conversion</p>
          <p className="text-3xl font-bold">${costPerConversion}</p>
          <p className="text-xs opacity-75 mt-2">+43.88%</p>
        </div>

        {/* Conversion Action Rate Card */}
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg p-6 text-center text-white">
          <p className="text-sm font-semibold opacity-90 mb-2">Conv. action rate</p>
          <p className="text-3xl font-bold">{conversionActionRate}%</p>
          <p className="text-xs opacity-75 mt-2">Action rate</p>
        </div>

        {/* Cost per HQ Lead Card */}
        <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg p-6 text-center text-white">
          <p className="text-sm font-semibold opacity-90 mb-2">Cost per HQ Lead</p>
          <p className="text-3xl font-bold">${avgCostPerHQLead}</p>
          <p className="text-xs opacity-75 mt-2">Efficiency metric</p>
        </div>

        {/* Overall ROI Card */}
        <div className={`bg-gradient-to-br ${overallROI >= 0 ? 'from-green-500 to-green-600' : 'from-red-500 to-red-600'} rounded-lg p-6 text-center text-white`}>
          <p className="text-sm font-semibold opacity-90 mb-2">Overall ROI</p>
          <p className="text-3xl font-bold">{overallROI}%</p>
          <p className="text-xs opacity-75 mt-2">{overallROI >= 0 ? '↑ Profitable' : '↓ Loss'}</p>
        </div>
      </div>

      {/* SECTION 1 — ROI BY CHANNEL */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">ROI by Channel</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={roiByChannel}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis type="number" stroke="#64748b" />
            <YAxis type="category" dataKey="channel" stroke="#64748b" width={140} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
              }}
              formatter={(value: any) => `${value}%`}
            />
            <Bar dataKey="roi" radius={[0, 8, 8, 0]}>
              {roiByChannel.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.roi >= 0 ? '#10b981' : '#ef4444'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Cost by Channel Chart */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Cost per Quality Lead by Channel</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={costPerLead}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="channel" stroke="#64748b" angle={-45} textAnchor="end" height={80} />
            <YAxis stroke="#64748b" label={{ value: 'Cost ($)', angle: -90, position: 'insideLeft' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
              }}
              formatter={(value: any) => `$${value}`}
            />
            <Bar dataKey="costPerLeadHQ" fill="#0d9488" radius={[8, 8, 0, 0]} name="Cost per HQ Lead" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* SECTION 3 — SPEND VS RETURN */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Spend vs Return</h3>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={spendVsReturn}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="channel" stroke="#64748b" angle={-45} textAnchor="end" height={80} />
            <YAxis yAxisId="left" stroke="#64748b" label={{ value: 'Spend ($)', angle: -90, position: 'insideLeft' }} />
            <YAxis yAxisId="right" orientation="right" stroke="#64748b" label={{ value: 'Revenue ($)', angle: 90, position: 'insideRight' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
              }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="spend" fill="#ef4444" radius={[8, 8, 0, 0]} name="Spend" />
            <Line yAxisId="right" type="monotone" dataKey="return" stroke="#10b981" strokeWidth={3} name="Revenue" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* SECTION 4 — CAMPAIGN QUADRANT */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Campaign Winners vs Losers</h3>
        <div className="mb-4 text-xs text-slate-600 space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" /> Top-Right (High Conversion, Low Cost) = WINNERS
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-amber-500 rounded-full" /> Top-Left (High Conversion, High Cost) = WATCH CLOSELY
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-indigo-500 rounded-full" /> Bottom-Right (Low Conversion, Low Cost) = NURTURE
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" /> Bottom-Left (Low Conversion, High Cost) = LOSERS
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="x"
              type="number"
              stroke="#64748b"
              label={{ value: 'Cost per HQ Lead ($)', position: 'insideBottomRight', offset: -10 }}
            />
            <YAxis
              dataKey="y"
              type="number"
              stroke="#64748b"
              label={{ value: 'Conversion Rate (%)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
              }}
              cursor={{ strokeDasharray: '3 3' }}
            />
            <Scatter data={quadrantData} fill="#8884d8">
              {quadrantData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getQuadrantColor(entry.x, entry.y)} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* SECTION 5 — TRENDS OVER TIME */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Trends Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="spend" stroke="#ef4444" strokeWidth={2} name="Spend" />
            <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue" />
            <Line type="monotone" dataKey="highQualityLeads" stroke="#0d9488" strokeWidth={2} name="HQ Leads" />
            <Line type="monotone" dataKey="roi" stroke="#6366f1" strokeWidth={2} name="ROI %" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
