/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Mountain, 
  BookOpen, 
  CreditCard, 
  AlertCircle, 
  ShieldCheck, 
  Settings, 
  Menu, 
  X, 
  ChevronRight, 
  Search, 
  Bell, 
  TrendingUp, 
  TrendingDown,
  Clock,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Eye,
  MessageSquare,
  Globe,
  DollarSign,
  User,
  Car,
  Headset,
  Shield,
  UserCog,
  UserCheck,
  FileCheck,
  Smartphone,
  Hotel,
  Bed,
  ShieldAlert,
  Activity,
  Timer,
  FileText,
  Lock,
  Unlock,
  AlertTriangle,
  MapPin,
  ListChecks,
  UserPlus,
  Siren,
  Send,
  Zap,
  RefreshCw,
  Map
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// --- Types ---
type Role = 'super_admin' | 'customer_support';

type View = 
  | 'dashboard' 
  | 'guides' 
  | 'trips' 
  | 'bookings' 
  | 'payments' 
  | 'disputes' 
  | 'moderation' 
  | 'settings' 
  | 'users'
  | 'drivers'
  | 'support'
  | 'stays'
  | 'emergency'
  | 'compliance'
  | 'staff'
  | 'alerts'
  | 'notifications';

// --- Mock Data ---
const REVENUE_DATA = [
  { name: 'Mon', revenue: 4200 },
  { name: 'Tue', revenue: 3800 },
  { name: 'Wed', revenue: 5100 },
  { name: 'Thu', revenue: 4900 },
  { name: 'Fri', revenue: 6200 },
  { name: 'Sat', revenue: 8400 },
  { name: 'Sun', revenue: 7900 },
];

const ACTIVENESS_DATA = [
  { name: '00:00', value: 20 },
  { name: '04:00', value: 15 },
  { name: '08:00', value: 45 },
  { name: '12:00', value: 90 },
  { name: '16:00', value: 75 },
  { name: '20:00', value: 60 },
  { name: '23:59', value: 35 },
];

const TRIP_DISTRIBUTION = [
  { name: 'Cultural', value: 400, color: '#023E8A' },
  { name: 'Adventure', value: 300, color: '#FB8500' },
  { name: 'Leisure', value: 300, color: '#80B918' },
];

// --- Components ---

type SidebarItemProps = {
  item: { id: View; label: string; icon: React.ElementType };
  active: boolean;
  onClick: () => void;
  key?: React.Key;
};

