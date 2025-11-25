'use client'

import React, { useState } from 'react'
import { Users, DollarSign, Package2, Activity } from 'lucide-react'

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

const HalfGauge: React.FC<{ fill: number; color: string }> = ({ fill, color }) => {
  const background = `conic-gradient(${color} ${fill}%, #e5e7eb 0)`
  return (
    <div className="relative flex h-24 w-24 items-center justify-center">
      <div className="h-full w-full rounded-full" style={{ background }} />
      <div className="absolute h-16 w-16 rounded-full bg-white" />
    </div>
  )
}

interface HalfMetricCardProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  sublabel: string
  fill: number
  color: string
}

const HalfMetricCard: React.FC<HalfMetricCardProps> = ({
  icon: Icon,
  label,
  value,
  sublabel,
  fill,
  color,
}) => {
  return (
    <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm">
      <div className="mb-2 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-900 text-slate-50">
            <Icon className="h-4 w-4" />
          </div>
          <p className="text-xs font-semibold text-slate-700">{label}</p>
        </div>
      </div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xl font-semibold text-slate-900">{value}</p>
          <p className="mt-1 text-[11px] text-slate-500">{sublabel}</p>
        </div>
        <HalfGauge fill={fill} color={color} />
      </div>
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
  const numCustomers = baseMetrics.numCustomers
  const avgRevenue = totalRevenue / numCustomers
  const numProductsSold = Math.round(baseMetrics.numProductsSold * multiplier)

  return (
    <div className="min-h-screen w-full bg-slate-50 px-4 py-8 text-slate-900 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        {/* Header Card */}
        <div className="rounded-3xl bg-white/90 p-6 shadow-sm ring-1 ring-slate-200">
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
        <div className="grid gap-4 sm:grid-cols-4 animate-stagger-container">
          <div className="animate-stagger">
            <HalfMetricCard
              icon={Users}
              label="Num of Customers"
              value={numCustomers.toString()}
              sublabel="Active customers"
              fill={80}
              color="#38bdf8"
            />
          </div>
          <div className="animate-stagger">
            <HalfMetricCard
              icon={DollarSign}
              label="Total Revenue"
              value={`$${(totalRevenue / 1000).toFixed(0)}k`}
              sublabel="From customers"
              fill={65}
              color="#22c55e"
            />
          </div>
          <div className="animate-stagger">
            <HalfMetricCard
              icon={Activity}
              label="Avg Revenue Per Customer"
              value={`$${(avgRevenue / 1000).toFixed(1)}k`}
              sublabel="Customer value"
              fill={70}
              color="#a855f7"
            />
          </div>
          <div className="animate-stagger">
            <HalfMetricCard
              icon={Package2}
              label="Num of Products Sold"
              value={numProductsSold.toString()}
              sublabel="Total quantity"
              fill={55}
              color="#f97316"
            />
          </div>
        </div>

        {/* Customer Revenue Card */}
        <div className="mt-4 rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm">
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
