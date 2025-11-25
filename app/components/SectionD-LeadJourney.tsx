'use client'

import { Lead, LeadStage } from '@/app/types/lead'

interface SectionDProps {
  leads: Lead[]
}

export function SectionD({ leads }: SectionDProps) {
  const stages: LeadStage[] = ['Awareness', 'Interest', 'Booking', 'Consultation', 'Conversion']

  const stageData = stages.map(stage => {
    const stageLeads = leads.filter(l => l.stage === stage)
    const highQuality = stageLeads.filter(l => l.qualityTier === 'High').length
    const mediumQuality = stageLeads.filter(l => l.qualityTier === 'Medium').length
    const lowQuality = stageLeads.filter(l => l.qualityTier === 'Low').length
    const total = stageLeads.length

    return {
      stage,
      highQuality,
      mediumQuality,
      lowQuality,
      total,
      highQualityPercentage: total > 0 ? ((highQuality / total) * 100).toFixed(1) : '0',
    }
  })

  const maxTotal = Math.max(...stageData.map(d => d.total))

  // Find biggest drop-off
  let maxDropoff = { fromStage: '', toStage: '', percentage: 0 }
  for (let i = 0; i < stageData.length - 1; i++) {
    const dropoff = (((stageData[i].total - stageData[i + 1].total) / stageData[i].total) * 100).toFixed(1)
    if (parseFloat(dropoff) > maxDropoff.percentage) {
      maxDropoff = {
        fromStage: stageData[i].stage,
        toStage: stageData[i + 1].stage,
        percentage: parseFloat(dropoff),
      }
    }
  }

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Lead Journey & Quality Funnel</h2>
        <p className="text-slate-600">
          High-quality leads show strongest momentum through <span className="font-semibold">early stages</span>,
          but experience the biggest drop-off between{' '}
          <span className="font-semibold text-primary">
            {maxDropoff.fromStage} → {maxDropoff.toStage}
          </span>
          . This {maxDropoff.percentage.toFixed(1)}% drop-off indicates a potential bottleneck in scheduling
          or consultation process.
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg border border-slate-200">
        <div className="space-y-6">
          {stageData.map((data, idx) => {
            const barHeight = (data.total / maxTotal) * 100
            const highQualityWidth = data.total > 0 ? (data.highQuality / data.total) * 100 : 0
            const mediumQualityWidth =
              data.total > 0 ? (data.mediumQuality / data.total) * 100 : 0

            return (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-slate-900">{data.stage}</h3>
                  <span className="text-sm font-bold text-slate-700">{data.total} leads</span>
                </div>

                <div className="flex items-end h-16 bg-slate-50 rounded-lg p-3 border border-slate-200">
                  <div
                    className="flex h-full rounded-md overflow-hidden"
                    style={{ width: `${Math.min(barHeight * 2, 100)}%` }}
                  >
                    <div
                      className="bg-green-500 transition-all"
                      style={{ width: `${highQualityWidth}%` }}
                      title={`High: ${data.highQuality}`}
                    />
                    <div
                      className="bg-yellow-500 transition-all"
                      style={{ width: `${mediumQualityWidth}%` }}
                      title={`Medium: ${data.mediumQuality}`}
                    />
                    <div
                      className="bg-red-400 transition-all"
                      style={{ width: `${100 - highQualityWidth - mediumQualityWidth}%` }}
                      title={`Low: ${data.lowQuality}`}
                    />
                  </div>

                  <div className="ml-4 text-xs font-semibold text-slate-600 whitespace-nowrap">
                    <div>HQ: {data.highQualityPercentage}%</div>
                  </div>
                </div>

                {idx < stageData.length - 1 && (
                  <div className="my-3 flex justify-center">
                    <div className="text-xs font-semibold text-slate-500">
                      ↓{' '}
                      {(
                        ((stageData[idx].total - stageData[idx + 1].total) /
                          stageData[idx].total) *
                        100
                      ).toFixed(0)}
                      % drop-off
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded" />
              <span className="text-sm text-slate-700">High Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded" />
              <span className="text-sm text-slate-700">Medium Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-400 rounded" />
              <span className="text-sm text-slate-700">Low Quality</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <p className="text-sm text-slate-700">
          <span className="font-semibold text-purple-900">Action Item:</span> Reducing booking-to-consultation
          wait time from 3 days to 1 day could recover ~$87k in lost quarterly revenue from high-quality leads.
          Implement automated scheduling to improve conversion velocity.
        </p>
      </div>
    </section>
  )
}
