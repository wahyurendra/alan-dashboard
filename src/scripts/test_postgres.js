// test-connection.ts

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {
  pgTable,
  text,
  numeric,
  integer,
  timestamp,
  pgEnum,
  serial
} from 'drizzle-orm/pg-core';
import { count, eq, ilike } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

// Retrieve the database connection URL from the environment variables.
const DATABASE_URL = "postgres://db_alan:123123@localhost:5432/db_alan";

if (!DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not set.');
  process.exit(1);
}

// Create a Neon client using the provided connection string.
const client = neon(DATABASE_URL);

// Initialize Drizzle ORM with the Neon HTTP adapter.
const db = drizzle(client);

// ---------------------------------------------------------------------
// Optional: Define a sample table schema for demonstration purposes.
// You can use these definitions when building more complex queries later.
const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name'),
  age: integer('age'),
  created_at: timestamp('created_at').defaultNow(),
});
// ---------------------------------------------------------------------

// Function to test the connection by executing a simple SQL query.
async function testConnection() {
  try {
    // Running a raw query to verify the connection.
    const result = await db.execute('SELECT 1 AS result;');
    console.log('Connection successful! Query result:', result);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

// Run the connection test.
testConnection();
