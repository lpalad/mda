'use client'

import { Lead } from '@/app/types/lead'
import { getPartnerPerformanceMetrics, getPartnerSummaryMetrics } from '@/app/lib/generateData'

interface PartnerPerformanceProps {
  leads: Lead[]
}

export function PartnerPerformance({ leads }: PartnerPerformanceProps) {
  const partnerMetrics = getPartnerPerformanceMetrics(leads)
  const summaryMetrics = getPartnerSummaryMetrics(leads)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On track':
        return 'bg-green-100 text-green-700'
      case 'Needs support':
        return 'bg-amber-100 text-amber-700'
      case 'Watch':
        return 'bg-slate-100 text-slate-700'
      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  return (
    <section className="space-y-8">
      {/* HEADER */}
      <div className="mb-8">
        <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
          <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-2">
            Law / Accounting firm example
          </p>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Partner performance</h1>
          <p className="text-slate-600">
            How individual partners convert firm-generated demand into matters.
          </p>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-stagger-container">
        <div className="bg-white border border-slate-200 rounded-lg p-6 animate-stagger">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Marketing Spend
          </p>
          <p className="text-3xl font-bold text-slate-900 mb-2">
            ${(summaryMetrics.totalSpend / 1000).toFixed(0)}k
          </p>
          <p className="text-sm text-slate-600">Total for selected period</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6 animate-stagger">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Cost Per Qualified Lead
          </p>
          <p className="text-3xl font-bold text-slate-900 mb-2">
            ${summaryMetrics.avgCostPerQualifiedLead}
          </p>
          <p className="text-sm text-slate-600">Marketing + handling</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6 animate-stagger">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Lead → Matter
          </p>
          <p className="text-3xl font-bold text-slate-900 mb-2">
            {summaryMetrics.overallConversion}%
          </p>
          <p className="text-sm text-slate-600">Firm-wide conversion</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6 animate-stagger">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            New Revenue
          </p>
          <p className="text-3xl font-bold text-slate-900 mb-2">
            +${(summaryMetrics.newRevenue / 1000).toFixed(0)}k
          </p>
          <p className="text-sm text-slate-600">Attributed to campaigns</p>
        </div>
      </div>

      {/* PARTNER SNAPSHOT TABLE */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden animate-scale-in">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            Partner Snapshot
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Conversion from firm marketing into matters, by partner.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-slate-900">Partner</th>
                <th className="px-6 py-4 text-center font-semibold text-slate-900">
                  New matters (period)
                </th>
                <th className="px-6 py-4 text-center font-semibold text-slate-900">
                  New clients from marketing
                </th>
                <th className="px-6 py-4 text-center font-semibold text-slate-900">
                  Lead → matter conversion
                </th>
                <th className="px-6 py-4 text-center font-semibold text-slate-900">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {partnerMetrics.map((partner, idx) => (
                <tr
                  key={idx}
                  className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    {partner.name}
                  </td>
                  <td className="px-6 py-4 text-center text-slate-700">
                    {partner.newMatters}
                  </td>
                  <td className="px-6 py-4 text-center text-slate-700">
                    {partner.newClientsFromMarketing}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-block px-3 py-1 rounded-full font-semibold text-sm bg-slate-100 text-slate-900">
                      {partner.leadToMatterConversion}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full font-semibold text-sm ${getStatusColor(partner.status)}`}>
                      {partner.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* INSIGHT BOX */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 animate-scale-in">
        <p className="text-sm text-slate-700">
          <span className="font-semibold text-emerald-900">Key Insight:</span> Partners with
          high lead-to-matter conversion rates are those engaging consistently with marketing
          touchpoints. Consider implementing partner enablement training on the qualified leads
          provided and expected follow-up timelines.
        </p>
      </div>
    </section>
  )
}
