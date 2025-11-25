'use client'

import { Lead } from '@/app/types/lead'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface SectionAProps {
  leads: Lead[]
}

export function SectionA({ leads }: SectionAProps) {
  const totalLeads = leads.length
  const highQualityLeads = leads.filter(l => l.qualityTier === 'High').length

  const avgQualityScore = Math.round(
    leads.reduce((sum, l) => sum + l.qualityScore, 0) / totalLeads
  )

  const convertedLeads = leads.filter(l => l.converted).length
  const conversionRate = ((convertedLeads / totalLeads) * 100).toFixed(1)

  const highQualityConverted = leads.filter(l => l.qualityTier === 'High' && l.converted).length
  const highQualityConversionRate = (
    (highQualityConverted / Math.max(1, highQualityLeads)) * 100
  ).toFixed(1)

  const totalCost = leads.reduce((sum, l) => sum + l.costPerLead, 0)
  const costPerHighQualityLead = Math.round(totalCost / Math.max(1, highQualityLeads))

  const highQualityPercentage = ((highQualityLeads / totalLeads) * 100).toFixed(1)
  const predictedConversionLift = (
    parseFloat(highQualityConversionRate) - parseFloat(conversionRate)
  ).toFixed(1)

  const metrics = [
    {
      label: 'Lead Quality Score',
      value: avgQualityScore,
      unit: '/100',
      trend: '+2.4%',
      color: 'bg-teal-50',
    },
    {
      label: 'High-Quality Leads',
      value: highQualityPercentage,
      unit: '%',
      trend: '+3.8%',
      color: 'bg-blue-50',
    },
    {
      label: 'Conversion Rate',
      value: conversionRate,
      unit: '%',
      trend: '+1.2%',
      color: 'bg-emerald-50',
    },
    {
      label: 'Cost per High-Quality Lead',
      value: '$' + costPerHighQualityLead,
      unit: '',
      trend: '-5.2%',
      color: 'bg-orange-50',
      trendDown: true,
    },
  ]

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Lead Quality Summary</h2>
        <p className="text-slate-600">
          {highQualityPercentage}% of leads are high-quality this period. Predictive models estimate a{' '}
          <span className="font-semibold text-primary">{predictedConversionLift}% improvement</span> in
          conversions if we optimize budget allocation toward top-performing channels.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className={`${metric.color} p-6 rounded-lg border border-slate-200 hover:shadow-md transition-shadow`}
          >
            <p className="text-sm text-slate-600 mb-2">{metric.label}</p>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-3xl font-bold text-slate-900">{metric.value}</span>
              <span className="text-sm text-slate-500">{metric.unit}</span>
            </div>
            <div className="flex items-center gap-1">
              {metric.trendDown ? (
                <TrendingDown size={16} className="text-red-500" />
              ) : (
                <TrendingUp size={16} className="text-green-500" />
              )}
              <span
                className={`text-sm font-medium ${
                  metric.trendDown ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {metric.trend}
              </span>
              <span className="text-xs text-slate-500 ml-1">vs last period</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-slate-700">
          <span className="font-semibold text-primary">Key Insight:</span> High-quality leads show a{' '}
          {highQualityConversionRate}% conversion rate vs overall {conversionRate}% rate. Focus on expanding
          channels that drive quality leads while minimizing spend on low-converting sources.
        </p>
      </div>
    </section>
  )
}
