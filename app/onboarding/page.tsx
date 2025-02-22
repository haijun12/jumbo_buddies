import { redirect } from "next/navigation";
import { getClerkUserId } from "../lib/auth";
export default async function OnboardPage() {
    const userId  = await getClerkUserId();
  
    // Redirect if user is not authenticated
    if (!userId) {
      redirect("/sign-in");
    }
  
    // Insert the user into your database
    // try {
    //   await addUserToDB(userId);
    // } catch (error) {
    //   console.error("DB error:", error);
    //   // Handle error appropriately, e.g., show an error message or redirect
    // }
  
    return (
      <div>
        <h1>Onboarding</h1>
        <p>Your account is being set up. Please wait... {userId}</p>
      </div>
    );
  }