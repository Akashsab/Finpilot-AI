import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Fraud from './pages/Fraud';
import Insights from './pages/Insights';
import Assistant from './pages/Assistant';
import ChatAssistant from './components/ChatAssistant';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* 1. Left Responsive Sidebar Menu */}
      <Sidebar
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
      />

      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                activeTab="Dashboard"
              />
            }
          />
          <Route
            path="/transactions"
            element={<Transactions setIsMobileMenuOpen={setIsMobileMenuOpen} />}
          />
          <Route
            path="/insights"
            element={<Insights setIsMobileMenuOpen={setIsMobileMenuOpen} />}
          />
          <Route
            path="/fraud"
            element={<Fraud setIsMobileMenuOpen={setIsMobileMenuOpen} />}
          />
          <Route
            path="/assistant"
            element={<Assistant setIsMobileMenuOpen={setIsMobileMenuOpen} />}
          />
          {/* Fallback Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* 3. Floating Sparkles AI Chat Companion */}
      <ChatAssistant />
    </div>
  );
}

