"use client"

import BlogLayout from '@/components/blog/BlogLayout'
import ThemeToggle from '@/components/ThemeToggle'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function BlogPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <BlogLayout>
      {/* Theme Toggle */}
      <div className="fixed top-4 md:top-8 right-4 md:right-8 z-50">
        <ThemeToggle />
      </div>

      {/* Back Navigation */}
      <Link href="/">
        <div className="fixed top-4 md:top-8 left-4 md:left-8 z-50 cursor-pointer group">
          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-white/40 group-hover:text-white/80 transition-all duration-500">
              ←
            </span>
            <span className="text-white/40 group-hover:text-white/80 transition-all duration-500 text-xs md:text-sm tracking-wider">
              BACK
            </span>
          </div>
        </div>
      </Link>

      <div className={`space-y-8 md:space-y-12 transition-all duration-2000 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        {/* Page Title */}
        <section className="border-b border-white/10 pb-6 pt-8 md:pt-12">
          <h1 className="text-2xl md:text-3xl font-thin tracking-wider">
            THOUGHTS AND REFLECTIONS
          </h1>
        </section>

        {/* Philosophical Content */}
        <section className="space-y-6">
          <div className="space-y-4 text-white/50 text-sm md:text-base leading-relaxed italic max-w-3xl">
            <p>We are born of practice itself—<br />
              carrying the past within us,<br />
              shaping the future through our becoming.</p>

            <p>We sustain the old patterns,<br />
              and in sustaining, we let new ones emerge.</p>

            <p>Between past and future,<br />
              between the virtual and the real,<br />
              between construction and collapse,<br />
              we witness the birth and passing of the world&apos;s true self.</p>

            <p>We dwell within the current,<br />
              and we are the current itself.<br />
              Every contradiction breathes its own accord.<br />
              The universe moves through all things—<br />
              between the infinite and the dust,<br />
              between the boundless world and a single cup of tea.</p>

            <p className="text-white/40 text-xs pt-4">🜄</p>
          </div>
        </section>

      </div>
    </BlogLayout>
  )
}
