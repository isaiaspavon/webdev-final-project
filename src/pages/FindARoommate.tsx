// src/pages/FindARoommate.tsx
'use client';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//components
import Navigation from '../components/Navigation.jsx'; //nav

const FindARoommate: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Navigation /> {/* Navigation Bar */}
    </div>
  );
};

export default FindARoommate;