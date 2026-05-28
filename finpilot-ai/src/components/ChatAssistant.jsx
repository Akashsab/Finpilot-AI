import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, ArrowRight, Minimize2, Maximize2 } from 'lucide-react';

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello Jane! I am FinPilot, your financial intelligence partner. I have completed scanning your transaction ledgers. How can I assist you with your treasury or risk assessments today?",
      time: '15:04'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll chat to latest messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const quickPrompts = [
    { text: 'Explain my fraud alerts', icon: '🚨' },
    { text: 'Reduce SaaS expenses', icon: '💡' },
    { text: 'Analyze Q2 cash flow', icon: '📊' }
  ];

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    // Append User Message
    const userMsg = {
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let botResponse = "";
      const lowerText = text.toLowerCase();

      if (lowerText.includes('fraud') || lowerText.includes('alert') || lowerText.includes('suspic')) {
        botResponse = `FinPilot AI has quarantined **2 critical anomalies** in your ledger:\n\n1. **ATM Cash Withdrawal ($250.00):** Occurred in NY, USA, while your verified employee mobile device resides in London, UK.\n2. **Crypto Transfer ($850.00):** Outflow directed to an un-whitelisted decentralized liquidity wallet.\n\n**Recommendation:** Click *Decline (Block)* on the ATM card alert card immediately to lock the credential and initiate standard charge recovery.`;
      } else if (lowerText.includes('saas') || lowerText.includes('expens') || lowerText.includes('reduc') || lowerText.includes('cost')) {
        botResponse = `FinPilot audited your SaaS tooling stack and highlighted **$365.00 in monthly optimization opportunities**:\n\n* **Figma seats:** 3 developer seats have registered zero activity for 45 days. Consolidating saves **$45.00/mo**.\n* **OpenAI API limits:** Top-ups exceed $1k/mo. Pre-paying a $2k credit bundle unlocks **10% premium credits**.\n* **AWS instances:** 2 EC2 database servers are running 24/7 with zero off-peak traffic. Scheduling weekend shutdowns saves **$120.00/mo**.`;
      } else if (lowerText.includes('cash') || lowerText.includes('flow') || lowerText.includes('q2') || lowerText.includes('inflow')) {
        botResponse = `Your cash flow trend remains **exceptionally robust** for Q2:\n\n* **Net balance growth:** +14.2% month-on-month.\n* **Inflow velocity:** Stripe intake increased to **$15,400** in May, driven by strong campaign conversion.\n* **Outflow ratio:** Spent ratio is comfortable at 55.6% of your monthly $15,000 threshold.\n\n*Recommendation:* Shift $4,000 idle capital into your primary Treasury yields to earn an annualized 5.2% yield.`;
      } else {
        botResponse = `I've analyzed your financial pipeline. Our financial models indicate high stability with a 14.2% balance acceleration. Let me know if you would like me to compile expense forecasts or analyze specific merchant logs!`;
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: botResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Sparkles Trigger Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex h-14 items-center gap-2.5 rounded-full bg-gradient-to-r from-accentViolet to-accentIndigo px-5 text-white shadow-xl shadow-accentViolet/25 transition-transform duration-300 hover:scale-105 active:scale-95"
        >
          <Sparkles className="h-5 w-5 animate-pulse" />
          <span className="text-sm font-bold tracking-tight">Ask FinPilot AI</span>
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 ai-pulse-glow" />
        </button>
      )}

      {/* Floating Chat Drawer Container */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[580px] w-[380px] flex-col rounded-2xl border border-cardBorder bg-[#111019] shadow-2xl animate-slide-up">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-cardBorder p-4 bg-gradient-to-r from-accentViolet/10 to-accentIndigo/10 rounded-t-2xl">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-accentViolet to-accentIndigo text-white">
                <Bot className="h-4.5 w-4.5 animate-pulse-slow" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white m-0">FinPilot Copilot</h3>
                <span className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-400 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  REAL-TIME COGNITIVE LAYER
                </span>
              </div>
            </div>
            
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-cardBorder text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'bot' && (
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-accentViolet/10 text-accentViolet border border-accentViolet/25">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                )}
                
                <div className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-accentViolet text-white rounded-tr-none'
                    : 'bg-white/5 text-gray-200 border border-cardBorder rounded-tl-none'
                }`}>
                  {/* Process double-asterisk into bold formatting manually for simple rendering */}
                  {msg.text.split('\n').map((line, lineIdx) => (
                    <p key={lineIdx} className={lineIdx > 0 ? 'mt-1.5' : 'm-0'}>
                      {line.split('**').map((part, partIdx) => 
                        partIdx % 2 === 1 ? <strong key={partIdx} className="text-white font-bold">{part}</strong> : part
                      )}
                    </p>
                  ))}
                  <span className="block text-[9px] text-gray-500 text-right mt-1.5">{msg.time}</span>
                </div>
              </div>
            ))}

            {/* AI Typing Simulation */}
            {isTyping && (
              <div className="flex gap-2.5 justify-start">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accentViolet/10 text-accentViolet border border-accentViolet/25">
                  <Bot className="h-3.5 w-3.5 animate-pulse" />
                </div>
                <div className="rounded-2xl rounded-tl-none bg-white/5 border border-cardBorder px-4 py-3 text-xs text-gray-400 flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-accentViolet animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-accentViolet animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-accentViolet animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span>FinPilot is auditing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts shortcuts */}
          {messages.length === 1 && !isTyping && (
            <div className="px-4 py-2 border-t border-cardBorder/30">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Suggested Actions</span>
              <div className="flex flex-col gap-1.5">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt.text}
                    type="button"
                    onClick={() => handleSendMessage(prompt.text)}
                    className="flex items-center justify-between rounded-xl border border-cardBorder bg-white/5 px-3 py-2 text-left text-xs font-semibold text-gray-300 transition-all hover:bg-white/10 hover:border-accentViolet/30 group"
                  >
                    <span className="flex items-center gap-2">
                      <span>{prompt.icon}</span>
                      <span>{prompt.text}</span>
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-gray-500 transition-transform group-hover:translate-x-0.5 group-hover:text-accentViolet" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Chat Controls */}
          <div className="border-t border-cardBorder p-3 bg-cardBg rounded-b-2xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask for advice, analyze balances..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 rounded-xl border border-cardBorder bg-background py-2.5 px-3 text-xs text-white placeholder-gray-500 focus:border-accentViolet focus:outline-none"
              />
              <button
                type="submit"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-accentViolet text-white shadow-md shadow-accentViolet/10 hover:bg-accentViolet-600 transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
