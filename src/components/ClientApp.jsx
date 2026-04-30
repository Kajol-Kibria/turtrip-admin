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

export default function ClientApp({ role, supportOfficerContext, setIsLogged }) {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <DashboardView context={role === 'customer_support' ? supportOfficerContext : undefined} onNavigate={setCurrentView} />;
      case 'users': return <UserManagementView />;
      case 'staff': return <StaffManagementView />;
      case 'drivers': return <DriverManagementView context={role === 'customer_support' ? supportOfficerContext : undefined} />;
      case 'guides': return <GuideManagementView context={role === 'customer_support' ? supportOfficerContext : undefined} />;
      case 'trips': return <TripManagementView />;
      case 'bookings': return <BookingsView />;
      case 'payments': return <PaymentsView />;
      case 'disputes': return <DisputeManagementView />;
      case 'settings': return <SettingsView />;
      case 'support': return <CustomerSupportView />;
      case 'stays': return <StayManagementView context={role === 'customer_support' ? supportOfficerContext : undefined} />;
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
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-8">
          <div className="max-w-7xl mx-auto">
            {renderView()}
          </div>
        </div>
      </main>
    </div>
  );
}
