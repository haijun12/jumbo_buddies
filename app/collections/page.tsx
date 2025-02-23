"use client";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import { createRatingList } from '@/app/lib/api';
import { useRouter } from "next/navigation";


export default function Create() {
  const router = useRouter();
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
      <div className="flex flex-row items-center gap-4">
        <TextField
          placeholder="Name the list"
          value={name} 
          onChange={(e) => setName(e.target.value)}
          onFocus={handleFocus}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 0,
              height: '60px',
              width: '400px',
              fontStyle: 'italic',
            },
          }}
        />

        <button onClick = {handleOnNext} className="h-[60px] my-[20px] p-[20px] bg-black text-white">
          CREATE
        </button>
      </div>
    </div>

  );
}
