"use client";
import { useState } from "react";
import { cn } from "../lib/utils";
import {
  Activity
} from "lucide-react";
const PaymentsView = () => {
  const [metricType, setMetricType] = useState("net");
  return <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="glass-card p-8 rounded-[40px] bg-earth text-white border-none shadow-2xl shadow-earth/30 relative overflow-hidden group">
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-3">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Total Payments</p>
            <div className="flex bg-white/10 p-1 rounded-xl">
              <button
                onClick={() => setMetricType("net")}
                className={cn("px-3 py-1 rounded-lg text-[9px] font-black uppercase transition-all", metricType === "net" ? "bg-earth text-white shadow-lg" : "text-earth hover:text-earth")}
              >
                Net
              </button>
              <button
                onClick={() => setMetricType("fees")}
                className={cn("px-3 py-1 rounded-lg text-[9px] font-black uppercase transition-all", metricType === "fees" ? "bg-earth text-white shadow-lg" : "text-earth hover:text-earth")}
              >
                Fees (Commission)
              </button>
            </div>
          </div>
          <h2 className="text-4xl text-black mb-3 tracking-tighter">
            {metricType === "net" ? "$185,420.00" : "$32,150.00"}
          </h2>
          <div className="flex justify-between items-end">
            <div className="text-[10px] text-black bg-earth/10 px-3 py-1.5 rounded-xl border border-earth/10 uppercase tracking-widest">Global Aggregate</div>
            <Activity size={32} className="text-white/20" />
          </div>
        </div>
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all" />
      </div>
      <div className="glass-card p-6 rounded-3xl border-none shadow-xl shadow-slate-200/40 flex flex-col justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Pending Releases</p>
          <h2 className="text-2xl font-black text-primary">12 Transactions</h2>
        </div>
        <button className="w-full bg-primary text-white py-3 rounded-2xl text-xs font-bold hover:bg-primary/90 transition-all">
          Manage Queue
        </button>
      </div>
      <div className="glass-card p-6 rounded-3xl border-none shadow-xl shadow-slate-200/40 flex flex-col justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Refund Requests</p>
          <h2 className="text-2xl font-black text-coral">3 Open</h2>
        </div>
        <button className="w-full bg-coral/10 text-coral border border-coral/20 py-3 rounded-2xl text-xs font-bold hover:bg-coral/20 transition-all">
          Review Requests
        </button>
      </div>
    </div>

    <div className="glass-card rounded-3xl overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
        <h3 className="font-bold text-lg">Transaction History</h3>
        <button className="text-primary text-sm font-bold hover:underline">Export CSV</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Date</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Booking</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Amount</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Fee (15%)</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Net</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[1, 2, 3, 4, 5].map((i) => <tr key={i} className="hover:bg-slate-50/50 transition-colors">
              <td className="p-6 text-xs text-slate-500 font-medium">Apr 21, 14:02</td>
              <td className="p-6 text-sm font-bold text-slate-900">#BK-882{i}</td>
              <td className="p-6 text-sm font-medium text-slate-600">$200.00</td>
              <td className="p-6 text-sm font-medium text-orange-600">$30.00</td>
              <td className="p-6 text-sm font-black text-green-600">$170.00</td>
              <td className="p-6">
                <button className="text-primary font-bold text-xs hover:underline">Release Funds</button>
              </td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </div>
  </div>;
};
export default PaymentsView;
