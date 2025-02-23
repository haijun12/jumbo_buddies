import Card from "@/app/ui/collections/card";
import { getEventsInList } from "@/app/lib/db_functions";
import { redirect } from "next/navigation";

export default async function List({ params }: {params: Promise<{ id: string }>}) {
  const { id } = await params;
  
  try {
    const { listName, events } = await getEventsInList(parseInt(id));
    return (
      <div className="w-full">
        <Card id = {parseInt(id)} listName={listName} events={events} />
      </div>
    );
  } catch (error) {
    console.error(error);
    redirect("/");
  }
}
