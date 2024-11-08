'use client';
import React, { useState } from 'react';
import styles from "./page.module.css";
import Link from "next/link"

const SignUp: React.FC = () => {
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
    {/* Your form content goes here */}
    <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
    <div>
        <label className={styles.label}>First Name:</label>
        <input
          type="first name"
          value={fName}
          onChange={(e) => setfName(e.target.value)}
          className={styles.input}
          required
        />
      </div>
      <div>
        <label className={styles.label}>Last Name:</label>
        <input
          type="last name"
          value={lName}
          onChange={(e) => setlName(e.target.value)}
          className={styles.input}
          required
        />
      </div>
      <br />
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
      <Link href="/addprofile" passHref>
        <button type="submit" className={styles.submitButton}>
        Next Page
        </button>
      </Link>
    </form>
  </div>
</div>
  );
};

export default SignUp;
