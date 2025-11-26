'use client'

import { SalesPipeline } from '@/app/components/SectionSalesPipeline'
import { DashboardNav } from '@/app/components/DashboardNav'

export default function SalesPipelinePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <DashboardNav currentSection="sales-pipeline" />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <SalesPipeline />
            <footer className="mt-16 pt-12 border-t border-slate-200 text-center text-sm text-slate-600">
              <p>Marketing Analytics Dashboard • Last updated: {new Date().toLocaleDateString()}</p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  )
}
