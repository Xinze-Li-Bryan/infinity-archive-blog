import { NextResponse } from 'next/server'
import { initDB } from '@/lib/db'

export async function GET() {
  try {
    const result = await initDB()
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
