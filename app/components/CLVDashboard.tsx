'use client'

import React, { useState, useMemo } from 'react'
import { BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, Area, AreaChart } from 'recharts'
import { TrendingUp, TrendingDown, Users, DollarSign, Target, AlertTriangle } from 'lucide-react'

// Period multipliers for dynamic data
const periodMultipliers: Record<string, { revenue: number; customers: number; growth: number; churn: number }> = {
  'This Month': { revenue: 0.08, customers: 0.08, growth: 1.2, churn: 0.95 },
  'Last Month': { revenue: 0.075, customers: 0.078, growth: 1.1, churn: 1.0 },
  'This Quarter': { revenue: 0.25, customers: 0.24, growth: 1.15, churn: 0.98 },
  'Last Quarter': { revenue: 0.23, customers: 0.22, growth: 1.05, churn: 1.02 },
  'This Year': { revenue: 1.0, customers: 1.0, growth: 1.0, churn: 1.0 },
  'Last Year': { revenue: 0.88, customers: 0.92, growth: 0.9, churn: 1.1 },
  'All Time': { revenue: 2.4, customers: 2.2, growth: 1.0, churn: 1.0 },
}

// Australian regions
const australianRegions = ['All', 'NSW', 'VIC', 'QLD', 'WA', 'SA', 'NT', 'TAS', 'ACT']

// Region multipliers for data variation
const regionMultipliers: Record<string, number> = {
  'All': 1.0,
  'NSW': 0.32,
  'VIC': 0.26,
  'QLD': 0.18,
  'WA': 0.11,
  'SA': 0.07,
  'NT': 0.02,
  'TAS': 0.025,
  'ACT': 0.025,
}

// Channel multipliers for segment performance variations
const channelSegmentMultipliers: Record<string, Record<string, number>> = {
  'All': { Champions: 1, Loyal: 1, Potential: 1, 'At Risk': 1, New: 1 },
  'Referral': { Champions: 1.4, Loyal: 1.3, Potential: 0.8, 'At Risk': 0.5, New: 0.7 },
  'Direct': { Champions: 1.3, Loyal: 1.2, Potential: 0.9, 'At Risk': 0.6, New: 0.8 },
  'Partner': { Champions: 1.2, Loyal: 1.1, Potential: 1.0, 'At Risk': 0.7, New: 0.9 },
  'LinkedIn': { Champions: 1.0, Loyal: 1.0, Potential: 1.1, 'At Risk': 0.9, New: 1.2 },
  'Google Ads': { Champions: 0.7, Loyal: 0.8, Potential: 1.2, 'At Risk': 1.3, New: 1.4 },
  'Meta': { Champions: 0.6, Loyal: 0.7, Potential: 1.3, 'At Risk': 1.4, New: 1.5 },
}

// Base data that will be multiplied by period/region
const baseSegmentData = [
  { segment: 'Champions', customers: 312, avgCLV: 28450, avgCAC: 4200, ltvCac: 6.8, revenueShare: 42, churnRate: 3.2, paybackMonths: 1.8, grossMargin: 72 },
  { segment: 'Loyal', customers: 489, avgCLV: 15200, avgCAC: 3800, ltvCac: 4.0, revenueShare: 28, churnRate: 8.5, paybackMonths: 3.0, grossMargin: 68 },
  { segment: 'Potential', customers: 634, avgCLV: 6800, avgCAC: 3200, ltvCac: 2.1, revenueShare: 16, churnRate: 15.2, paybackMonths: 5.6, grossMargin: 62 },
  { segment: 'At Risk', customers: 398, avgCLV: 4200, avgCAC: 3500, ltvCac: 1.2, revenueShare: 8, churnRate: 32.4, paybackMonths: 10.0, grossMargin: 55 },
  { segment: 'New', customers: 667, avgCLV: 2100, avgCAC: 2800, ltvCac: 0.8, revenueShare: 6, churnRate: 22.1, paybackMonths: 16.0, grossMargin: 58 },
]

