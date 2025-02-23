export default function Party() {
    return (
      <div className="w-full min-h-screen flex flex-col">
        <div className="p-4 text-center">
          <h1 className="font-alice text-[75px] font-bold mb-4">
            Whimsical Tea Party
          </h1>
        </div>
  
        {/* Body with a set height, centered content */}
        <div className="h-[600px] flex items-center justify-center p-4 text-center">
          <p className="text-[24px] italic text-[#676767]">
            Invite friends to join the tea party 🫖🍰
            <br />
            (Feature is currently unavailable)
          </p>
        </div>
      </div>
    );
  }
  