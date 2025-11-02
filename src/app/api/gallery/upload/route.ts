import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const category_id = formData.get('category_id') as string
    const title = formData.get('title') as string
    const alt = formData.get('alt') as string
    const date = formData.get('date') as string

    if (!file || !category_id) {
      return NextResponse.json({ error: 'File and category_id are required' }, { status: 400 })
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const dataUrl = `data:${file.type};base64,${base64}`

    // Store in database
    const result = await sql`
      INSERT INTO images (category_id, src, alt, title, date)
      VALUES (${category_id}, ${dataUrl}, ${alt || file.name}, ${title || file.name}, ${date || new Date().getFullYear().toString()})
      RETURNING id, category_id, src, alt, title, date
    `

    return NextResponse.json({ success: true, image: result.rows[0] })
  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
