import React, { useState } from 'react';
import {
  ShieldAlert, ShieldCheck, ShieldX, AlertTriangle, TrendingUp, TrendingDown, Minus,
  Search, Filter, ChevronDown, ChevronRight, Eye, Ban, CheckCircle2, X, Sparkles,
  Cpu, Brain, Zap, Activity, Lock, Unlock, Info, Menu
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, Legend, PieChart, Pie, Cell
} from 'recharts';
import { suspiciousTransactions, fraudAlertCards, monthlyFraudData } from '../data/fraudData';

/* ─────────────── Risk badge helper ─────────────── */
function RiskBadge({ level, score }) {
  const map = {
    Critical: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    High:     'bg-amber-500/15 text-amber-400 border-amber-500/30',
    Medium:   'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
    Low:      'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase ${map[level] || map.Low}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${
        level === 'Critical' ? 'bg-rose-400 animate-pulse' :
        level === 'High' ? 'bg-amber-400' :
        level === 'Medium' ? 'bg-yellow-400' : 'bg-emerald-400'
      }`} />
      {level} · {score}
    </span>
  );
}

/* ─────────────── Status badge helper ─────────────── */
function StatusBadge({ status }) {
  const map = {
    Flagged:        'bg-rose-500/10 text-rose-400 border-rose-500/20',
    'Under Review': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Resolved:       'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  };
  const icons = {
    Flagged:        <ShieldX className="h-3 w-3" />,
    'Under Review': <Eye className="h-3 w-3" />,
    Resolved:       <ShieldCheck className="h-3 w-3" />,
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-semibold ${map[status] || ''}`}>
      {icons[status]}
      {status}
    </span>
  );
}

/* ─────────────── Custom chart tooltip ─────────────── */
function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-cardBorder bg-[#111019] px-4 py-3 shadow-xl">
      <p className="text-xs font-bold text-white mb-2">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-[11px] text-gray-300 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
          {p.name}: <span className="font-semibold text-white">{p.value}</span>
        </p>
      ))}
    </div>
  );
}

/* ─────────────── Pie chart data ─────────────── */
const riskDistribution = [
  { name: 'Critical', value: 3, color: '#f43f5e' },
  { name: 'High', value: 2, color: '#f59e0b' },
  { name: 'Medium', value: 3, color: '#eab308' },
  { name: 'Low', value: 2, color: '#10b981' },
];

/* ════════════════════════════════════════════════════
   MAIN FRAUD PAGE COMPONENT
   ════════════════════════════════════════════════════ */
