"use client";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import { Play } from 'lucide-react';

export default function Create() {
  const [isClicked, setIsClicked] = useState(false);
  const [name, setName] = useState("Name the list");

  const handleFocus = () => {
    if (name === "Name the list") {
      setName("");
    }
  };
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col justify-center items-center h-screen">
        <button 
            className={`hover:bg-blue-700 text-white font-bold rounded my-4 p-4 ${isClicked ? "bg-gray-500" : "bg-black"}`} 
            onClick={() => setIsClicked(!isClicked)} 
        >
            CREATE LIST
        </button>
        {isClicked && 
          <div className="flex flex-row items-center gap-4">
          <TextField
            id="outlined-text-input"
            label="Name the list"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={handleFocus}
            className="w-64"
          />
          <button className="my-4 p-4 bg-black text-white rounded">
            <Play className="fill-white"/>
          </button>
        </div>
        
        }
      </div>
    </div>
  );
}
