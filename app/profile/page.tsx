'use client'

import { SignInButton, SignOutButton, useAuth } from '@clerk/nextjs'

export default function Profile() {
    const { sessionId } = useAuth()
    const ages = Array.from({ length: 100 }, (_, i) => i);


    if (!sessionId) {
        return <SignInButton />
    }

    return (
        <div className="flex flex-col w-full"> 
        <div className="min-h-screen flex flex-col items-center justify-center p-8">
      {/* Heading */}
      <h1 className="text-5xl font-bold-alice mb-6">Who Are You?</h1>

      {/* Circular Profile Image (Elipse 1.png) */}
      <div className="relative w-24 h-24 mb-2">
        <img
          src="/pictures/Ellipse 1.png"
          alt="Profile"
          className="rounded-full w-full h-full object-cover"
        />
      </div>

      {/* Edit link/text */}
      <p className="text-sm text-gray-700 mb-6 cursor-pointer">Edit</p>

      {/* Username or Email */}
      <div className="w-72 mb-4">
        <input
          type="text"
          placeholder="Username or Email"
          className="border border-black w-full p-2"
        />
      </div>

      {/* First Name (optional) */}
      <div className="w-72 mb-4">
        <input
          type="text"
          placeholder="First Name (optionial)"
          className="border border-black w-full p-2"
        />
      </div>

      {/* Last Name (optional) */}
      <div className="w-72 mb-4">
        <input
          type="text"
          placeholder="Last Name (optionial)"
          className="border border-black w-full p-2"
        />
      </div>

      {/* Age Dropdown */}
      <div className="w-72 mb-6">
        <select className="border border-black w-full p-2">
          <option value="">Age</option>
          {ages.map((age) => (
            <option key={age} value={age}>
              {age}
            </option>
          ))}
        </select>
      </div>

      {/* Buttons: SIGN OUT (red) and UPDATE (black) */}
      <div className="flex space-x-4">
        <SignOutButton signOutOptions={{ sessionId }}>
            <button className="bg-red-600 text-white px-6 py-2">SIGN OUT</button>
        </SignOutButton>
        <button className="bg-black text-white px-6 py-2">UPDATE</button>
      </div>
    </div>
    </div>
    )
}