"use client";
import React, { useState } from "react";
import AddNewEventPopup from "./AddNewEvent";
import EventCard from "./EventCard";
import Image from "next/image";
import { useRouter } from "next/navigation"; // For navigation
import { Event } from "@/app/lib/types";
import { deleteItem, deleteList } from "@/app/lib/api"; // import both

export default function Card({ id, listName, events }: { id: number; listName: string; events: Event[] }) {
  const router = useRouter();
  const [showAddNewEvent, setShowAddNewEvent] = useState(false);
  // console.log(events)

  // Create a sorted copy of events based on rank.
  const sortedEvents = [...events].sort((a, b) => a.rank - b.rank);
  console.log(sortedEvents)
  const handleDeleteEvent = async (itemName: string) => {
    try {
      await deleteItem(itemName, id);
    } catch (err) {
      console.error("Failed to delete event:", err);
    }
  };

  // Handler to delete the entire list
  const handleDeleteList = async () => {
    try {
      await deleteList(id);
      // Redirect somewhere, e.g. back to a main "collections" page
      router.push("/collections");
    } catch (err) {
      console.error("Failed to delete list:", err);
    }
  };

  return (
    <div className="relative flex flex-col w-full min-h-screen mx-auto pt-16">
      <h1 className="text-6xl text-center mt-2 mb-[75px]">
        {listName}
      </h1>

      <div className="space-y-5">
        {sortedEvents.length > 0 ? (
          sortedEvents.map((event, index) => (
            <EventCard
              key={event.id || event.rank}
              event={{ ...event, overallRank: index + 1 }}
              showRanking={index === 0}
              onDelete={() => handleDeleteEvent(event.name)}
            />
          ))
        ) : (
          <p className="text-[32px] text-[#676767] italic text-center">
            Off with the emptiness! Add something now!
          </p>
        )}
      </div>

      {/* Bottom Right Buttons */}
      <div className="fixed bottom-6 right-6 flex gap-3">
        {/* DELETE LIST Button */}
        <button
          className="bg-red-500 text-white px-6 py-3 shadow-lg hover:bg-red-600"
          onClick={handleDeleteList}
        >
          DELETE LIST
        </button>

        {/* ADD Button */}
        <button
          className="bg-black text-white px-6 py-3 shadow-lg hover:bg-gray-800"
          onClick={() => setShowAddNewEvent(true)}
        >
          ADD
        </button>
      </div>

      {showAddNewEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <AddNewEventPopup
            id={id}
            onClose={() => setShowAddNewEvent(false)}
            eventsState={sortedEvents}
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
