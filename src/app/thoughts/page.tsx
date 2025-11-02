"use client"

import { useState, useEffect } from 'react'
import BlogLayout from '@/components/blog/BlogLayout'
import ThemeToggle from '@/components/ThemeToggle'
import Link from 'next/link'

type Thought = {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string | null
  cover_image: string | null
  published: boolean
  created_at: string
  updated_at: string
}

export default function ThoughtsPage() {
  const [thoughts, setThoughts] = useState<Thought[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadThoughts()
  }, [])

  const loadThoughts = async () => {
    try {
      const res = await fetch('/api/thoughts?published=true')
      const data = await res.json()
      if (data.success) {
        setThoughts(data.thoughts)
      }
    } catch (error) {
      console.error('Error loading thoughts:', error)
    } finally {
      setLoading(false)
    }
  }

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

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-thin text-white/90 tracking-wider mb-6">
            Thoughts & Reflections
          </h1>
          <p className="text-white/60 text-base md:text-lg leading-relaxed">
            A collection of ideas, musings, and reflections on various topics.
          </p>
        </header>

        {/* Thoughts Grid */}
        {loading ? (
          <div className="text-white/50 text-center py-12">
            Loading...
          </div>
        ) : thoughts.length === 0 ? (
          <div className="text-white/50 text-center py-12">
            No published thoughts yet. Check back soon!
          </div>
        ) : (
          <div className="space-y-12">
            {thoughts.map((thought) => (
              <Link
                key={thought.id}
                href={`/thoughts/${thought.slug}`}
                className="block group"
              >
                <article className="border border-white/10 rounded-xl p-6 md:p-8 bg-black/20 hover:bg-black/30 hover:border-white/20 transition-all duration-500">
                  {/* Cover Image */}
                  {thought.cover_image && (
                    <div className="mb-6 rounded-lg overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={thought.cover_image}
                        alt={thought.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  )}

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-thin text-white/90 tracking-wide mb-4 group-hover:text-white/70 transition-colors duration-500">
                    {thought.title}
                  </h2>

                  {/* Excerpt */}
                  {thought.excerpt && (
                    <p className="text-white/60 text-base md:text-lg leading-relaxed mb-4">
                      {thought.excerpt}
                    </p>
                  )}

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-white/40 text-sm">
                    <time dateTime={thought.created_at}>
                      {new Date(thought.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <span className="group-hover:text-white/60 transition-colors">
                      Read more →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </BlogLayout>
  )
}
