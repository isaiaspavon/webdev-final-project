'use client';
import React, {useState} from 'react';

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // CALL BACKEND API HERE: DELETE/OVERRIDE IF NEED BE
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify({email, password}),
  });

  if (response.ok) {
    // Redirect to dashboard or homepage, or update user context
    console.log('Login successful!');
  } else {
    // Handle login error, e.g., show error message
    console.error('Login failed.');
  }
};

return (
  <div className="p-4">
    <h1 className="text-3xl font-bold">Login</h1>
    <form onSubmit={handleLogin} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2">Login</button>
    </form>
  </div>
);
};

export default LoginPage;
