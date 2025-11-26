'use client'

import { useState, useEffect } from 'react'

export function BrandingHeader() {
  const [currentDateTime, setCurrentDateTime] = useState('')

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      setCurrentDateTime(now.toLocaleDateString('en-AU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }))
    }
    updateDateTime()
    const interval = setInterval(updateDateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-between mb-6">
      <p className="text-lg font-bold uppercase tracking-wide text-slate-700">
        Business Intelligence Platform | Leonard Palad - Principle Business Analyst
      </p>
      <p className="text-sm text-slate-500">{currentDateTime}</p>
    </div>
  )
}
