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

      <div className={`space-y-12 md:space-y-20 transition-all duration-2000 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        {/* Page Title */}
        <section className="border border-white/10 p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-thin tracking-wider mb-4">
            Future of Mathematics
          </h1>
          <p className="text-white/40 text-xs md:text-sm tracking-widest">
            机器出版 · 人机协作 · Machine Publishing & Human-AI Collaboration
          </p>
        </section>

        {/* Vision */}
        <section className="border border-white/10 p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-thin tracking-wider mb-6">
            Vision
          </h2>

          <div className="space-y-4 text-white/60 text-sm md:text-base leading-relaxed">
            <p>
              Mathematics is entering a new era where formal verification and machine learning
              converge to create a collaborative ecosystem between human mathematicians and AI systems.
            </p>
            <p>
              The future of mathematical research lies not in replacing human creativity,
              but in augmenting it with computational tools that can verify, explore, and
              discover at scales previously impossible.
            </p>
          </div>
        </section>

        {/* InftyChi Project */}
        <section className="border border-white/10 p-6 md:p-8 bg-purple-950/5">
          <h2 className="text-xl md:text-2xl font-thin tracking-wider mb-6">
            InftyChi Project
          </h2>

          <div className="space-y-6">
            <p className="text-white/60 text-sm md:text-base leading-relaxed">
              A web-based platform for formalized mathematics using Lean 4,
              designed to make formal verification accessible and collaborative.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-base md:text-lg font-normal mb-2 text-white/80">
                  Multi-File IDE
                </h3>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed">
                  Professional development environment in the browser.
                  Create, organize, and verify complex mathematical projects with multiple files.
                </p>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-normal mb-2 text-white/80">
                  Real-time Verification
                </h3>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed">
                  Instant feedback from the Lean proof assistant.
                  See your proofs verified in real-time as you type.
                </p>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-normal mb-2 text-white/80">
                  Collaborative Mathematics
                </h3>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed">
                  Build on the work of others. Share verified mathematical knowledge
                  in a global, machine-readable repository.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <a
                href="https://inftychi.vercel.app"
                target="_blank"
                className="inline-block px-6 md:px-8 py-2 md:py-3 text-xs md:text-sm tracking-wider
                           bg-white/10 border border-purple-900/20 text-white/60
                           hover:bg-white/20 hover:border-purple-900/40 hover:text-white/80
                           transition-all duration-500"
              >
                Try InftyChi →
              </a>
            </div>
          </div>
        </section>

        {/* Machine Publishing Paradigm */}
        <section className="border border-white/10 p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-thin tracking-wider mb-6">
            Machine Publishing
          </h2>

          <div className="space-y-6">
            <p className="text-white/60 text-sm md:text-base leading-relaxed">
              A new paradigm where mathematical knowledge is published in machine-verifiable formats,
              enabling unprecedented levels of reproducibility and collaboration.
            </p>

            <div className="space-y-4">
              <div className="border-l border-white/20 pl-6">
                <h3 className="text-base md:text-lg font-normal mb-2 text-white/80">
                  Verifiable by Default
                </h3>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed">
                  Every theorem comes with a machine-checkable proof.
                  No more gaps, errors, or ambiguities.
                </p>
              </div>

              <div className="border-l border-white/20 pl-6">
                <h3 className="text-base md:text-lg font-normal mb-2 text-white/80">
                  Composable Knowledge
                </h3>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed">
                  Build complex theories by composing verified components.
                  Reuse and extend the work of the entire mathematical community.
                </p>
              </div>

              <div className="border-l border-white/20 pl-6">
                <h3 className="text-base md:text-lg font-normal mb-2 text-white/80">
                  AI-Assisted Discovery
                </h3>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed">
                  Machine learning systems can search the space of formal proofs,
                  suggesting lemmas and proof strategies to human mathematicians.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophical Note */}
        <section className="border border-white/10 p-6 md:p-8 bg-blue-950/5">
          <p className="text-white/50 text-xs md:text-sm italic leading-relaxed text-center">
            "The future of mathematics is not human versus machine,
            but human and machine working together to expand
            the frontiers of mathematical knowledge."
          </p>
        </section>
      </div>
    </BlogLayout>
  )
}
