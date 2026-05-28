import React, { useState, useRef, useEffect } from 'react';
import {
  Send, Sparkles, User, Bot, TrendingUp, TrendingDown, AlertTriangle,
  DollarSign, PieChart, ShieldCheck, Lightbulb, ArrowRight, Copy, Check,
  RotateCcw, Cpu, Brain, Zap, ChevronDown, Menu
} from 'lucide-react';

/* ─────────────── Pre-seeded conversation ─────────────── */
const seedMessages = [
  {
    id: 'm-1',
    role: 'assistant',
    content: "Welcome back, Jane! I'm FinPilot AI — your intelligent financial co-pilot. I've already scanned your accounts this morning. Here's what I found:",
    timestamp: '09:00 AM',
    cards: [
      { icon: 'trending-up', label: 'Portfolio', value: '+2.4%', detail: 'Up $2,980 today', color: 'emerald' },
      { icon: 'shield', label: 'Risk Score', value: '12/100', detail: 'Very low risk', color: 'emerald' },
      { icon: 'alert', label: 'Alerts', value: '2', detail: 'Action needed', color: 'amber' },
    ],
  },
  {
    id: 'm-2',
    role: 'user',
    content: "What's happening with my SaaS expenses this month? Are they under control?",
    timestamp: '09:02 AM',
  },
  {
    id: 'm-3',
    role: 'assistant',
    content: "Your SaaS spending this month totals **$2,370**, which is **18% higher** than your 3-month rolling average.\n\nHere's the breakdown:\n\n• **AWS** — $1,420.50 (cloud infra, matches baseline)\n• **OpenAI API** — $500.00 (4% savings available via prepaid tokens)\n• **Figma** — $320.00 (⚠️ 3 duplicate seats detected)\n• **Vercel** — $450.00 (under-utilized CDN bandwidth)\n\n**My recommendation:** De-duplicate the 3 Figma seats to save **$90/mo**, and switch OpenAI to annual prepaid credits to save **$200/year**. Combined savings: **$1,280/year**.",
    timestamp: '09:02 AM',
    suggestions: ['De-duplicate Figma seats', 'Switch to OpenAI prepaid', 'Show full SaaS audit'],
  },
  {
    id: 'm-4',
    role: 'user',
    content: 'Should I be worried about that flagged crypto transaction?',
    timestamp: '09:05 AM',
  },
  {
    id: 'm-5',
    role: 'assistant',
    content: "**Yes, I'd recommend immediate attention.** The transaction to CryptoSwap Inc ($850) was flagged because:\n\n🔴 **Risk Score: 94/100 (Critical)**\n\n1. The recipient wallet address (0x7f…e4a1) is **not on your whitelist**\n2. The transaction pattern matches known **money-laundering typologies** in our threat database\n3. It was auto-flagged under **capital-outflow regulations**\n\nI've already placed a temporary hold. You can either **approve** it if you recognize the transfer, or **block and freeze** the associated card. Want me to freeze the card now?",
    timestamp: '09:05 AM',
    suggestions: ['Block & freeze card', 'Approve transfer', 'Show transaction details'],
  },
  {
    id: 'm-6',
    role: 'user',
    content: 'Give me a quick portfolio health check',
    timestamp: '09:08 AM',
  },
  {
    id: 'm-7',
    role: 'assistant',
    content: "Here's your portfolio snapshot as of this morning:\n\n**Overall Performance**\n• Total value: **$124,350** (+$2,980 today)\n• Monthly return: **+4.7%** (benchmark S&P 500: +2.1%)\n• Risk-adjusted return (Sharpe): **1.82** — excellent\n\n**Key Metrics**\n• Revenue-to-infra ratio: **5.4x** — very healthy\n• Cash runway: **14.2 months** at current burn rate\n• Debt-to-equity: **0.12** — conservative leverage\n\n✅ **Verdict:** Your finances are in strong shape. Revenue growth outpaces expenses by 3.2x. I'd recommend allocating the surplus toward the emergency reserve or exploring higher-yield instruments.",
    timestamp: '09:08 AM',
    suggestions: ['Show allocation chart', 'Optimize for yield', 'Compare to benchmark'],
  },
];

