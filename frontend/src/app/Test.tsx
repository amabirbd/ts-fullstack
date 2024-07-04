// components/UserList.js
"use client";
import { useEffect, useState } from 'react';

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, { next: { tags: ['usersCollection'] }, cache: 'no-store'  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default function Test() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const users = await getData();
        setData(users);
      } catch (error: any) {
        setError(error.message);
      }
    }

    fetchData();
  }, []);


  return (
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md m-5">
        <h1 className="text-2xl font-semibold mb-6 text-center">User List</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <ul className="list-disc list-inside space-y-2 ">
          {data.map((user: any) => (
            <li key={user.id} className="list-none text-green-700">
              {user.email}
            </li>
          ))}
        </ul>
      </div>
  );
}
