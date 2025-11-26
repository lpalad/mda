'use client'

import React, { useState } from 'react'
import { ArrowRight, PieChart } from 'lucide-react'

// ===== HELPER COMPONENTS =====

const PeriodFilter: React.FC<{ selectedPeriod: string; onPeriodChange: (period: string) => void }> = ({
  selectedPeriod,
  onPeriodChange,
}) => {
  const periods = ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'Year to Date', 'All Time']

  return (
    <div className="flex gap-2 flex-wrap">
      {periods.map((period) => (
        <button
          key={period}
          onClick={() => onPeriodChange(period)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedPeriod === period
              ? 'bg-slate-900 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          {period}
        </button>
      ))}
    </div>
  )
}

interface KpiCircleProps {
  label: string
  value: string
  delta: string
  progress: number
  color: string
}

const KpiCircle: React.FC<KpiCircleProps> = ({ label, value, delta, progress, color }) => {
  const circumference = 2 * Math.PI * 56
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-40 flex items-center justify-center">
        <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 150 150">
          <circle cx="75" cy="75" r="56" fill="none" stroke="#e2e8f0" strokeWidth="8" />
          <circle
            cx="75"
            cy="75"
            r="56"
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

// Period multipliers for dynamic data scaling
const PERIOD_MULTIPLIERS: Record<string, number> = {
  'Last 7 Days': 0.15,
  'Last 30 Days': 1,
  'Last 90 Days': 3.2,
  'Year to Date': 8.5,
  'All Time': 12,
}

interface ChannelPerformanceCardProps {
  multiplier: number
}

const ChannelPerformanceCard: React.FC<ChannelPerformanceCardProps> = ({ multiplier }) => {
  const baseChannels = [
    {
      name: 'Facebook',
      color: '#0ea5e9',
      baseData: [3, 5, 4, 8, 6, 9, 7, 8],
      baseMetrics: { ctr: 2.4, cpc: 0.89, conversions: 324 },
    },
    {
      name: 'Google',
      color: '#10b981',
      baseData: [5, 7, 6, 9, 8, 10, 9, 11],
      baseMetrics: { ctr: 3.1, cpc: 1.24, conversions: 512 },
    },
    {
      name: 'LinkedIn',
      color: '#6366f1',
      baseData: [4, 6, 5, 7, 8, 9, 10, 11],
      baseMetrics: { ctr: 1.8, cpc: 2.15, conversions: 156 },
    },
  ]

  const channels = baseChannels.map((channel) => {
    // Scale the bar data based on multiplier
    const scaledData = channel.baseData.map((val) => Math.round(val * Math.sqrt(multiplier)))
    const maxScaledHeight = Math.max(...scaledData)

    return {
      ...channel,
      data: scaledData,
      maxHeight: maxScaledHeight,
      metrics: {
        ctr: (channel.baseMetrics.ctr * (0.9 + Math.random() * 0.2)).toFixed(1),
        cpc: (channel.baseMetrics.cpc * (0.85 + Math.random() * 0.3)).toFixed(2),
        conversions: Math.round(channel.baseMetrics.conversions * multiplier),
      },
    }
  })

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-6">Channel Performance</h2>

      <div className="space-y-6">
        {channels.map((channel) => (
          <div key={channel.name}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-slate-900">{channel.name}</h3>
              <div className="flex gap-4 text-xs">
                <span className="text-slate-600">Best CTR: {channel.metrics.ctr}%</span>
                <span className="text-slate-600">Best CPC: ${channel.metrics.cpc}</span>
                <span className="text-slate-600">Conversions: {channel.metrics.conversions}</span>
              </div>
            </div>

            <div className="flex items-end gap-1 h-16">
              {channel.data.map((value, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    backgroundColor: channel.color,
                    height: `${(value / channel.maxHeight) * 100}%`,
                  }}
                />
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-2">8 weeks trend</p>
          </div>
        ))}
      </div>
    </div>
  )
}

interface CampaignPerformanceProps {
  multiplier: number
}

const CampaignPerformance: React.FC<CampaignPerformanceProps> = ({ multiplier }) => {
  const baseCampaigns = [
    { name: 'Campaign 3', ctr: 8.5, spend: 2640, impressions: 728000, clicks: 1750, cpm: 3.63, cpc: 1.51 },
    { name: 'Campaign 4', ctr: 6.2, spend: 1350, impressions: 83000, clicks: 258, cpm: 16.20, cpc: 5.23 },
    { name: 'Campaign 9', ctr: 5.8, spend: 1340, impressions: 118000, clicks: 241, cpm: 11.40, cpc: 5.57 },
    { name: 'Campaign 6', ctr: 9.1, spend: 1330, impressions: 315000, clicks: 956, cpm: 4.24, cpc: 1.40 },
  ]

  const campaigns = baseCampaigns.map((campaign) => {
    const scaledSpend = Math.round(campaign.spend * multiplier)
    const scaledImpressions = Math.round(campaign.impressions * multiplier)
    const scaledClicks = Math.round(campaign.clicks * multiplier)
    const scaledCtr = campaign.ctr * (0.9 + Math.random() * 0.2)

    return {
      name: campaign.name,
      ctr: scaledCtr,
      spend: `$${(scaledSpend / 1000).toFixed(2)}k`,
      impressions: scaledImpressions >= 1000000 ? `${(scaledImpressions / 1000000).toFixed(2)}m` : `${(scaledImpressions / 1000).toFixed(0)}k`,
      clicks: scaledClicks >= 1000 ? `${(scaledClicks / 1000).toFixed(2)}k` : scaledClicks.toString(),
      cpm: (campaign.cpm * (0.85 + Math.random() * 0.3)).toFixed(2),
      cpc: (campaign.cpc * (0.9 + Math.random() * 0.2)).toFixed(2),
    }
  })

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-6">Campaign Performance</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* CTR Score Bars */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-4">CTR Scores</h3>
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-slate-900">{campaign.name}</span>
                  <span className="text-sm font-semibold text-slate-900">{campaign.ctr.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full"
                    style={{ width: `${Math.min(campaign.ctr * 10, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Campaign Table */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Detailed Metrics</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="border-b border-slate-200">
                <tr>
                  <th className="text-left py-2 font-semibold text-slate-900">Campaign</th>
                  <th className="text-right py-2 font-semibold text-slate-900">Spend</th>
                  <th className="text-right py-2 font-semibold text-slate-900">Impr.</th>
                  <th className="text-right py-2 font-semibold text-slate-900">Clicks</th>
                  <th className="text-right py-2 font-semibold text-slate-900">CPM</th>
                  <th className="text-right py-2 font-semibold text-slate-900">CPC</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.name} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="text-left py-2 text-slate-900 font-medium">{campaign.name}</td>
                    <td className="text-right py-2 text-slate-700">{campaign.spend}</td>
                    <td className="text-right py-2 text-slate-700">{campaign.impressions}</td>
                    <td className="text-right py-2 text-slate-700">{campaign.clicks}</td>
                    <td className="text-right py-2 text-slate-700">${campaign.cpm}</td>
                    <td className="text-right py-2 text-slate-700">${campaign.cpc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

// ===== MAIN COMPONENT =====

export function MarketingROI() {
  const [selectedPeriod, setSelectedPeriod] = useState('Last 30 Days')

  // Base metrics for Last 30 Days
  const baseMetrics = {
    impressions: 3510000,
    clicks: 13650,
    ctr: 0.39,
    cpm: 3.79,
  }

  // Apply period multiplier
  const multiplier = PERIOD_MULTIPLIERS[selectedPeriod] || 1
  const scaledImpressions = Math.round(baseMetrics.impressions * multiplier)
  const scaledClicks = Math.round(baseMetrics.clicks * multiplier)
  const scaledCTR = parseFloat((baseMetrics.ctr * (0.9 + Math.random() * 0.2)).toFixed(2))
  const scaledCPM = parseFloat((baseMetrics.cpm * (0.85 + Math.random() * 0.3)).toFixed(2))

  // Format values for display
  const formatImpressions = scaledImpressions >= 1000000
    ? (scaledImpressions / 1000000).toFixed(2) + 'M'
    : (scaledImpressions / 1000).toFixed(1) + 'K'
  const formatClicks = scaledClicks >= 1000
    ? (scaledClicks / 1000).toFixed(2) + 'K'
    : scaledClicks.toString()

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
          Business Intelligence Platform | Leonard Palad - Principle Business Analyst
        </p>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Marketing ROI</h1>
            <p className="text-slate-600 mt-2">Attribution model across all paid & owned channels.</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100">
            <PieChart size={18} className="text-slate-600" />
            <span className="text-sm font-medium text-slate-700">{selectedPeriod}</span>
          </div>
        </div>

        {/* Period Filter */}
        <PeriodFilter selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} />
      </div>

      {/* KPI Circles */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-stagger-container">
        <div className="animate-stagger"><KpiCircle label="Impressions" value={formatImpressions} delta={`+${Math.round(multiplier * 12)}%`} progress={Math.min(72 * Math.sqrt(multiplier) / 2.8, 100)} color="#0ea5e9" /></div>
        <div className="animate-stagger"><KpiCircle label="Clicks" value={formatClicks} delta={`+${Math.round(multiplier * 8)}%`} progress={Math.min(68 * Math.sqrt(multiplier) / 2.8, 100)} color="#10b981" /></div>
        <div className="animate-stagger"><KpiCircle label="CTR" value={`${scaledCTR}%`} delta={`+${(scaledCTR - baseMetrics.ctr).toFixed(2)} pts`} progress={Math.min(scaledCTR * 100, 100)} color="#6366f1" /></div>
        <div className="animate-stagger"><KpiCircle label="CPM" value={`$${scaledCPM}`} delta={`${scaledCPM > baseMetrics.cpm ? '+' : '-'}${Math.abs(scaledCPM - baseMetrics.cpm).toFixed(2)}`} progress={Math.min(scaledCPM * 15, 100)} color="#f59e0b" /></div>
      </div>

      {/* Channel Performance */}
      <ChannelPerformanceCard multiplier={multiplier} />

      {/* Campaign Performance */}
      <CampaignPerformance multiplier={multiplier} />

      {/* Footer */}
      <div className="border-t border-slate-200 pt-6 flex items-center justify-between">
        <p className="text-xs text-slate-500">Model updated: {new Date().toLocaleDateString()}</p>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors">
          Export Report
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  )
}
