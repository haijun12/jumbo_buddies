"use client";
import React, { useState } from 'react';
import AddNewEventPopup from "./AddNewEvent";
import EventCard from "./EventCard";
import Image from "next/image";
import { Event } from "@/app/lib/types";

// TODO: Create a type for the events
export default function Card({ listName, events }: { listName: string, events: Event[] }) {
  const [showAddNewEvent, setShowAddNewEvent] = useState(false);
  const [eventsState, setEventsState] = useState<Event[]>(events || []);
  return (
    <div className="relative flex flex-col w-full min-h-screen items-center">
      {/* List Name - Centered at the Top Without Affecting Other Elements */}
      <h1 className="text-6xl italic text-center mt-2 absolute top-16 left-1/2 transform -translate-x-1/2">{listName}</h1>

      {/* Test EventCard Display */}
      <div className="mt-32"> {/* Added margin to separate from title */}
        <EventCard event={{ name: "Eating Cheese", rank: 1, description: "It was blue cheese." }} />
      </div>

      {/* ADD Button at Bottom Right (Fixed Positioning) */}
      <button
        className="fixed bottom-6 right-6 bg-black text-white px-6 py-3 shadow-lg hover:bg-gray-800"
        onClick={() => setShowAddNewEvent(true)}
      >
        ADD
      </button>

      {/* Pop-up Card */}
      {showAddNewEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          {/* The Event Card in the center */}
          <AddNewEventPopup 
            onClose={() => setShowAddNewEvent(false)} 
            eventsState={eventsState} 
            setEventsState={setEventsState} />

          {/* The two images on the bottom-left and bottom-right */}
          <Image
            src="/pictures/Tweedledee 2.png"
            alt="Tweedledee Left"
            className="absolute bottom-0 left-0 w-32 h-auto"
            width={32}
            height={32}
          />
          <Image
            src="/pictures/Tweedledee 1.png"
            alt="Tweedledee Right"
            className="absolute bottom-0 right-0 w-32 h-auto"
            width={32}
            height={32}
          />
        </div>
      )}
    </div>
  );
}
