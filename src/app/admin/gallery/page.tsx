"use client"

import { useState, useEffect } from 'react'
import BlogLayout from '@/components/blog/BlogLayout'
import ThemeToggle from '@/components/ThemeToggle'
import Link from 'next/link'
import Image from 'next/image'

type ImageType = {
  id: number
  src: string
  alt: string
  title: string
  date: string
}

type CategoryType = {
  id: string
  name: string
  description: string
  images: ImageType[]
}

export default function AdminPage() {
  // 认证状态
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  // 画廊状态
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [mounted, setMounted] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState('')

  // 新分类表单
  const [newCategory, setNewCategory] = useState({
    id: '',
    name: '',
    description: ''
  })

  // 编辑分类表单
  const [editCategoryForm, setEditCategoryForm] = useState({
    name: '',
    description: ''
  })

  // 图片上传
  const [uploadingImages, setUploadingImages] = useState<{ [key: string]: File }>({})
  const [imageMetadata, setImageMetadata] = useState<{ [key: string]: { title: string, alt: string, date: string } }>({})

  useEffect(() => {
    setMounted(true)
    // 检查是否已登录
    const savedAuth = localStorage.getItem('admin_auth')
    if (savedAuth === 'true') {
      setIsAuthenticated(true)
      loadCategories()
    }
  }, [])

  const loadCategories = async () => {
    try {
      const res = await fetch('/api/gallery/categories')
      const data = await res.json()
      setCategories(data.categories || [])
    } catch (err) {
      console.error('Failed to load categories:', err)
      setCategories([])
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === 'moqian' && password === 'Lgnrx527116') {
      setIsAuthenticated(true)
      localStorage.setItem('admin_auth', 'true')
      setLoginError('')
      loadCategories()
    } else {
      setLoginError('Invalid username or password')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('admin_auth')
  }

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
  }

  const addCategory = async () => {
    if (!newCategory.id || !newCategory.name) {
      alert('Please fill in Category ID and Name')
      return
    }

    if (categories.some(c => c.id === newCategory.id)) {
      alert('Category ID already exists')
      return
    }

    try {
      const res = await fetch('/api/gallery/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCategory)
      })

      if (res.ok) {
        await loadCategories()
        setNewCategory({ id: '', name: '', description: '' })
        setShowNewCategoryForm(false)
        setUploadStatus('✅ Category created successfully!')
        setTimeout(() => setUploadStatus(''), 2000)
      } else {
        throw new Error('Failed to create category')
      }
    } catch (error) {
      alert(`Error: ${error}`)
    }
  }

  const startEditCategory = (category: CategoryType) => {
    setEditingCategory(category.id)
    setEditCategoryForm({
      name: category.name,
      description: category.description
    })
  }

  const saveEditCategory = async (categoryId: string) => {
    try {
      const res = await fetch('/api/gallery/categories', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: categoryId, ...editCategoryForm })
      })

      if (res.ok) {
        await loadCategories()
        setEditingCategory(null)
        setUploadStatus('✅ Category updated successfully!')
        setTimeout(() => setUploadStatus(''), 2000)
      } else {
        throw new Error('Failed to update category')
      }
    } catch (error) {
      alert(`Error: ${error}`)
    }
  }

  const deleteCategory = async (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId)
    if (!category) return

    if (!confirm(`Delete "${category.name}" and ${category.images.length} image(s)?`)) {
      return
    }

    try {
      const res = await fetch('/api/gallery/categories', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: categoryId })
      })

      if (res.ok) {
        await loadCategories()
        setUploadStatus('✅ Category deleted successfully!')
        setTimeout(() => setUploadStatus(''), 2000)
      } else {
        throw new Error('Failed to delete category')
      }
    } catch (error) {
      alert(`Error: ${error}`)
    }
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>, categoryId: string) => {
    const files = Array.from(e.target.files || [])
    const newUploadingImages: { [key: string]: File } = {}
    const metadata: { [key: string]: { title: string, alt: string, date: string } } = {}

    files.forEach(file => {
      const key = `${categoryId}-${file.name}`
      newUploadingImages[key] = file
      metadata[key] = {
        title: file.name.replace(/\.[^/.]+$/, ''),
        alt: file.name.replace(/\.[^/.]+$/, ''),
        date: new Date().getFullYear().toString()
      }
    })

    setUploadingImages(newUploadingImages)
    setImageMetadata(metadata)
  }

  const uploadImages = async (categoryId: string) => {
    const imagesToUpload = Object.entries(uploadingImages).filter(([key]) => key.startsWith(categoryId))

    if (imagesToUpload.length === 0) {
      alert('Please select images first')
      return
    }

    setUploading(true)
    setUploadStatus('Uploading images...')

    try {
      for (const [key, file] of imagesToUpload) {
        setUploadStatus(`Uploading ${file.name}...`)

        const formData = new FormData()
        formData.append('file', file)
        formData.append('category_id', categoryId)
        formData.append('title', imageMetadata[key]?.title || file.name)
        formData.append('alt', imageMetadata[key]?.alt || file.name)
        formData.append('date', imageMetadata[key]?.date || new Date().getFullYear().toString())

        const res = await fetch('/api/gallery/upload', {
          method: 'POST',
          body: formData
        })

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({ error: 'Unknown error' }))
          throw new Error(`Failed to upload ${file.name}: ${errorData.error || res.statusText}`)
        }
      }

      // Reload categories to show new images
      try {
        await loadCategories()
      } catch (loadError) {
        console.error('Failed to reload categories:', loadError)
        // Don't fail the whole upload if reload fails
      }

      setUploadingImages({})
      setImageMetadata({})
      setUploadStatus('✅ Upload complete!')

      setTimeout(() => {
        setUploadStatus('')
        setUploading(false)
      }, 2000)

    } catch (error) {
      console.error('Upload error:', error)
      setUploadStatus(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setUploading(false)
    }
  }

  const removeImage = async (categoryId: string, imageId: number) => {
    if (!confirm('Are you sure you want to delete this image?')) {
      return
    }

    try {
      const res = await fetch('/api/gallery/images', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: imageId })
      })

      if (res.ok) {
        await loadCategories()
        setUploadStatus('✅ Image deleted successfully!')
        setTimeout(() => setUploadStatus(''), 2000)
      } else {
        throw new Error('Failed to delete image')
      }
    } catch (error) {
      alert(`Error: ${error}`)
    }
  }

  // 登录页面
  if (!mounted) {
    return (
      <BlogLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-white/40">Loading...</p>
        </div>
      </BlogLayout>
    )
  }

  if (!isAuthenticated) {
    return (
      <BlogLayout>
        <ThemeToggle />
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-full max-w-md p-8 border border-white/20 rounded-lg">
            <h1 className="text-2xl font-thin tracking-wider mb-6 text-center">ADMIN LOGIN</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-white/60 text-sm mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black border border-white/20 text-white/90 px-4 py-2 rounded text-sm focus:outline-none focus:border-white/40"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black border border-white/20 text-white/90 px-4 py-2 rounded text-sm focus:outline-none focus:border-white/40"
                />
              </div>
              {loginError && (
                <p className="text-red-400 text-sm">{loginError}</p>
              )}
              <button
                type="submit"
                className="w-full bg-white/10 hover:bg-white/20 text-white/90 px-4 py-2 rounded text-sm transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </BlogLayout>
    )
  }

  // 主管理界面
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

      <div className="space-y-8 md:space-y-12">
        {/* Page Title */}
        <section className="border-b border-white/10 pb-6 pt-8 md:pt-12">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-thin tracking-wider">
              ADMIN PANEL
            </h1>
            <button
              onClick={handleLogout}
              className="text-white/40 hover:text-white/80 text-xs transition-colors px-2"
            >
              Logout
            </button>
          </div>
          <p className="text-white/60 text-xs md:text-sm mt-2">
            Manage your gallery with database storage
          </p>
        </section>

        {/* Upload Status */}
        {uploadStatus && (
          <section className="bg-white/5 border border-white/20 rounded-lg p-4">
            <p className="text-white/90 text-sm">{uploadStatus}</p>
          </section>
        )}

        {/* Add New Category Button */}
        <section>
          <button
            onClick={() => setShowNewCategoryForm(!showNewCategoryForm)}
            className="w-full py-6 border border-dashed border-white/20 hover:border-white/40 rounded-lg text-white/40 hover:text-white/60 transition-all duration-500 text-sm"
          >
            + Add New Category
          </button>

          {/* New Category Form */}
          {showNewCategoryForm && (
            <div className="mt-4 border border-white/20 rounded-lg p-6 space-y-4">
              <input
                type="text"
                placeholder="Category ID (e.g., nature)"
                value={newCategory.id}
                onChange={(e) => setNewCategory({ ...newCategory, id: e.target.value })}
                className="w-full bg-black border border-white/20 text-white/90 px-4 py-2 rounded text-sm focus:outline-none focus:border-white/40"
              />
              <input
                type="text"
                placeholder="Category Name (e.g., NATURE)"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                className="w-full bg-black border border-white/20 text-white/90 px-4 py-2 rounded text-sm focus:outline-none focus:border-white/40"
              />
              <input
                type="text"
                placeholder="Description"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                className="w-full bg-black border border-white/20 text-white/90 px-4 py-2 rounded text-sm focus:outline-none focus:border-white/40"
              />
              <div className="flex gap-2">
                <button
                  onClick={addCategory}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white/90 px-4 py-2 rounded text-sm transition-colors"
                >
                  Create Category
                </button>
                <button
                  onClick={() => setShowNewCategoryForm(false)}
                  className="bg-white/5 hover:bg-white/10 text-white/60 px-4 py-2 rounded text-sm transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Categories List */}
        <section className="space-y-8">
          {categories.map((category) => (
            <div key={category.id} className="relative overflow-hidden">
              {/* Category Header */}
              <div
                onClick={() => toggleCategory(category.id)}
                className="cursor-pointer group py-6 border-b border-white/10 hover:border-white/20 transition-all duration-700"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    {editingCategory === category.id ? (
                      <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="text"
                          value={editCategoryForm.name}
                          onChange={(e) => setEditCategoryForm({ ...editCategoryForm, name: e.target.value })}
                          className="w-full bg-black border border-white/20 text-white/90 px-3 py-1 rounded text-lg focus:outline-none focus:border-white/40"
                        />
                        <input
                          type="text"
                          value={editCategoryForm.description}
                          onChange={(e) => setEditCategoryForm({ ...editCategoryForm, description: e.target.value })}
                          className="w-full bg-black border border-white/20 text-white/60 px-3 py-1 rounded text-sm focus:outline-none focus:border-white/40"
                        />
                      </div>
                    ) : (
                      <>
                        <h2 className={`text-xl md:text-2xl font-thin transition-all duration-700 mb-2 ${
                          expandedCategory === category.id
                            ? 'text-white/30 tracking-[0.3em]'
                            : 'text-white/90 tracking-wider group-hover:text-white/50 group-hover:tracking-[0.25em]'
                        }`}>
                          {category.name}
                        </h2>
                        <p className={`text-xs md:text-sm transition-all duration-700 ${
                          expandedCategory === category.id
                            ? 'text-white/20'
                            : 'text-white/40 group-hover:text-white/30'
                        }`}>
                          {category.description}
                          {category.images.length > 0 && (
                            <span className="ml-2 text-white/30">
                              · {category.images.length} image{category.images.length !== 1 ? 's' : ''}
                            </span>
                          )}
                        </p>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    {editingCategory === category.id ? (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            saveEditCategory(category.id)
                          }}
                          className="text-green-400 hover:text-green-300 text-xs transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setEditingCategory(null)
                          }}
                          className="text-white/40 hover:text-white/60 text-xs transition-colors"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            startEditCategory(category)
                          }}
                          className="text-white/40 hover:text-white/80 text-xs transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteCategory(category.id)
                          }}
                          className="text-red-400 hover:text-red-300 text-xs transition-colors"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Gallery with smooth animation */}
              <div
                className={`transition-all duration-700 ease-in-out ${
                  expandedCategory === category.id
                    ? 'max-h-[3000px] opacity-100 mt-6'
                    : 'max-h-0 opacity-0 mt-0'
                }`}
                style={{ overflow: expandedCategory === category.id ? 'visible' : 'hidden' }}
              >
                <div className="space-y-4">
                  {/* Upload Images Section */}
                  <div className="border border-dashed border-white/20 rounded-lg p-6">
                    <h3 className="text-sm text-white/70 mb-4">+ Add Images to {category.name}</h3>

                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageSelect(e, category.id)}
                      className="w-full bg-black border border-white/20 text-white/90 px-4 py-2 rounded text-sm focus:outline-none focus:border-white/40 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-white/10 file:text-white/90 hover:file:bg-white/20 mb-4"
                      disabled={uploading}
                    />

                    {Object.entries(uploadingImages).filter(([key]) => key.startsWith(category.id)).length > 0 && (
                      <div className="space-y-3">
                        <p className="text-white/60 text-xs">
                          {Object.entries(uploadingImages).filter(([key]) => key.startsWith(category.id)).length} image(s) selected
                        </p>
                        {Object.entries(uploadingImages)
                          .filter(([key]) => key.startsWith(category.id))
                          .map(([key, file]) => (
                            <div key={key} className="border border-white/10 rounded p-3 space-y-2">
                              <p className="text-white/90 text-xs font-semibold">{file.name}</p>
                              <div className="grid grid-cols-3 gap-2">
                                <input
                                  type="text"
                                  placeholder="Title"
                                  value={imageMetadata[key]?.title || ''}
                                  onChange={(e) => setImageMetadata({
                                    ...imageMetadata,
                                    [key]: { ...imageMetadata[key], title: e.target.value }
                                  })}
                                  className="bg-black border border-white/10 text-white/90 px-2 py-1 rounded text-xs focus:outline-none focus:border-white/40"
                                />
                                <input
                                  type="text"
                                  placeholder="Alt text"
                                  value={imageMetadata[key]?.alt || ''}
                                  onChange={(e) => setImageMetadata({
                                    ...imageMetadata,
                                    [key]: { ...imageMetadata[key], alt: e.target.value }
                                  })}
                                  className="bg-black border border-white/10 text-white/90 px-2 py-1 rounded text-xs focus:outline-none focus:border-white/40"
                                />
                                <input
                                  type="text"
                                  placeholder="Date"
                                  value={imageMetadata[key]?.date || ''}
                                  onChange={(e) => setImageMetadata({
                                    ...imageMetadata,
                                    [key]: { ...imageMetadata[key], date: e.target.value }
                                  })}
                                  className="bg-black border border-white/10 text-white/90 px-2 py-1 rounded text-xs focus:outline-none focus:border-white/40"
                                />
                              </div>
                            </div>
                          ))}
                        <button
                          onClick={() => uploadImages(category.id)}
                          disabled={uploading}
                          className="w-full bg-white/10 hover:bg-white/20 text-white/90 px-4 py-2 rounded text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {uploading ? 'Uploading...' : 'Upload Images'}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Current Images */}
                  {category.images.length > 0 && (
                    <div className="border border-white/10 rounded-lg p-4">
                      <div className="flex gap-4 overflow-x-auto pb-4">
                        {category.images.map((image) => (
                          <div key={image.id} className="flex-shrink-0 w-[200px] relative group/item">
                            <div className="relative aspect-square overflow-hidden rounded-lg border border-white/10 gallery-image-container">
                              <Image src={image.src} alt={image.alt} fill className="object-cover gallery-image" />
                              <button
                                onClick={() => removeImage(category.id, image.id)}
                                className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/item:opacity-100 transition-opacity"
                              >
                                ×
                              </button>
                            </div>
                            <p className="text-white/60 text-xs mt-1 truncate">{image.title}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </BlogLayout>
  )
}
