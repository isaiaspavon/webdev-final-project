// src/pages/FindARoommate.tsx
'use client';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//components
import Navigation from '../components/Navigation'; //nav
import Home from '../components/UserDisplay';
import Signup from '../components/FormFindARoommate';


const FindARoommate: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Navigation /> {/* Navigation Bar */}
      <Home /> {/* This is UserDisplay.tsx */}
     {/* <Signup onAddUser={addUser}/> {/* THIS IS FormFindARommate.tsx */}
    </div>
  );
};

// src/components/UserDisplay.tsx

export default FindARoommate;