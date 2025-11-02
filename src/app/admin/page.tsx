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

    // 使用环境变量进行认证
    const validUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME
    const validPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD

    if (username === validUsername && password === validPassword) {
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

      <div className="space-y-8 md:space-y-12">
        {/* Page Title */}
        <section className="border-b border-white/10 pb-6 pt-8 md:pt-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-thin tracking-wider mb-3">
                ADMIN DASHBOARD
              </h1>
              <p className="text-white/60 text-xs md:text-sm">
                Manage your content and settings
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded transition-colors text-xs md:text-sm"
            >
              Logout
            </button>
          </div>
        </section>

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
      </div>
    </BlogLayout>
  )
}
