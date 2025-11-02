import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

// GET all thoughts (or published only for public)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const publishedOnly = searchParams.get('published') === 'true'

    let result
    if (publishedOnly) {
      result = await sql`
        SELECT * FROM thoughts
        WHERE published = true
        ORDER BY created_at DESC
      `
    } else {
      result = await sql`
        SELECT * FROM thoughts
        ORDER BY created_at DESC
      `
    }

    return NextResponse.json({
      success: true,
      thoughts: result.rows
    })
  } catch (error) {
    console.error('Error fetching thoughts:', error)
    return NextResponse.json({
      error: String(error)
    }, { status: 500 })
  }
}

// POST create new thought
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, slug, content, excerpt, cover_image, published } = body

    if (!title || !slug || !content) {
      return NextResponse.json({
        error: 'Title, slug, and content are required'
      }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO thoughts (title, slug, content, excerpt, cover_image, published)
      VALUES (${title}, ${slug}, ${content}, ${excerpt || null}, ${cover_image || null}, ${published || false})
      RETURNING *
    `

    return NextResponse.json({
      success: true,
      thought: result.rows[0]
    })
  } catch (error) {
    console.error('Error creating thought:', error)
    return NextResponse.json({
      error: String(error)
    }, { status: 500 })
  }
}

// PUT update thought
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, title, slug, content, excerpt, cover_image, published } = body

    if (!id) {
      return NextResponse.json({
        error: 'ID is required'
      }, { status: 400 })
    }

    const result = await sql`
      UPDATE thoughts
      SET
        title = ${title},
        slug = ${slug},
        content = ${content},
        excerpt = ${excerpt || null},
        cover_image = ${cover_image || null},
        published = ${published || false},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `

    return NextResponse.json({
      success: true,
      thought: result.rows[0]
    })
  } catch (error) {
    console.error('Error updating thought:', error)
    return NextResponse.json({
      error: String(error)
    }, { status: 500 })
  }
}

// DELETE thought
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({
        error: 'ID is required'
      }, { status: 400 })
    }

    await sql`
      DELETE FROM thoughts
      WHERE id = ${id}
    `

    return NextResponse.json({
      success: true
    })
  } catch (error) {
    console.error('Error deleting thought:', error)
    return NextResponse.json({
      error: String(error)
    }, { status: 500 })
  }
}
