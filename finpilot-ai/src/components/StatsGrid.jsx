import React from 'react';
import { DollarSign, ShieldCheck, AlertOctagon, TrendingUp, TrendingDown, Calendar, Wallet } from 'lucide-react';

export default function StatsGrid({ 
  balance, 
  expenses, 
  alerts, 
  handleResolveAlert, 
  riskScore = 22 
}) {
  
  // Calculate SVG stroke for AI Risk Dial
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (riskScore / 100) * circumference;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {/* 1. Total Balance Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accentViolet via-indigo-600 to-accentIndigo p-6 text-white shadow-xl shadow-accentViolet/10 transition-transform duration-300 hover:-translate-y-1">
        {/* Glow effect */}
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-100">Total Balance</span>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-md">
            <Wallet className="h-4.5 w-4.5" />
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-3xl font-bold tracking-tight text-white m-0">
            ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-purple-100">
            <TrendingUp className="h-3.5 w-3.5" />
            <span className="font-semibold">+14.2%</span>
            <span className="opacity-85">vs last month</span>
          </div>
        </div>

        {/* Sparkline Visual SVG */}
        <div className="mt-4 h-10 w-full opacity-80">
          <svg className="h-full w-full" viewBox="0 0 100 20" preserveAspectRatio="none">
            <defs>
              <linearGradient id="sparklineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="white" stopOpacity="0.4" />
                <stop offset="100%" stopColor="white" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M0,15 Q15,5 30,12 T60,3 T80,14 T100,5"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M0,15 Q15,5 30,12 T60,3 T80,14 T100,5 L100,20 L0,20 Z"
              fill="url(#sparklineGrad)"
            />
          </svg>
        </div>
      </div>

      {/* 2. Monthly Expenses Card */}
      <div className="rounded-2xl border border-cardBorder bg-cardBg p-6 transition-transform duration-300 hover:-translate-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Monthly Expense</span>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-accentViolet">
            <Calendar className="h-4.5 w-4.5" />
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-3xl font-bold tracking-tight text-white m-0">
            ${expenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
            <span className="text-accentViolet font-semibold">55.6%</span>
            <span>of monthly budget spent</span>
          </div>
        </div>

        {/* Custom Progress Bar */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1.5">
            <span>Budget Limit</span>
            <span className="font-semibold text-gray-300">$15,000.00</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
            <div className="h-full rounded-full bg-gradient-to-r from-accentViolet to-accentIndigo" style={{ width: '55.6%' }} />
          </div>
        </div>
      </div>

      {/* 3. AI Risk Score Card */}
      <div className="rounded-2xl border border-cardBorder bg-cardBg p-6 transition-transform duration-300 hover:-translate-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">AI Risk Rating</span>
          <span className="rounded-lg bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
            STABLE
          </span>
        </div>

        <div className="mt-3 flex items-center gap-4">
          {/* Custom SVG Dial Gauge */}
          <div className="relative flex h-16 w-16 items-center justify-center">
            <svg className="h-full w-full rotate-[-90deg]">
              <circle
                cx="32"
                cy="32"
                r={radius}
                className="stroke-white/5"
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="32"
                cy="32"
                r={radius}
                className="stroke-accentViolet"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-sm font-bold text-white">{riskScore}%</span>
          </div>

          <div>
            <span className="text-xs font-bold text-white uppercase tracking-tight block">Low Exposure</span>
            <p className="text-[11px] text-gray-400 leading-normal mt-0.5">
              Portfolio optimized. Minor interest rate volatility hedged.
            </p>
          </div>
        </div>

        <div className="mt-4 border-t border-cardBorder pt-3 text-[10px] text-accentViolet font-semibold flex items-center gap-1">
          <span>⚡ FinPilot Insight: Cash buffer is highly optimal</span>
        </div>
      </div>

      {/* 4. Fraud Alert Card - Dynamic Colors! */}
      {alerts.length > 0 ? (
        <div className="relative overflow-hidden rounded-2xl border border-accentRose/30 bg-gradient-to-b from-cardBg to-accentRose/5 p-6 shadow-lg shadow-accentRose/5 transition-transform duration-300 hover:-translate-y-1">
          {/* Flashing border animation effect */}
          <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-accentRose animate-ping" />
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-accentRose">AI Fraud Threat</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accentRose/15 text-accentRose">
              <AlertOctagon className="h-4.5 w-4.5" />
            </div>
          </div>

          <div className="mt-3">
            <h3 className="text-base font-bold text-white m-0">
              {alerts.length} Suspicious {alerts.length === 1 ? 'Alert' : 'Alerts'}
            </h3>
            <p className="mt-1 text-[11px] text-gray-300 leading-snug line-clamp-2">
              {alerts[0].merchant}: {alerts[0].description}
            </p>
          </div>

          {/* Action buttons */}
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => handleResolveAlert(alerts[0].id, 'approve')}
              className="flex-1 rounded-lg bg-white/10 py-1.5 text-center text-xs font-semibold text-white transition-colors hover:bg-white/15"
            >
              Decline (Block)
            </button>
            <button
              type="button"
              onClick={() => handleResolveAlert(alerts[0].id, 'allow')}
              className="flex-1 rounded-lg bg-accentRose py-1.5 text-center text-xs font-semibold text-white transition-colors hover:bg-accentRose-600 shadow-md shadow-accentRose/20"
            >
              Approve (Safe)
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-accentEmerald/20 bg-gradient-to-b from-cardBg to-accentEmerald/5 p-6 transition-transform duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-accentEmerald">Security Status</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accentEmerald/15 text-accentEmerald">
              <ShieldCheck className="h-4.5 w-4.5" />
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-base font-bold text-white m-0">All Assets Secured</h3>
            <p className="mt-1.5 text-[11px] text-gray-400 leading-snug">
              FinPilot verified no suspicious external transfers or unrecognized charges within the current cycle.
            </p>
          </div>

          <div className="mt-4 flex items-center gap-1.5 text-[10px] text-accentEmerald font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-accentEmerald" />
            <span>Real-time fraud guard active</span>
          </div>
        </div>
      )}
    </div>
  );
}
