import React, { useState, useMemo, useEffect } from "react";
import { TextField } from "@mui/material";
import { Check } from 'lucide-react';
import { Event } from "@/app/lib/types";
import { addRankedEvent } from "@/app/lib/db_functions";

type AddNewEventPopupProps = {
  id: number;
  onClose: () => void;
  eventsState: Event[];
  setEventsState: React.Dispatch<React.SetStateAction<Event[]>>;
};
const useBinarySearch = (length: number) => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(length);
  const [mid, setMid] = useState(Math.floor(length / 2));
  const showOptions2 = length > 0 && (right == left || right <= left);

  const handleUpdateLeft = () => {
    setLeft(() => {
      const left = mid + 1;
      setMid(() => Math.floor((left + right) / 2));
      return left
    });
    setMid(() => Math.floor((left + right) / 2));
    return showOptions2;
  }

  const handleUpdateRight = () => {
    setRight(() => {
      const right = mid - 1;
      setMid(() => Math.floor((left + right) / 2));
      return right
    });
    return showOptions2;
    
  }
  console.log(left, right, mid, length, showOptions2)
  return { handleUpdateLeft, handleUpdateRight, showOptions2, mid};
}


export default function AddNewEventPopup({ id,onClose, eventsState, setEventsState }: AddNewEventPopupProps) {
  const [rating, setRating] = useState("")
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showSubmit, setShowSubmit] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const { handleUpdateLeft, handleUpdateRight, showOptions2, mid} = useBinarySearch(eventsState.length);
  console.log(eventsState)
  console.log("Submit button is" + showSubmit)
  console.log("mid is" + mid)
  console.log("Show options2 is" + showOptions2)
  const handleOnNext = () => {
    if (eventsState.length === 0) { 
      setShowSubmit(true);
    } else {
      setShowOptions(true);
    }
  }
  const handleFirstSubmit = async () => {
    onClose();
    setEventsState([...eventsState, { id: -1, name: name, description: description, image: "", rank: 1, type: rating }]);
    console.log("In handle first submit")
    await handleSubmitEvent();
  }

  const handleSubmitEvent = async() => {
    console.log("In use effect and updating state" + mid)
    const newRank = mid + 1;
    setEventsState([...eventsState, { id: -1, name: name, description: description, image: "", rank: newRank, type: rating }]);
    await addRankedEvent(id, name, description, "", rating, newRank);
  }

  const handleLeftClick = async () => {
    const showOptions2 = handleUpdateLeft();
    console.log(" LEFT SHOW OPTIONS2" + showOptions2)
    if(showOptions2) {
      await handleSubmitEvent();
      onClose();
    }
  };

  const handleRightClick = async () => {
    const showOptions2 = handleUpdateRight();
    console.log("RIGHT SHOW OPTIONS2" + showOptions2)
    if(showOptions2) {
      await handleSubmitEvent();
      onClose();
    }
  };

  // useEffect(() => {
  //   if (showOptions2) {
  //     console.log("In use effect and updating state" + mid)
  //     const newRank = mid + 1;
  //     setEventsState([...eventsState, { id: -1, name: name, description: description, image: "", rank: newRank, type: rating }]);

  //     onClose();
  //   }
  // }, [showOptions2])


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
      {showOptions && !showOptions2 && ( // add another variable here pass in upper or lower
        <>
        <p className="text-black mb-3">Which one is better? Choose wisely!</p>
        <div className="flex space-x-4 mb-8 justify-center">
          <button className="w-[200px] text-black h-[150px] border border-black flex items-center justify-center" onClick={handleLeftClick}> 
            {name} 
          </button>
          <button className="w-[200px] text-black h-[150px] border border-black flex items-center justify-center" onClick={handleRightClick}>
            {eventsState[mid].name}
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
          <button className="bg-black text-white px-4 py-2" onClick={handleFirstSubmit}>
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