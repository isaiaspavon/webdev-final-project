import React from 'react';

interface RoommateListProps {
  roommates: {id: number; name: string; age: number}[];
}

const RoommateList: React.FC<RoommateListProps> = ({ roommates }) => {
  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-100 rounded-lg">
      {roommates.map((roommate) => (
        <div
          key={roommate.id}
          className="p-4 bg-white shadow rounded-md border border-gray-200"
        >
          <h3 className="text-xl font-semibold text-gray-800">{roommate.name}</h3>
          <p className="text-gray-600">Age: {roommate.age}</p>
        </div>
      ))}
    </div>
  );
};

export default RoommateList;