import { sql } from '@vercel/postgres'

export async function initDB() {
  try {
    // Create categories table
    await sql`
      CREATE TABLE IF NOT EXISTS categories (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create images table
    await sql`
      CREATE TABLE IF NOT EXISTS images (
        id SERIAL PRIMARY KEY,
        category_id VARCHAR(255) REFERENCES categories(id) ON DELETE CASCADE,
        src TEXT NOT NULL,
        alt VARCHAR(255),
        title VARCHAR(255),
        date VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    return { success: true }
  } catch (error) {
    console.error('Database initialization error:', error)
    return { success: false, error }
  }
}
