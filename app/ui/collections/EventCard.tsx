"use client";
import Image from "next/image";

interface EventCardProps {
  event: { name: string; rank: number; description: string; overallRank?: number };
  showRanking?: boolean;
  onDelete?: () => void; // optional callback for delete
}

export default function EventCard({ event, showRanking = false, onDelete }: EventCardProps) {
  return (
    // Parent container (no border here)
    <div className="flex items-center w-[800px] h-[140px] mx-auto mb-5">
      
      {/* Left Side - Image & Optional "Ranking" Label */}
      <div className="relative w-[100px] h-[100px] mr-4 flex-shrink-0">
        {showRanking && (
          <div 
            className="absolute -top-[65px] left-2 text-[24px]"
          >
            Ranking
          </div>
        )}
        <Image
          src="/pictures/blank_card.png"
          alt="Event Image"
          width={100}
          height={100}
          className="object-contain"
        />
        <div className="absolute top-[44%] left-[68%] transform -translate-x-1/2 -translate-y-1/2 text-black text-[20px] font-bold">
          {event.overallRank}
        </div>
      </div>

      {/* Right Side - Text + "X" in its own bordered container */}
      <div className="relative flex flex-col w-full border border-black p-6 pr-12">
        <h2 className="text-4xl font-normal mb-2">
          {event.name}
        </h2>
        <p className="text-2xl font-normal">
          {event.description}
        </p>

        {/* Red "X" Delete Button, Absolutely Positioned within the bordered container */}
        <button
          className="absolute right-6 top-1/2 transform -translate-y-1/2 text-red-600 text-2xl"
          onClick={() => onDelete && onDelete()}
        >
          X
        </button>
      </div>
    </div>
  );
}
