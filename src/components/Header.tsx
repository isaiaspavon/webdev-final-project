"use client";

import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-500 p-4">
      <nav className="container mx-auto">
        <ul className="flex space-x-4 text-white">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/login" className="hover:underline">Login</Link></li>
          <li><Link to="/signup" className="hover:underline">Sign Up</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
