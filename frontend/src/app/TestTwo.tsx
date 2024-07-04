// components/UserList.js
import { useEffect, useState } from 'react';



export default function TestTwo() {

  async function getData() {
    'use server'
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, { next: { tags: ['usersCollection'] }, cache: 'no-store'  });
    
    const res = await fetch(`https://jsonplaceholder.typicode.com/users`, { next: { tags: ['usersCollection'] }, cache: 'no-store'  });
  
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const users = res.json()

    console.log( "RESPONSE: ", res);
  
    return users;
  }

  const users: any = getData()

  console.log(users);

  return (
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md m-5">
        <h1 className="text-2xl font-semibold mb-6 text-center">User List</h1>
        <ul className="list-disc list-inside space-y-2 ">
          {/* {users.map((user: any) => (
            <li key={user.id} className="list-none text-red-700">
              {user.email}
            </li>
          ))} */}
          {/* {{users}} */}
        </ul>
      </div>
  );
}
