
import Card from "@/app/ui/collections/card";
import { getEventsInList } from "@/app/lib/db_functions";

interface ListParams {
    params: {
      id: string;
    };
  }
  

export default async function List({ params }: ListParams) {
  const { id } = await params;
  const {listName, events } = await getEventsInList(parseInt(id));
  return (
    <div> 
        <Card listName={listName} events={events} />
    </div>
  )
}