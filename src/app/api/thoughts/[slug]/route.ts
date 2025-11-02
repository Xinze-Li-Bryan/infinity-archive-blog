import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    const result = await sql`
      SELECT * FROM thoughts
      WHERE slug = ${slug}
      LIMIT 1
    `

    if (result.rows.length === 0) {
      return NextResponse.json({
        error: 'Thought not found'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      thought: result.rows[0]
    })
  } catch (error) {
    console.error('Error fetching thought:', error)
    return NextResponse.json({
      error: String(error)
    }, { status: 500 })
  }
}