/* ─────────────── AI response bank ─────────────── */
const aiResponses = [
  {
    content: "Based on your spending patterns over the past 90 days, I've identified **3 optimization opportunities**:\n\n1. **Consolidate cloud providers** — Running workloads on both AWS and GCP costs 23% more than a single-provider commitment. Estimated savings: **$340/mo**\n2. **Renegotiate HubSpot contract** — Your renewal is in 4 months. Similar companies negotiate 15-20% discounts at this tier. Potential savings: **$2,200/year**\n3. **Automate reconciliation** — You're spending ~4 hours/week on manual invoice matching. My automated pipeline can reduce this to 15 minutes.\n\nWant me to draft a negotiation email for HubSpot?",
    suggestions: ['Draft HubSpot email', 'Show cloud consolidation plan', 'Setup auto-reconciliation'],
  },
  {
    content: "I've analyzed your cash flow patterns and here's what stands out:\n\n📊 **Revenue Consistency**: Your Stripe payouts average **$8,750/day** with a standard deviation of only $420 — that's extremely stable.\n\n💰 **Cash Conversion Cycle**: 12 days — well below the SaaS industry average of 45 days. Your collections are efficient.\n\n⚠️ **Watch Out**: Marketing spend (Meta Ads) at $2,300/mo shows a strong 14% correlation with revenue growth, but the marginal return is declining. You might be hitting diminishing returns above $2,000/mo.\n\n**Suggestion:** Cap ad spend at $2,000 and redirect the $300 savings to content marketing, which has shown 3.2x better CAC in your industry segment.",
    suggestions: ['Optimize ad spend', 'Show CAC breakdown', 'Revenue forecast'],
  },
  {
    content: "Running a quick **stress test** on your portfolio...\n\n🔬 **Scenario Analysis:**\n\n| Scenario | Impact | Recovery Time |\n|----------|--------|---------------|\n| Market -10% | -$12,435 | ~45 days |\n| Client churn 20% | -$21,000/mo | ~90 days |\n| Interest rate +2% | -$840/yr | Minimal |\n| SaaS cost spike 30% | -$711/mo | Immediate |\n\n✅ Your portfolio can withstand all moderate-stress scenarios with your current 14.2-month runway.\n\n⚠️ However, a simultaneous market correction + client churn would reduce runway to 6.8 months. Consider building your emergency reserve from $18K to $30K for additional safety.",
    suggestions: ['Build emergency reserve', 'Diversification plan', 'Insurance options'],
  },
  {
    content: "Here's your **weekly financial intelligence briefing**:\n\n🟢 **Wins This Week:**\n• Revenue up 8% WoW ($61,250 vs $56,710)\n• Successfully blocked 2 fraudulent transactions worth $3,350\n• SaaS costs down 3% after Figma seat optimization\n\n🟡 **Watch List:**\n• AWS spend trending 12% above forecast — new LLM deployment is the driver\n• 2 invoices overdue (>30 days) totaling $4,200\n\n🔴 **Action Required:**\n• Card credential rotation recommended after the ATM fraud attempt\n• Tax quarterly estimate due in 18 days — estimated payment: $8,420\n\nShall I draft the overdue invoice reminders or schedule the tax payment?",
    suggestions: ['Send invoice reminders', 'Schedule tax payment', 'Rotate card credentials'],
  },
];

