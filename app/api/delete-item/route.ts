import { NextResponse } from "next/server";
import { sql } from "@/app/lib/db_functions";
import { getClerkUserId } from "@/app/lib/auth";

export async function DELETE(req: Request) {
  try {
    const userId = await getClerkUserId();
    const { itemName, listId } = await req.json();

    // Validate ownership
    const listOwner = await sql`
      SELECT user_id FROM Users.Lists WHERE id = ${listId};
    `;

    if (listOwner.length === 0 || listOwner[0].user_id !== userId) {
      throw new Error("Unauthorized: You do not own this list.");
    }

    // Delete item
    await sql`
    DELETE FROM Users.rating_item WHERE name = ${itemName} AND list_id = ${listId};
    `;


    return NextResponse.json({ message: "Item deleted successfully." });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
