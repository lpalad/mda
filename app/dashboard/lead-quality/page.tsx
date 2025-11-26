'use client'

import { useEffect, useState } from 'react'
import { LeadQualityAnalytics } from '@/app/components/LeadQualityAnalytics'
import { DashboardNav } from '@/app/components/DashboardNav'
import { generateMockLeads } from '@/app/lib/generateData'
import { Lead } from '@/app/types/lead'

export default function LeadQualityPage() {
  const [leads, setLeads] = useState<Lead[]>([])

  useEffect(() => {
    setLeads(generateMockLeads(100))
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <DashboardNav currentSection="lead-quality" />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <LeadQualityAnalytics leads={leads} />
            <footer className="mt-16 pt-12 border-t border-slate-200 text-center text-sm text-slate-600">
              <p>Marketing Analytics Dashboard • Last updated: {new Date().toLocaleDateString()}</p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  )
}
