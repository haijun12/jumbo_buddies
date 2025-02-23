"use client";
import { createUserList } from "@/app/lib/db_functions";
import { TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CreateButton() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleOnNext = async () => {
    // Prevent creation if the name is empty or just whitespace
    if (!name.trim()) {
      setError("List name is required.");
      return;
    }
    const id = await createUserList(name);
    console.log("Created list with id and name: ", id, name);
    router.push("/collections/" + id);
  };

  return (
    <div className="fixed bottom-[30px] left-1/2 transform -translate-x-1/2">
      <div className="flex flex-row items-center gap-4">
        <TextField
          placeholder="Name the list"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          error={Boolean(error)}
          helperText={error}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 0,
              height: "60px",
              width: "400px",
              fontStyle: "italic",
            },
          }}
          required
        />

        <button
          onClick={handleOnNext}
          className="h-[60px] my-[20px] p-[20px] bg-black text-white"
        >
          CREATE
        </button>
      </div>
    </div>
  );
}