/* ─────────────── Markdown-lite renderer ─────────────── */
function renderMarkdown(text) {
  // Very simple markdown: bold, bullet points, line breaks
  const lines = text.split('\n');
  return lines.map((line, i) => {
    // Bold
    let processed = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
    // Bullet points
    if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
      return <p key={i} className="ml-3 text-gray-300" dangerouslySetInnerHTML={{ __html: processed }} />;
    }
    // Numbered lists
    if (/^\d+\./.test(line.trim())) {
      return <p key={i} className="ml-3 text-gray-300" dangerouslySetInnerHTML={{ __html: processed }} />;
    }
    // Table rows (very basic)
    if (line.trim().startsWith('|')) {
      const cells = line.split('|').filter(c => c.trim() !== '' && !c.match(/^[\s-]+$/));
      if (cells.length === 0 || line.match(/^\|\s*-/)) return null;
      const isHeader = i > 0 && lines[i + 1]?.match(/^\|\s*-/);
      return (
        <div key={i} className={`grid grid-cols-3 gap-2 text-[11px] px-2 py-1.5 ${isHeader ? 'font-bold text-white border-b border-cardBorder' : 'text-gray-300'}`}>
          {cells.map((c, j) => <span key={j}>{c.trim()}</span>)}
        </div>
      );
    }
    // Emoji lines
    if (line.trim() === '') return <div key={i} className="h-2" />;
    return <p key={i} className="text-gray-300" dangerouslySetInnerHTML={{ __html: processed }} />;
  });
}

/* ════════════════════════════════════════════════════
   MAIN ASSISTANT PAGE COMPONENT
   ════════════════════════════════════════════════════ */
