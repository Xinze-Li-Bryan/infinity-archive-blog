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
  dataUrl?: string
}

type CategoryType = {
  id: string
  name: string
  description: string
  images: ImageType[]
}

type GalleryConfig = {
  categories: CategoryType[]
}

export default function AdminPage() {
  // 认证状态
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [githubToken, setGithubToken] = useState('')

  // 画廊状态
  const [config, setConfig] = useState<GalleryConfig>({ categories: [] })
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
  const [uploadingImages, setUploadingImages] = useState<File[]>([])
  const [imageMetadata, setImageMetadata] = useState<{ [key: string]: { title: string, alt: string, date: string } }>({})

  // GitHub配置
  const GITHUB_OWNER = 'Xinze-Li-Bryan'
  const GITHUB_REPO = 'lixinze-web'
  const GITHUB_BRANCH = 'main'
  const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN || ''

  useEffect(() => {
    setMounted(true)
    // 检查是否已登录
    const savedAuth = localStorage.getItem('admin_auth')
    if (savedAuth === 'true') {
      setIsAuthenticated(true)
      setGithubToken(GITHUB_TOKEN)
      loadConfig()
    }
  }, [])

  const loadConfig = () => {
    fetch('/gallery/config.json')
      .then(res => res.json())
      .then((data: GalleryConfig) => setConfig(data))
      .catch(err => {
        console.error('Failed to load config:', err)
        setConfig({ categories: [] })
      })
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === 'moqian' && password === 'Lgnrx527116') {
      setIsAuthenticated(true)
      localStorage.setItem('admin_auth', 'true')
      setLoginError('')
      loadConfig()
    } else {
      setLoginError('Invalid username or password')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('admin_auth')
    setGithubToken('')
  }

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
  }

  const addCategory = () => {
    if (!newCategory.id || !newCategory.name) {
      alert('Please fill in Category ID and Name')
      return
    }

    if (config.categories.some(c => c.id === newCategory.id)) {
      alert('Category ID already exists')
      return
    }

    const updatedConfig = {
      ...config,
      categories: [...config.categories, { ...newCategory, images: [] }]
    }

    setConfig(updatedConfig)
    setNewCategory({ id: '', name: '', description: '' })
    setShowNewCategoryForm(false)
  }

  const startEditCategory = (category: CategoryType) => {
    setEditingCategory(category.id)
    setEditCategoryForm({
      name: category.name,
      description: category.description
    })
  }

  const saveEditCategory = (categoryId: string) => {
    const updatedConfig = {
      ...config,
      categories: config.categories.map(c =>
        c.id === categoryId
          ? { ...c, name: editCategoryForm.name, description: editCategoryForm.description }
          : c
      )
    }
    setConfig(updatedConfig)
    setEditingCategory(null)
  }

  const deleteCategory = (categoryId: string) => {
    const category = config.categories.find(c => c.id === categoryId)
    if (!category) return

    if (!confirm(`Delete "${category.name}" and ${category.images.length} image(s)?`)) {
      return
    }

    setConfig({
      ...config,
      categories: config.categories.filter(c => c.id !== categoryId)
    })
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>, categoryId: string) => {
    const files = Array.from(e.target.files || [])
    setUploadingImages(files)

    const metadata: { [key: string]: { title: string, alt: string, date: string } } = {}
    files.forEach(file => {
      metadata[file.name] = {
        title: file.name.replace(/\.[^/.]+$/, ''),
        alt: file.name.replace(/\.[^/.]+$/, ''),
        date: new Date().getFullYear().toString()
      }
    })
    setImageMetadata(metadata)
  }

  const uploadToGithub = async (categoryId: string) => {
    if (!githubToken) {
      alert('GitHub token not found. Please check your environment variables.')
      return
    }

    if (uploadingImages.length === 0) {
      alert('Please select images first')
      return
    }

    setUploading(true)
    setUploadStatus('Uploading images to GitHub...')

    try {
      const category = config.categories.find(c => c.id === categoryId)
      if (!category) {
        throw new Error('Category not found')
      }

      // 上传每个图片
      const uploadedImages: ImageType[] = []
      for (const file of uploadingImages) {
        setUploadStatus(`Uploading ${file.name}...`)

        // 读取文件为base64
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => {
            const result = reader.result as string
            // 移除 data:image/...;base64, 前缀
            const base64Data = result.split(',')[1]
            resolve(base64Data)
          }
          reader.onerror = reject
          reader.readAsDataURL(file)
        })

        // 上传到GitHub
        const path = `public/gallery/${categoryId}/${file.name}`
        const response = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`, {
          method: 'PUT',
          headers: {
            'Authorization': `token ${githubToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `Add gallery image: ${file.name}`,
            content: base64,
            branch: GITHUB_BRANCH
          })
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(`Failed to upload ${file.name}: ${error.message}`)
        }

        // 添加到配置
        const maxId = Math.max(0, ...config.categories.flatMap(c => c.images.map(img => img.id)))
        uploadedImages.push({
          id: maxId + uploadedImages.length + 1,
          src: `/gallery/${categoryId}/${file.name}`,
          alt: imageMetadata[file.name]?.alt || file.name,
          title: imageMetadata[file.name]?.title || file.name,
          date: imageMetadata[file.name]?.date || new Date().getFullYear().toString()
        })
      }

      // 更新配置
      const updatedConfig = {
        ...config,
        categories: config.categories.map(c =>
          c.id === categoryId
            ? { ...c, images: [...c.images, ...uploadedImages] }
            : c
        )
      }

      // 上传更新后的config.json到GitHub
      setUploadStatus('Updating config.json...')

      // 先获取当前config.json的SHA
      const getResponse = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/public/gallery/config.json`, {
        headers: {
          'Authorization': `token ${githubToken}`,
        }
      })

      let sha = ''
      if (getResponse.ok) {
        const data = await getResponse.json()
        sha = data.sha
      }

      // 上传新的config.json
      const configContent = btoa(unescape(encodeURIComponent(JSON.stringify(updatedConfig, null, 2))))
      const putResponse = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/public/gallery/config.json`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${githubToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Update gallery config',
          content: configContent,
          branch: GITHUB_BRANCH,
          ...(sha && { sha })
        })
      })

      if (!putResponse.ok) {
        const error = await putResponse.json()
        throw new Error(`Failed to update config: ${error.message}`)
      }

      setConfig(updatedConfig)
      setUploadingImages([])
      setImageMetadata({})
      setUploadStatus('✅ Upload complete! Vercel will auto-deploy.')

      setTimeout(() => {
        setUploadStatus('')
        setUploading(false)
      }, 3000)

    } catch (error) {
      console.error('Upload error:', error)
      setUploadStatus(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setUploading(false)
    }
  }

  const removeImage = (categoryId: string, imageId: number) => {
    const updatedConfig = {
      ...config,
      categories: config.categories.map(c =>
        c.id === categoryId
          ? { ...c, images: c.images.filter(img => img.id !== imageId) }
          : c
      )
    }
    setConfig(updatedConfig)
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
      <Link href="/gallery">
        <div className="fixed top-4 md:top-8 left-4 md:left-8 z-50 cursor-pointer group">
          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-white/40 group-hover:text-white/80 transition-all duration-500">
              ←
            </span>
            <span className="text-white/40 group-hover:text-white/80 transition-all duration-500 text-xs md:text-sm tracking-wider">
              GALLERY
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
              className="text-white/40 hover:text-white/80 text-xs transition-colors"
            >
              Logout
            </button>
          </div>
          <p className="text-white/60 text-xs md:text-sm mt-2">
            Manage your gallery categories and images
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
          {config.categories.map((category) => (
            <div key={category.id} className="relative">
              {/* Category Header */}
              <div
                onClick={() => toggleCategory(category.id)}
                className="cursor-pointer group py-6 border-b border-white/10 hover:border-white/20 transition-all duration-500"
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
                        <h2 className="text-xl md:text-2xl font-thin tracking-wider group-hover:text-white/50 transition-all duration-500 mb-2">
                          {category.name}
                        </h2>
                        <p className="text-white/40 text-xs md:text-sm">
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
                    <div className={`text-white/40 text-sm transition-transform duration-300 ${expandedCategory === category.id ? 'rotate-180' : ''}`}>
                      ▼
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Gallery */}
              {expandedCategory === category.id && (
                <div className="mt-6 space-y-4">
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

                    {uploadingImages.length > 0 && (
                      <div className="space-y-3">
                        <p className="text-white/60 text-xs">{uploadingImages.length} image(s) selected</p>
                        {uploadingImages.map((file, index) => (
                          <div key={index} className="border border-white/10 rounded p-3 space-y-2">
                            <p className="text-white/90 text-xs font-semibold">{file.name}</p>
                            <div className="grid grid-cols-3 gap-2">
                              <input
                                type="text"
                                placeholder="Title"
                                value={imageMetadata[file.name]?.title || ''}
                                onChange={(e) => setImageMetadata({
                                  ...imageMetadata,
                                  [file.name]: { ...imageMetadata[file.name], title: e.target.value }
                                })}
                                className="bg-black border border-white/10 text-white/90 px-2 py-1 rounded text-xs focus:outline-none focus:border-white/40"
                              />
                              <input
                                type="text"
                                placeholder="Alt text"
                                value={imageMetadata[file.name]?.alt || ''}
                                onChange={(e) => setImageMetadata({
                                  ...imageMetadata,
                                  [file.name]: { ...imageMetadata[file.name], alt: e.target.value }
                                })}
                                className="bg-black border border-white/10 text-white/90 px-2 py-1 rounded text-xs focus:outline-none focus:border-white/40"
                              />
                              <input
                                type="text"
                                placeholder="Date"
                                value={imageMetadata[file.name]?.date || ''}
                                onChange={(e) => setImageMetadata({
                                  ...imageMetadata,
                                  [file.name]: { ...imageMetadata[file.name], date: e.target.value }
                                })}
                                className="bg-black border border-white/10 text-white/90 px-2 py-1 rounded text-xs focus:outline-none focus:border-white/40"
                              />
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={() => uploadToGithub(category.id)}
                          disabled={uploading}
                          className="w-full bg-white/10 hover:bg-white/20 text-white/90 px-4 py-2 rounded text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {uploading ? 'Uploading...' : 'Upload to GitHub'}
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
                              {image.dataUrl ? (
                                <Image src={image.dataUrl} alt={image.alt} fill className="object-cover gallery-image" />
                              ) : (
                                <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                  <p className="text-white/40 text-xs text-center p-2">{image.title}</p>
                                </div>
                              )}
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
              )}
            </div>
          ))}
        </section>
      </div>
    </BlogLayout>
  )
}
