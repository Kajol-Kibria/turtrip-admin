"use client";
import { useState } from "react";
import { cn } from "../lib/utils";
import {
  ShieldAlert,
  Activity,
  FileText,
  Unlock,
  RefreshCw
} from "lucide-react";
const ComplianceView = () => {
  const [policyType, setPolicyType] = useState("privacy");
  const [region, setRegion] = useState("United Arab Emirates (Home)");
  const [forceReaccept, setForceReaccept] = useState(false);
  const [version, setVersion] = useState("2.4.1");
  const [isDeploying, setIsDeploying] = useState(false);
  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      alert(`${policyType === "privacy" ? "Privacy Policy" : "Terms of Use"} v${version} has been deployed and ${forceReaccept ? "force-pushed to all users" : "updates applied"} for ${region}.`);
    }, 1500);
  };
  return <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    {
      /* Policy Editor */
    }
    <div className="glass-card p-5 sm:p-10 rounded-[32px] sm:rounded-[40px] bg-white border-none shadow-xl shadow-slate-200/40 space-y-6 sm:space-y-8 flex flex-col">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-black text-earth tracking-tight">Global Compliance Engine</h3>
          <p className="text-sm font-medium text-slate-400 mt-2">Manage legal frameworks and mandatory user agreements.</p>
        </div>
        <ShieldAlert className="text-primary/20" size={32} />
      </div>

      <div className="flex gap-2 p-1.5 bg-warm/50 rounded-2xl border border-earth/5">
        <button
          onClick={() => setPolicyType("privacy")}
          className={cn(
            "flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
            policyType === "privacy" ? "bg-earth text-white shadow-lg" : "text-slate-400 hover:text-earth"
          )}
        >
          Privacy Policy
        </button>
        <button
          onClick={() => setPolicyType("terms")}
          className={cn(
            "flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
            policyType === "terms" ? "bg-earth text-white shadow-lg" : "text-slate-400 hover:text-earth"
          )}
        >
          Terms of Use
        </button>
      </div>

      <div className="space-y-6 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Target Region</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full px-5 py-3 bg-warm/30 border-none rounded-xl text-xs font-bold text-earth"
            >
              <option>United Arab Emirates (Home)</option>
              <option>European Economic Area (GDPR)</option>
              <option>Nigeria (Local Tourism Act)</option>
              <option>Morocco (Heritage Protection)</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Policy Version</label>
            <input
              type="text"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="w-full px-5 py-3 bg-warm/30 border-none rounded-xl text-xs font-bold text-earth"
              placeholder="e.g. 2.4.1"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Document Content (Markdown Supported)</label>
          <textarea
            className="w-full h-64 px-6 py-6 bg-warm/30 border-none rounded-[32px] text-sm font-medium text-slate-600 leading-relaxed focus:ring-4 focus:ring-primary/10"
            defaultValue={policyType === "privacy" ? "# Privacy Policy v2.4.1\n\nManjaro Global is committed to protecting your personal data. We collect information to provide better services to all our users...\n\n1. Data Collection\n2. How we use data\n3. Regional GDPR addendums..." : "# Terms of Use v1.12.5\n\nBy using Manjaro, you agree to these legal terms. All bookings are subject to our escrow protection protocol...\n\n1. User Responsibility\n2. Service Fees & Payments\n3. Cancellation Policy..."}
          />
        </div>

        <div className="flex items-center gap-4 p-5 bg-primary/5 rounded-2xl border border-primary/10">
          <div className="flex-1">
            <h4 className="text-xs font-black text-earth uppercase tracking-tight">Force Re-acceptance</h4>
            <p className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">Require all users in this region to review and accept the new terms before next login.</p>
          </div>
          <button
            onClick={() => setForceReaccept(!forceReaccept)}
            className={cn(
              "w-12 h-6 rounded-full p-1 transition-all duration-300",
              forceReaccept ? "bg-primary" : "bg-slate-200"
            )}
          >
            <div className={cn("w-4 h-4 bg-white rounded-full transition-all duration-300", forceReaccept ? "translate-x-6" : "translate-x-0")} />
          </button>
        </div>

        <button
          onClick={handleDeploy}
          disabled={isDeploying}
          className={cn(
            "w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-3",
            isDeploying ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-earth text-white shadow-earth/20 hover:bg-earth/90 active:scale-95"
          )}
        >
          {isDeploying ? <RefreshCw className="animate-spin" size={20} /> : <FileText size={20} />}
          {isDeploying ? "Deploying Changes..." : "Push Policy Update"}
        </button>
      </div>
    </div>

    {
      /* Right Column: Banning & Snapshot */
    }
    <div className="space-y-8 flex flex-col">
      <div className="glass-card p-10 rounded-[40px] bg-white border-none shadow-xl shadow-slate-200/40 space-y-8">
        <div>
          <h3 className="text-xl font-black text-earth tracking-tight">Access Control & Sanitization</h3>
          <p className="text-sm font-medium text-slate-400 mt-2">Manage platform-wide bans for rogue identities and non-compliant actors.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <input type="text" placeholder="IP, Email, or Device ID..." className="flex-1 px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold placeholder:text-slate-300" />
          <button className="bg-coral text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-coral/20 hover:opacity-90 active:scale-95 transition-all">Ban ID</button>
        </div>

        <div className="space-y-3">
          {[
            { target: "scammer_88@mal.com", reason: "Payment Fraud", date: "Apr 20", risk: "High" },
            { target: "45.120.21.99", reason: "IP Brute Force", date: "Apr 18", risk: "Critical" },
            { target: "bot_runner_04", reason: "API Scraping", date: "Apr 15", risk: "Medium" }
          ].map((ban, i) => <div key={i} className="flex items-center justify-between p-4 bg-warm/30 rounded-2xl border border-earth/5 hover:bg-white hover:shadow-lg transition-all">
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-2 h-2 rounded-full",
                ban.risk === "Critical" ? "bg-coral animate-pulse" : ban.risk === "High" ? "bg-orange-500" : "bg-yellow-500"
              )} />
              <div>
                <p className="text-sm font-black text-earth leading-none">{ban.target}</p>
                <p className="text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-widest">{ban.reason} • {ban.date}</p>
              </div>
            </div>
            <button className="text-slate-300 hover:text-earth transition-colors p-2 rounded-xl hover:bg-slate-50"><Unlock size={18} /></button>
          </div>)}
        </div>
      </div>

      <div className="bg-brand p-10 rounded-[40px] text-white shadow-2xl shadow-brand/20 relative overflow-hidden flex-1 flex flex-col justify-center">
        <div className="relative z-10 space-y-8">
          <h3 className="text-xl font-black border-b-4 border-white/20 pb-4 inline-block">Integrity Pulse</h3>
          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-1">
              <h4 className="text-5xl font-black tracking-tighter italic">24</h4>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white opacity-50" />
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Global Hard Bans</p>
              </div>
            </div>
            <div className="space-y-1">
              <h4 className="text-5xl font-black tracking-tighter italic">99.8%</h4>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white opacity-50" />
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Policy Compliance</p>
              </div>
            </div>
          </div>
          <div className="pt-4 flex gap-3">
            <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Audit Logs</button>
            <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Export Report</button>
          </div>
        </div>
        <Activity className="absolute -right-8 -bottom-8 w-48 h-48 text-white/5 rotate-12" />
      </div>
    </div>
  </div>;
};
export default ComplianceView;
