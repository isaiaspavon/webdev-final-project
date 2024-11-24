// src/pages/Home.tsx
'use client';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//components
import Navigation from '../components/Navigation.jsx'; //nav
import ProfileCard from '../components/ProfileCard.jsx'; //card

const Home: React.FC = (component, pageProps) => {
  return (
    <SessionProvider session={pageProps.session}>
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Navigation /> {/* Navigation Bar */}
      <ProfileCard />
    </div>
    </SessionProvider>
  );
};

export default Home;