"use client"

import { useState, useEffect } from 'react'

interface BlogContentProps {
    slug: string
}

export default function BlogContent({ slug }: BlogContentProps) {
    const [content, setContent] = useState<string>('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchContent() {
            try {
                const response = await fetch(`/api/content/${slug}`)
                if (response.ok) {
                    const data = await response.json()
                    // 移除第一行标题，避免重复
                    const lines = data.content.split('\n')
                    const contentWithoutTitle = lines.slice(1).join('\n')
                    setContent(contentWithoutTitle)
                } else {
                    setContent('Content not found.')
                }
            } catch {
                setContent('Failed to load content.')
            } finally {
                setLoading(false)
            }
        }

        fetchContent()
    }, [slug])

    if (loading) {
        return (
            <div className="text-white/60 text-center py-4">
                LOADING_CONTENT...
            </div>
        )
    }

    // 优化的 Markdown 转换
    const formatContent = (markdown: string) => {
        return markdown
            .split('\n')
            .map((line, index) => {
                // 跳过空行，减少不必要的换行
                if (line.trim() === '') {
                    return ''
                }

                // 分割线
                if (line === '---') {
                    return `<hr key="${index}" class="border-white/20 my-6" />`
                }

                // 标题
                if (line.startsWith('## ')) {
                    return `<h2 key="${index}" class="text-lg font-black mb-3 text-white mt-6">${line.substring(3)}</h2>`
                }
                if (line.startsWith('### ')) {
                    return `<h3 key="${index}" class="text-base font-bold mb-2 text-white/90 mt-4">${line.substring(4)}</h3>`
                }

                // 代码块标记
                if (line.startsWith('```')) {
                    if (line.length > 3) {
                        return `<div key="${index}" class="bg-white/10 border border-white/20 p-3 my-3 rounded font-mono text-sm text-white/90">`
                    } else {
                        return `</div>`
                    }
                }

                // 列表项
                if (line.startsWith('- ')) {
                    const content = line.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
                    return `<div key="${index}" class="ml-4 mb-1 text-white/80 text-sm">• ${content}</div>`
                }

                // 粗体段落
                if (line.includes('**') && line.trim() !== '') {
                    const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
                    return `<p key="${index}" class="mb-3 text-white/80 text-sm leading-relaxed">${formatted}</p>`
                }

                // 普通段落
                if (line.trim() !== '' && !line.startsWith('#')) {
                    const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
                    return `<p key="${index}" class="mb-3 text-white/80 text-sm leading-relaxed">${formatted}</p>`
                }

                return ''
            })
            .filter(line => line !== '') // 移除空字符串
            .join('')
    }

    return (
        <div className="text-white/80">
            <div
                className="space-y-2"
                dangerouslySetInnerHTML={{ __html: formatContent(content) }}
            />
        </div>
    )
}