// src/pages/Home.tsx
'use client';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//components
import Navigation from '../components/Navigation.jsx'; //nav
import ProfileCard from '../components/ProfileCard.jsx'; //card

const Home: React.FC = () => {
  return (
    <div className="flex items-start justify-between h-screen bg-gray-100">
      <Navigation /> {/* Navigation Bar */}
      <ProfileCard /> {/* Profile Card */}
    </div>
  );
};

export default Home;
