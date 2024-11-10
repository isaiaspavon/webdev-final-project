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

    // State for the pets-related questions
    const [hasPets, setHasPets] = useState<string | null>(null); // "yes" or "no"
    const [mindsPets, setMindsPets] = useState<string | null>(null); // "yes" or "no"
    const [petType, setPetType] = useState(''); // If user has pets, specify the type

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Profile Details:', { major, pets, cleanliness, degreeLevel, gender, payments, question1, question2, hasPets, mindsPets, petType });
    };

    return (
        <div className={styles.signupBackground}>
            <div className={styles.overlay}></div>  {/* Blurred background overlay */}
            <div className={styles.content}>
                <h2 className={styles.title}>Your Preferences</h2>
                
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.column}>
                        <label className={styles.label}>Major:</label>
                        <select 
                            value={major} 
                            onChange={(e) => setMajor(e.target.value)} 
                            className={styles.input}>
                            <option value="" disabled hidden>Select a Major</option>
                            <option value="Accounting">Accounting</option>
                            <option value="Anthropology">Anthropology</option>
                            <option value="Architecture">Architecture</option>
                            {/* ...other majors */}
                        </select>

                        {/* PETS QUESTIONS */}
                        {/* Question: Do you have pets? */}
                        <label className={styles.label}>Do you have pets?</label>
                        <div className={styles.radioGroup}>
                            <label className={styles.radioOption}>
                                <input
                                    type="radio"
                                    name="hasPets"
                                    value="yes"
                                    checked={hasPets === "yes"}
                                    onChange={() => setHasPets("yes")}
                                    required
                                />
                                Yes
                            </label>
                            <label className={styles.radioOption}>
                                <input
                                    type="radio"
                                    name="hasPets"
                                    value="no"
                                    checked={hasPets === "no"}
                                    onChange={() => setHasPets("no")}
                                    required
                                />
                                No
                            </label>
                        </div>

                        {/* Conditional Question: If they have pets, ask for the type */}
                        {hasPets === "yes" && (
                            <div className={styles.formGroup}>
                                <label className={styles.label}>What type of pet do you have?</label>
                                <input
                                    type="text"
                                    value={petType}
                                    onChange={(e) => setPetType(e.target.value)}
                                    className={styles.input}
                                    required
                                />
                            </div>
                        )}

                        {/* Question: Do you mind living with pets? */}
                        <label className={styles.label}>Do you mind living with pets?</label>
                        <div className={styles.radioGroup}>
                            <label className={styles.radioOption}>
                                <input
                                    type="radio"
                                    name="mindsPets"
                                    value="yes"
                                    checked={mindsPets === "yes"}
                                    onChange={() => setMindsPets("yes")}
                                    required
                                />
                                Yes
                            </label>
                            <label className={styles.radioOption}>
                                <input
                                    type="radio"
                                    name="mindsPets"
                                    value="no"
                                    checked={mindsPets === "no"}
                                    onChange={() => setMindsPets("no")}
                                    required
                                />
                                No
                            </label>
                            </div>

                        <label className={styles.label}>Cleanliness:</label>
                        <input type="text" value={cleanliness} onChange={(e) => setCleanliness(e.target.value)} className={styles.input} />
                    </div>

                    <div className={styles.column}>
                        <label className={styles.label}>Degree Level:</label>
                        <select 
                            value={degreeLevel} 
                            onChange={(e) => setDegreeLevel(e.target.value)} 
                            className={styles.input}>
                            <option value="" disabled hidden>Select Degree Level</option>
                            <option value="Undergraduate">Undergraduate</option>
                            <option value="Graduate">Graduate</option>
                        </select>

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

                        <button type="submit" className={styles.submitButton}>Save Profile</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProfile;