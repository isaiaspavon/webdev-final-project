import React, { useState, useEffect } from 'react';
import './ProfileCard.Module.css'; 
import { getSession } from "next-auth/react";
import HomePage from '../pages/Home';
import { useSession } from "next-auth/react";


const CardContainer = () => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.id) {
        try {
          const response = await fetch(`/api/${session.user.id}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch user data: ${response.status}`);
          }
          const data = await response.json();
          console.log("User data:", data);
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [session]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You are not logged in.</p>;
  }

  if (loading) {
    return <p>Loading user data...</p>;
  }

  if (!userData) {
    return <p>No user data available.</p>;
  }

  const { item } = userData;

  return (
    <div className="big-card">
      <div className="left-card">
        <div className="Pfp-card">
            <img src="https://i.redd.it/5wbwtwkesdpa1.jpg" alt="profile picture" className="profile-pic" />
        </div>
        <div className="desc-card">
        <p>{item.briefDescription}</p>
        </div>
      </div>
      <div className="right-cards">
        <div className="top-right-card">
          <button onClick={() => handleEditItem(item)}>Edit</button>
          <p>Name: {item.fName} {item.lName}</p>
          <p>Major: {item.major}</p>
          <p>Gender: {item?.gender || "Not Specified"}</p>
          <p>Roommate Preference: {item?.roommatePreference || "No Preference"}</p>
          <p>Degree Level: {item?.degreeLevel || "Not Specified"}</p>
          <p>Pets: {item?.hasPets || "No Pets"}</p>
          <p>Pet Preferences: {item?.mindsPets || "No Preference"}</p>
          <p>Tidiness: {item?.cleanliness || "Not Specified"}</p>
        </div>
      </div>
    </div>
  );
};

export default CardContainer;
