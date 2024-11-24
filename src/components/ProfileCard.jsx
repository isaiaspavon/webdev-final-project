import React from 'react';
import './ProfileCard.Module.css'; 

import HomePage from '../pages/Home';


const CardContainer = () => {
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
          <p>Name :</p>
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
