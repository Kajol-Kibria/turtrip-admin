'use client';

import React, { useState } from 'react';
import { Menu, Bell, ChevronRight, ShieldCheck, AlertCircle, Map, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const MOCK_ALERTS = [
  { id: 1, title: 'Identity Verification', message: '12 new drivers pending verification', time: '5m ago', type: 'info', icon: ShieldCheck },
  { id: 2, title: 'Payout Failed', message: 'Escrow payout to ID #884 failed', time: '12m ago', type: 'error', icon: AlertCircle },
  { id: 3, title: 'New Trip Created', message: 'Custom Sahara Tour created by User 8', time: '40m ago', type: 'success', icon: Map },
  { id: 4, title: 'System Alert', message: 'Database optimization scheduled for 02:00 UTC', time: '2h ago', type: 'warning', icon: Zap },
];

export default function Header({ 
  currentView, 
  isSidebarOpen, 
  setIsSidebarOpen,
  setCurrentView
}) {
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);

  return (
    <header className="h-20 flex-none bg-white border-b border-slate-200/60 px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4">
        {!isSidebarOpen && (
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-warm rounded-xl transition-colors text-slate-400 hover:text-brand"
          >
            <Menu size={20} />
          </button>
        )}
        <h2 className="text-xl font-bold text-earth capitalize">
          {currentView.replace('_', ' ')}
        </h2>
      </div>

      <div className="flex items-center gap-3 relative">
        <button 
          onClick={() => setIsAlertsOpen(!isAlertsOpen)}
          className={cn(
            "p-2 rounded-xl relative transition-all group",
            isAlertsOpen ? "bg-primary text-white" : "text-slate-400 hover:bg-warm"
          )}
        >
          <Bell size={20} className={isAlertsOpen ? "text-white" : "group-hover:text-primary"} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-coral border-2 border-white rounded-full"></span>
        </button>

        <AnimatePresence>
          {isAlertsOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsAlertsOpen(false)} 
              />
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-12 right-0 w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 z-50 overflow-hidden"
              >
                <div className="p-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                  <h3 className="text-xs font-black text-earth uppercase tracking-widest italic">Live Alerts</h3>
                  <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">4 New</span>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  {MOCK_ALERTS.map((alert) => {
                    const AlertIcon = alert.icon;
                    return (
                      <div key={alert.id} className="p-4 border-b border-slate-50 hover:bg-warm/50 transition-colors cursor-pointer group">
                        <div className="flex gap-3">
                          <div className={cn(
                            "p-2 rounded-xl h-fit",
                            alert.type === 'info' ? "bg-primary/5 text-primary" :
                            alert.type === 'error' ? "bg-coral/5 text-coral" :
                            alert.type === 'success' ? "bg-success/5 text-success" :
                            "bg-yellow-500/5 text-yellow-500"
                          )}>
                            <AlertIcon size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h4 className="text-[11px] font-black text-earth truncate pr-2">{alert.title}</h4>
                              <span className="text-[9px] font-medium text-slate-300 whitespace-nowrap">{alert.time}</span>
                            </div>
                            <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed line-clamp-2">{alert.message}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button 
                  onClick={() => {
                    setCurrentView('alerts');
                    setIsAlertsOpen(false);
                  }}
                  className="w-full py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-slate-50 hover:text-primary transition-all border-t border-slate-50"
                >
                  View All Activity Log
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="h-6 w-px bg-slate-200 mx-2" />
        <button className="flex items-center gap-3 px-4 py-2 hover:bg-warm rounded-xl transition-colors border border-transparent hover:border-slate-100">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold leading-none text-earth">21 Apr 2026</p>
            <p className="text-[10px] text-slate-400 font-medium mt-1">Current Sync</p>
          </div>
          <ChevronRight size={16} className="text-slate-300" />
        </button>
      </div>
    </header>
  );
}
