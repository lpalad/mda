'use client'

import { useState } from 'react'
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

const PERIOD_OPTIONS = [
  { value: 'last-7', label: 'Last 7 Days' },
  { value: 'last-30', label: 'Last 30 Days' },
  { value: 'last-90', label: 'Last 90 Days' },
  { value: 'year-to-date', label: 'Year to Date' },
  { value: 'all-time', label: 'All Time' },
]

export function MarketingROI({ leads }: MarketingROIProps) {
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

  const roiByChannel = getMarketingROIByChannel(leads)
  const costPerLead = getCostPerLeadByChannel(leads)
  const spendVsReturn = getSpendVsReturnData(leads)
  const quadrantData = getCampaignQuadrantData(leads)
  const trendData = getTrendData(leads)

  // Scale data based on selected period
  const scaledRoiByChannel = roiByChannel.map(item => ({
    ...item,
    spend: Math.round(item.spend * multiplier),
    revenue: Math.round(item.revenue * multiplier),
  }))

  const scaledCostPerLead = costPerLead.map(item => ({
    ...item,
    costPerLeadHQ: Math.round(item.costPerLeadHQ * (0.8 + Math.random() * 0.4)),
  }))

  const scaledSpendVsReturn = spendVsReturn.map(item => ({
    ...item,
    spend: Math.round(item.spend * multiplier),
    return: Math.round(item.return * multiplier),
  }))

  const totalSpend = scaledRoiByChannel.reduce((sum, c) => sum + c.spend, 0)
  const totalRevenue = scaledRoiByChannel.reduce((sum, c) => sum + c.revenue, 0)
  const overallROI = totalSpend > 0 ? Math.round(((totalRevenue - totalSpend) / totalSpend) * 100) : 0
  const avgCostPerHQLead = Math.round(
    scaledCostPerLead.reduce((sum, c) => sum + c.costPerLeadHQ, 0) / scaledCostPerLead.length
  )

  // Facebook Ads Metrics
  const facebookMetrics = {
    impressions: '3.51M',
    clicks: '13.65K',
    uniqueClicks: '13.28K',
    ctr: '0.39%',
    cpm: '3.79',
    cpc: '0.98',
    avgDailyReach: '5.21K',
  }

  // Google Ads Metrics
  const googleMetrics = {
    conversionActions: 150,
    spendAmount: 12.08,
    costPerConversion: 80.54,
    conversionRate: 2.45,
  }

  // Facebook Campaigns Data
  const facebookCampaigns = [
    { campaign: 'Campaign 3', spend: 2.64, impressions: 728.3, clicks: 1.75, uniqueClicks: 1.72, cpm: 3.63, cpc: 1.51, ctr: '0.24%' },
    { campaign: 'Campaign 4', spend: 1.35, impressions: 83.29, clicks: 258, uniqueClicks: 250, cpm: 16.2, cpc: 5.23, ctr: '0.31%' },
    { campaign: 'Campaign 9', spend: 1.34, impressions: 117.84, clicks: 241, uniqueClicks: 237, cpm: 11.4, cpc: 5.57, ctr: '0.20%' },
    { campaign: 'Campaign 6', spend: 1.33, impressions: 314.69, clicks: 956, uniqueClicks: 914, cpm: 4.24, cpc: 1.4, ctr: '0.30%' },
  ]

  // Google Ads Campaigns Data
  const googleCampaigns = [
    { campaign: 'GA E-markets Campaign Tier 1', spend: 1.46, impressions: 1.35, clicks: 828, ctr: '61.42%', cpc: 1.76, convActions: 66, costPerConv: 22.06, convRate: '7.97%' },
    { campaign: 'GA E-markets Campaign Tier 5', spend: 6.3, impressions: 14.93, clicks: 2.49, ctr: '16.68%', cpc: 2.53, convActions: 39, costPerConv: 161.44, convRate: '1.57%' },
    { campaign: 'GA E-markets Campaign Tier 3', spend: 1.83, impressions: 5.3, clicks: 774, ctr: '14.60%', cpc: 2.37, convActions: 18, costPerConv: 101.72, convRate: '2.33%' },
    { campaign: 'GA E-markets Campaign Tier 10', spend: 0.833, impressions: 2.1, clicks: 423, ctr: '20.13%', cpc: 1.97, convActions: 6, costPerConv: 138.83, convRate: '1.42%' },
  ]

  const getQuadrantColor = (x: number, y: number) => {
    if (y >= 8 && x <= 100) return '#10b981'
    if (y >= 8 && x > 100) return '#f59e0b'
    if (y < 8 && x <= 100) return '#6366f1'
    return '#ef4444'
  }

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Marketing ROI</h1>
        <p className="text-slate-600 mt-1">Facebook Ads • Google Ads • Channel Performance</p>

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

      {/* ===== FACEBOOK ADS SECTION ===== */}
      <div className="border-t-2 border-slate-300 pt-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Facebook Ads Dashboard</h2>

        {/* Facebook KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-center text-white">
            <p className="text-sm font-semibold opacity-90 mb-2">Impressions</p>
            <p className="text-3xl font-bold">{facebookMetrics.impressions}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 text-center text-white">
            <p className="text-sm font-semibold opacity-90 mb-2">Clicks</p>
            <p className="text-3xl font-bold">{facebookMetrics.clicks}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg p-6 text-center text-white">
            <p className="text-sm font-semibold opacity-90 mb-2">CTR</p>
            <p className="text-3xl font-bold">{facebookMetrics.ctr}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-700 to-blue-800 rounded-lg p-6 text-center text-white">
            <p className="text-sm font-semibold opacity-90 mb-2">CPM</p>
            <p className="text-3xl font-bold">${facebookMetrics.cpm}</p>
          </div>
        </div>

        {/* Facebook Campaigns Table */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden mb-8">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900">Facebook Campaigns Performance</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-slate-900">Campaign</th>
                  <th className="px-6 py-4 text-center font-semibold text-slate-900">Spend (K)</th>
                  <th className="px-6 py-4 text-center font-semibold text-slate-900">Impressions (K)</th>
                  <th className="px-6 py-4 text-center font-semibold text-slate-900">Clicks</th>
                  <th className="px-6 py-4 text-center font-semibold text-slate-900">CPM</th>
                  <th className="px-6 py-4 text-center font-semibold text-slate-900">CPC</th>
                  <th className="px-6 py-4 text-center font-semibold text-slate-900">CTR</th>
                </tr>
              </thead>
              <tbody>
                {facebookCampaigns.map((camp, idx) => (
                  <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">{camp.campaign}</td>
                    <td className="px-6 py-4 text-center text-slate-700">${camp.spend.toFixed(2)}k</td>
                    <td className="px-6 py-4 text-center text-slate-700">{camp.impressions.toFixed(2)}k</td>
                    <td className="px-6 py-4 text-center text-slate-700">{camp.clicks.toLocaleString()}</td>
                    <td className="px-6 py-4 text-center text-slate-700">${camp.cpm.toFixed(2)}</td>
                    <td className="px-6 py-4 text-center text-slate-700">${camp.cpc.toFixed(2)}</td>
                    <td className="px-6 py-4 text-center text-slate-700">{camp.ctr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ===== GOOGLE ADS SECTION ===== */}
      <div className="border-t-2 border-slate-300 pt-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Google Ads Dashboard</h2>

        {/* Google KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-center text-white">
            <p className="text-sm font-semibold opacity-90 mb-2">Conversion Actions</p>
            <p className="text-3xl font-bold">{googleMetrics.conversionActions}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-center text-white">
            <p className="text-sm font-semibold opacity-90 mb-2">Spend Amount</p>
            <p className="text-3xl font-bold">${googleMetrics.spendAmount.toFixed(1)}k</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-center text-white">
            <p className="text-sm font-semibold opacity-90 mb-2">Cost/Conversion</p>
            <p className="text-3xl font-bold">${googleMetrics.costPerConversion.toFixed(2)}</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg p-6 text-center text-white">
            <p className="text-sm font-semibold opacity-90 mb-2">Conversion Rate</p>
            <p className="text-3xl font-bold">{googleMetrics.conversionRate.toFixed(2)}%</p>
          </div>
        </div>

        {/* Google Campaigns Table */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden mb-8">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900">Google Ads Campaigns Performance</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-slate-900">Campaign</th>
                  <th className="px-6 py-4 text-center font-semibold text-slate-900">Spend (K)</th>
                  <th className="px-6 py-4 text-center font-semibold text-slate-900">Impressions (K)</th>
                  <th className="px-6 py-4 text-center font-semibold text-slate-900">Clicks</th>
                  <th className="px-6 py-4 text-center font-semibold text-slate-900">CTR</th>
                  <th className="px-6 py-4 text-center font-semibold text-slate-900">Conv. Actions</th>
                  <th className="px-6 py-4 text-center font-semibold text-slate-900">Cost/Conv.</th>
                  <th className="px-6 py-4 text-center font-semibold text-slate-900">Conv. Rate</th>
                </tr>
              </thead>
              <tbody>
                {googleCampaigns.map((camp, idx) => (
                  <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">{camp.campaign}</td>
                    <td className="px-6 py-4 text-center text-slate-700">${camp.spend.toFixed(2)}k</td>
                    <td className="px-6 py-4 text-center text-slate-700">{camp.impressions.toFixed(2)}k</td>
                    <td className="px-6 py-4 text-center text-slate-700">{camp.clicks.toLocaleString()}</td>
                    <td className="px-6 py-4 text-center text-slate-700">{camp.ctr}</td>
                    <td className="px-6 py-4 text-center text-slate-700">{camp.convActions}</td>
                    <td className="px-6 py-4 text-center text-slate-700">${camp.costPerConv.toFixed(2)}</td>
                    <td className="px-6 py-4 text-center text-slate-700">{camp.convRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ===== CHANNEL ANALYSIS SECTION ===== */}
      <div className="border-t-2 border-slate-300 pt-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Channel Performance Analysis</h2>

        {/* Channel KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
            <p className="text-sm text-slate-600 mb-2">Overall ROI</p>
            <p className={`text-4xl font-bold ${overallROI >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {overallROI}%
            </p>
            <p className="text-xs text-slate-600 mt-2">{overallROI >= 0 ? '↑ Profitable' : '↓ Loss'}</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
            <p className="text-sm text-slate-600 mb-2">Cost per HQ Lead</p>
            <p className="text-4xl font-bold text-slate-900">${avgCostPerHQLead}</p>
            <p className="text-xs text-slate-600 mt-2">Efficiency metric</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
            <p className="text-sm text-slate-600 mb-2">Total Spend</p>
            <p className="text-4xl font-bold text-slate-900">${(totalSpend / 1000).toFixed(1)}k</p>
            <p className="text-xs text-slate-600 mt-2">Across all channels</p>
          </div>
        </div>

        {/* ROI by Channel */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">ROI by Channel</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={scaledRoiByChannel}
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

        {/* Cost per Quality Lead */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Cost per Quality Lead by Channel</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={scaledCostPerLead}>
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

        {/* Spend vs Return */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Spend vs Return</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={scaledSpendVsReturn}>
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

        {/* Campaign Winners vs Losers */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
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

        {/* Trends Over Time */}
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
      </div>
    </section>
  )
}
