import React, { useState } from "react";
import { Menu, Sparkles, Brain, Cpu } from "lucide-react";
import { mockInsights } from "../data/transactions";
import InsightTimeline from "../components/InsightTimeline";

export default function Insights({ setIsMobileMenuOpen }) {
  const [filter, setFilter] = useState("all");

  const filteredInsights =
    filter === "all"
      ? mockInsights
      : mockInsights.filter((ins) => ins.type === filter);

  const types = [
    { key: "all", label: "All Insights" },
    { key: "warning", label: "Warnings" },
    { key: "info", label: "Info" },
    { key: "success", label: "Success" },
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 py-8 lg:px-8">
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
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-accentViolet to-accentIndigo text-white shadow-lg shadow-accentViolet/25">
                <Brain className="h-5 w-5" />
              </div>
              AI Insights Ledger
            </h1>
            <p className="text-xs text-gray-400 mt-1.5">
              Automated cognitive recommendations and real-time ledger audits.
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-xl bg-purple-500/10 border border-purple-500/20 px-3.5 py-1.5 text-xs text-purple-400 sm:flex">
            <Cpu className="h-3.5 w-3.5 ai-pulse-glow rounded-full" />
            <span className="font-semibold tracking-wide">Analysis Engine: Live</span>
          </div>
        </div>
      </header>

      {/* Filter Tabs & Content */}
      <div className="space-y-8 animate-slide-up">
        <div className="flex gap-2 border-b border-cardBorder pb-4 mb-4 overflow-x-auto">
          {types.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setFilter(t.key)}
              className={`rounded-lg px-4.5 py-2 text-xs font-semibold transition-all duration-200 focus:outline-none ${
                filter === t.key
                  ? "bg-accentViolet/15 text-accentViolet border border-accentViolet/20"
                  : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Timeline container with max width for readability */}
        <div className="max-w-4xl">
          <InsightTimeline insights={filteredInsights} />
        </div>
      </div>
    </div>
  );
}
