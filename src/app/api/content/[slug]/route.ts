import { NextRequest } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params
        const contentPath = path.join(process.cwd(), 'src', 'content', `${slug}.md`)

        console.log('Looking for file at:', contentPath) // 添加调试日志

        if (!fs.existsSync(contentPath)) {
            return Response.json({ error: 'Content not found' }, { status: 404 })
        }

        const content = fs.readFileSync(contentPath, 'utf-8')
        return Response.json({ content })
    } catch (error) {
        console.error('API Error:', error) // 添加错误日志
        return Response.json({ error: 'Failed to read content' }, { status: 500 })
    }
}