const SidebarItem = ({ 
  item, 
  active, 
  onClick 
}: SidebarItemProps) => {
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

// --- View: Dashboard ---
const DashboardView = ({ context, onNavigate }: { context?: { country: string, supportTask: string }, onNavigate?: (view: View) => void }) => {
  const supportStats = [
    { label: 'Total Bookings', value: '1,284', change: '+8%', icon: BookOpen, color: 'text-primary' },
    { label: 'Active Trips', value: '45', change: '+12%', icon: Map, color: 'text-brand' },
    { label: 'Support Completed', value: '892', change: '94%', icon: CheckCircle2, color: 'text-success' },
    { label: 'Support Pending', value: '12', change: '-5', icon: Timer, color: 'text-alert' },
  ];

  return (
    <div className="space-y-8">
      {/* Contextual Header */}
      {context && (
        <div className="bg-earth p-8 rounded-[32px] text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl shadow-earth/20 relative overflow-hidden">
          <div className="relative z-10">
             <div className="flex items-center gap-2 mb-2">
               <span className="px-3 py-1 bg-brand rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-brand/20">{context.country}</span>
               <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest text-white">{context.supportTask.toUpperCase()} PROVIDER SUPPORT</span>
             </div>
             <h1 className="text-3xl font-black tracking-tight leading-none">{context.country} - {context.supportTask.charAt(0).toUpperCase() + context.supportTask.slice(1)} Dashboard</h1>
             <p className="text-white/60 font-medium mt-2">Personalized marketplace metrics for your assigned jurisdiction.</p>
          </div>
          <Activity className="absolute -right-10 -bottom-10 w-48 h-48 text-white/5 rotate-12" />
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {(context ? supportStats : [
          { label: 'Total Users', value: '12,842', change: '+12%', icon: Users, color: 'text-brand', bg: 'bg-brand/10' },
          { label: 'Total Guides', value: '840', change: '+5%', icon: ShieldCheck, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Total Drivers', value: '452', change: '+15%', icon: Car, color: 'text-brand', bg: 'bg-brand/10' },
          { label: 'Total Stays', value: '184', change: '+22%', icon: Hotel, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Total Bookings', value: '4,204', change: '+18%', icon: BookOpen, color: 'text-success', bg: 'bg-success/10' },
          { label: 'Active Trips', value: '156', change: '-2%', icon: Map, color: 'text-brand', bg: 'bg-brand/10' },
        ]).map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-[32px] bg-white border-none shadow-xl shadow-slate-200/40 group hover:-translate-y-1 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-4 rounded-2xl transition-colors", stat.color.replace('text', 'bg') + '/10')}>
                <stat.icon className={stat.color} size={24} />
              </div>
              <span className={cn("text-xs font-black", stat.change.startsWith('+') ? "text-success" : "text-alert")}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-3xl font-black text-earth tracking-tighter">{stat.value}</h3>
            <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Marketplace Performance Chart */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card p-8 rounded-[40px] bg-white border-none shadow-xl shadow-slate-200/40">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black text-earth tracking-tight">{context ? 'System Activeness' : 'Marketplace Activity'}</h3>
              <select className="bg-warm border-none rounded-xl text-[10px] font-black uppercase tracking-widest px-4 py-2">
                <option>Real-time</option>
                <option>Last 24 Hours</option>
                {!context && <option>Last 30 Days</option>}
              </select>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={(context ? ACTIVENESS_DATA : REVENUE_DATA) as any[]}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={context ? "#FB8500" : "#1C1C1E"} stopOpacity={0.1}/>
                      <stop offset="95%" stopColor={context ? "#FB8500" : "#1C1C1E"} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8', fontWeight: 600}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8', fontWeight: 600}} />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey={context ? "value" : "revenue"} 
                    stroke={context ? "#FB8500" : "#1C1C1E"} 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Country Support Breakdown */}
          {!context && (
            <div className="glass-card p-8 rounded-[40px] bg-white border-none shadow-xl shadow-slate-200/40">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-earth tracking-tight">Regional Support Distribution</h3>
                <Globe className="text-slate-200" size={24} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { country: 'Kenya', officers: 24, status: 'Active' },
                  { country: 'UAE', officers: 18, status: 'Active' },
                  { country: 'Nigeria', officers: 32, status: 'High Volume' },
                  { country: 'Morocco', officers: 12, status: 'Active' },
                  { country: 'France', officers: 9, status: 'Stable' },
                  { country: 'United Kingdom', officers: 15, status: 'Stable' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-warm/30 rounded-2xl border border-earth/5 hover:bg-white hover:shadow-lg transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-earth/5 flex items-center justify-center font-black text-xs text-earth italic">
                        {item.country.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-black text-earth leading-none">{item.country}</p>
                        <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest">{item.status}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-primary leading-none">{item.officers}</p>
                      <p className="text-[9px] text-slate-300 font-bold uppercase">Officers</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recent Alerts Feed */}
        <div className="flex flex-col gap-6">
          <div className="glass-card p-6 rounded-[32px] bg-white border-none shadow-xl shadow-slate-200/40 flex-1">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-earth uppercase tracking-widest text-xs">Recent Alerts</h3>
                <button 
                  onClick={() => onNavigate?.('alerts')}
                  className="text-[10px] font-black text-primary uppercase hover:underline"
                >View All</button>
             </div>
             <div className="space-y-4">
                {[
                  { title: 'New KYC Audit', desc: 'West Park Hotels', type: 'KYC', color: 'bg-brand' },
                  { title: 'SOS Triggered', desc: 'Sarah Green (Morocco)', type: 'SOS', color: 'bg-coral' },
                  { title: 'Dispute Lodged', desc: 'DP-002: Mike vs Safari', type: 'D', color: 'bg-earth' },
                  { title: 'Booking Alert', desc: '$5,400 Premium Tour', type: 'B', color: 'bg-success' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-warm/30 rounded-2xl border border-earth/5 group hover:bg-white hover:shadow-lg transition-all">
                    <div className="flex items-center gap-3">
                       <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-[10px]", item.color)}>{item.type}</div>
                       <div>
                          <p className="text-[11px] font-black text-earth leading-none">{item.title}</p>
                          <p className="text-[9px] text-slate-400 font-bold mt-1">{item.desc}</p>
                       </div>
                    </div>
                    <button 
                      onClick={() => onNavigate?.('alerts')}
                      className="p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-earth text-white rounded-lg shadow-sm"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                ))}
             </div>
             <button 
               onClick={() => onNavigate?.('alerts')}
               className="w-full mt-6 bg-earth/5 text-earth py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-earth hover:text-white transition-all"
             >
               Go to inbox
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- View: Guide Management ---
const GuideManagementView = ({ context }: { context?: { country: string } }) => {
  const [selectedGuide, setSelectedGuide] = useState<any>(null);
  const [kycStep, setKycStep] = useState(1);

  const guides = [
    { name: 'Ahmed Khan', type: 'Individual', status: 'Pending', city: 'Dubai', country: 'UAE', rating: 4.8, joined: 'Apr 2026', docs: ['ID Card', 'Tourism License'], kyc: 'In Review' },
    { name: 'Safari Pro Excursions', type: 'Agency', status: 'Suspicious', city: 'Nairobi', country: 'Kenya', rating: 3.2, joined: 'Mar 2026', docs: ['Business Permit', 'Safety Certs'], kyc: 'Rejected' },
    { name: 'Sophie Martin', type: 'Individual', status: 'Active', city: 'Paris', country: 'France', rating: 4.9, joined: 'Jan 2026', docs: ['ID Card', 'Tour Guide Cert'], kyc: 'Verified' },
    { name: 'Global Voyages Ltd', type: 'Agency', status: 'Active', city: 'London', country: 'United Kingdom', rating: 4.5, joined: 'Feb 2026', docs: ['Full License Packet'], kyc: 'Verified' },
  ];

  const filteredGuides = context ? guides.filter(g => g.country === context.country) : guides;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h3 className="font-bold text-lg">
            {context ? `${context.country} - Guide Management` : "Guide Management"}
          </h3>
          <p className="text-xs text-slate-400 mt-1">Verify credentials for solo guides and agencies</p>
        </div>
        <div className="flex bg-warm p-1 rounded-xl">
          {['All', 'Individual', 'Agencies', 'Pending'].map((tab, i) => (
            <button key={tab} className={cn("px-4 py-2 text-xs font-bold rounded-lg transition-all", i === 0 ? "bg-white shadow-sm text-primary" : "text-slate-400 hover:text-slate-600")}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredGuides.map((guide, i) => (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} key={i} className="glass-card p-5 rounded-2xl bg-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                {guide.name[0]}
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{guide.name}</h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-slate-500 font-medium">{guide.type}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="text-xs text-slate-500 font-medium">{guide.city}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">KYC</p>
                <div className="flex items-center gap-1.5 justify-center">
                  <div className={cn("w-1.5 h-1.5 rounded-full", guide.kyc === 'Verified' ? "bg-success" : guide.kyc === 'Rejected' ? "bg-coral" : "bg-brand")} />
                  <span className="text-[10px] font-bold text-slate-700">{guide.kyc}</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Status</p>
                <span className={cn(
                  "px-3 py-1 rounded-full text-[11px] font-bold",
                  guide.status === 'Active' ? "bg-success/10 text-success" : 
                  guide.status === 'Pending' ? "bg-primary/10 text-primary" : "bg-alert/10 text-alert"
                )}>
                  {guide.status}
                </span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setSelectedGuide(guide); setKycStep(1); }} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-primary transition-colors">
                  <Eye size={18} />
                </button>
                {guide.status === 'Pending' && (
                  <button onClick={() => { setSelectedGuide(guide); setKycStep(1); }} className="px-4 py-2 rounded-xl text-sm font-bold bg-primary text-white hover:bg-primary/90 transition-all">
                    Review
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedGuide(null)} className="absolute inset-0 bg-earth/40 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative max-w-2xl w-full bg-white rounded-[40px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-warm">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-earth text-white rounded-2xl flex items-center justify-center text-xl font-black">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-earth">Robust KYC Check</h3>
                    <p className="text-sm text-slate-400">Verifying {selectedGuide.name} ({selectedGuide.type})</p>
                  </div>
                </div>
                <button onClick={() => setSelectedGuide(null)} className="p-2 hover:bg-slate-200 rounded-full"><X size={20} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-10">
                {/* Progress Tracker */}
                <div className="flex justify-between relative px-10">
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
                  {[
                    { label: 'Documents', icon: FileCheck },
                    { label: 'Agency License', icon: Globe },
                    { label: 'Security', icon: Shield },
                    { label: 'Final Audit', icon: CheckCircle2 }
                  ].map((step, i) => (
                    <div key={i} className="relative z-10 flex flex-col items-center">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500",
                        kycStep > i + 1 ? "bg-success text-white" :
                        kycStep === i + 1 ? "bg-earth text-white scale-125 shadow-lg shadow-earth/20" : "bg-white border-2 border-slate-100 text-slate-300"
                      )}>
                        {kycStep > i + 1 ? <CheckCircle2 size={20} /> : <step.icon size={20} />}
                      </div>
                      <span className={cn("text-[10px] font-bold mt-2 uppercase tracking-widest", kycStep === i + 1 ? "text-earth" : "text-slate-400")}>{step.label}</span>
                    </div>
                  ))}
                </div>

                {/* Step Content */}
                <div className="bg-warm/50 rounded-[32px] p-8 border border-earth/5">
                  {kycStep === 1 && (
                    <div className="space-y-6">
                      <h4 className="font-bold flex items-center gap-2 text-earth"><CreditCard size={18} /> Official Certification Review</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {selectedGuide.docs.map((doc: string) => (
                          <div key={doc} className="group relative aspect-video bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 hover:border-earth transition-colors cursor-pointer shadow-sm">
                            <img src={`https://picsum.photos/seed/${doc}/400/250`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all transform group-hover:scale-105" alt={doc} referrerPolicy="no-referrer" />
                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/90 backdrop-blur-sm border-t border-slate-100">
                              <p className="text-[10px] font-bold uppercase truncate text-earth">{doc}</p>
                              <div className="flex items-center gap-1 mt-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                                <span className="text-[8px] font-bold text-success uppercase">Legitimacy Confirmed</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {kycStep === 2 && (
                    <div className="space-y-6">
                      <h4 className="font-bold flex items-center gap-2 text-earth"><Globe size={18} /> Global Database Check</h4>
                      <div className="space-y-4">
                        {[
                          { l: 'INTERPOL Database Scan', s: 'CLEAN' },
                          { l: 'Tourism Authority Registry', s: 'REGISTERED' },
                          { l: 'Previous Agency History', s: 'NO DISPUTES' }
                        ].map((check, idx) => (
                          <div key={idx} className="flex justify-between items-center p-4 bg-white rounded-2xl border border-slate-100">
                            <span className="text-xs font-bold text-slate-600">{check.l}</span>
                            <span className="text-[10px] font-black text-success bg-success/10 px-3 py-1 rounded-full">{check.s}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {kycStep >= 3 && (
                    <div className="text-center py-10 space-y-6">
                      <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto">
                        <UserCheck size={40} />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-earth">Review Finalized</h4>
                        <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">This guide has passed all cross-platform verification protocols and is ready for onboarding.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-8 bg-warm border-t border-slate-100 flex gap-4">
                {kycStep < 3 ? (
                  <>
                    <button onClick={() => setKycStep(prev => Math.max(1, prev - 1))} className="px-8 py-4 rounded-2xl font-bold bg-white border border-slate-200 text-slate-400 hover:text-earth transition-all">Back</button>
                    <button onClick={() => setKycStep(prev => prev + 1)} className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2">Next Stage <ChevronRight size={18} /></button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setSelectedGuide(null)} className="flex-1 bg-white border border-alert text-alert py-4 rounded-2xl font-bold hover:bg-alert/5 transition-all">Decline & Blacklist</button>
                    <button onClick={() => setSelectedGuide(null)} className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all">Confirm Approval</button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- View: Trip Management ---
const TripManagementView = () => {
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('All');

  const trips = [
    { 
      id: 'TRP-101',
      title: 'Dune Bashing Safari', 
      guide: 'Ahmed Khan', 
      price: '$120', 
      status: 'Active', 
      isSponsored: true, 
      image: 'https://picsum.photos/seed/dune/800/500',
      description: 'Experience the thrill of the Arabian desert with a professional dune bashing team. Includes camel riding, henna painting, and a BBQ dinner under the stars.',
      itinerary: [
        '3:00 PM - Hotel Pickup',
        '4:30 PM - Dune Bashing Session',
        '6:00 PM - Sunset Photography',
        '7:30 PM - Bedouin Camp Dinner',
        '9:30 PM - Return to Hotel'
      ],
      tags: ['Adventure', 'Desert', 'Cultural']
    },
    { 
      id: 'TRP-102',
      title: 'Illegal Night Hunting', 
      guide: 'Suspicious Guide', 
      price: '$500', 
      status: 'Flagged', 
      isSponsored: false, 
      image: 'https://picsum.photos/seed/night/800/500',
      description: 'A secretive nighttime expedition into restricted wildlife zones. High stakes and definitely outside of local heritage laws.',
      itinerary: ['Unauthorized entry to protected zones', 'Wildlife tracking'],
      tags: ['Danger', 'Unauthorized']
    },
    { 
      id: 'TRP-103',
      title: 'Paris Private Museum Tour', 
      guide: 'Sophie Martin', 
      price: '$85', 
      status: 'Active', 
      isSponsored: true, 
      image: 'https://picsum.photos/seed/paris/800/500',
      description: 'Skip the lines at the Louvre and Musée d\'Orsay with a licensed art historian. Discover hidden masterpieces and the stories behind them.',
      itinerary: [
        '9:00 AM - Meet at Louvre entrance',
        '10:30 AM - Coffee break at Le Café Marly',
        '11:00 AM - Musée d\'Orsay highlights',
        '1:00 PM - Walking tour of Tuileries Garden'
      ],
      tags: ['History', 'Art', 'Walking']
    },
  ];

  const filteredTrips = activeTab === 'All' ? trips : trips.filter(t => t.status.toLowerCase().includes(activeTab.toLowerCase().split(' ')[0]));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex bg-warm p-1 rounded-xl">
          {['All', 'Flagged', 'Awaiting'].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-6 py-2 text-xs font-bold rounded-lg transition-all",
                activeTab === tab ? "bg-white shadow-sm text-primary" : "text-slate-500 hover:text-slate-900"
              )}
            >
              {tab === 'All' ? 'All Listings' : tab === 'Awaiting' ? 'Awaiting Review' : tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTrips.map((trip, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-3xl overflow-hidden flex flex-col bg-white border-none shadow-xl shadow-slate-200/40"
          >
            <div className="relative h-48">
              <img src={trip.image} className="w-full h-full object-cover" alt={trip.title} />
              <div className="absolute top-4 left-4 flex gap-2">
                {trip.isSponsored && (
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand text-white shadow-lg shadow-brand/20">
                    Sponsored
                  </span>
                )}
              </div>
              <div className="absolute top-4 right-4">
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                  trip.status === 'Active' ? "bg-success text-white" : "bg-alert text-white"
                )}>
                  {trip.status}
                </span>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h4 className="font-bold text-lg mb-1 text-earth truncate">{trip.title}</h4>
              <div className="flex items-center gap-2 text-slate-500 text-xs mb-4">
                <span>By {trip.guide}</span>
                <span>•</span>
                <span className="font-bold text-brand">{trip.price}</span>
              </div>
              <div className="flex gap-2 mt-auto">
                <button 
                  onClick={() => setSelectedTrip(trip)}
                  className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-700 py-3 rounded-2xl text-xs font-bold transition-all border border-slate-100"
                >
                  Review Details
                </button>
                {trip.status === 'Flagged' && (
                  <button className="flex-1 bg-alert/10 text-alert hover:bg-alert/20 py-3 rounded-2xl text-xs font-bold transition-all">
                    Remove Listing
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedTrip && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-12">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSelectedTrip(null)}
              className="absolute inset-0 bg-earth/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative max-w-4xl w-full bg-white rounded-[40px] overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh]"
            >
              <div className="lg:w-1/2 relative bg-slate-100 min-h-[300px] lg:min-h-full">
                <img src={selectedTrip.image} className="w-full h-full object-cover" alt={selectedTrip.title} />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-earth font-black rounded-2xl shadow-xl text-sm italic">{selectedTrip.id}</span>
                </div>
              </div>
              
              <div className="lg:w-1/2 flex flex-col h-full bg-white max-h-[60vh] lg:max-h-full overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex justify-between items-start bg-warm/30 sticky top-0 bg-white z-10">
                  <div>
                    <h3 className="text-2xl font-black text-earth tracking-tight">{selectedTrip.title}</h3>
                    <p className="text-sm text-slate-400 font-medium mt-1">Listing by <span className="text-primary font-bold">{selectedTrip.guide}</span></p>
                  </div>
                  <button onClick={() => setSelectedTrip(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400"><X size={20} /></button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                  <div className="flex flex-wrap gap-2">
                    {selectedTrip.tags.map((tag: string) => (
                      <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-bold uppercase tracking-widest">{tag}</span>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-earth flex items-center gap-2"><Map size={16} /> Trip Overview</h4>
                    <p className="text-sm text-slate-600 leading-relaxed bg-warm/20 p-5 rounded-3xl border border-earth/5">{selectedTrip.description}</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-earth flex items-center gap-2"><Clock size={16} /> Experience Itinerary</h4>
                    <div className="space-y-3 pl-4 border-l-2 border-primary/20">
                      {selectedTrip.itinerary.map((item: string, i: number) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                          <p className="text-sm text-slate-600 font-medium">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-warm/50 border-t border-slate-100 flex gap-4 sticky bottom-0 bg-white">
                  <button 
                    onClick={() => setSelectedTrip(null)}
                    className="flex-1 bg-white border border-alert/20 text-alert py-4 rounded-2xl font-bold hover:bg-alert/5 transition-all shadow-sm"
                  >
                    Flag: Needs Revision
                  </button>
                  <button 
                    onClick={() => setSelectedTrip(null)}
                    className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                  >
                    Deploy & Approve Experience <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- View: Bookings ---
const BookingsView = () => {
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const bookings = [
    { id: '#BK-8821', user: 'John Doe', guide: 'Ahmed Khan', services: ['Tour', 'Ride'], amount: '$240.00', status: 'Active', 
      breakdown: { trip: '$150.00', ride: '$90.00', accommodation: '$0.00', fees: '$36.00' } },
    { id: '#BK-9902', user: 'Jane Smith', guide: 'Sophie Martin', services: ['Tour'], amount: '$85.00', status: 'Completed',
      breakdown: { trip: '$85.00', ride: '$0.00', accommodation: '$0.00', fees: '$12.75' } },
    { id: '#BK-7741', user: 'Mike Ross', guide: 'Global Voyages', services: ['Tour', 'Stay', 'Ride'], amount: '$1200.00', status: 'Canceled',
      breakdown: { trip: '$300.00', ride: '$100.00', accommodation: '$800.00', fees: '$180.00' } },
  ];

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-3xl overflow-hidden border-none shadow-xl shadow-slate-200/40 bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Order ID</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">User / Guide</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Services</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Amount</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Status</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {bookings.map((booking, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                <td className="p-6">
                  <span className="font-mono text-xs font-bold text-slate-400">{booking.id}</span>
                </td>
                <td className="p-6">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900">{booking.user}</span>
                    <span className="text-[10px] text-slate-400 font-medium italic">with {booking.guide}</span>
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex gap-1.5 flex-wrap">
                    {booking.services.map(s => (
                      <span key={s} className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase">
                        {s}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-6">
                  <span className="text-sm font-black text-primary">{booking.amount}</span>
                </td>
                <td className="p-6">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                    booking.status === 'Active' ? "bg-brand/10 text-brand" :
                    booking.status === 'Completed' ? "bg-success/10 text-success" : "bg-coral/10 text-coral"
                  )}>
                    {booking.status}
                  </span>
                </td>
                <td className="p-6">
                  <button 
                    onClick={() => setSelectedBooking(booking)}
                    className="p-2 hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-slate-100 transition-all text-slate-400 hover:text-primary"
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-12">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSelectedBooking(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative max-w-lg w-full bg-white rounded-[32px] overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h3 className="text-lg font-bold">Booking Details</h3>
                  <p className="text-xs text-slate-400 font-mono">{selectedBooking.id}</p>
                </div>
                <button onClick={() => setSelectedBooking(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X size={20} /></button>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4 gap-y-6">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Customer</p>
                    <p className="text-sm font-bold">{selectedBooking.user}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Guide</p>
                    <p className="text-sm font-bold">{selectedBooking.guide}</p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-200 pb-2">Price Breakdown</p>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 font-medium">Trip Price</span>
                      <span className="font-bold">{selectedBooking.breakdown.trip}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 font-medium">Ride Hosting</span>
                      <span className="font-bold">{selectedBooking.breakdown.ride}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 font-medium">Accomodation</span>
                      <span className="font-bold">{selectedBooking.breakdown.accommodation}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-3 border-t border-slate-200 text-primary">
                      <span className="font-bold uppercase tracking-wider text-xs">Total Amount</span>
                      <span className="font-black text-lg">{selectedBooking.amount}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-3">
                <button 
                  onClick={() => setSelectedBooking(null)}
                  className="flex-1 bg-white border border-slate-200 py-3 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all"
                >
                  Close View
                </button>
                <button 
                  onClick={() => setSelectedBooking(null)}
                  className="flex-1 bg-slate-900 text-white py-3 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all"
                >
                  Download Invoice
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- View: Payments ---
const PaymentsView = () => {
  const [metricType, setMetricType] = useState<'net' | 'fees'>('net');
  
  return (
  <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-8 rounded-[40px] bg-earth text-white border-none shadow-2xl shadow-earth/30 relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/50">Total Payments</p>
              <div className="flex bg-white/10 p-1 rounded-xl">
                <button 
                  onClick={() => setMetricType('net')}
                  className={cn("px-3 py-1 rounded-lg text-[9px] font-black uppercase transition-all", metricType === 'net' ? "bg-white text-earth shadow-lg" : "text-white/40 hover:text-white")}
                >
                  Net
                </button>
                <button 
                  onClick={() => setMetricType('fees')}
                  className={cn("px-3 py-1 rounded-lg text-[9px] font-black uppercase transition-all", metricType === 'fees' ? "bg-white text-earth shadow-lg" : "text-white/40 hover:text-white")}
                >
                  Fees (Commission)
                </button>
              </div>
            </div>
            <h2 className="text-4xl font-black mb-6 tracking-tighter">
              {metricType === 'net' ? '$185,420.00' : '$32,150.00'}
            </h2>
            <div className="flex justify-between items-end">
              <div className="text-[10px] font-black bg-white/20 px-3 py-1.5 rounded-xl border border-white/10 uppercase tracking-widest">Global Aggregate</div>
              <Activity size={32} className="text-white/20" />
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all" />
        </div>
        <div className="glass-card p-6 rounded-3xl border-none shadow-xl shadow-slate-200/40 flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Pending Releases</p>
            <h2 className="text-2xl font-black text-primary">12 Transactions</h2>
          </div>
          <button className="w-full bg-primary text-white py-3 rounded-2xl text-xs font-bold hover:bg-primary/90 transition-all">
            Manage Queue
          </button>
        </div>
        <div className="glass-card p-6 rounded-3xl border-none shadow-xl shadow-slate-200/40 flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Refund Requests</p>
            <h2 className="text-2xl font-black text-coral">3 Open</h2>
          </div>
          <button className="w-full bg-coral/10 text-coral border border-coral/20 py-3 rounded-2xl text-xs font-bold hover:bg-coral/20 transition-all">
            Review Requests
          </button>
        </div>
      </div>

    <div className="glass-card rounded-3xl overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
        <h3 className="font-bold text-lg">Transaction History</h3>
        <button className="text-primary text-sm font-bold hover:underline">Export CSV</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Date</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Booking</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Amount</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Fee (15%)</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Net</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[1, 2, 3, 4, 5].map(i => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-6 text-xs text-slate-500 font-medium">Apr 21, 14:02</td>
                <td className="p-6 text-sm font-bold text-slate-900">#BK-882{i}</td>
                <td className="p-6 text-sm font-medium text-slate-600">$200.00</td>
                <td className="p-6 text-sm font-medium text-orange-600">$30.00</td>
                <td className="p-6 text-sm font-black text-green-600">$170.00</td>
                <td className="p-6">
                  <button className="text-primary font-bold text-xs hover:underline">Release Funds</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
};

// --- View: Dispute Management ---
const DisputeManagementView = () => {
  const [selectedCase, setSelectedCase] = useState<any>({ id: 'DP-001', user: 'John Doe', guide: 'Ahmed Khan', status: 'Open', lastMessage: 'The guide never showed up at the meeting point.' });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-200px)]">
      <div className="glass-card rounded-3xl overflow-hidden flex flex-col border-none shadow-xl shadow-slate-200/40 bg-white">
        <div className="p-6 border-b border-slate-100 bg-white flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg text-earth">Evidence Vault</h3>
            <p className="text-xs text-slate-400 mt-1">Review traveler/partner proof</p>
          </div>
          <span className="bg-coral/10 text-coral text-[10px] font-black px-2 py-1 rounded">4 QUEUED</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-warm/20">
          {[
            { id: 'DP-001', user: 'John Doe', guide: 'Ahmed Khan', status: 'High Priority', lastMessage: 'The guide never showed up at the meeting point.' },
            { id: 'DP-002', user: 'Mike Ross', guide: 'Safari Pro', status: 'Pending Review', lastMessage: 'Vehicle was in poor condition and broke down.' },
            { id: 'DP-003', user: 'Lara Croft', guide: 'Temple Tours', status: 'Awaiting Guide', lastMessage: 'Tour duration was 2 hours less than advertised.' },
          ].map((caseItem, i) => (
            <div 
              key={i} 
              onClick={() => setSelectedCase(caseItem)}
              className={cn(
              "p-5 rounded-[24px] border transition-all cursor-pointer bg-white group",
              selectedCase?.id === caseItem.id ? "border-primary shadow-2xl shadow-primary/5 scale-[1.02]" : "border-earth/5 hover:border-slate-200"
            )}>
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-black text-primary px-3 py-1 bg-warm rounded-lg tracking-widest">{caseItem.id}</span>
                <span className={cn(
                  "text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded",
                  caseItem.id === 'DP-001' ? "bg-coral text-white" : "bg-earth/10 text-earth"
                )}>{caseItem.status}</span>
              </div>
              <h4 className="text-sm font-black text-earth leading-tight">{caseItem.user} <span className="text-slate-300 font-medium mx-1">vs</span> {caseItem.guide}</h4>
              <p className="text-xs text-slate-500 mt-3 line-clamp-2 leading-relaxed italic">"{caseItem.lastMessage}"</p>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2 glass-card rounded-3xl overflow-hidden flex flex-col border-none shadow-xl shadow-slate-200/40 bg-white relative">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10 shadow-sm shadow-slate-500/5">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-warm flex items-center justify-center font-black text-earth border-2 border-white shadow-xl">JD</div>
            <div>
              <h4 className="text-lg font-black text-earth tracking-tight">Adjudication Detail: John Doe</h4>
              <p className="text-xs text-slate-400 font-medium flex items-center gap-2">
                <Activity size={14} className="text-coral" /> Active Mediation Thread
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="bg-coral text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-coral/90 shadow-xl shadow-coral/20">Full Refund</button>
            <button className="bg-earth text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-earth/90 shadow-xl shadow-earth/20">Rule for Partner</button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-10 space-y-8 bg-warm/10">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black flex-none">U</div>
            <div className="bg-white p-6 rounded-3xl rounded-tl-none shadow-xl border border-earth/5 max-w-[85%]">
              <p className="text-[10px] text-primary font-black mb-2 uppercase tracking-widest">Traveler: John Doe</p>
              <p className="text-sm text-earth leading-relaxed font-medium">
                The guide Ahmed hasn't arrived at the Burj Khalifa entrance. I've been waiting for nearly an hour and he's not picking up my calls. See attached evidence of my presence at the location.
              </p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="aspect-square bg-slate-200 rounded-2xl overflow-hidden relative group cursor-pointer">
                  <div className="absolute inset-0 bg-earth/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye size={20} className="text-white" />
                  </div>
                  <img src="https://picsum.photos/seed/evid1/200/200" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square bg-slate-200 rounded-2xl overflow-hidden relative group cursor-pointer text-slate-400 flex flex-col items-center justify-center border-2 border-dashed border-slate-300">
                   <MapPin size={24} />
                   <span className="text-[8px] font-black mt-2">TIMESTAMPED_GPS.LOG</span>
                </div>
              </div>
              <span className="text-[9px] font-bold text-slate-300 mt-4 block tracking-widest uppercase">STAMP: APR 25, 10:30 AM</span>
            </div>
          </div>
          <div className="flex gap-4 flex-row-reverse">
            <div className="w-10 h-10 rounded-xl bg-brand text-white flex items-center justify-center font-black flex-none">P</div>
            <div className="bg-brand/5 p-6 rounded-3xl rounded-tr-none shadow-xl border border-brand/10 max-w-[85%] text-right">
              <p className="text-[10px] text-brand font-black mb-2 uppercase tracking-widest text-right">Partner: Ahmed Khan</p>
              <p className="text-sm text-earth leading-relaxed font-medium">
                I am so sorry, I had a flat tire on the way. I tried messaging but my data was patchy. I am arriving in 10 mins.
              </p>
              <span className="text-[9px] font-bold text-slate-300 mt-4 block tracking-widest uppercase">STAMP: APR 25, 10:45 AM</span>
            </div>
          </div>
        </div>

        <div className="p-8 border-t border-slate-100 bg-white">
          <div className="flex gap-4 items-center bg-warm/50 p-3 rounded-2xl border border-earth/5">
            <input 
              type="text" 
              placeholder="Post Adjudication Notice / Moderator Intervenstion..." 
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm px-4 font-medium"
            />
            <button className="bg-earth text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-earth/90 transition-all shadow-xl shadow-earth/20">Send Directive</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- View: Emergency Response ---
const EmergencyResponseView = () => {
  const [selectedSOS, setSelectedSOS] = useState<any>({ id: 'SOS-882', user: 'Sarah Green', guide: 'Ahmed Khan', location: 'Merzouga Desert, Morocco', status: 'Critical', phone: '+212 600 000 000' });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/40 border border-coral/10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black text-earth flex items-center gap-2 uppercase tracking-tighter">
              <Siren className="text-coral animate-[pulse_1s_infinite]" size={24} /> Active SOS Feed
            </h3>
            <span className="bg-coral text-white text-[10px] font-black px-3 py-1 rounded-full animate-bounce">1 ACTIVE</span>
          </div>
          <div className="space-y-4">
            {[
              { id: 'SOS-882', user: 'Sarah Green', location: 'Merzouga, Morocco', time: '2m ago', level: 'Critical' },
              { id: 'SOS-812', user: 'Alex Wong', location: 'Dubai Mall, UAE', time: '4h ago', level: 'Resolved' },
            ].map((sos, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedSOS(sos)}
                className={cn(
                "p-5 rounded-3xl border cursor-pointer transition-all",
                selectedSOS?.id === sos.id ? "bg-coral text-white border-coral shadow-2xl shadow-coral/30" : "bg-warm/30 border-earth/5 hover:border-coral/20"
              )}>
                <div className="flex justify-between mb-3">
                  <span className={cn("text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded", selectedSOS?.id === sos.id ? "bg-white/20" : "bg-coral/10 text-coral")}>{sos.id}</span>
                  <span className="text-[9px] font-bold">{sos.time}</span>
                </div>
                <h4 className="font-black text-sm">{sos.user}</h4>
                <p className={cn("text-[10px] font-medium mt-1 flex items-center gap-1", selectedSOS?.id === sos.id ? "text-white/70" : "text-slate-400")}>
                  <Map size={10} /> {sos.location}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-earth p-8 rounded-[32px] text-white space-y-6 shadow-2xl shadow-earth/20">
          <h4 className="text-lg font-black tracking-tight leading-none">Duty Officer on Call</h4>
          <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-brand text-white flex items-center justify-center font-black">JK</div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-white/60">James Knight</p>
              <p className="text-[10px] font-medium text-brand">Senior Response Manager</p>
            </div>
          </div>
          <button className="w-full bg-white text-earth py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-black/20 hover:scale-[1.02] transition-all">
            Assign Backup Office
          </button>
        </div>
      </div>

      <div className="lg:col-span-2 glass-card rounded-[40px] overflow-hidden bg-white shadow-2xl shadow-slate-200/40 border-none flex flex-col min-h-[600px]">
        {selectedSOS ? (
          <>
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-coral/10 text-coral flex items-center justify-center font-black shadow-xl">SOS</div>
                <div>
                  <h3 className="text-2xl font-black text-earth tracking-tight">SOS Trigger: {selectedSOS.user}</h3>
                  <p className="text-sm font-medium text-slate-400 mt-1">Live tracking active via Manjaro Safety Protocol</p>
                </div>
              </div>
              <div className="flex gap-2">
                 <button className="bg-coral text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-coral/20">Emergency Dispatch</button>
              </div>
            </div>

            <div className="flex-1 p-8 space-y-8 bg-warm/10 relative overflow-hidden">
               {/* Live Tracking Map Mockup */}
               <div className="h-64 bg-slate-900 rounded-[32px] relative overflow-hidden shadow-2xl border-4 border-white">
                  <div className="absolute inset-0 opacity-40 grayscale blur-[1px]">
                     <img src="https://picsum.photos/seed/map-emergency/800/400" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-coral/20 rounded-full animate-ping" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-coral border-2 border-white rounded-full shadow-[0_0_20px_#FB5607]" />
                  <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl">
                     <p className="text-[10px] font-black uppercase text-earth tracking-widest mb-1">Last Known Loc</p>
                     <p className="text-sm font-bold text-coral leading-none tracking-tight">31.0234, -4.0123 (60m ago)</p>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-6">
                 <div className="bg-white p-6 rounded-3xl shadow-xl border border-earth/5 space-y-4">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Associated Traveler</h5>
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-warm flex items-center justify-center font-black">SG</div>
                       <div>
                          <p className="text-sm font-black text-earth leading-none">Sarah Green</p>
                          <p className="text-[10px] font-medium text-slate-400 mt-1">{selectedSOS.phone}</p>
                       </div>
                    </div>
                 </div>
                 <div className="bg-white p-6 rounded-3xl shadow-xl border border-earth/5 space-y-4">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Guide</h5>
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-warm flex items-center justify-center font-black">AK</div>
                       <div>
                          <p className="text-sm font-black text-earth leading-none">Ahmed Khan</p>
                          <p className="text-[10px] font-medium text-slate-400 mt-1">+971 772 399 221</p>
                       </div>
                    </div>
                 </div>
               </div>

               <div className="p-6 bg-coral/10 rounded-3xl border border-coral/20 flex items-start gap-4">
                  <AlertTriangle className="text-coral shrink-0" size={24} />
                  <div>
                     <h5 className="text-sm font-black text-coral uppercase tracking-widest mb-1">Safety Intelligence Notice</h5>
                     <p className="text-xs text-earth/80 font-medium leading-relaxed">
                        User Sarah G. triggered SOS manually via the App. Voice connection attempt failed after 3s. Panic signal detected. Local law enforcement in Merzouga has been pinged.
                     </p>
                  </div>
               </div>
            </div>

            <div className="p-8 border-t border-slate-100 bg-white flex gap-4">
               <button className="flex-1 bg-warm text-earth py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all">Close as Resolved</button>
               <button className="flex-1 bg-earth text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-earth/20 hover:bg-earth/90 transition-all">Escalate to Legal</button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-20 opacity-30">
            <ShieldAlert size={64} className="mb-4 text-slate-300" />
            <h4 className="text-xl font-bold text-slate-400">No SOS Selected</h4>
            <p className="text-sm text-slate-400 mt-2">Select an active emergency from the feed to initiate safety protocol</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- View: Global Compliance & Banning ---
const ComplianceView = () => {
  const [policyType, setPolicyType] = useState<'privacy' | 'terms'>('privacy');
  const [region, setRegion] = useState('United Arab Emirates (Home)');
  const [forceReaccept, setForceReaccept] = useState(false);
  const [version, setVersion] = useState('2.4.1');
  const [isDeploying, setIsDeploying] = useState(false);

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      alert(`${policyType === 'privacy' ? 'Privacy Policy' : 'Terms of Use'} v${version} has been deployed and ${forceReaccept ? 'force-pushed to all users' : 'updates applied'} for ${region}.`);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
       {/* Policy Editor */}
       <div className="glass-card p-10 rounded-[40px] bg-white border-none shadow-xl shadow-slate-200/40 space-y-8 flex flex-col">
          <div className="flex justify-between items-start">
             <div>
                <h3 className="text-xl font-black text-earth tracking-tight">Global Compliance Engine</h3>
                <p className="text-sm font-medium text-slate-400 mt-2">Manage legal frameworks and mandatory user agreements.</p>
             </div>
             <ShieldAlert className="text-primary/20" size={32} />
          </div>

          <div className="flex gap-2 p-1.5 bg-warm/50 rounded-2xl border border-earth/5">
            <button 
              onClick={() => setPolicyType('privacy')}
              className={cn(
                "flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                policyType === 'privacy' ? "bg-earth text-white shadow-lg" : "text-slate-400 hover:text-earth"
              )}
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => setPolicyType('terms')}
              className={cn(
                "flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                policyType === 'terms' ? "bg-earth text-white shadow-lg" : "text-slate-400 hover:text-earth"
              )}
            >
              Terms of Use
            </button>
          </div>
 
          <div className="space-y-6 flex-1">
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Target Region</label>
                   <select 
                     value={region}
                     onChange={(e) => setRegion(e.target.value)}
                     className="w-full px-5 py-3 bg-warm/30 border-none rounded-xl text-xs font-bold text-earth"
                   >
                      <option>United Arab Emirates (Home)</option>
                      <option>European Economic Area (GDPR)</option>
                      <option>Nigeria (Local Tourism Act)</option>
                      <option>Morocco (Heritage Protection)</option>
                   </select>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Policy Version</label>
                   <input 
                     type="text" 
                     value={version}
                     onChange={(e) => setVersion(e.target.value)}
                     className="w-full px-5 py-3 bg-warm/30 border-none rounded-xl text-xs font-bold text-earth"
                     placeholder="e.g. 2.4.1"
                   />
                </div>
             </div>

             <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Document Content (Markdown Supported)</label>
                <textarea 
                  className="w-full h-64 px-6 py-6 bg-warm/30 border-none rounded-[32px] text-sm font-medium text-slate-600 leading-relaxed focus:ring-4 focus:ring-primary/10"
                  defaultValue={policyType === 'privacy' ? 
                    "# Privacy Policy v2.4.1\n\nManjaro Global is committed to protecting your personal data. We collect information to provide better services to all our users...\n\n1. Data Collection\n2. How we use data\n3. Regional GDPR addendums..." :
                    "# Terms of Use v1.12.5\n\nBy using Manjaro, you agree to these legal terms. All bookings are subject to our escrow protection protocol...\n\n1. User Responsibility\n2. Service Fees & Payments\n3. Cancellation Policy..."
                  }
                />
             </div>

             <div className="flex items-center gap-4 p-5 bg-primary/5 rounded-2xl border border-primary/10">
                <div className="flex-1">
                   <h4 className="text-xs font-black text-earth uppercase tracking-tight">Force Re-acceptance</h4>
                   <p className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">Require all users in this region to review and accept the new terms before next login.</p>
                </div>
                <button 
                  onClick={() => setForceReaccept(!forceReaccept)}
                  className={cn(
                    "w-12 h-6 rounded-full p-1 transition-all duration-300",
                    forceReaccept ? "bg-primary" : "bg-slate-200"
                  )}
                >
                  <div className={cn("w-4 h-4 bg-white rounded-full transition-all duration-300", forceReaccept ? "translate-x-6" : "translate-x-0")} />
                </button>
             </div>

             <button 
               onClick={handleDeploy}
               disabled={isDeploying}
               className={cn(
                 "w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-3",
                 isDeploying ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-earth text-white shadow-earth/20 hover:bg-earth/90 active:scale-95"
               )}
             >
                {isDeploying ? (
                  <RefreshCw className="animate-spin" size={20} />
                ) : (
                  <FileText size={20} />
                )}
                {isDeploying ? 'Deploying Changes...' : 'Push Policy Update'}
             </button>
          </div>
       </div>
 
       {/* Right Column: Banning & Snapshot */}
       <div className="space-y-8 flex flex-col">
          <div className="glass-card p-10 rounded-[40px] bg-white border-none shadow-xl shadow-slate-200/40 space-y-8">
             <div>
                <h3 className="text-xl font-black text-earth tracking-tight">Access Control & Sanitization</h3>
                <p className="text-sm font-medium text-slate-400 mt-2">Manage platform-wide bans for rogue identities and non-compliant actors.</p>
             </div>
             
             <div className="flex gap-4">
                <input type="text" placeholder="IP, Email, or Device ID..." className="flex-1 px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold placeholder:text-slate-300" />
                <button className="bg-coral text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-coral/20 hover:opacity-90 active:scale-95 transition-all">Ban ID</button>
             </div>
 
             <div className="space-y-3">
                {[
                  { target: 'scammer_88@mal.com', reason: 'Payment Fraud', date: 'Apr 20', risk: 'High' },
                  { target: '45.120.21.99', reason: 'IP Brute Force', date: 'Apr 18', risk: 'Critical' },
                  { target: 'bot_runner_04', reason: 'API Scraping', date: 'Apr 15', risk: 'Medium' },
                ].map((ban, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-warm/30 rounded-2xl border border-earth/5 hover:bg-white hover:shadow-lg transition-all">
                     <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          ban.risk === 'Critical' ? "bg-coral animate-pulse" : ban.risk === 'High' ? "bg-orange-500" : "bg-yellow-500"
                        )} />
                        <div>
                           <p className="text-sm font-black text-earth leading-none">{ban.target}</p>
                           <p className="text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-widest">{ban.reason} • {ban.date}</p>
                        </div>
                     </div>
                     <button className="text-slate-300 hover:text-earth transition-colors p-2 rounded-xl hover:bg-slate-50"><Unlock size={18} /></button>
                  </div>
                ))}
             </div>
          </div>
 
          <div className="bg-brand p-10 rounded-[40px] text-white shadow-2xl shadow-brand/20 relative overflow-hidden flex-1 flex flex-col justify-center">
             <div className="relative z-10 space-y-8">
                <h3 className="text-xl font-black border-b-4 border-white/20 pb-4 inline-block">Integrity Pulse</h3>
                <div className="grid grid-cols-2 gap-12">
                   <div className="space-y-1">
                      <h4 className="text-5xl font-black tracking-tighter italic">24</h4>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-white opacity-50" />
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Global Hard Bans</p>
                      </div>
                   </div>
                   <div className="space-y-1">
                      <h4 className="text-5xl font-black tracking-tighter italic">99.8%</h4>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-white opacity-50" />
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Policy Compliance</p>
                      </div>
                   </div>
                </div>
                <div className="pt-4 flex gap-3">
                  <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Audit Logs</button>
                  <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Export Report</button>
                </div>
             </div>
             <Activity className="absolute -right-8 -bottom-8 w-48 h-48 text-white/5 rotate-12" />
          </div>
       </div>
    </div>
  );
};

// --- View: Content Moderation ---

// --- View: User Management ---
const UserManagementView = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div>
        <h3 className="font-bold text-lg">User Management</h3>
        <p className="text-xs text-slate-400 mt-1">View and manage all registered platform users</p>
      </div>
      <button className="bg-primary text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary/90 shadow-lg shadow-primary/20">
        <Users size={18} /> Export Users
      </button>
    </div>

    <div className="glass-card rounded-3xl overflow-hidden border-none shadow-xl shadow-slate-200/40 bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/50 border-b border-slate-100">
            <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">User Details</th>
            <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Role</th>
            <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Status</th>
            <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Last Activity</th>
            <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {[
            { name: 'Fatima Al', email: 'fatima@example.com', role: 'User', status: 'Active', activity: '2 mins ago' },
            { name: 'Alex Wong', email: 'alex@example.com', role: 'Guide', status: 'Pending', activity: '15 mins ago' },
            { name: 'Sarah Green', email: 'sarah@example.com', role: 'User', status: 'Banned', activity: '2 days ago' },
            { name: 'David Smith', email: 'david@example.com', role: 'User', status: 'Active', activity: '1 hour ago' },
          ].map((user, i) => (
            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
              <td className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold">{user.name[0]}</div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{user.name}</p>
                    <p className="text-[10px] text-slate-400">{user.email}</p>
                  </div>
                </div>
              </td>
              <td className="p-6 text-xs font-medium text-slate-600">{user.role}</td>
              <td className="p-6">
                <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                  user.status === 'Active' ? "bg-success/10 text-success" : 
                  user.status === 'Pending' ? "bg-brand/10 text-brand" : "bg-alert/10 text-alert"
                )}>
                  {user.status}
                </span>
              </td>
              <td className="p-6 text-xs text-slate-400">{user.activity}</td>
              <td className="p-6">
                <button className="text-primary font-bold text-xs hover:underline">View Profile</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// --- View: Driver Management ---
const DriverManagementView = ({ context }: { context?: { country: string } }) => {
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const [kycStep, setKycStep] = useState(1);

  const drivers = [
    { id: 'DRV-001', name: 'John Silva', vehicle: 'Toyota Camry 2024', color: 'Midnight Black', status: 'Active', country: 'UAE', phone: '+971 50 123 4567', joined: 'Apr 10, 2026', kyc: 'Verified' },
    { id: 'DRV-002', name: 'Mario Rossi', vehicle: 'Mercedes V-Class', color: 'Silver Metallic', status: 'Pending', country: 'UAE', phone: '+971 52 987 6543', joined: 'Apr 25, 2026', kyc: 'In Review' },
    { id: 'DRV-003', name: 'Alain Prost', vehicle: 'Tesla Model 3', color: 'Pearl White', status: 'Suspended', country: 'France', phone: '+33 61 234 5678', joined: 'Jan 15, 2026', kyc: 'Rejected' },
    { id: 'DRV-004', name: 'Lewis Hamilton', vehicle: 'Range Rover Sport', color: 'Deep Red', status: 'Active', country: 'United Kingdom', phone: '+44 77 000 0000', joined: 'Feb 20, 2026', kyc: 'Verified' },
    { id: 'DRV-005', name: 'Kipchoge Keino', vehicle: 'Nissan X-Trail', color: 'White', status: 'Active', country: 'Kenya', phone: '+254 700 111 222', joined: 'Mar 12, 2026', kyc: 'Verified' },
  ];

  const filteredDrivers = context ? drivers.filter(d => d.country === context.country) : drivers;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h3 className="font-bold text-lg">
            {context ? `${context.country} - Ride Management` : "Ride Management"}
          </h3>
          <p className="text-xs text-slate-400 mt-1">Manage driver onboarding and vehicle verification</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary/90 shadow-lg shadow-primary/20">
          <Car size={18} /> Onboard New Driver
        </button>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden border-none shadow-xl shadow-slate-200/40 bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Driver / Vehicle</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Contact / ID</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">KYC Status</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Status</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredDrivers.map((driver, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {driver.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{driver.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{driver.vehicle} • {driver.color}</p>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-slate-600">{driver.phone}</span>
                    <span className="text-[10px] font-mono text-slate-300 uppercase">{driver.id}</span>
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "w-2 h-2 rounded-full",
                      driver.kyc === 'Verified' ? "bg-success" :
                      driver.kyc === 'In Review' ? "bg-brand" : "bg-alert"
                    )} />
                    <span className="text-xs font-bold text-slate-700">{driver.kyc}</span>
                  </div>
                </td>
                <td className="p-6">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-bold tracking-wider",
                    driver.status === 'Active' ? "bg-success/10 text-success" :
                    driver.status === 'Pending' ? "bg-brand/10 text-brand" : "bg-alert/10 text-alert"
                  )}>
                    {driver.status}
                  </span>
                </td>
                <td className="p-6">
                  <div className="flex gap-2">
                    {driver.status === 'Pending' ? (
                      <button 
                        onClick={() => { setSelectedDriver(driver); setKycStep(1); }}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary/90 transition-all shadow-md shadow-primary/10"
                      >
                        Review
                      </button>
                    ) : (
                      <button 
                        onClick={() => { setSelectedDriver(driver); setKycStep(1); }}
                        className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-100 text-slate-400 hover:text-primary transition-all"
                      >
                        <Eye size={18} />
                      </button>
                    )}
                    <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-100 text-slate-400 hover:text-alert transition-all">
                      <XCircle size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {selectedDriver && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedDriver(null)} className="absolute inset-0 bg-earth/40 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative max-w-2xl w-full bg-white rounded-[40px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-warm">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-earth text-white rounded-2xl flex items-center justify-center text-xl font-black">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-earth">Robust KYC Check</h3>
                    <p className="text-sm text-slate-400">Verifying {selectedDriver.name}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedDriver(null)} className="p-2 hover:bg-slate-200 rounded-full"><X size={20} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-10">
                {/* Progress Tracker */}
                <div className="flex justify-between relative px-10">
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
                  {[
                    { label: 'Identity', icon: UserCog },
                    { label: 'Vehicle', icon: Car },
                    { label: 'Biometrics', icon: Smartphone },
                    { label: 'Background', icon: Shield }
                  ].map((step, i) => (
                    <div key={i} className="relative z-10 flex flex-col items-center">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500",
                        kycStep > i + 1 ? "bg-success text-white" :
                        kycStep === i + 1 ? "bg-earth text-white scale-125 shadow-lg shadow-earth/20" : "bg-white border-2 border-slate-100 text-slate-300"
                      )}>
                        {kycStep > i + 1 ? <CheckCircle2 size={20} /> : <step.icon size={20} />}
                      </div>
                      <span className={cn(
                        "text-[10px] font-bold mt-2 uppercase tracking-widest",
                        kycStep === i + 1 ? "text-earth" : "text-slate-400"
                      )}>{step.label}</span>
                    </div>
                  ))}
                </div>

                {/* Step Content */}
                <div className="bg-warm/50 rounded-[32px] p-8 border border-earth/5">
                  {kycStep === 1 && (
                    <div className="space-y-6">
                      <h4 className="font-bold flex items-center gap-2 text-earth"><FileCheck size={18} /> Government ID Verification</h4>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="aspect-video bg-slate-200 rounded-2xl overflow-hidden relative group">
                            <img src="https://picsum.photos/seed/id-front/400/250" className="w-full h-full object-cover" alt="ID Front" />
                            <div className="absolute inset-0 bg-earth/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="bg-white text-earth px-4 py-2 rounded-xl text-xs font-bold">View Fullscreen</button>
                            </div>
                          </div>
                          <p className="text-[10px] font-bold text-center text-slate-400 uppercase">Passport / National ID Front</p>
                        </div>
                        <div className="space-y-4 text-sm text-slate-600 font-medium border-l border-slate-100 pl-6">
                          <p>Full Name matches profile: <span className="text-success font-bold ml-2">YES</span></p>
                          <p>Expiry Date valid: <span className="text-success font-bold ml-2">YES (2030)</span></p>
                          <p>Document Authenticity: <span className="text-brand font-bold ml-2">OCR SCANNED</span></p>
                        </div>
                      </div>
                    </div>
                  )}
                  {kycStep === 2 && (
                    <div className="space-y-6">
                      <h4 className="font-bold flex items-center gap-2 text-earth"><Car size={18} /> Vehicle Safety Compliance</h4>
                      <div className="grid grid-cols-3 gap-4">
                        {['Front', 'Side', 'Interior', 'Chassis', 'Odometer', 'Plate'].map(label => (
                          <div key={label} className="relative aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden group">
                            <img src={`https://picsum.photos/seed/car-${label}/300/300`} className="w-full h-full object-cover" alt={label} />
                            <div className="absolute top-2 right-2 bg-success text-white p-1 rounded-full"><CheckCircle2 size={12} /></div>
                            <span className="absolute bottom-2 left-2 text-[8px] font-bold text-white bg-black/40 px-2 py-0.5 rounded uppercase">{label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {kycStep === 3 && (
                    <div className="space-y-6 text-center py-10">
                      <div className="w-16 h-16 bg-brand/10 text-brand rounded-full flex items-center justify-center mx-auto mb-4">
                        <Smartphone size={32} />
                      </div>
                      <h4 className="font-bold text-earth text-lg">Biometric Liveness Verification</h4>
                      <div className="flex justify-center gap-6 mt-8">
                        <div className="w-32 aspect-[3/4] bg-slate-100 rounded-3xl border-2 border-success overflow-hidden relative">
                           <img src="https://picsum.photos/seed/face/200/300" className="w-full h-full object-cover opacity-80" />
                           <div className="absolute inset-x-0 top-0 h-1 bg-success animate-scan" />
                        </div>
                        <div className="text-left space-y-4 pt-4">
                           <div className="flex items-center gap-2">
                             <CheckCircle2 size={16} className="text-success" />
                             <span className="text-xs font-bold text-slate-600">3D Depth Match</span>
                           </div>
                           <div className="flex items-center gap-2">
                             <CheckCircle2 size={16} className="text-success" />
                             <span className="text-xs font-bold text-slate-600">Eye-tracking Success</span>
                           </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {kycStep >= 4 && (
                    <div className="flex flex-col items-center justify-center py-10 text-center space-y-6">
                      <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center animate-bounce">
                        <ShieldCheck size={40} />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-earth tracking-tight">Final Background Audit</h4>
                        <p className="text-sm text-slate-500 max-w-sm mt-2">No criminal records found in regional or global databases. Driver history is clean and ready for activation.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-8 bg-warm border-t border-slate-100 flex gap-4">
                {kycStep < 4 ? (
                  <>
                    <button onClick={() => setKycStep(prev => Math.max(1, prev - 1))} className="px-8 py-4 rounded-2xl font-bold bg-white border border-slate-200 text-slate-400 hover:text-earth transition-all">Previous</button>
                    <button onClick={() => setKycStep(prev => prev + 1)} className="flex-1 bg-earth text-white py-4 rounded-2xl font-bold hover:bg-earth/90 transition-all flex items-center justify-center gap-2">Continue Check <ChevronRight size={18} /></button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setSelectedDriver(null)} className="flex-1 bg-white border border-coral text-coral py-4 rounded-2xl font-bold hover:bg-coral/5 transition-all">Deny Verification</button>
                    <button onClick={() => setSelectedDriver(null)} className="flex-1 bg-success text-white py-4 rounded-2xl font-bold hover:bg-success/90 transition-all">Verify & Approve</button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- View: Customer Support ---
const CustomerSupportView = () => {
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const tickets = [
    { id: 'TIC-102', user: 'Fatima Al', subject: 'Refund Request #BK-9902', status: 'Priority', time: '2 mins ago', lastMsg: 'I accidentally booked twice, please assist.' },
    { id: 'TIC-105', user: 'Alex Wong', subject: 'Driver did not show up', status: 'In Progress', time: '15 mins ago', lastMsg: 'The driver at Dubai Mall is not answering.' },
    { id: 'TIC-110', user: 'Sarah Green', subject: 'App Crashing', status: 'Open', time: '45 mins ago', lastMsg: 'I cannot see my active trips on the map.' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-180px)]">
      <div className="lg:col-span-1 glass-card rounded-3xl overflow-hidden flex flex-col bg-white border-none shadow-xl shadow-slate-200/40">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-lg">Support Tickets</h3>
          <span className="bg-coral/10 text-coral text-[10px] font-black px-2 py-1 rounded">3 ACTIVE</span>
        </div>
        <div className="p-4 border-b border-slate-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input type="text" placeholder="Search ID or User..." className="w-full pl-9 pr-4 py-2 bg-slate-50 border-none rounded-xl text-xs" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto bg-slate-50/30 p-4 space-y-3">
          {tickets.map((t, i) => (
            <div 
              key={i} 
              onClick={() => setSelectedTicket(t)}
              className={cn(
                "p-4 rounded-2xl border transition-all cursor-pointer",
                selectedTicket?.id === t.id ? "bg-white border-earth shadow-lg shadow-earth/5 scale-[1.02]" : "bg-white border-white hover:border-slate-100"
              )}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-earth px-2 py-1 bg-warm rounded-lg">{t.id}</span>
                <span className="text-[10px] font-medium text-slate-400">{t.time}</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 truncate">{t.subject}</h4>
              <p className="text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-widest">{t.user}</p>
              <p className="text-xs text-slate-500 mt-3 line-clamp-1 italic">"{t.lastMsg}"</p>
              <div className="mt-4 flex justify-end">
                <span className={cn(
                  "text-[8px] font-black uppercase px-2 py-0.5 rounded",
                  t.status === 'Priority' ? "bg-coral text-white" : "bg-earth/10 text-earth"
                )}>{t.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2 glass-card rounded-3xl overflow-hidden flex flex-col bg-white border-none shadow-xl shadow-slate-200/40 relative">
        {selectedTicket ? (
          <>
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white z-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-warm flex items-center justify-center font-bold text-earth">FA</div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{selectedTicket.user}</h4>
                  <p className="text-[10px] text-slate-400 font-medium">Active Ticket • {selectedTicket.subject}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-all"><MoreVertical size={18} /></button>
                <button className="bg-earth text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-earth/90">Resolve Ticket</button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-10 space-y-6 bg-warm/20">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-bold text-slate-400">FA</div>
                <div className="bg-white p-4 rounded-3xl rounded-tl-none shadow-sm max-w-[70%] border border-earth/5">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Hello support, I inadvertently made two payments for the same desert safari trip. One was on #BK-9902 and the other was showing 'Pending' but when I checked my bank statement both were deducted.
                  </p>
                  <span className="text-[8px] font-bold text-slate-300 mt-2 block tracking-widest uppercase">10:45 AM</span>
                </div>
              </div>
              <div className="flex gap-4 flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-brand border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-bold text-white">CS</div>
                <div className="bg-earth text-white p-4 rounded-3xl rounded-tr-none shadow-lg shadow-earth/10 max-w-[70%]">
                  <p className="text-sm leading-relaxed font-medium">
                    Hello Fatima, I apologize for this inconvenience. I've located both transactions. I will initiate a refund for the second payment immediately.
                  </p>
                  <span className="text-[8px] font-bold text-white/40 mt-2 block tracking-widest uppercase text-right">10:50 AM</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border-t border-slate-100">
              <div className="flex gap-4 items-center bg-warm/50 p-2 rounded-2xl border border-earth/5">
                <input type="text" placeholder="Type your response here..." className="flex-1 bg-transparent border-none focus:ring-0 text-sm px-4" />
                <button className="bg-earth text-white px-6 py-3 rounded-xl text-xs font-bold hover:bg-earth/90 transition-all">Send Reply</button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-10 opacity-40">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-300 mb-4">
              <Headset size={32} />
            </div>
            <h4 className="font-bold text-slate-900">No Ticket Selected</h4>
            <p className="text-sm text-slate-500 mt-1">Select a conversation from the sidebar to start chat</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Login View ---
const LoginView = ({ onLogin }: { onLogin: (role: Role, task?: View) => void }) => {
  const [step, setStep] = useState<'creds' | 'otp'>('creds');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [selectedRole, setSelectedRole] = useState<Role>('super_admin');
  const [selectedTask, setSelectedTask] = useState<View>('stays');
  const [email, setEmail] = useState('');

  const handleOtpChange = (val: string, idx: number) => {
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);
    if (val && idx < 3) {
      const next = document.getElementById(`otp-${idx + 1}`);
      next?.focus();
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-warm p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card max-w-md w-full p-10 rounded-[40px] bg-white border-none shadow-2xl shadow-earth/5"
      >
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-16 h-16 bg-brand rounded-3xl flex items-center justify-center text-white rotate-6 mb-6 shadow-xl shadow-brand/30">
            <Mountain size={32} />
          </div>
          <h1 className="text-3xl font-black text-earth tracking-tight">Manjaro Admin</h1>
          <p className="text-slate-500 font-medium mt-2">Multirole Management System</p>
        </div>

        <div className="flex bg-slate-50 p-1 rounded-2xl mb-8">
          <button 
            onClick={() => setSelectedRole('super_admin')}
            className={cn(
              "flex-1 py-3 rounded-xl text-xs font-bold transition-all",
              selectedRole === 'super_admin' ? "bg-white text-earth shadow-sm" : "text-slate-400 hover:text-slate-600"
            )}
          >
            Super Admin
          </button>
          <button 
            onClick={() => setSelectedRole('customer_support')}
            className={cn(
              "flex-1 py-3 rounded-xl text-xs font-bold transition-all",
              selectedRole === 'customer_support' ? "bg-white text-earth shadow-sm" : "text-slate-400 hover:text-slate-600"
            )}
          >
            Customer Support
          </button>
        </div>

        {step === 'creds' ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={selectedRole === 'super_admin' ? "admin@aturtrip.com" : "support@aturtrip.com"} 
                className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 text-sm font-medium" 
              />
            </div>
            
            {selectedRole === 'customer_support' && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Assigned Support Task</label>
                <select 
                  value={selectedTask}
                  onChange={(e) => setSelectedTask(e.target.value as View)}
                  className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 text-sm font-medium appearance-none bg-no-repeat bg-[right_1.25rem_center] bg-[length:1em_1em]"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' /%3E%3C/svg%3E")` }}
                >
                  <option value="guides">Guides Verification</option>
                  <option value="stays">Stays (Accommodation) Verification</option>
                  <option value="drivers">Drivers Verification</option>
                </select>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 text-sm font-medium" />
            </div>
            <button 
              onClick={() => setStep('otp')}
              className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all transform active:scale-95 flex items-center justify-center gap-2"
            >
              Continue to OTP <ChevronRight size={18} />
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h3 className="font-bold text-lg text-earth">Two-Factor Authentication</h3>
              <p className="text-xs text-slate-400 font-medium">Please enter the 4-digit code from your app</p>
            </div>
            <div className="flex justify-center gap-3">
              {otp.map((digit, i) => (
                <input 
                  key={i}
                  id={`otp-${i}`}
                  type="text" 
                  maxLength={1}
                  value={digit}
                  className="w-14 h-16 text-center text-2xl font-black bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20"
                  onChange={(e) => handleOtpChange(e.target.value.replace(/\D/g, ''), i)}
                />
              ))}
            </div>
            <button 
              onClick={() => onLogin(selectedRole, selectedTask)}
              className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all transform active:scale-95"
            >
              Verify & Log in as {selectedRole.replace('_', ' ')}
            </button>
            <button 
              onClick={() => setStep('creds')}
              className="w-full text-slate-400 text-xs font-bold hover:text-slate-600"
            >
              Back to login
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
const SettingsView = () => {
  const [fees, setFees] = useState({
    driver: 15,
    stay: 12,
    guide: 10,
    cancellation: 5,
  });

  const [policies, setPolicies] = useState({
    autoApproveGuides: false,
    requireInsurance: true,
    allowRefunds: true,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Pricing & Fees Section */}
      <div className="glass-card p-8 rounded-[40px] bg-white border-none shadow-xl shadow-slate-200/40 space-y-8">
        <div>
          <h3 className="text-xl font-black text-earth tracking-tight">Platform Financials</h3>
          <p className="text-sm text-slate-400 font-medium">Configure global commission rates and service fees.</p>
        </div>

        <div className="space-y-8">
          {[
            { id: 'driver', label: 'Driver Platform Fee (%)', color: 'text-primary' },
            { id: 'stay', label: 'Accommodation Fee (%)', color: 'text-success' },
            { id: 'guide', label: 'Guide Commission (%)', color: 'text-brand' },
            { id: 'cancellation', label: 'Cancellation Penalty (%)', color: 'text-alert' },
          ].map(fee => (
            <div key={fee.id} className="space-y-4">
              <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-slate-400">
                <span>{fee.label}</span>
                <span className={cn("px-4 py-1 rounded-full", fee.color.replace('text-', 'bg-') + '/10', fee.color)}>{fees[fee.id as keyof typeof fees]}%</span>
              </div>
              <input 
                type="range" 
                min="0" max="30" 
                value={fees[fee.id as keyof typeof fees]}
                onChange={(e) => setFees({...fees, [fee.id]: parseInt(e.target.value)})}
                className={cn("w-full accent-earth h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer")} 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Operational Policies */}
      <div className="space-y-8">
        <div className="glass-card p-8 rounded-[40px] bg-white border-none shadow-xl shadow-slate-200/40 space-y-8">
          <div>
            <h3 className="text-xl font-black text-earth tracking-tight">Marketplace Compliance</h3>
            <p className="text-sm text-slate-400 font-medium">Define safety and operational standards.</p>
          </div>

          <div className="space-y-6">
            {[
              { id: 'requireInsurance', label: 'Require Professional Liability Insurance', desc: 'Sellers must upload proof of insurance to go live.' },
              { id: 'autoApproveGuides', label: 'Auto-verify Verified Social Profiles', desc: 'Trust users with linked & verified ID.' },
              { id: 'allowRefunds', label: 'Enable Escrow Protection', desc: 'Hold funds until trip completion.' },
            ].map((policy) => (
              <label key={policy.id} className="flex items-start gap-4 cursor-pointer group">
                <div className="relative pt-1">
                  <input 
                    type="checkbox" 
                    checked={policies[policy.id as keyof typeof policies]}
                    onChange={() => setPolicies({...policies, [policy.id]: !policies[policy.id as keyof typeof policies]})}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </div>
                <div>
                   <p className="text-sm font-black text-earth group-hover:text-primary transition-colors">{policy.label}</p>
                   <p className="text-[10px] font-medium text-slate-400 mt-1">{policy.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Global Regions Wrapper */}
        <div className="glass-card p-8 rounded-[40px] bg-earth text-white border-none shadow-xl shadow-earth/20">
           <div className="flex justify-between items-center mb-6">
              <h4 className="font-black text-lg">Expansion Mode</h4>
              <Globe className="text-white/20" size={32} />
           </div>
           <p className="text-white/60 text-sm font-medium leading-relaxed">System is currently processing registrations from 12 countries. M-Pesa & Stripe automatic routing enabled.</p>
           <button className="w-full mt-8 bg-white/10 hover:bg-white/20 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Download regional report</button>
        </div>
      </div>
    </div>
  );
};

// --- View: Stay Management ---
const StayManagementView = ({ context }: { context?: { country: string } }) => {
  const [selectedStay, setSelectedStay] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('All');
  const [kycStep, setKycStep] = useState(1);

  const stays = [
    { 
      id: 'STY-201',
      name: 'West Park Hotels', 
      type: 'Hotel', 
      address: 'Plot 4, Silicon Valley Estate, Lagos',
      country: 'Nigeria',
      email: 'contact@westpark.com',
      phone: '+234 801 234 5678',
      numRooms: 45,
      status: 'Active',
      kyc: 'Verified',
      wallet: '$12,450.00',
      rooms: [
        { tier: 'Luxury Suite', beds: 1, price: '$250', image: 'https://picsum.photos/seed/stay1/400/300' },
        { tier: 'Standard Room', beds: 2, price: '$120', image: 'https://picsum.photos/seed/stay2/400/300' }
      ]
    },
    { 
      id: 'STY-202',
      name: 'Sahara Glamping Site', 
      type: 'Camp', 
      address: 'Route de Zagora, Merzouga, Morocco',
      country: 'Morocco',
      email: 'info@saharaglamp.ma',
      phone: '+212 524 987 654',
      numRooms: 12,
      status: 'Pending',
      kyc: 'In Review',
      wallet: '$0.00',
      rooms: [
        { tier: 'Starry Tent', beds: 2, price: '$180', image: 'https://picsum.photos/seed/stay3/400/300' }
      ]
    },
    { 
      id: 'STY-203',
      name: 'Urban Studio Loft', 
      type: 'Short Let', 
      address: '32 Oak Street, Nairobi, Kenya',
      country: 'Kenya',
      email: 'loft@urbanstays.co.ke',
      phone: '+254 712 345 678',
      numRooms: 1,
      status: 'Active',
      kyc: 'Verified',
      wallet: '$5,200.00',
      rooms: [
        { tier: 'Loft Suite', beds: 1, price: '$95', image: 'https://picsum.photos/seed/stay4/400/300' }
      ]
    }
  ];

  const countryFilteredStays = context ? stays.filter(s => s.country === context.country) : stays;
  const filteredStays = activeTab === 'All' ? countryFilteredStays : countryFilteredStays.filter(s => s.status === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex bg-warm p-1 rounded-xl">
          {['All', 'Pending', 'Active'].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-6 py-2 text-xs font-bold rounded-lg transition-all",
                activeTab === tab ? "bg-white shadow-sm text-primary" : "text-slate-500 hover:text-slate-900"
              )}
            >
              {tab === 'All' ? 'All Accommodations' : tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <h4 className="text-earth font-black text-xs mr-4">{context ? `${context.country} Regional Feed` : 'Global Marketplace'}</h4>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by stay name..." 
              className="pl-10 pr-4 py-2 bg-warm border-none rounded-xl text-xs font-medium focus:ring-2 focus:ring-primary/20 w-64"
            />
          </div>
        </div>
      </div>


      <div className="glass-card rounded-3xl overflow-hidden border-none shadow-xl shadow-slate-200/40 bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Stay Information</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Type / Rooms</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">KYC Status</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Status</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredStays.map((stay, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-warm rounded-2xl flex items-center justify-center text-primary rotate-3 group-hover:rotate-0 transition-transform shadow-lg shadow-primary/5">
                      <Hotel size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-earth">{stay.name}</p>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1 font-medium mt-0.5">
                        <Map size={10} /> {stay.address}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-slate-700">{stay.type}</span>
                    <span className="text-[10px] text-slate-400 font-medium">{stay.numRooms} Total Rooms</span>
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      stay.kyc === 'Verified' ? "bg-success" : stay.kyc === 'In Review' ? "bg-brand" : "bg-alert"
                    )} />
                    <span className="text-xs font-bold text-slate-700">{stay.kyc}</span>
                  </div>
                </td>
                <td className="p-6">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-bold tracking-wider",
                    stay.status === 'Active' ? "bg-success/10 text-success" :
                    stay.status === 'Pending' ? "bg-brand/10 text-brand" : "bg-alert/10 text-alert"
                  )}>
                    {stay.status}
                  </span>
                </td>
                <td className="p-6">
                  {stay.status === 'Pending' ? (
                    <button 
                      onClick={() => { setSelectedStay(stay); setKycStep(1); }}
                      className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
                    >
                      Review
                    </button>
                  ) : (
                    <button 
                      onClick={() => { setSelectedStay(stay); setKycStep(1); }}
                      className="p-2 hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-slate-100 transition-all text-slate-400 hover:text-primary"
                    >
                      <Eye size={18} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {selectedStay && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-12">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSelectedStay(null)}
              className="absolute inset-0 bg-earth/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative max-w-5xl w-full bg-white rounded-[40px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-warm">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-brand rounded-2xl flex items-center justify-center text-white shadow-xl shadow-brand/20">
                    <ShieldCheck size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-earth tracking-tight">Stay Integrity Check</h3>
                    <p className="text-sm text-slate-400 font-medium">Verifying {selectedStay.name} ({selectedStay.type})</p>
                  </div>
                </div>
                <button onClick={() => setSelectedStay(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400"><X size={20} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-10">
                {/* Progress Tracker */}
                <div className="flex justify-between relative px-10">
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
                  {[
                    { label: 'Documents', icon: FileCheck },
                    { label: 'Health & Safety', icon: Activity },
                    { label: 'Room Audit', icon: Bed },
                    { label: 'Final Approval', icon: CheckCircle2 }
                  ].map((step, i) => (
                    <div key={i} className="relative z-10 flex flex-col items-center">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500",
                        kycStep > i + 1 ? "bg-success text-white" :
                        kycStep === i + 1 ? "bg-earth text-white scale-125 shadow-lg shadow-earth/20" : "bg-white border-2 border-slate-100 text-slate-300"
                      )}>
                        {kycStep > i + 1 ? <CheckCircle2 size={20} /> : <step.icon size={20} />}
                      </div>
                      <span className={cn(
                        "text-[10px] font-bold mt-2 uppercase tracking-widest",
                        kycStep === i + 1 ? "text-earth" : "text-slate-400"
                      )}>{step.label}</span>
                    </div>
                  ))}
                </div>

                {/* Step Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2">
                    <div className="bg-warm/50 rounded-[32px] p-8 border border-earth/5 min-h-[400px]">
                      {kycStep === 1 && (
                        <div className="space-y-8">
                          <div className="flex justify-between items-center">
                            <h4 className="font-bold flex items-center gap-2 text-earth"><FileText size={18} /> Business Registration Review</h4>
                            <span className="text-[10px] font-black bg-success/10 text-success px-3 py-1 rounded-full uppercase">AI Verified</span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-4">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Certificate of Incorporation</p>
                              <div className="aspect-[4/3] bg-slate-200 rounded-3xl overflow-hidden relative group shadow-xl">
                                <img src="https://picsum.photos/seed/cert/400/300" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-earth/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Eye size={32} className="text-white" />
                                </div>
                              </div>
                            </div>
                            <div className="space-y-6">
                              {[
                                { l: 'Entity Name matches', s: true },
                                { l: 'Tax ID (V-8820) Active', s: true },
                                { l: 'Owner ID matches registration', s: true }
                              ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center p-4 bg-white rounded-2xl border border-earth/5">
                                  <span className="text-xs font-bold text-slate-600">{item.l}</span>
                                  <CheckCircle2 size={16} className="text-success" />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {kycStep === 2 && (
                        <div className="space-y-8">
                          <h4 className="font-bold flex items-center gap-2 text-earth"><Activity size={18} /> Health & Fire Safety Compliance</h4>
                          <div className="grid grid-cols-3 gap-4">
                             {['Fire Exit Plan', 'Kitchen Hygiene', 'Pool Safety'].map(item => (
                               <div key={item} className="space-y-3">
                                 <div className="aspect-square bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
                                    <img src={`https://picsum.photos/seed/safety-${item}/200/200`} className="w-full h-full object-cover" />
                                 </div>
                                 <p className="text-[10px] font-black text-center text-slate-500 uppercase">{item}</p>
                               </div>
                             ))}
                          </div>
                          <div className="p-6 bg-brand/5 rounded-3xl border border-brand/10">
                             <p className="text-xs font-medium text-earth/80">Self-inspection report submitted on Apr 21. Water quality levels within Dubai Municipality standards.</p>
                          </div>
                        </div>
                      )}

                      {kycStep === 3 && (
                        <div className="space-y-8">
                          <h4 className="font-bold flex items-center gap-2 text-earth"><ListChecks size={18} /> Room Tier & Asset Audit</h4>
                          <div className="space-y-6">
                            {selectedStay.rooms.map((room: any, i: number) => (
                              <div key={i} className="flex items-center gap-6 p-4 bg-white rounded-3xl border border-earth/5">
                                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                                   <img src={room.image} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                   <h5 className="font-black text-earth">{room.tier}</h5>
                                   <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{room.beds} Beds • {room.price} / night</p>
                                </div>
                                <div className="flex gap-2">
                                  <button className="px-4 py-2 bg-success/10 text-success text-[10px] font-black rounded-xl">VERIFY</button>
                                  <button className="px-4 py-2 bg-coral/10 text-coral text-[10px] font-black rounded-xl">FLAG</button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {kycStep >= 4 && (
                        <div className="flex flex-col items-center justify-center min-h-[300px] text-center space-y-6">
                           <div className="w-24 h-24 bg-success/10 text-success rounded-full flex items-center justify-center animate-bounce">
                              <CheckCircle2 size={48} />
                           </div>
                           <div>
                              <h4 className="text-2xl font-black text-earth tracking-tight">Onboarding Audit Passed</h4>
                              <p className="text-sm text-slate-400 max-w-sm font-medium mt-2">All documents verified and safety standards met according to Manjaro global compliance framework.</p>
                           </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-slate-50 rounded-[32px] p-8 border border-slate-100 space-y-6">
                      <div>
                        <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Financials & Performance</h5>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-500 font-medium">Platform Wallet</span>
                            <span className="text-sm font-black text-success">{selectedStay.wallet}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-500 font-medium">Pending Payouts</span>
                            <span className="text-sm font-black text-brand">$1,200.00</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-6 border-t border-slate-200">
                        <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Legal Actions</h5>
                        <div className="space-y-3">
                           <button className="w-full bg-white text-earth py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-200 hover:bg-slate-50">View Chat History</button>
                           <button className="w-full bg-white text-earth py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-200 hover:bg-slate-50">Reservation Logs</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-warm border-t border-slate-100 flex gap-4">
                {kycStep < 4 ? (
                  <>
                    <button onClick={() => setKycStep(prev => Math.max(1, prev - 1))} className="px-8 py-4 rounded-2xl font-bold bg-white border border-slate-200 text-slate-400 hover:text-earth transition-all">Previous</button>
                    <button onClick={() => setKycStep(prev => prev + 1)} className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2">Continue Check <ChevronRight size={18} /></button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setSelectedStay(null)} className="flex-1 bg-white border border-alert text-alert py-4 rounded-2xl font-bold hover:bg-alert/5 transition-all">Decline Application</button>
                    <button onClick={() => setSelectedStay(null)} className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2">Approve Integrity & Go Live <CheckCircle2 size={18} /></button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- View: Staff Management (Super Admin) ---
const StaffManagementView = () => {
  const [staff, setStaff] = useState([
    { id: 'STF-001', name: 'Alice Johnson', email: 'alice@aturtrip.com', city: 'Nairobi', country: 'Kenya', task: 'stays', status: 'Active' },
    { id: 'STF-002', name: 'Bob Smith', email: 'bob@aturtrip.com', city: 'Lagos', country: 'Nigeria', task: 'guides', status: 'Active' },
    { id: 'STF-003', name: 'Charlie Davis', email: 'charlie@aturtrip.com', city: 'Marrakesh', country: 'Morocco', task: 'drivers', status: 'Pending' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-2xl font-black text-earth tracking-tight">Staff Onboarding</h2>
            <p className="text-sm text-slate-400 font-medium">Manage and provision Customer Support Officers across regions.</p>
         </div>
         <div className="flex gap-3">
            <button className="bg-white border border-slate-200 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2">
               <FileText size={16} /> Import CSV
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-primary text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2"
            >
               <UserPlus size={16} /> Add New Officer
            </button>
         </div>
      </div>

      <div className="glass-card rounded-[32px] overflow-hidden bg-white shadow-xl shadow-slate-200/40 border-none">
         <table className="w-full text-left border-collapse">
            <thead>
               <tr className="bg-warm/50 border-b border-earth/5">
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Officer Info</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Location</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Assigned Task</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
               {staff.map((s, i) => (
                  <tr key={i} className="hover:bg-warm/20 transition-colors group">
                     <td className="p-6">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-earth/5 flex items-center justify-center font-black text-earth">{s.name.split(' ').map(n => n[0]).join('')}</div>
                           <div>
                              <p className="text-sm font-black text-earth leading-none">{s.name}</p>
                              <p className="text-[10px] font-medium text-slate-400 mt-1">{s.email}</p>
                           </div>
                        </div>
                     </td>
                     <td className="p-6">
                        <p className="text-xs font-bold text-earth">{s.city}, {s.country}</p>
                     </td>
                     <td className="p-6">
                        <span className="px-3 py-1 bg-brand/10 text-brand text-[10px] font-black rounded-lg uppercase tracking-widest">
                           {s.task} Support
                        </span>
                     </td>
                     <td className="p-6">
                        <span className={cn(
                           "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                           s.status === 'Active' ? "bg-success/10 text-success" : "bg-alert/10 text-alert"
                        )}>{s.status}</span>
                     </td>
                     <td className="p-6">
                        <button className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-earth transition-all shadow-sm border border-transparent hover:border-slate-100"><Shield size={16} /></button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>

      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-earth/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative max-w-lg w-full bg-white rounded-[40px] p-10 shadow-2xl space-y-8"
            >
               <div>
                  <h3 className="text-2xl font-black text-earth tracking-tight">Onboard New Officer</h3>
                  <p className="text-sm text-slate-400 font-medium mt-1">Assign roles and regional jurisdictions.</p>
               </div>
               
               <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Full Name</label>
                        <input className="w-full px-5 py-3 bg-warm/50 border border-earth/5 rounded-2xl text-sm font-bold" placeholder="e.g. John Wick" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Work Email</label>
                        <input className="w-full px-5 py-3 bg-warm/50 border border-earth/5 rounded-2xl text-sm font-bold" placeholder="support@aturtrip.com" />
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Country</label>
                        <select className="w-full px-5 py-3 bg-warm/50 border border-earth/5 rounded-2xl text-sm font-bold">
                           <option>Kenya</option>
                           <option>Nigeria</option>
                           <option>Morocco</option>
                           <option>UAE</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Assigned Module</label>
                        <select className="w-full px-5 py-3 bg-warm/50 border border-earth/5 rounded-2xl text-sm font-bold text-brand">
                           <option value="stays">Stays (Accommodation)</option>
                           <option value="guides">Guides (Partners)</option>
                           <option value="drivers">Drivers (Transit)</option>
                        </select>
                     </div>
                  </div>
                  <button 
                    onClick={() => setShowAddModal(false)}
                    className="w-full bg-earth text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-earth/20 hover:scale-[1.02] transition-all"
                  >
                    Provision Access
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- View: Notification List ---
// --- View: Alerts Center ---
const AlertsCenterView = () => {
  const [filter, setFilter] = useState<'all' | 'critical' | 'system' | 'user'>('all');
  
  const alerts = [
    { id: 'AL-102', title: 'Critical System Failure', desc: 'Auth microservice reporting 40% latency in EEA region.', type: 'critical', cat: 'system', time: '2026-04-26 10:15:22', icon: AlertTriangle, color: 'text-coral' },
    { id: 'AL-101', title: 'New Driver Registration', desc: 'User #8841 submitted all documents for Nairobi region.', type: 'info', cat: 'user', time: '2026-04-26 09:44:10', icon: ShieldCheck, color: 'text-primary' },
    { id: 'AL-100', title: 'Abnormal Payout Attempt', desc: 'Guide #122 attempted $15k payout without completed kyc.', type: 'critical', cat: 'user', time: '2026-04-26 08:30:15', icon: Zap, color: 'text-yellow-500' },
    { id: 'AL-099', title: 'Emergency SOS Triggered', desc: 'Sarah Green triggered panic signal in Merzouga Desert.', type: 'critical', cat: 'user', time: '2026-04-26 07:12:00', icon: Siren, color: 'text-coral' },
    { id: 'AL-098', title: 'Scheduled Maintenance Complete', desc: 'Database optimization for UAE-North shard finished.', type: 'success', cat: 'system', time: '2026-04-26 04:00:00', icon: CheckCircle2, color: 'text-success' },
    { id: 'AL-097', title: 'Inconsistent Policy State', desc: 'Regional terms v2.1 not accepted by 45 active guides in UK.', type: 'warning', cat: 'system', time: '2026-04-26 01:22:11', icon: Shield, color: 'text-slate-400' },
    { id: 'AL-096', title: 'Identity Revoked', desc: 'Partner Agency "SafeTravels" suspended due to fraud reports.', type: 'critical', cat: 'user', time: '2026-04-25 23:55:00', icon: XCircle, color: 'text-coral' },
  ];

  const filteredAlerts = alerts.filter(a => {
    if (filter === 'all') return true;
    if (filter === 'critical') return a.type === 'critical';
    return a.cat === filter;
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div className="bg-white p-10 rounded-[40px] shadow-xl shadow-slate-200/40 border-none flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
             <h2 className="text-3xl font-black text-earth tracking-tight">Alerts Center</h2>
             <p className="text-sm font-medium text-slate-400 mt-2 italic">Real-time system health and user integrity monitoring log.</p>
          </div>
          <div className="flex bg-warm p-1.5 rounded-2xl border border-earth/5">
             {[
               { id: 'all', label: 'All Activity' },
               { id: 'critical', label: 'Critical Only' },
               { id: 'system', label: 'System' },
               { id: 'user', label: 'User Actions' },
             ].map((t) => (
                <button 
                  key={t.id}
                  onClick={() => setFilter(t.id as any)}
                  className={cn(
                    "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                    filter === t.id ? "bg-earth text-white shadow-lg" : "text-slate-400 hover:text-earth"
                  )}
                >
                  {t.label}
                </button>
             ))}
          </div>
       </div>

       <div className="grid grid-cols-1 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredAlerts.map((alert, i) => (
              <motion.div 
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                key={alert.id} 
                className="glass-card p-6 rounded-[32px] bg-white border-none shadow-xl shadow-slate-200/40 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-2xl hover:-translate-y-1 transition-all group cursor-pointer"
              >
                 <div className="flex items-center gap-6 flex-1">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner", alert.color.replace('text-', 'bg-').replace('500', '100').replace('success', 'success/10').replace('coral', 'coral/10').replace('primary', 'primary/10'))}>
                       <alert.icon className={alert.color} size={28} />
                    </div>
                    <div className="space-y-1">
                       <div className="flex items-center gap-3">
                          <span className="text-[10px] font-black text-slate-300 tracking-widest bg-slate-50 px-2 py-0.5 rounded uppercase">{alert.id}</span>
                          <h4 className="text-lg font-black text-earth tracking-tight">{alert.title}</h4>
                       </div>
                       <p className="text-sm font-medium text-slate-500 leading-relaxed">{alert.desc}</p>
                    </div>
                 </div>
                 <div className="text-right flex flex-col md:items-end gap-3 min-w-[200px]">
                    <div className="flex items-center justify-end gap-2 text-slate-400">
                       <Clock size={16} />
                       <span className="text-xs font-black italic">{alert.time}</span>
                    </div>
                    <div className="flex gap-2">
                       <button className="bg-warm/50 hover:bg-earth hover:text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Audit</button>
                       <button className="bg-warm/50 hover:bg-primary hover:text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Resolve</button>
                    </div>
                 </div>
              </motion.div>
            ))}
          </AnimatePresence>
       </div>
    </div>
  );
};

const NotificationListView = () => {
  const [targetType, setTargetType] = useState<'all_users' | 'individual' | 'support_all' | 'support_individual' | 'support_broadcast'>('all_users');
  const [broadcastType, setBroadcastType] = useState<'country' | 'role'>('country');
  const [selectedRole, setSelectedRole] = useState<string>('driver');
  const [selectedCountry, setSelectedCountry] = useState<string>('Kenya');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [targetEmail, setTargetEmail] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);

  const TEMPLATES = [
    { title: 'System Maintenance', subject: 'Upcoming System Maintenance 🏗️', message: 'Hello! Please be advised that the platform will undergo routine maintenance on Sunday at 02:00 AM UTC. Expect minor service interruptions for approx 30 minutes.' },
    { title: 'New Safety Protocol', subject: 'Updated Safety Guidelines for Partners', message: 'We have updated our safety protocols for all on-trip experiences. Please review the new guidelines in your partner dashboard to ensure compliance by next week.' },
    { title: 'Fraud Alert', subject: 'URGENT: Identifying Fraudulent Inquiries', message: 'Travelers and Partners: Be wary of off-platform payment requests. Always use our secure escrow system to protect your transactions and data.' },
    { title: 'Staff Update', subject: 'New Support SOP Deployment', message: 'Attention Support Officers: Case escalation SOP v4.2 is now live. Please apply the new triage rules to all open disputes immediately.' },
  ];

  const applyTemplate = (tpl: any) => {
    setSubject(tpl.subject);
    setMessage(tpl.message);
    setShowTemplates(false);
  };

  const handleSend = () => {
    const scheduling = scheduledDate ? `scheduled for ${scheduledDate} at ${scheduledTime}` : 'sent immediately';
    alert(`Notification (${subject}) ${scheduling} to ${targetType}!`);
    setSubject('');
    setMessage('');
    setTargetEmail('');
    setScheduledDate('');
    setScheduledTime('');
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
      {/* Broadcast Composer */}
      <div className="lg:col-span-2 space-y-8">
        <div className="glass-card p-10 rounded-[40px] bg-white border-none shadow-2xl shadow-slate-200/40 space-y-8 relative overflow-hidden">
          <div className="flex justify-between items-start">
             <div>
                <h2 className="text-2xl font-black text-earth tracking-tight">Advanced Notification Suite</h2>
                <p className="text-sm text-slate-400 font-medium mt-1">Multi-channel broadcast and direct targeting system.</p>
             </div>
             <div className="flex gap-2">
                <button 
                  onClick={() => setShowTemplates(true)}
                  className="bg-primary/5 text-primary px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all flex items-center gap-2"
                >
                  <FileText size={14} /> Use Template
                </button>
                <Send className="text-primary/20" size={40} />
             </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Audience Target</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-1.5 bg-warm/50 rounded-3xl border border-earth/5">
                {[
                  { id: 'all_users', label: 'All Users', icon: Globe },
                  { id: 'individual', label: 'Individual (Email)', icon: User },
                  { id: 'support_all', label: 'All Support Staff', icon: Headset },
                  { id: 'support_individual', label: 'Support (Email)', icon: UserPlus },
                  { id: 'support_broadcast', label: 'Support Broadcast', icon: Siren },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTargetType(t.id as any)}
                    className={cn(
                      "flex items-center gap-2 py-3 px-4 rounded-2xl text-[10px] font-black uppercase tracking-tight transition-all",
                      targetType === t.id ? "bg-earth text-white shadow-xl shadow-earth/20" : "text-slate-400 hover:bg-white hover:text-earth"
                    )}
                  >
                    <t.icon size={14} /> {t.label}
                  </button>
                ))}
              </div>
            </div>

            {(targetType === 'individual' || targetType === 'support_individual') && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  {targetType === 'individual' ? 'Target User Email' : 'Support Officer Email'}
                </label>
                <input 
                  type="email" 
                  value={targetEmail}
                  onChange={(e) => setTargetEmail(e.target.value)}
                  placeholder="name@nexus.com" 
                  className="w-full px-6 py-4 bg-warm/30 border-2 border-transparent focus:border-primary/20 rounded-2xl text-sm font-bold text-earth transition-all"
                />
              </motion.div>
            )}

            {targetType === 'support_broadcast' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 p-6 bg-primary/5 rounded-[32px] border border-primary/10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary/60 ml-1">Broadcast Type</label>
                  <div className="flex gap-2">
                    {[
                      { id: 'country', label: 'By Country' },
                      { id: 'role', label: 'By Specialist Role' },
                    ].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setBroadcastType(f.id as any)}
                        className={cn(
                          "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all",
                          broadcastType === f.id ? "bg-primary text-white border-primary shadow-lg" : "bg-white text-slate-400 border-slate-100"
                        )}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {broadcastType === 'country' ? (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase">Select Target Region</label>
                    <select 
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-100 rounded-xl text-xs font-bold"
                    >
                      <option>Kenya</option>
                      <option>UAE</option>
                      <option>Nigeria</option>
                      <option>Morocco</option>
                      <option>France</option>
                      <option>United Kingdom</option>
                    </select>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase">Select Role Segment</label>
                    <select 
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-100 rounded-xl text-xs font-bold"
                    >
                      <option value="driver">Drivers (Verification Group)</option>
                      <option value="guide">Guides (Experience Group)</option>
                      <option value="stay">Stay (Accommodation Group)</option>
                      <option value="moderator">Content Moderators</option>
                    </select>
                  </div>
                )}
              </motion.div>
            )}

            <div className="space-y-4 pt-4 border-t border-slate-100">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2"><Clock size={14} /> Scheduling (Optional)</label>
               <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="date" 
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="px-6 py-4 bg-warm/30 border-none rounded-2xl text-xs font-bold text-earth"
                  />
                  <input 
                    type="time" 
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="px-6 py-4 bg-warm/30 border-none rounded-2xl text-xs font-bold text-earth"
                  />
               </div>
            </div>

            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Message Subject</label>
                <input 
                  type="text" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter broadcast subject..." 
                  className="w-full px-6 py-4 bg-warm/30 border-none rounded-2xl text-sm font-bold text-earth"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Content Body</label>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter the primary message content here..." 
                  className="w-full h-40 px-6 py-6 bg-warm/30 border-none rounded-[32px] text-sm font-medium leading-relaxed text-earth"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
               <button className="flex-1 bg-warm text-earth py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all">Save Draft</button>
               <button 
                onClick={handleSend}
                disabled={!subject || !message}
                className="flex-[2] bg-brand text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-brand/30 hover:bg-brand/90 transition-all disabled:opacity-50 disabled:grayscale"
               >
                 {scheduledDate ? 'Schedule Notification' : 'Broadcast Now'}
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* History Feed */}
      <div className="space-y-6">
        <h3 className="text-sm font-black text-earth uppercase tracking-widest ml-2 flex items-center gap-2">
          <Timer size={16} className="text-slate-300" /> Dispatch Trends
        </h3>
        <div className="space-y-4">
          {[
            { tag: 'GLOBAL', title: 'System Maintenance', time: '12h ago', reach: '4,201 users', status: 'Delivered' },
            { tag: 'SUPPORT', title: 'New ISO Update', time: '1d ago', reach: '45 officers', status: 'Delivered' },
            { tag: 'BRAODCAST', title: 'Kenya Emergency Alert', time: '2d ago', reach: '2,100 users', status: 'Failed: 2' },
          ].map((item, i) => (
            <div key={i} className="bg-white p-5 rounded-3xl border border-earth/5 shadow-xl shadow-slate-200/40 relative overflow-hidden group hover:border-primary/20 transition-all">
               <div className="flex justify-between items-start mb-3">
                  <span className="text-[8px] font-black text-primary bg-primary/5 px-2 py-1 rounded tracking-tighter">{item.tag}</span>
                  <span className="text-[9px] font-bold text-slate-300">{item.time}</span>
               </div>
               <h4 className="text-xs font-black text-earth truncate">{item.title}</h4>
               <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 opacity-40">
                     <Users size={12} />
                     <span className="text-[10px] font-bold tracking-tight">{item.reach}</span>
                  </div>
                  <span className="text-[9px] font-black text-slate-400 italic">{item.status}</span>
               </div>
            </div>
          ))}
        </div>
        
        <div className="p-6 bg-earth rounded-[32px] text-white space-y-4 shadow-2xl shadow-earth/20 relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-xs font-black uppercase tracking-widest opacity-60">Success Rate</h4>
            <div className="flex items-end gap-2 mt-2">
               <span className="text-3xl font-black">99.8%</span>
               <TrendingUp size={16} className="text-success mb-2" />
            </div>
            <p className="text-[9px] font-medium opacity-40 mt-1">Average delivery across SMS & PUSH</p>
          </div>
          <Zap className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5" />
        </div>
      </div>

      {/* Template Modal */}
      <AnimatePresence>
        {showTemplates && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowTemplates(false)} className="absolute inset-0 bg-earth/40 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative max-w-2xl w-full bg-white rounded-[40px] overflow-hidden shadow-2xl p-8 space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black text-earth">Select Notification Template</h3>
                <button onClick={() => setShowTemplates(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={20} /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TEMPLATES.map((tpl, i) => (
                  <button 
                    key={i} 
                    onClick={() => applyTemplate(tpl)}
                    className="p-6 text-left rounded-3xl border border-earth/5 bg-warm/30 hover:bg-primary/5 hover:border-primary/20 transition-all group"
                  >
                    <FileText className="text-slate-300 group-hover:text-primary mb-3" size={24} />
                    <h4 className="text-sm font-black text-earth">{tpl.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{tpl.subject}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [role, setRole] = useState<Role>('super_admin');
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  
  const MOCK_ALERTS = [
    { id: 1, title: 'Identity Verification', message: '12 new drivers pending verification', time: '5m ago', type: 'info', icon: ShieldCheck },
    { id: 2, title: 'Payout Failed', message: 'Escrow payout to ID #884 failed', time: '12m ago', type: 'error', icon: AlertCircle },
    { id: 3, title: 'New Trip Created', message: 'Custom Sahara Tour created by User 8', time: '40m ago', type: 'success', icon: Map },
    { id: 4, title: 'System Alert', message: 'Database optimization scheduled for 02:00 UTC', time: '2h ago', type: 'warning', icon: Zap },
  ];

  // Mock support officer context
  const [supportOfficerContext, setSupportOfficerContext] = useState({
    country: 'Kenya',
    supportTask: 'stays' as View // e.g., 'stays', 'guides', 'drivers'
  });

  const navigation = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard, roles: ['super_admin', 'customer_support'] },
    { id: 'staff' as const, label: 'Staff Management', icon: UserCog, roles: ['super_admin'] },
    { id: 'users' as const, label: 'Users', icon: Users, roles: ['super_admin'] },
    { id: 'drivers' as const, label: 'Drivers', icon: Car, roles: ['super_admin', 'customer_support'] },
    { id: 'stays' as const, label: 'Accommodations', icon: Hotel, roles: ['super_admin', 'customer_support'] },
    { id: 'guides' as const, label: 'Guides', icon: ShieldCheck, roles: ['super_admin', 'customer_support'] },
    { id: 'trips' as const, label: 'Trips', icon: Map, roles: ['super_admin'] },
    { id: 'bookings' as const, label: 'Bookings', icon: BookOpen, roles: ['super_admin', 'customer_support'] },
    { id: 'payments' as const, label: 'Payments', icon: CreditCard, roles: ['super_admin'] },
    { id: 'support' as const, label: 'Support', icon: Headset, roles: ['super_admin', 'customer_support'] },
    { id: 'disputes' as const, label: 'Disputes', icon: AlertCircle, roles: ['super_admin', 'customer_support'] },
    { id: 'emergency' as const, label: 'Emergency SOS', icon: ShieldAlert, roles: ['super_admin', 'customer_support'] },
    { id: 'moderation' as const, label: 'Moderation', icon: MessageSquare, roles: ['super_admin'] },
    { id: 'compliance' as const, label: 'Compliance', icon: Shield, roles: ['super_admin'] },
    { id: 'alerts' as const, label: 'Alerts Center', icon: Bell, roles: ['super_admin', 'customer_support'] },
    { id: 'notifications' as const, label: 'Broadcasts', icon: Send, roles: ['super_admin', 'customer_support'] },
    { id: 'settings' as const, label: 'Settings', icon: Settings, roles: ['super_admin'] },
  ];

  const filteredNav = navigation.filter(item => {
    // Check role access
    const hasRoleAccess = item.roles.includes(role);
    if (!hasRoleAccess) return false;

    // RBAC for Customer Support
    if (role === 'customer_support') {
      const commonModules = ['dashboard', 'bookings', 'support', 'disputes', 'emergency', 'alerts'];
      // Show common modules + their assigned specific task module
      return commonModules.includes(item.id) || item.id === supportOfficerContext.supportTask;
    }

    return true;
  });

  const handleLogin = (userRole: Role, task?: View) => {
    setRole(userRole);
    if (userRole === 'customer_support' && task) {
      setSupportOfficerContext(prev => ({ ...prev, supportTask: task }));
      setCurrentView('dashboard');
    }
    setIsLogged(true);
  };

  if (!isLogged) {
    return <LoginView onLogin={handleLogin} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <DashboardView context={role === 'customer_support' ? supportOfficerContext : undefined} onNavigate={setCurrentView} />;
      case 'users': return <UserManagementView />;
      case 'staff': return <StaffManagementView />;
      case 'drivers': return <DriverManagementView context={role === 'customer_support' ? supportOfficerContext : undefined} />;
      case 'guides': return <GuideManagementView context={role === 'customer_support' ? supportOfficerContext : undefined} />;
      case 'trips': return <TripManagementView />;
      case 'bookings': return <BookingsView />;
      case 'payments': return <PaymentsView />;
      case 'disputes': return <DisputeManagementView />;
      case 'settings': return <SettingsView />;
      case 'support': return <CustomerSupportView />;
      case 'stays': return <StayManagementView context={role === 'customer_support' ? supportOfficerContext : undefined} />;
      case 'emergency': return <EmergencyResponseView />;
      case 'compliance': return <ComplianceView />;
      case 'alerts': return <AlertsCenterView />;
      case 'notifications': return <NotificationListView />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-warm font-sans">
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-[280px] bg-white border-r border-slate-200 z-50 lg:relative"
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

              <nav className="flex-1 px-4 space-y-1">
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
                      className="w-10 h-10 rounded-xl"
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative h-full">
        {/* Top Header */}
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

            {/* Alerts Dropdown Overlay */}
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
                      {MOCK_ALERTS.map((alert) => (
                        <div key={alert.id} className="p-4 border-b border-slate-50 hover:bg-warm/50 transition-colors cursor-pointer group">
                          <div className="flex gap-3">
                            <div className={cn(
                              "p-2 rounded-xl h-fit",
                              alert.type === 'info' ? "bg-primary/5 text-primary" :
                              alert.type === 'error' ? "bg-coral/5 text-coral" :
                              alert.type === 'success' ? "bg-success/5 text-success" :
                              "bg-yellow-500/5 text-yellow-500"
                            )}>
                              <alert.icon size={16} />
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
                      ))}
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

        {/* View Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-8">
          <div className="max-w-7xl mx-auto">
            {renderView()}
          </div>
        </div>
      </main>
    </div>
  );
}
