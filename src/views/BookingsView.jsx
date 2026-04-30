"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import {
  X,
  Eye
} from "lucide-react";
const BookingsView = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const bookings = [
    {
      id: "#BK-8821",
      user: "John Doe",
      guide: "Ahmed Khan",
      services: ["Tour", "Ride"],
      amount: "$240.00",
      status: "Active",
      breakdown: { trip: "$150.00", ride: "$90.00", accommodation: "$0.00", fees: "$36.00" }
    },
    {
      id: "#BK-9902",
      user: "Jane Smith",
      guide: "Sophie Martin",
      services: ["Tour"],
      amount: "$85.00",
      status: "Completed",
      breakdown: { trip: "$85.00", ride: "$0.00", accommodation: "$0.00", fees: "$12.75" }
    },
    {
      id: "#BK-7741",
      user: "Mike Ross",
      guide: "Global Voyages",
      services: ["Tour", "Stay", "Ride"],
      amount: "$1200.00",
      status: "Canceled",
      breakdown: { trip: "$300.00", ride: "$100.00", accommodation: "$800.00", fees: "$180.00" }
    }
  ];
  return <div className="space-y-6">
    <div className="glass-card rounded-3xl overflow-hidden border-none shadow-xl shadow-slate-200/40 bg-white">
      <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[780px]">
        <thead>
          <tr className="bg-slate-50/50 border-b border-slate-100">
            <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Order ID</th>
            <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">User / Guide</th>
            <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Services</th>
            <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Amount</th>
            <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Status</th>
            <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {bookings.map((booking, i) => <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
            <td className="p-6">
              <span className="font-mono text-xs font-bold text-slate-400">{booking.id}</span>
            </td>
            <td className="p-6">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900">{booking.user}</span>
                <span className="text-[10px] text-slate-400 font-medium italic">with {booking.guide}</span>
              </div>
            </td>
            <td className="p-6">
              <div className="flex gap-1.5 flex-wrap">
                {booking.services.map((s) => <span key={s} className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase">
                  {s}
                </span>)}
              </div>
            </td>
            <td className="p-6">
              <span className="text-sm font-black text-primary">{booking.amount}</span>
            </td>
            <td className="p-6">
              <span className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                booking.status === "Active" ? "bg-brand/10 text-brand" : booking.status === "Completed" ? "bg-success/10 text-success" : "bg-coral/10 text-coral"
              )}>
                {booking.status}
              </span>
            </td>
            <td className="p-6">
              <button
                onClick={() => setSelectedBooking(booking)}
                className="p-2 hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-slate-100 transition-all text-slate-400 hover:text-primary"
              >
                <Eye size={16} />
              </button>
            </td>
          </tr>)}
        </tbody>
      </table>
      </div>
    </div>

    <AnimatePresence>
      {selectedBooking && <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedBooking(null)}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative max-w-lg w-full bg-white rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl flex flex-col"
        >
          <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div>
              <h3 className="text-lg font-bold">Booking Details</h3>
              <p className="text-xs text-slate-400 font-mono">{selectedBooking.id}</p>
            </div>
            <button onClick={() => setSelectedBooking(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X size={20} /></button>
          </div>

          <div className="p-8 space-y-6">
            <div className="grid grid-cols-2 gap-4 gap-y-6">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Customer</p>
                <p className="text-sm font-bold">{selectedBooking.user}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Guide</p>
                <p className="text-sm font-bold">{selectedBooking.guide}</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-200 pb-2">Price Breakdown</p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Trip Price</span>
                  <span className="font-bold">{selectedBooking.breakdown.trip}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Ride Hosting</span>
                  <span className="font-bold">{selectedBooking.breakdown.ride}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Accomodation</span>
                  <span className="font-bold">{selectedBooking.breakdown.accommodation}</span>
                </div>
                <div className="flex justify-between text-sm pt-3 border-t border-slate-200 text-primary">
                  <span className="font-bold uppercase tracking-wider text-xs">Total Amount</span>
                  <span className="font-black text-lg">{selectedBooking.amount}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-3">
            <button
              onClick={() => setSelectedBooking(null)}
              className="flex-1 bg-white border border-slate-200 py-3 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all"
            >
              Close View
            </button>
            <button
              onClick={() => setSelectedBooking(null)}
              className="flex-1 bg-slate-900 text-white py-3 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all"
            >
              Download Invoice
            </button>
          </div>
        </motion.div>
      </div>}
    </AnimatePresence>
  </div>;
};
export default BookingsView;
