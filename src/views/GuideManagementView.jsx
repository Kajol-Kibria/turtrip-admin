"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import {
  CreditCard,
  X,
  ChevronRight,
  CheckCircle2,
  Eye,
  Globe,
  Shield,
  UserCheck,
  FileCheck,
  MessageSquare
} from "lucide-react";
const GuideManagementView = ({ context, onOpenChat }) => {
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [kycStep, setKycStep] = useState(1);
  const guides = [
    { name: "Ahmed Khan", type: "Individual", status: "Pending", city: "Dubai", country: "UAE", rating: 4.8, joined: "Apr 2026", docs: ["ID Card", "Tourism License"], kyc: "In Review" },
    { name: "Safari Pro Excursions", type: "Agency", status: "Suspicious", city: "Nairobi", country: "Kenya", rating: 3.2, joined: "Mar 2026", docs: ["Business Permit", "Safety Certs"], kyc: "Rejected" },
    { name: "Sophie Martin", type: "Individual", status: "Active", city: "Paris", country: "France", rating: 4.9, joined: "Jan 2026", docs: ["ID Card", "Tour Guide Cert"], kyc: "Verified" },
    { name: "Global Voyages Ltd", type: "Agency", status: "Active", city: "London", country: "United Kingdom", rating: 4.5, joined: "Feb 2026", docs: ["Full License Packet"], kyc: "Verified" }
  ];
  const filteredGuides = context ? guides.filter((g) => g.country === context.country) : guides;
  return <div className="space-y-6">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100">
      <div>
        <h3 className="font-bold text-lg">
          {context ? `${context.country} - Guide Management` : "Guide Management"}
        </h3>
        <p className="text-xs text-slate-400 mt-1">Verify credentials for solo guides and agencies</p>
      </div>
      <div className="flex bg-warm p-1 rounded-xl overflow-x-auto w-full sm:w-auto">
        {["All", "Individual", "Agencies", "Pending"].map((tab, i) => <button key={tab} className={cn("px-4 py-2 text-xs font-bold rounded-lg transition-all", i === 0 ? "bg-white shadow-sm text-primary" : "text-slate-400 hover:text-slate-600")}>
          {tab}
        </button>)}
      </div>
    </div>

    <div className="grid grid-cols-1 gap-4">
      {filteredGuides.map((guide, i) => <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} key={i} className="glass-card p-4 sm:p-5 rounded-2xl bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
        <div className="flex items-center gap-4 sm:gap-8 flex-wrap">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">KYC</p>
            <div className="flex items-center gap-1.5 justify-center">
              <div className={cn("w-1.5 h-1.5 rounded-full", guide.kyc === "Verified" ? "bg-success" : guide.kyc === "Rejected" ? "bg-coral" : "bg-brand")} />
              <span className="text-[10px] font-bold text-slate-700">{guide.kyc}</span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Status</p>
            <span className={cn(
              "px-3 py-1 rounded-full text-[11px] font-bold",
              guide.status === "Active" ? "bg-success/10 text-success" : guide.status === "Pending" ? "bg-primary/10 text-primary" : "bg-alert/10 text-alert"
            )}>
              {guide.status}
            </span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => {
              setSelectedGuide(guide);
              setKycStep(1);
            }} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-primary transition-colors">
              <Eye size={18} />
            </button>
            {guide.status === "Pending" && <button onClick={() => {
              setSelectedGuide(guide);
              setKycStep(1);
            }} className="px-4 py-2 rounded-xl text-sm font-bold bg-primary text-white hover:bg-primary/90 transition-all">
              Review
            </button>}
          </div>
        </div>
      </motion.div>)}
    </div>

    <AnimatePresence>
      {selectedGuide && <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedGuide(null)} className="absolute inset-0 bg-earth/40 backdrop-blur-md" />
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative max-w-2xl w-full bg-white rounded-[24px] sm:rounded-[40px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
          <div className="p-4 sm:p-8 border-b border-slate-100 flex justify-between items-center bg-warm">
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

          <div className="flex-1 overflow-y-auto p-4 sm:p-10 space-y-8 sm:space-y-10">
            <div className="flex justify-end pr-10 -mb-6">
               <button 
                 onClick={() => onOpenChat?.(selectedGuide.name)}
                 className="flex items-center gap-2 bg-warm hover:bg-slate-100 text-earth px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
               >
                 <MessageSquare size={14} /> View Chat History
               </button>
            </div>
            {
              /* Progress Tracker */
            }
            <div className="flex justify-between relative overflow-x-auto px-4 sm:px-10 py-4">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
              {[
                { label: "Documents", icon: FileCheck },
                { label: "Agency License", icon: Globe },
                { label: "Security", icon: Shield },
                { label: "Final Audit", icon: CheckCircle2 }
              ].map((step, i) => <div key={i} className="relative z-10 flex flex-col items-center">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500",
                  kycStep > i + 1 ? "bg-success text-white" : kycStep === i + 1 ? "bg-earth text-white scale-125 shadow-lg shadow-earth/20" : "bg-white border-2 border-slate-100 text-slate-300"
                )}>
                  {kycStep > i + 1 ? <CheckCircle2 size={20} /> : <step.icon size={20} />}
                </div>
                <span className={cn("text-[10px] font-bold mt-2 uppercase tracking-widest", kycStep === i + 1 ? "text-earth" : "text-slate-400")}>{step.label}</span>
              </div>)}
            </div>

            {
              /* Step Content */
            }
            <div className="bg-warm/50 rounded-[32px] p-8 border border-earth/5">
              {kycStep === 1 && <div className="space-y-6">
                <h4 className="font-bold flex items-center gap-2 text-earth"><CreditCard size={18} /> Official Certification Review</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedGuide.docs.map((doc) => <div key={doc} className="group relative aspect-video bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 hover:border-earth transition-colors cursor-pointer shadow-sm">
                    <img src={`https://picsum.photos/seed/${doc}/400/250`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all transform group-hover:scale-105" alt={doc} referrerPolicy="no-referrer" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/90 backdrop-blur-sm border-t border-slate-100">
                      <p className="text-[10px] font-bold uppercase truncate text-earth">{doc}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-success" />
                        <span className="text-[8px] font-bold text-success uppercase">Legitimacy Confirmed</span>
                      </div>
                    </div>
                  </div>)}
                </div>
              </div>}
              {kycStep === 2 && <div className="space-y-6">
                <h4 className="font-bold flex items-center gap-2 text-earth"><Globe size={18} /> Global Database Check</h4>
                <div className="space-y-4">
                  {[
                    { l: "INTERPOL Database Scan", s: "CLEAN" },
                    { l: "Tourism Authority Registry", s: "REGISTERED" },
                    { l: "Previous Agency History", s: "NO DISPUTES" }
                  ].map((check, idx) => <div key={idx} className="flex justify-between items-center p-4 bg-white rounded-2xl border border-slate-100">
                    <span className="text-xs font-bold text-slate-600">{check.l}</span>
                    <span className="text-[10px] font-black text-success bg-success/10 px-3 py-1 rounded-full">{check.s}</span>
                  </div>)}
                </div>
              </div>}
              {kycStep >= 3 && <div className="text-center py-10 space-y-6">
                <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto">
                  <UserCheck size={40} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-earth">Review Finalized</h4>
                  <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">This guide has passed all cross-platform verification protocols and is ready for onboarding.</p>
                </div>
              </div>}
            </div>
          </div>

          <div className="p-4 sm:p-8 bg-warm border-t border-slate-100 flex flex-col sm:flex-row gap-3 sm:gap-4">
            {kycStep < 3 ? <>
              <button onClick={() => setKycStep((prev) => Math.max(1, prev - 1))} className="px-8 py-4 rounded-2xl font-bold bg-white border border-slate-200 text-slate-400 hover:text-earth transition-all">Back</button>
              <button onClick={() => setKycStep((prev) => prev + 1)} className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2">Next Stage <ChevronRight size={18} /></button>
            </> : <>
              <button onClick={() => setSelectedGuide(null)} className="flex-1 bg-white border border-alert text-alert py-4 rounded-2xl font-bold hover:bg-alert/5 transition-all">Decline & Blacklist</button>
              <button onClick={() => setSelectedGuide(null)} className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all">Confirm Approval</button>
            </>}
          </div>
        </motion.div>
      </div>}
    </AnimatePresence>
  </div>;
};
export default GuideManagementView;
