"use client"

import Link from 'next/link'
import BlogLayout from '@/components/blog/BlogLayout'
import { getBlogPosts } from '@/lib/blog'
import { useState, useEffect } from 'react'

// Animated Border Module
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
      {/* Animated Border */}
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

export default function HomePage() {
  const posts = getBlogPosts()

  return (
    <BlogLayout>
      <div className="space-y-8 font-mono">
        {/* Hero Section */}
        <AnimatedBorderModule delay={500}>
          <div className="text-center space-y-4">
            <div className="text-xs text-white/40">DEVELOPMENT_LOG_INTERFACE</div>
            <h1 className="text-3xl font-black tracking-wider">
              INFINITY_ARCHIVE_RESEARCH_PROTOCOL
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto">
              REAL_TIME_UPDATES_ON_BUILDING_THE_PLANETARY_MATHEMATICAL_COMPUTER.<br />
              FOLLOW_THE_JOURNEY_FROM_PROTOTYPE_TO_REVOLUTION.
            </p>
          </div>
        </AnimatedBorderModule>

        {/* Latest Updates */}
        <AnimatedBorderModule delay={1000}>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-white text-black flex items-center justify-center text-lg font-black">
                ∞
              </div>
              <div>
                <div className="text-xl font-black">LATEST_UPDATES</div>
                <div className="text-xs text-white/40">CHRONOLOGICAL_ORDER</div>
              </div>
            </div>

            <div className="space-y-4">
              {posts.map((post, index) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                  <div className="border-l-2 border-white/20 pl-6 py-4 hover:border-white/60 hover:bg-white/5 transition-all duration-200">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-white text-black text-xs px-2 py-1 font-black">
                        WEEK_{post.week}
                      </span>
                      <time className="text-xs text-white/40">{post.date}</time>
                      <div className="flex gap-1">
                        {post.tags.map(tag => (
                          <span key={tag} className="text-xs text-white/60 bg-white/10 px-2 py-1">
                            {tag.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </div>
                    <h3 className="text-lg font-black mb-2 group-hover:text-white/80 transition-colors">
                      {post.title.toUpperCase()}
                    </h3>
                    <p className="text-white/60 text-sm">{post.excerpt}</p>
                    <div className="text-xs text-white/40 mt-2">→ READ_FULL_LOG</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </AnimatedBorderModule>

        {/* System Info */}
        <AnimatedBorderModule delay={1500}>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-2xl font-black">∞</div>
              <div className="text-xs text-white/40">MATHEMATICAL_PROTOCOL</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-black">χ</div>
              <div className="text-xs text-white/40">DECENTRALIZED_KNOWLEDGE</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-black">⚡</div>
              <div className="text-xs text-white/40">REAL_TIME_DEVELOPMENT</div>
            </div>
          </div>
        </AnimatedBorderModule>
      </div>
    </BlogLayout>
  )
}