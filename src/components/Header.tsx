"use client";

import React from 'react';
import Link  from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-500 p-4">
      <nav className="container mx-auto">
        <ul className="flex space-x-4 text-white">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li><Link href="/login" className="hover:underline">Login</Link></li>
          <li><Link href="/signup" className="hover:underline">Sign Up</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
