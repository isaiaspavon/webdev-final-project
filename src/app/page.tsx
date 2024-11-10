'use client';
import React, { useState } from 'react';
import styles from "./page.module.css";
import Link from "next/link"

const login: React.FC = () => {
  const [fName, setfName]= useState('');
  const [lName, setlName]= useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('SignUp Details:', { fName, lName, email, password });
  };

  return (
<div className={styles.signupBackground}>
  <div className={styles.overlay}></div>  {/* Blurred background overlay */}
  
  <div className={styles.content}>
    {/* form content goes here */}
    <h1 className="text-2xl font-semibold mb-6">RoomSync</h1>
    <h2 className="text-2xl font-semibold mb-6">Login</h2>
    <form onSubmit={handleSubmit} className="space-y-4">

      <div>
        <label className={styles.label}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />
      </div>
      <div>
        <label className={styles.label}>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.buttonContainer}>
      <Link href="/signup" passHref>
        <button type="submit" className={styles.submitButton}>
        Sign Up
        </button>
      </Link>
      
      <Link href="/Home" passHref>
        <button type="submit" className={styles.submitButton}>
        Submit
        </button>
      </Link>
      </div>
      
    </form>
  </div>
</div>
  );
};

export default login;
