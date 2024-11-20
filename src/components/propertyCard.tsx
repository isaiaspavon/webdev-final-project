import React from 'react';
import './PropertyCard.Module.css';
interface Cardprops {
    imgSrc: string;
    name: string;
    address: string;
}

const Card: React.FC<Cardprops> = ({ imgSrc, name, address }) => {
  return (
    <div className="theCard">
      <img src={imgSrc} alt={name} className="card-img" />
      <div className="card-content">
        <h2 className="card-name">{name}</h2>
        <p className="card-address">{address}</p>
      </div>
    </div>
  );
};

export default Card;
