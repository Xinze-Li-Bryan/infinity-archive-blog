import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

// POST create a new image
export async function POST(request: Request) {
  try {
    const { category_id, src, alt, title, date } = await request.json()

    if (!category_id || !src) {
      return NextResponse.json({ error: 'category_id and src are required' }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO images (category_id, src, alt, title, date)
      VALUES (${category_id}, ${src}, ${alt || ''}, ${title || ''}, ${date || ''})
      RETURNING id, category_id, src, alt, title, date
    `

    return NextResponse.json({ success: true, image: result.rows[0] })
  } catch (error) {
    console.error('Error creating image:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

// DELETE an image
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    await sql`
      DELETE FROM images WHERE id = ${id}
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting image:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
