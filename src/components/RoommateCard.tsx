import React from 'react';

interface Roommate {
  name: string;
  bio: string;
  interests: string[];
}

interface RoommateCardProps {
  roommate: Roommate;
}

const RoommateCard: React.FC<RoommateCardProps> = ({ roommate }) => {
  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-bold">{roommate.name}</h2>
      <p>{roommate.bio}</p>
      <p>Interests: {roommate.interests.join(', ')}</p>
      <button className="bg-blue-600 text-white rounded px-4 py-2">
        Contact
      </button>
    </div>
  );
};

export default RoommateCard;