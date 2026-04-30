"use client";
import { motion } from "motion/react";
import React, { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import {
  Users,
  BookOpen,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
  Globe,
  Car,
  Hotel,
  Activity,
  Timer,
  Map
} from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
const REVENUE_DATA = [
  { name: "Mon", revenue: 4200 },
  { name: "Tue", revenue: 3800 },
  { name: "Wed", revenue: 5100 },
  { name: "Thu", revenue: 4900 },
  { name: "Fri", revenue: 6200 },
  { name: "Sat", revenue: 8400 },
  { name: "Sun", revenue: 7900 }
];
const ACTIVENESS_DATA = [
  { name: "00:00", value: 20 },
  { name: "04:00", value: 15 },
  { name: "08:00", value: 45 },
  { name: "12:00", value: 90 },
  { name: "16:00", value: 75 },
  { name: "20:00", value: 60 },
  { name: "23:59", value: 35 }
];
const TRIP_DISTRIBUTION = [
  { name: "Cultural", value: 400, color: "#023E8A" },
  { name: "Adventure", value: 300, color: "#FB8500" },
  { name: "Leisure", value: 300, color: "#80B918" }
];
const DashboardView = ({ context, onNavigate }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const supportStats = [
    { label: "Total Bookings", value: "1,284", change: "+8%", icon: BookOpen, color: "text-primary" },
    { label: "Active Trips", value: "45", change: "+12%", icon: Map, color: "text-brand" },
    { label: "Support Completed", value: "892", change: "94%", icon: CheckCircle2, color: "text-success" },
    { label: "Support Pending", value: "12", change: "-5", icon: Timer, color: "text-alert" }
  ];
  return <div className="space-y-8">
    {
      /* Contextual Header */
    }
    {context && <div className="bg-earth p-8 rounded-[32px] text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl shadow-earth/20 relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-brand rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-brand/20">{context.country}</span>
          <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest text-white">{context.supportTask.toUpperCase()} PROVIDER SUPPORT</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight leading-none">{context.country} - {context.supportTask.charAt(0).toUpperCase() + context.supportTask.slice(1)} Dashboard</h1>
        <p className="text-white/60 font-medium mt-2">Personalized marketplace metrics for your assigned jurisdiction.</p>
      </div>
      <Activity className="absolute -right-10 -bottom-10 w-48 h-48 text-white/5 rotate-12" />
    </div>}

    {
      /* Stats Grid */
    }
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {(context ? supportStats : [
        { label: "Total Users", value: "12,842", change: "+12%", icon: Users, color: "text-brand", bg: "bg-brand/10" },
        { label: "Total Guides", value: "840", change: "+5%", icon: ShieldCheck, color: "text-primary", bg: "bg-primary/10" },
        { label: "Total Drivers", value: "452", change: "+15%", icon: Car, color: "text-brand", bg: "bg-brand/10" },
        { label: "Total Stays", value: "184", change: "+22%", icon: Hotel, color: "text-primary", bg: "bg-primary/10" },
        { label: "Total Bookings", value: "4,204", change: "+18%", icon: BookOpen, color: "text-success", bg: "bg-success/10" },
        { label: "Active Trips", value: "156", change: "-2%", icon: Map, color: "text-brand", bg: "bg-brand/10" }
      ]).map((stat, i) => <motion.div
        key={i}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1 }}
        className="glass-card p-6 rounded-[32px] bg-white border-none shadow-xl shadow-slate-200/40 group hover:-translate-y-1 transition-all"
      >
        <div className="flex justify-between items-start mb-4">
          <div className={cn("p-4 rounded-2xl transition-colors", stat.color.replace("text", "bg") + "/10")}>
            <stat.icon className={stat.color} size={24} />
          </div>
          <span className={cn("text-xs font-black", stat.change.startsWith("+") ? "text-success" : "text-alert")}>
            {stat.change}
          </span>
        </div>
        <h3 className="text-3xl font-black text-earth tracking-tighter">{stat.value}</h3>
        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">{stat.label}</p>
      </motion.div>)}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {
        /* Marketplace Performance Chart */
      }
      <div className="lg:col-span-2 space-y-8">
        <div className="glass-card p-8 rounded-[40px] bg-white border-none shadow-xl shadow-slate-200/40">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-earth tracking-tight">{context ? "System Activeness" : "Marketplace Activity"}</h3>
            <select className="bg-warm border-none rounded-xl text-[10px] font-black uppercase tracking-widest px-4 py-2">
              <option>Real-time</option>
              <option>Last 24 Hours</option>
              {!context && <option>Last 30 Days</option>}
            </select>
          </div>
          <div className="h-80 w-full">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <AreaChart data={context ? ACTIVENESS_DATA : REVENUE_DATA}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={context ? "#FB8500" : "#1C1C1E"} stopOpacity={0.1} />
                      <stop offset="95%" stopColor={context ? "#FB8500" : "#1C1C1E"} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94A3B8", fontWeight: 600 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94A3B8", fontWeight: 600 }} />
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
            )}
          </div>
        </div>

        {
          /* Country Support Breakdown */
        }
        {!context && <div className="glass-card p-8 rounded-[40px] bg-white border-none shadow-xl shadow-slate-200/40">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-earth tracking-tight">Regional Support Distribution</h3>
            <Globe className="text-slate-200" size={24} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { country: "Kenya", officers: 24, status: "Active" },
              { country: "UAE", officers: 18, status: "Active" },
              { country: "Nigeria", officers: 32, status: "High Volume" },
              { country: "Morocco", officers: 12, status: "Active" },
              { country: "France", officers: 9, status: "Stable" },
              { country: "United Kingdom", officers: 15, status: "Stable" }
            ].map((item, i) => <div key={i} className="flex items-center justify-between p-4 bg-warm/30 rounded-2xl border border-earth/5 hover:bg-white hover:shadow-lg transition-all">
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
            </div>)}
          </div>
        </div>}
      </div>

      {
        /* Recent Alerts Feed */
      }
      <div className="flex flex-col gap-6">
        <div className="glass-card p-6 rounded-[32px] bg-white border-none shadow-xl shadow-slate-200/40 flex-1">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-earth uppercase tracking-widest text-xs">Recent Alerts</h3>
            <button
              onClick={() => onNavigate?.("alerts")}
              className="text-[10px] font-black text-primary uppercase hover:underline"
            >View All</button>
          </div>
          <div className="space-y-4">
            {[
              { title: "New KYC Audit", desc: "West Park Hotels", type: "KYC", color: "bg-brand" },
              { title: "SOS Triggered", desc: "Sarah Green (Morocco)", type: "SOS", color: "bg-coral" },
              { title: "Dispute Lodged", desc: "DP-002: Mike vs Safari", type: "D", color: "bg-earth" },
              { title: "Booking Alert", desc: "$5,400 Premium Tour", type: "B", color: "bg-success" }
            ].map((item, i) => <div key={i} className="flex items-center justify-between p-3 bg-warm/30 rounded-2xl border border-earth/5 group hover:bg-white hover:shadow-lg transition-all">
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-[10px]", item.color)}>{item.type}</div>
                <div>
                  <p className="text-[11px] font-black text-earth leading-none">{item.title}</p>
                  <p className="text-[9px] text-slate-400 font-bold mt-1">{item.desc}</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate?.("alerts")}
                className="p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-earth text-white rounded-lg shadow-sm"
              >
                <ChevronRight size={14} />
              </button>
            </div>)}
          </div>
          <button
            onClick={() => onNavigate?.("alerts")}
            className="w-full mt-6 bg-earth/5 text-earth py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-earth hover:text-white transition-all"
          >
            Go to inbox
          </button>
        </div>
      </div>
    </div>
  </div>;
};
export default DashboardView;
