import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-row h-full w-full">
      <div className="bg-blue-500 w-3/5 h-screen" > 
        Task screen
      </div>
      <div className="bg-red-500 h-screen w-2/5">
        Game screen
      </div>
    </div>
  );
}
