"use client";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import { Play } from 'lucide-react';
import { createRatingList } from '@/app/lib/api';
import { useRouter } from "next/navigation";


export default function Create() {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);
  const [name, setName] = useState("Name the list");

  const handleFocus = () => {
    if (name === "Name the list") {
      setName("");
    }
  };

  const handleOnNext = async () => {
    router.push("/lists");
    await createRatingList(name);
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col justify-center items-center h-screen">
        <button 
            className={`text-white font-bold my-4 p-4 ${isClicked ? "bg-gray-500" : "bg-black"}`} 
            onClick={() => setIsClicked(!isClicked)} 
        >
            CREATE LIST
        </button>
        {isClicked && (
          <div className="flex flex-row items-center gap-4">
            <TextField
              id="outlined-text-input"
              placeholder="Name the list"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={handleFocus}
              className="w-64"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 0,  // Removes rounding
                },
              }}
            />
            <button onClick={handleOnNext} className="my-3.5 p-3.5 bg-black text-white">
              <Play className="fill-white" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