const baseClvBuildupData = [
  { month: 0, Champions: 0, Loyal: 0, Potential: 0, AtRisk: 0 },
  { month: 3, Champions: 4200, Loyal: 3800, Potential: 2800, AtRisk: 2200 },
  { month: 6, Champions: 9500, Loyal: 6200, Potential: 4100, AtRisk: 3100 },
  { month: 9, Champions: 14800, Loyal: 8900, Potential: 5200, AtRisk: 3600 },
  { month: 12, Champions: 19200, Loyal: 11200, Potential: 5800, AtRisk: 3900 },
  { month: 15, Champions: 22800, Loyal: 13100, Potential: 6200, AtRisk: 4050 },
  { month: 18, Champions: 25600, Loyal: 14500, Potential: 6500, AtRisk: 4100 },
  { month: 21, Champions: 27200, Loyal: 15000, Potential: 6700, AtRisk: 4150 },
  { month: 24, Champions: 28450, Loyal: 15200, Potential: 6800, AtRisk: 4200 },
]

const baseCohortData = [
  { cohort: '2024-01', m0: 100, m1: 82, m2: 74, m3: 68, m4: 64, m5: 61, m6: 58, m7: 56, m8: 54, m9: 52, m10: 51, m11: 50 },
  { cohort: '2024-02', m0: 100, m1: 79, m2: 71, m3: 65, m4: 60, m5: 57, m6: 54, m7: 52, m8: 50, m9: 48, m10: 47, m11: null },
  { cohort: '2024-03', m0: 100, m1: 84, m2: 76, m3: 70, m4: 66, m5: 63, m6: 60, m7: 58, m8: 56, m9: 54, m10: null, m11: null },
  { cohort: '2024-04', m0: 100, m1: 81, m2: 73, m3: 67, m4: 62, m5: 59, m6: 56, m7: 54, m8: 52, m9: null, m10: null, m11: null },
  { cohort: '2024-05', m0: 100, m1: 85, m2: 78, m3: 72, m4: 68, m5: 65, m6: 62, m7: 60, m8: null, m9: null, m10: null, m11: null },
  { cohort: '2024-06', m0: 100, m1: 83, m2: 75, m3: 69, m4: 65, m5: 62, m6: 59, m7: null, m8: null, m9: null, m10: null, m11: null },
  { cohort: '2024-07', m0: 100, m1: 86, m2: 79, m3: 73, m4: 69, m5: 66, m6: null, m7: null, m8: null, m9: null, m10: null, m11: null },
  { cohort: '2024-08', m0: 100, m1: 82, m2: 74, m3: 68, m4: 64, m5: null, m6: null, m7: null, m8: null, m9: null, m10: null, m11: null },
]

const baseRfmScatterData = [
  { recency: 15, monetary: 32000, frequency: 24, cluster: 'Champions', name: 'C1' },
  { recency: 22, monetary: 28000, frequency: 20, cluster: 'Champions', name: 'C2' },
  { recency: 18, monetary: 26000, frequency: 18, cluster: 'Champions', name: 'C3' },
  { recency: 35, monetary: 18000, frequency: 14, cluster: 'Loyal', name: 'L1' },
  { recency: 42, monetary: 15000, frequency: 12, cluster: 'Loyal', name: 'L2' },
  { recency: 48, monetary: 12000, frequency: 10, cluster: 'Loyal', name: 'L3' },
  { recency: 65, monetary: 8000, frequency: 6, cluster: 'Potential', name: 'P1' },
  { recency: 75, monetary: 6500, frequency: 5, cluster: 'Potential', name: 'P2' },
  { recency: 120, monetary: 5000, frequency: 4, cluster: 'At Risk', name: 'R1' },
  { recency: 150, monetary: 4200, frequency: 3, cluster: 'At Risk', name: 'R2' },
  { recency: 180, monetary: 3800, frequency: 2, cluster: 'At Risk', name: 'R3' },
  { recency: 10, monetary: 2500, frequency: 2, cluster: 'New', name: 'N1' },
  { recency: 25, monetary: 1800, frequency: 1, cluster: 'New', name: 'N2' },
]

const baseClvDistribution = [
  { bucket: '$0-2K', count: 580, percentage: 23.2 },
  { bucket: '$2K-5K', count: 485, percentage: 19.4 },
  { bucket: '$5K-10K', count: 520, percentage: 20.8 },
  { bucket: '$10K-20K', count: 445, percentage: 17.8 },
  { bucket: '$20K-50K', count: 312, percentage: 12.5 },
  { bucket: '$50K+', count: 158, percentage: 6.3 },
]

