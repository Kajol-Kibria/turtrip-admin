"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import {
   PauseCircle,
   Trash2,
   FileText,
   UserPlus,
   Shield
} from "lucide-react";
const StaffManagementView = () => {
   const [staff, setStaff] = useState([
      { id: "STF-001", name: "Alice Johnson", email: "alice@aturtrip.com", city: "Nairobi", country: "Kenya", task: "stays", status: "Active" },
      { id: "STF-002", name: "Bob Smith", email: "bob@aturtrip.com", city: "Lagos", country: "Nigeria", task: "guides", status: "Active" },
      { id: "STF-003", name: "Charlie Davis", email: "charlie@aturtrip.com", city: "Marrakesh", country: "Morocco", task: "drivers", status: "Pending" }
   ]);
   const [showAddModal, setShowAddModal] = useState(false);

   const handleSuspend = (id) => {
      setStaff(staff.map(s => s.id === id ? { ...s, status: s.status === "Suspended" ? "Active" : "Suspended" } : s));
   };

   const handleDelete = (id) => {
      setStaff(staff.filter(s => s.id !== id));
   };
   return <div className="space-y-6">
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
               {staff.map((s, i) => <tr key={i} className="hover:bg-warm/20 transition-colors group">
                  <td className="p-6">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-earth/5 flex items-center justify-center font-black text-earth">{s.name.split(" ").map((n) => n[0]).join("")}</div>
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
                        s.status === "Active" ? "bg-success/10 text-success" : 
                        s.status === "Suspended" ? "bg-amber-100 text-amber-600" : "bg-alert/10 text-alert"
                     )}>{s.status}</span>
                  </td>
                  <td className="p-6 text-right">
                     <div className="flex items-center justify-start gap-2">
                        <button 
                           onClick={() => handleSuspend(s.id)}
                           className={cn(
                              "p-2 rounded-xl transition-all border border-transparent",
                              s.status === "Suspended" ? "bg-success/10 text-success hover:border-success/20" : "hover:bg-amber-50 text-slate-400 hover:text-amber-600 hover:border-amber-100"
                           )}
                           title={s.status === "Suspended" ? "Activate" : "Suspend"}
                        >
                           <PauseCircle size={16} />
                        </button>
                        <button 
                           onClick={() => handleDelete(s.id)}
                           className="p-2 hover:bg-red-50 rounded-xl text-slate-400 hover:text-red-600 transition-all border border-transparent hover:border-red-100"
                           title="Delete"
                        >
                           <Trash2 size={16} />
                        </button>
                     </div>
                  </td>
               </tr>)}
            </tbody>
         </table>
      </div>

      <AnimatePresence>
         {showAddModal && <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setShowAddModal(false)}
               className="absolute inset-0 bg-earth/40 backdrop-blur-md"
            />
            <motion.div
               initial={{ scale: 0.9, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0, y: 20 }}
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
         </div>}
      </AnimatePresence>
   </div>;
};
export default StaffManagementView;
