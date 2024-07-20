'use client'
import React, { ReactNode } from 'react';
import Header from '../../components/Header';
import BottomBar from '@/components/BottomBar';
type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
      <BottomBar />
    </div>
  );
};

export default Layout;