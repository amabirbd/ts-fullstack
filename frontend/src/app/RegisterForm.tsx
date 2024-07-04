// components/RegisterForm.js
"use client";
import { useState } from 'react';
import revalidate from './utils/revalidate';
import { useRouter } from 'next/navigation'
 

export default function RegisterForm() {
  const router = useRouter()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage('Registration successful!');
      await revalidate("usersCollection")
      router.refresh()
    } else {
      setMessage(data.error || 'Something went wrong.');
    }
  };

  return (
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Register User</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email:</label>
            <input
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password:</label>
            <input
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            type="submit"
          >
            Register
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-red-500">{message}</p>
        )}
      </div>
  );
}
