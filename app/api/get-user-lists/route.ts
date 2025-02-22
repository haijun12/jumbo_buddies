import { getUserListsWithItemCount } from "@/app/lib/db_functions";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const lists = await getUserListsWithItemCount();
    return NextResponse.json(lists);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
