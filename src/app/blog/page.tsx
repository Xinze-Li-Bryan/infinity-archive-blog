"use client"

import Link from 'next/link'
import BlogLayout from '@/components/blog/BlogLayout'
import { getBlogPosts } from '@/lib/blog'
import { useState, useEffect } from 'react'

// Animated Border Module (复用)
const AnimatedBorderModule = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
    const [borderVisible, setBorderVisible] = useState(false)
    const [borderProgress, setBorderProgress] = useState(0)

    useEffect(() => {
        const delayTimer = setTimeout(() => {
            setBorderVisible(true)
            const progressTimer = setInterval(() => {
                setBorderProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(progressTimer)
                        return 100
                    }
                    return prev + 2
                })
            }, 30)
        }, delay)

        return () => clearTimeout(delayTimer)
    }, [delay])

    return (
        <div className={`bg-black font-mono h-full relative ${className}`}>
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-0 left-0 h-0.5 bg-white transition-all duration-100"
                    style={{
                        width: borderProgress <= 25 ? `${borderProgress * 4}%` : '100%',
                        opacity: borderVisible ? 1 : 0
                    }}
                />
                <div
                    className="absolute top-0 right-0 w-0.5 bg-white transition-all duration-100"
                    style={{
                        height: borderProgress > 25 && borderProgress <= 50 ? `${(borderProgress - 25) * 4}%` : borderProgress > 50 ? '100%' : '0%',
                        opacity: borderVisible ? 1 : 0
                    }}
                />
                <div
                    className="absolute bottom-0 right-0 h-0.5 bg-white transition-all duration-100"
                    style={{
                        width: borderProgress > 50 && borderProgress <= 75 ? `${(borderProgress - 50) * 4}%` : borderProgress > 75 ? '100%' : '0%',
                        opacity: borderVisible ? 1 : 0
                    }}
                />
                <div
                    className="absolute bottom-0 left-0 w-0.5 bg-white transition-all duration-100"
                    style={{
                        height: borderProgress > 75 ? `${(borderProgress - 75) * 4}%` : '0%',
                        opacity: borderVisible ? 1 : 0
                    }}
                />
                {borderProgress >= 100 && (
                    <div className="absolute inset-0 border border-white/20 animate-pulse" />
                )}
            </div>
            <div className="p-6 relative z-10">
                {children}
            </div>
        </div>
    )
}

export default function BlogPage() {
    const posts = getBlogPosts()

    return (
        <BlogLayout>
            <div className="space-y-8 font-mono">
                {/* Header */}
                <AnimatedBorderModule delay={300}>
                    <div className="flex items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-black tracking-wider">DEVELOPMENT_LOG_ARCHIVE</h1>
                            <p className="text-xs text-white/40">
                                INFINITY_ARCHIVE_DEVELOPMENT_UPDATES
                            </p>
                        </div>
                    </div>
                </AnimatedBorderModule>

                {/* Posts */}
                <div className="space-y-6">
                    {posts.map((post, index) => (
                        <AnimatedBorderModule key={post.slug} delay={600 + index * 200} className="group hover:border-white/40 transition-all duration-300">
                            <div className="space-y-4">
                                {/* Header */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="bg-white text-black text-sm px-3 py-1 font-black">
                                            {post.version}
                                        </span>
                                        <time className="text-sm text-white/40">{post.date}</time>
                                    </div>
                                    <div className="text-xs text-white/40">
                                        STATUS: PUBLISHED
                                    </div>
                                </div>

                                {/* Title */}
                                <Link href={`/blog/${post.slug}`}>
                                    <h2 className="text-xl font-black hover:text-white/80 transition-colors cursor-pointer">
                                        {post.title.toUpperCase()}
                                    </h2>
                                </Link>

                                {/* Content */}
                                <p className="text-white/60 leading-relaxed">{post.excerpt}</p>

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                    <div className="flex gap-2">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="text-xs bg-white/10 px-2 py-1 text-white/60">
                                                {tag.toUpperCase()}
                                            </span>
                                        ))}
                                    </div>

                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="text-sm text-white hover:text-white/60 font-black transition-colors"
                                    >
                                        READ_FULL_LOG →
                                    </Link>
                                </div>
                            </div>
                        </AnimatedBorderModule>
                    ))}
                </div>

                {/* Footer Info */}
                <AnimatedBorderModule delay={1200}>
                    <div className="text-center space-y-2">
                        <div className="text-xs text-white/40">TOTAL_ENTRIES: {posts.length}</div>
                        <div className="text-xs text-white/40">LAST_UPDATE: REAL_TIME</div>
                        <div className="text-xs text-white/40">PROTOCOL_STATUS: ACTIVE_DEVELOPMENT</div>
                    </div>
                </AnimatedBorderModule>
            </div>
        </BlogLayout>
    )
}