const baseChannelData = [
  { channel: 'Referral', avgCLV: 18500, avgCAC: 1200, ltvCac: 15.4 },
  { channel: 'Direct', avgCLV: 16200, avgCAC: 800, ltvCac: 20.3 },
  { channel: 'Partner', avgCLV: 14800, avgCAC: 3200, ltvCac: 4.6 },
  { channel: 'LinkedIn', avgCLV: 12400, avgCAC: 4500, ltvCac: 2.8 },
  { channel: 'Google Ads', avgCLV: 8600, avgCAC: 3800, ltvCac: 2.3 },
  { channel: 'Meta', avgCLV: 6200, avgCAC: 2900, ltvCac: 2.1 },
]

const clusterColors: Record<string, string> = {
  'Champions': '#10B981',
  'Loyal': '#3B82F6',
  'Potential': '#8B5CF6',
  'At Risk': '#F59E0B',
  'New': '#6B7280',
}

// KPI Card Component
const KPICard = ({ title, value, subtitle, change, changeType, icon: Icon }: {
  title: string
  value: string
  subtitle?: string
  change?: string
  changeType?: 'positive' | 'negative'
  icon: React.ComponentType<{ className?: string }>
}) => (
  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-gray-500">{title}</span>
      <div className="p-2 bg-gray-50 rounded-lg">
        <Icon className="w-4 h-4 text-gray-600" />
      </div>
    </div>
    <div className="flex items-end gap-3">
      <span className="text-2xl font-bold text-gray-900">{value}</span>
      {change && (
        <div className={`flex items-center gap-1 text-sm font-medium ${changeType === 'positive' ? 'text-emerald-600' : 'text-red-500'}`}>
          {changeType === 'positive' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {change}
        </div>
      )}
    </div>
    {subtitle && <span className="text-xs text-gray-400 mt-1">{subtitle}</span>}
  </div>
)

// Cohort Heatmap Cell
const CohortCell = ({ value }: { value: number | null }) => {
  if (value === null) return <td className="px-2 py-1 text-center text-xs text-gray-300">-</td>
  const intensity = Math.min(value / 100, 1)
  const bgColor = `rgba(16, 185, 129, ${intensity * 0.8 + 0.1})`
  const textColor = intensity > 0.5 ? 'white' : 'rgb(55, 65, 81)'
  return (
    <td className="px-2 py-1 text-center text-xs font-medium" style={{ backgroundColor: bgColor, color: textColor }}>
      {value}%
    </td>
  )
}

// Main Dashboard
export function CLVDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('This Year')
  const [selectedSegment, setSelectedSegment] = useState('All')
  const [selectedChannel, setSelectedChannel] = useState('All')
  const [selectedRegion, setSelectedRegion] = useState('All')
  const [chartMetric, setChartMetric] = useState('avgCLV')

  // Calculate dynamic data based on filters
  const multiplier = useMemo(() => {
    const period = periodMultipliers[selectedPeriod] || periodMultipliers['This Year']
    const region = regionMultipliers[selectedRegion] || 1
    return {
      revenue: period.revenue * region,
      customers: period.customers * region,
      growth: period.growth,
      churn: period.churn,
    }
  }, [selectedPeriod, selectedRegion])

  // Dynamic segment data - affected by channel selection
  const segmentData = useMemo(() => {
    const channelMult = channelSegmentMultipliers[selectedChannel] || channelSegmentMultipliers['All']
    return baseSegmentData
      .filter(s => selectedSegment === 'All' || s.segment === selectedSegment)
      .map(s => {
        const segMult = channelMult[s.segment] || 1
        return {
          ...s,
          customers: Math.round(s.customers * multiplier.customers * segMult),
          avgCLV: Math.round(s.avgCLV * multiplier.growth * segMult),
          avgCAC: Math.round(s.avgCAC * (selectedChannel === 'All' ? 1 : (selectedChannel === 'Referral' || selectedChannel === 'Direct' ? 0.7 : selectedChannel === 'Partner' ? 0.9 : 1.2))),
          ltvCac: parseFloat((s.ltvCac * segMult * (selectedChannel === 'All' ? 1 : (selectedChannel === 'Referral' || selectedChannel === 'Direct' ? 1.4 : selectedChannel === 'Partner' ? 1.1 : 0.8))).toFixed(1)),
          churnRate: parseFloat((s.churnRate * multiplier.churn / segMult).toFixed(1)),
          revenueShare: Math.round(s.revenueShare * segMult),
        }
      })
  }, [selectedSegment, selectedChannel, multiplier])

  // Dynamic CLV buildup data - responds to channel and segment filters
  const clvBuildupData = useMemo(() => {
    const channelMult = channelSegmentMultipliers[selectedChannel] || channelSegmentMultipliers['All']
    return baseClvBuildupData.map(d => {
      const result: Record<string, number> = { month: d.month }
      if (selectedSegment === 'All' || selectedSegment === 'Champions') {
        result.Champions = Math.round(d.Champions * multiplier.growth * (channelMult['Champions'] || 1))
      }
      if (selectedSegment === 'All' || selectedSegment === 'Loyal') {
        result.Loyal = Math.round(d.Loyal * multiplier.growth * (channelMult['Loyal'] || 1))
      }
      if (selectedSegment === 'All' || selectedSegment === 'Potential') {
        result.Potential = Math.round(d.Potential * multiplier.growth * (channelMult['Potential'] || 1))
      }
      if (selectedSegment === 'All' || selectedSegment === 'At Risk') {
        result.AtRisk = Math.round(d.AtRisk * multiplier.growth * (channelMult['At Risk'] || 1))
      }
      return result
    })
  }, [multiplier, selectedChannel, selectedSegment])

  // Dynamic cohort data (varies by churn multiplier and channel)
  const cohortData = useMemo(() => {
    // Channel affects retention - Referral/Direct have better retention
    const channelRetentionBoost = selectedChannel === 'All' ? 1 :
      selectedChannel === 'Referral' ? 1.15 :
      selectedChannel === 'Direct' ? 1.12 :
      selectedChannel === 'Partner' ? 1.05 :
      selectedChannel === 'LinkedIn' ? 0.95 :
      selectedChannel === 'Google Ads' ? 0.88 : 0.85

    return baseCohortData.map(row => {
      const adjustedRow: Record<string, number | string | null> = { cohort: row.cohort }
      for (let i = 0; i <= 11; i++) {
        const key = `m${i}` as keyof typeof row
        const val = row[key]
        if (val !== null && typeof val === 'number') {
          if (i === 0) {
            adjustedRow[key] = 100
          } else {
            adjustedRow[key] = Math.max(0, Math.min(100, Math.round(val * channelRetentionBoost / multiplier.churn)))
          }
        } else {
          adjustedRow[key] = null
        }
      }
      return adjustedRow
    })
  }, [multiplier, selectedChannel])

  // Dynamic RFM scatter data - responds to channel and segment filters
  const rfmScatterData = useMemo(() => {
    const channelMult = channelSegmentMultipliers[selectedChannel] || channelSegmentMultipliers['All']
    // Channel affects recency - paid channels have higher recency (less recent)
    const recencyMult = selectedChannel === 'All' ? 1 :
      selectedChannel === 'Referral' ? 0.7 :
      selectedChannel === 'Direct' ? 0.8 :
      selectedChannel === 'Partner' ? 0.9 :
      selectedChannel === 'LinkedIn' ? 1.1 :
      selectedChannel === 'Google Ads' ? 1.3 : 1.4

    return baseRfmScatterData
      .filter(d => selectedSegment === 'All' || d.cluster === selectedSegment)
      .map(d => {
        const segMult = channelMult[d.cluster] || 1
        return {
          ...d,
          recency: Math.round(d.recency * recencyMult),
          monetary: Math.round(d.monetary * multiplier.revenue * segMult),
          frequency: Math.max(1, Math.round(d.frequency * multiplier.customers * segMult)),
        }
      })
  }, [selectedSegment, selectedChannel, multiplier])

  // Dynamic CLV distribution - responds to channel and segment
  const clvDistribution = useMemo(() => {
    // Channel affects distribution shape - Referral/Direct skew towards higher buckets
    const channelDistMult: Record<string, number[]> = {
      'All': [1, 1, 1, 1, 1, 1],
      'Referral': [0.5, 0.7, 0.9, 1.2, 1.5, 1.8],
      'Direct': [0.6, 0.75, 0.95, 1.15, 1.4, 1.6],
      'Partner': [0.7, 0.85, 1.0, 1.1, 1.25, 1.4],
      'LinkedIn': [0.9, 1.0, 1.1, 1.0, 0.9, 0.8],
      'Google Ads': [1.3, 1.2, 1.1, 0.9, 0.7, 0.5],
      'Meta': [1.5, 1.3, 1.1, 0.8, 0.6, 0.4],
    }
    const distMult = channelDistMult[selectedChannel] || channelDistMult['All']

    // Segment affects distribution too
    const segmentDistMult: Record<string, number[]> = {
      'All': [1, 1, 1, 1, 1, 1],
      'Champions': [0.1, 0.2, 0.3, 0.6, 1.5, 2.5],
      'Loyal': [0.3, 0.5, 0.8, 1.4, 1.3, 0.8],
      'Potential': [0.6, 1.2, 1.5, 1.0, 0.5, 0.2],
      'At Risk': [1.0, 1.3, 1.2, 0.8, 0.4, 0.2],
      'New': [1.8, 1.4, 0.8, 0.4, 0.2, 0.1],
    }
    const segMult = segmentDistMult[selectedSegment] || segmentDistMult['All']

    return baseClvDistribution.map((d, idx) => ({
      ...d,
      count: Math.max(1, Math.round(d.count * multiplier.customers * distMult[idx] * segMult[idx])),
    }))
  }, [multiplier, selectedChannel, selectedSegment])

  // Dynamic channel data - responds to segment selection
  const channelData = useMemo(() => {
    // Segment affects channel performance
    const segmentChannelMult: Record<string, number> = {
      'All': 1,
      'Champions': 1.4,
      'Loyal': 1.2,
      'Potential': 0.9,
      'At Risk': 0.7,
      'New': 0.6,
    }
    const segMult = segmentChannelMult[selectedSegment] || 1

    return baseChannelData
      .filter(c => selectedChannel === 'All' || c.channel === selectedChannel)
      .map(c => ({
        ...c,
        avgCLV: Math.round(c.avgCLV * multiplier.growth * segMult),
        avgCAC: Math.round(c.avgCAC * (1 + (multiplier.growth - 1) * 0.3)),
        ltvCac: parseFloat((c.ltvCac * multiplier.growth * segMult / (1 + (multiplier.growth - 1) * 0.3)).toFixed(1)),
      }))
  }, [selectedChannel, selectedSegment, multiplier])

  // Calculate KPI values
  const kpiValues = useMemo(() => {
    const totalCustomers = segmentData.reduce((sum, s) => sum + s.customers, 0)
    const totalCLV = segmentData.reduce((sum, s) => sum + (s.customers * s.avgCLV), 0)
    const avgCLV = totalCustomers > 0 ? totalCLV / totalCustomers : 0
    const avgLtvCac = segmentData.reduce((sum, s) => sum + s.ltvCac, 0) / segmentData.length
    const championsLoyal = segmentData.filter(s => s.segment === 'Champions' || s.segment === 'Loyal')
    const highValueRevShare = championsLoyal.reduce((sum, s) => sum + s.revenueShare, 0)
    const avgChurn = segmentData.reduce((sum, s) => sum + s.churnRate, 0) / segmentData.length

    return {
      totalCLV: totalCLV >= 1000000 ? `$${(totalCLV / 1000000).toFixed(1)}M` : `$${(totalCLV / 1000).toFixed(0)}K`,
      avgCLV: `$${avgCLV.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      ltvCac: `${avgLtvCac.toFixed(1)}x`,
      highValueRev: `${Math.round(highValueRevShare)}%`,
      churnRate: `${avgChurn.toFixed(1)}%`,
      totalCustomers: totalCustomers.toLocaleString(),
    }
  }, [segmentData])

  const getChurnColor = (rate: number) => {
    if (rate < 10) return 'text-emerald-600 bg-emerald-50'
    if (rate < 20) return 'text-amber-600 bg-amber-50'
    return 'text-red-600 bg-red-50'
  }

  const getPaybackColor = (months: number) => {
    if (months < 6) return 'text-emerald-600 bg-emerald-50'
    if (months < 12) return 'text-amber-600 bg-amber-50'
    return 'text-red-600 bg-red-50'
  }

  const getLtvCacColor = (ratio: number) => {
    if (ratio >= 3) return 'text-emerald-600'
    if (ratio >= 2) return 'text-amber-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">CLV & Segmentation</h1>
        <p className="text-sm text-gray-500 mt-1">B2B Customer Analytics Dashboard</p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm text-sm font-medium cursor-pointer hover:border-gray-300 transition-colors"
        >
          <option value="This Month">This Month</option>
          <option value="Last Month">Last Month</option>
          <option value="This Quarter">This Quarter</option>
          <option value="Last Quarter">Last Quarter</option>
          <option value="This Year">This Year</option>
          <option value="Last Year">Last Year</option>
          <option value="All Time">All Time</option>
        </select>
        <select
          value={selectedSegment}
          onChange={(e) => setSelectedSegment(e.target.value)}
          className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm text-sm cursor-pointer hover:border-gray-300 transition-colors"
        >
          <option value="All">All Segments</option>
          <option value="Champions">Champions</option>
          <option value="Loyal">Loyal</option>
          <option value="Potential">Potential</option>
          <option value="At Risk">At Risk</option>
          <option value="New">New</option>
        </select>
        <select
          value={selectedChannel}
          onChange={(e) => setSelectedChannel(e.target.value)}
          className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm text-sm cursor-pointer hover:border-gray-300 transition-colors"
        >
          <option value="All">All Channels</option>
          <option value="Google Ads">Google Ads</option>
          <option value="Meta">Meta</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Referral">Referral</option>
          <option value="Direct">Direct</option>
          <option value="Partner">Partner</option>
        </select>
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm text-sm cursor-pointer hover:border-gray-300 transition-colors"
        >
          {australianRegions.map(region => (
            <option key={region} value={region}>
              {region === 'All' ? 'All Regions' : region}
            </option>
          ))}
        </select>
      </div>

      {/* TOP ROW: KPI Cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <KPICard
          title="Total CLV"
          value={kpiValues.totalCLV}
          change={multiplier.growth > 1 ? `+${((multiplier.growth - 1) * 100).toFixed(1)}%` : `${((multiplier.growth - 1) * 100).toFixed(1)}%`}
          changeType={multiplier.growth >= 1 ? 'positive' : 'negative'}
          subtitle={`${selectedPeriod} • ${selectedRegion === 'All' ? 'Australia' : selectedRegion}`}
          icon={DollarSign}
        />
        <KPICard
          title="Avg CLV per Customer"
          value={kpiValues.avgCLV}
          change={multiplier.growth > 1 ? '+8.2%' : '-3.1%'}
          changeType={multiplier.growth >= 1 ? 'positive' : 'negative'}
          subtitle={`across ${kpiValues.totalCustomers} customers`}
          icon={Users}
        />
        <KPICard
          title="LTV:CAC Ratio"
          value={kpiValues.ltvCac}
          change="+0.4x"
          changeType="positive"
          subtitle="target: 3.0x"
          icon={Target}
        />
        <KPICard
          title="High Value Revenue"
          value={kpiValues.highValueRev}
          subtitle="Champions + Loyal segments"
          icon={TrendingUp}
        />
        <KPICard
          title="Churn Rate"
          value={kpiValues.churnRate}
          change={multiplier.churn < 1 ? '-2.1%' : '+1.8%'}
          changeType={multiplier.churn <= 1 ? 'positive' : 'negative'}
          subtitle="vs previous period"
          icon={AlertTriangle}
        />
      </div>

      {/* MIDDLE ROW: Segmentation Table + Chart */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Segmentation Table */}
        <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Segment Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Segment</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-500">Customers</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-500">Avg CLV</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-500">Avg CAC</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-500">LTV:CAC</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-500">Rev Share</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-500">Churn</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-500">Payback</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-500">Margin</th>
                </tr>
              </thead>
              <tbody>
                {segmentData.map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: clusterColors[row.segment] }} />
                        <span className="font-medium text-gray-900">{row.segment}</span>
                      </div>
                    </td>
                    <td className="text-right py-3 px-2 text-gray-700">{row.customers.toLocaleString()}</td>
                    <td className="text-right py-3 px-2">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 bg-gray-100 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-blue-500 transition-all duration-500"
                            style={{ width: `${Math.min((row.avgCLV / 35000) * 100, 100)}%` }}
                          />
                        </div>
                        <span className="text-gray-900 font-medium">${(row.avgCLV / 1000).toFixed(1)}K</span>
                      </div>
                    </td>
                    <td className="text-right py-3 px-2 text-gray-700">${(row.avgCAC / 1000).toFixed(1)}K</td>
                    <td className="text-right py-3 px-2">
                      <span className={`font-semibold ${getLtvCacColor(row.ltvCac)}`}>{row.ltvCac}x</span>
                    </td>
                    <td className="text-right py-3 px-2 text-gray-700">{row.revenueShare}%</td>
                    <td className="text-right py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getChurnColor(row.churnRate)}`}>
                        {row.churnRate}%
                      </span>
                    </td>
                    <td className="text-right py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaybackColor(row.paybackMonths)}`}>
                        {row.paybackMonths}mo
                      </span>
                    </td>
                    <td className="text-right py-3 px-2 text-gray-700">{row.grossMargin}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CLV by Segment Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">CLV by Segment</h3>
            <select
              value={chartMetric}
              onChange={(e) => setChartMetric(e.target.value)}
              className="text-xs bg-gray-50 border border-gray-200 rounded px-2 py-1"
            >
              <option value="avgCLV">Avg CLV</option>
              <option value="ltvCac">LTV:CAC</option>
              <option value="revenueShare">Revenue %</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={segmentData} layout="vertical" margin={{ left: 20, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
              <XAxis type="number" tickFormatter={(v) => chartMetric === 'avgCLV' ? `$${v/1000}K` : chartMetric === 'ltvCac' ? `${v}x` : `${v}%`} fontSize={11} stroke="#9CA3AF" />
              <YAxis dataKey="segment" type="category" width={80} fontSize={11} stroke="#9CA3AF" />
              <Tooltip
                formatter={(value: number) => {
                  if (chartMetric === 'avgCLV') return [`$${value.toLocaleString()}`, 'Avg CLV']
                  if (chartMetric === 'ltvCac') return [`${value}x`, 'LTV:CAC']
                  return [`${value}%`, 'Revenue Share']
                }}
                contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }}
              />
              <Bar dataKey={chartMetric} radius={[0, 4, 4, 0]}>
                {segmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={clusterColors[entry.segment]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* BOTTOM ROW: Behavior & Retention Charts */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Cumulative CLV Build-up */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cumulative CLV Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={clvBuildupData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" fontSize={11} stroke="#9CA3AF" tickFormatter={(v) => `M${v}`} />
              <YAxis fontSize={11} stroke="#9CA3AF" tickFormatter={(v) => `$${v/1000}K`} />
              <Tooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                labelFormatter={(label) => `Month ${label}`}
                contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }}
              />
              <Legend />
              {(selectedSegment === 'All' || selectedSegment === 'Champions') && (
                <Area type="monotone" dataKey="Champions" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
              )}
              {(selectedSegment === 'All' || selectedSegment === 'Loyal') && (
                <Area type="monotone" dataKey="Loyal" stackId="2" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
              )}
              {(selectedSegment === 'All' || selectedSegment === 'Potential') && (
                <Area type="monotone" dataKey="Potential" stackId="3" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
              )}
              {(selectedSegment === 'All' || selectedSegment === 'At Risk') && (
                <Area type="monotone" dataKey="AtRisk" stackId="4" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.3} name="At Risk" />
              )}
            </AreaChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 mt-2">Shows how CLV accumulates per customer by segment over 24 months</p>
        </div>

        {/* Cohort Retention Heatmap */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cohort Retention Heatmap</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr>
                  <th className="text-left py-2 px-2 font-medium text-gray-500">Cohort</th>
                  {['M0', 'M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11'].map(m => (
                    <th key={m} className="text-center py-2 px-1 font-medium text-gray-500">{m}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cohortData.map((row, idx) => (
                  <tr key={idx}>
                    <td className="py-1 px-2 font-medium text-gray-700">{row.cohort as string}</td>
                    <CohortCell value={row.m0 as number | null} />
                    <CohortCell value={row.m1 as number | null} />
                    <CohortCell value={row.m2 as number | null} />
                    <CohortCell value={row.m3 as number | null} />
                    <CohortCell value={row.m4 as number | null} />
                    <CohortCell value={row.m5 as number | null} />
                    <CohortCell value={row.m6 as number | null} />
                    <CohortCell value={row.m7 as number | null} />
                    <CohortCell value={row.m8 as number | null} />
                    <CohortCell value={row.m9 as number | null} />
                    <CohortCell value={row.m10 as number | null} />
                    <CohortCell value={row.m11 as number | null} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-3">% of customers still active by months since acquisition</p>
        </div>
      </div>

      {/* BOTTOM ROW 2: RFM Scatter + Distribution */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* RFM Scatter Plot */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">RFM Cluster Analysis</h3>
          <ResponsiveContainer width="100%" height={280}>
            <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="recency"
                name="Recency"
                type="number"
                domain={[0, 200]}
                fontSize={11}
                stroke="#9CA3AF"
                label={{ value: 'Recency (days)', position: 'bottom', fontSize: 10, fill: '#6B7280' }}
                reversed
              />
              <YAxis
                dataKey="monetary"
                name="Monetary"
                type="number"
                fontSize={11}
                stroke="#9CA3AF"
                tickFormatter={(v) => `$${v/1000}K`}
                label={{ value: 'CLV ($)', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#6B7280' }}
              />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                content={({ payload }) => {
                  if (payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200 text-xs">
                        <p className="font-semibold" style={{ color: clusterColors[data.cluster] }}>{data.cluster}</p>
                        <p className="text-gray-600">Recency: {data.recency} days</p>
                        <p className="text-gray-600">CLV: ${data.monetary.toLocaleString()}</p>
                        <p className="text-gray-600">Orders: {data.frequency}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend />
              {Object.keys(clusterColors).map(cluster => (
                <Scatter
                  key={cluster}
                  name={cluster}
                  data={rfmScatterData.filter(d => d.cluster === cluster)}
                  fill={clusterColors[cluster]}
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 mt-2">Bubble size = order frequency. Top-left = best customers.</p>
        </div>

        {/* CLV Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">CLV Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={clvDistribution} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="bucket" fontSize={11} stroke="#9CA3AF" />
              <YAxis fontSize={11} stroke="#9CA3AF" />
              <Tooltip
                formatter={(value: number, name: string) => [name === 'count' ? `${value} customers` : `${value}%`, name === 'count' ? 'Count' : 'Share']}
                contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }}
              />
              <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Customers">
                {clvDistribution.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={index >= 4 ? '#10B981' : '#3B82F6'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-blue-500" />
              <span>Standard value</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-emerald-500" />
              <span>High value ($20K+)</span>
            </div>
          </div>
        </div>
      </div>

      {/* CHANNEL ANALYSIS ROW */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Channel Performance: CLV vs CAC</h3>
        <div className="grid grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={channelData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="channel" fontSize={10} stroke="#9CA3AF" angle={-15} textAnchor="end" height={50} />
              <YAxis fontSize={11} stroke="#9CA3AF" tickFormatter={(v) => `$${v/1000}K`} />
              <Tooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Avg CLV']}
                contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }}
              />
              <Bar dataKey="avgCLV" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Avg CLV" />
            </BarChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height={220}>
            <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="avgCAC"
                name="CAC"
                type="number"
                fontSize={11}
                stroke="#9CA3AF"
                tickFormatter={(v) => `$${v/1000}K`}
                label={{ value: 'CAC ($)', position: 'bottom', fontSize: 10, fill: '#6B7280' }}
              />
              <YAxis
                dataKey="avgCLV"
                name="CLV"
                type="number"
                fontSize={11}
                stroke="#9CA3AF"
                tickFormatter={(v) => `$${v/1000}K`}
                label={{ value: 'CLV ($)', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#6B7280' }}
              />
              <Tooltip
                content={({ payload }) => {
                  if (payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200 text-xs">
                        <p className="font-semibold text-gray-900">{data.channel}</p>
                        <p className="text-gray-600">CLV: ${data.avgCLV.toLocaleString()}</p>
                        <p className="text-gray-600">CAC: ${data.avgCAC.toLocaleString()}</p>
                        <p className="text-emerald-600 font-medium">LTV:CAC: {data.ltvCac}x</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Scatter data={channelData} fill="#8B5CF6">
                {channelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.ltvCac >= 3 ? '#10B981' : entry.ltvCac >= 2 ? '#F59E0B' : '#EF4444'} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-6 mt-3 text-xs text-gray-500 justify-center">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span>LTV:CAC ≥3x (Excellent)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span>2-3x (Good)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span>&lt; 2x (Needs work)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