export default function Fraud({ setIsMobileMenuOpen }) {
  const [selectedTx, setSelectedTx] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState('All');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  /* Filtering logic */
  const filtered = suspiciousTransactions.filter((tx) => {
    const matchesSearch =
      tx.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterLevel === 'All' || tx.riskLevel === filterLevel;
    return matchesSearch && matchesFilter;
  });

  const alertColorMap = {
    rose:    { bg: 'from-rose-500/15 to-rose-500/5',   border: 'border-rose-500/20',   text: 'text-rose-400',    icon: <ShieldX className="h-5 w-5" /> },
    amber:   { bg: 'from-amber-500/15 to-amber-500/5', border: 'border-amber-500/20',  text: 'text-amber-400',   icon: <Ban className="h-5 w-5" /> },
    emerald: { bg: 'from-emerald-500/15 to-emerald-500/5', border: 'border-emerald-500/20', text: 'text-emerald-400', icon: <ShieldCheck className="h-5 w-5" /> },
    violet:  { bg: 'from-accentViolet/15 to-accentIndigo/5', border: 'border-accentViolet/20', text: 'text-accentViolet', icon: <Eye className="h-5 w-5" /> },
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-8 lg:px-8 animate-fade-in">

      {/* ── PAGE HEADER ── */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-cardBorder pb-6 mb-8 gap-4">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger icon */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-cardBorder text-gray-400 hover:text-white lg:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white m-0 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white shadow-lg shadow-rose-500/20">
                <ShieldAlert className="h-5 w-5" />
              </div>
              Fraud Detection
            </h1>
            <p className="text-xs text-gray-400 mt-1.5">
              Real-time AI threat intelligence &bull; FinPilot Neural Guard
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-xl bg-rose-500/10 border border-rose-500/20 px-3.5 py-1.5 text-xs text-rose-400 sm:flex">
            <Activity className="h-3.5 w-3.5 animate-pulse" />
            <span className="font-semibold tracking-wide">3 Active Threats</span>
          </div>
          <div className="hidden items-center gap-2 rounded-xl bg-purple-500/10 border border-purple-500/20 px-3.5 py-1.5 text-xs text-purple-400 sm:flex">
            <Cpu className="h-3.5 w-3.5 ai-pulse-glow rounded-full" />
            <span className="font-semibold tracking-wide">Neural Guard: Active</span>
          </div>
        </div>
      </header>

      <div className="space-y-8 animate-slide-up">

        {/* ═══════════════ 1. RED ALERT CARDS ═══════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {fraudAlertCards.map((card) => {
            const style = alertColorMap[card.color] || alertColorMap.violet;
            return (
              <div
                key={card.id}
                className={`relative overflow-hidden rounded-2xl border ${style.border} bg-gradient-to-br ${style.bg} p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group`}
              >
                {/* Background decorative icon */}
                <div className="absolute -right-3 -bottom-3 opacity-[0.06] group-hover:opacity-[0.1] transition-opacity">
                  <ShieldAlert className="h-24 w-24" />
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ${style.text}`}>
                    {style.icon}
                  </div>
                  <span className={`text-[10px] font-semibold ${
                    card.trendDirection === 'up' ? 'text-rose-400' : 'text-emerald-400'
                  } flex items-center gap-1`}>
                    {card.trendDirection === 'up' ? <TrendingUp className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                    {card.trend}
                  </span>
                </div>

                <h3 className="text-xs text-gray-400 font-medium uppercase tracking-wider">{card.title}</h3>
                <p className={`text-2xl font-bold mt-1 ${style.text}`}>{card.value}</p>
                <p className="text-[11px] text-gray-500 mt-1">{card.subtitle}</p>
              </div>
            );
          })}
        </div>

        {/* ═══════════════ 2. CHARTS ROW ═══════════════ */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* 2a. Fraud Trends Area Chart */}
          <div className="xl:col-span-2 rounded-2xl border border-cardBorder bg-cardBg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-white m-0">Fraud Analytics</h3>
                <p className="text-[11px] text-gray-500 mt-0.5">12-month trend — flagged, blocked &amp; false positives</p>
              </div>
              <div className="flex items-center gap-2 text-[10px]">
                <span className="flex items-center gap-1 text-rose-400"><span className="h-2 w-2 rounded-full bg-rose-400" />Flagged</span>
                <span className="flex items-center gap-1 text-accentViolet"><span className="h-2 w-2 rounded-full bg-accentViolet" />Blocked</span>
                <span className="flex items-center gap-1 text-gray-400"><span className="h-2 w-2 rounded-full bg-gray-400" />False +</span>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={monthlyFraudData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradFlagged" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradBlocked" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#211f30" />
                <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="flagged" stroke="#f43f5e" strokeWidth={2} fill="url(#gradFlagged)" name="Flagged" />
                <Area type="monotone" dataKey="blocked" stroke="#a855f7" strokeWidth={2} fill="url(#gradBlocked)" name="Blocked" />
                <Area type="monotone" dataKey="falsePositives" stroke="#6b7280" strokeWidth={1.5} fill="transparent" name="False Positives" strokeDasharray="4 4" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* 2b. Risk Distribution Pie */}
          <div className="rounded-2xl border border-cardBorder bg-cardBg p-6">
            <h3 className="text-base font-bold text-white m-0 mb-1">Risk Distribution</h3>
            <p className="text-[11px] text-gray-500 mb-4">Current transaction risk breakdown</p>

            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {riskDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            <div className="grid grid-cols-2 gap-2 mt-4">
              {riskDistribution.map((r) => (
                <div key={r.name} className="flex items-center gap-2 text-[11px]">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: r.color }} />
                  <span className="text-gray-400">{r.name}</span>
                  <span className="ml-auto font-bold text-white">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════ 3. SUSPICIOUS TRANSACTION TABLE ═══════════════ */}
        <div className="rounded-2xl border border-cardBorder bg-cardBg overflow-hidden">
          {/* Table header bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-b border-cardBorder">
            <div>
              <h3 className="text-base font-bold text-white m-0">Suspicious Transactions</h3>
              <p className="text-[11px] text-gray-500 mt-0.5">{filtered.length} flagged events — click a row for AI analysis</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search merchant…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-xl border border-cardBorder bg-background pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 outline-none focus:border-accentViolet/50 focus:ring-1 focus:ring-accentViolet/20 transition-all w-48"
                />
              </div>
              {/* Filter dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  className="flex items-center gap-2 rounded-xl border border-cardBorder bg-background px-3.5 py-2 text-xs text-gray-300 hover:text-white hover:border-accentViolet/30 transition-colors"
                >
                  <Filter className="h-3.5 w-3.5" />
                  {filterLevel}
                  <ChevronDown className="h-3 w-3" />
                </button>
                {showFilterMenu && (
                  <div className="absolute right-0 top-full mt-1 z-20 rounded-xl border border-cardBorder bg-[#111019] shadow-2xl py-1 min-w-[120px]">
                    {['All', 'Critical', 'High', 'Medium', 'Low'].map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => { setFilterLevel(lvl); setShowFilterMenu(false); }}
                        className={`w-full text-left px-4 py-2 text-xs hover:bg-white/5 transition-colors ${
                          filterLevel === lvl ? 'text-accentViolet font-semibold' : 'text-gray-300'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-cardBorder text-[10px] text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-3.5 font-semibold">Date</th>
                  <th className="px-6 py-3.5 font-semibold">Merchant</th>
                  <th className="px-6 py-3.5 font-semibold hidden md:table-cell">Description</th>
                  <th className="px-6 py-3.5 font-semibold text-right">Amount</th>
                  <th className="px-6 py-3.5 font-semibold">Risk</th>
                  <th className="px-6 py-3.5 font-semibold">Status</th>
                  <th className="px-6 py-3.5 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cardBorder/50">
                {filtered.map((tx) => (
                  <tr
                    key={tx.id}
                    onClick={() => setSelectedTx(selectedTx?.id === tx.id ? null : tx)}
                    className={`cursor-pointer transition-all duration-200 hover:bg-white/[0.03] ${
                      selectedTx?.id === tx.id ? 'bg-accentViolet/[0.05]' : ''
                    }`}
                  >
                    <td className="px-6 py-4 text-xs text-gray-300 whitespace-nowrap">{tx.date}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-semibold text-white">{tx.merchant}</span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400 hidden md:table-cell max-w-[200px] truncate">{tx.description}</td>
                    <td className="px-6 py-4 text-xs font-bold text-white text-right whitespace-nowrap">
                      {tx.amount > 0 ? `$${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '—'}
                    </td>
                    <td className="px-6 py-4"><RiskBadge level={tx.riskLevel} score={tx.riskScore} /></td>
                    <td className="px-6 py-4"><StatusBadge status={tx.status} /></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedTx(tx); }}
                          className="flex h-7 w-7 items-center justify-center rounded-lg border border-cardBorder text-gray-400 hover:text-accentCyan hover:border-accentCyan/30 transition-colors"
                          title="Inspect"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        {tx.status !== 'Resolved' && (
                          <>
                            <button
                              onClick={(e) => e.stopPropagation()}
                              className="flex h-7 w-7 items-center justify-center rounded-lg border border-cardBorder text-gray-400 hover:text-emerald-400 hover:border-emerald-400/30 transition-colors"
                              title="Allow"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={(e) => e.stopPropagation()}
                              className="flex h-7 w-7 items-center justify-center rounded-lg border border-cardBorder text-gray-400 hover:text-rose-400 hover:border-rose-400/30 transition-colors"
                              title="Block"
                            >
                              <Ban className="h-3.5 w-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-xs text-gray-500">
                      No suspicious transactions matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ═══════════════ 4. AI EXPLANATION PANEL ═══════════════ */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* 4a. Selected transaction AI analysis */}
          <div className="xl:col-span-2 rounded-2xl border border-cardBorder bg-cardBg p-6 relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 opacity-[0.04]">
              <Brain className="h-48 w-48 text-accentViolet" />
            </div>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-accentViolet to-accentIndigo text-white">
                <Sparkles className="h-4.5 w-4.5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white m-0">AI Threat Analysis</h3>
                <p className="text-[11px] text-gray-500 mt-0.5">FinPilot Neural Guard deep-inspection report</p>
              </div>
            </div>

            {selectedTx ? (
              <div className="space-y-4 relative z-10">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <RiskBadge level={selectedTx.riskLevel} score={selectedTx.riskScore} />
                  <StatusBadge status={selectedTx.status} />
                  <span className="text-[11px] text-gray-500">{selectedTx.date}</span>
                </div>

                <div className="rounded-xl border border-cardBorder bg-background p-4">
                  <h4 className="text-sm font-bold text-white mb-1">{selectedTx.merchant}</h4>
                  <p className="text-xs text-gray-400">{selectedTx.description}</p>
                  {selectedTx.amount > 0 && (
                    <p className="text-lg font-bold text-rose-400 mt-2">${selectedTx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                  )}
                </div>

                <div className="rounded-xl border border-accentViolet/20 bg-accentViolet/[0.04] p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-4 w-4 text-accentViolet" />
                    <span className="text-[11px] font-bold text-accentViolet uppercase tracking-wider">AI Explanation</span>
                  </div>
                  <p className="text-sm text-gray-200 leading-relaxed">{selectedTx.aiExplanation}</p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button className="flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-2.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-colors">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Mark Safe
                  </button>
                  <button className="flex items-center gap-2 rounded-xl bg-rose-500/10 border border-rose-500/20 px-4 py-2.5 text-xs font-semibold text-rose-400 hover:bg-rose-500/20 transition-colors">
                    <Ban className="h-3.5 w-3.5" /> Block &amp; Freeze
                  </button>
                  <button className="flex items-center gap-2 rounded-xl bg-white/5 border border-cardBorder px-4 py-2.5 text-xs font-semibold text-gray-300 hover:bg-white/10 transition-colors">
                    <Lock className="h-3.5 w-3.5" /> Freeze Card
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center relative z-10">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-cardBorder mb-4">
                  <Eye className="h-7 w-7 text-gray-500" />
                </div>
                <p className="text-sm text-gray-400 font-medium">Select a transaction to inspect</p>
                <p className="text-[11px] text-gray-500 mt-1">Click any row in the table above to see full AI analysis</p>
              </div>
            )}
          </div>

          {/* 4b. Neural Guard status panel */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-cardBorder bg-cardBg p-6 relative overflow-hidden bg-gradient-to-br from-cardBg via-cardBg to-rose-500/[0.06]">
              <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-10">
                <ShieldAlert className="h-36 w-36 text-rose-500" />
              </div>

              <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Neural Guard Status</h3>

              <div className="space-y-3 text-xs leading-normal relative z-10">
                <div className="flex justify-between border-b border-cardBorder/40 pb-2">
                  <span className="text-gray-400">Detection Model</span>
                  <span className="font-semibold text-emerald-400">v4.2 · Active</span>
                </div>
                <div className="flex justify-between border-b border-cardBorder/40 pb-2">
                  <span className="text-gray-400">F1 Precision</span>
                  <span className="font-semibold text-emerald-400">99.84%</span>
                </div>
                <div className="flex justify-between border-b border-cardBorder/40 pb-2">
                  <span className="text-gray-400">Last Scan</span>
                  <span className="font-semibold text-gray-200">2 mins ago</span>
                </div>
                <div className="flex justify-between border-b border-cardBorder/40 pb-2">
                  <span className="text-gray-400">Rules Active</span>
                  <span className="font-semibold text-gray-200">42 policies</span>
                </div>
                <div className="flex justify-between border-b border-cardBorder/40 pb-2">
                  <span className="text-gray-400">AML Compliance</span>
                  <span className="font-semibold text-accentViolet">FATF-aligned</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Integrations</span>
                  <span className="font-semibold text-accentViolet">Stripe · Plaid · Chainalysis</span>
                </div>
              </div>
            </div>

            {/* Quick actions panel */}
            <div className="rounded-2xl border border-cardBorder bg-cardBg p-6">
              <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Quick Actions</h3>
              <div className="space-y-2.5">
                {[
                  { icon: Lock, label: 'Freeze All Cards', color: 'text-rose-400 hover:bg-rose-500/10' },
                  { icon: Zap, label: 'Run Full Scan', color: 'text-amber-400 hover:bg-amber-500/10' },
                  { icon: Activity, label: 'Export Report', color: 'text-accentCyan hover:bg-accentCyan/10' },
                  { icon: Info, label: 'View All Rules', color: 'text-gray-300 hover:bg-white/5' },
                ].map(({ icon: Icon, label, color }) => (
                  <button
                    key={label}
                    className={`flex w-full items-center gap-3 rounded-xl border border-cardBorder px-4 py-3 text-xs font-medium transition-colors ${color}`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                    <ChevronRight className="h-3 w-3 ml-auto opacity-40" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
