"use client";

import { ListCollectionItem } from "@/app/lib/types";
import { useRouter } from "next/navigation";

interface ListRowProps {
  item: ListCollectionItem;
}

export default function CollectionListRow({ item }: ListRowProps) {
  
  const router = useRouter();

  const handleOnClick = () => {
    router.push("/collections/" + item.list_id);
  }

  return (
    <button onClick={handleOnClick} className="w-full h-full py-4 px-[42px] border-[2px] border-black">
      <div className="flex flex-row items-center justify-between">
        <p className="italic text-[36px]">{item.list_name}</p>
        <div className="flex flex-col gap-[5px] items-center">
          <img
            className="w-[50px] h-[50px]"
            src="/pictures/playing-cards.png"
            alt="Mad Hatter"
          />
          <p className="text-[24px]">{item.item_count} items</p>
        </div>
      </div>
    </button>
  );
}
