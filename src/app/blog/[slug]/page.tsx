import { notFound } from 'next/navigation'
import Link from 'next/link'
import BlogLayout from '@/components/blog/BlogLayout'
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
            <article className="space-y-8">
                <div className="space-y-4">
                    <Link href="/blog" className="text-blue-400 hover:text-blue-300">
                        ← Back to Blog
                    </Link>

                    <div className="flex items-center gap-3">
                        <span className="bg-blue-600 text-sm px-3 py-1 rounded-full">
                            Week {post.week}
                        </span>
                        <time className="text-gray-400">{post.date}</time>
                    </div>

                    <h1 className="text-4xl font-bold">{post.title}</h1>

                    <div className="flex gap-2">
                        {post.tags.map(tag => (
                            <span key={tag} className="text-sm bg-gray-700 px-3 py-1 rounded">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="prose prose-invert prose-lg max-w-none">
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h2>🚧 Content Coming Soon</h2>
                        <p>
                            This blog post will contain the detailed development update for {post.title}.
                            We're setting up the infrastructure first, then we'll add the actual content.
                        </p>
                        <p>
                            <strong>What's in this post:</strong><br />
                            • Technical achievements this week<br />
                            • Code samples and architecture decisions<br />
                            • Challenges faced and solutions found<br />
                            • Next week's roadmap
                        </p>
                    </div>
                </div>
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