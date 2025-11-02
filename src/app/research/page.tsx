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

      <div className={`space-y-12 md:space-y-20 transition-all duration-2000 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        {/* Page Title */}
        <section className="border border-white/10 p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-thin tracking-wider mb-4">
            Mathematical Research
          </h1>
          <p className="text-white/40 text-xs md:text-sm tracking-widest">
            传统科研范式 · Traditional Research Paradigm
          </p>
        </section>

        {/* Research Focus */}
        <section className="border border-white/10 p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-thin tracking-wider mb-6">
            Research Focus
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-base md:text-lg font-normal mb-3 text-white/80">
                Min-Max Theory
              </h3>
              <p className="text-white/60 text-sm md:text-base leading-relaxed">
                Variational methods for finding critical points of functionals on infinite-dimensional spaces.
                Applications to geometric analysis and minimal surface theory.
              </p>
            </div>

            <div>
              <h3 className="text-base md:text-lg font-normal mb-3 text-white/80">
                Comparison Geometry
              </h3>
              <p className="text-white/60 text-sm md:text-base leading-relaxed">
                Study of Riemannian manifolds through comparison with model spaces of constant curvature.
                Curvature bounds and geometric-topological implications.
              </p>
            </div>

            <div>
              <h3 className="text-base md:text-lg font-normal mb-3 text-white/80">
                Geometric Measure Theory
              </h3>
              <p className="text-white/60 text-sm md:text-base leading-relaxed">
                Analysis of geometric objects using measure-theoretic tools.
                Currents, varifolds, and rectifiable sets in Euclidean and Riemannian spaces.
              </p>
            </div>
          </div>
        </section>

        {/* Publications */}
        <section className="border border-white/10 p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-thin tracking-wider mb-6">
            Publications
          </h2>

          <div className="space-y-6">
            <div className="border-l border-white/20 pl-6 hover:border-white/40 transition-all duration-500">
              <h3 className="text-base md:text-lg font-normal mb-2">
                <a
                  href="https://arxiv.org/abs/2205.13694"
                  target="_blank"
                  className="hover:text-white/80 transition-all duration-500"
                >
                  On the equidistribution of closed geodesics and geodesic nets
                </a>
              </h3>
              <p className="text-white/40 text-xs md:text-sm mb-2">
                Xinze Li, Bruno Staffa
              </p>
              <p className="text-white/50 text-xs md:text-sm leading-relaxed">
                We study the equidistribution properties of closed geodesics and geodesic nets
                on Riemannian manifolds using min-max methods.
              </p>
            </div>

            <div className="border-l border-white/20 pl-6 hover:border-white/40 transition-all duration-500">
              <h3 className="text-base md:text-lg font-normal mb-2">
                <a
                  href="https://arxiv.org/abs/2404.09792"
                  target="_blank"
                  className="hover:text-white/80 transition-all duration-500"
                >
                  Lecture Notes on Comparison Geometry
                </a>
              </h3>
              <p className="text-white/40 text-xs md:text-sm mb-2">
                Xinze Li
              </p>
              <p className="text-white/50 text-xs md:text-sm leading-relaxed">
                Comprehensive lecture notes covering fundamental results in comparison geometry,
                including Toponogov's theorem and applications to geometric topology.
              </p>
            </div>
          </div>
        </section>

        {/* Academic Position */}
        <section className="border border-white/10 p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-thin tracking-wider mb-6">
            Academic Position
          </h2>

          <div className="space-y-4">
            <div>
              <p className="text-white/60 text-sm md:text-base">
                Mathematics PhD Student
              </p>
              <p className="text-white/40 text-xs md:text-sm">
                University of Toronto
              </p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-white/40 text-xs md:text-sm">
                <a
                  href="mailto:xbryanli.li@mail.utoronto.ca"
                  className="hover:text-white/80 transition-all duration-500"
                >
                  xbryanli.li@mail.utoronto.ca
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </BlogLayout>
  )
}
