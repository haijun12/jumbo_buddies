import { updateUserDetails } from "@/app/lib/db_functions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, age } = await req.json();
    await updateUserDetails(firstName, lastName, age);
    return NextResponse.json({ message: "User details updated successfully." });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
