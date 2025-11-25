'use client'

import { Lead } from '@/app/types/lead'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell,
} from 'recharts'

interface SalesPipelineProps {
  leads: Lead[]
}

export function SalesPipeline({ leads }: SalesPipelineProps) {
  // Calculate pipeline metrics
  const pipelineStages = ['Lead', 'Qualified', 'Negotiation', 'Closed']

  const stageCounts = {
    Lead: leads.filter(l => l.status === 'new').length,
    Qualified: leads.filter(l => l.status === 'qualified').length,
    Negotiation: leads.filter(l => l.status === 'in_progress').length,
    Closed: leads.filter(l => l.status === 'converted').length,
  }

  const stageRevenue = {
    Lead: stageCounts.Lead * 1200,
    Qualified: stageCounts.Qualified * 5000,
    Negotiation: stageCounts.Negotiation * 15000,
    Closed: stageCounts.Closed * 35000,
  }

  const totalDeals = Object.values(stageCounts).reduce((a, b) => a + b, 0)
  const totalRevenue = Object.values(stageRevenue).reduce((a, b) => a + b, 0)
  const avgDealSize = totalDeals > 0 ? Math.round(totalRevenue / totalDeals) : 0
  const winRate = totalDeals > 0 ? ((stageCounts.Closed / totalDeals) * 100).toFixed(1) : '0'

  // Top deals data
  const topDeals = leads
    .filter(l => l.status === 'converted' || l.status === 'in_progress')
    .slice(0, 10)
    .map((lead, idx) => ({
      id: idx + 1,
      customer: `${lead.source} - Client ${Math.floor(Math.random() * 1000)}`,
      stage: lead.status === 'converted' ? 'Closed' : 'Negotiation',
      amount: lead.status === 'converted' ? 35000 + Math.random() * 15000 : 8000 + Math.random() * 12000,
      probability: lead.status === 'converted' ? 100 : 60 + Math.random() * 30,
    }))
    .sort((a, b) => b.amount - a.amount)

  // Stage breakdown data for chart
  const stageData = pipelineStages.map(stage => ({
    stage,
    count: stageCounts[stage as keyof typeof stageCounts],
    revenue: stageRevenue[stage as keyof typeof stageRevenue],
  }))

  const stageColors = {
    Lead: '#8b5cf6',
    Qualified: '#3b82f6',
    Negotiation: '#06b6d4',
    Closed: '#10b981',
  }

  return (
    <section className="space-y-8">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Sales Pipeline</h1>
        <p className="text-slate-600 mt-1">Where deals move. Track progress through each stage.</p>
      </div>

      {/* KPI CARDS (Top Section) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Deals Card */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
          <p className="text-sm text-slate-600 mb-2">Total Pipeline Deals</p>
          <p className="text-4xl font-bold text-slate-900">{totalDeals}</p>
          <p className="text-xs text-slate-600 mt-2">Active opportunities</p>
        </div>

        {/* Total Revenue Card */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
          <p className="text-sm text-slate-600 mb-2">Pipeline Revenue</p>
          <p className="text-4xl font-bold text-slate-900">${(totalRevenue / 1000).toFixed(0)}k</p>
          <p className="text-xs text-slate-600 mt-2">Total opportunity value</p>
        </div>

        {/* Average Deal Size Card */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
          <p className="text-sm text-slate-600 mb-2">Avg Deal Size</p>
          <p className="text-4xl font-bold text-slate-900">${(avgDealSize / 1000).toFixed(1)}k</p>
          <p className="text-xs text-slate-600 mt-2">Per opportunity</p>
        </div>

        {/* Win Rate Card */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
          <p className="text-sm text-slate-600 mb-2">Win Rate</p>
          <p className="text-4xl font-bold text-green-600">{winRate}%</p>
          <p className="text-xs text-slate-600 mt-2">Closed deals ratio</p>
        </div>
      </div>

      {/* STAGE BREAKDOWN CHART */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Pipeline by Stage</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stageData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="stage" stroke="#64748b" />
            <YAxis stroke="#64748b" yAxisId="left" label={{ value: 'Deal Count', angle: -90, position: 'insideLeft' }} />
            <YAxis stroke="#64748b" yAxisId="right" orientation="right" label={{ value: 'Revenue ($)', angle: 90, position: 'insideRight' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
              }}
              formatter={(value: any) => {
                if (typeof value === 'number' && value > 10000) {
                  return `$${(value / 1000).toFixed(0)}k`
                }
                return value
              }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="count" fill="#0d9488" radius={[8, 8, 0, 0]} name="Deal Count" />
            <Bar yAxisId="right" dataKey="revenue" fill="#f59e0b" radius={[8, 8, 0, 0]} name="Revenue" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* TOP DEALS TABLE */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Top 10 Opportunities</h2>
          <p className="text-sm text-slate-600 mt-1">Largest pipeline opportunities by deal value</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-slate-900">Customer</th>
                <th className="px-6 py-4 text-center font-semibold text-slate-900">Stage</th>
                <th className="px-6 py-4 text-right font-semibold text-slate-900">Deal Amount</th>
                <th className="px-6 py-4 text-center font-semibold text-slate-900">Close Probability</th>
              </tr>
            </thead>
            <tbody>
              {topDeals.map((deal, idx) => (
                <tr
                  key={idx}
                  className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {deal.customer}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full font-semibold text-sm ${
                      deal.stage === 'Closed'
                        ? 'bg-green-100 text-green-700'
                        : deal.stage === 'Negotiation'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {deal.stage}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-slate-900">
                    ${deal.amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      <div className="w-16 bg-slate-200 rounded-full h-2 mr-2">
                        <div
                          className={`h-2 rounded-full ${
                            deal.probability >= 80
                              ? 'bg-green-500'
                              : deal.probability >= 50
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${deal.probability}%` }}
                        />
                      </div>
                      <span className="font-semibold text-sm">{Math.round(deal.probability)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* INSIGHT BOX */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p className="text-sm text-slate-700">
          <span className="font-semibold text-blue-900">Pipeline Health:</span> Your pipeline shows {stageCounts.Closed} closed deals this period with a {winRate}% win rate. Focus on moving {stageCounts.Lead} leads from the discovery stage to increase overall conversion.
        </p>
      </div>
    </section>
  )
}
