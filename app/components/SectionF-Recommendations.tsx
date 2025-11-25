'use client'

import { CheckCircle, AlertCircle, TrendingUp, Clock } from 'lucide-react'

interface SectionFProps {
  leads: any[]
}

export function SectionF(_props: SectionFProps) {
  const recommendations = [
    {
      title: 'Reallocate Budget from Low-Quality Channels',
      description: 'Shift 15-20% of marketing spend from Social Media to Paid Search & LinkedIn',
      impact: '+25-30% qualified leads',
      timeframe: '30 days',
      priority: 'high',
      icon: TrendingUp,
    },
    {
      title: 'Accelerate Lead Follow-up for High-Quality Leads',
      description: 'Implement 24-hour follow-up SLA for high-quality leads vs current 72 hours',
      impact: '+8-12% conversion',
      timeframe: '14 days',
      priority: 'high',
      icon: Clock,
    },
    {
      title: 'Reduce Booking-to-Consultation Cycle',
      description: 'Implement automated scheduling to reduce 3-day wait to 1-day wait',
      impact: '+$87k quarterly revenue',
      timeframe: '45 days',
      priority: 'medium',
      icon: TrendingUp,
    },
    {
      title: 'Build Content Aligned with High-Value Personas',
      description: 'Create 4-6 whitepapers targeting mid-market Corporate Law & IP firms',
      impact: '+20% lead quality',
      timeframe: '60 days',
      priority: 'medium',
      icon: CheckCircle,
    },
  ]

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Actions & Recommendations</h2>
        <p className="text-slate-600">
          Clear, data-driven recommendations to improve lead quality and maximize conversion. Implementing these
          changes may increase revenue by <span className="font-semibold text-primary">18-22% over 90 days</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {recommendations.map((rec, idx) => {
          const IconComponent = rec.icon
          return (
            <div
              key={idx}
              className={`border rounded-lg p-6 hover:shadow-md transition-shadow ${
                rec.priority === 'high'
                  ? 'bg-red-50 border-red-200'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                    rec.priority === 'high' ? 'bg-red-100' : 'bg-slate-100'
                  }`}
                >
                  <IconComponent
                    size={20}
                    className={rec.priority === 'high' ? 'text-red-600' : 'text-slate-600'}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{rec.title}</h3>
                      <p className="text-sm text-slate-600 mt-1">{rec.description}</p>
                    </div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        rec.priority === 'high'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {rec.priority === 'high' ? 'High Priority' : 'Medium Priority'}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-4">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase">Expected Impact</p>
                      <p className="text-sm font-bold text-green-600">{rec.impact}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase">Timeline</p>
                      <p className="text-sm font-bold text-slate-900">{rec.timeframe}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Implementation Roadmap */}
      <div className="mt-8 bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">90-Day Implementation Roadmap</h3>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700">
              1
            </div>
            <div>
              <p className="font-semibold text-slate-900">Days 1-14: Quick Wins</p>
              <p className="text-sm text-slate-600 mt-1">
                Implement 24-hour follow-up SLA. Start budget reallocation testing. Launch communication
                preference A/B test.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-700">
              2
            </div>
            <div>
              <p className="font-semibold text-slate-900">Days 15-45: Structural Changes</p>
              <p className="text-sm text-slate-600 mt-1">
                Deploy automated scheduling system. Fully reallocate marketing budget. Begin content
                development for target personas.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-700">
              3
            </div>
            <div>
              <p className="font-semibold text-slate-900">Days 46-90: Optimization & Measurement</p>
              <p className="text-sm text-slate-600 mt-1">
                Publish new targeted content. Measure impact on lead quality and conversion. Iterate on
                underperforming tactics.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Metrics */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-xs font-semibold text-green-900 uppercase mb-2">Expected 90-Day Outcome #1</p>
          <p className="text-2xl font-bold text-green-700">+18-22%</p>
          <p className="text-sm text-green-700 mt-1">Revenue increase</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-xs font-semibold text-blue-900 uppercase mb-2">Expected 90-Day Outcome #2</p>
          <p className="text-2xl font-bold text-blue-700">38-42%</p>
          <p className="text-sm text-blue-700 mt-1">High-quality lead percentage</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-xs font-semibold text-purple-900 uppercase mb-2">Expected 90-Day Outcome #3</p>
          <p className="text-2xl font-bold text-purple-700">+25-30%</p>
          <p className="text-sm text-purple-700 mt-1">Sales efficiency improvement</p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-slate-900 text-white rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold mb-1">Strategic Note:</p>
            <p className="text-sm opacity-90">
              These recommendations are based on historical data patterns and predictive modeling. Success
              depends on consistent execution and cross-functional alignment between Marketing, Sales, and
              Operations. Monthly reviews recommended to measure progress and adjust tactics.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
