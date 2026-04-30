"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import {
  ShieldCheck,
  X,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Eye,
  Car,
  Shield,
  UserCog,
  FileCheck,
  Smartphone,
  MessageSquare
} from "lucide-react";
const DriverManagementView = ({ context, onOpenChat, onPreviewImage, onDownloadImage }) => {
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [kycStep, setKycStep] = useState(1);
  const drivers = [
    { id: "DRV-001", name: "John Silva", vehicle: "Toyota Camry 2024", color: "Midnight Black", status: "Active", country: "UAE", phone: "+971 50 123 4567", joined: "Apr 10, 2026", kyc: "Verified" },
    { id: "DRV-002", name: "Mario Rossi", vehicle: "Mercedes V-Class", color: "Silver Metallic", status: "Pending", country: "UAE", phone: "+971 52 987 6543", joined: "Apr 25, 2026", kyc: "In Review" },
    { id: "DRV-003", name: "Alain Prost", vehicle: "Tesla Model 3", color: "Pearl White", status: "Suspended", country: "France", phone: "+33 61 234 5678", joined: "Jan 15, 2026", kyc: "Rejected" },
    { id: "DRV-004", name: "Lewis Hamilton", vehicle: "Range Rover Sport", color: "Deep Red", status: "Active", country: "United Kingdom", phone: "+44 77 000 0000", joined: "Feb 20, 2026", kyc: "Verified" },
    { id: "DRV-005", name: "Kipchoge Keino", vehicle: "Nissan X-Trail", color: "White", status: "Active", country: "Kenya", phone: "+254 700 111 222", joined: "Mar 12, 2026", kyc: "Verified" }
  ];
  const filteredDrivers = context ? drivers.filter((d) => d.country === context.country) : drivers;
  return <div className="space-y-6">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100">
      <div>
        <h3 className="font-bold text-lg">
          {context ? `${context.country} - Ride Management` : "Ride Management"}
        </h3>
        <p className="text-xs text-slate-400 mt-1">Manage driver onboarding and vehicle verification</p>
      </div>
      <button className="bg-primary text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary/90 shadow-lg shadow-primary/20 w-full sm:w-auto justify-center">
        <Car size={18} /> Onboard New Driver
      </button>
    </div>

    <div className="glass-card rounded-3xl overflow-hidden border-none shadow-xl shadow-slate-200/40 bg-white">
      <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[900px]">
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
          {filteredDrivers.map((driver, i) => <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
            <td className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 min-w-10 min-h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
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
                  driver.kyc === "Verified" ? "bg-success" : driver.kyc === "In Review" ? "bg-brand" : "bg-alert"
                )} />
                <span className="text-xs font-bold text-slate-700">{driver.kyc}</span>
              </div>
            </td>
            <td className="p-6">
              <span className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold tracking-wider",
                driver.status === "Active" ? "bg-success/10 text-success" : driver.status === "Pending" ? "bg-brand/10 text-brand" : "bg-alert/10 text-alert"
              )}>
                {driver.status}
              </span>
            </td>
            <td className="p-6">
              <div className="flex gap-2">
                {driver.status === "Pending" ? <button
                  onClick={() => {
                    setSelectedDriver(driver);
                    setKycStep(1);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary/90 transition-all shadow-md shadow-primary/10"
                >
                  Review
                </button> : <button
                  onClick={() => {
                    setSelectedDriver(driver);
                    setKycStep(1);
                  }}
                  className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-100 text-slate-400 hover:text-primary transition-all"
                >
                  <Eye size={18} />
                </button>}
                <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-100 text-slate-400 hover:text-alert transition-all">
                  <XCircle size={16} />
                </button>
              </div>
            </td>
          </tr>)}
        </tbody>
      </table>
      </div>
    </div>

    <AnimatePresence>
      {selectedDriver && <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedDriver(null)} className="absolute inset-0 bg-earth/40 backdrop-blur-md" />
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative max-w-2xl w-full bg-white rounded-[24px] sm:rounded-[40px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
          <div className="p-4 sm:p-8 border-b border-slate-100 flex justify-between items-center bg-warm">
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

          <div className="flex-1 overflow-y-auto p-4 sm:p-10 space-y-8 sm:space-y-10">
            <div className="flex justify-end pr-10 -mb-6">
               <button 
                 onClick={() => onOpenChat?.(selectedDriver.name)}
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
                { label: "Identity", icon: UserCog },
                { label: "Vehicle", icon: Car },
                { label: "Biometrics", icon: Smartphone },
                { label: "Background", icon: Shield }
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
            <div className="bg-warm/50 rounded-[32px] p-8 border border-earth/5">
              {kycStep === 1 && <div className="space-y-6">
                <h4 className="font-bold flex items-center gap-2 text-earth"><FileCheck size={18} /> Government ID Verification</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="aspect-video bg-slate-200 rounded-2xl overflow-hidden relative group">
                      <img src="https://picsum.photos/seed/id-front/400/250" className="w-full h-full object-cover" alt="ID Front" />
                      <div className="absolute inset-0 bg-earth/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => onPreviewImage?.("https://picsum.photos/seed/id-front/400/250", "passport_front.jpg")}
                          className="bg-white text-earth px-4 py-2 rounded-xl text-xs font-bold"
                        >View Fullscreen</button>
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
              </div>}
              {kycStep === 2 && <div className="space-y-6">
                <h4 className="font-bold flex items-center gap-2 text-earth"><Car size={18} /> Vehicle Safety Compliance</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {["Front", "Side", "Interior", "Chassis", "Odometer", "Plate"].map((label) => <div key={label} className="relative aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden group">
                    <img src={`https://picsum.photos/seed/car-${label}/300/300`} className="w-full h-full object-cover" alt={label} />
                    <div className="absolute top-2 right-2 bg-success text-white p-1 rounded-full"><CheckCircle2 size={12} /></div>
                    <span className="absolute bottom-2 left-2 text-[8px] font-bold text-white bg-black/40 px-2 py-0.5 rounded uppercase">{label}</span>
                  </div>)}
                </div>
              </div>}
              {kycStep === 3 && <div className="space-y-6 text-center py-10">
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
              </div>}
              {kycStep >= 4 && <div className="flex flex-col items-center justify-center py-10 text-center space-y-6">
                <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center animate-bounce">
                  <ShieldCheck size={40} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-earth tracking-tight">Final Background Audit</h4>
                  <p className="text-sm text-slate-500 max-w-sm mt-2">No criminal records found in regional or global databases. Driver history is clean and ready for activation.</p>
                </div>
              </div>}
            </div>
          </div>

          <div className="p-4 sm:p-8 bg-warm border-t border-slate-100 flex flex-col sm:flex-row gap-3 sm:gap-4">
            {kycStep < 4 ? <>
              <button onClick={() => setKycStep((prev) => Math.max(1, prev - 1))} className="px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold bg-white border border-slate-200 text-slate-400 hover:text-earth transition-all">Previous</button>
              <button onClick={() => setKycStep((prev) => prev + 1)} className="flex-1 bg-earth text-white py-3 sm:py-4 rounded-2xl font-bold hover:bg-earth/90 transition-all flex items-center justify-center gap-2">Continue Check <ChevronRight size={18} /></button>
            </> : <>
              <button onClick={() => setSelectedDriver(null)} className="flex-1 bg-white border border-coral text-coral py-3 sm:py-4 rounded-2xl font-bold hover:bg-coral/5 transition-all">Deny Verification</button>
              <button onClick={() => setSelectedDriver(null)} className="flex-1 bg-success text-white py-3 sm:py-4 rounded-2xl font-bold hover:bg-success/90 transition-all">Verify & Approve</button>
            </>}
          </div>
        </motion.div>
      </div>}
    </AnimatePresence>
  </div>;
};
export default DriverManagementView;
