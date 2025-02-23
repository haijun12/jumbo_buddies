"use client";
import Image from "next/image";

interface EventCardProps {
  event: { name: string; rank: number; description: string; overallRank?: number };
  showRanking?: boolean;
}

export default function EventCard({ event, showRanking = false }: EventCardProps) {
  return (
    <div className="flex items-center w-[800px] h-[140px] mx-auto mb-5">
      {/* Left Side - Image with centered overall rank overlay */}
      <div className="relative w-[100px] h-[100px] mr-4 flex-shrink-0">
        {/* Conditionally render "Ranking" for the first event */}
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

      {/* Right Side - Text Container with border */}
      <div className="flex flex-col w-full p-6 border border-black">
        <h2 
          className="text-4xl font-normal mb-2"
          style={{ fontFamily: 'SF Pro Display' }}
        >
          {event.name}
        </h2>
        <p 
          className="text-2xl font-normal"
          style={{ fontFamily: 'SF Pro Display' }}
        >
          {event.description}
        </p>
      </div>
    </div>
  );
}
