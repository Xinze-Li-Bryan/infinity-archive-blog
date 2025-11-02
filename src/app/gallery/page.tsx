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

export default function GalleryPage() {
  const [mounted, setMounted] = useState(false)
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; title: string } | null>(null)
  const [galleryCategories, setGalleryCategories] = useState<CategoryType[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const animationFrames = useRef<{ [key: string]: number }>({})
  const isPaused = useRef<{ [key: string]: boolean }>({})

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

  // 当悬停的分类改变时，更新展开状态
  useEffect(() => {
    if (hoveredCategory) {
      setExpandedCategory(hoveredCategory)
    }
  }, [hoveredCategory])

  // 自动滚动动画 - 像转动纸环一样
  useEffect(() => {
    const autoScroll = (categoryId: string) => {
      const container = scrollRefs.current[categoryId]
      if (!container || isPaused.current[categoryId]) return

      const scrollWidth = container.scrollWidth
      const halfWidth = scrollWidth / 2

      // 每帧滚动的距离
      container.scrollLeft += 0.5

      // 无缝循环：滚动到一半时重置到开头
      if (container.scrollLeft >= halfWidth) {
        container.scrollLeft = 0
      }

      animationFrames.current[categoryId] = requestAnimationFrame(() => autoScroll(categoryId))
    }

    // 为每个展开的category启动动画
    galleryCategories.forEach(category => {
      if (expandedCategory === category.id) {
        const container = scrollRefs.current[category.id]
        if (container) {
          // 初始化
          container.scrollLeft = 0
          isPaused.current[category.id] = false

          // 启动自动滚动
          autoScroll(category.id)
        }
      } else {
        // 停止非展开category的动画
        if (animationFrames.current[category.id]) {
          cancelAnimationFrame(animationFrames.current[category.id])
        }
      }
    })

    // 清理
    return () => {
      Object.values(animationFrames.current).forEach(frame => {
        if (frame) cancelAnimationFrame(frame)
      })
    }
  }, [galleryCategories, expandedCategory])

  // 处理手动滚动的无缝循环
  useEffect(() => {
    const handleScroll = (categoryId: string) => {
      const container = scrollRefs.current[categoryId]
      if (!container) return

      const scrollWidth = container.scrollWidth
      const scrollLeft = container.scrollLeft
      const halfWidth = scrollWidth / 2

      // 手动滚动到一半以后，无缝跳回开头
      if (scrollLeft >= halfWidth - 10) {
        container.scrollLeft = scrollLeft - halfWidth
      }
    }

    // 为每个category添加scroll监听
    galleryCategories.forEach(category => {
      const container = scrollRefs.current[category.id]
      if (container) {
        const listener = () => handleScroll(category.id)
        container.addEventListener('scroll', listener, { passive: true })
      }
    })

    // 清理
    return () => {
      galleryCategories.forEach(category => {
        const container = scrollRefs.current[category.id]
        if (container) {
          const listener = () => handleScroll(category.id)
          container.removeEventListener('scroll', listener)
        }
      })
    }
  }, [galleryCategories])

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

  // 处理鼠标进入分类
  const handleCategoryMouseEnter = (categoryId: string) => {
    setHoveredCategory(categoryId)
  }

  // 处理鼠标离开分类
  const handleCategoryMouseLeave = () => {
    setHoveredCategory(null)
    setExpandedCategory(null)
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
              <div
                key={category.id}
                className="relative overflow-hidden"
                onMouseEnter={() => handleCategoryMouseEnter(category.id)}
                onMouseLeave={() => handleCategoryMouseLeave()}
              >
                {/* Category Header */}
                <div
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
                      ? 'max-h-[3000px] opacity-100 mt-6'
                      : 'max-h-0 opacity-0 mt-0'
                  }`}
                  style={{ overflow: expandedCategory === category.id ? 'visible' : 'hidden' }}
                >
                  {category.images.length > 0 && (
                  <div className="border border-white/10 rounded-xl p-4 bg-black/20">
                    {/* 横向无限滚动画廊 */}
                    <div
                      ref={(el) => { scrollRefs.current[category.id] = el }}
                      className="gallery-scroll-container gallery-image-container"
                    >
                      <div className="gallery-scroll-track">
                        {/* 创建多列，每列垂直铺满不规则的长方形色块 */}
                        {(() => {
                          const columnBlocks = [
                            [150, 120, 130], // 列1: 3个块
                            [180, 220],      // 列2: 2个块
                            [160, 140, 100], // 列3: 3个块
                            [200, 200],      // 列4: 2个块
                            [130, 170, 100], // 列5: 3个块
                          ]

                          const images = category.images
                          let imageIndex = 0

                          // 动态生成列，直到所有图片都被分配
                          const columns = []
                          let colIndex = 0

                          while (imageIndex < images.length) {
                            const blocks = columnBlocks[colIndex % columnBlocks.length]
                            const columnImages = blocks.map((height) => {
                              const image = imageIndex < images.length ? images[imageIndex] : null
                              imageIndex++
                              return { height, image }
                            })
                            columns.push(columnImages)
                            colIndex++
                          }

                          // 复制列数组2次实现无缝循环
                          const duplicatedColumns = [...columns, ...columns]

                          return duplicatedColumns.map((columnBlocks, colIdx) => (
                            <div key={colIdx} style={{
                              display: 'flex',
                              flexDirection: 'column',
                              flexShrink: 0,
                              height: '100%'
                            }}>
                              {columnBlocks.map(({ height, image }, blockIdx) => (
                                <div
                                  key={`${colIdx}-${blockIdx}`}
                                  style={{
                                    width: '200px',
                                    height: `${height}px`,
                                    flexShrink: 0,
                                    position: 'relative',
                                    overflow: 'hidden',
                                    cursor: image ? 'pointer' : 'default',
                                    backgroundColor: image ? 'transparent' : '#333'
                                  }}
                                  onClick={image ? () => setSelectedImage({ src: image.src, alt: image.alt, title: image.title }) : undefined}
                                >
                                  {image && (
                                    <>
                                      {/* eslint-disable-next-line @next/next/no-img-element */}
                                      <img
                                        src={image.src}
                                        alt={image.alt}
                                        style={{
                                          width: '100%',
                                          height: '100%',
                                          objectFit: 'cover',
                                          display: 'block'
                                        }}
                                      />
                                      <div className="gallery-item-overlay">
                                        <div className="gallery-item-info">
                                          <h3 className="text-white text-xs font-semibold mb-1">{image.title}</h3>
                                          <p className="text-white/60 text-[10px]">{image.date}</p>
                                        </div>
                                      </div>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleDownload(image.src, image.title)
                                        }}
                                        className="gallery-download-btn"
                                        title="Download image"
                                      >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                      </button>
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
                          ))
                        })()}
                      </div>
                    </div>
                    <p className="text-white/30 text-xs text-center mt-3">Click image to view • Auto-scrolling</p>
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

        {/* Copyright Disclaimer */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <div className="text-center space-y-2">
            <p className="text-white/30 text-xs tracking-wider">
              版权声明 | COPYRIGHT NOTICE
            </p>
            <p className="text-white/20 text-xs max-w-2xl mx-auto leading-relaxed">
              本画廊展示的图片收集自互联网，仅用于个人欣赏和学习交流。所有图片版权归原作者所有。如有侵权，请联系删除。
            </p>
            <p className="text-white/20 text-xs max-w-2xl mx-auto leading-relaxed">
              Images displayed here are collected from the internet for personal appreciation and educational purposes only.
              All rights belong to their respective owners. Contact for removal if needed.
            </p>
          </div>
        </section>
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

        /* 横向无限滚动容器 - 支持手动滚动但无滚动条 */
        .gallery-scroll-container {
          width: 100%;
          height: 400px;
          overflow-x: auto;
          overflow-y: hidden;
          border-radius: 8px;
          position: relative;
          scrollbar-width: none;
        }

        .gallery-scroll-container::-webkit-scrollbar {
          display: none;
        }

        /* 滚动轨道 - JavaScript控制滚动 */
        .gallery-scroll-track {
          display: flex;
          gap: 0;
          width: max-content;
          height: 100%;
        }

        /* 单列 - 垂直排列图片，宽度自动适应内容 */
        .gallery-column {
          display: flex;
          flex-direction: column;
          height: 100%;
          flex-shrink: 0;
        }

        /* 单个图片项 - 不规则高度的小砖 */
        .gallery-item {
          position: relative;
          flex-shrink: 0;
          overflow: hidden;
          cursor: pointer;
        }

        /* 图片本身 - 高度固定，宽度按比例自动计算 */
        .gallery-item-image {
          height: 100%;
          width: auto;
          object-fit: cover;
          display: block;
        }

        /* 图片信息覆盖层 */
        .gallery-item-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: flex-end;
          padding: 12px;
        }

        .gallery-item:hover .gallery-item-overlay {
          opacity: 1;
        }

        .gallery-item-info {
          width: 100%;
        }

        /* 下载按钮 */
        .gallery-download-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          background: rgba(0, 0, 0, 0.6);
          color: white;
          padding: 6px;
          border-radius: 50%;
          opacity: 0;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .gallery-item:hover .gallery-download-btn {
          opacity: 1;
        }

        .gallery-download-btn:hover {
          background: rgba(0, 0, 0, 0.8);
        }

        /* 响应式调整 */
        @media (max-width: 768px) {
          .masonry-scroll-container {
            height: 400px;
          }

          .masonry-item-hovered {
            transform: scale(1.15);
          }
        }
      `}</style>
    </BlogLayout>
  )
}
