"use client";
import Image from "next/image";

export default function EventCard({ event }: { event: { name: string; rank: number; description: string } }) {
  return (
    <div className="flex items-center bg-white shadow-md rounded-lg p-4 w-full max-w-lg">
      {/* Left Side - Image with Rank Overlay */}
      <div className="relative w-20 h-20 mr-4">
        {/* Fixed Event Image */}
        <Image
          src="/images/event_placeholder.png" // Change this to your image file path
          alt="Event Image"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
        {/* Rank Overlay */}
        <div className="absolute top-0 left-0 bg-black text-white text-sm font-bold px-2 py-1 rounded-bl-lg">
          #{event.rank}
        </div>
      </div>

      {/* Right Side - Event Details */}
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold">{event.name} #{event.rank}</h2>
        <p className="text-gray-600">{event.description}</p>
      </div>
    </div>
  );
}
