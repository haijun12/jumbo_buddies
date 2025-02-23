"use client";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import { createUserList } from "../lib/db_functions";
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
    const id = await createUserList(name);
    console.log("Created list with id and name: ", id, name);
    router.push("/collections/" + id);
  }

  return (
    
    <div className="w-full min-h-screen flex flex-col">
      <div className="p-4 text-center">
        <h1 className="font-alice text-[75px] font-bold mb-4">
          Collection of Lists
        </h1>
      </div>
      <div className="fixed bottom-[30px] left-1/2 transform -translate-x-1/2">
        <div className="flex flex-row items-center gap-4">
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

          <button className="h-[60px] my-[20px] p-[20px] bg-black text-white">
            CREATE
          </button>
        </div>
      </div>
    </div>

  );
}
