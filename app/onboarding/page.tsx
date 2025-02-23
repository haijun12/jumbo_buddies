import { redirect } from "next/navigation";
import { getClerkUserId } from "../lib/auth";
import { createUser } from "../lib/db_functions";
export default async function OnboardPage() {
    const userId  = await getClerkUserId();
  
    // Redirect if user is not authenticated
    if (!userId) {
      redirect("/sign-in");
    }
    await createUser();
    redirect("/collections");
  }