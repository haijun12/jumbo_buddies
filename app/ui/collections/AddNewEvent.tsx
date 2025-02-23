import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Check } from "lucide-react";
import { Event } from "@/app/lib/types";
import { addRankedEvent } from "@/app/lib/db_functions";

type AddNewEventPopupProps = {
  id: number;
  onClose: () => void;
  eventsState: Event[];
};

const useBinarySearch = (length: number) => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(length);
  const [mid, setMid] = useState(Math.floor(length / 2));
  // 
  const handleUpdateLeft = () => {
    const newLeft = mid - 1;
    const newMid = Math.floor((newLeft + right) / 2);
    console.log("Update left", newLeft, newMid)
    setLeft(newLeft);
    setMid(newMid);
    const endSearch = length > 0 && (right <= newLeft);
    return endSearch;
  };
  // 
  const handleUpdateRight = () => {
    const newRight = mid + 1;
    const newMid = Math.floor((left + newRight) / 2);
    setRight(newRight);
    setMid(newMid);
    const endSearch = length > 0 && (newRight <= left);
    return endSearch;
  };
  const endSearch = length > 0 && (right <= left)
  console.log("NEW MID: " + mid);
  return { handleUpdateLeft, handleUpdateRight, endSearch, mid };
};


export default function AddNewEventPopup({
  id,
  onClose,
  eventsState,
}: AddNewEventPopupProps) {
  const [rating, setRating] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showSubmit, setShowSubmit] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const { handleUpdateLeft, handleUpdateRight, endSearch, mid} = useBinarySearch(eventsState.length);
  console.log("Submit button is" + showSubmit)
  console.log("mid is" + mid)
  console.log("Show options2 is" + endSearch)
  const handleOnNext = () => {
    if (eventsState.length === 0) {
      setShowSubmit(true);
    } else {
      setShowOptions(true);
    }
  };

  const handleFirstSubmit = async () => {
    onClose();
    await handleSubmitEvent();
  };

  const handleSubmitEvent = async () => {
    const newRank = mid + 1;
    await addRankedEvent(id, name, description, "", rating, newRank);
  };

  const handleLeftClick = async () => {
    const endSearch = handleUpdateLeft();
    console.log(" LEFT SHOW OPTIONS2" + endSearch)
    if(endSearch) {
      await handleSubmitEvent();
      onClose();
    }
  };

  const handleRightClick = async () => {
    const endSearch = handleUpdateRight();
    console.log("RIGHT SHOW OPTIONS2" + endSearch)
    if(endSearch) {
      await handleSubmitEvent();
      onClose();
    }
  };

  return (
    <div className="relative w-full max-w-lg border border-black p-8 bg-white">
      {/* Close (X) button */}
      <button
        className="absolute top-4 right-4 text-2xl text-black"
        onClick={onClose}
      >
        &times;
      </button>

      {/* Title */}
      <h2 className="text-center text-3xl text-gray-700 mb-6">
        <TextField
          id="standard-basic"
          label="Event name"
          variant="standard"
          placeholder="Name the event"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{
            width: "300px",
            "& .MuiInputBase-input": {
              textAlign: "center",
            },
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
      <div
        className="flex items-end space-x-8 mb-8 justify-center"
        onClick={handleOnNext}
      >
        <RatingButton
          value="Good"
          label="Amazing"
          selected={rating === "Good"}
          onClick={setRating}
          color="black"
        />
        <RatingButton
          value="Ok"
          label="Ok"
          selected={rating === "Ok"}
          onClick={setRating}
          color="yellow-400"
        />
        <RatingButton
          value="Bad"
          label="Horrible"
          selected={rating === "Bad"}
          onClick={setRating}
          color="#D05858"
        />
      </div>
      {showOptions && !endSearch && ( // add another variable here pass in upper or lower
        <>
          <p className="text-black mb-3">Which one is better? Choose wisely!</p>
          <div className="flex space-x-4 mb-8 justify-center">
            <button
              className="w-[200px] text-black h-[150px] border border-black flex items-center justify-center"
              onClick={handleLeftClick}
            >
              {name}
            </button>
            <button
              className="w-[200px] text-black h-[150px] border border-black flex items-center justify-center"
              onClick={handleRightClick}
            >
              {eventsState[mid]?.name}
            </button>
          </div>
        </>
      )}

      {/* Submit or End Voting */}
      {showSubmit ? (
        <div className="flex flex-row items-center justify-center gap-4">
          <div className="text-black italic text-center">
            No nonsense here—let&apos;s get started!
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

/** Rating Button Component */
const RatingButton = ({
  value,
  label,
  selected,
  onClick,
  color,
}: {
  value: string;
  label: string;
  selected: boolean;
  onClick: (value: string) => void;
  color?: string;
}) => {
  const isHexColor = color?.startsWith("#");

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => onClick(value)}
        className={`w-10 h-10 flex items-center justify-center cursor-pointer ${
          isHexColor ? "" : `bg-${color}`
        }`}
        style={isHexColor ? { backgroundColor: color } : {}}
      >
        {selected && <Check className="text-white" />}
      </button>
      <span className="mt-2 text-black text-sm">{label}</span>
    </div>
  );
};

