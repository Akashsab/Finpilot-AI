import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, AlertOctagon, HelpCircle, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';

export default function TransactionsTable({ transactions }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, income, expense, flagged
  const [expandedTxId, setExpandedTxId] = useState(null);

  // Toggle row expansion to reveal AI Insights
  const toggleRow = (id) => {
    setExpandedTxId(expandedTxId === id ? null : id);
  };

  // Filter transaction records
  const filteredTx = transactions.filter((tx) => {
    const matchesSearch = 
      tx.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterType === 'all') return matchesSearch;
    if (filterType === 'income') return matchesSearch && tx.type === 'income';
    if (filterType === 'expense') return matchesSearch && tx.type === 'expense';
    if (filterType === 'flagged') return matchesSearch && tx.status === 'Flagged';
    return matchesSearch;
  });

  // Risk scoring tags
  const getRiskBadge = (score) => {
    if (score < 15) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
          Low ({score})
        </span>
      );
    } else if (score < 50) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-400">
          Mid ({score})
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-400 animate-pulse">
          Critical ({score})
        </span>
      );
    }
  };

  // Status badges
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
            <CheckCircle2 className="h-3 w-3" />
            Completed
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1 rounded-lg bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-400">
            <HelpCircle className="h-3 w-3" />
            Pending
          </span>
        );
      case 'Flagged':
        return (
          <span className="inline-flex items-center gap-1 rounded-lg bg-rose-500/10 px-2.5 py-1 text-xs font-semibold text-rose-400">
            <AlertOctagon className="h-3 w-3" />
            Flagged
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="rounded-2xl border border-cardBorder bg-cardBg p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-white m-0">FinPilot Transaction Ledger</h3>
          <p className="text-xs text-gray-400 mt-1">
            Real-time operations cash books accompanied by granular AI telemetry.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search merchants, labels..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-cardBorder bg-background py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-500 transition-colors focus:border-accentViolet focus:outline-none"
          />
        </div>
      </div>

      {/* Tabs Filter Row */}
      <div className="flex gap-2 border-b border-cardBorder pb-4 mb-4 overflow-x-auto">
        {['all', 'income', 'expense', 'flagged'].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setFilterType(type)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all duration-200 ${
              filterType === type
                ? 'bg-accentViolet/15 text-accentViolet border border-accentViolet/20'
                : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
            }`}
          >
            {type} {type === 'flagged' && <span className="ml-1 rounded-full bg-rose-500/20 px-1.5 py-0.5 text-[9px] font-bold text-rose-400">Alerts</span>}
          </button>
        ))}
      </div>

      {/* Transaction Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-cardBorder text-[10px] font-bold uppercase tracking-wider text-gray-400">
              <th className="py-3 px-4">Merchant / Details</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">AI Risk Vector</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Amount</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cardBorder/50">
            {filteredTx.length > 0 ? (
              filteredTx.map((tx) => {
                const isExpanded = expandedTxId === tx.id;
                return (
                  <React.Fragment key={tx.id}>
                    {/* Main Row */}
                    <tr
                      onClick={() => toggleRow(tx.id)}
                      className={`group cursor-pointer transition-colors hover:bg-white/5 ${
                        isExpanded ? 'bg-white/5' : ''
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-9 w-9 items-center justify-center rounded-xl font-bold text-xs uppercase shadow-sm ${
                            tx.type === 'income' 
                              ? 'bg-emerald-500/10 text-emerald-400' 
                              : 'bg-accentIndigo/10 text-accentIndigo'
                          }`}>
                            {tx.merchant.substring(0, 2)}
                          </div>
                          <div>
                            <span className="font-semibold text-white text-sm block group-hover:text-accentViolet transition-colors">
                              {tx.merchant}
                            </span>
                            <span className="text-[11px] text-gray-500 mt-1 block">
                              {tx.date} &bull; {tx.description}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="rounded-lg bg-cardBorder px-2.5 py-1 text-xs text-gray-300 font-medium border border-cardBorder">
                          {tx.category}
                        </span>
                      </td>
                      <td className="py-4 px-4">{getRiskBadge(tx.riskScore)}</td>
                      <td className="py-4 px-4">{getStatusBadge(tx.status)}</td>
                      <td className={`py-4 px-4 text-right font-bold text-sm ${
                        tx.type === 'income' ? 'text-emerald-400' : 'text-gray-200'
                      }`}>
                        {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button type="button" className="text-gray-400 group-hover:text-white">
                          {isExpanded ? <ChevronUp className="h-4.5 w-4.5" /> : <ChevronDown className="h-4.5 w-4.5" />}
                        </button>
                      </td>
                    </tr>

                    {/* Expandable insight details drawer */}
                    {isExpanded && (
                      <tr>
                        <td colSpan="6" className="bg-[#151321]/40 px-6 py-4.5 border-l-2 border-accentViolet">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start justify-between">
                            <div className="max-w-2xl">
                              <span className="flex items-center gap-1.5 text-xs font-bold text-accentViolet uppercase tracking-wider">
                                <Sparkles className="h-4 w-4 animate-pulse" />
                                FinPilot AI Deep Analysis
                              </span>
                              <p className="mt-2 text-xs leading-relaxed text-gray-300">
                                {tx.aiInsight}
                              </p>
                            </div>
                            
                            {tx.status === 'Flagged' && (
                              <div className="flex h-fit items-center gap-2 rounded-xl bg-rose-500/10 border border-rose-500/20 p-3.5 text-rose-400">
                                <ShieldAlert className="h-5 w-5 flex-shrink-0 animate-bounce" />
                                <div className="text-xs">
                                  <span className="font-bold uppercase tracking-wider block">Security Quarantine</span>
                                  <span className="opacity-90 block mt-0.5">Card usage blocked pending promoter confirm response.</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="py-12 text-center text-gray-500 text-xs font-semibold">
                  No matching transaction records discovered.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
