'use client'

import React, { useState } from 'react'

// ===== PERIOD CONFIGURATION =====

const PERIOD_OPTIONS = [
  { value: 'last-7', label: 'Last 7 Days' },
  { value: 'last-30', label: 'Last 30 Days' },
  { value: 'last-90', label: 'Last 90 Days' },
  { value: 'year-to-date', label: 'Year to Date' },
  { value: 'all-time', label: 'All Time' },
]

const PERIOD_MULTIPLIERS: Record<string, number> = {
  'last-7': 0.12,
  'last-30': 1,
  'last-90': 3.2,
  'year-to-date': 8.5,
  'all-time': 12,
}

// ===== DATA =====

const baseCustomers = [
  { name: 'Visionary Enterprises', revenue: 21000 },
  { name: 'Swift Enterprises', revenue: 19047 },
  { name: 'United Solutions', revenue: 18121 },
  { name: 'Titan Enterprises', revenue: 17743 },
  { name: 'Fusion Systems', revenue: 16751 },
  { name: 'Alpha Corporation', revenue: 12440 },
]

const baseMetrics = {
  numCustomers: 6,
  numProductsSold: 122,
}

// ===== HELPER COMPONENTS =====

interface KpiCircleProps {
  label: string
  value: string
  delta: string
  progress: number
  color: string
}

const KpiCircle: React.FC<KpiCircleProps> = ({ label, value, delta, progress, color }) => {
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="45" fill="none" stroke="#e2e8f0" strokeWidth="8" />
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.3s ease' }}
          />
        </svg>
        <div className="absolute text-center">
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          <p className="text-xs text-emerald-600 font-semibold">{delta}</p>
        </div>
      </div>
      <p className="mt-4 text-sm font-medium text-slate-600 text-center">{label}</p>
    </div>
  )
}

interface CustomerRevenueBarProps {
  customers: Array<{ name: string; revenue: number }>
}

const CustomerRevenueBars: React.FC<CustomerRevenueBarProps> = ({ customers }) => {
  const maxRevenue = Math.max(...customers.map((c) => c.revenue))
  return (
    <div className="mt-4 space-y-3">
      {customers.map((c) => {
        const width = (c.revenue / maxRevenue) * 100
        const formatted = `$${c.revenue.toLocaleString()}`
        return (
          <div key={c.name} className="flex items-center gap-3">
            <span className="w-40 truncate text-[11px] text-slate-600">{c.name}</span>
            <div className="relative h-2 flex-1 rounded-full bg-slate-100">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400"
                style={{ width: `${width}%` }}
              />
            </div>
            <span className="w-20 text-right text-[11px] font-medium text-slate-700">{formatted}</span>
          </div>
        )
      })}
    </div>
  )
}

// ===== MAIN COMPONENT =====

export function SalesPipeline() {
  const [selectedPeriod, setSelectedPeriod] = useState('last-30')
  const multiplier = PERIOD_MULTIPLIERS[selectedPeriod]

  // Calculate scaled data
  const customers = baseCustomers.map((c) => ({
    name: c.name,
    revenue: Math.round(c.revenue * multiplier),
  }))

  const totalRevenue = customers.reduce((sum, c) => sum + c.revenue, 0)
  const numCustomers = Math.round(baseMetrics.numCustomers * multiplier)
  const avgRevenue = totalRevenue / numCustomers
  const numProductsSold = Math.round(baseMetrics.numProductsSold * multiplier)

  return (
    <div className="min-h-screen w-full bg-slate-50 px-4 py-8 text-slate-900 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        {/* Header Card */}
        <div className="rounded-3xl bg-white/90 p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
            Business Intelligence Platform | Leonard Palad - Principle Business Analyst
          </p>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Sales Pipeline</h1>
              <p className="mt-1 text-sm text-slate-500">Revenue breakdown by customers and products.</p>
            </div>
          </div>

          {/* Period Filter */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-700">Period:</span>
            <div className="flex gap-2 flex-wrap">
              {PERIOD_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedPeriod(option.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedPeriod === option.value
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-stagger-container">
          <div className="animate-stagger">
            <KpiCircle
              label="Num of Customers"
              value={numCustomers.toString()}
              delta="Active customers"
              progress={Math.min((numCustomers / 12) * 100, 100)}
              color="#38bdf8"
            />
          </div>
          <div className="animate-stagger">
            <KpiCircle
              label="Total Revenue"
              value={`$${(totalRevenue / 1000).toFixed(0)}k`}
              delta="From customers"
              progress={Math.min((totalRevenue / 100000) * 100, 100)}
              color="#22c55e"
            />
          </div>
          <div className="animate-stagger">
            <KpiCircle
              label="Avg Revenue Per Customer"
              value={`$${(avgRevenue / 1000).toFixed(1)}k`}
              delta="Customer value"
              progress={Math.min((avgRevenue / 20000) * 100, 100)}
              color="#a855f7"
            />
          </div>
          <div className="animate-stagger">
            <KpiCircle
              label="Num of Products Sold"
              value={numProductsSold.toString()}
              delta="Total quantity"
              progress={Math.min((numProductsSold / 2000) * 100, 100)}
              color="#f97316"
            />
          </div>
        </div>

        {/* Customer Revenue Card */}
        <div className="mt-4 rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm animate-scale-in">
          <h2 className="text-sm font-semibold text-slate-900">Customer Revenue</h2>
          <p className="mt-1 text-xs text-slate-500">Revenue by customer (top 6).</p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {/* Left: Visual Bars */}
            <div>
              <p className="text-xs font-medium text-slate-700">Revenue distribution</p>
              <p className="mt-1 text-[11px] text-slate-500">
                Longer bar = higher revenue. Quickly see your top customers.
              </p>
              <CustomerRevenueBars customers={customers} />
            </div>

            {/* Right: Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <table className="min-w-full divide-y divide-slate-200 text-xs">
                <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-2 text-left">Customer Name</th>
                    <th className="px-4 py-2 text-right">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[11px] text-slate-700">
                  {customers.map((c) => (
                    <tr key={c.name} className="hover:bg-slate-50">
                      <td className="px-4 py-2">{c.name}</td>
                      <td className="px-4 py-2 text-right">${c.revenue.toLocaleString()}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50/80">
                    <td className="px-4 py-2 font-semibold text-slate-900">Total</td>
                    <td className="px-4 py-2 text-right font-semibold text-slate-900">
                      ${totalRevenue.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
