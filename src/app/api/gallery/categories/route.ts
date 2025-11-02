import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

// GET all categories with their images
export async function GET() {
  try {
    const categoriesResult = await sql`
      SELECT id, name, description, created_at
      FROM categories
      ORDER BY created_at ASC
    `

    const categories = await Promise.all(
      categoriesResult.rows.map(async (category) => {
        const imagesResult = await sql`
          SELECT id, src, alt, title, date
          FROM images
          WHERE category_id = ${category.id}
          ORDER BY created_at ASC
        `

        return {
          id: category.id,
          name: category.name,
          description: category.description,
          images: imagesResult.rows
        }
      })
    )

    return NextResponse.json({ categories })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

// POST create a new category
export async function POST(request: Request) {
  try {
    const { id, name, description } = await request.json()

    if (!id || !name) {
      return NextResponse.json({ error: 'ID and name are required' }, { status: 400 })
    }

    await sql`
      INSERT INTO categories (id, name, description)
      VALUES (${id}, ${name}, ${description || ''})
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

// DELETE a category
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    await sql`
      DELETE FROM categories WHERE id = ${id}
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

// PATCH update a category
export async function PATCH(request: Request) {
  try {
    const { id, name, description } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    await sql`
      UPDATE categories
      SET name = ${name}, description = ${description}
      WHERE id = ${id}
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating category:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
