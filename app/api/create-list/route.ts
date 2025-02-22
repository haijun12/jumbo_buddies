import { createUserList } from "@/app/lib/db_functions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { listName } = await req.json();
    await createUserList(listName);
    return NextResponse.json({ message: "List created successfully" });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
