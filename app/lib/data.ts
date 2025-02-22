"use server";
import { neon } from '@neondatabase/serverless';
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not set.");
}
export const sql = neon(process.env.DATABASE_URL as string);

export async function getData() {
    const response = await sql`SELECT version()`;
    console.log(response);
    return response[0].version;
}