"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import {
  X,
  ChevronRight,
  Clock,
  Map
} from "lucide-react";
const TripManagementView = () => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [activeTab, setActiveTab] = useState("All");
  const trips = [
    {
      id: "TRP-101",
      title: "Dune Bashing Safari",
      guide: "Ahmed Khan",
      price: "$120",
      status: "Active",
      isSponsored: true,
      image: "https://picsum.photos/seed/dune/800/500",
      description: "Experience the thrill of the Arabian desert with a professional dune bashing team. Includes camel riding, henna painting, and a BBQ dinner under the stars.",
      itinerary: [
        "3:00 PM - Hotel Pickup",
        "4:30 PM - Dune Bashing Session",
        "6:00 PM - Sunset Photography",
        "7:30 PM - Bedouin Camp Dinner",
        "9:30 PM - Return to Hotel"
      ],
      tags: ["Adventure", "Desert", "Cultural"]
    },
    {
      id: "TRP-102",
      title: "Illegal Night Hunting",
      guide: "Suspicious Guide",
      price: "$500",
      status: "Flagged",
      isSponsored: false,
      image: "https://picsum.photos/seed/night/800/500",
      description: "A secretive nighttime expedition into restricted wildlife zones. High stakes and definitely outside of local heritage laws.",
      itinerary: ["Unauthorized entry to protected zones", "Wildlife tracking"],
      tags: ["Danger", "Unauthorized"]
    },
    {
      id: "TRP-103",
      title: "Paris Private Museum Tour",
      guide: "Sophie Martin",
      price: "$85",
      status: "Active",
      isSponsored: true,
      image: "https://picsum.photos/seed/paris/800/500",
      description: "Skip the lines at the Louvre and Mus\xE9e d'Orsay with a licensed art historian. Discover hidden masterpieces and the stories behind them.",
      itinerary: [
        "9:00 AM - Meet at Louvre entrance",
        "10:30 AM - Coffee break at Le Caf\xE9 Marly",
        "11:00 AM - Mus\xE9e d'Orsay highlights",
        "1:00 PM - Walking tour of Tuileries Garden"
      ],
      tags: ["History", "Art", "Walking"]
    }
  ];
  const filteredTrips = activeTab === "All" ? trips : trips.filter((t) => t.status.toLowerCase().includes(activeTab.toLowerCase().split(" ")[0]));
  return <div className="space-y-6">
    <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex bg-warm p-1 rounded-xl">
        {["All", "Flagged", "Awaiting"].map((tab) => <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={cn(
            "px-6 py-2 text-xs font-bold rounded-lg transition-all",
            activeTab === tab ? "bg-white shadow-sm text-primary" : "text-slate-500 hover:text-slate-900"
          )}
        >
          {tab === "All" ? "All Listings" : tab === "Awaiting" ? "Awaiting Review" : tab}
        </button>)}
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredTrips.map((trip, i) => <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card rounded-3xl overflow-hidden flex flex-col bg-white border-none shadow-xl shadow-slate-200/40"
      >
        <div className="relative h-48">
          <img src={trip.image} className="w-full h-full object-cover" alt={trip.title} />
          <div className="absolute top-4 left-4 flex gap-2">
            {trip.isSponsored && <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand text-white shadow-lg shadow-brand/20">
              Sponsored
            </span>}
          </div>
          <div className="absolute top-4 right-4">
            <span className={cn(
              "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
              trip.status === "Active" ? "bg-success text-white" : "bg-alert text-white"
            )}>
              {trip.status}
            </span>
          </div>
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <h4 className="font-bold text-lg mb-1 text-earth truncate">{trip.title}</h4>
          <div className="flex items-center gap-2 text-slate-500 text-xs mb-4">
            <span>By {trip.guide}</span>
            <span>•</span>
            <span className="font-bold text-brand">{trip.price}</span>
          </div>
          <div className="flex gap-2 mt-auto">
            <button
              onClick={() => setSelectedTrip(trip)}
              className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-700 py-3 rounded-2xl text-xs font-bold transition-all border border-slate-100"
            >
              Review Details
            </button>
            {trip.status === "Flagged" && <button className="flex-1 bg-alert/10 text-alert hover:bg-alert/20 py-3 rounded-2xl text-xs font-bold transition-all">
              Remove Listing
            </button>}
          </div>
        </div>
      </motion.div>)}
    </div>

    <AnimatePresence>
      {selectedTrip && <div className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedTrip(null)}
          className="absolute inset-0 bg-earth/40 backdrop-blur-md"
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative max-w-4xl w-full bg-white rounded-[40px] overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh]"
        >
          <div className="lg:w-1/2 relative bg-slate-100 min-h-[300px] lg:min-h-full">
            <img src={selectedTrip.image} className="w-full h-full object-cover" alt={selectedTrip.title} />
            <div className="absolute top-6 left-6">
              <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-earth font-black rounded-2xl shadow-xl text-sm italic">{selectedTrip.id}</span>
            </div>
          </div>

          <div className="lg:w-1/2 flex flex-col h-full bg-white max-h-[60vh] lg:max-h-full overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-start bg-warm/30 sticky top-0 bg-white z-10">
              <div>
                <h3 className="text-2xl font-black text-earth tracking-tight">{selectedTrip.title}</h3>
                <p className="text-sm text-slate-400 font-medium mt-1">Listing by <span className="text-primary font-bold">{selectedTrip.guide}</span></p>
              </div>
              <button onClick={() => setSelectedTrip(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400"><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              <div className="flex flex-wrap gap-2">
                {selectedTrip.tags.map((tag) => <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-bold uppercase tracking-widest">{tag}</span>)}
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-earth flex items-center gap-2"><Map size={16} /> Trip Overview</h4>
                <p className="text-sm text-slate-600 leading-relaxed bg-warm/20 p-5 rounded-3xl border border-earth/5">{selectedTrip.description}</p>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-earth flex items-center gap-2"><Clock size={16} /> Experience Itinerary</h4>
                <div className="space-y-3 pl-4 border-l-2 border-primary/20">
                  {selectedTrip.itinerary.map((item, i) => <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                    <p className="text-sm text-slate-600 font-medium">{item}</p>
                  </div>)}
                </div>
              </div>
            </div>

            <div className="p-8 bg-warm/50 border-t border-slate-100 flex gap-4 sticky bottom-0 bg-white">
              <button
                onClick={() => setSelectedTrip(null)}
                className="flex-1 bg-white border border-alert/20 text-alert py-4 rounded-2xl font-bold hover:bg-alert/5 transition-all shadow-sm"
              >
                Flag: Needs Revision
              </button>
              <button
                onClick={() => setSelectedTrip(null)}
                className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
              >
                Deploy & Approve Experience <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>}
    </AnimatePresence>
  </div>;
};
export default TripManagementView;
