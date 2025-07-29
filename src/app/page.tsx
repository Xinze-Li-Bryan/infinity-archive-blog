"use client"

import Link from 'next/link'
import BlogLayout from '@/components/blog/BlogLayout'
import AnimatedBorderModule from '@/components/blog/AnimatedBorderModule'
import { getBlogPosts } from '@/lib/blog'

export default function HomePage() {
  const recentPosts = getBlogPosts().slice(0, 3)

  return (
    <BlogLayout>
      <div className="space-y-12 font-mono">
        {/* Personal Introduction */}
        <AnimatedBorderModule delay={300}>
          <div className="flex gap-8">
            <div className="w-32 h-32 border border-white/20 flex-shrink-0 overflow-hidden">
              <img
                src="/profile-photo.jpg"
                alt="Xinze Li"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-black tracking-wider mb-2">XINZE_LI (李昕泽)</h1>
                <div className="text-white/60 space-y-1">
                  <div>MATHEMATICS_PHD_STUDENT, UNIVERSITY_OF_TORONTO</div>
                  <div className="text-white/40 text-sm">
                    MIN_MAX_THEORY • COMPARISON_GEOMETRY • GEOMETRIC_MEASURE_THEORY
                  </div>
                </div>
              </div>

              <p className="text-white/80 leading-relaxed">
                Doctoral student specializing in min-max theory within geometric measure theory
                and comparison geometry. Research focuses on variational methods and their
                applications to geometric analysis.
              </p>

              <div className="text-sm text-white/60">
                EMAIL: <span className="text-white">xbryanli.li@mail.utoronto.ca</span>
              </div>
            </div>
          </div>
        </AnimatedBorderModule>

        {/* Mathematical Research */}
        <AnimatedBorderModule delay={600}>
          <div className="space-y-6">
            <h2 className="text-2xl font-black">MATHEMATICAL_RESEARCH</h2>

            <div className="space-y-4">
              <div className="border-l-4 border-white/20 pl-6">
                <h3 className="text-lg font-bold">
                  <a
                    href="https://arxiv.org/abs/2205.13694"
                    target="_blank"
                    className="text-white hover:text-blue-400 transition-colors"
                  >
                    On the equidistribution of closed geodesics and geodesic nets
                  </a>
                </h3>
                <p className="text-white/60 text-sm">Xinze Li, Bruno Staffa</p>
              </div>

              <div className="border-l-4 border-white/20 pl-6">
                <h3 className="text-lg font-bold">
                  <a
                    href="https://arxiv.org/abs/2404.09792"
                    target="_blank"
                    className="text-white hover:text-blue-400 transition-colors"
                  >
                    Lecture Notes on Comparison Geometry
                  </a>
                </h3>
                <p className="text-white/60 text-sm">Xinze Li</p>
              </div>
            </div>
          </div>
        </AnimatedBorderModule>

        {/* Infinity Archive Project */}
        <AnimatedBorderModule delay={800}>
          <div className="flex gap-4">
            <Link
              href="https://inftychi.vercel.app"
              target="_blank"
              className="bg-white text-black px-6 py-3 font-black hover:bg-white/90 transition-colors"
            >
              DEMO
            </Link>
            <Link
              href="https://github.com/Xinze-Li-Bryan/inftychi"
              target="_blank"
              className="border border-white px-6 py-3 font-black hover:bg-white/10 transition-colors"
            >
              GITHUB
            </Link>
            <Link
              href="/blog"
              className="border border-white px-6 py-3 font-black hover:bg-white/10 transition-colors"
            >
              DEV_LOG
            </Link>
            <Link
              href="https://x.com/fuguixomega"
              target="_blank"
              className="border border-white px-6 py-3 font-black hover:bg-white/10 transition-colors"
            >
              X / TWITTER
            </Link>
          </div>
        </AnimatedBorderModule>

        {/* Recent Updates */}
        {recentPosts.length > 0 && (
          <AnimatedBorderModule delay={1000}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black">RECENT_UPDATES</h2>
                <Link
                  href="/blog"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  VIEW_ALL →
                </Link>
              </div>

              <div className="space-y-3">
                {recentPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
                    <div className="border-l-4 border-white/20 pl-6 py-3 hover:border-white/60 hover:bg-white/5 transition-all duration-200">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="bg-white text-black text-xs px-2 py-1 font-black">
                          {post.version}
                        </span>
                        <time className="text-white/60 text-sm">{post.date}</time>
                      </div>
                      <h3 className="text-lg font-bold">{post.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </AnimatedBorderModule>
        )}
      </div>
    </BlogLayout>
  )
}