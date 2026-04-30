"use client";
import { useState } from "react";
import { cn } from "../lib/utils";
import {
  ShieldAlert,
  AlertTriangle,
  Siren,
  Map
} from "lucide-react";
const EmergencyResponseView = () => {
  const [selectedSOS, setSelectedSOS] = useState({ id: "SOS-882", user: "Sarah Green", guide: "Ahmed Khan", location: "Merzouga Desert, Morocco", status: "Critical", phone: "+212 600 000 000" });
  return <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
            { id: "SOS-882", user: "Sarah Green", location: "Merzouga, Morocco", time: "2m ago", level: "Critical" },
            { id: "SOS-812", user: "Alex Wong", location: "Dubai Mall, UAE", time: "4h ago", level: "Resolved" }
          ].map((sos, i) => <div
            key={i}
            onClick={() => setSelectedSOS(sos)}
            className={cn(
              "p-5 rounded-3xl border cursor-pointer transition-all",
              selectedSOS?.id === sos.id ? "bg-coral text-white border-coral shadow-2xl shadow-coral/30" : "bg-warm/30 border-earth/5 hover:border-coral/20"
            )}
          >
            <div className="flex justify-between mb-3">
              <span className={cn("text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded", selectedSOS?.id === sos.id ? "bg-white/20" : "bg-coral/10 text-coral")}>{sos.id}</span>
              <span className="text-[9px] font-bold">{sos.time}</span>
            </div>
            <h4 className="font-black text-sm">{sos.user}</h4>
            <p className={cn("text-[10px] font-medium mt-1 flex items-center gap-1", selectedSOS?.id === sos.id ? "text-white/70" : "text-slate-400")}>
              <Map size={10} /> {sos.location}
            </p>
          </div>)}
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
      {selectedSOS ? <>
        <div className="p-4 sm:p-8 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-coral/10 text-coral flex items-center justify-center font-black shadow-xl">SOS</div>
            <div>
              <h3 className="text-2xl font-black text-earth tracking-tight">SOS Trigger: {selectedSOS.user}</h3>
              <p className="text-sm font-medium text-slate-400 mt-1">Live tracking active via Manjaro Safety Protocol</p>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none bg-coral text-white px-4 sm:px-8 py-3 sm:py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-coral/20">Emergency Dispatch</button>
          </div>
        </div>

        <div className="flex-1 p-4 sm:p-8 space-y-6 sm:space-y-8 bg-warm/10 relative overflow-hidden">
          {
            /* Live Tracking Map Mockup */
          }
          <div className="h-48 sm:h-64 bg-slate-900 rounded-[24px] sm:rounded-[32px] relative overflow-hidden shadow-2xl border-4 border-white">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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

        <div className="p-4 sm:p-8 border-t border-slate-100 bg-white flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button className="flex-1 bg-warm text-earth py-3 sm:py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all">Close as Resolved</button>
          <button className="flex-1 bg-earth text-white py-3 sm:py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-earth/20 hover:bg-earth/90 transition-all">Escalate to Legal</button>
        </div>
      </> : <div className="flex-1 flex flex-col items-center justify-center text-center p-20 opacity-30">
        <ShieldAlert size={64} className="mb-4 text-slate-300" />
        <h4 className="text-xl font-bold text-slate-400">No SOS Selected</h4>
        <p className="text-sm text-slate-400 mt-2">Select an active emergency from the feed to initiate safety protocol</p>
      </div>}
    </div>
  </div>;
};
export default EmergencyResponseView;
