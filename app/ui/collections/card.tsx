"use client";
import { useState } from "react";
import EventVotingCard from "./EventVotingCard";

export default function Card({ listName, events }: { listName: string, events: any[] }) {
  const [showCard, setShowCard] = useState(false);

  return (
    <div className="relative flex flex-col w-full min-h-screen">
      {/* List Name - Centered at the Top Without Affecting Other Elements */}
      <h1 className="text-6xl italic text-center mt-2 absolute top-16 left-1/2 transform -translate-x-1/2">{listName}</h1>

      {/* ADD Button at Bottom Right (Fixed Positioning) */}
      <button
        className="fixed bottom-6 right-6 bg-black text-white px-6 py-3 shadow-lg hover:bg-gray-800"
        onClick={() => setShowCard(true)}
      >
        ADD
      </button>

      {/* Pop-up Card */}
      {showCard && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          {/* The Event Card in the center */}
          <EventVotingCard onClose={() => setShowCard(false)} />

          {/* The two images on the bottom-left and bottom-right */}
          <img
            src="/pictures/Tweedledee 2.png"
            alt="Tweedledee Left"
            className="absolute bottom-0 left-0 w-32 h-auto"
          />
          <img
            src="/pictures/Tweedledee 1.png"
            alt="Tweedledee Right"
            className="absolute bottom-0 right-0 w-32 h-auto"
          />
        </div>
      )}
    </div>
  );
}
