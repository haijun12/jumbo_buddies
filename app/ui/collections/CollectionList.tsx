import { cn } from "@/app/lib/utils";
import ListRow from "./ListRow";

interface CollectionListProps {
  className?: string;
}

export default function CollectionList({
  className,
}: CollectionListProps) {
  return (
    <div className={cn("flex flex-col w-full h-full items-center gap-[30px]", className)}>
      <h1 className="font-normal text-[75px]">Collection of Lists</h1>
      <div className="flex w-3/4 flex-col gap-5 items-center">
        {Array.from({ length: 5 }, (_, key) => (
          <ListRow key={key} title="Things I've watched" itemCount={25} />
        ))}
      </div>
    </div>
  );
}
