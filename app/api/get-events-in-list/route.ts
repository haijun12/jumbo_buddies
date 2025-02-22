import { getEventsInList } from "@/app/lib/db_functions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { listId } = await req.json();
    const events = await getEventsInList(listId);
    return NextResponse.json({ events });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
