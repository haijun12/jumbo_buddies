"use client";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import { Play, X } from 'lucide-react';
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
    const id = await createRatingList(name);
    router.push("/lists/" + id);
  }

  return (
    <div className="fixed bottom-[30px] left-1/2 transform -translate-x-1/2">
      {!isClicked ?(
      <button 
            className={`text-white font-bold my-4 p-4 ${isClicked ? "bg-gray-500" : "bg-black"}`} 
            onClick={() => setIsClicked(!isClicked)} 
        >
            CREATE LIST
        </button>
      ) : (
      <div className="flex flex-row items-center gap-4">
        <button onClick={()=> setIsClicked(!isClicked)} className="h-[60px] my-[20px] p-[20px] bg-black text-white">
          <X className="fill-white" />
        </button>
        <TextField
          placeholder="Name the list"
          value={name} 
          onChange={(e) => setName(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 0,
              height: '60px',
              width: '400px',
              fontStyle: 'italic',
            },
          }}
        />

        <button onClick={handleOnNext} className="h-[60px] my-[20px] p-[20px] bg-black text-white">
          <Play className="fill-white" />
        </button>
      </div>
      )}
    </div>

  );
}
