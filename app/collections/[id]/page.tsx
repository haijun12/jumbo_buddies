import Card from "@/app/ui/collections/card";
import { getEventsInList } from "@/app/lib/db_functions";
import { redirect } from "next/navigation";

interface ListParams {
  params: {
    id: string;
  };
}

export default async function List({ params }: ListParams) {
  const { id } = await params;
  
  try {
    const { listName, events } = await getEventsInList(parseInt(id));
    return (
      <div className="w-full">
        <Card listName={listName} events={events} />
      </div>
    );
  } catch (error) {
    console.error(error);
    redirect("/");
  }
}
