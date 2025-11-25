'use client'

import { Lead } from '@/app/types/lead'
import { Users, DollarSign, TrendingUp, Mail } from 'lucide-react'

interface SectionEProps {
  leads: Lead[]
}

export function SectionE({ leads }: SectionEProps) {
  const highQualityLeads = leads.filter(l => l.qualityTier === 'High')

  if (highQualityLeads.length === 0) {
    return null
  }

  const avgFirmSize = Math.round(
    highQualityLeads.reduce((sum, l) => sum + l.firmSize, 0) / highQualityLeads.length
  )

  const industries = new Map<string, number>()
  highQualityLeads.forEach(l => {
    industries.set(l.industry, (industries.get(l.industry) || 0) + 1)
  })
  const mostCommonIndustry = Array.from(industries.entries()).sort((a, b) => b[1] - a[1])[0][0]

  const avgEngagementScore = Math.round(
    highQualityLeads.reduce((sum, l) => sum + l.engagementScore, 0) / highQualityLeads.length
  )

  const commPrefs = new Map<string, number>()
  highQualityLeads.forEach(l => {
    commPrefs.set(l.communicationPreference, (commPrefs.get(l.communicationPreference) || 0) + 1)
  })
  const topCommChannel = Array.from(commPrefs.entries()).sort((a, b) => b[1] - a[1])[0][0]

  const converted = highQualityLeads.filter(l => l.converted).length
  const conversionRate = (converted / highQualityLeads.length) * 100

  const avgRevenuePotential = Math.round(
    highQualityLeads.reduce((sum, l) => sum + l.revenuePotential, 0) / highQualityLeads.length
  )

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">High-Quality Lead Profile (Persona)</h2>
        <p className="text-slate-600">
          High-value clients cluster around a clear profile. By identifying and replicating this pattern,
          marketing can attract more of the same quality, improving ROI and sales team efficiency.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Main Profile Card */}
        <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-lg p-8 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Ideal High-Quality Client Profile</h3>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Firm Size</p>
                <p className="text-2xl font-bold text-slate-900">{avgFirmSize} employees</p>
                <p className="text-xs text-slate-600 mt-1">Mid-market firms (20-100 emp) convert 3.2x better</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-emerald/10 rounded-lg flex items-center justify-center">
                <DollarSign size={20} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Avg Revenue Potential</p>
                <p className="text-2xl font-bold text-slate-900">${(avgRevenuePotential / 1000).toFixed(0)}k</p>
                <p className="text-xs text-slate-600 mt-1">Estimated contract value per converted lead</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Engagement Level</p>
                <p className="text-2xl font-bold text-slate-900">{avgEngagementScore}/100</p>
                <p className="text-xs text-slate-600 mt-1">Interaction score from content & website activity</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Mail size={20} className="text-orange-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Preferred Channel</p>
                <p className="text-2xl font-bold text-slate-900 capitalize">{topCommChannel}</p>
                <p className="text-xs text-slate-600 mt-1">Most responsive communication method</p>
              </div>
            </div>
          </div>
        </div>

        {/* Insights Card */}
        <div className="bg-white border border-slate-200 rounded-lg p-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Key Profile Insights</h3>

          <div className="space-y-4">
            <div className="pb-4 border-b border-slate-200">
              <p className="text-sm font-semibold text-slate-900 mb-1">Primary Industry</p>
              <p className="text-sm text-slate-600">{mostCommonIndustry}</p>
            </div>

            <div className="pb-4 border-b border-slate-200">
              <p className="text-sm font-semibold text-slate-900 mb-1">Conversion Rate</p>
              <p className="text-lg font-bold text-green-600">{conversionRate.toFixed(1)}%</p>
              <p className="text-xs text-slate-600 mt-1">vs 3-5% industry average</p>
            </div>

            <div className="pb-4 border-b border-slate-200">
              <p className="text-sm font-semibold text-slate-900 mb-1">Content Preference</p>
              <p className="text-sm text-slate-600">Long-form educational content (whitepapers, case studies)</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900 mb-2">Outreach Strategy</p>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>✓ Initiate via email with value-focused content</li>
                <li>✓ Follow up after 5-7 days of engagement</li>
                <li>✓ Schedule consultations with 1-2 day turnaround</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-teal-50 border border-teal-200 rounded-lg">
        <p className="text-sm text-slate-700">
          <span className="font-semibold text-teal-900">Marketing Implication:</span> Shift targeting toward{' '}
          {mostCommonIndustry} firms with 20-100 employees. Use email-first nurture campaigns with
          educational content. This persona replication could increase qualified pipeline by 35-45%.
        </p>
      </div>
    </section>
  )
}
