"use client";
import { useState } from "react";
import { cn } from "../lib/utils";
import {
  Eye,
  Activity,
  MapPin
} from "lucide-react";
const DisputeManagementView = () => {
  const [selectedCase, setSelectedCase] = useState({ id: "DP-001", user: "John Doe", guide: "Ahmed Khan", status: "Open", lastMessage: "The guide never showed up at the meeting point." });
  return <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 lg:h-[calc(100vh-200px)]">
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
          { id: "DP-001", user: "John Doe", guide: "Ahmed Khan", status: "High Priority", lastMessage: "The guide never showed up at the meeting point." },
          { id: "DP-002", user: "Mike Ross", guide: "Safari Pro", status: "Pending Review", lastMessage: "Vehicle was in poor condition and broke down." },
          { id: "DP-003", user: "Lara Croft", guide: "Temple Tours", status: "Awaiting Guide", lastMessage: "Tour duration was 2 hours less than advertised." }
        ].map((caseItem, i) => <div
          key={i}
          onClick={() => setSelectedCase(caseItem)}
          className={cn(
            "p-5 rounded-[24px] border transition-all cursor-pointer bg-white group",
            selectedCase?.id === caseItem.id ? "border-primary shadow-2xl shadow-primary/5 scale-[1.02]" : "border-earth/5 hover:border-slate-200"
          )}
        >
          <div className="flex justify-between items-start mb-3">
            <span className="text-[10px] font-black text-primary px-3 py-1 bg-warm rounded-lg tracking-widest">{caseItem.id}</span>
            <span className={cn(
              "text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded",
              caseItem.id === "DP-001" ? "bg-coral text-white" : "bg-earth/10 text-earth"
            )}>{caseItem.status}</span>
          </div>
          <h4 className="text-sm font-black text-earth leading-tight">{caseItem.user} <span className="text-slate-300 font-medium mx-1">vs</span> {caseItem.guide}</h4>
          <p className="text-xs text-slate-500 mt-3 line-clamp-2 leading-relaxed italic">"{caseItem.lastMessage}"</p>
        </div>)}
      </div>
    </div>

    <div className="lg:col-span-2 glass-card rounded-3xl overflow-hidden flex flex-col border-none shadow-xl shadow-slate-200/40 bg-white relative">
      <div className="p-8 border-b border-slate-100 flex flex-col sm:flex-row gap-2  justify-between items-center bg-white sticky top-0 z-10 shadow-sm shadow-slate-500/5">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-warm flex flex-shrink-0 items-center justify-center font-black text-earth border-2 border-white shadow-xl">JD</div>
          <div>
            <h4 className="text-lg font-black text-earth tracking-tight">Adjudication Detail: John Doe</h4>
            <p className="text-xs text-slate-400 font-medium flex items-center gap-2">
              <Activity size={14} className="text-coral" /> Active Mediation Thread
            </p>
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto md:flex-row">
          <button className="w-full md:w-auto bg-coral text-white px-4 sm:px-6 py-2 sm:py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-coral/90 shadow-xl shadow-coral/20">Full Refund</button>
          <button className="w-full md:w-auto bg-earth text-white px-4 sm:px-6 py-2 sm:py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-earth/90 shadow-xl shadow-earth/20">Rule for Partner</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-10 space-y-6 sm:space-y-8 bg-warm/10">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black flex-none">U</div>
          <div className="bg-white p-6 rounded-3xl rounded-tl-none shadow-xl border border-earth/5 max-w-[85%]">
            <p className="text-[10px] text-primary font-black mb-2 uppercase tracking-widest">Traveler: John Doe</p>
            <p className="text-sm text-earth leading-relaxed font-medium">
              The guide Ahmed hasn't arrived at the Burj Khalifa entrance. I've been waiting for nearly an hour and he's not picking up my calls. See attached evidence of my presence at the location.
            </p>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
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

      <div className="p-4 sm:p-8 border-t border-slate-100 bg-white">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center bg-warm/50 p-2 sm:p-3 rounded-2xl border border-earth/5">
          <input
            type="text"
            placeholder="Post Adjudication Notice / Moderator Intervenstion..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm px-4 font-medium"
          />
          <button className="bg-earth text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-earth/90 transition-all shadow-xl shadow-earth/20 w-full sm:w-auto">Send Directive</button>
        </div>
      </div>
    </div>
  </div>;
};
export default DisputeManagementView;
