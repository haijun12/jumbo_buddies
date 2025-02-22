'use client'

import { SignInButton, SignOutButton, useAuth } from '@clerk/nextjs'

export default function Profile() {
    const { sessionId } = useAuth()

    if (!sessionId) {
        return <SignInButton />
    }

    return (
        <div className="flex flex-col"> 
        show the profile
        <SignOutButton signOutOptions={{ sessionId }}>
            <button className="bg-black text-white px-6 py-3 rounded">
                Sign Out
            </button>
        </SignOutButton>
        </div>
    )
}