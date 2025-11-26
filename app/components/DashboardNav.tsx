'use client'

import Link from 'next/link'
import { Home, TrendingUp, Search, Zap, Users, Gem } from 'lucide-react'

interface DashboardNavProps {
  currentSection: string
}

const sections = [
  { id: 'marketing-roi', label: 'Marketing ROI', icon: TrendingUp, href: '/marketing-roi' },
  { id: 'lead-quality', label: 'Lead Quality Analytics', icon: Search, href: '/lead-quality' },
  { id: 'sales-pipeline', label: 'Sales Pipeline', icon: Zap, href: '/sales-pipeline' },
  { id: 'partner-performance', label: 'Partner Performance', icon: Users, href: '/partner-performance' },
  { id: 'client-lifetime-value', label: 'Client Lifetime Value', icon: Gem, href: '/client-lifetime-value' },
]

export function DashboardNav({ currentSection }: DashboardNavProps) {
  return (
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
          {sections.map((section) => {
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
  )
}
