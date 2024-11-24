import React from 'react';
import './ProfileCard.Module.css'; 
import { getSession } from "next-auth/react";
import HomePage from '../pages/Home';
import { useSession } from "next-auth/react";


const CardContainer = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You are not logged in.</p>;
  }

  const user = session.user;
  
  return (
    <div className="big-card">
      <div className="left-card">
        <div className="Pfp-card">
            <img src="https://i.redd.it/5wbwtwkesdpa1.jpg" alt="profile picture" className="profile-pic" />
        </div>
        <div className="desc-card">
        <p>This is a brief description about the user.</p>
        </div>
      </div>
      <div className="right-cards">
        <div className="top-right-card">
          <p>Name: {session.user.name} </p>
          <p>Major: {session.user.lName}</p>
          <p>Gender: {user?.gender || "Not Specified"}</p>
          <p>Roommate Preference: {user?.roommatePreference || "No Preference"}</p>
          <p>Degree Level: {user?.degreeLevel || "Not Specified"}</p>

        </div>
        <div className="bottom-right-card">
          <p>Pets: {user?.pets || "No Pets"}</p>
          <p>Pet Preferences: {user?.petPreferences || "No Preference"}</p>
          <p>Tidiness: {user?.tidiness || "Not Specified"}</p>
        </div>
      </div>
    </div>
  );
};

export default CardContainer;
