import React from 'react';
import './ProfileCard.Module.css'; // Import the CSS for styling

import HomePage from '../pages/Home';


const CardContainer = () => {
  return (
    <div className="big-card">
      <div className="left-card">
        <div className="Pfp-card">
            <p>Hi</p>
        </div>
        <div className="desc-card">
            <p>Hi</p>
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
