"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import {
  ShieldCheck,
  X,
  ChevronRight,
  Search,
  CheckCircle2,
  Eye,
  FileCheck,
  Hotel,
  Bed,
  Activity,
  FileText,
  ListChecks,
  Map
} from "lucide-react";
const StayManagementView = ({ context, onOpenChat, onPreviewImage, onDownloadImage }) => {
  const [selectedStay, setSelectedStay] = useState(null);
  const [activeTab, setActiveTab] = useState("All");
  const [kycStep, setKycStep] = useState(1);
  const stays = [
    {
      id: "STY-201",
      name: "West Park Hotels",
      type: "Hotel",
      address: "Plot 4, Silicon Valley Estate, Lagos",
      country: "Nigeria",
      email: "contact@westpark.com",
      phone: "+234 801 234 5678",
      numRooms: 45,
      status: "Active",
      kyc: "Verified",
      wallet: "$12,450.00",
      rooms: [
        { tier: "Luxury Suite", beds: 1, price: "$250", image: "https://picsum.photos/seed/stay1/400/300" },
        { tier: "Standard Room", beds: 2, price: "$120", image: "https://picsum.photos/seed/stay2/400/300" }
      ]
    },
    {
      id: "STY-202",
      name: "Sahara Glamping Site",
      type: "Camp",
      address: "Route de Zagora, Merzouga, Morocco",
      country: "Morocco",
      email: "info@saharaglamp.ma",
      phone: "+212 524 987 654",
      numRooms: 12,
      status: "Pending",
      kyc: "In Review",
      wallet: "$0.00",
      rooms: [
        { tier: "Starry Tent", beds: 2, price: "$180", image: "https://picsum.photos/seed/stay3/400/300" }
      ]
    },
    {
      id: "STY-203",
      name: "Urban Studio Loft",
      type: "Short Let",
      address: "32 Oak Street, Nairobi, Kenya",
      country: "Kenya",
      email: "loft@urbanstays.co.ke",
      phone: "+254 712 345 678",
      numRooms: 1,
      status: "Active",
      kyc: "Verified",
      wallet: "$5,200.00",
      rooms: [
        { tier: "Loft Suite", beds: 1, price: "$95", image: "https://picsum.photos/seed/stay4/400/300" }
      ]
    }
  ];
  const countryFilteredStays = context ? stays.filter((s) => s.country === context.country) : stays;
  const filteredStays = activeTab === "All" ? countryFilteredStays : countryFilteredStays.filter((s) => s.status === activeTab);
  return <div className="space-y-6">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex bg-warm p-1 rounded-xl">
        {["All", "Pending", "Active"].map((tab) => <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={cn(
            "px-6 py-2 text-xs font-bold rounded-lg transition-all",
            activeTab === tab ? "bg-white shadow-sm text-primary" : "text-slate-500 hover:text-slate-900"
          )}
        >
          {tab === "All" ? "All Accommodations" : tab}
        </button>)}
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
        <h4 className="text-earth font-black text-xs mr-4">{context ? `${context.country} Regional Feed` : "Global Marketplace"}</h4>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search by stay name..."
            className="pl-10 pr-4 py-2 bg-warm border-none rounded-xl text-xs font-medium focus:ring-2 focus:ring-primary/20 w-full sm:w-64"
          />
        </div>
      </div>
    </div>


    <div className="glass-card rounded-3xl overflow-hidden border-none shadow-xl shadow-slate-200/40 bg-white">
      <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[800px]">
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
          {filteredStays.map((stay, i) => <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
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
                  stay.kyc === "Verified" ? "bg-success" : stay.kyc === "In Review" ? "bg-brand" : "bg-alert"
                )} />
                <span className="text-xs font-bold text-slate-700">{stay.kyc}</span>
              </div>
            </td>
            <td className="p-6">
              <span className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold tracking-wider",
                stay.status === "Active" ? "bg-success/10 text-success" : stay.status === "Pending" ? "bg-brand/10 text-brand" : "bg-alert/10 text-alert"
              )}>
                {stay.status}
              </span>
            </td>
            <td className="p-6">
              {stay.status === "Pending" ? <button
                onClick={() => {
                  setSelectedStay(stay);
                  setKycStep(1);
                }}
                className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
              >
                Review
              </button> : <button
                onClick={() => {
                  setSelectedStay(stay);
                  setKycStep(1);
                }}
                className="p-2 hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-slate-100 transition-all text-slate-400 hover:text-primary"
              >
                <Eye size={18} />
              </button>}
            </td>
          </tr>)}
        </tbody>
      </table>
      </div>
    </div>

    <AnimatePresence>
      {selectedStay && <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-12">
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
          className="relative max-w-5xl w-full bg-white rounded-[24px] sm:rounded-[40px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          <div className="p-4 sm:p-8 border-b border-slate-100 flex justify-between items-center bg-warm">
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

          <div className="flex-1 overflow-y-auto p-4 sm:p-10 space-y-8 sm:space-y-10">
            {
              /* Progress Tracker */
            }
            <div className="flex justify-between relative overflow-x-auto px-4 sm:px-10 py-4">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
              {[
                { label: "Documents", icon: FileCheck },
                { label: "Health & Safety", icon: Activity },
                { label: "Room Audit", icon: Bed },
                { label: "Final Approval", icon: CheckCircle2 }
              ].map((step, i) => <div key={i} className="relative z-10 flex flex-col items-center">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500",
                  kycStep > i + 1 ? "bg-success text-white" : kycStep === i + 1 ? "bg-earth text-white scale-125 shadow-lg shadow-earth/20" : "bg-white border-2 border-slate-100 text-slate-300"
                )}>
                  {kycStep > i + 1 ? <CheckCircle2 size={20} /> : <step.icon size={20} />}
                </div>
                <span className={cn(
                  "text-[10px] font-bold mt-2 uppercase tracking-widest",
                  kycStep === i + 1 ? "text-earth" : "text-slate-400"
                )}>{step.label}</span>
              </div>)}
            </div>

            {
              /* Step Content */
            }
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="bg-warm/50 rounded-[32px] p-8 border border-earth/5 min-h-[400px]">
                  {kycStep === 1 && <div className="space-y-8">
                    <div className="flex flex-wrap gap-1 justify-between items-center">
                      <h4 className="font-bold flex items-center gap-2 text-earth"><FileText size={18} /> Business Registration Review</h4>
                      <span className="text-[10px] font-black bg-success/10 text-success px-3 py-1 rounded-full uppercase">AI Verified</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                      <div className="space-y-4">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Certificate of Incorporation</p>
                        <div className="aspect-[4/3] bg-slate-200 rounded-3xl overflow-hidden relative group shadow-xl">
                          <img src="https://picsum.photos/seed/cert/400/300" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-earth/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => onPreviewImage?.("https://picsum.photos/seed/cert/400/300", "incorporation_cert.jpg")}
                              className="text-white"
                            >
                              <Eye size={32} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-6">
                        {[
                          { l: "Entity Name matches", s: true },
                          { l: "Tax ID (V-8820) Active", s: true },
                          { l: "Owner ID matches registration", s: true }
                        ].map((item, i) => <div key={i} className="flex justify-between items-center p-4 bg-white rounded-2xl border border-earth/5">
                          <span className="text-xs font-bold text-slate-600">{item.l}</span>
                          <CheckCircle2 size={16} className="text-success" />
                        </div>)}
                      </div>
                    </div>
                  </div>}

                  {kycStep === 2 && <div className="space-y-8">
                    <h4 className="font-bold flex items-center gap-2 text-earth"><Activity size={18} /> Health & Fire Safety Compliance</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {["Fire Exit Plan", "Kitchen Hygiene", "Pool Safety"].map((item) => <div key={item} className="space-y-3">
                        <div className="aspect-square bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
                          <img src={`https://picsum.photos/seed/safety-${item}/200/200`} className="w-full h-full object-cover" />
                        </div>
                        <p className="text-[10px] font-black text-center text-slate-500 uppercase">{item}</p>
                      </div>)}
                    </div>
                    <div className="p-6 bg-brand/5 rounded-3xl border border-brand/10">
                      <p className="text-xs font-medium text-earth/80">Self-inspection report submitted on Apr 21. Water quality levels within Dubai Municipality standards.</p>
                    </div>
                  </div>}

                  {kycStep === 3 && <div className="space-y-8">
                    <h4 className="font-bold flex items-center gap-2 text-earth"><ListChecks size={18} /> Room Tier & Asset Audit</h4>
                    <div className="space-y-6">
                      {selectedStay.rooms.map((room, i) => <div key={i} className="flex flex-col md:flex-row items-center gap-6 p-4 bg-white rounded-3xl border border-earth/5">
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
                      </div>)}
                    </div>
                  </div>}

                  {kycStep >= 4 && <div className="flex flex-col items-center justify-center min-h-[300px] text-center space-y-6">
                    <div className="w-24 h-24 bg-success/10 text-success rounded-full flex items-center justify-center animate-bounce">
                      <CheckCircle2 size={48} />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-earth tracking-tight">Onboarding Audit Passed</h4>
                      <p className="text-sm text-slate-400 max-w-sm font-medium mt-2">All documents verified and safety standards met according to Manjaro global compliance framework.</p>
                    </div>
                  </div>}
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
                      <button 
                        onClick={() => onOpenChat?.(selectedStay.name)}
                        className="w-full bg-white text-earth py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-200 hover:bg-slate-50"
                      >View Chat History</button>
                      <button className="w-full bg-white text-earth py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-200 hover:bg-slate-50">Reservation Logs</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-8 bg-warm border-t border-slate-100 flex flex-col sm:flex-row gap-3 sm:gap-4">
            {kycStep < 4 ? <>
              <button onClick={() => setKycStep((prev) => Math.max(1, prev - 1))} className="px-8 py-4 rounded-2xl font-bold bg-white border border-slate-200 text-slate-400 hover:text-earth transition-all">Previous</button>
              <button onClick={() => setKycStep((prev) => prev + 1)} className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2">Continue Check <ChevronRight size={18} /></button>
            </> : <>
              <button onClick={() => setSelectedStay(null)} className="flex-1 bg-white border border-alert text-alert py-4 rounded-2xl font-bold hover:bg-alert/5 transition-all">Decline Application</button>
              <button onClick={() => setSelectedStay(null)} className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2">Approve Integrity & Go Live <CheckCircle2 size={18} /></button>
            </>}
          </div>
        </motion.div>
      </div>}
    </AnimatePresence>
  </div>;
};
export default StayManagementView;
