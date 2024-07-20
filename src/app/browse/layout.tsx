'use client'
import React, { ReactNode } from 'react';
import Header from '../../components/Header';
import BottomBar from '@/components/BottomBar';
import Navbar from '@/components/Navbar';
import { MenuProvider } from '../../context/MenuContext';
type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
    <MenuProvider>
      <Header />
      <Navbar />
      <main className="flex-1 container mx-auto mt-10 px-4 mb-10">
        {children}
      </main>
      <BottomBar />
    </MenuProvider>
  </div>
  );
};

export default Layout;