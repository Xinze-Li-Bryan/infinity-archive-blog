"use client"

import BlogLayout from '@/components/blog/BlogLayout'
import ThemeToggle from '@/components/ThemeToggle'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function FuturePage() {
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

      <div className={`space-y-8 md:space-y-12 transition-all duration-2000 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        {/* Page Title */}
        <section className="border-b border-white/10 pb-6 pt-8 md:pt-12">
          <h1 className="text-2xl md:text-3xl font-thin tracking-wider">
            NEO-MATH VENTURES
          </h1>
        </section>

        {/* Introduction */}
        <section className="space-y-4">
          <p className="text-white/60 text-xs md:text-sm leading-relaxed">
            For centuries, mathematics lived by an iron law: to create new truth, one must manually verify old truth.
            This made mathematics rigorous—and simultaneously inaccessible.
          </p>
          <p className="text-white/60 text-xs md:text-sm leading-relaxed">
            We are witnessing a paradigm shift. When machines verify and humans create, mathematics becomes infinitely
            generative—accessible to everyone. Human intuition and creativity are liberated. Mathematics enters a new era.
          </p>
        </section>

        {/* InftyChi Project */}
        <section className="space-y-6">
          <h2 className="text-xs md:text-sm text-white/40 tracking-widest">
            INFTYCHI PROJECT
          </h2>

          <div className="space-y-4">
            <p className="text-white/60 text-xs md:text-sm leading-relaxed">
              Co-founded with{' '}
              <a
                href="https://www.linkedin.com/in/vicxiao/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white/60 transition-all duration-500"
              >
                Victor Xiao
              </a>
              {' '}and{' '}
              <a
                href="https://www.linkedin.com/in/jiaqi-lai-229b13257/?originalSubdomain=ca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white/60 transition-all duration-500"
              >
                Jiaqi Lai
              </a>
              . We believe the future of science is human-AI collaborative and verifiable, powered by math super intelligence.
            </p>

            <div>
              <a
                href="https://inftychi.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white/60 transition-all duration-500 text-xs md:text-sm"
              >
                inftychi.ai →
              </a>
            </div>
          </div>
        </section>

        {/* AI for Mathematics */}
        <section className="space-y-6">
          <h2 className="text-xs md:text-sm text-white/40 tracking-widest">
            AI FOR MATHEMATICS
          </h2>

          <p className="text-white/60 text-xs md:text-sm leading-relaxed">
            Projects and seminars I follow closely in the field of AI for mathematics.
          </p>

          <div className="space-y-3">
            <div>
              <a
                href="https://mathweb.ucsd.edu/~bechow/LeanOnMe/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white/60 transition-all duration-500 text-xs md:text-sm"
              >
                Lean Learning Seminar
              </a>
              <p className="text-white/40 text-xs mt-1">Organized by Ben Chow (UCSD) and Zilu Ma (UT Knoxville)</p>
            </div>

            <div>
              <a
                href="https://ai-math-seminar.github.io/seminar/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white/60 transition-all duration-500 text-xs md:text-sm"
              >
                AI and Mathematics Seminar
              </a>
              <p className="text-white/40 text-xs mt-1">Weekly research seminar at Rutgers on Lean and other AI methods</p>
            </div>

            <div>
              <a
                href="https://www.aya-prover.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white/60 transition-all duration-500 text-xs md:text-sm"
              >
                Aya Prover
              </a>
              <p className="text-white/40 text-xs mt-1">Tesla Zhang's work, a proof assistant I follow closely</p>
            </div>

            <div>
              <a
                href="http://faculty.bicmr.pku.edu.cn/~wenzw/formal/docs/#/reaslab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white/60 transition-all duration-500 text-xs md:text-sm"
              >
                ReasLab Lean Online IDE
              </a>
              <p className="text-white/40 text-xs mt-1">Zaiwen Wen's team work at BICMR, PKU</p>
            </div>

            <div>
              <a
                href="https://acornprover.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white/60 transition-all duration-500 text-xs md:text-sm"
              >
                Acorn Prover
              </a>
              <p className="text-white/40 text-xs mt-1">Kevin Lacker's team work, a theorem prover</p>
            </div>
          </div>
        </section>

      </div>
    </BlogLayout>
  )
}
