import React from 'react'
import revalidate from './utils/revalidate';
import { revalidatePath } from 'next/cache';

const New = () => {

    async function handleSubmit(formData: FormData) {
        'use server'
     
        const rawFormData = {
          email: formData.get('email'),
          password: formData.get('password'),
        }

        console.log(rawFormData);
     
        // mutate data

        // revalidate cache

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: rawFormData.email,
                password: rawFormData.password
            }),
          });
      
          const data = await res.json();
      
          if (res.ok) {
            console.log('Registration successful!');
            // await revalidate("usersCollection")
            revalidatePath("/")
            
          } else {
            console.log(data.error || 'Something went wrong.');
          }


      }

  return (
    <div>      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
    <h1 className="text-2xl font-semibold mb-6 text-center">Register User</h1>
    <form action={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Email:</label>
        <input
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          name='email'
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Password:</label>
        <input
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          name="password"
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
    {/* {message && (
      <p className="mt-4 text-center text-red-500">{message}</p>
    )} */}
  </div></div>
  )
}

export default New