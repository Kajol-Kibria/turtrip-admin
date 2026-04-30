"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import {
  Users,
  ShieldCheck,
  X,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  Globe,
  User,
  Headset,
  Shield,
  Timer,
  FileText,
  AlertTriangle,
  UserPlus,
  Siren,
  Send,
  Zap
} from "lucide-react";
const AlertsCenterView = () => {
  const [filter, setFilter] = useState("all");
  const alerts = [
    { id: "AL-102", title: "Critical System Failure", desc: "Auth microservice reporting 40% latency in EEA region.", type: "critical", cat: "system", time: "2026-04-26 10:15:22", icon: AlertTriangle, color: "text-coral" },
    { id: "AL-101", title: "New Driver Registration", desc: "User #8841 submitted all documents for Nairobi region.", type: "info", cat: "user", time: "2026-04-26 09:44:10", icon: ShieldCheck, color: "text-primary" },
    { id: "AL-100", title: "Abnormal Payout Attempt", desc: "Guide #122 attempted $15k payout without completed kyc.", type: "critical", cat: "user", time: "2026-04-26 08:30:15", icon: Zap, color: "text-yellow-500" },
    { id: "AL-099", title: "Emergency SOS Triggered", desc: "Sarah Green triggered panic signal in Merzouga Desert.", type: "critical", cat: "user", time: "2026-04-26 07:12:00", icon: Siren, color: "text-coral" },
    { id: "AL-098", title: "Scheduled Maintenance Complete", desc: "Database optimization for UAE-North shard finished.", type: "success", cat: "system", time: "2026-04-26 04:00:00", icon: CheckCircle2, color: "text-success" },
    { id: "AL-097", title: "Inconsistent Policy State", desc: "Regional terms v2.1 not accepted by 45 active guides in UK.", type: "warning", cat: "system", time: "2026-04-26 01:22:11", icon: Shield, color: "text-slate-400" },
    { id: "AL-096", title: "Identity Revoked", desc: 'Partner Agency "SafeTravels" suspended due to fraud reports.', type: "critical", cat: "user", time: "2026-04-25 23:55:00", icon: XCircle, color: "text-coral" }
  ];
  const filteredAlerts = alerts.filter((a) => {
    if (filter === "all") return true;
    if (filter === "critical") return a.type === "critical";
    return a.cat === filter;
  });
  return <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="bg-white p-6 sm:p-10 rounded-[32px] sm:rounded-[40px] shadow-xl shadow-slate-200/40 border-none flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6">
      <div>
        <h2 className="text-3xl font-black text-earth tracking-tight">Alerts Center</h2>
        <p className="text-sm font-medium text-slate-400 mt-2 italic">Real-time system health and user integrity monitoring log.</p>
      </div>
      <div className="flex bg-warm p-1.5 rounded-2xl border border-earth/5 overflow-x-auto w-full md:w-auto">
        {[
          { id: "all", label: "All Activity" },
          { id: "critical", label: "Critical Only" },
          { id: "system", label: "System" },
          { id: "user", label: "User Actions" }
        ].map((t) => <button
          key={t.id}
          onClick={() => setFilter(t.id)}
          className={cn(
            "px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
            filter === t.id ? "bg-earth text-white shadow-lg" : "text-slate-400 hover:text-earth"
          )}
        >
          {t.label}
        </button>)}
      </div>
    </div>

    <div className="grid grid-cols-1 gap-4">
      <AnimatePresence mode="popLayout">
        {filteredAlerts.map((alert2, i) => <motion.div
          layout
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ delay: i * 0.05 }}
          key={alert2.id}
          className="glass-card p-4 sm:p-6 rounded-[24px] sm:rounded-[32px] bg-white border-none shadow-xl shadow-slate-200/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 hover:shadow-2xl hover:-translate-y-1 transition-all group cursor-pointer"
        >
          <div className="flex items-center gap-6 flex-1">
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner", alert2.color.replace("text-", "bg-").replace("500", "100").replace("success", "success/10").replace("coral", "coral/10").replace("primary", "primary/10"))}>
              <alert2.icon className={alert2.color} size={28} />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-slate-300 tracking-widest bg-slate-50 px-2 py-0.5 rounded uppercase">{alert2.id}</span>
                <h4 className="text-lg font-black text-earth tracking-tight">{alert2.title}</h4>
              </div>
              <p className="text-sm font-medium text-slate-500 leading-relaxed">{alert2.desc}</p>
            </div>
          </div>
          <div className="text-left sm:text-right flex flex-row sm:flex-col items-center sm:items-end gap-3 w-full sm:w-auto sm:min-w-[200px]">
            <div className="flex items-center justify-end gap-2 text-slate-400">
              <Clock size={16} />
              <span className="text-xs font-black italic">{alert2.time}</span>
            </div>
            <div className="flex gap-2">
              <button className="bg-warm/50 hover:bg-earth hover:text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Audit</button>
              <button className="bg-warm/50 hover:bg-primary hover:text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Resolve</button>
            </div>
          </div>
        </motion.div>)}
      </AnimatePresence>
    </div>
  </div>;
};
const NotificationListView = () => {
  const [targetType, setTargetType] = useState("all_users");
  const [broadcastType, setBroadcastType] = useState("country");
  const [selectedRole, setSelectedRole] = useState("driver");
  const [selectedCountry, setSelectedCountry] = useState("Kenya");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [targetEmail, setTargetEmail] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [showTemplates, setShowTemplates] = useState(false);
  const TEMPLATES = [
    { title: "System Maintenance", subject: "Upcoming System Maintenance \u{1F3D7}\uFE0F", message: "Hello! Please be advised that the platform will undergo routine maintenance on Sunday at 02:00 AM UTC. Expect minor service interruptions for approx 30 minutes." },
    { title: "New Safety Protocol", subject: "Updated Safety Guidelines for Partners", message: "We have updated our safety protocols for all on-trip experiences. Please review the new guidelines in your partner dashboard to ensure compliance by next week." },
    { title: "Fraud Alert", subject: "URGENT: Identifying Fraudulent Inquiries", message: "Travelers and Partners: Be wary of off-platform payment requests. Always use our secure escrow system to protect your transactions and data." },
    { title: "Staff Update", subject: "New Support SOP Deployment", message: "Attention Support Officers: Case escalation SOP v4.2 is now live. Please apply the new triage rules to all open disputes immediately." }
  ];
  const applyTemplate = (tpl) => {
    setSubject(tpl.subject);
    setMessage(tpl.message);
    setShowTemplates(false);
  };
  const handleSend = () => {
    const scheduling = scheduledDate ? `scheduled for ${scheduledDate} at ${scheduledTime}` : "sent immediately";
    alert(`Notification (${subject}) ${scheduling} to ${targetType}!`);
    setSubject("");
    setMessage("");
    setTargetEmail("");
    setScheduledDate("");
    setScheduledTime("");
  };
  return <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
    {
      /* Broadcast Composer */
    }
    <div className="lg:col-span-2 space-y-8">
      <div className="glass-card p-10 rounded-[40px] bg-white border-none shadow-2xl shadow-slate-200/40 space-y-8 relative overflow-hidden">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-black text-earth tracking-tight">Advanced Notification Suite</h2>
            <p className="text-sm text-slate-400 font-medium mt-1">Multi-channel broadcast and direct targeting system.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowTemplates(true)}
              className="bg-primary/5 text-primary px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all flex items-center gap-2"
            >
              <FileText size={14} /> Use Template
            </button>
            <Send className="text-primary/20" size={40} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Audience Target</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-1.5 bg-warm/50 rounded-3xl border border-earth/5">
              {[
                { id: "all_users", label: "All Users", icon: Globe },
                { id: "individual", label: "Individual (Email)", icon: User },
                { id: "support_all", label: "All Support Staff", icon: Headset },
                { id: "support_individual", label: "Support (Email)", icon: UserPlus },
                { id: "support_broadcast", label: "Support Broadcast", icon: Siren }
              ].map((t) => <button
                key={t.id}
                onClick={() => setTargetType(t.id)}
                className={cn(
                  "flex items-center gap-2 py-3 px-4 rounded-2xl text-[10px] font-black uppercase tracking-tight transition-all",
                  targetType === t.id ? "bg-earth text-white shadow-xl shadow-earth/20" : "text-slate-400 hover:bg-white hover:text-earth"
                )}
              >
                <t.icon size={14} /> {t.label}
              </button>)}
            </div>
          </div>

          {(targetType === "individual" || targetType === "support_individual") && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              {targetType === "individual" ? "Target User Email" : "Support Officer Email"}
            </label>
            <input
              type="email"
              value={targetEmail}
              onChange={(e) => setTargetEmail(e.target.value)}
              placeholder="name@nexus.com"
              className="w-full px-6 py-4 bg-warm/30 border-2 border-transparent focus:border-primary/20 rounded-2xl text-sm font-bold text-earth transition-all"
            />
          </motion.div>}

          {targetType === "support_broadcast" && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 p-6 bg-primary/5 rounded-[32px] border border-primary/10">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary/60 ml-1">Broadcast Type</label>
              <div className="flex gap-2">
                {[
                  { id: "country", label: "By Country" },
                  { id: "role", label: "By Specialist Role" }
                ].map((f) => <button
                  key={f.id}
                  onClick={() => setBroadcastType(f.id)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all",
                    broadcastType === f.id ? "bg-primary text-white border-primary shadow-lg" : "bg-white text-slate-400 border-slate-100"
                  )}
                >
                  {f.label}
                </button>)}
              </div>
            </div>

            {broadcastType === "country" ? <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase">Select Target Region</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-100 rounded-xl text-xs font-bold"
              >
                <option>Kenya</option>
                <option>UAE</option>
                <option>Nigeria</option>
                <option>Morocco</option>
                <option>France</option>
                <option>United Kingdom</option>
              </select>
            </div> : <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase">Select Role Segment</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-100 rounded-xl text-xs font-bold"
              >
                <option value="driver">Drivers (Verification Group)</option>
                <option value="guide">Guides (Experience Group)</option>
                <option value="stay">Stay (Accommodation Group)</option>
                <option value="moderator">Content Moderators</option>
              </select>
            </div>}
          </motion.div>}

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2"><Clock size={14} /> Scheduling (Optional)</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="px-6 py-4 bg-warm/30 border-none rounded-2xl text-xs font-bold text-earth"
              />
              <input
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="px-6 py-4 bg-warm/30 border-none rounded-2xl text-xs font-bold text-earth"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Message Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter broadcast subject..."
                className="w-full px-6 py-4 bg-warm/30 border-none rounded-2xl text-sm font-bold text-earth"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Content Body</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter the primary message content here..."
                className="w-full h-40 px-6 py-6 bg-warm/30 border-none rounded-[32px] text-sm font-medium leading-relaxed text-earth"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button className="flex-1 bg-warm text-earth py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all">Save Draft</button>
            <button
              onClick={handleSend}
              disabled={!subject || !message}
              className="flex-[2] bg-brand text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-brand/30 hover:bg-brand/90 transition-all disabled:opacity-50 disabled:grayscale"
            >
              {scheduledDate ? "Schedule Notification" : "Broadcast Now"}
            </button>
          </div>
        </div>
      </div>
    </div>

    {
      /* History Feed */
    }
    <div className="space-y-6">
      <h3 className="text-sm font-black text-earth uppercase tracking-widest ml-2 flex items-center gap-2">
        <Timer size={16} className="text-slate-300" /> Dispatch Trends
      </h3>
      <div className="space-y-4">
        {[
          { tag: "GLOBAL", title: "System Maintenance", time: "12h ago", reach: "4,201 users", status: "Delivered" },
          { tag: "SUPPORT", title: "New ISO Update", time: "1d ago", reach: "45 officers", status: "Delivered" },
          { tag: "BRAODCAST", title: "Kenya Emergency Alert", time: "2d ago", reach: "2,100 users", status: "Failed: 2" }
        ].map((item, i) => <div key={i} className="bg-white p-5 rounded-3xl border border-earth/5 shadow-xl shadow-slate-200/40 relative overflow-hidden group hover:border-primary/20 transition-all">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[8px] font-black text-primary bg-primary/5 px-2 py-1 rounded tracking-tighter">{item.tag}</span>
            <span className="text-[9px] font-bold text-slate-300">{item.time}</span>
          </div>
          <h4 className="text-xs font-black text-earth truncate">{item.title}</h4>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5 opacity-40">
              <Users size={12} />
              <span className="text-[10px] font-bold tracking-tight">{item.reach}</span>
            </div>
            <span className="text-[9px] font-black text-slate-400 italic">{item.status}</span>
          </div>
        </div>)}
      </div>

      <div className="p-6 bg-earth rounded-[32px] text-white space-y-4 shadow-2xl shadow-earth/20 relative overflow-hidden">
        <div className="relative z-10">
          <h4 className="text-xs font-black uppercase tracking-widest opacity-60">Success Rate</h4>
          <div className="flex items-end gap-2 mt-2">
            <span className="text-3xl font-black">99.8%</span>
            <TrendingUp size={16} className="text-success mb-2" />
          </div>
          <p className="text-[9px] font-medium opacity-40 mt-1">Average delivery across SMS & PUSH</p>
        </div>
        <Zap className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5" />
      </div>
    </div>

    {
      /* Template Modal */
    }
    <AnimatePresence>
      {showTemplates && <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowTemplates(false)} className="absolute inset-0 bg-earth/40 backdrop-blur-md" />
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative max-w-2xl w-full bg-white rounded-[40px] overflow-hidden shadow-2xl p-8 space-y-8">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-black text-earth">Select Notification Template</h3>
            <button onClick={() => setShowTemplates(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={20} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TEMPLATES.map((tpl, i) => <button
              key={i}
              onClick={() => applyTemplate(tpl)}
              className="p-6 text-left rounded-3xl border border-earth/5 bg-warm/30 hover:bg-primary/5 hover:border-primary/20 transition-all group"
            >
              <FileText className="text-slate-300 group-hover:text-primary mb-3" size={24} />
              <h4 className="text-sm font-black text-earth">{tpl.title}</h4>
              <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{tpl.subject}</p>
            </button>)}
          </div>
        </motion.div>
      </div>}
    </AnimatePresence>
  </div>;
};
export default AlertsCenterView;
