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

export default function ThoughtsAdminPage() {
  const [thoughts, setThoughts] = useState<Thought[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    cover_image: '',
    published: false
  })

  useEffect(() => {
    loadThoughts()
  }, [])

  const loadThoughts = async () => {
    try {
      const res = await fetch('/api/thoughts')
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

  const handleCreate = () => {
    setIsCreating(true)
    setEditingId(null)
    setFormData({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      cover_image: '',
      published: false
    })
  }

  const handleEdit = (thought: Thought) => {
    setIsCreating(false)
    setEditingId(thought.id)
    setFormData({
      title: thought.title,
      slug: thought.slug,
      content: thought.content,
      excerpt: thought.excerpt || '',
      cover_image: thought.cover_image || '',
      published: thought.published
    })
  }

  const handleCancel = () => {
    setIsCreating(false)
    setEditingId(null)
    setFormData({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      cover_image: '',
      published: false
    })
  }

  const handleSave = async () => {
    try {
      const url = '/api/thoughts'
      const method = editingId ? 'PUT' : 'POST'
      const body = editingId ? { ...formData, id: editingId } : formData

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      const data = await res.json()
      if (data.success) {
        await loadThoughts()
        handleCancel()
      }
    } catch (error) {
      console.error('Error saving thought:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this thought?')) return

    try {
      const res = await fetch(`/api/thoughts?id=${id}`, {
        method: 'DELETE'
      })

      const data = await res.json()
      if (data.success) {
        await loadThoughts()
      }
    } catch (error) {
      console.error('Error deleting thought:', error)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title)
    })
  }

  return (
    <BlogLayout>
      {/* Theme Toggle */}
      <div className="fixed top-4 md:top-8 right-4 md:right-8 z-50">
        <ThemeToggle />
      </div>

      {/* Back Navigation */}
      <Link href="/admin">
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

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl md:text-5xl font-thin text-white/90 tracking-wider mb-4">
            Manage Thoughts & Reflections
          </h1>
          <p className="text-white/50 text-sm md:text-base">
            Create and manage your blog posts with Markdown support
          </p>
        </header>

        {/* Create New Button */}
        {!isCreating && !editingId && (
          <div className="mb-8">
            <button
              onClick={handleCreate}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg transition-colors"
            >
              + New Thought
            </button>
          </div>
        )}

        {/* Editor Form */}
        {(isCreating || editingId) && (
          <div className="mb-12 border border-white/10 rounded-xl p-6 bg-black/20">
            <h2 className="text-xl text-white/90 mb-6">
              {editingId ? 'Edit Thought' : 'Create New Thought'}
            </h2>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-white/70 text-sm mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full bg-black border border-white/20 text-white px-4 py-2 rounded focus:outline-none focus:border-white/40"
                  placeholder="Enter title..."
                />
              </div>

              {/* Slug (auto-generated) */}
              <div>
                <label className="block text-white/70 text-sm mb-2">Slug (URL)</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full bg-black border border-white/20 text-white px-4 py-2 rounded focus:outline-none focus:border-white/40"
                  placeholder="slug-for-url"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-white/70 text-sm mb-2">Excerpt (optional)</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full bg-black border border-white/20 text-white px-4 py-2 rounded focus:outline-none focus:border-white/40 h-20 resize-none"
                  placeholder="Short summary..."
                />
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-white/70 text-sm mb-2">Cover Image URL (optional)</label>
                <input
                  type="text"
                  value={formData.cover_image}
                  onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                  className="w-full bg-black border border-white/20 text-white px-4 py-2 rounded focus:outline-none focus:border-white/40"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Content (Markdown) */}
              <div>
                <label className="block text-white/70 text-sm mb-2">
                  Content (Markdown supported)
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full bg-black border border-white/20 text-white px-4 py-2 rounded focus:outline-none focus:border-white/40 font-mono text-sm h-96 resize-y"
                  placeholder="Write your content here... Use Markdown syntax for formatting."
                />
                <p className="text-white/40 text-xs mt-2">
                  Tip: Use Markdown syntax - **bold**, *italic*, # headings, ![alt](url) for images, etc.
                </p>
              </div>

              {/* Published Toggle */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="published" className="text-white/70 text-sm">
                  Publish (make visible to public)
                </label>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-white/90 hover:bg-white text-black rounded transition-colors"
                >
                  {editingId ? 'Update' : 'Create'}
                </button>
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Thoughts List */}
        <div className="space-y-4">
          <h2 className="text-xl text-white/90 mb-4">All Thoughts</h2>

          {loading ? (
            <p className="text-white/50">Loading...</p>
          ) : thoughts.length === 0 ? (
            <p className="text-white/50">No thoughts yet. Create your first one!</p>
          ) : (
            thoughts.map((thought) => (
              <div
                key={thought.id}
                className="border border-white/10 rounded-lg p-6 bg-black/10 hover:bg-black/20 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg text-white/90">{thought.title}</h3>
                      {thought.published ? (
                        <span className="px-2 py-1 bg-green-500/20 border border-green-500/40 text-green-300 text-xs rounded">
                          Published
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 text-xs rounded">
                          Draft
                        </span>
                      )}
                    </div>
                    <p className="text-white/50 text-sm mb-2">/{thought.slug}</p>
                    {thought.excerpt && (
                      <p className="text-white/60 text-sm">{thought.excerpt}</p>
                    )}
                    <p className="text-white/40 text-xs mt-2">
                      Created: {new Date(thought.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(thought)}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm rounded transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(thought.id)}
                      className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/40 text-red-300 text-sm rounded transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </BlogLayout>
  )
}
