"use server";
import { neon } from '@neondatabase/serverless';
import { getClerkUserId } from "./auth";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not set.");
}
export const sql = neon(process.env.DATABASE_URL as string);

// TEST FUNCTION
export async function getData() {
    const response = await sql`SELECT version()`;
    console.log(response);
    return response[0].version;
}

// Add row to Usertable (first time login)
export async function createUser() {
  try {
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
export async function getUserListsWithItemCount() {
    try {
      const userId = await getClerkUserId();
  
      // Step 1: Check if the user exists
      const userExists = await sql`
        SELECT id FROM Users.User WHERE id = ${userId};
      `;
  
      if (userExists.length === 0) {
        return { exists: false, lists: [] }; // User not found
      }
  
      // Step 2: Fetch the user's lists along with item counts
      const userLists = await sql`
        SELECT 
          l.id AS list_id, 
          l.name AS list_name,
          COUNT(r.id) AS item_count
        FROM Users.Lists l
        LEFT JOIN Users.rating_item r ON l.id = r.list
        WHERE l.user_id = ${userId}
        GROUP BY l.id
        ORDER BY l.create_date DESC;
      `;
  
      return { exists: true, lists: userLists };
    } catch (error) {
      console.error("Error fetching user lists:", error);
      throw error;
    }
  }

// If someone clicks a list, show the contents of that list
export async function getEventsInList(listId: number) {
    try {
      const userId = await getClerkUserId();
  
      // Step 1: Ensure the user owns the list
      const listOwner = await sql`
        SELECT user_id FROM Users.Lists WHERE id = ${listId};
      `;
  
      if (listOwner.length === 0 || listOwner[0].user_id !== userId) {
        throw new Error("Unauthorized: You do not own this list.");
      }
  
      // Step 2: Fetch the events sorted by type (Good -> Ok -> Bad), then by rank
      const events = await sql`
        SELECT id, name, description, image, rank, type
        FROM Users.rating_item
        WHERE list = ${listId}
        ORDER BY 
          CASE 
            WHEN type = 'Good' THEN 1 
            WHEN type = 'Ok' THEN 2 
            WHEN type = 'Bad' THEN 3 
          END,
          rank ASC;
      `;
  
      return events;
    } catch (error) {
      console.error("Error fetching events in list:", error);
      throw error;
    }
  }

// Update user


// Add row to UserListTable (user provides only the name)
export async function createUserList(listName: string) {
  try {
      const userId = await getClerkUserId();

      await sql`
          INSERT INTO Users.Lists (name, create_date, update_date, user_id)
          VALUES (${listName}, NOW(), NOW(), ${userId});
      `;
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
    type: "Bad" | "Ok" | "Good",
    rank: number
  ) {
    try {
      const userId = await getClerkUserId();
  
      // Ensure the user owns the list
      const listOwner = await sql`
        SELECT user_id FROM Users.Lists WHERE id = ${listId};
      `;
  
      if (listOwner.length === 0 || listOwner[0].user_id !== userId) {
        throw new Error("Unauthorized: You do not own this list.");
      }
  
      // Step 1: Find where the event should be inserted
      const items = await sql`
        SELECT id, name, rank FROM Users.rating_item 
        WHERE list = ${listId} AND type = ${type} 
        ORDER BY rank ASC;
      `;
  
      let insertRank = rank; // The position determined by frontend pairwise comparison
  
      // Step 2: Shift ranks of existing items to maintain order
      await sql`
        UPDATE Users.rating_item
        SET rank = rank + 1
        WHERE list = ${listId} AND type = ${type} AND rank >= ${insertRank};
      `;
  
      // Step 3: Insert the new event at its determined rank
      await sql`
        INSERT INTO Users.rating_item (name, description, image, rank, type, list)
        VALUES (${eventName}, ${description}, ${image}, ${insertRank}, ${type}, ${listId});
      `;
  
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

async function ensureTables() {
    try {
        const createUserSchema = sql`CREATE SCHEMA IF NOT EXISTS Users`;
        const createUserTable = sql`
            CREATE TABLE IF NOT EXISTS Users.User (
            id SERIAL PRIMARY KEY
        )
        `
        const createUserListTable = sql`
            CREATE TABLE IF NOT EXISTS Users.Lists (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                create_date DATE NOT NULL,
                update_date DATE NOT NULL,
                user_id INTEGER REFERENCES Users.User(id) ON DELETE CASCADE NOT NULL
            )
        `
        const createUserRatingItemTable = sql`
            CREATE TABLE IF NOT EXISTS Users.rating_item (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                description TEXT,
                image TEXT, -- a link to the image db
                rank INTEGER NOT NULL,
                type ENUM('Bad', 'Ok', 'Good') NOT NULL,
                list INTEGER REFERENCES Users.Lists(id) ON DELETE CASCADE NOT NULL
            )
        `;
        await Promise.all([
            createUserSchema,
            createUserTable,
            createUserListTable,
            createUserRatingItemTable,
        ]);
    } catch (error) {
        console.error("Error creating visit database:", error);
        throw error;
    }
}