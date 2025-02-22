import { UserProfile, RatingList } from "./types";

// GET
/**
 * Gets list of user info
 */
export async function getUserProfile();

/**
 * get list of rating lists
 */
export async function getListCollection();

/**
 * get items for a specific rating list
 */
export async function getRatingList(ratingListId: number);

// POST

/**
 * creates a new item for a list
 */
export async function createItem(name: string, description: string, listType: RatingList, image: string, rank: string);

/**
 * creates a rating list
 */
export async function createRatingList(name: string);

// PATCH

/**
 * Updates a user profile
 */
export async function updateUserProfile(userProfile: UserProfile);

// DELETE

/**
 * Delete 
 */
export async function deleteItem(itemName: string, listId: number);