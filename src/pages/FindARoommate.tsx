// src/pages/FindARoommate.tsx
'use client';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../components/UserDisplay'

//components
import Navigation from '../components/Navigation.jsx'; //nav

const FindARoommate: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Navigation /> {/* Navigation Bar */}
      <Home />
    </div>
  );
};

// src/components/UserDisplay.tsx

export default FindARoommate;