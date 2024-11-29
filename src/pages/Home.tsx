'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import Navigation from '../components/Navigation'; // Nav
import ProfileCard from '../components/ProfileCard'; // Card

const Home: React.FC = () => {
  return (
    <SessionProvider>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <Navigation /> {/* Navigation Bar */}
        <ProfileCard /> {/* Profile Card */}
      </div>
    </SessionProvider>
  );
};

export default Home;