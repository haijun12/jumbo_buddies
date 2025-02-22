"use server";
import { neon } from '@neondatabase/serverless';
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