import Link from "next/link"

export default function Home() {
  return (
    <div
      className="flex items-center justify-center w-full min-h-screen"
      style={{ backgroundColor: "#7B1F1F" }} // Maroon background
    >
      {/* Scroll container (relative) */}
      <div className="relative">
        {/* The scroll image */}
        <img
          src="/pictures/scroll 1.png"
          alt="Scroll"
          className="block w-auto max-w-full"
        />

        {/* Heading (absolute, near the top) */}
        <div className="absolute top-[20%] w-full text-center left-1/2 -translate-x-1/2">
          <h1 className="text-6xl font-alice text-black mb-[50px]">DOWN THE</h1>

        </div>

        <div className="absolute top-[22%] left-[74%] w-full text-center left-1/2 -translate-x-1/2">
          <img
            src="/pictures/Rabbit.png"
            alt="Rabbit"
            className="block w-auto max-w-full"
          />
        </div>

        <div className="absolute top-[35%] left-[94%] w-full text-center left-1/2 -translate-x-1/2">
          <img
            src="/pictures/Hole.png"
            alt="Hole"
            className="block w-auto max-w-full"
          />
        </div>

        {/* Subheading (absolute, a bit lower) */}
        <div className="absolute top-[57%] w-full text-center left-1/2 -translate-x-1/2 px-4">
          <p className="text-lg italic">
            Are you ready to rate everything & anything that <br/>you&apos;ve ever done, 
            eaten, seen, read, and more?
          </p>
        </div>

        {/* START Button (absolute, near bottom to align with wax seal) */}
        <div className="absolute bottom-[25%] w-full text-center left-1/2 -translate-x-1/2">
          <Link href="/collections" className="bg-black text-white px-11 py-7 rounded text-2xl">
            START
          </Link>
        </div>
      </div>
    </div>
  );
}
