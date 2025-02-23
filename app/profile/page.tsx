'use client'

import { SignInButton, SignOutButton, useAuth } from '@clerk/nextjs'

export default function Profile() {
    const { sessionId } = useAuth()
    const ages = Array.from({ length: 100 }, (_, i) => i);


    if (!sessionId) {
        return <SignInButton />
    }

    return (
      <div className="w-full min-h-screen flex flex-col">
      <div className="p-4 text-center">
        <h1 className="font-alice text-[75px] font-bold mb-4">
          Who are You?
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center p-8">

      {/* Circular Profile Image (Elipse 1.png) */}
      <div className="relative w-[100px] h-[100px] mb-2">
        <img
          src="/pictures/Ellipse 1.png"
          alt="Profile"
          className="rounded-full w-full h-full object-cover"
        />
      </div>

      {/* Edit link/text */}
      <p className="text-sm text-gray-700 mb-6 cursor-pointer">Edit</p>

      {/* Username or Email */}
      <div className="mb-[30px]">
        <input
          type="text"
          placeholder="Username or Email"
          className="border w-[400px] italic border-black p-[20px]"
        />
      </div>

      {/* First Name (optional) */}
      <div className="mb-[30px]">
        <input
          type="text"
          placeholder="First Name (optional)"
          className="border w-[400px] italic border-black p-[20px]"
        />
      </div>

      {/* Last Name (optional) */}
      <div className="mb-[30px]">
        <input
          type="text"
          placeholder="Last Name (optional)"
          className="border w-[400px] italic border-black p-[20px]"
        />
      </div>

      {/* Age Dropdown */}
      <div className="mb-[30px]">
        <select
          className="
            border border-black w-[400px] italic p-[20px]
            h-[60px] leading-[60px] bg-white rounded-none          "
        >
          <option value="" className="italic">
            Select Your Age
          </option>
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