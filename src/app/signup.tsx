import React from 'react';

const SignUpPage = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle sign-up logic here
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Name" className="border p-2 w-full" required />
        <input type="email" placeholder="Email" className="border p-2 w-full" required />
        <input type="password" placeholder="Password" className="border p-2 w-full" required />
        <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2">Create Account</button>
      </form>
    </div>
  );
};

export default SignUpPage;