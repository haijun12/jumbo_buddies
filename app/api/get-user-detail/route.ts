import { getUserDetails } from "@/app/lib/db_functions";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userProfile = await getUserDetails();
    return NextResponse.json(userProfile);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
