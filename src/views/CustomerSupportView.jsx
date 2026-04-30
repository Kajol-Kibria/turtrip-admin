"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import {
  Mountain,
  ChevronRight,
  Search,
  MoreVertical,
  Globe,
  Headset
} from "lucide-react";
const CustomerSupportView = ({ onPreviewImage, onDownloadImage }) => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const tickets = [
    { id: "TIC-102", user: "Fatima Al", subject: "Refund Request #BK-9902", status: "Priority", time: "2 mins ago", lastMsg: "I accidentally booked twice, please assist." },
    { id: "TIC-105", user: "Alex Wong", subject: "Driver did not show up", status: "In Progress", time: "15 mins ago", lastMsg: "The driver at Dubai Mall is not answering." },
    { id: "TIC-110", user: "Sarah Green", subject: "App Crashing", status: "Open", time: "45 mins ago", lastMsg: "I cannot see my active trips on the map." }
  ];
  return <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 lg:h-[calc(100vh-180px)]">
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
        {tickets.map((t, i) => <div
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
              t.status === "Priority" ? "bg-coral text-white" : "bg-earth/10 text-earth"
            )}>{t.status}</span>
          </div>
        </div>)}
      </div>
    </div>

    <div className="lg:col-span-2 glass-card rounded-3xl overflow-hidden flex flex-col bg-white border-none shadow-xl shadow-slate-200/40 relative">
      {selectedTicket ? <>
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

        <div className="flex-1 overflow-y-auto p-4 sm:p-10 space-y-6 bg-warm/20">
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

        <div className="p-3 sm:p-6 bg-white border-t border-slate-100">
          <div className="flex gap-2 sm:gap-4 items-center bg-warm/50 p-1.5 sm:p-2 rounded-2xl border border-earth/5">
            <input type="text" placeholder="Type your response here..." className="flex-1 bg-transparent border-none focus:ring-0 text-sm px-2 sm:px-4 min-w-0" />
            <button className="bg-earth text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-xs font-bold hover:bg-earth/90 transition-all shrink-0">Send Reply</button>
          </div>
        </div>
      </> : <div className="flex-1 flex flex-col items-center justify-center text-center p-10 opacity-40">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-300 mb-4">
          <Headset size={32} />
        </div>
        <h4 className="font-bold text-slate-900">No Ticket Selected</h4>
        <p className="text-sm text-slate-500 mt-1">Select a conversation from the sidebar to start chat</p>
      </div>}
    </div>
  </div>;
};
export default CustomerSupportView;
