'use client'

import { Lead } from '@/app/types/lead'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
} from 'recharts'

interface SalesPipelineProps {
  leads: Lead[]
}

export function SalesPipeline({ leads }: SalesPipelineProps) {
  // Generate customer revenue data
  const customerRevenue = [
    { name: 'Visionary Enterprises', revenue: 21000 },
    { name: 'Swift Enterprises', revenue: 19047 },
    { name: 'United Solutions', revenue: 18121 },
    { name: 'Titan Enterprises', revenue: 17743 },
    { name: 'Fusion Systems', revenue: 16751 },
    { name: 'Alpha Corporation', revenue: 12440 },
  ]

  const productRevenue = [
    { name: 'Enterprise', avgPrice: 2552.94, quantity: 17, amount: 43400 },
    { name: 'DA Solutions', avgPrice: 3327.50, quantity: 10, amount: 33275 },
    { name: 'Business', avgPrice: 570.00, quantity: 50, amount: 28500 },
    { name: 'Standard', avgPrice: 1616.00, quantity: 15, amount: 24240 },
    { name: 'Web design', avgPrice: 2400.00, quantity: 10, amount: 24000 },
    { name: 'Alpha', avgPrice: 937.50, quantity: 20, amount: 18750 },
  ]

  const totalCustomerRevenue = customerRevenue.reduce((sum, c) => sum + c.revenue, 0)
  const totalProductRevenue = productRevenue.reduce((sum, p) => sum + p.amount, 0)
  const totalProductQuantity = productRevenue.reduce((sum, p) => sum + p.quantity, 0)
  const avgRevenuePerCustomer = Math.round(totalCustomerRevenue / customerRevenue.length)
  const numCustomers = customerRevenue.length

  // Top 10 customers chart data
  const top10Customers = customerRevenue.sort((a, b) => b.revenue - a.revenue)

  // Top 10 products chart data
  const top10Products = productRevenue.sort((a, b) => b.amount - a.amount)

  return (
    <section className="space-y-8">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Sales Pipeline</h1>
        <p className="text-slate-600 mt-1">Revenue breakdown by customers and products.</p>
      </div>

      {/* KPI CARDS (Top Section) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Num of Customers Card */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
          <p className="text-sm text-slate-600 mb-2">Num of Customers</p>
          <p className="text-4xl font-bold text-slate-900">{numCustomers}</p>
          <p className="text-xs text-slate-600 mt-2">Active customers</p>
        </div>

        {/* Total Revenue Card */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
          <p className="text-sm text-slate-600 mb-2">Total Revenue</p>
          <p className="text-4xl font-bold text-slate-900">${(totalCustomerRevenue / 1000).toFixed(0)}k</p>
          <p className="text-xs text-slate-600 mt-2">From customers</p>
        </div>

        {/* Avg Revenue Per Customer Card */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
          <p className="text-sm text-slate-600 mb-2">Avg Revenue Per Customer</p>
          <p className="text-4xl font-bold text-slate-900">${(avgRevenuePerCustomer / 1000).toFixed(1)}k</p>
          <p className="text-xs text-slate-600 mt-2">Customer value</p>
        </div>

        {/* Total Products Sold Card */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
          <p className="text-sm text-slate-600 mb-2">Num of Products Sold</p>
          <p className="text-4xl font-bold text-slate-900">{totalProductQuantity}</p>
          <p className="text-xs text-slate-600 mt-2">Total quantity</p>
        </div>
      </div>

      {/* CUSTOMER REVENUE TABLE */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Customer Revenue</h2>
          <p className="text-sm text-slate-600 mt-1">Revenue by customer</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-slate-900">Customer Name</th>
                <th className="px-6 py-4 text-right font-semibold text-slate-900">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {customerRevenue.map((customer, idx) => (
                <tr
                  key={idx}
                  className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {customer.name}
                  </td>
                  <td className="px-6 py-4 text-right text-slate-700">
                    ${customer.revenue.toLocaleString()}
                  </td>
                </tr>
              ))}
              <tr className="bg-slate-50 font-semibold border-t-2 border-slate-300">
                <td className="px-6 py-4 text-slate-900">Total</td>
                <td className="px-6 py-4 text-right text-slate-900">
                  ${totalCustomerRevenue.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* PRODUCT REVENUE TABLE */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Product Revenue</h2>
          <p className="text-sm text-slate-600 mt-1">Revenue breakdown by product</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-slate-900">Product Name</th>
                <th className="px-6 py-4 text-right font-semibold text-slate-900">Average Price</th>
                <th className="px-6 py-4 text-center font-semibold text-slate-900">Quantity</th>
                <th className="px-6 py-4 text-right font-semibold text-slate-900">Amount</th>
              </tr>
            </thead>
            <tbody>
              {productRevenue.map((product, idx) => (
                <tr
                  key={idx}
                  className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 text-right text-slate-700">
                    ${product.avgPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 text-center text-slate-700">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4 text-right text-slate-700">
                    ${product.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
              <tr className="bg-slate-50 font-semibold border-t-2 border-slate-300">
                <td className="px-6 py-4 text-slate-900">Total</td>
                <td className="px-6 py-4 text-right text-slate-900">
                  ${(productRevenue.reduce((sum, p) => sum + p.avgPrice, 0) / productRevenue.length).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="px-6 py-4 text-center font-semibold text-slate-900">
                  {totalProductQuantity}
                </td>
                <td className="px-6 py-4 text-right font-semibold text-slate-900">
                  ${totalProductRevenue.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* TOP 10 CUSTOMERS BY REVENUE CHART */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Top Customers by Revenue</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={top10Customers}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 200, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis type="number" stroke="#64748b" />
            <YAxis type="category" dataKey="name" stroke="#64748b" width={190} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
              }}
              formatter={(value: any) => `$${value.toLocaleString()}`}
            />
            <Bar dataKey="revenue" fill="#0d9488" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* TOP 10 PRODUCTS BY REVENUE CHART */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Top Products by Revenue</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={top10Products}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke="#64748b" angle={-45} textAnchor="end" height={80} />
            <YAxis stroke="#64748b" label={{ value: 'Revenue ($)', angle: -90, position: 'insideLeft' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
              }}
              formatter={(value: any) => `$${value.toLocaleString()}`}
            />
            <Bar dataKey="amount" fill="#6366f1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
