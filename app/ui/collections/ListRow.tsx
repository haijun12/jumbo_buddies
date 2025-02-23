interface ListRowProps {
  title: string;
  itemCount: number;
}

export default function ListRow({ title, itemCount }: ListRowProps) {
  return (
    <button className="w-3/4 py-4 px-[42px] border-[2px] border-black">
      <div className="flex flex-row items-center justify-between">
        <p className="italic text-[36px]">{title}</p>
        <div className="flex flex-col gap-[5px] items-center">
          <img
            className="w-[50px] h-[50px]"
            src="/pictures/playing-cards.png"
            alt="Mad Hatter"
          />
          <p className="text-[24px]">{itemCount} items</p>
        </div>
      </div>
    </button>
  );
}
