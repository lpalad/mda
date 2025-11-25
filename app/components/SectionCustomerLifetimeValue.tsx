'use client'

import { useState } from 'react'
import { Lead } from '@/app/types/lead'
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts'

interface CustomerLifetimeValueProps {
  leads: Lead[]
}

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

export function CustomerLifetimeValue(_: CustomerLifetimeValueProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('last-30')
  const multiplier = PERIOD_MULTIPLIERS[selectedPeriod]

  // CLV by Education data
  const educationData = [
    { name: 'Bachelor', value: Math.round(2085 * multiplier), fill: '#3b82f6' },
    { name: 'College', value: Math.round(778 * multiplier), fill: '#f59e0b' },
    { name: 'High School', value: Math.round(147 * multiplier), fill: '#ef4444' },
    { name: 'Doctor', value: Math.round(140 * multiplier), fill: '#10b981' },
  ]

  // CLV by Loyalty Card data
  const loyaltyCardData = [
    { name: 'Star', value: Math.round(1240 * multiplier), fill: '#3b82f6' },
    { name: 'Nova', value: Math.round(1108 * multiplier), fill: '#f59e0b' },
    { name: 'Aurora', value: Math.round(894 * multiplier), fill: '#ef4444' },
  ]

  // CLV by Marital Status data
  const maritalStatusData = [
    { name: 'Married', value: Math.round(1901 * multiplier), fill: '#3b82f6' },
    { name: 'Single', value: Math.round(838 * multiplier), fill: '#f59e0b' },
    { name: 'Divorced', value: Math.round(503 * multiplier), fill: '#ef4444' },
  ]

  // Flights Booked by Month and Year (Line chart)
  const flightsBookedData = [
    { month: 1, 2017: 45000, 2018: 52000 },
    { month: 2, 2017: 52000, 2018: 58000 },
    { month: 3, 2017: 48000, 2018: 61000 },
    { month: 4, 2017: 61000, 2018: 55000 },
    { month: 5, 2017: 55000, 2018: 58000 },
    { month: 6, 2017: 67000, 2018: 64000 },
    { month: 7, 2017: 72000, 2018: 68000 },
    { month: 8, 2017: 68000, 2018: 71000 },
    { month: 9, 2017: 63000, 2018: 62000 },
    { month: 10, 2017: 58000, 2018: 54000 },
    { month: 11, 2017: 52000, 2018: 49000 },
    { month: 12, 2017: 48000, 2018: 45000 },
  ]

  // CLV by Month and Year (Line chart)
  const clvByMonthData = [
    { month: 1, 2017: 2100, 2018: 2300 },
    { month: 2, 2017: 2050, 2018: 2350 },
    { month: 3, 2017: 2200, 2018: 2400 },
    { month: 4, 2017: 2250, 2018: 2200 },
    { month: 5, 2017: 2150, 2018: 2180 },
    { month: 6, 2017: 2300, 2018: 2100 },
    { month: 7, 2017: 2400, 2018: 2050 },
    { month: 8, 2017: 2350, 2018: 2120 },
    { month: 9, 2017: 2250, 2018: 2080 },
    { month: 10, 2017: 2200, 2018: 1950 },
    { month: 11, 2017: 2100, 2018: 1850 },
    { month: 12, 2017: 1950, 2018: 1720 },
  ]

  // Flights by Province data
  const flightsByProvinceData = [
    { name: 'Ontario', value: 85000 },
    { name: 'British Columbia', value: 62000 },
    { name: 'Quebec', value: 58000 },
    { name: 'Alberta', value: 35000 },
    { name: 'New Brunswick', value: 18000 },
    { name: 'Manitoba', value: 15000 },
    { name: 'Nova Scotia', value: 12000 },
    { name: 'Saskatchewan', value: 8000 },
    { name: 'Newfoundland', value: 5000 },
    { name: 'Yukon', value: 3000 },
    { name: 'Prince Edward Island', value: 2000 },
  ]

  // Dollar Points Redeemed by Province data
  const dollarPointsData = [
    { name: 'Ontario', value: 450000 },
    { name: 'British Columbia', value: 320000 },
    { name: 'Quebec', value: 280000 },
    { name: 'Alberta', value: 145000 },
    { name: 'New Brunswick', value: 78000 },
    { name: 'Manitoba', value: 65000 },
    { name: 'Nova Scotia', value: 52000 },
    { name: 'Saskatchewan', value: 38000 },
    { name: 'Newfoundland', value: 25000 },
    { name: 'Yukon', value: 12000 },
    { name: 'Prince Edward Island', value: 8000 },
  ]

  // Flights Booked Changes by Loyalty Card (Area chart)
  const flightsChangesData = [
    { month: 1, Star: 28000, Nova: 18000, Aurora: 12000 },
    { month: 2, Star: 32000, Nova: 19000, Aurora: 11000 },
    { month: 3, Star: 35000, Nova: 21000, Aurora: 13000 },
    { month: 4, Star: 30000, Nova: 19000, Aurora: 12000 },
    { month: 5, Star: 28000, Nova: 18000, Aurora: 11000 },
    { month: 6, Star: 36000, Nova: 22000, Aurora: 14000 },
    { month: 7, Star: 40000, Nova: 24000, Aurora: 15000 },
    { month: 8, Star: 38000, Nova: 23000, Aurora: 14000 },
    { month: 9, Star: 32000, Nova: 20000, Aurora: 12000 },
    { month: 10, Star: 28000, Nova: 18000, Aurora: 11000 },
    { month: 11, Star: 25000, Nova: 16000, Aurora: 10000 },
    { month: 12, Star: 22000, Nova: 14000, Aurora: 9000 },
  ]

  // CLV for Cities by Gender (Table data)
  const citiesData = [
    { city: 'Toronto', female: 314935159, male: 322782976, total: 638738135 },
    { city: 'Vancouver', female: 247729104, male: 240248220, total: 487977324 },
    { city: 'Montreal', female: 210462191, male: 205613264, total: 416081455 },
    { city: 'Winnipeg', female: 69541667, male: 60020688, total: 129481355 },
    { city: 'Whistler', female: 51879376, male: 51235794, total: 103115170 },
    { city: 'Halifax', female: 51812374, male: 49209209, total: 101021583 },
    { city: 'Ottawa', female: 45814549, male: 52720523, total: 98535072 },
    { city: 'Edmonton', female: 40777492, male: 43948943, total: 84726435 },
    { city: 'Quebec City', female: 44360857, male: 48310651, total: 92671508 },
    { city: 'Trenton', female: 44299448, male: 47891070, total: 92190518 },
    { city: 'Davison', female: 48928768, male: 37744998, total: 86673766 },
    { city: 'Creek', female: 40301311, male: 45140869, total: 85442180 },
  ]

  return (
    <section className="space-y-8">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Customer Lifetime Value</h1>
        <p className="text-slate-600 mt-1">Comprehensive CLV analysis by demographics, loyalty, and geography.</p>

        {/* Period Filter */}
        <div className="mt-4 flex items-center gap-3">
          <span className="text-sm font-medium text-slate-700">Period:</span>
          <div className="flex gap-2 flex-wrap">
            {PERIOD_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedPeriod(option.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedPeriod === option.value
                    ? 'bg-primary text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TOP 3 DONUT CHARTS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-stagger-container">
        {/* Total CLV by Education */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 animate-stagger">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Total CLV by Education</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={educationData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {educationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => `${(value / 1000).toFixed(0)}M`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Total CLV by Loyalty Card */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 animate-stagger">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Total CLV by Loyalty Card</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={loyaltyCardData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {loyaltyCardData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => `${(value / 1000).toFixed(0)}M`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Total CLV by Marital Status */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 animate-stagger">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Total CLV by Marital Status</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={maritalStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {maritalStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => `${(value / 1000).toFixed(0)}M`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TWO LINE CHARTS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Flights Booked by Month and Year */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 animate-scale-in">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Total Flights Booked by Month and Year</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={flightsBookedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                }}
                formatter={(value: any) => `${(value / 1000).toFixed(0)}k`}
              />
              <Legend />
              <Line type="monotone" dataKey="2017" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="2018" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Total CLV by Month and Year */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 animate-scale-in">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Total CLV by Month and Year</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={clvByMonthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                }}
                formatter={(value: any) => `${(value / 1000).toFixed(1)}k`}
              />
              <Legend />
              <Line type="monotone" dataKey="2017" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="2018" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TWO HORIZONTAL BAR CHARTS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Flights by Province */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 animate-scale-in">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Total Flights by Province</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={flightsByProvinceData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" stroke="#64748b" />
              <YAxis type="category" dataKey="name" stroke="#64748b" width={140} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                }}
                formatter={(value: any) => `${(value / 1000).toFixed(0)}k`}
              />
              <Bar dataKey="value" fill="#3b82f6" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Total Dollar Points Redeemed by Province */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 animate-scale-in">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Total Dollar Points Redeemed by Province</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={dollarPointsData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" stroke="#64748b" />
              <YAxis type="category" dataKey="name" stroke="#64748b" width={140} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                }}
                formatter={(value: any) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Bar dataKey="value" fill="#3b82f6" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AREA CHART */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 animate-scale-in">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Total Flights Booked Changes by Loyalty Card</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={flightsChangesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
              }}
              formatter={(value: any) => `${(value / 1000).toFixed(0)}k`}
            />
            <Legend />
            <Area type="monotone" dataKey="Star" stackId="1" fill="#3b82f6" stroke="#3b82f6" />
            <Area type="monotone" dataKey="Nova" stackId="1" fill="#f59e0b" stroke="#f59e0b" />
            <Area type="monotone" dataKey="Aurora" stackId="1" fill="#ef4444" stroke="#ef4444" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 overflow-hidden animate-scale-in">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Total CLV for Cities by Gender</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-slate-900">City</th>
                <th className="px-6 py-4 text-right font-semibold text-slate-900">Female</th>
                <th className="px-6 py-4 text-right font-semibold text-slate-900">Male</th>
                <th className="px-6 py-4 text-right font-semibold text-slate-900">Total</th>
              </tr>
            </thead>
            <tbody>
              {citiesData.map((city, idx) => (
                <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{city.city}</td>
                  <td className="px-6 py-4 text-right text-slate-700">${(city.female / 1000000).toFixed(2)}M</td>
                  <td className="px-6 py-4 text-right text-slate-700">${(city.male / 1000000).toFixed(2)}M</td>
                  <td className="px-6 py-4 text-right font-semibold text-slate-900">${(city.total / 1000000).toFixed(2)}M</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
