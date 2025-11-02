"use client"

import { useState, useEffect } from 'react'
import BlogLayout from '@/components/blog/BlogLayout'
import ThemeToggle from '@/components/ThemeToggle'
import Link from 'next/link'

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const auth = localStorage.getItem('admin-auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // 简单的硬编码认证 - 生产环境应该使用更安全的方式
    if (username === 'moqian' && password === 'Lgnrx527116') {
      setIsAuthenticated(true)
      localStorage.setItem('admin-auth', 'true')
      setLoginError('')
    } else {
      setLoginError('Invalid credentials')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('admin-auth')
  }

  if (!mounted) {
    return null
  }

  if (!isAuthenticated) {
    return (
      <BlogLayout>
        <div className="fixed top-4 md:top-8 right-4 md:right-8 z-50">
          <ThemeToggle />
        </div>

        <div className="min-h-screen flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="border border-white/10 rounded-xl p-8 bg-black/20">
              <h1 className="text-3xl font-thin text-white/90 tracking-wider mb-8 text-center">
                Admin Login
              </h1>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-black border border-white/20 text-white px-4 py-3 rounded focus:outline-none focus:border-white/40"
                    placeholder="Enter username"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black border border-white/20 text-white px-4 py-3 rounded focus:outline-none focus:border-white/40"
                    placeholder="Enter password"
                  />
                </div>

                {loginError && (
                  <p className="text-red-400 text-sm">{loginError}</p>
                )}

                <button
                  type="submit"
                  className="w-full bg-white/90 hover:bg-white text-black py-3 rounded transition-colors font-medium"
                >
                  Login
                </button>
              </form>

              <p className="text-white/40 text-xs text-center mt-6">
                Default: admin / admin123
              </p>
            </div>
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
      <div className="mb-8 md:mb-16">
        <Link
          href="/"
          className="text-white/60 hover:text-white/90 transition-colors text-sm inline-flex items-center gap-2"
        >
          <span>←</span>
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-6xl font-thin text-white/90 tracking-wider mb-4">
                Admin Dashboard
              </h1>
              <p className="text-white/60 text-base md:text-lg">
                Manage your content and settings
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded transition-colors text-sm"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Management Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Gallery Management */}
          <Link href="/admin/gallery">
            <div className="border border-white/10 rounded-xl p-8 bg-black/20 hover:bg-black/30 hover:border-white/20 transition-all duration-500 group">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-white/40 group-hover:text-white/60 transition-colors">→</span>
              </div>

              <h2 className="text-2xl font-thin text-white/90 tracking-wide mb-3 group-hover:text-white transition-colors">
                Gallery
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                Manage categories and images for your visual portfolio. Upload, organize, and showcase your work.
              </p>

              <div className="mt-6 flex items-center gap-2 text-white/40 text-xs">
                <span className="px-2 py-1 bg-white/5 rounded border border-white/10">Images</span>
                <span className="px-2 py-1 bg-white/5 rounded border border-white/10">Categories</span>
                <span className="px-2 py-1 bg-white/5 rounded border border-white/10">Upload</span>
              </div>
            </div>
          </Link>

          {/* Thoughts Management */}
          <Link href="/admin/thoughts">
            <div className="border border-white/10 rounded-xl p-8 bg-black/20 hover:bg-black/30 hover:border-white/20 transition-all duration-500 group">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <span className="text-white/40 group-hover:text-white/60 transition-colors">→</span>
              </div>

              <h2 className="text-2xl font-thin text-white/90 tracking-wide mb-3 group-hover:text-white transition-colors">
                Thoughts & Reflections
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                Write and publish blog posts with Markdown support. Share your ideas, insights, and reflections.
              </p>

              <div className="mt-6 flex items-center gap-2 text-white/40 text-xs">
                <span className="px-2 py-1 bg-white/5 rounded border border-white/10">Markdown</span>
                <span className="px-2 py-1 bg-white/5 rounded border border-white/10">Publish</span>
                <span className="px-2 py-1 bg-white/5 rounded border border-white/10">Draft</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border border-white/10 rounded-lg p-4 bg-black/10">
            <p className="text-white/40 text-xs mb-2">Total Systems</p>
            <p className="text-white/90 text-2xl font-thin">2</p>
          </div>
          <div className="border border-white/10 rounded-lg p-4 bg-black/10">
            <p className="text-white/40 text-xs mb-2">Gallery</p>
            <p className="text-white/90 text-2xl font-thin">Active</p>
          </div>
          <div className="border border-white/10 rounded-lg p-4 bg-black/10">
            <p className="text-white/40 text-xs mb-2">Thoughts</p>
            <p className="text-white/90 text-2xl font-thin">Active</p>
          </div>
          <div className="border border-white/10 rounded-lg p-4 bg-black/10">
            <p className="text-white/40 text-xs mb-2">Database</p>
            <p className="text-white/90 text-2xl font-thin">Postgres</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 border border-white/10 rounded-xl p-6 bg-black/10">
          <h3 className="text-white/90 text-lg font-thin mb-4">System Information</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-white/50">Platform</span>
              <span className="text-white/70">Next.js 15.4.4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Database</span>
              <span className="text-white/70">Vercel Postgres (Neon)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Hosting</span>
              <span className="text-white/70">Vercel</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Domain</span>
              <span className="text-white/70">lixinze.xyz</span>
            </div>
          </div>
        </div>
      </div>
    </BlogLayout>
  )
}
