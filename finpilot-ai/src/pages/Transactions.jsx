import React, { useState } from 'react';
import { Menu, Bell, Sparkles, DollarSign, Cpu, Activity, TrendingUp, ChevronRight } from 'lucide-react';
import TransactionsTable from '../components/TransactionsTable';
import { transactionsData } from '../data/transactions';

export default function Transactions({ setIsMobileMenuOpen }) {
  const [transactions] = useState(transactionsData);
  const [notification, setNotification] = useState(null);

  // Trigger toast alert
  const showToast = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Compute brief stats for the header/overview cards
  const totalVolume = transactions.reduce((acc, curr) => acc + curr.amount, 0);
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);
  const flaggedCount = transactions.filter((t) => t.status === 'Flagged').length;

  return (
    <div className="flex-1 overflow-y-auto px-4 py-8 lg:px-8">
      {/* Toast Banner */}
      {notification && (
        <div className="fixed top-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2.5 rounded-xl border border-cardBorder bg-[#111019] px-4 py-3 shadow-2xl animate-fade-in">
          <Sparkles className="h-4.5 w-4.5 text-accentViolet" />
          <span className="text-xs font-semibold text-white">{notification}</span>
        </div>
      )}

      {/* Page Header */}
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
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-accentViolet to-accentIndigo text-white shadow-lg shadow-accentViolet/20">
                <DollarSign className="h-5 w-5" />
              </div>
              Transaction Ledger
            </h1>
            <p className="text-xs text-gray-400 mt-1.5">
              Comprehensive ledger audit with real-time ML risk-scoring and categorization.
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-3">
          {/* AI Cognitive Status badge */}
          <div className="hidden items-center gap-2 rounded-xl bg-purple-500/10 border border-purple-500/20 px-3.5 py-1.5 text-xs text-purple-400 sm:flex">
            <Cpu className="h-3.5 w-3.5 ai-pulse-glow rounded-full" />
            <span className="font-semibold tracking-wide">Telemetry: Active</span>
          </div>

          <button
            type="button"
            onClick={() => showToast("Exporting transactions log as CSV...")}
            className="flex items-center gap-2 rounded-xl border border-cardBorder bg-background px-3.5 py-2 text-xs text-gray-300 hover:text-white hover:border-accentViolet/30 transition-colors"
          >
            Export Ledger
          </button>
        </div>
      </header>

      {/* Main Ledger Content */}
      <div className="space-y-8 animate-slide-up">
        {/* Simple mini-stats banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-cardBorder bg-cardBg p-5">
            <h4 className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Total Volume Processed</h4>
            <p className="text-xl font-bold text-white mt-1.5">${totalVolume.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            <span className="text-[10px] text-gray-400 mt-1 block">Accumulated ledger entries</span>
          </div>
          <div className="rounded-2xl border border-cardBorder bg-cardBg p-5">
            <h4 className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Total Revenue Inflows</h4>
            <p className="text-xl font-bold text-emerald-400 mt-1.5">${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            <span className="text-[10px] text-emerald-500 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Healthy Stripe Settlement
            </span>
          </div>
          <div className="rounded-2xl border border-cardBorder bg-cardBg p-5">
            <h4 className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Quarantined Charges</h4>
            <p className="text-xl font-bold text-rose-400 mt-1.5">{flaggedCount} Transactions</p>
            <span className="text-[10px] text-rose-500 font-semibold mt-1 block">Awaiting immediate security audit</span>
          </div>
        </div>

        {/* Transactions Table Widget */}
        <TransactionsTable transactions={transactions} />
      </div>
    </div>
  );
}
