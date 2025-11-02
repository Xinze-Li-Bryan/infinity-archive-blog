"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import BlogLayout from '@/components/blog/BlogLayout'
import ThemeToggle from '@/components/ThemeToggle'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'

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

export default function ThoughtDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  const [thought, setThought] = useState<Thought | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadThought()
  }, [slug])

  const loadThought = async () => {
    try {
      const res = await fetch(`/api/thoughts/${slug}`)
      const data = await res.json()

      if (data.success) {
        setThought(data.thought)
      } else {
        setError(data.error || 'Thought not found')
      }
    } catch (error) {
      console.error('Error loading thought:', error)
      setError('Failed to load thought')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <BlogLayout>
        <div className="text-white/50 text-center py-12">
          Loading...
        </div>
      </BlogLayout>
    )
  }

  if (error || !thought) {
    return (
      <BlogLayout>
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <h1 className="text-2xl text-white/70 mb-4">Thought Not Found</h1>
            <Link
              href="/thoughts"
              className="text-white/60 hover:text-white/90 transition-colors"
            >
              ← Back to Thoughts
            </Link>
          </div>
        </div>
      </BlogLayout>
    )
  }

  return (
    <BlogLayout>
      {/* Theme Toggle */}
      <div className="fixed top-4 md:top-8 right-4 md:right-8 z-50">
        <ThemeToggle />
      </div>

      {/* Back Navigation */}
      <Link href="/thoughts">
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

      <article className="max-w-4xl mx-auto">
        {/* Cover Image */}
        {thought.cover_image && (
          <div className="mb-12 rounded-xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thought.cover_image}
              alt={thought.title}
              className="w-full h-96 object-cover"
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-thin text-white/90 tracking-wider mb-6">
            {thought.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-white/50 text-sm">
            <time dateTime={thought.created_at}>
              {new Date(thought.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            {thought.updated_at !== thought.created_at && (
              <span>
                · Updated {new Date(thought.updated_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            )}
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            components={{
              // Custom styling for markdown elements
              h1: ({ children }) => (
                <h1 className="text-3xl md:text-4xl font-thin text-white/90 tracking-wide mb-6 mt-12">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl md:text-3xl font-thin text-white/90 tracking-wide mb-4 mt-10">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl md:text-2xl font-thin text-white/90 tracking-wide mb-4 mt-8">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6">
                  {children}
                </p>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-white/90 hover:text-white underline underline-offset-4 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
              img: ({ src, alt }) => (
                <img
                  src={src}
                  alt={alt || ''}
                  className="w-full rounded-lg my-8"
                />
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-white/20 pl-6 my-6 text-white/60 italic">
                  {children}
                </blockquote>
              ),
              code: ({ className, children }) => {
                const isInline = !className
                return isInline ? (
                  <code className="bg-white/10 text-white/90 px-2 py-1 rounded text-sm font-mono">
                    {children}
                  </code>
                ) : (
                  <code className={`${className} block bg-white/10 text-white/90 p-4 rounded-lg my-6 overflow-x-auto text-sm font-mono`}>
                    {children}
                  </code>
                )
              },
              ul: ({ children }) => (
                <ul className="list-disc list-inside text-white/70 space-y-2 my-6">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside text-white/70 space-y-2 my-6">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-white/70 leading-relaxed">
                  {children}
                </li>
              ),
            }}
          >
            {thought.content}
          </ReactMarkdown>
        </div>
      </article>
    </BlogLayout>
  )
}
