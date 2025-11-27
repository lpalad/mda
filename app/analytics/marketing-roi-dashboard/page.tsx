'use client'

import { MarketingROIDashboard } from '@/app/components/MarketingROIDashboard'
import { DashboardNav } from '@/app/components/DashboardNav'
import { BrandingHeader } from '@/app/components/BrandingHeader'

export default function MarketingROIDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <DashboardNav currentSection="marketing-roi-dashboard" />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <BrandingHeader />
            <MarketingROIDashboard />
            <footer className="mt-16 pt-12 border-t border-slate-200 text-center text-sm text-slate-600">
              <p>Marketing Analytics Dashboard • Last updated: {new Date().toLocaleDateString()}</p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  )
}
