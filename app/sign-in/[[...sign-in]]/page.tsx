"use client";
import { SignIn } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  const router = useRouter();
  const { isSignedIn } = useAuth(); // Check if user is signed in

  // Redirect after sign-in
  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5 w-full">
      <h1 className="text-3xl font-bold mb-4">Whooo are youu?</h1>

        <SignIn />
        
      {/* Caterpillar Image */}
      <Image 
      src="/pictures/login_caterpillar.png" 
      alt="Caterpillar" 
      width={400} 
      height={400} 
      className="absolute bottom-4 left-4" 
      />
    </div>
  );
}
