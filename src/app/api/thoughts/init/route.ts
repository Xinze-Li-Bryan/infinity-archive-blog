import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function GET() {
  try {
    // Create thoughts table
    await sql`
      CREATE TABLE IF NOT EXISTS thoughts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        slug VARCHAR(500) UNIQUE NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT,
        cover_image TEXT,
        published BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    return NextResponse.json({
      success: true,
      message: 'Thoughts table created successfully'
    })
  } catch (error) {
    console.error('Error initializing thoughts table:', error)
    return NextResponse.json({
      error: String(error)
    }, { status: 500 })
  }
}
