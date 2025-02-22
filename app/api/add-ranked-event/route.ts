import { addRankedEvent } from "@/app/lib/db_functions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { listId, eventName, description, image, type, rank } = await req.json();
    await addRankedEvent(listId, eventName, description, image, type, rank);
    return NextResponse.json({ message: "Event added successfully" });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
