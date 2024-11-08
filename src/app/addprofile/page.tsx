'use client';
import React, { useState } from 'react';
import styles from "./page.module.css";
import Link from "next/link"

const AddProfile: React.FC = () => {
    const [major, setMajor] = useState('');
    const [pets, setPets] = useState('');
    const [cleanliness, setCleanliness] = useState('');
    const [degreeLevel, setDegreeLevel] = useState('');
    const [gender, setGender] = useState('');
    const [payments, setPayments] = useState('');
    const [question1, setQuestion1] = useState('');
    const [question2, setQuestion2] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Profile Details:', { major, pets, cleanliness, degreeLevel, gender, payments, question1, question2 });
    };
  
    return (
      <div className={styles.signupBackground}>
      <div className={styles.content}>
        <h2 className={styles.title}>Add Profile</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.column}>
            <label className={styles.label}>Major:</label>
            <input type="text" value={major} onChange={(e) => setMajor(e.target.value)} className={styles.input} />
  
            <label className={styles.label}>Pets:</label>
            <input type="text" value={pets} onChange={(e) => setPets(e.target.value)} className={styles.input} />
  
            <label className={styles.label}>Cleanliness:</label>
            <input type="text" value={cleanliness} onChange={(e) => setCleanliness(e.target.value)} className={styles.input} />
          </div>
  
          <div className={styles.column}>
            <label className={styles.label}>Degree Level:</label>
            <input type="text" value={degreeLevel} onChange={(e) => setDegreeLevel(e.target.value)} className={styles.input} />
  
            <label className={styles.label}>Gender:</label>
            <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} className={styles.input} />
  
            <label className={styles.label}>Payments:</label>
            <input type="text" value={payments} onChange={(e) => setPayments(e.target.value)} className={styles.input} />
          </div>
  
          <div className={styles.column}>
            <label className={styles.label}>Question 1:</label>
            <input type="text" value={question1} onChange={(e) => setQuestion1(e.target.value)} className={styles.input} />
  
            <label className={styles.label}>Question 2:</label>
            <input type="text" value={question2} onChange={(e) => setQuestion2(e.target.value)} className={styles.input} />
          </div>
  
          <button type="submit" className={styles.submitButton}>Save Profile</button>
        </form>
      </div>
      </div>
    );
  };
  
  export default AddProfile;
