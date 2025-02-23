import { NextResponse } from "next/server";
import { sql } from "@/app/lib/db_functions";
import { getClerkUserId } from "@/app/lib/auth";

export async function DELETE(req: Request) {
  try {
    const userId = await getClerkUserId();
    const { listId } = await req.json();

    // Validate that the user owns this list
    const listOwner = await sql`
      SELECT user_id FROM Users.Lists WHERE id = ${listId};
    `;
    if (listOwner.length === 0 || listOwner[0].user_id !== userId) {
      throw new Error("Unauthorized: You do not own this list.");
    }

    // Delete the list. (Items are removed automatically via ON DELETE CASCADE)
    await sql`
      DELETE FROM Users.Lists WHERE id = ${listId};
    `;

    return NextResponse.json({ message: "List deleted successfully." });
  } catch (error) {
    console.error("Error deleting list:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
