import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Percent, ArrowUpRight, BarChart2 } from 'lucide-react';

const cashFlowData = [
  { month: 'Dec', Income: 8400, Expense: 4200 },
  { month: 'Jan', Income: 9200, Expense: 5100 },
  { month: 'Feb', Income: 11000, Expense: 6400 },
  { month: 'Mar', Income: 10500, Expense: 6100 },
  { month: 'Apr', Income: 13200, Expense: 7200 },
  { month: 'May', Income: 15400, Expense: 8650 },
];

const allocationData = [
  { name: 'Revenue Intake', value: 45, color: '#a855f7' }, // Violet
  { name: 'Cloud Infrastructure', value: 25, color: '#6366f1' }, // Indigo
  { name: 'SaaS Tooling', value: 20, color: '#06b6d4' }, // Cyan
  { name: 'Ad campaigns', value: 10, color: '#10b981' } // Emerald
];

// Custom Tooltip Component for Area Chart
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-cardBorder bg-[#111019] p-3 shadow-xl backdrop-blur-md">
        <p className="text-xs font-semibold text-gray-400 mb-1.5">{label} 2026</p>
        {payload.map((item, index) => (
          <div key={index} className="flex items-center gap-2 mt-1">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-xs text-gray-300 font-medium">
              {item.name}: <span className="font-bold text-white">${item.value.toLocaleString()}</span>
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ChartsSection() {
  const [activeSegment, setActiveSegment] = useState(null);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* 1. Cash Flow Area Chart */}
      <div className="rounded-2xl border border-cardBorder bg-cardBg p-6 lg:col-span-2">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-base font-bold text-white m-0">Inflow vs. Outflow Trend</h3>
            <p className="text-xs text-gray-400 mt-1">Analytics demonstrating monthly cash variance balances.</p>
          </div>
          
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-accentViolet bg-accentViolet/10 px-2.5 py-1 rounded-lg">
              <span className="h-2 w-2 rounded-full bg-accentViolet" />
              Inflow
            </span>
            <span className="flex items-center gap-1.5 text-accentIndigo bg-accentIndigo/10 px-2.5 py-1 rounded-lg">
              <span className="h-2 w-2 rounded-full bg-accentIndigo" />
              Outflow
            </span>
          </div>
        </div>

        {/* Recharts Area Chart container */}
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={cashFlowData}
              margin={{ top: 10, right: 5, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#211f30" vertical={false} />
              <XAxis 
                dataKey="month" 
                stroke="#6b7280" 
                fontSize={11} 
                tickLine={false}
                axisLine={false} 
                dy={10}
              />
              <YAxis 
                stroke="#6b7280" 
                fontSize={11} 
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `$${val}`}
                dx={-10}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#211f30', strokeWidth: 1.5 }} />
              <Area
                type="monotone"
                dataKey="Income"
                name="Inflow"
                stroke="#a855f7"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#incomeGrad)"
              />
              <Area
                type="monotone"
                dataKey="Expense"
                name="Outflow"
                stroke="#6366f1"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#expenseGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Asset Allocation Donut Chart */}
      <div className="rounded-2xl border border-cardBorder bg-cardBg p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white m-0">Capital Allocation</h3>
            <Percent className="h-4.5 w-4.5 text-accentCyan" />
          </div>
          <p className="text-xs text-gray-400 leading-normal mb-4">
            AI category breakdown of active outbound capital pools.
          </p>
        </div>

        {/* Pie Chart display */}
        <div className="relative flex h-48 items-center justify-center my-3">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={allocationData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
                onMouseEnter={(_, index) => setActiveSegment(index)}
                onMouseLeave={() => setActiveSegment(null)}
              >
                {allocationData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    opacity={activeSegment === null || activeSegment === index ? 1 : 0.4}
                    style={{ outline: 'none', transition: 'all 0.2s ease' }}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">
              {activeSegment !== null ? allocationData[activeSegment].name : 'Aggregate'}
            </span>
            <span className="text-2xl font-bold text-white mt-0.5">
              {activeSegment !== null ? `${allocationData[activeSegment].value}%` : '100%'}
            </span>
          </div>
        </div>

        {/* Custom Rich Legend */}
        <div className="space-y-2 mt-4">
          {allocationData.map((item, index) => (
            <div 
              key={item.name} 
              className={`flex items-center justify-between p-1.5 rounded-lg transition-all duration-200 ${
                activeSegment === index ? 'bg-white/5 scale-[1.02]' : ''
              }`}
              onMouseEnter={() => setActiveSegment(index)}
              onMouseLeave={() => setActiveSegment(null)}
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-gray-300 font-medium">{item.name}</span>
              </div>
              <span className="text-xs font-bold text-white">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
