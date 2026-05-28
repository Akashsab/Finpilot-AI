import React, { useState } from 'react';
import { Menu, Bell, Search, Sparkles, ChevronRight, TrendingUp, Cpu, Info, ShieldAlert, CheckCircle2 } from 'lucide-react';
import StatsGrid from '../components/StatsGrid';
import ChartsSection from '../components/ChartsSection';
import TransactionsTable from '../components/TransactionsTable';
import { transactionsData, mockInsights } from '../data/transactions';

export default function Dashboard({ isMobileMenuOpen, setIsMobileMenuOpen, activeTab }) {
  // Global dashboard states
  const [balance, setBalance] = useState(124350.00);
  const [expenses, setExpenses] = useState(8340.50);
  const [transactions, setTransactions] = useState(transactionsData);
  const [insights, setInsights] = useState(mockInsights);
  const [activeAlerts, setActiveAlerts] = useState(
    transactionsData.filter((t) => t.status === 'Flagged')
  );
  
  // Notification toast state
  const [notification, setNotification] = useState(null);

  // Trigger toast alert
  const showToast = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Resolve Fraud Alert
  const handleResolveAlert = (id, action) => {
    const alertTx = transactions.find((t) => t.id === id);
    if (!alertTx) return;

    if (action === 'allow') {
      // User says transaction is safe
      setTransactions(prev =>
        prev.map(t => (t.id === id ? { ...t, status: 'Completed', riskScore: 5 } : t))
      );
      showToast(`Transaction approved as Safe. Whitelisted merchant: ${alertTx.merchant}`, 'success');
    } else {
      // User declines charge (marks as fraud/blocked)
      setTransactions(prev =>
        prev.map(t => (t.id === id ? { ...t, status: 'Flagged', description: `${t.description} (BLOCKED)` } : t))
      );
      // Revert expense amount since transaction is blocked!
      if (alertTx.type === 'expense') {
        setBalance(prev => prev + alertTx.amount);
        setExpenses(prev => Math.max(0, prev - alertTx.amount));
      }
      showToast(`Card credential locked. Rejected charge of $${alertTx.amount} at ${alertTx.merchant}.`, 'error');
    }

    // Decrement alerts
    setActiveAlerts(prev => prev.filter(a => a.id !== id));
  };

  // Perform Insight Action
  const handleClaimInsight = (id, title) => {
    showToast(`AI Insight Activated: "${title}" applied successfully!`, 'success');
    setInsights(prev => prev.filter(ins => ins.id !== id));
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-8 lg:px-8">
      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed top-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2.5 rounded-xl border border-cardBorder bg-[#111019] px-4 py-3 shadow-2xl animate-fade-in">
          {notification.type === 'success' && <CheckCircle2 className="h-4.5 w-4.5 text-accentEmerald" />}
          {notification.type === 'error' && <ShieldAlert className="h-4.5 w-4.5 text-accentRose" />}
          {notification.type === 'info' && <Info className="h-4.5 w-4.5 text-accentCyan" />}
          <span className="text-xs font-semibold text-white">{notification.message}</span>
        </div>
      )}

      {/* 1. Header Navigation Bar */}
      <header className="flex items-center justify-between border-b border-cardBorder pb-6 mb-8">
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
            <h1 className="text-2xl font-bold tracking-tight text-white m-0">
              {activeTab === 'Dashboard' ? 'Operations Overview' : activeTab}
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              May 25, 2026 &bull; Real-time AI fiscal monitoring
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-4">
          {/* AI Cognitive Status badge */}
          <div className="hidden items-center gap-2 rounded-xl bg-purple-500/10 border border-purple-500/20 px-3.5 py-1.5 text-xs text-purple-400 sm:flex">
            <Cpu className="h-3.5 w-3.5 ai-pulse-glow rounded-full" />
            <span className="font-semibold tracking-wide">FinPilot AI: Auditing</span>
          </div>

          {/* Quick notification trigger */}
          <button
            type="button"
            onClick={() => showToast("FinPilot completed automated reconciliation: 11 invoices settled.", "info")}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-cardBorder text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-accentViolet animate-pulse-slow" />
          </button>
        </div>
      </header>

      {/* 2. Main Dashboard Widgets Grid */}
      <div className="space-y-8 animate-slide-up">
        {/* Metric Cards Row */}
        <StatsGrid 
          balance={balance} 
          expenses={expenses} 
          alerts={activeAlerts} 
          handleResolveAlert={handleResolveAlert}
        />

        {/* Charts & Interactive Transaction Ledger Table */}
        <div className="grid gap-8 xl:grid-cols-3">
          {/* Left Large Column (Charts + Table) */}
          <div className="xl:col-span-2 space-y-8">
            <ChartsSection />
            <TransactionsTable transactions={transactions} />
          </div>

          {/* Right Smaller Sidebar Column (AI Insights panel) */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-cardBorder bg-cardBg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white m-0">FinPilot Recommendations</h3>
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-accentViolet/10 text-accentViolet">
                  <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                </span>
              </div>
              
              <p className="text-xs text-gray-400 leading-normal mb-5">
                Automated ML suggestions derived from anomalous spending indicators and vendor terms.
              </p>

              {/* Recommendation List */}
              <div className="space-y-4">
                {insights.length > 0 ? (
                  insights.map((ins) => (
                    <div 
                      key={ins.id}
                      className={`rounded-xl border p-4.5 transition-all duration-200 hover:bg-white/5 ${
                        ins.type === 'warning' 
                          ? 'border-rose-500/20 bg-rose-500/5' 
                          : ins.type === 'success'
                          ? 'border-emerald-500/20 bg-emerald-500/5'
                          : 'border-accentCyan/20 bg-accentCyan/5'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 rounded-lg p-1.5 ${
                          ins.type === 'warning'
                            ? 'bg-rose-500/10 text-rose-400'
                            : ins.type === 'success'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-accentCyan/10 text-accentCyan'
                        }`}>
                          <Sparkles className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">{ins.title}</h4>
                          <p className="mt-1 text-[11px] text-gray-300 leading-relaxed">
                            {ins.description}
                          </p>
                          <button
                            type="button"
                            onClick={() => handleClaimInsight(ins.id, ins.title)}
                            className="mt-3.5 flex items-center gap-1 text-[10px] font-bold text-white uppercase tracking-wider hover:text-accentViolet transition-colors group"
                          >
                            <span>{ins.actionText}</span>
                            <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border border-dashed border-cardBorder py-8 text-center text-xs text-gray-500 font-semibold">
                    No new recommendations available.
                  </div>
                )}
              </div>
            </div>

            {/* Smart Risk Analysis Summary */}
            <div className="rounded-2xl border border-cardBorder bg-cardBg p-6 relative overflow-hidden bg-gradient-to-br from-cardBg via-cardBg to-accentIndigo/10">
              <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-10">
                <Sparkles className="h-36 w-36 text-accentIndigo" />
              </div>
              
              <h3 className="text-xs font-bold text-white uppercase tracking-widest">Cognitive Threat Ledger</h3>
              
              <div className="mt-4 space-y-3 text-xs leading-normal">
                <div className="flex justify-between border-b border-cardBorder/40 pb-2">
                  <span className="text-gray-400">Model Precision</span>
                  <span className="font-semibold text-emerald-400">99.84% (F1-score)</span>
                </div>
                <div className="flex justify-between border-b border-cardBorder/40 pb-2">
                  <span className="text-gray-400">Last Core Audit</span>
                  <span className="font-semibold text-gray-200">10 mins ago</span>
                </div>
                <div className="flex justify-between border-b border-cardBorder/40 pb-2">
                  <span className="text-gray-400">Active Rule Policies</span>
                  <span className="font-semibold text-gray-200">42 standard guards</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Integrations</span>
                  <span className="font-semibold text-accentViolet">Stripe & Plaid bound</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
