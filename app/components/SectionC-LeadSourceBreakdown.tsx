'use client'

import { Lead, LeadSource } from '@/app/types/lead'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface SectionCProps {
  leads: Lead[]
}

export function SectionC({ leads }: SectionCProps) {
  const channelMap = new Map<LeadSource, Lead[]>()

  leads.forEach(lead => {
    if (!channelMap.has(lead.source)) {
      channelMap.set(lead.source, [])
    }
    channelMap.get(lead.source)!.push(lead)
  })

  const channelMetrics = Array.from(channelMap.entries()).map(([channel, channelLeads]) => {
    const highQuality = channelLeads.filter(l => l.qualityTier === 'High').length
    const totalCost = channelLeads.reduce((sum, l) => sum + l.costPerLead, 0)
    const converted = channelLeads.filter(l => l.converted).length
    const revenue = channelLeads
      .filter(l => l.converted)
      .reduce((sum, l) => sum + l.revenuePotential, 0)

    return {
      channel,
      volume: channelLeads.length,
      highQuality,
      highQualityPercentage: ((highQuality / channelLeads.length) * 100).toFixed(1),
      costPerHighQualityLead: highQuality > 0 ? Math.round(totalCost / highQuality) : 0,
      roi: totalCost > 0 ? (((revenue - totalCost) / totalCost) * 100).toFixed(1) : '0',
      conversionRate: ((converted / channelLeads.length) * 100).toFixed(1),
    }
  })

  const chartData = channelMetrics.map(m => ({
    name: m.channel,
    volume: m.volume,
    highQualityPercentage: parseFloat(m.highQualityPercentage),
  }))

  const topChannel = channelMetrics.sort((a, b) => parseFloat(b.roi) - parseFloat(a.roi))[0]
  const lowQualityChannel = channelMetrics.sort(
    (a, b) => parseFloat(a.highQualityPercentage) - parseFloat(b.highQualityPercentage)
  )[0]

  if (!topChannel || !lowQualityChannel) {
    return (
      <section className="mb-12">
        <div className="bg-white border border-slate-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Lead Source Breakdown</h2>
          <p className="text-slate-600">No leads found for the selected time period.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Lead Source Breakdown</h2>
        <p className="text-slate-600">
          <span className="font-semibold text-primary">{topChannel.channel}</span> delivers{' '}
          {topChannel.highQualityPercentage}% high-quality leads with the strongest ROI at{' '}
          <span className="font-semibold">{topChannel.roi}%</span>. Consider reallocating budget from{' '}
          <span className="font-semibold">{lowQualityChannel.channel}</span> (only{' '}
          {lowQualityChannel.highQualityPercentage}% quality) to maximize lead quality and conversion.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Channel Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis yAxisId="left" stroke="#64748b" />
              <YAxis yAxisId="right" orientation="right" stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="volume" fill="#0d9488" name="Lead Volume" />
              <Bar
                yAxisId="right"
                dataKey="highQualityPercentage"
                fill="#06b6d4"
                name="High-Quality %"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Quality Leaders</h3>
          <div className="space-y-4">
            {channelMetrics
              .sort((a, b) => parseFloat(b.highQualityPercentage) - parseFloat(a.highQualityPercentage))
              .slice(0, 3)
              .map((metric, idx) => (
                <div key={idx} className="flex items-between justify-between pb-3 border-b border-slate-200 last:border-b-0">
                  <span className="text-sm font-medium text-slate-700">{metric.channel}</span>
                  <span className="text-sm font-bold text-primary">{metric.highQualityPercentage}%</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Detailed Channel Metrics</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-slate-900">Channel</th>
                <th className="px-6 py-3 text-center font-semibold text-slate-900">Volume</th>
                <th className="px-6 py-3 text-center font-semibold text-slate-900">High-Quality %</th>
                <th className="px-6 py-3 text-center font-semibold text-slate-900">Cost/HQ Lead</th>
                <th className="px-6 py-3 text-center font-semibold text-slate-900">Conversion %</th>
                <th className="px-6 py-3 text-right font-semibold text-slate-900">ROI</th>
              </tr>
            </thead>
            <tbody>
              {channelMetrics
                .sort((a, b) => b.volume - a.volume)
                .map((metric, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-slate-900">{metric.channel}</td>
                    <td className="px-6 py-4 text-center text-slate-700">{metric.volume}</td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full font-semibold text-sm ${
                          parseFloat(metric.highQualityPercentage) > 50
                            ? 'bg-green-100 text-green-700'
                            : parseFloat(metric.highQualityPercentage) > 30
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {metric.highQualityPercentage}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-slate-700">${metric.costPerHighQualityLead}</td>
                    <td className="px-6 py-4 text-center text-slate-700">{metric.conversionRate}%</td>
                    <td className="px-6 py-4 text-right font-semibold text-slate-900">{metric.roi}%</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-sm text-slate-700">
          <span className="font-semibold text-amber-900">Recommendation:</span> Reallocate 15-20% of budget
          from {lowQualityChannel.channel} to {topChannel.channel} to increase profitable lead volume by an
          estimated 20-25%.
        </p>
      </div>
    </section>
  )
}
