"use client";
import React, { useState } from 'react';
import AddNewEventPopup from "./AddNewEvent";
import EventCard from "./EventCard";
import Image from "next/image";
import { Event } from "@/app/lib/types";

export default function Card({ id, listName, events }: { id: number, listName: string, events: Event[] }) {
  const [showAddNewEvent, setShowAddNewEvent] = useState(false);
  const [eventsState, setEventsState] = useState<Event[]>(events || []);

  // Create a sorted copy of events based on rank.
  const sortedEvents = [...eventsState].sort((a, b) => a.rank - b.rank);

  return (
    <div className="relative flex flex-col w-full min-h-screen mx-auto pt-16">
      {/* List Name - Now in normal flow with bottom margin for spacing */}
      <h1 className="text-6xl text-center mt-2 mb-[75px]">
        {listName}
      </h1>

      {/* Display events if available */}
      <div className="space-y-5">
        {sortedEvents.length > 0 ? (
          sortedEvents.map((event, index) => (
            <EventCard 
              key={event.id || event.rank} 
              event={{ ...event, overallRank: index + 1 }} 
              showRanking={index === 0}  // Only the first event shows the “Ranking” text.
            />
          ))
        ) : (
          <p className="text-[32px] text-[#676767] italic text-center">
            Off with the emptiness! Add something now!
          </p>
        )}
      </div>

      {/* ADD Button at Bottom Right */}
      <button
        className="fixed bottom-6 right-6 bg-black text-white px-6 py-3 shadow-lg hover:bg-gray-800"
        onClick={() => setShowAddNewEvent(true)}
      >
        ADD
      </button>

      {/* Pop-up Card */}
      {showAddNewEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <AddNewEventPopup 
            id={id}
            onClose={() => setShowAddNewEvent(false)} 
            eventsState={eventsState} 
            setEventsState={setEventsState} 
          />

          {/* Decorative Images */}
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
