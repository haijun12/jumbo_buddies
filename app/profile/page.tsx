'use client'
import Image from 'next/image';
import { useState } from "react";
import { updateUserDetails } from "@/app/lib/db_functions";
import { SignInButton, SignOutButton, useAuth, useUser } from '@clerk/nextjs'

export default function Profile() {
    const { sessionId } = useAuth()
    const { user } = useUser()
    const ages = Array.from({ length: 100 }, (_, i) => i);
    const [username, setUsername] = useState(user?.username || "");
    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [age, setAge] = useState(0);
    const handleUpdate = async () => {
      console.log("In handle update: " + username + " " + firstName + " " + lastName + " " + age)
        await updateUserDetails(username, firstName, lastName, age);
    }
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
        <Image
          src="/pictures/Ellipse 1.png"
          alt="Profile"
          className="rounded-full w-full h-full object-cover"
          width={100}
          height={100}
        />
      </div>

      {/* Edit link/text */}
      {/* <p className="text-sm text-gray-700 mb-6 cursor-pointer">Edit</p> */}

      {/* Username or Email */}
      <div className="mb-[30px]">
        <input
          type="text"
          placeholder="Username"
          value={user?.username || ""}
          onChange={(e) => setUsername(e.target.value)}
          className="border w-[400px] italic border-black p-[20px]"
        />
      </div>

      {/* First Name (optional) */}
      <div className="mb-[30px]">
        <input
          type="text"
          value={user?.firstName || ""}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name (optional)"
          className="border w-[400px] italic border-black p-[20px]"
        />
      </div>

      {/* Last Name (optional) */}
      <div className="mb-[30px]">
        <input
          type="text"
          value={user?.lastName || ""}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name (optional)"
          className="border w-[400px] italic border-black p-[20px]"
        />
      </div>

      {/* Age Dropdown */}
      <div className="mb-[30px]">
  <select
    className="
      border border-black w-[400px] italic
      h-[60px] bg-white shadow-none focus:shadow-none
      appearance-none rounded-none text-[#9B9B9B] p-[20px]
      bg-no-repeat bg-right bg-center
    "
    style={{
      WebkitAppearance: 'none',
      MozAppearance: 'none',
      boxShadow: 'none',
      backgroundImage: 'url("/pictures/dropdown-icon.png")',
      backgroundSize: '20px 20px',
      backgroundPosition: 'right 20px center'
    }}
    onChange={(e) => setAge(parseInt(e.target.value))}
  >
    <option value="" className="italic text-[#9B9B9B]">
      Select Your Age
    </option>
    {ages.map((age) => (
      <option key={age} value={age} className="text-[#9B9B9B]">
        {age}
      </option>
    ))}
  </select>
</div>




      {/* Buttons: SIGN OUT (red) and UPDATE (black) */}
      <div className="flex space-x-[50px]">
        <SignOutButton signOutOptions={{ sessionId }}>
            <button className="h-[60px] my-[20px] p-[20px] bg-[#D54C4C] text-white">SIGN OUT</button>
        </SignOutButton>
        <button onClick = {handleUpdate}className="h-[60px] my-[20px] p-[20px] bg-black text-white">UPDATE</button>
      </div>
    </div>
    </div>
    )
}