'use client'

import { DashboardNav } from '@/app/components/DashboardNav'
import { AcquisitionFunnel } from '@/app/components/AcquisitionFunnel'

export default function AcquisitionFunnelPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardNav currentSection="acquisition-funnel" />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <AcquisitionFunnel />
        </div>
      </main>
    </div>
  )
}
