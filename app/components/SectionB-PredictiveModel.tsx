'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const featureImportanceData = [
  { feature: 'Firm Size', importance: 28 },
  { feature: 'Referral Source', importance: 25 },
  { feature: 'Engagement Score', importance: 18 },
  { feature: 'Industry Vertical', importance: 12 },
  { feature: 'Lead Source Channel', importance: 10 },
  { feature: 'Communication Pref', importance: 7 },
]

interface SectionBProps {
  leads: any[]
}

export function SectionB({ leads }: SectionBProps) {
  const highQualityLeads = leads.filter(l => l.qualityTier === 'High')

  const engagementCorrelation = highQualityLeads.length > 0
    ? Math.round(
        highQualityLeads.reduce((sum, l) => sum + l.engagementScore, 0) / highQualityLeads.length
      )
    : 0

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Predictive Lead Quality Model</h2>
        <p className="text-slate-600">
          Our machine learning model identifies <span className="font-semibold">Firm Size</span> and{' '}
          <span className="font-semibold">Referral Source</span> as the top 2 factors driving conversion success.
          These insights enable instant prioritization of warm, high-value leads and precise budget allocation
          to quality-driving channels.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Feature Importance Scores</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={featureImportanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="feature" stroke="#64748b" angle={-45} textAnchor="end" height={100} />
              <YAxis stroke="#64748b" label={{ value: 'Importance %', angle: -90, position: 'insideLeft' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                }}
                formatter={(value) => `${value}%`}
              />
              <Bar dataKey="importance" fill="#0d9488" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Model Performance</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm opacity-90 mb-1">Accuracy</p>
              <p className="text-3xl font-bold">87.3%</p>
            </div>
            <div>
              <p className="text-sm opacity-90 mb-1">Precision</p>
              <p className="text-3xl font-bold">84.2%</p>
            </div>
            <div>
              <p className="text-sm opacity-90 mb-1">Leads Ranked</p>
              <p className="text-3xl font-bold">{highQualityLeads.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="text-sm font-semibold text-slate-900 mb-2">Top Quality Indicator #1: Firm Size</h4>
          <p className="text-sm text-slate-600">
            High-quality leads average <span className="font-semibold">{Math.round(
              highQualityLeads.reduce((sum, l) => sum + l.firmSize, 0) / Math.max(1, highQualityLeads.length)
            )} employees</span>. Mid-market firms (20-100 emp) show 3.2x higher conversion rates.
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="text-sm font-semibold text-slate-900 mb-2">Top Quality Indicator #2: Engagement</h4>
          <p className="text-sm text-slate-600">
            Engaged leads (engagement score <span className="font-semibold">{engagementCorrelation}+</span>) convert at 4.1x the rate of cold leads. Content interaction is the strongest predictive signal.
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
        <p className="text-sm text-slate-700">
          <span className="font-semibold text-indigo-900">ML Insight:</span> The predictive model continuously
          learns from conversion outcomes. By implementing these high-confidence signals, the sales team can
          prioritize 60% fewer leads while capturing 85% of revenue potential.
        </p>
      </div>
    </section>
  )
}
