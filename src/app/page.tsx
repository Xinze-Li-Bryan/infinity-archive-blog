"use client"

import BlogLayout from '@/components/blog/BlogLayout'
import ThemeToggle from '@/components/ThemeToggle'
import AnimatedBorder from '@/components/AnimatedBorder'
import RippleEffect from '@/components/RippleEffect'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <BlogLayout>
      {/* Ripple Effect */}
      <RippleEffect />

      {/* Theme Toggle */}
      <div className="fixed top-4 md:top-8 right-4 md:right-8 z-50">
        <ThemeToggle />
      </div>

      <div className={`space-y-12 md:space-y-20 transition-all duration-2000 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        {/* Personal Introduction */}
        <AnimatedBorder className="p-6 md:p-8" borderRadius="0.75rem">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="w-32 h-32 border border-white/20 flex-shrink-0 overflow-hidden relative">
              <Image
                src="/profile-photo.jpg"
                alt="Xinze Li"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-thin tracking-wider mb-2">
                  XINZE LI
                </h1>
                <p className="text-white/40 text-xs md:text-sm tracking-widest">
                  李昕泽
                </p>
              </div>

              <p className="text-white/60 text-sm md:text-base leading-relaxed">
                Mathematics PhD Student, University of Toronto
              </p>

              <p className="text-white/50 text-sm md:text-base leading-relaxed italic">
                [更个人化的介绍将在这里...]
              </p>

              <div className="text-xs md:text-sm text-white/40">
                <a
                  href="mailto:xbryanli.li@mail.utoronto.ca"
                  className="hover:text-white/80 transition-all duration-500"
                >
                  xbryanli.li@mail.utoronto.ca
                </a>
              </div>
            </div>
          </div>
        </AnimatedBorder>

        {/* Navigation Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Traditional Research Card */}
          <Link href="/research">
            <AnimatedBorder borderRadius="0.75rem">
              <div className="p-6 md:p-8
                              hover:bg-white/5
                              transition-all duration-500
                              cursor-pointer group">
                <h2 className="text-xl md:text-2xl font-thin tracking-wider mb-4
                               group-hover:text-white/90 transition-all duration-500">
                  Mathematical Research
                </h2>
                <p className="text-white/40 text-xs md:text-sm tracking-widest mb-6">
                  传统科研范式
                </p>
                <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6">
                  Min-max theory, comparison geometry, and geometric measure theory.
                  Traditional mathematical research in differential geometry.
                </p>
                <div className="flex items-center gap-2 text-white/40 text-xs md:text-sm
                                group-hover:text-white/80 transition-all duration-500">
                  <span>View Research</span>
                  <span>→</span>
                </div>
              </div>
            </AnimatedBorder>
          </Link>

          {/* Future Mathematics Card */}
          <Link href="/future">
            <AnimatedBorder borderRadius="0.75rem">
              <div className="bg-purple-950/5 p-6 md:p-8
                              hover:bg-purple-950/10
                              transition-all duration-500
                              cursor-pointer group">
                <h2 className="text-xl md:text-2xl font-thin tracking-wider mb-4
                               group-hover:text-white/90 transition-all duration-500">
                  Future of Mathematics
                </h2>
                <p className="text-white/40 text-xs md:text-sm tracking-widest mb-6">
                  机器出版 · 人机协作
                </p>
                <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6">
                  Formal verification, machine publishing, and human-AI collaboration.
                  Building the future of mathematical research.
                </p>
                <div className="flex items-center gap-2 text-purple-200/40 text-xs md:text-sm
                                group-hover:text-purple-200/80 transition-all duration-500">
                  <span>Explore Vision</span>
                  <span>→</span>
                </div>
              </div>
            </AnimatedBorder>
          </Link>
        </section>
      </div>
    </BlogLayout>
  )
}