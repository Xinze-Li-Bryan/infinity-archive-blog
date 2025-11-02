"use client"

import BlogLayout from '@/components/blog/BlogLayout'
import ThemeToggle from '@/components/ThemeToggle'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function ResearchPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
          <h1 className="text-2xl md:text-3xl font-thin tracking-wider">
            MATHEMATICAL RESEARCH
          </h1>
        </section>

        {/* Introduction */}
        <section className="space-y-4">
          <p className="text-white/60 text-xs md:text-sm leading-relaxed">
            I am studying mathematics at the University of Toronto, co-supervised by{' '}
            <a
              href="https://www.math.toronto.edu/ylio/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white/60 transition-all duration-500"
            >
              Yevgeny Liokumovich
            </a>
            {' '}and{' '}
            <a
              href="https://www.math.utoronto.ca/vtk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white/60 transition-all duration-500"
            >
              Vitali Kapovitch
            </a>
            . My main interests are min-max theory, geometric measure theory, and comparison geometry.
          </p>
        </section>

        {/* Publications */}
        <section className="space-y-6">
          <h2 className="text-xs md:text-sm text-white/40 tracking-widest">
            PAPERS / PREPRINTS
          </h2>

          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-sm md:text-base font-normal text-white/90">
                <a
                  href="https://arxiv.org/abs/2205.13694"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white/60 transition-all duration-500"
                >
                  On the equidistribution of closed geodesics and geodesic nets
                </a>
              </h3>
              <p className="text-white/40 text-xs">
                Xinze Li, Bruno Staffa
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm md:text-base font-normal text-white/90">
                <a
                  href="https://arxiv.org/abs/2404.09792"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white/60 transition-all duration-500"
                >
                  Lecture Notes on Comparison Geometry
                </a>
              </h3>
              <p className="text-white/40 text-xs">
                Xinze Li
              </p>
            </div>
          </div>
        </section>
      </div>
    </BlogLayout>
  )
}
