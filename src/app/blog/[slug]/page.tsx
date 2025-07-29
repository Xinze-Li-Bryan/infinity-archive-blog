import { notFound } from 'next/navigation'
import Link from 'next/link'
import BlogLayout from '@/components/blog/BlogLayout'
import AnimatedBorderModule from '@/components/blog/AnimatedBorderModule'
import { getBlogPost, getBlogPosts } from '@/lib/blog'

interface BlogPostPageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params
    const post = getBlogPost(slug)

    if (!post) {
        notFound()
    }

    return (
        <BlogLayout>
            <article className="space-y-8 font-mono">
                {/* Navigation */}
                <AnimatedBorderModule delay={200}>
                    <div className="flex items-center justify-between">
                        <Link href="/blog" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                            <span>←</span>
                            <span>RETURN_TO_LOG_ARCHIVE</span>
                        </Link>
                        <div className="text-xs text-white/40">
                            PROTOCOL_STATUS: PUBLISHED
                        </div>
                    </div>
                </AnimatedBorderModule>

                {/* Article Header */}
                <AnimatedBorderModule delay={400}>
                    <div className="space-y-6">
                        {/* Meta Info */}
                        <div className="flex items-center gap-4">
                            <span className="bg-white text-black text-sm px-3 py-1 font-black">
                                WEEK_{post.week}
                            </span>
                            <time className="text-sm text-white/40">{post.date}</time>
                            <div className="flex gap-2">
                                {post.tags.map(tag => (
                                    <span key={tag} className="text-xs bg-white/10 px-2 py-1 text-white/60">
                                        {tag.toUpperCase()}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl font-black tracking-wider leading-tight">
                            {post.title.toUpperCase()}
                        </h1>

                        {/* Entry Info */}
                        <div className="flex items-center gap-6 text-xs text-white/40 pt-4 border-t border-white/10">
                            <span>ENTRY_TYPE: DEVELOPMENT_LOG</span>
                            <span>CLASSIFICATION: PUBLIC</span>
                            <span>VERIFICATION: COMPLETE</span>
                        </div>
                    </div>
                </AnimatedBorderModule>

                {/* Content */}
                <AnimatedBorderModule delay={600}>
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-8 h-8 bg-white text-black flex items-center justify-center text-lg font-black">
                                ∞
                            </div>
                            <div>
                                <div className="text-lg font-black">LOG_CONTENT</div>
                                <div className="text-xs text-white/40">DEVELOPMENT_UPDATE</div>
                            </div>
                        </div>

                        <div className="space-y-4 text-white/80 leading-relaxed">
                            <div className="bg-white/5 border border-white/10 p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-4 h-4 bg-white/20"></div>
                                    <span className="text-sm font-black">CONTENT_UNDER_CONSTRUCTION</span>
                                </div>

                                <p className="mb-4">
                                    THIS_LOG_ENTRY_WILL_CONTAIN_THE_DETAILED_DEVELOPMENT_UPDATE_FOR_{" "}
                                    <span className="text-white font-black">{post.title.toUpperCase()}</span>.
                                    INFRASTRUCTURE_SETUP_IN_PROGRESS.
                                </p>

                                <div className="space-y-2 text-sm">
                                    <div className="border-l-2 border-white/20 pl-4">
                                        <span className="text-white/60">SECTION_01:</span> TECHNICAL_ACHIEVEMENTS_THIS_WEEK
                                    </div>
                                    <div className="border-l-2 border-white/20 pl-4">
                                        <span className="text-white/60">SECTION_02:</span> CODE_SAMPLES_AND_ARCHITECTURE_DECISIONS
                                    </div>
                                    <div className="border-l-2 border-white/20 pl-4">
                                        <span className="text-white/60">SECTION_03:</span> CHALLENGES_FACED_AND_SOLUTIONS_FOUND
                                    </div>
                                    <div className="border-l-2 border-white/20 pl-4">
                                        <span className="text-white/60">SECTION_04:</span> NEXT_WEEK_ROADMAP
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedBorderModule>

                {/* Footer */}
                <AnimatedBorderModule delay={800}>
                    <div className="flex items-center justify-between">
                        <div className="text-xs text-white/40">
                            LOG_ENTRY_ID: {post.slug.toUpperCase()}
                        </div>
                        <div className="flex gap-4 text-xs">
                            <Link href="/blog" className="text-white/60 hover:text-white transition-colors">
                                ← PREVIOUS_ENTRIES
                            </Link>
                            <Link href="/about" className="text-white/60 hover:text-white transition-colors">
                                RESEARCHER_INFO →
                            </Link>
                        </div>
                    </div>
                </AnimatedBorderModule>
            </article>
        </BlogLayout>
    )
}

export async function generateStaticParams() {
    const posts = getBlogPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}