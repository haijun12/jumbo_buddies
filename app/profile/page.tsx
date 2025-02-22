import { SignOutButton } from '@clerk/nextjs'
export default function Profile() {
    return (
        <div className="flex flex-col"> 
        show the profile
        <SignOutButton>
            <button className="bg-black text-white px-6 py-3 rounded">
                Sign Out
            </button>
        </SignOutButton>
        </div>
    )
}