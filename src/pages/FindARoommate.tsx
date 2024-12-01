// src/pages/FindARoommate.tsx
'use client';
import React from 'react';
import { SessionProvider, useSession } from 'next-auth/react';

//components
import Navigation from '../components/Navigation'; //nav
import Showitems from '../components/ShowItemList';


const FindARoommate: React.FC = () => {
  
  return (
    <SessionProvider>
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Navigation /> {/* Navigation Bar */}
      <Showitems />
    </div>
    </SessionProvider>
  );
};

export default FindARoommate;