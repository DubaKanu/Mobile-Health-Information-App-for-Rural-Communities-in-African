import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import EmergencyButton from './EmergencyButton';
const Layout = () => {
  return <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-4 mb-16">
        <Outlet />
      </main>
      <EmergencyButton />
      <Footer />
    </div>;
};
export default Layout;