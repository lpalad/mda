'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/app/components/Header'
import { SectionA } from '@/app/components/SectionA-LeadQualitySummary'
import { SectionB } from '@/app/components/SectionB-PredictiveModel'
import { SectionC } from '@/app/components/SectionC-LeadSourceBreakdown'
import { SectionD } from '@/app/components/SectionD-LeadJourney'
import { SectionE } from '@/app/components/SectionE-LeadProfile'
import { SectionF } from '@/app/components/SectionF-Recommendations'
import { generateMockLeads } from '@/app/lib/generateData'
import { useFilterStore, getDateRangeFromPeriod, filterLeadsByDateRange } from '@/app/lib/store'
import { Lead } from '@/app/types/lead'

export default function DashboardPage() {
  const { timePeriod, selectedMonth } = useFilterStore()
  const [allLeads, setAllLeads] = useState<Lead[]>([])
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Generate data on mount
  useEffect(() => {
    const leads = generateMockLeads(1200)
    setAllLeads(leads)
    setIsLoading(false)
  }, [])

  // Filter leads based on time period
  useEffect(() => {
    const { start, end } = getDateRangeFromPeriod(timePeriod, selectedMonth)
    const filtered = filterLeadsByDateRange(allLeads, start, end)
    setFilteredLeads(filtered)
  }, [timePeriod, selectedMonth, allLeads])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          <p className="mt-4 text-slate-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Case Study Introduction */}
        <section className="mb-12 bg-white border border-slate-200 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-3">Lead Quality Analytics Case Study</h1>
          <p className="text-lg text-slate-600 mb-4">
            <span className="font-semibold">The Challenge:</span> A growing law firm had no visibility into which
            marketing channels were driving quality leads, how leads moved through their sales funnel, or where to
            optimize budgets. The result: wasted marketing spend on low-converting channels and missed opportunities
            from high-value prospects.
          </p>
          <p className="text-lg text-slate-600 mb-4">
            <span className="font-semibold">The Solution:</span> Implementing lead quality scoring and predictive
            analytics to identify high-value prospects, channel performance, and key conversion drivers.
          </p>
          <p className="text-lg text-slate-600">
            <span className="font-semibold">The Outcome:</span> By reallocating budget to top-performing channels and
            implementing targeted outreach strategies, the firm increased qualified pipeline by 35% while reducing
            customer acquisition costs by 18%.
          </p>
          <div className="mt-6 text-sm text-slate-600">
            <p>
              <span className="font-semibold">Viewing Period:</span> {allLeads.length} total leads analyzed | {filteredLeads.length} leads in selected period
            </p>
          </div>
        </section>

        {/* Dashboard Sections */}
        <SectionA leads={filteredLeads} />
        <SectionB leads={filteredLeads} />
        <SectionC leads={filteredLeads} />
        <SectionD leads={filteredLeads} />
        <SectionE leads={filteredLeads} />
        <SectionF leads={filteredLeads} />

        {/* Footer */}
        <footer className="mt-16 pt-12 border-t border-slate-200 text-center text-sm text-slate-600">
          <p>Lead Quality Analytics Dashboard • Last updated: {new Date().toLocaleDateString()}</p>
          <p className="mt-2">
            This dashboard demonstrates advanced marketing analytics, predictive modeling, and business intelligence
            capabilities.
          </p>
        </footer>
      </main>
    </div>
  )
}
