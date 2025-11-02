"use client"

import BlogLayout from '@/components/blog/BlogLayout'
import ThemeToggle from '@/components/ThemeToggle'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

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

type GalleryConfig = {
  categories: CategoryType[]
}

export default function GalleryPage() {
  const [mounted, setMounted] = useState(false)
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; title: string } | null>(null)
  const [galleryCategories, setGalleryCategories] = useState<CategoryType[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const scrollContainerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    setMounted(true)

    // 从数据库 API 加载画廊数据
    fetch('/api/gallery/categories')
      .then(res => res.json())
      .then((data) => {
        setGalleryCategories(data.categories || [])
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load gallery:', err)
        setLoading(false)
      })
  }, [])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
  }

  const handleDownload = (imageSrc: string, imageTitle: string) => {
    // 创建一个临时 a 标签来下载图片
    const link = document.createElement('a')
    link.href = imageSrc
    link.download = `${imageTitle.replace(/\s+/g, '-')}.jpg`
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // 自动滚动功能
  const startAutoScroll = (categoryId: string) => {
    const container = scrollContainerRefs.current[categoryId]
    if (!container) return

    let scrollAmount = 0
    const scrollStep = 0.5 // 滚动速度

    const scroll = () => {
      if (container) {
        scrollAmount += scrollStep
        container.scrollLeft = scrollAmount

        // 如果滚动到末尾，重置到开始
        if (scrollAmount >= container.scrollWidth - container.clientWidth) {
          scrollAmount = 0
        }
      }
    }

    return setInterval(scroll, 20)
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

      <div className={`space-y-8 md:space-y-12 transition-all duration-2000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
        {/* Page Title */}
        <section className="border-b border-white/10 pb-6 pt-8 md:pt-12">
          <h1 className="text-2xl md:text-3xl font-thin tracking-wider mb-6">
            GALLERY OF MOMENTS
          </h1>
          <div className="text-white/60 text-xs md:text-sm leading-relaxed max-w-2xl space-y-2">
            <p>The essence of civilization begins with how we see.</p>
            <p>Through aesthetics, Zen, and the rhythm of nature, humanity and technology flow between past and future.</p>
          </div>
        </section>

        {/* Loading State */}
        {loading && (
          <section className="py-20 text-center">
            <p className="text-white/40 text-sm">Loading gallery...</p>
          </section>
        )}

        {/* Gallery Categories */}
        {!loading && (
          <section className="space-y-8">
            {galleryCategories.map((category) => (
              <div key={category.id} className="relative overflow-hidden">
                {/* Category Header */}
                <div
                  onClick={() => toggleCategory(category.id)}
                  className="cursor-pointer group py-6 border-b border-white/10 hover:border-white/20 transition-all duration-700"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
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
                    </div>
                  </div>
                </div>

                {/* Expanded Gallery - Full Width with smooth animation */}
                <div
                  className={`transition-all duration-700 ease-in-out ${
                    expandedCategory === category.id
                      ? 'max-h-[2000px] opacity-100 mt-6'
                      : 'max-h-0 opacity-0 mt-0'
                  }`}
                  style={{ overflow: expandedCategory === category.id ? 'visible' : 'hidden' }}
                >
                  {category.images.length > 0 && (
                  <div className="border border-white/10 rounded-xl p-4 bg-black/20">
                    {/* Horizontal Scrollable Gallery */}
                    <div
                      ref={(el) => { scrollContainerRefs.current[category.id] = el }}
                      className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
                      style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch'
                      }}
                    >
                      {category.images.map((image) => (
                        <div
                          key={image.id}
                          className="flex-shrink-0 w-[300px] md:w-[400px] snap-center group/item relative"
                        >
                          {/* Image Container */}
                          <div className="relative aspect-square overflow-hidden rounded-lg border border-white/10 hover:border-white/30 transition-all duration-500 gallery-image-container">
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              className="object-cover group-hover/item:scale-105 transition-transform duration-700 cursor-pointer gallery-image"
                              onClick={() => setSelectedImage({ src: image.src, alt: image.alt, title: image.title })}
                            />

                            {/* Image Info Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500">
                              <div className="absolute bottom-0 left-0 right-0 p-4">
                                <h3 className="text-white text-sm font-semibold mb-1">{image.title}</h3>
                                <p className="text-white/60 text-xs">{image.date}</p>
                              </div>
                            </div>

                            {/* Download Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDownload(image.src, image.title)
                              }}
                              className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"
                              title="Download image"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Scroll Hint */}
                    <p className="text-white/30 text-xs text-center mt-2">
                      ← Scroll or swipe to view more →
                    </p>
                  </div>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Empty State */}
        {!loading && galleryCategories.length === 0 && (
          <section className="py-20 text-center">
            <p className="text-white/40 text-sm">
              No categories yet. Visit the admin page to create your gallery.
            </p>
          </section>
        )}
      </div>

      {/* Lightbox Modal with Enhanced Features */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white/90 text-3xl transition-colors z-10"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>

          {/* Download Button in Lightbox */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleDownload(selectedImage.src, selectedImage.title)
            }}
            className="absolute top-4 right-16 text-white/60 hover:text-white/90 transition-colors z-10"
            title="Download image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>

          {/* Image Container */}
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center gallery-image-container">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain gallery-image"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Image Title */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-center">
              <h3 className="text-white text-lg font-semibold">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </BlogLayout>
  )
}
