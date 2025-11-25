'use client'

import { useEffect, useState, Suspense } from 'react'
import { Header } from '@/app/components/Header'
import { DashboardContent } from '@/app/components/DashboardContent'
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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      <Suspense fallback={<div>Loading...</div>}>
        <DashboardContent allLeads={allLeads} filteredLeads={filteredLeads} />
      </Suspense>
    </div>
  )
}
