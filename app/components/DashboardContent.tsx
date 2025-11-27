'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { LeadQualityAnalytics } from '@/app/components/LeadQualityAnalytics'
import { AcquisitionFunnel } from '@/app/components/AcquisitionFunnel'
import { PartnerPerformance } from '@/app/components/SectionPartnerPerformance'
import { SalesPipeline } from '@/app/components/SectionSalesPipeline'
import { CLVDashboard } from '@/app/components/CLVDashboard'
import { Lead } from '@/app/types/lead'
import { TrendingUp, Search, Zap, Users, BarChart3, Home } from 'lucide-react'

const sidebarSections = [
  { id: 'acquisition-funnel', label: 'Acquisition & Funnel', icon: TrendingUp, href: '/acquisition-funnel' },
  { id: 'clv-segmentation', label: 'CLV & Segmentation', icon: BarChart3, href: '/clv-segmentation' },
  { id: 'lead-quality', label: 'Lead Quality Analytics', icon: Search, href: '/lead-quality' },
  { id: 'partner-performance', label: 'Partner Performance', icon: Users, href: '/partner-performance' },
  { id: 'sales-pipeline', label: 'Sales Pipeline', icon: Zap, href: '/sales-pipeline' },
]

interface DashboardContentProps {
  filteredLeads: Lead[]
}

export function DashboardContent({ filteredLeads }: DashboardContentProps) {
  const searchParams = useSearchParams()
  const currentSection = searchParams.get('section') || 'lead-quality'

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 overflow-y-auto">
        <nav className="p-6 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors group"
          >
            <Home size={18} className="group-hover:text-primary" />
            <span className="font-medium group-hover:text-primary">Back to Home</span>
          </Link>

          <div className="pt-4 mt-4 border-t border-slate-200">
            <p className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase">Dashboard Sections</p>
            {sidebarSections.map((section) => {
              const Icon = section.icon
              const isActive = currentSection === section.id
              return (
                <Link
                  key={section.id}
                  href={section.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary border-l-2 border-primary'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium text-sm">{section.label}</span>
                </Link>
              )
            })}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Lead Quality Analytics */}
          {currentSection === 'lead-quality' && (
            <LeadQualityAnalytics leads={filteredLeads} />
          )}

          {/* Acquisition & Funnel Section */}
          {currentSection === 'acquisition-funnel' && (
            <AcquisitionFunnel />
          )}

          {/* Partner Performance Section */}
          {currentSection === 'partner-performance' && (
            <PartnerPerformance leads={filteredLeads} />
          )}

          {/* Sales Pipeline Section */}
          {currentSection === 'sales-pipeline' && <SalesPipeline />}

          {/* CLV & Segmentation Section */}
          {currentSection === 'clv-segmentation' && (
            <CLVDashboard />
          )}

          {/* Placeholder for other sections */}
          {currentSection !== 'lead-quality' && currentSection !== 'acquisition-funnel' && currentSection !== 'partner-performance' && currentSection !== 'sales-pipeline' && currentSection !== 'clv-segmentation' && (
            <div className="bg-white border border-slate-200 rounded-lg p-12 text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                {sidebarSections.find((s) => s.id === currentSection)?.label}
              </h2>
              <p className="text-slate-600 mb-6">Coming soon. Awaiting content details for this section.</p>
              <p className="text-sm text-slate-500">
                This section will be built once you provide the content and metrics specifications.
              </p>
            </div>
          )}

          {/* Footer */}
          <footer className="mt-16 pt-12 border-t border-slate-200 text-center text-sm text-slate-600">
            <p>Marketing Analytics Dashboard • Last updated: {new Date().toLocaleDateString()}</p>
          </footer>
        </div>
      </main>
    </div>
  )
}
