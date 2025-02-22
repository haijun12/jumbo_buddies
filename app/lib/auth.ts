"use server";
import { auth } from "@clerk/nextjs/server";

export async function getClerkUserId() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized: User is not logged in.");
  }
  return userId;
}