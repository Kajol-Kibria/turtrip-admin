'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { 
  LayoutDashboard, UserCog, Users, Car, Hotel, ShieldCheck, 
  Map, BookOpen, CreditCard, Headset, AlertCircle, ShieldAlert, 
  MessageSquare, Shield, Bell, Send, Settings, Mountain, X 
} from 'lucide-react';

const SidebarItem = ({ item, active, onClick }) => {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-medium",
        active 
          ? "bg-primary text-white shadow-lg shadow-primary/20" 
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
      )}
    >
      <Icon size={20} className={cn(active ? "text-white" : "text-slate-400 group-hover:text-primary transition-colors")} />
      <span>{item.label}</span>
    </button>
  );
};

const navigation = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['super_admin', 'customer_support'] },
  { id: 'staff', label: 'Staff Management', icon: UserCog, roles: ['super_admin'] },
  { id: 'users', label: 'Users', icon: Users, roles: ['super_admin'] },
  { id: 'drivers', label: 'Drivers', icon: Car, roles: ['super_admin', 'customer_support'] },
  { id: 'stays', label: 'Accommodations', icon: Hotel, roles: ['super_admin', 'customer_support'] },
  { id: 'guides', label: 'Guides', icon: ShieldCheck, roles: ['super_admin', 'customer_support'] },
  { id: 'trips', label: 'Trips', icon: Map, roles: ['super_admin'] },
  { id: 'bookings', label: 'Bookings', icon: BookOpen, roles: ['super_admin', 'customer_support'] },
  { id: 'payments', label: 'Payments', icon: CreditCard, roles: ['super_admin'] },
  { id: 'support', label: 'Support', icon: Headset, roles: ['super_admin', 'customer_support'] },
  { id: 'disputes', label: 'Disputes', icon: AlertCircle, roles: ['super_admin', 'customer_support'] },
  { id: 'emergency', label: 'Emergency SOS', icon: ShieldAlert, roles: ['super_admin', 'customer_support'] },
  { id: 'moderation', label: 'Moderation', icon: MessageSquare, roles: ['super_admin'] },
  { id: 'compliance', label: 'Compliance', icon: Shield, roles: ['super_admin'] },
  { id: 'alerts', label: 'Alerts Center', icon: Bell, roles: ['super_admin', 'customer_support'] },
  { id: 'notifications', label: 'Broadcasts', icon: Send, roles: ['super_admin', 'customer_support'] },
  { id: 'settings', label: 'Settings', icon: Settings, roles: ['super_admin'] },
];

export default function Sidebar({ 
  isSidebarOpen, 
  setIsSidebarOpen, 
  role, 
  supportOfficerContext, 
  currentView, 
  setCurrentView, 
  setIsLogged 
}) {
  const filteredNav = navigation.filter(item => {
    const hasRoleAccess = item.roles.includes(role);
    if (!hasRoleAccess) return false;

    if (role === 'customer_support') {
      const commonModules = ['dashboard', 'bookings', 'support', 'disputes', 'emergency', 'alerts'];
      return commonModules.includes(item.id) || item.id === supportOfficerContext.supportTask;
    }

    return true;
  });

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <motion.aside
          initial={{ x: -280, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -280, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-y-0 left-0 w-[280px] bg-white border-r border-slate-200 z-50 lg:relative flex flex-col"
        >
          <div className="flex flex-col h-full">
            <div className="p-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-white rotate-6 shadow-lg shadow-brand/20">
                  <Mountain size={24} />
                </div>
                <div>
                  <h1 className="text-xl font-black tracking-tight text-earth leading-none">Manjaro</h1>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Admin Panel</p>
                </div>
              </div>
            </div>

            <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
              {filteredNav.map((item) => (
                <SidebarItem
                  key={item.id}
                  item={item}
                  active={currentView === item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    if (window.innerWidth < 1024) setIsSidebarOpen(false);
                  }}
                />
              ))}
            </nav>

            <div className="p-6">
              <div className="bg-warm rounded-2xl p-4 border border-slate-100">
                <div className="flex items-center gap-3 mb-3">
                  <img 
                    src={`https://picsum.photos/seed/${role}/40/40`} 
                    className="w-10 h-10 rounded-xl object-cover"
                    alt="Admin"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-earth lowercase first-letter:uppercase">{role.replace('_', ' ')}</h4>
                    <p className="text-[10px] font-medium text-slate-400">Manjaro Operations</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsLogged(false)}
                  className="w-full bg-white border border-slate-200 text-xs font-bold py-2 rounded-lg hover:bg-slate-50 transition-colors text-earth"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-8 -right-4 lg:hidden w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-md shadow-slate-200/50 hover:bg-slate-50 transition-all"
          >
            <X size={16} className="text-slate-500" />
          </button>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
