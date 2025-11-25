'use client'

import { useFilterStore, TimePeriod } from '@/app/lib/store'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const TIME_PERIODS: { value: TimePeriod; label: string }[] = [
  { value: 'last-3-months', label: 'Last 3 Months' },
  { value: 'last-6-months', label: 'Last 6 Months' },
  { value: 'last-12-months', label: 'Last 12 Months' },
  { value: 'month-by-month', label: 'Month by Month' },
]

export function Header() {
  const { timePeriod, setTimePeriod } = useFilterStore()
  const [isOpen, setIsOpen] = useState(false)

  const currentLabel = TIME_PERIODS.find(p => p.value === timePeriod)?.label || 'Select Period'

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Lead Quality Analytics</h1>
            <p className="text-slate-600 mt-1">B2B Law Firm - Marketing Performance Dashboard</p>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
            >
              {currentLabel}
              <ChevronDown size={18} />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
                {TIME_PERIODS.map(period => (
                  <button
                    key={period.value}
                    onClick={() => {
                      setTimePeriod(period.value)
                      setIsOpen(false)
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors ${
                      timePeriod === period.value ? 'bg-primary-light/10 text-primary font-medium' : 'text-slate-700'
                    }`}
                  >
                    {period.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
