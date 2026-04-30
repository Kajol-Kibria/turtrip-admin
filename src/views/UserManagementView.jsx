"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import {
  Users,
  ChevronLeft,
  Mail,
  MapPin,
  Calendar,
  Phone,
  ShieldCheck,
  CreditCard,
  Star,
  Activity,
  User,
  ExternalLink,
  X
} from "lucide-react";

const MOCK_USERS = [
  { 
    id: 1, 
    name: "Fatima Al", 
    email: "fatima@example.com", 
    role: "User", 
    status: "Active", 
    activity: "2 mins ago",
    phone: "+971 50 123 4567",
    location: "Dubai, UAE",
    joined: "Jan 2024",
    stats: { bookings: 12, spent: "$3,450", reviews: 8 },
    recentActivity: [
      { id: 101, type: "Booking", title: "Burj Khalifa Tour", date: "Oct 12, 2025", amount: "$150", status: "Completed" },
      { id: 102, type: "Payment", title: "Wallet Top-up", date: "Oct 10, 2025", amount: "$500", status: "Success" },
      { id: 103, type: "Review", title: "Desert Safari Experience", date: "Oct 05, 2025", rating: 5, status: "Published" }
    ]
  },
  { id: 2, name: "Alex Wong", email: "alex@example.com", role: "Guide", status: "Pending", activity: "15 mins ago" },
  { id: 3, name: "Sarah Green", email: "sarah@example.com", role: "User", status: "Banned", activity: "2 days ago" },
  { id: 4, name: "David Smith", email: "david@example.com", role: "User", status: "Active", activity: "1 hour ago" }
];

const UserProfileModal = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-12">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        onClick={onClose} 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" 
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }} 
        animate={{ scale: 1, opacity: 1, y: 0 }} 
        exit={{ scale: 0.9, opacity: 0, y: 20 }} 
        className="relative max-w-4xl w-full bg-white rounded-[40px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
              <User size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">User Profile</h3>
              <p className="text-sm text-slate-400 font-medium">Detailed account overview for {user.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 text-center">
                <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center text-2xl font-bold text-slate-900 mx-auto mb-4 shadow-sm border border-slate-50">
                  {user.name[0]}
                </div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">{user.name}</h3>
                <p className="text-xs text-slate-400 font-medium mb-4">{user.email}</p>
                <div className="flex gap-2 justify-center">
                  <span className="px-2 py-0.5 bg-success/10 text-success text-[10px] font-bold rounded uppercase">
                    {user.status}
                  </span>
                  <span className="px-2 py-0.5 bg-brand/10 text-brand text-[10px] font-bold rounded uppercase">
                    {user.role}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100">
                  <Phone size={16} className="text-slate-400" />
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Phone</p>
                    <p className="text-xs font-bold text-slate-900">{user.phone || "Not provided"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100">
                  <MapPin size={16} className="text-slate-400" />
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Location</p>
                    <p className="text-xs font-bold text-slate-900">{user.location || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100">
                  <Calendar size={16} className="text-slate-400" />
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Member Since</p>
                    <p className="text-xs font-bold text-slate-900">{user.joined || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Bookings", value: user.stats?.bookings || 0, icon: <CreditCard size={18} />, color: "text-brand" },
                  { label: "Spent", value: user.stats?.spent || "$0", icon: <Activity size={18} />, color: "text-success" },
                  { label: "Reviews", value: user.stats?.reviews || 0, icon: <Star size={18} />, color: "text-amber-500" }
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 flex flex-col justify-between h-28 shadow-sm">
                    <div className={cn("w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center", stat.color)}>{stat.icon}</div>
                    <div>
                      <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">{stat.label}</p>
                      <p className="text-lg font-bold text-slate-900">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
                <div className="p-5 border-b border-slate-100 bg-slate-50/30">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-widest">Recent Activity</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50/50">
                        <th className="px-6 py-3 text-[10px] font-bold uppercase text-slate-400">Activity</th>
                        <th className="px-6 py-3 text-[10px] font-bold uppercase text-slate-400">Date</th>
                        <th className="px-6 py-3 text-[10px] font-bold uppercase text-slate-400">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {(user.recentActivity || []).map((activity) => (
                        <tr key={activity.id} className="hover:bg-slate-50/30 transition-colors">
                          <td className="px-6 py-4">
                            <p className="text-xs font-bold text-slate-900">{activity.title}</p>
                            <p className="text-[10px] text-slate-400 font-medium">{activity.type}</p>
                          </td>
                          <td className="px-6 py-4 text-[10px] font-medium text-slate-500">{activity.date}</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-0.5 bg-success/10 text-success text-[9px] font-bold uppercase rounded">
                              {activity.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
          <button onClick={onClose} className="px-8 py-4 rounded-2xl font-bold bg-white border border-slate-200 text-slate-500 hover:text-slate-900 transition-all">Close</button>
          <button className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">Save Changes</button>
        </div>
      </motion.div>
    </div>
  );
};

const UserManagementView = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="space-y-6">
      {/* List Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h3 className="font-bold text-lg">User Management</h3>
          <p className="text-xs text-slate-400 mt-1">View and manage all registered platform users</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all">
          <Users size={18} /> Export Users
        </button>
      </div>

      {/* User Table */}
      <div className="glass-card rounded-3xl overflow-hidden border-none shadow-xl shadow-slate-200/40 bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">User Details</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Role</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Status</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Last Activity</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {MOCK_USERS.map((user, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-900">
                      {user.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{user.name}</p>
                      <p className="text-[10px] text-slate-400">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-6 text-xs font-medium text-slate-600">{user.role}</td>
                <td className="p-6">
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                    user.status === "Active" ? "bg-success/10 text-success" : 
                    user.status === "Pending" ? "bg-brand/10 text-brand" : "bg-alert/10 text-alert"
                  )}>
                    {user.status}
                  </span>
                </td>
                <td className="p-6 text-xs text-slate-400">{user.activity}</td>
                <td className="p-6">
                  <button 
                    onClick={() => setSelectedUser(user)}
                    className="text-primary font-bold text-xs hover:underline flex items-center gap-1"
                  >
                    View Profile <ExternalLink size={12} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {selectedUser && (
          <UserProfileModal 
            user={selectedUser} 
            onClose={() => setSelectedUser(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserManagementView;

