import React, { useState } from "react";

type EventVotingCardProps = {
  onClose: () => void;
};

export default function EventVotingCard({ onClose }: EventVotingCardProps) {
  // Track which rating square is selected
  const [rating, setRating] = useState<"amazing" | "ok" | "horrible" | null>(
    null
  );

  return (
    <div className="relative w-full max-w-lg border border-black p-8 bg-white">
      {/* Close (X) button in the top-right corner */}
      <button
        className="absolute top-4 right-4 text-2xl text-black"
        onClick={onClose}
      >
        &times;
      </button>

      {/* Title (centered) */}
      <h2 className="text-center text-3xl text-gray-700 mb-6">New Event</h2>

      {/* Description field */}
      <textarea
        className="w-full h-20 border text-black border-black p-2 mb-6"
        placeholder="Description of event"
      />

      {/* “What did you think?” */}
      <p className="text-black mb-3">What did you think?</p>
      <div className="flex items-end space-x-8 mb-8 justify-center">
        {/* Amazing */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => setRating("amazing")}
            className={`
              w-10 h-10 bg-black border border-black cursor-pointer
              ${rating === "amazing" ? "ring-2 ring-black" : ""}
            `}
          />
          <span className="mt-2 text-black text-sm">Amazing</span>
        </div>

        {/* Ok */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => setRating("ok")}
            className={`
              w-10 h-10 bg-yellow-400 border border-black cursor-pointer
              ${rating === "ok" ? "ring-2 ring-black" : ""}
            `}
          />
          <span className="mt-2 text-black text-sm">Ok</span>
        </div>

        {/* Horrible */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => setRating("horrible")}
            className={`
              w-10 h-10 bg-red-500 border border-black cursor-pointer
              ${rating === "horrible" ? "ring-2 ring-black" : ""}
            `}
          />
          <span className="mt-2 text-black text-sm">Horrible</span>
        </div>
      </div>

      {/* “This way or that way? Choose wisely!” */}
      <p className="text-black mb-3">This way or that way? Choose wisely!</p>
      <div className="flex space-x-4 mb-8 justify-center">
        <button className="w-24 text-black h-12 border border-black flex items-center justify-center">
          Option 1
        </button>
        <button className="w-24 text-black h-12 border border-black flex items-center justify-center">
          Option 2
        </button>
      </div>

      {/* Bottom Buttons */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
        {/* <button className="bg-black text-white px-4 py-2"> */}
        <div className="text-black">
          No verdict yet? Hop to the next!
          </div>
        {/* </button> */}
        <button className="bg-black text-white px-4 py-2" onClick={onClose}>
          Bored? End voting.
        </button>
      </div>
    </div>
  );
}
