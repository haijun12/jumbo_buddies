export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center text-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/pictures/homeBackground.png')" }}
    >
      <h1 className="text-8xl font-alice-bold text-white mb-4">
        DOWN THE RABBIT HOLE
      </h1>
      <p className="text-3xl text-white mb-6">
        Rate Everything & Anything that You've Ever Done, Eaten, Seen, Read, etc.
      </p>
      <button className="bg-black text-white px-6 py-3 rounded">
        START
      </button>
    </div>
  );
}
