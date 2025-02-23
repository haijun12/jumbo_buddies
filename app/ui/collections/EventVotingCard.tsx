import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Check } from 'lucide-react';

type EventVotingCardProps = {
  onClose: () => void;
};

export default function EventVotingCard({ onClose }: EventVotingCardProps) {
  // Track which rating square is selected
  const [rating, setRating] = useState("")
  const [name, setName] = useState("Name of the event");
  const handleFocus = () => {
    if (name === "Name of the event") {
      setName("");
    }
  };

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
      <h2 className="text-center text-3xl text-gray-700 mb-6">
      <TextField
        id="standard-basic"
        label="Event name"
        variant="standard"
        placeholder="Name the event"
        value={name}
        onFocus={handleFocus}
        onChange={(e) => setName(e.target.value)}
        sx={{
          width: '300px', // Adjust the width as needed
          '& .MuiInputBase-input': {
            textAlign: 'center'
          }
        }}
      />

      </h2>

      {/* Description field */}
      <textarea
        className="w-full h-20 border text-black border-black p-2 mb-6"
        placeholder="Description of event"
      />

      {/* “What did you think?” */}
      <p className="text-black mb-3">What did you think?</p>
      <div className="flex items-end space-x-8 mb-8 justify-center">
        <RatingButton value="amazing" label="Amazing" selected={rating === "amazing"} onClick={setRating} color="black" />
        <RatingButton value="ok" label="Ok" selected={rating === "ok"} onClick={setRating} color="yellow-400" />
        <RatingButton value="horrible" label="Horrible" selected={rating === "horrible"} onClick={setRating} color="red-500" />
      </div>

      {/* “This way or that way? Choose wisely!” */}
      <p className="text-black mb-3">This way or that way? Choose wisely!</p>
      <div className="flex space-x-4 mb-8 justify-center">
        <button className="w-[200px] text-black h-[150px] border border-black flex items-center justify-center">
          Option 1
        </button>
        <button className="w-[200px] text-black h-[150px] border border-black flex items-center justify-center">
          Option 2
        </button>
      </div>

      {/* Bottom Buttons */}
      <div className="flex flex-row items-center justify-center gap-4">
        <div className="text-black italic text-center">
          No verdict yet? Hop to the next!
        </div>
        <button className="bg-black text-white px-4 py-2" onClick={onClose}>
          Bored? End voting.
        </button>
      </div> 
    </div>
  );
}

const RatingButton = ({ value, label, selected, onClick, color }: { value: string, label: string, selected: boolean, onClick: (value: string) => void, color?: string }) => {
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => onClick(value)}
        className={`
          w-10 h-10 bg-${color} cursor-pointer
          flex items-center justify-center
        `}
      >
        {selected && <Check className="text-white" />}
      </button>
      <span className="mt-2 text-black text-sm">{label}</span>
    </div>
  );
};