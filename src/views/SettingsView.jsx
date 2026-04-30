"use client";
import { useState } from "react";
import { cn } from "../lib/utils";
import {
  Globe,
  Save
} from "lucide-react";
const SettingsView = () => {
  const [fees, setFees] = useState({
    driver: 15,
    stay: 12,
    guide: 10,
    cancellation: 5,
    logistics: 8
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
    <div className="glass-card p-5 sm:p-8 rounded-[32px] sm:rounded-[40px] bg-white border-none shadow-xl shadow-slate-200/40 space-y-6 sm:space-y-8">
    <div className="flex flex-col md:flex-row items-center justify-between gap-2">
      <div>
        <h3 className="text-xl font-black text-earth tracking-tight">Platform Financials</h3>
        <p className="text-sm text-slate-400 font-medium">Configure global commission rates and service fees.</p>
      </div>
      <button
        onClick={() => {
          const btn = document.getElementById('save-settings-btn');
          if (btn) {
            btn.innerText = 'Saved successfully';
            btn.classList.add('bg-success');
            setTimeout(() => {
              btn.innerText = 'Save settings';
              btn.classList.remove('bg-success');
            }, 2000);
          }
        }}
        id="save-settings-btn"
        className="w-full md:w-fit bg-primary text-white py-2 px-4 rounded font-medium shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
      >
        <Save size={20} />
        Save Settings
      </button>
    </div>

      <div className="space-y-8">
        {[
          { id: "driver", label: "Driver Platform Fee (%)", color: "text-primary" },
          { id: "stay", label: "Accommodation Fee (%)", color: "text-success" },
          { id: "guide", label: "Guide Commission (%)", color: "text-brand" },
          { id: "cancellation", label: "Cancellation Penalty (%)", color: "text-alert" },
          { id: "logistics", label: "Logistics disbursement (%)", color: "text-earth" },
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
      <div className="glass-card p-5 sm:p-8 rounded-[32px] sm:rounded-[40px] bg-white border-none shadow-xl shadow-slate-200/40 space-y-6 sm:space-y-8">
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
      {/* <div className="glass-card p-8 rounded-[40px] border-none shadow-xl shadow-earth/20">
        <div className="flex justify-between items-center mb-6">
          <h4 className="font-black text-lg">Expansion Mode</h4>
          <Globe className="text-white/20" size={32} />
        </div>
        <p className="text-sm font-medium leading-relaxed">System is currently processing registrations from 12 countries. M-Pesa & Stripe automatic routing enabled.</p>
        <button className="w-full mt-8 bg-white/10 hover:bg-white/20 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Download regional report</button>
      </div> */}

    </div>
  </div>;
};
export default SettingsView;
