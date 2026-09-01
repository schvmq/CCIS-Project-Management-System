import { Pool } from 'pg';
import { env } from './env';

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

// Test database connection
export async function testDatabaseConnection(): Promise<boolean> {
  try {
    const client = await pool.connect();
    await client.query('SELECT NOW()');
    client.release();
    console.log('[DB] PostgreSQL connected successfully');
    return true;
  } catch (error) {
    console.error('[DB] PostgreSQL connection failed:', (error as Error).message);
    return false;
  }
}

// Helper for running queries
export async function query(text: string, params?: unknown[]) {
  return pool.query(text, params);
}
