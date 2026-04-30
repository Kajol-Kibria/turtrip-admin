"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import {
  Mountain,
  ChevronRight,
  Globe
} from "lucide-react";
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
export default LoginView;
