'use client'

import { create } from 'zustand'

export type TimePeriod = 'last-3-months' | 'last-6-months' | 'last-12-months' | 'month-by-month'

interface FilterState {
  timePeriod: TimePeriod
  selectedMonth?: string
  setTimePeriod: (period: TimePeriod) => void
  setSelectedMonth: (month?: string) => void
}

export const useFilterStore = create<FilterState>((set) => ({
  timePeriod: 'last-12-months',
  selectedMonth: undefined,
  setTimePeriod: (period) => set({ timePeriod: period }),
  setSelectedMonth: (month) => set({ selectedMonth: month }),
}))

export function getDateRangeFromPeriod(
  period: TimePeriod,
  selectedMonth?: string
): { start: Date; end: Date } {
  const today = new Date()
  let start = new Date(today)
  let end = new Date(today)

  switch (period) {
    case 'last-3-months':
      start = new Date(today.getTime() - 3 * 30 * 24 * 60 * 60 * 1000)
      break
    case 'last-6-months':
      start = new Date(today.getTime() - 6 * 30 * 24 * 60 * 60 * 1000)
      break
    case 'last-12-months':
      start = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000)
      break
    case 'month-by-month':
      if (selectedMonth) {
        const [year, month] = selectedMonth.split('-').map(Number)
        start = new Date(year, month - 1, 1)
        end = new Date(year, month, 0)
      } else {
        start = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
      }
      break
  }

  return { start, end }
}

export function filterLeadsByDateRange(leads: any[], start: Date, end: Date) {
  return leads.filter(lead => {
    const leadDate = new Date(lead.dateCreated)
    return leadDate >= start && leadDate <= end
  })
}
