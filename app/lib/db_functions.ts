"use server";
import { neon } from '@neondatabase/serverless';
import { getClerkUserId } from "./auth";
import {GetUserCollectionResponse, ListCollectionItem, RatingList} from "./types";
import { Event } from "./types";
import { revalidatePath } from 'next/cache';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not set.");
}
export const sql = neon(process.env.DATABASE_URL as string);

// get user first/last name and age
export async function getUserDetails() {
    try {
    await ensureTables();
      const userId = await getClerkUserId();
  
      // Fetch the user's details
      const userProfile = await sql`
        SELECT first_name, last_name, age 
        FROM Users.User 
        WHERE id = ${userId};
      `;
  
      // If no user found, return null
      if (userProfile.length === 0) {
        return { userProfile: null };
      }
  
      return { userProfile: userProfile[0] };
    } catch (error) {
      console.error("Error getting user profile:", error);
      throw error;
    }
  }

// Add row to Usertable (first time login)
export async function createUser() {
  try {
      await ensureTables();
      const userId = await getClerkUserId();

      // Insert user if not exists
      await sql`
          INSERT INTO Users.User (id)
          VALUES (${userId})
          ON CONFLICT (id) DO NOTHING;
      `;
  } catch (error) {
      console.error("Error adding user:", error);
      throw error;
  }
}
// Does user exist? If so, list their lists and the number of items in that list.
export async function getUserListsWithItemCount(): Promise<GetUserCollectionResponse> {
    try { 
      // Step 1: Check if the user exists
      await ensureTables();
      await validateUserExists();

      const userId = await getClerkUserId();
  
      // Step 2: Fetch the user's lists along with item counts
      const userLists = await sql`
        SELECT 
          l.id AS list_id, 
          l.name AS list_name,
          COUNT(r.id) AS item_count
        FROM Users.Lists l
        LEFT JOIN Users.rating_item r ON l.id = r.list_id
        WHERE l.user_id = ${userId}
        GROUP BY l.id
        ORDER BY l.create_date DESC;
      `;
  
      return { exists: true, lists: userLists as ListCollectionItem[] };
    } catch (error) {
      console.error("Error fetching user lists:", error);
      throw error;
    }
  }
  interface EventsInListReturn {
    listName: string;
    events: Event[];
}

// If someone clicks a list, show the contents of that list
export async function getEventsInList(listId: number) : Promise<EventsInListReturn>{
    try {  
      // Step 1: Ensure the user owns the list
      await ensureTables();
      await validateListOwner(listId);
      // Step 2: Fetch the list name
      const listName = await sql`
        SELECT name
        FROM Users.Lists
        WHERE id = ${listId};
      `;
      // Step 3: Fetch the events sorted by type (Good -> Ok -> Bad), then by rank
      const rawEvents = await sql`
        SELECT id, name, description, image, rank, type
        FROM Users.rating_item
        WHERE list_id = ${listId}
        ORDER BY 
          CASE 
            WHEN type = 'Good' THEN 1 
            WHEN type = 'Ok' THEN 2 
            WHEN type = 'Bad' THEN 3 
          END,
          rank ASC;
      `;

      // Type assertion to ensure the SQL results match our Event type
      const events = rawEvents as unknown as Event[];
      
      return { listName: listName[0].name, events };
    } catch (error) {
      console.error("Error fetching events in list:", error);
      throw error;
    }
  }

// Update user
export async function updateUserDetails(username: string, firstName: string, lastName: string, age: number) {
    try {
        await ensureTables();
      // Ensure the user exists before updating
      await validateUserExists();

      const userId = await getClerkUserId();
  
      // Update user details
      await sql`
        UPDATE Users.User
        SET username = ${username}, first_name = ${firstName}, last_name = ${lastName}, age = ${age}
        WHERE id = ${userId};
      `;
  
      return { message: "User details updated successfully." };
    } catch (error) {
      console.error("Error updating user details:", error);
      throw error;
    }
  }

// Add row to UserListTable (user provides only the name)
export async function createUserList(listName: string) {
  try {
    await ensureTables();
      const userId = await getClerkUserId();

      const createUserListResult = await sql`
          INSERT INTO Users.Lists (name, create_date, update_date, user_id)
          VALUES (${listName}, NOW(), NOW(), ${userId})
          RETURNING id;
      `;
      return createUserListResult[0].id;
  } catch (error) {
      console.error("Error creating list:", error);
      throw error;
  }
}

// Add row to UserRatingItemTable (user provides which list, ])
// we receive ['apple', 'ok', 7]
export async function addRankedEvent(
    listId: number,
    eventName: string,
    description: string,
    image: string,
    type: string,
    rank: number
  ) {
    try {
      console.log("Adding ranked event")
      // Ensure the user owns the list
      await ensureTables();  
      await validateListOwner(listId);
  
      const insertRank = rank; // The position determined by frontend pairwise comparison
  
      // Step 2: Shift ranks of existing items to maintain order
      await sql`
        UPDATE Users.rating_item
        SET rank = rank + 1
        WHERE list_id = ${listId} AND type = ${type} AND rank >= ${insertRank};
      `;
  
      // Step 3: Insert the new event at its determined rank
      await sql`
        INSERT INTO Users.rating_item (name, description, image, rank, type, list_id)
        VALUES (${eventName}, ${description}, ${image}, ${insertRank}, ${type}, ${listId});
      `;
  
      revalidatePath('/collections/' + listId);
    } catch (error) {
      console.error("Error adding ranked event:", error);
      throw error;
    }
  }

// VALIDATION
async function validateListOwner(listId: number) {
    const userId = await getClerkUserId();

      // Check if the user owns the list
      const listOwner = await sql`
          SELECT user_id FROM Users.Lists WHERE id = ${listId};
      `;

      if (listOwner.length === 0 || listOwner[0].user_id !== userId) {
          throw new Error("Unauthorized: You do not own this list.");
      }
}

async function validateUserExists() {
    const userId = await getClerkUserId();
    const userExists = await sql`
    SELECT id FROM Users.User WHERE id = ${userId};
  `;

  if (userExists.length === 0) {
    throw new Error("User does not exist.");
  }
}

async function ensureTables() {
  try {
      // Create schema first
      await sql`CREATE SCHEMA IF NOT EXISTS Users`;
      
      // Create User table
      await sql`
          CREATE TABLE IF NOT EXISTS Users.User (
              id TEXT PRIMARY KEY,
              username TEXT,
              first_name TEXT,
              last_name TEXT,
              age INTEGER
          )
      `;
      
      // Create Lists table after User table
      await sql`
          CREATE TABLE IF NOT EXISTS Users.Lists (
              id SERIAL PRIMARY KEY,
              name TEXT NOT NULL,
              create_date DATE NOT NULL,
              update_date DATE NOT NULL,
              user_id TEXT REFERENCES Users.User(id) ON DELETE CASCADE NOT NULL
          )
      `;
      
      // Create rating_item table after Lists table
      await sql`
          CREATE TABLE IF NOT EXISTS Users.rating_item (
              id SERIAL PRIMARY KEY,
              name TEXT NOT NULL,
              description TEXT,
              image TEXT,
              rank INTEGER NOT NULL,
              type TEXT NOT NULL,
              list_id INTEGER REFERENCES Users.Lists(id) ON DELETE CASCADE NOT NULL
          )
      `;
  } catch (error) {
      console.error("Error creating database tables:", error);
      throw error;
  }
}