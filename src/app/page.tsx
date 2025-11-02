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

          <div className="text-white/60 text-sm md:text-base leading-relaxed max-w-3xl mx-auto text-center space-y-4">
            <p>
              I place myself in both the world of creation and the world of ideas — I'm co-founding <a href="https://inftychi-website.zeabur.app" target="_blank" rel="noopener noreferrer" className="text-white font-semibold hover:text-white/80 transition-colors">Infinity Archive</a> with an exceptional team, building a bridge between AI and mathematics.
            </p>
            <p>
              At the same time, I'm pursuing my PhD at the <a href="https://www.utoronto.ca" target="_blank" rel="noopener noreferrer" className="text-white font-semibold hover:text-white/80 transition-colors">University of Toronto</a>, within a community of brilliant, open-minded researchers who constantly inspire new ways of thinking.
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
                Drawing, interpreting, and verifying Math with natural language
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
          <Link href="/thoughts">
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
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/Xinze-Li-Bryan"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              title="GitHub"
            >
              <div className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white/90 hover:border-white/40 transition-all duration-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
            </a>
          </div>
        </section>
      </div>
    </BlogLayout>
  )
}