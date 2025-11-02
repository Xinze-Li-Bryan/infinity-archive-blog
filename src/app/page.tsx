"use client"

import BlogLayout from '@/components/blog/BlogLayout'
import ThemeToggle from '@/components/ThemeToggle'
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
      <div className="fixed top-4 md:top-8 left-4 md:left-8 z-50">
        <ThemeToggle />
      </div>

      {/* Top Background Image - 窄条横幅 */}
      <div className="relative w-screen h-48 md:h-56 -ml-[50vw] left-[50%] mb-12 md:mb-20 overflow-hidden border-b border-white/10">
        <Image
          src="/background.JPG"
          alt="Background"
          fill
          style={{ objectPosition: '30% 80%' }}
          className="object-cover opacity-60"
          priority
        />
      </div>

      <div className={`space-y-12 md:space-y-20 transition-all duration-2000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
        {/* Personal Introduction - Minimal */}
        <section className="text-center space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-thin tracking-wider mb-2">
              XINZE LI （Moqian）
            </h1>
            <p className="text-white/40 text-xs md:text-sm tracking-widest">
              李昕泽 (墨谦)
            </p>
          </div>

          <div className="text-white/60 text-xs md:text-sm leading-relaxed max-w-2xl mx-auto text-center">
            <p>
              I am currently co-founding an AI for mathematics startup and pursuing my PhD at University of Toronto.
            </p>
            <p className="mt-2">
              I&apos;d be happy to connect with researchers and practitioners to explore and inspire solutions in this age of vast transformation.
            </p>
          </div>
        </section>

        {/* Navigation Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Future Card */}
          <Link href="/future">
            <div className="relative p-10 md:p-12
                            border border-white/10
                            rounded-xl
                            hover:bg-white/5
                            hover:border-white/20
                            transition-all duration-700
                            cursor-pointer group
                            min-h-[160px] flex flex-col justify-center items-center overflow-hidden">
              <h2 className="text-3xl md:text-4xl font-thin tracking-wider
                             group-hover:tracking-[0.1em] md:group-hover:tracking-[0.15em]
                             group-hover:text-white/50
                             transition-all duration-700 text-center mb-3">
                NEO-MATH VENTURES
              </h2>

              <div className="w-16 h-[1px] bg-white/20
                              group-hover:w-full
                              transition-all duration-700 mb-4"></div>

              <p className="text-white/40 text-xs md:text-sm text-center leading-relaxed">
                Human-AI collaboration in mathematics
              </p>
            </div>
          </Link>

          {/* Research Card */}
          <Link href="/research">
            <div className="relative p-10 md:p-12
                            border border-white/10
                            rounded-xl
                            hover:bg-white/5
                            hover:border-white/20
                            transition-all duration-700
                            cursor-pointer group
                            min-h-[160px] flex flex-col justify-center items-center overflow-hidden">
              {/* 标题 */}
              <h2 className="text-3xl md:text-4xl font-thin tracking-wider
                             group-hover:tracking-[0.1em] md:group-hover:tracking-[0.15em]
                             group-hover:text-white/50
                             transition-all duration-700 text-center mb-3">
                MATHEMATICAL RESEARCH
              </h2>

              {/* 横线 */}
              <div className="w-16 h-[1px] bg-white/20
                              group-hover:w-full
                              transition-all duration-700 mb-4"></div>

              {/* 描述文字 */}
              <p className="text-white/40 text-xs md:text-sm text-center leading-relaxed">
                I am a PhD student at UofT
              </p>
            </div>
          </Link>

          {/* Gallery Card */}
          <Link href="/gallery">
            <div className="relative p-10 md:p-12
                            border border-white/10
                            rounded-xl
                            hover:bg-white/5
                            hover:border-white/20
                            transition-all duration-700
                            cursor-pointer group
                            min-h-[160px] flex flex-col justify-center items-center overflow-hidden">
              <h2 className="text-3xl md:text-4xl font-thin tracking-wider
                             group-hover:tracking-[0.1em] md:group-hover:tracking-[0.15em]
                             group-hover:text-white/50
                             transition-all duration-700 text-center mb-3">
                GALLERY OF MOMENTS
              </h2>

              <div className="w-16 h-[1px] bg-white/20
                              group-hover:w-full
                              transition-all duration-700 mb-4"></div>

              <p className="text-white/40 text-xs md:text-sm text-center leading-relaxed">
                Visual explorations through time
              </p>
            </div>
          </Link>

          {/* Thoughts Card */}
          <Link href="/blog">
            <div className="relative p-10 md:p-12
                            border border-white/10
                            rounded-xl
                            hover:bg-white/5
                            hover:border-white/20
                            transition-all duration-700
                            cursor-pointer group
                            min-h-[160px] flex flex-col justify-center items-center overflow-hidden">
              <h2 className="text-3xl md:text-4xl font-thin tracking-wider
                             group-hover:tracking-[0.1em] md:group-hover:tracking-[0.15em]
                             group-hover:text-white/50
                             transition-all duration-700 text-center mb-3">
                THOUGHTS AND REFLECTIONS
              </h2>

              <div className="w-16 h-[1px] bg-white/20
                              group-hover:w-full
                              transition-all duration-700 mb-4"></div>

              <p className="text-white/40 text-xs md:text-sm text-center leading-relaxed">
                Reflections on mathematics and life
              </p>
            </div>
          </Link>
        </section>

        {/* Contact Section */}
        <section className="border-t border-white/10 pt-8 md:pt-12">
          <h3 className="text-xs md:text-sm text-white/40 tracking-widest mb-6">CONTACT</h3>
          <div className="flex gap-4">
            {/* Email */}
            <a
              href="mailto:xbryanli.li@mail.utoronto.ca"
              className="group relative"
              title="Email"
            >
              <div className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white/90 hover:border-white/40 transition-all duration-500">
                <span className="text-base">✉</span>
              </div>
            </a>

            {/* X/Twitter */}
            <a
              href="https://x.com/fuguixomega"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              title="X/Twitter"
            >
              <div className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white/90 hover:border-white/40 transition-all duration-500">
                <span className="text-sm font-bold">𝕏</span>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/xinze-li-8443a9192/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              title="LinkedIn"
            >
              <div className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white/90 hover:border-white/40 transition-all duration-500">
                <span className="text-sm font-bold">in</span>
              </div>
            </a>
          </div>
        </section>
      </div>
    </BlogLayout>
  )
}