// src/pages/AvailableSpaces.tsx
'use client';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//components
import Navigation from '../components/Navigation.jsx'; //nav
import Bottom from '../components/Spaces.jsx'; //bottom card

const AvailableSpaces: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Navigation /> {/* Navigation Bar */}
      <Bottom /> {/* card with apartments*/}
    </div>
  );
};

export default AvailableSpaces;