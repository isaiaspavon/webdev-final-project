'use client';
import React, { useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignUpAndProfile: React.FC = () => {
  const router = useRouter();
  // State for SignUp details
  const [fName, setfName] = useState('');
  const [lName, setlName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for AddProfile details
  const [major, setMajor] = useState('');
  const [cleanliness, setCleanliness] = useState('');
  const [degreeLevel, setDegreeLevel] = useState('');
  const [gender, setGender] = useState('');
  const [roommatePreference, setRoommatePreference] = useState('');
  const [briefDescription, setBriefDescription] = useState('');
  const [imageURL, setImgURL] = useState('');


  // State for pets-related questions
  const [hasPets, setHasPets] = useState('');
  const [mindsPets, setMindsPets] = useState('');
  const [petType, setPetType] = useState('');

  // State to toggle between SignUp and AddProfile form
  const [isSignUpComplete, setIsSignUpComplete] = useState(false);

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('SignUp Details:', { fName, lName, email, password });
    setIsSignUpComplete(true); // Switch to the AddProfile form after SignUp is completed
  };

  const handleAddProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const profileData = {
      fName,
      lName,
      email,
      password,
      major,
      cleanliness,
      degreeLevel,
      gender,
      roommatePreference,
      briefDescription,
      imageURL,
      hasPets: hasPets === 'yes',
      mindsPets: mindsPets === 'yes',
      petType: hasPets === 'yes' ? petType : null,
    };

    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      const result = await response.json();
      if (result.success) {
        alert('Profile saved successfully!');
        router.push('/');
        // Optional: Redirect or clear the form
      } else {
        alert('Error saving profile: ' + result.message);
      }
    } catch (error) {
      console.error('Error submitting profile:', error);
      alert('An unexpected error occurred.');
    }
  };

  return (
    <div className={styles.signupBackground1}>
      <div className={styles.overlay1}></div> {/* Blurred background overlay */}

      <div className={styles.content1}>
        {/* SignUp Section */}
        {!isSignUpComplete ? (
          <>
            <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
            <form onSubmit={handleSignUpSubmit} className="space-y-4">
              <div>
                <label className={styles.label1}>First Name:</label>
                <input
                  type="text"
                  value={fName}
                  onChange={(e) => setfName(e.target.value)}
                  className={styles.input1}
                  required
                />
              </div>
              <div>
                <label className={styles.label1}>Last Name:</label>
                <input
                  type="text"
                  value={lName}
                  onChange={(e) => setlName(e.target.value)}
                  className={styles.input1}
                  required
                />
              </div>
              <div>
                <label className={styles.label1}>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input1}
                  required
                />
              </div>
              <div>
                <label className={styles.label1}>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input1}
                  required
                />
              </div>

              <div className={styles.buttonContainer1}>
                <button type="submit" className={styles.submitButton1}>
                  Next
                </button>
              </div>
            </form>
          </>
        ) : (
          // AddProfile Section
          <>
            <h2 className={styles.title2}>Your Preferences</h2>

            <form onSubmit={handleAddProfileSubmit} className={styles.form2}>
              <div className={styles.column2}>
                <label className={styles.label2}>Major:</label>
                <select
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  className={styles.input2}
                >
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

                <label className={styles.label2}>Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className={styles.input2}
                >
                  <option value="" disabled hidden>Select Your Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>

                <label className={styles.label2}>How tidy are you?</label>
                <select
                  value={cleanliness}
                  onChange={(e) => setCleanliness(e.target.value)}
                  className={styles.input2}
                >
                  <option value="" disabled hidden>Select Cleanliness Level</option>
                  <option value="1">Could eat off the floor</option>
                  <option value="2">Everything is put away</option>
                  <option value="3">A little messy</option>
                  <option value="4">Where’s the floor?</option>
                </select>

                <label className={styles.label2}>Roommate Preference</label>
                <select
                  value={roommatePreference}
                  onChange={(e) => setRoommatePreference(e.target.value)}
                  className={styles.input2}
                >
                  <option value="">Select Roommate Preference</option>
                  <option value="Co-ed">Co-ed</option>
                  <option value="Gender Segregated">Gender Segregated</option>
                </select>
              </div>

              <div className={styles.column2}>
                <label className={styles.label2}>Degree Level:</label>
                <select
                  value={degreeLevel}
                  onChange={(e) => setDegreeLevel(e.target.value)}
                  className={styles.input2}
                >
                  <option value="" disabled hidden>Select Degree Level</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Graduate">Graduate</option>
                </select>

                <label className={styles.label2}>Do you have pets?</label>
                <div className={styles.radioGroup2}>
                  <label className={styles.radioOption2}>
                    <input
                      type="radio"
                      name="hasPets"
                      value="yes"
                      checked={hasPets === 'yes'}
                      onChange={() => setHasPets('yes')}
                    />
                    Yes
                  </label>
                  <label className={styles.radioOption2}>
                    <input
                      type="radio"
                      name="hasPets"
                      value="no"
                      checked={hasPets === 'no'}
                      onChange={() => setHasPets('no')}
                    />
                    No
                  </label>
                </div>

                {hasPets === 'yes' && (
                  <div className={styles.formGroup2}>
                    <label className={styles.label2}>What type of pet do you have?</label>
                    <input
                      type="text"
                      value={petType}
                      onChange={(e) => setPetType(e.target.value)}
                      className={styles.input2}
                    />
                  </div>
                )}

                <label className={styles.label2}>Do you mind living with pets?</label>
                <div className={styles.radioGroup2}>
                  <label className={styles.radioOption2}>
                    <input
                      type="radio"
                      name="mindsPets"
                      value="yes"
                      checked={mindsPets === 'yes'}
                      onChange={() => setMindsPets('yes')}
                    />
                    Yes
                  </label>
                  <label className={styles.radioOption2}>
                    <input
                      type="radio"
                      name="mindsPets"
                      value="no"
                      checked={mindsPets === 'no'}
                      onChange={() => setMindsPets('no')}
                    />
                    No
                  </label>
                </div>
                <div className={styles.buttonContainer2}>
                  <button
                    type="button"
                    onClick={() => setIsSignUpComplete(false)} // Revert to Sign Up
                    className={styles.submitButton1} // Add a secondary button style
                  >
                    Previous
                  </button>
                  </div>
              </div>

              <div className={styles.column2}>
                <label className={styles.label2}>Brief Description:</label>
                <textarea
                  value={briefDescription}
                  onChange={(e) => setBriefDescription(e.target.value)}
                  className={styles.input3}
                  rows={4}
                />

                <label className={styles.label2}>Image URL:</label> 
                <input
                type="url"
                value={imageURL}
                onChange={(e) => setImgURL(e.target.value)}
                className={styles.input2}
                placeholder="Enter a profile picture."
                />

              <div className={styles.buttonContainer}>
                <button type="submit" className={styles.submitButton2}>
                  Save Profile
                </button>
              </div>


              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUpAndProfile;
