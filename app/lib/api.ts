import { UserProfile, RatingList } from "./types";

/**
 * Gets user profile (first name, last name, age).
 */
export async function getUserProfile(): Promise<UserProfile | null> {
  const response = await fetch("/api/get-user-details");
  const data = await response.json();
  return data.userProfile;
}

/**
 * Gets list of rating lists for a user with item count.
 */
export async function getListCollection(): Promise<{ listId: number; listName: string; itemCount: number }[]> {
  const response = await fetch("/api/get-user-lists");
  const data = await response.json();
  return data.exists ? data.lists : [];
}

/**
 * Gets all items in a specific rating list.
 * @param ratingListId The ID of the rating list.
 */
export async function getRatingList(ratingListId: number): Promise<RatingList | null> {
  const response = await fetch("/api/get-events-in-list", {
    method: "POST",
    body: JSON.stringify({ listId: ratingListId }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();
  return data.events || null;
}


// POST

/**
 * Creates a new item in a specific rating list.
 * @param name Name of the item.
 * @param description Description of the item.
 * @param listType "Good", "Ok", or "Bad".
 * @param image Image URL for the item.
 * @param rank Rank within the category.
 */
export async function createItem(
    name: string,
    description: string,
    listType: "Good" | "Ok" | "Bad",
    image: string,
    rank: number,
    listId: number
  ): Promise<void> {
    await fetch("/api/add-ranked-event", {
      method: "POST",
      body: JSON.stringify({ eventName: name, description, image, type: listType, rank, listId }),
      headers: { "Content-Type": "application/json" },
    });
  }
  
  /**
   * Creates a new rating list.
   * @param name Name of the new list.
   */
  export async function createRatingList(name: string): Promise<void> {
    await fetch("/api/create-list", {
      method: "POST",
      body: JSON.stringify({ listName: name }),
      headers: { "Content-Type": "application/json" },
    });
  }
  

// PATCH

/**
 * Updates a user's profile (first name, last name, age).
 * @param userProfile The updated user profile data.
 */
export async function updateUserProfile(userProfile: UserProfile): Promise<void> {
    await fetch("/api/update-user", {
      method: "POST",
      body: JSON.stringify(userProfile),
      headers: { "Content-Type": "application/json" },
    });
  }
  

// DELETE

/**
 * Deletes an item from a rating list.
 * @param itemName The name of the item to delete.
 * @param listId The ID of the list it belongs to.
 */
export async function deleteItem(itemName: string, listId: number): Promise<void> {
    await fetch("/api/delete-item", {
      method: "DELETE",
      body: JSON.stringify({ itemName, listId }),
      headers: { "Content-Type": "application/json" },
    });
  }
  