import { cn } from "@/app/lib/utils";
import CollectionListRow from "./CollectionListRow";
import { GetUserCollectionResponse } from "@/app/lib/types";
import { getUserListsWithItemCount } from "@/app/lib/db_functions";

interface CollectionListProps {
  className?: string;
}

export default async function CollectionList({
  className,
}: CollectionListProps) {

  const { exists, lists }: GetUserCollectionResponse = await getUserListsWithItemCount();

  return (
    <div className={cn("flex flex-col w-full h-full items-center gap-[30px] overflow-y-auto", className)}>
      <div className="flex w-5/6 flex-col gap-5 items-center">
        {(exists ? lists: []).map((item, key) => (
          <CollectionListRow key={key} item={item} />
        ))}
      </div>
    </div>
  );
}