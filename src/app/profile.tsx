import React from 'react';

const ProfilePage = () => {
  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle profile update logic here
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Your Profile</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input type="text" placeholder="Your Name" className="border p-2 w-full" />
        <textarea placeholder="Bio" className="border p-2 w-full" rows={4}></textarea>
        <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;