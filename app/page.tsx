'use client'

import Link from 'next/link'
import { BarChart3, TrendingUp, Search, Zap, Users, Gem, Lightbulb } from 'lucide-react'

const dashboardSections = [
  {
    id: 'executive-summary',
    icon: BarChart3,
    title: 'Executive Summary',
    subtitle: 'The 30-Second Truth About Your Entire Firm.',
    description: 'One screen. One story. Total visibility.',
    hover: 'See revenue risks, performance gaps, and growth opportunities instantly—no digging, no Excel, no meetings.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'marketing-roi',
    icon: TrendingUp,
    title: 'Marketing ROI',
    subtitle: 'Cut the Fat. Scale the Winners.',
    description: 'Know exactly which marketing dollars produce clients—and which burn cash.',
    hover: 'Stop guessing where to spend. See which channels build your pipeline and which ones quietly bleed your budget dry.',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    id: 'lead-quality',
    icon: Search,
    title: 'Lead Quality Analytics',
    subtitle: 'Not All Leads Are Equal.',
    description: 'Here\'s Who Converts. Predictive scoring that separates gold from noise.',
    hover: 'Focus your team on the leads worth pursuing. Identify high-value clients before your competitors even call them.',
    color: 'from-primary to-primary-dark',
  },
  {
    id: 'sales-pipeline',
    icon: Zap,
    title: 'Sales Pipeline',
    subtitle: 'Plug the Leaks. Accelerate the Close.',
    description: 'See where deals stall—and fix them.',
    hover: 'Spot bottlenecks in seconds. Understand why leads drop off. Turn your pipeline into a revenue engine.',
    color: 'from-orange-500 to-orange-600',
  },
  {
    id: 'partner-performance',
    icon: Users,
    title: 'Partner Performance',
    subtitle: 'Who\'s Driving Growth—and Who Needs Help.',
    description: 'Real accountability. Real transparency.',
    hover: 'Track targets, workload, contribution, and opportunity. No politics. Just performance.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 'client-lifetime-value',
    icon: Gem,
    title: 'Client Lifetime Value',
    subtitle: 'Your Most Valuable Clients—Revealed.',
    description: 'Double down on the ones who stay, pay, and grow.',
    hover: 'Segment clients by profitability, loyalty, and long-term potential. Prioritize the ones who build your future revenue.',
    color: 'from-pink-500 to-pink-600',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            The Dashboard That Ends Guesswork.
            <br />
            <span className="text-primary-light">Permanently.</span>
          </h1>

          <p className="text-xl text-slate-300 mb-4 leading-relaxed">
            Every firm says they "use data."
            <br />
            Most are still guessing.
          </p>

          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
            This is the system built for leaders who refuse to run their business on opinions, gut feel, or last month's excuses.
          </p>

          <div className="inline-block bg-slate-700/50 border border-primary/30 rounded-lg px-6 py-3">
            <p className="text-primary-light font-semibold italic">
              "This dashboard delivers what every CEO, partner, and revenue leader wants but never gets: Total clarity. Total control. Total truth."
            </p>
          </div>
        </div>
      </section>

      {/* Value Statement */}
      <section className="bg-white border-b border-slate-200 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-block w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="text-blue-600" size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Clarity</h3>
              <p className="text-slate-600">Know what's happening in real-time, without filters or bias.</p>
            </div>

            <div className="text-center">
              <div className="inline-block w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="text-emerald-600" size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Control</h3>
              <p className="text-slate-600">Know exactly what to fix and where to focus your effort.</p>
            </div>

            <div className="text-center">
              <div className="inline-block w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="text-primary" size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Confidence</h3>
              <p className="text-slate-600">Know what decision to make next—before your competition reacts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="bg-slate-50 py-12 px-6 border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">If you want to know:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-slate-200">
              <span className="text-primary font-bold text-lg">✓</span>
              <p className="text-slate-700">Which clients are worth fighting for</p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-slate-200">
              <span className="text-primary font-bold text-lg">✓</span>
              <p className="text-slate-700">Which marketing you should stop paying for</p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-slate-200">
              <span className="text-primary font-bold text-lg">✓</span>
              <p className="text-slate-700">What's killing your sales pipeline</p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-slate-200">
              <span className="text-primary font-bold text-lg">✓</span>
              <p className="text-slate-700">Which partners are carrying the firm</p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-slate-200">
              <span className="text-primary font-bold text-lg">✓</span>
              <p className="text-slate-700">Where your next 90 days of revenue will come from</p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-slate-200">
              <span className="text-primary font-bold text-lg">✓</span>
              <p className="text-slate-700">What you must fix before it becomes a fire</p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-lg text-center">
            <p className="text-lg text-slate-900 font-semibold">You're in the right place.</p>
            <p className="text-slate-600 mt-2">This isn't just a dashboard. This is an executive weapon.</p>
          </div>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Pick a Card. See the Truth.</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardSections.map((section) => {
              const Icon = section.icon
              return (
                <Link
                  key={section.id}
                  href={`/dashboard?section=${section.id}`}
                  className="group"
                >
                  <div className="h-full bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all duration-300 cursor-pointer">
                    {/* Color Bar */}
                    <div className={`h-1 bg-gradient-to-r ${section.color}`} />

                    {/* Content */}
                    <div className="p-6">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon size={24} className="text-white" />
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-1">{section.title}</h3>
                      <p className="text-sm font-semibold text-primary mb-3">{section.subtitle}</p>
                      <p className="text-slate-600 text-sm mb-4">{section.description}</p>

                      <div className="pt-4 border-t border-slate-100 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-xs text-slate-600 italic">{section.hover}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-12 px-6 text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to See the Truth?</h2>
        <p className="text-lg opacity-90 mb-6">Pick a card above. Your next business advantage begins there.</p>
        <p className="text-sm opacity-75">No guesses. No bias. No surprises. Just clarity.</p>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-6 text-center border-t border-slate-800">
        <p className="text-sm">Marketing Analytics Dashboard • Built for Leaders Who Demand Data-Driven Decisions</p>
      </footer>
    </div>
  )
}
