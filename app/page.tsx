"use client";
import { useState } from "react";
import EventVotingCard from "./components/EventVotingCard";

import Link from "next/link"
export default function Home() {
  const [showCard, setShowCard] = useState(false);

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center text-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/pictures/homeBackground.png')" }}
    >
      <h1 className="text-8xl font-bold-alice text-white mb-4">
        DOWN THE RABBIT HOLE
      </h1>
      <p className="text-3xl text-white mb-6">
        Rate Everything & Anything that You've Ever Done, Eaten, Seen, Read, etc.
      </p>
      <Link href="/create"
        className="bg-black text-white px-6 py-3 rounded"
        onClick={() => setShowCard(true)}
      >
        START
      </Link>

      {showCard && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          {/* The Event Card in the center */}
          <EventVotingCard onClose={() => setShowCard(false)} />

          {/* The two images on the bottom-left and bottom-right */}
          <img
            src="/pictures/Tweedledee 2.png" 
            alt="Girl on the left"
            className="absolute bottom-0 left-0 w-32 h-auto"
          />
          <img
            src="/pictures/Tweedledee 1.png" 
            alt="Girl on the right"
            className="absolute bottom-0 right-0 w-32 h-auto"
          />
        </div>
      )}
    </div>
  );
}
