'use client';

import React, { useState } from 'react';
import ClientApp from '../components/ClientApp';
import LoginView from '../views/LoginView';

export default function Page() {
  const [isLogged, setIsLogged] = useState(false);
  const [role, setRole] = useState('super_admin');
  const [supportOfficerContext, setSupportOfficerContext] = useState({
    country: 'Kenya',
    supportTask: 'stays'
  });

  const handleLogin = (userRole, task) => {
    setRole(userRole);
    if (userRole === 'customer_support' && task) {
      setSupportOfficerContext(prev => ({ ...prev, supportTask: task }));
    }
    setIsLogged(true);
  };

  if (!isLogged) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <ClientApp 
      role={role} 
      supportOfficerContext={supportOfficerContext} 
      setIsLogged={setIsLogged} 
    />
  );
}
