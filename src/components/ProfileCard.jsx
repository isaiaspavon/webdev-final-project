import React from 'react';
import './ProfileCard.Module.css'; // Import the CSS for styling

import HomePage from '../pages/Home';


const CardContainer = () => {
  return (
    <div className="big-card">
      <div className="left-card">
        <div className="Pfp-card">
            <img src="https://pbs.twimg.com/ext_tw_video_thumb/1630814377451614208/pu/img/QKQMJ4rIMpYYYm9d.jpg" alt="profile picture" className="profile-pic" />
        </div>
        <div className="desc-card">
        <p>This is a brief description about the user.</p>
        </div>
      </div>
      <div className="right-cards">
        <div className="top-right-card">
          <p>Major :</p>
          <p>Gender : </p>
          <p>Roommate Preference : </p>
          <p>Degree Level : </p>
        </div>
        <div className="bottom-right-card">
          <p>Pets : </p>
          <p>Pet Preferences : </p>
          <p>Tidiness : </p>
        </div>
      </div>
    </div>
  );
};

export default CardContainer;
