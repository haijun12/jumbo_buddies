import ListRow from "./ListRow";

export default function CollectionList() {
  return (
    <div className="flex flex-col w-full h-full items-center gap-[30px]">
      <h1 className="font-normal text-[75px]">Collection of Lists</h1>
      <div className="flex w-full flex-col gap-5">
        {Array.from({ length: 5 }, (_, key) => (
          <ListRow key={key} title="Things I've watched" itemCount={25} />
        ))}
      </div>
    </div>
  );
}
