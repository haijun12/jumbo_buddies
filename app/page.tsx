import Link from "next/link"

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center text-center bg-cover bg-center bg-no-repeat w-full"
      style={{ backgroundImage: "url('/pictures/homeBackground.png')" }}
    >
      <h1 className="text-8xl font-alice font-bold text-white mb-[50px]">
        DOWN THE RABBIT HOLE
      </h1>
      <p className="text-3xl text-white italic mb-[50px]">
        Rate Everything & Anything that You&apos;ve Ever Done, Eaten, Seen, Read, etc.
      </p>
      <Link href="/collections" className="my-[20px] p-[20px] bg-black text-white">
        START
      </Link>
    </div>
  );
}
