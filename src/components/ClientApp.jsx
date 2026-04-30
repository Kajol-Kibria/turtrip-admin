'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import DashboardView from '../views/DashboardView';
import GuideManagementView from '../views/GuideManagementView';
import TripManagementView from '../views/TripManagementView';
import BookingsView from '../views/BookingsView';
import PaymentsView from '../views/PaymentsView';
import DisputeManagementView from '../views/DisputeManagementView';
import EmergencyResponseView from '../views/EmergencyResponseView';
import ComplianceView from '../views/ComplianceView';
import UserManagementView from '../views/UserManagementView';
import DriverManagementView from '../views/DriverManagementView';
import CustomerSupportView from '../views/CustomerSupportView';
import SettingsView from '../views/SettingsView';
import StayManagementView from '../views/StayManagementView';
import StaffManagementView from '../views/StaffManagementView';
import AlertsCenterView from '../views/AlertsCenterView';
import NotificationListView from '../views/NotificationListView';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Download, Eye, Paperclip, Image as ImageIcon } from 'lucide-react';

export default function ClientApp({ role, supportOfficerContext, setIsLogged }) {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(typeof window !== 'undefined' && window.innerWidth >= 1024);
  const [chatHistoryTarget, setChatHistoryTarget] = useState(null);
  const [focusedImage, setFocusedImage] = useState(null);

  const handleDownload = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const ImageFocusModal = ({ data }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-12">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        onClick={() => setFocusedImage(null)} 
        className="absolute inset-0 bg-earth/90 backdrop-blur-2xl" 
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        exit={{ scale: 0.9, opacity: 0 }} 
        className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center pointer-events-none"
      >
        <div className="absolute top-0 right-0 p-2 sm:p-4 pointer-events-auto flex gap-2 sm:gap-4">
          <button 
            onClick={() => handleDownload(data.url, data.filename)}
            className="group flex items-center gap-2 sm:gap-3 bg-white/10 hover:bg-white text-white hover:text-earth px-3 sm:px-6 py-2 sm:py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all"
          >
            <Download size={18} />
            <span className="hidden sm:inline">Download JPG</span>
          </button>
          <button 
            onClick={() => setFocusedImage(null)} 
            className="p-3 bg-white/10 hover:bg-coral text-white rounded-2xl transition-all"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="w-full h-full flex items-center justify-center p-4 sm:p-12 pointer-events-auto">
          <img 
            src={data.url} 
            className="max-w-full max-h-full rounded-3xl shadow-2xl border-4 border-white/10 object-contain shadow-black/50" 
            alt={data.filename} 
          />
        </div>

        <div className="absolute bottom-8 px-8 py-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 text-center">
          <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">{data.filename}</p>
        </div>
      </motion.div>
    </div>
  );

  const ChatHistoryModal = ({ target }) => (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setChatHistoryTarget(null)} className="absolute inset-0 bg-earth/60 backdrop-blur-xl" />
      <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="relative max-w-2xl w-full bg-white rounded-[24px] sm:rounded-[40px] overflow-hidden shadow-2xl flex flex-col h-[85vh] sm:h-[70vh]">
        <div className="p-4 sm:p-8 border-b border-slate-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <MessageSquare size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-earth tracking-tight">Chat Wall: {target}</h3>
              <p className="text-xs text-slate-400 font-medium">Platform Communication History</p>
            </div>
          </div>
          <button onClick={() => setChatHistoryTarget(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={20} /></button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 sm:p-10 space-y-6 bg-slate-50">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-200" />
            <div className="bg-white p-4 rounded-3xl rounded-tl-none shadow-sm text-sm text-slate-600 max-w-[80%]">
              Hello, I'm having an issue with the booking reference #BK-8821.
            </div>
          </div>
          <div className="flex gap-4 flex-row-reverse">
            <div className="w-8 h-8 rounded-full bg-earth" />
            <div className="bg-earth text-white p-4 rounded-3xl rounded-tr-none shadow-sm text-sm max-w-[80%]">
              Sure, let me check that for you right now. Could you please send a screenshot of the error?
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-200" />
            <div className="bg-white p-2 rounded-3xl rounded-tl-none shadow-sm max-w-[60%] border border-slate-100 group">
               <div 
                 onClick={() => setFocusedImage({ url: "https://picsum.photos/seed/chatimg/400/300", filename: "screenshot_error_ops.jpg" })}
                 className="aspect-video bg-slate-100 rounded-2xl overflow-hidden mb-2 cursor-zoom-in relative"
                >
                 <img src="https://picsum.photos/seed/chatimg/400/300" className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="Chat attachment" />
                 <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-all flex items-center justify-center">
                    <Eye className="text-white opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all shadow-xl" size={32} />
                 </div>
               </div>
               <p className="px-3 pb-2 text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none flex flex-wrap gap-1 justify-between items-center">
                 <span>screenshot_error_ops.jpg</span>
                 <button onClick={() => handleDownload("https://picsum.photos/seed/chatimg/400/300", "screenshot_error_ops.jpg")} className="hover:text-primary transition-colors italic">Download</button>
               </p>
            </div>
          </div>
        </div>

        <div className="p-3 sm:p-6 bg-white border-t border-slate-100 flex gap-2 sm:gap-3 items-center">
          <div className="flex gap-1 shrink-0">
            <button className="p-2 sm:p-3 hover:bg-slate-50 rounded-xl text-slate-400">
              <Paperclip size={18} />
            </button>
            <button className="p-2 sm:p-3 hover:bg-slate-50 rounded-xl text-slate-400 hidden sm:block">
              <ImageIcon size={18} />
            </button>
          </div>
          <div className="flex-1 flex gap-2 sm:gap-4 items-center bg-slate-50 p-1.5 sm:p-2 rounded-2xl border border-slate-100 min-w-0">
            <input type="text" placeholder="Type a message..." className="flex-1 bg-transparent border-none focus:ring-0 text-sm px-2 sm:px-4 min-w-0" />
            <button className="bg-primary text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs font-bold hover:bg-primary/90 transition-all shrink-0">Send</button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <DashboardView context={role === 'customer_support' ? supportOfficerContext : undefined} onNavigate={setCurrentView} />;
      case 'users': return <UserManagementView onOpenChat={setChatHistoryTarget} />;
      case 'staff': return <StaffManagementView />;
      case 'drivers': return <DriverManagementView context={role === 'customer_support' ? supportOfficerContext : undefined} onOpenChat={setChatHistoryTarget} onPreviewImage={(url, name) => setFocusedImage({ url, filename: name })} onDownloadImage={handleDownload} />;
      case 'guides': return <GuideManagementView context={role === 'customer_support' ? supportOfficerContext : undefined} onOpenChat={setChatHistoryTarget} />;
      case 'trips': return <TripManagementView />;
      case 'bookings': return <BookingsView />;
      case 'payments': return <PaymentsView />;
      case 'disputes': return <DisputeManagementView />;
      case 'settings': return <SettingsView />;
      case 'support': return <CustomerSupportView onPreviewImage={(url, name) => setFocusedImage({ url, filename: name })} onDownloadImage={handleDownload} />;
      case 'stays': return <StayManagementView context={role === 'customer_support' ? supportOfficerContext : undefined} onOpenChat={setChatHistoryTarget} onPreviewImage={(url, name) => setFocusedImage({ url, filename: name })} onDownloadImage={handleDownload} />;
      case 'emergency': return <EmergencyResponseView />;
      case 'compliance': return <ComplianceView />;
      case 'alerts': return <AlertsCenterView />;
      case 'notifications': return <NotificationListView />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-warm font-sans">
      <Sidebar 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        role={role}
        supportOfficerContext={supportOfficerContext}
        currentView={currentView}
        setCurrentView={setCurrentView}
        setIsLogged={setIsLogged}
      />
      <main className="flex-1 flex flex-col min-w-0 relative h-full">
        <Header 
          currentView={currentView}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          setCurrentView={setCurrentView}
        />
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderView()}
          </div>
        </div>
      </main>

      <AnimatePresence>
        {chatHistoryTarget && <ChatHistoryModal target={chatHistoryTarget} />}
        {focusedImage && <ImageFocusModal data={focusedImage} />}
      </AnimatePresence>
    </div>
  );
}
