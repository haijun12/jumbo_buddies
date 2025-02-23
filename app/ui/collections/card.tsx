"use client";
import { useState } from "react";
import EventVotingCard from "./EventVotingCard";



export default function Card({ listName, events }: { listName: string, events: any[] }) {
  const [showCard, setShowCard] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center w-full"> 
            {/* TODO: Make sure that the user is valid */}
            <h1>{listName}</h1>

        <button
        className="bg-black text-white px-6 py-3"
        onClick={() => setShowCard(true)}
      >
        Add
      </button>

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
    )
}