'use client';
import React, { useState } from 'react';
import styles from "./page.module.css";
import Link from "next/link"

const AddProfile: React.FC = () => {
    const [major, setMajor] = useState('');
    const [cleanliness, setCleanliness] = useState('');
    const [degreeLevel, setDegreeLevel] = useState('');
    const [gender, setGender] = useState('');
    const[roomatePreference, setRoomatePreference] = useState('');
    const [briefDescription, setBriefDescription] = useState('');

    // State for the pets-related questions
    const [hasPets, setHasPets] = useState<string | null>(null); // "yes" or "no"
    const [mindsPets, setMindsPets] = useState<string | null>(null); // "yes" or "no"
    const [petType, setPetType] = useState(''); // If user has pets, specify the type

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Profile Details:', { major, cleanliness, degreeLevel, gender, roomatePreference, briefDescription, hasPets, mindsPets, petType });
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
                        <option value="">Select a Major</option>
                        <option value="Accounting">Accounting</option>
                        <option value="Anthropology">Anthropology</option>
                        <option value="Architecture">Architecture</option>
                        <option value="Art">Art</option>
                        <option value="Biology">Biology</option>
                        <option value="Business Administration">Business Administration</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Civil Engineering">Civil Engineering</option>
                        <option value="Communication">Communication</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Design">Design</option>
                        <option value="Economics">Economics</option>
                        <option value="Education">Education</option>
                        <option value="Electrical Engineering">Electrical Engineering</option>
                        <option value="English">English</option>
                        <option value="Environmental Science">Environmental Science</option>
                        <option value="Finance">Finance</option>
                        <option value="History">History</option>
                        <option value="International Relations">International Relations</option>
                        <option value="Journalism">Journalism</option>
                        <option value="Law">Law</option>
                        <option value="Linguistics">Linguistics</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                        <option value="Medicine">Medicine</option>
                        <option value="Music">Music</option>
                        <option value="Nursing">Nursing</option>
                        <option value="Philosophy">Philosophy</option>
                        <option value="Physics">Physics</option>
                        <option value="Political Science">Political Science</option>
                        <option value="Psychology">Psychology</option>
                        <option value="Sociology">Sociology</option>
                        <option value="Theater">Theater</option>
                    </select>

                    <label className={styles.label}>Gender</label>
                            <select 
                                value={gender} 
                                onChange={(e) => setGender(e.target.value)} 
                                className={styles.input}>
                                <option value="" disabled hidden>Select Your Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>

                        

                        <label className={styles.label}>How tidy are you?</label>
                        <select 
                            value={cleanliness} 
                            onChange={(e) => setCleanliness(e.target.value)} 
                            className={styles.input}>
                            <option value="" disabled hidden>Select Cleanliness Level</option>
                            <option value="1">Could eat off the floor</option>
                            <option value="2">Everything is put away</option>
                            <option value="3">A little messy</option>
                            <option value="4">Where’s the floor?</option>
                        </select>

                        <label className={styles.label}>Roomate Preference</label>
                            <select 
                                value={roomatePreference} 
                                onChange={(e) => setRoomatePreference(e.target.value)} 
                                className={styles.input}>
                                <option value="">Select Roomate Preference</option>
                                <option value="">Co-ed</option>
                                <option value="">Gender Segregated</option>
                            </select>

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
                        
                        
                        
                        <Link className={styles.links}href="/signup" passHref>
                            <button className={styles.submitButton}>
                             Previous
                             </button>
                        </Link>
                    </div>


                    <div className={styles.column}>
                    <label className={styles.label}>Enter a brief description about yourself :</label>

                    <textarea 
                        value={briefDescription} 
                        className={styles.textArea} 
                        onChange={(e) => setBriefDescription(e.target.value)}
                        />


                        <Link className={styles.links} href="/" passHref>
                            <button type="submit" className={styles.submitButton}>Save Profile</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProfile;