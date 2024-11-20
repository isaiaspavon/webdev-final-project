// src/pages/Home.tsx
'use client';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//components
import Navigation from '../components/Navigation.jsx'; //nav
import ProfileCard from '../components/ProfileCard.jsx'; //card

const Home: React.FC = () => {
  const imgUrl = 'https://live.staticflickr.com/2423/3632781339_9fdd85743f_b.jpg';
  return (
    <div style={{
      backgroundImage: `url(${imgUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '95vh', 
      width: '100vw', 
      margin: 0,      
      padding: 0,
      display: 'flex',
      flexDirection: 'column', 
    }}>
      <Navigation /> {/* Navigation Bar */}
      <ProfileCard />
    </div>
  );
};

export default Home;