
import Card from "@/app/ui/collections/card";

interface ListParams {
    params: {
      id: string;
    };
  }
  

export default async function List({ params }: ListParams) {
  const { id }= await params;
  return (
    <div> 
        <Card id={id} />
    </div>
  )
}