export default function Assistant({ setIsMobileMenuOpen }) {
  const [messages, setMessages] = useState(seedMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMsg = {
      id: `m-${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      const aiMsg = {
        id: `m-${Date.now() + 1}`,
        role: 'assistant',
        content: response.content,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        suggestions: response.suggestions,
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleCopy = (id, content) => {
    navigator.clipboard.writeText(content.replace(/\*\*/g, ''));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const cardIconMap = {
    'trending-up': TrendingUp,
    'shield': ShieldCheck,
    'alert': AlertTriangle,
  };

  const cardColorMap = {
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400' },
    amber:   { bg: 'bg-amber-500/10',   border: 'border-amber-500/20',   text: 'text-amber-400' },
    rose:    { bg: 'bg-rose-500/10',     border: 'border-rose-500/20',     text: 'text-rose-400' },
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">

      {/* ── CHAT HEADER ── */}
      <header className="flex items-center justify-between border-b border-cardBorder px-4 lg:px-8 py-4 bg-cardBg/50 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger icon */}
          <button
            type="button"
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-cardBorder text-gray-400 hover:text-white lg:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-accentViolet to-accentIndigo text-white shadow-lg shadow-accentViolet/20">
            <Brain className="h-5 w-5" />
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-cardBg" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white m-0 flex items-center gap-2">
              FinPilot AI Assistant
              <span className="rounded-md bg-accentViolet/15 border border-accentViolet/25 px-1.5 py-0.5 text-[9px] font-bold text-accentViolet uppercase tracking-wider">Pro</span>
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-emerald-400 font-medium">Online · Analyzing your finances</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-xl bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 text-xs text-purple-400 sm:flex">
            <Cpu className="h-3.5 w-3.5 ai-pulse-glow rounded-full" />
            <span className="font-semibold tracking-wide">Neural Engine v4.2</span>
          </div>
          <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-cardBorder text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* ── MESSAGES AREA ── */}
      <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-6 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 animate-fade-in ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>

            {/* AI avatar */}
            {msg.role === 'assistant' && (
              <div className="flex-shrink-0 mt-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-accentViolet to-accentIndigo text-white shadow-md">
                  <Sparkles className="h-4 w-4" />
                </div>
              </div>
            )}

            {/* Message bubble */}
            <div className={`max-w-[85%] lg:max-w-[70%] ${msg.role === 'user' ? 'order-first' : ''}`}>
              <div className={`rounded-2xl px-5 py-4 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-accentViolet to-accentIndigo text-white rounded-br-md shadow-lg shadow-accentViolet/10'
                  : 'bg-cardBg border border-cardBorder text-gray-300 rounded-bl-md'
              }`}>
                <div className="space-y-1.5">{renderMarkdown(msg.content)}</div>

                {/* Inline metric cards */}
                {msg.cards && (
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {msg.cards.map((card, i) => {
                      const Icon = cardIconMap[card.icon] || Zap;
                      const colors = cardColorMap[card.color] || cardColorMap.emerald;
                      return (
                        <div key={i} className={`rounded-xl ${colors.bg} border ${colors.border} p-3 text-center`}>
                          <Icon className={`h-4 w-4 mx-auto mb-1 ${colors.text}`} />
                          <p className={`text-lg font-bold ${colors.text}`}>{card.value}</p>
                          <p className="text-[9px] text-gray-400 mt-0.5">{card.label}</p>
                          <p className="text-[9px] text-gray-500">{card.detail}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Meta row: timestamp + actions */}
              <div className={`flex items-center gap-2 mt-1.5 px-1 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <span className="text-[10px] text-gray-600">{msg.timestamp}</span>
                {msg.role === 'assistant' && (
                  <button
                    onClick={() => handleCopy(msg.id, msg.content)}
                    className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {copiedId === msg.id ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    {copiedId === msg.id ? 'Copied' : 'Copy'}
                  </button>
                )}
              </div>

              {/* Suggestion chips */}
              {msg.suggestions && (
                <div className="flex flex-wrap gap-2 mt-3 px-1">
                  {msg.suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(s)}
                      className="flex items-center gap-1.5 rounded-xl bg-white/[0.04] border border-cardBorder px-3 py-1.5 text-[11px] font-medium text-gray-300 hover:text-white hover:bg-accentViolet/10 hover:border-accentViolet/25 transition-all duration-200 group"
                    >
                      <Lightbulb className="h-3 w-3 text-accentViolet opacity-60 group-hover:opacity-100" />
                      {s}
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User avatar */}
            {msg.role === 'user' && (
              <div className="flex-shrink-0 mt-1 order-last">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accentIndigo text-white text-xs font-bold shadow-md">
                  JD
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3 animate-fade-in">
            <div className="flex-shrink-0 mt-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-accentViolet to-accentIndigo text-white shadow-md">
                <Sparkles className="h-4 w-4 animate-pulse" />
              </div>
            </div>
            <div className="rounded-2xl rounded-bl-md bg-cardBg border border-cardBorder px-5 py-4">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-accentViolet animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="h-2 w-2 rounded-full bg-accentViolet animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="h-2 w-2 rounded-full bg-accentViolet animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── INPUT BAR ── */}
      <div className="flex-shrink-0 border-t border-cardBorder bg-cardBg/80 backdrop-blur-sm px-4 lg:px-8 py-4">
        {/* Quick-action chips */}
        <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-none">
          {['Portfolio check', 'Spending analysis', 'Risk assessment', 'Tax planning', 'Market outlook'].map((chip) => (
            <button
              key={chip}
              onClick={() => handleSend(chip)}
              className="flex-shrink-0 rounded-lg bg-white/[0.03] border border-cardBorder px-3 py-1.5 text-[11px] text-gray-400 hover:text-white hover:border-accentViolet/25 transition-colors whitespace-nowrap"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input field */}
        <div className="relative flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask FinPilot anything about your finances..."
              rows={1}
              className="w-full resize-none rounded-xl border border-cardBorder bg-background px-4 py-3 pr-12 text-sm text-white placeholder-gray-500 outline-none focus:border-accentViolet/50 focus:ring-1 focus:ring-accentViolet/20 transition-all"
              style={{ maxHeight: '120px' }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
              }}
            />
            <div className="absolute right-3 bottom-2.5 flex items-center gap-1 text-[9px] text-gray-600">
              <span>⏎ Send</span>
            </div>
          </div>

          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-200 ${
              input.trim() && !isTyping
                ? 'bg-gradient-to-r from-accentViolet to-accentIndigo text-white shadow-lg shadow-accentViolet/20 hover:shadow-accentViolet/40 hover:scale-105'
                : 'bg-white/5 border border-cardBorder text-gray-600 cursor-not-allowed'
            }`}
          >
            <Send className="h-4.5 w-4.5" />
          </button>
        </div>

        <p className="text-[10px] text-gray-600 mt-2 text-center">
          FinPilot AI may produce inaccurate information. Always verify financial decisions independently.
        </p>
      </div>
    </div>
  );
}
