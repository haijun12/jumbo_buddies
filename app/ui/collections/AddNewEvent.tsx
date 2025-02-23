import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Check } from 'lucide-react';
import { Event } from "@/app/lib/types";

type AddNewEventPopupProps = {
  onClose: () => void;
  eventsState: Event[];
  setEventsState: React.Dispatch<React.SetStateAction<Event[]>>;
};
const useBinarySearch = (showOptions, ) => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [mid, setMid] = useState(0);
  const handleOnNext = () => {
    setMid(Math.floor((left + right) / 2));
    
  };
  return { left, right, mid, handleOnNext };
}

export default function AddNewEventPopup({ onClose, eventsState, setEventsState }: AddNewEventPopupProps) {
  const [rating, setRating] = useState("")
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [rank, setRank] = useState(1);
  const handleOnNext = () => {
    if (eventsState.length === 0) { 
      setShowSubmit(true);
      setEventsState([...eventsState, { id: -1, name: name, description: description, image: "", rank: rank, type: rating }]);
    } else {
      setRank(Math.floor(eventsState.length / 2));
      setShowOptions(true);
    }
  }


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
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* “What did you think?” */}
      <p className="text-black mb-3">What did you think?</p>
      <div className="flex items-end space-x-8 mb-8 justify-center" onClick={handleOnNext}>
        <RatingButton value="Good" label="Amazing" selected={rating === "Good"} onClick={setRating} color="black" />
        <RatingButton value="Ok" label="Ok" selected={rating === "Ok"} onClick={setRating} color="yellow-400"/>
        <RatingButton value="Bad" label="Horrible" selected={rating === "Bad"} onClick={setRating} color="red-400"/>
      </div>
      {showOptions && ( // add another variable here pass in upper or lower
        <>
        <p className="text-black mb-3">This way or that way? Choose wisely!</p>
        <div className="flex space-x-4 mb-8 justify-center">
          <button className="w-[200px] text-black h-[150px] border border-black flex items-center justify-center"> 
            {name} 
          </button>
          <button className="w-[200px] text-black h-[150px] border border-black flex items-center justify-center">
            {eventsState[rank].name}
          </button>
        </div>
        </>
      )}

      {/* Bottom Buttons */}
      {showSubmit ? (
        <div className="flex flex-row items-center justify-center gap-4">
          
          <div className="text-black italic text-center">
          No nonsense here—let&apos;s get started!"
          </div>
          <button className="bg-black text-white px-4 py-2" onClick={onClose}>
            Submit
          </button>
        </div> 
      ) : (
        <div className="flex flex-row items-center justify-center gap-4">
        <div className="text-black italic text-center">
          No verdict yet? Hop to the next!
        </div>
        <button className="bg-black text-white px-4 py-2" onClick={onClose}>
          Bored? End voting.
        </button>
      </div> 
      )}
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