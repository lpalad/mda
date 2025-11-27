'use client'

import { CLVDashboard } from '@/app/components/CLVDashboard'
import { DashboardNav } from '@/app/components/DashboardNav'
import { BrandingHeader } from '@/app/components/BrandingHeader'

export default function CLVSegmentationPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <DashboardNav currentSection="clv-segmentation" />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <BrandingHeader />
            <CLVDashboard />
            <footer className="mt-16 pt-12 border-t border-slate-200 text-center text-sm text-slate-600">
              <p>Marketing Analytics Dashboard - Last updated: {new Date().toLocaleDateString()}</p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  )
}
