import { SignUp } from "@clerk/nextjs";

export default function Page() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5 w-full">
      <h1 className="text-3xl font-bold mb-4">Introooduce yourseelf!</h1>
        
        <SignUp />

    </div>
  );
}
