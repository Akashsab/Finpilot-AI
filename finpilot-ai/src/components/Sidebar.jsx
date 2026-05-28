import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, DollarSign, Brain, ShieldAlert, MessageSquare, X, Sparkles } from 'lucide-react';

const navigationItems = [
  { name: 'Dashboard', path: '/', icon: Home, end: true },
  { name: 'Transactions', path: '/transactions', icon: DollarSign, end: false },
  { name: 'AI Insights', path: '/insights', icon: Brain, end: false },
  { name: 'Fraud Detection', path: '/fraud', icon: ShieldAlert, end: false },
  { name: 'AI Assistant', path: '/assistant', icon: MessageSquare, end: false },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden transition-opacity duration-300 animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-cardBorder bg-[#0B0A11] transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:flex`}
      >
        {/* Sidebar Header / Brand Logo */}
        <div className="flex h-20 items-center justify-between px-6 border-b border-cardBorder">
          <div className="flex items-center gap-3">
            {/* Glowing Brand Mark */}
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-accentViolet to-accentIndigo text-white shadow-lg shadow-accentViolet/25 overflow-hidden group">
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Sparkles className="h-5 w-5 animate-pulse-slow" />
            </div>
            <div>
              <h1 className="text-base font-extrabold tracking-tight text-white m-0 leading-none">FinPilot</h1>
              <span className="flex items-center gap-1.5 mt-1.5 text-[9px] font-bold text-accentViolet tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-accentViolet ai-pulse-glow" />
                AI ACTIVE
              </span>
            </div>
          </div>

          {/* Close Menu Button (Mobile viewports only) */}
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-cardBorder text-gray-400 hover:text-white lg:hidden hover:bg-white/5 transition-all"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation Items Links */}
        <nav className="flex-1 space-y-1.5 px-4 py-6">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.end}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3.5 rounded-xl px-4 py-3.5 text-sm font-medium border transition-all duration-300 outline-none overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-r from-accentViolet/15 to-accentIndigo/10 text-white border-accentViolet/25 shadow-[0_0_15px_-3px_rgba(168,85,247,0.15)] font-semibold'
                      : 'text-gray-400 border-transparent hover:bg-white/[0.03] hover:border-white/[0.04] hover:text-white'
                  }`
                }
              >
                {/* Active Indicator Bar */}
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute left-0 top-3 bottom-3 w-1 rounded-r-lg bg-accentViolet" />
                    )}
                    <Icon
                      className={`h-5 w-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[2deg] ${
                        isActive ? 'text-accentViolet' : 'text-gray-400 group-hover:text-white'
                      }`}
                    />
                    <span className="relative z-10">{item.name}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User Card Panel Footer */}
        <div className="border-t border-cardBorder p-4">
          <div className="flex items-center gap-3 rounded-2xl bg-white/[0.03] border border-white/[0.04] p-3.5 hover:bg-white/[0.05] hover:border-white/[0.06] transition-all duration-300 group cursor-pointer">
            {/* User Avatar with subtle hover scale */}
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-accentIndigo text-white font-bold text-xs shadow-md shadow-accentIndigo/20 group-hover:scale-105 transition-transform duration-300">
              JD
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-[#0B0A11]" />
            </div>
            <div className="flex-1 overflow-hidden">
              <h4 className="truncate text-xs font-bold text-white leading-none">Jane Doe</h4>
              <p className="truncate text-[10px] text-gray-500 font-semibold mt-1">Founder @ NovaDev</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
