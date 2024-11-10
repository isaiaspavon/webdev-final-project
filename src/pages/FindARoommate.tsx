// src/pages/FindARoommate.tsx
'use client';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//components
import Navigation from '../components/Navigation.jsx'; //nav
import Home from '../components/UserDisplay';
import AddItemForm from '../components/AddItemForm'

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