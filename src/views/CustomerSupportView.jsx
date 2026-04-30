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
const CustomerSupportView = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const tickets = [
    { id: "TIC-102", user: "Fatima Al", subject: "Refund Request #BK-9902", status: "Priority", time: "2 mins ago", lastMsg: "I accidentally booked twice, please assist." },
    { id: "TIC-105", user: "Alex Wong", subject: "Driver did not show up", status: "In Progress", time: "15 mins ago", lastMsg: "The driver at Dubai Mall is not answering." },
    { id: "TIC-110", user: "Sarah Green", subject: "App Crashing", status: "Open", time: "45 mins ago", lastMsg: "I cannot see my active trips on the map." }
  ];
  return <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-180px)]">
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
const LoginView = ({ onLogin }) => {
  const [step, setStep] = useState("creds");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [selectedRole, setSelectedRole] = useState("super_admin");
  const [selectedTask, setSelectedTask] = useState("stays");
  const [email, setEmail] = useState("");
  const handleOtpChange = (val, idx) => {
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);
    if (val && idx < 3) {
      const next = document.getElementById(`otp-${idx + 1}`);
      next?.focus();
    }
  };
  return <div className="min-h-screen w-full flex items-center justify-center bg-warm p-6">
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
          onClick={() => setSelectedRole("super_admin")}
          className={cn(
            "flex-1 py-3 rounded-xl text-xs font-bold transition-all",
            selectedRole === "super_admin" ? "bg-white text-earth shadow-sm" : "text-slate-400 hover:text-slate-600"
          )}
        >
          Super Admin
        </button>
        <button
          onClick={() => setSelectedRole("customer_support")}
          className={cn(
            "flex-1 py-3 rounded-xl text-xs font-bold transition-all",
            selectedRole === "customer_support" ? "bg-white text-earth shadow-sm" : "text-slate-400 hover:text-slate-600"
          )}
        >
          Customer Support
        </button>
      </div>

      {step === "creds" ? <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={selectedRole === "super_admin" ? "admin@aturtrip.com" : "support@aturtrip.com"}
            className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
          />
        </div>

        {selectedRole === "customer_support" && <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Assigned Support Task</label>
          <select
            value={selectedTask}
            onChange={(e) => setSelectedTask(e.target.value)}
            className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 text-sm font-medium appearance-none bg-no-repeat bg-[right_1.25rem_center] bg-[length:1em_1em]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' /%3E%3C/svg%3E")` }}
          >
            <option value="guides">Guides Verification</option>
            <option value="stays">Stays (Accommodation) Verification</option>
            <option value="drivers">Drivers Verification</option>
          </select>
        </div>}

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Password</label>
          <input type="password" placeholder="••••••••" className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 text-sm font-medium" />
        </div>
        <button
          onClick={() => setStep("otp")}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all transform active:scale-95 flex items-center justify-center gap-2"
        >
          Continue to OTP <ChevronRight size={18} />
        </button>
      </div> : <div className="space-y-8">
        <div className="text-center space-y-2">
          <h3 className="font-bold text-lg text-earth">Two-Factor Authentication</h3>
          <p className="text-xs text-slate-400 font-medium">Please enter the 4-digit code from your app</p>
        </div>
        <div className="flex justify-center gap-3">
          {otp.map((digit, i) => <input
            key={i}
            id={`otp-${i}`}
            type="text"
            maxLength={1}
            value={digit}
            className="w-14 h-16 text-center text-2xl font-black bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20"
            onChange={(e) => handleOtpChange(e.target.value.replace(/\D/g, ""), i)}
          />)}
        </div>
        <button
          onClick={() => onLogin(selectedRole, selectedTask)}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all transform active:scale-95"
        >
          Verify & Log in as {selectedRole.replace("_", " ")}
        </button>
        <button
          onClick={() => setStep("creds")}
          className="w-full text-slate-400 text-xs font-bold hover:text-slate-600"
        >
          Back to login
        </button>
      </div>}
    </motion.div>
  </div>;
};
const SettingsView = () => {
  const [fees, setFees] = useState({
    driver: 15,
    stay: 12,
    guide: 10,
    cancellation: 5
  });
  const [policies, setPolicies] = useState({
    autoApproveGuides: false,
    requireInsurance: true,
    allowRefunds: true
  });
  return <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    {
      /* Pricing & Fees Section */
    }
    <div className="glass-card p-8 rounded-[40px] bg-white border-none shadow-xl shadow-slate-200/40 space-y-8">
      <div>
        <h3 className="text-xl font-black text-earth tracking-tight">Platform Financials</h3>
        <p className="text-sm text-slate-400 font-medium">Configure global commission rates and service fees.</p>
      </div>

      <div className="space-y-8">
        {[
          { id: "driver", label: "Driver Platform Fee (%)", color: "text-primary" },
          { id: "stay", label: "Accommodation Fee (%)", color: "text-success" },
          { id: "guide", label: "Guide Commission (%)", color: "text-brand" },
          { id: "cancellation", label: "Cancellation Penalty (%)", color: "text-alert" }
        ].map((fee) => <div key={fee.id} className="space-y-4">
          <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-slate-400">
            <span>{fee.label}</span>
            <span className={cn("px-4 py-1 rounded-full", fee.color.replace("text-", "bg-") + "/10", fee.color)}>{fees[fee.id]}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="30"
            value={fees[fee.id]}
            onChange={(e) => setFees({ ...fees, [fee.id]: parseInt(e.target.value) })}
            className={cn("w-full accent-earth h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer")}
          />
        </div>)}
      </div>
    </div>

    {
      /* Operational Policies */
    }
    <div className="space-y-8">
      <div className="glass-card p-8 rounded-[40px] bg-white border-none shadow-xl shadow-slate-200/40 space-y-8">
        <div>
          <h3 className="text-xl font-black text-earth tracking-tight">Marketplace Compliance</h3>
          <p className="text-sm text-slate-400 font-medium">Define safety and operational standards.</p>
        </div>

        <div className="space-y-6">
          {[
            { id: "requireInsurance", label: "Require Professional Liability Insurance", desc: "Sellers must upload proof of insurance to go live." },
            { id: "autoApproveGuides", label: "Auto-verify Verified Social Profiles", desc: "Trust users with linked & verified ID." },
            { id: "allowRefunds", label: "Enable Escrow Protection", desc: "Hold funds until trip completion." }
          ].map((policy) => <label key={policy.id} className="flex items-start gap-4 cursor-pointer group">
            <div className="relative pt-1">
              <input
                type="checkbox"
                checked={policies[policy.id]}
                onChange={() => setPolicies({ ...policies, [policy.id]: !policies[policy.id] })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
            </div>
            <div>
              <p className="text-sm font-black text-earth group-hover:text-primary transition-colors">{policy.label}</p>
              <p className="text-[10px] font-medium text-slate-400 mt-1">{policy.desc}</p>
            </div>
          </label>)}
        </div>
      </div>

      {
        /* Global Regions Wrapper */
      }
      <div className="glass-card p-8 rounded-[40px] bg-earth text-white border-none shadow-xl shadow-earth/20">
        <div className="flex justify-between items-center mb-6">
          <h4 className="font-black text-lg">Expansion Mode</h4>
          <Globe className="text-white/20" size={32} />
        </div>
        <p className="text-white/60 text-sm font-medium leading-relaxed">System is currently processing registrations from 12 countries. M-Pesa & Stripe automatic routing enabled.</p>
        <button className="w-full mt-8 bg-white/10 hover:bg-white/20 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Download regional report</button>
      </div>
    </div>
  </div>;
};
export default CustomerSupportView;
