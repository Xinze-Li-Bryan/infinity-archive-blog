import Link from 'next/link'
import BlogLayout from '@/components/blog/BlogLayout'
import { getBlogPosts } from '@/lib/blog'

export default function BlogPage() {
    const posts = getBlogPosts()

    return (
        <BlogLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold mb-4">Development Blog</h1>
                    <p className="text-gray-300">
                        Weekly updates on Infinity Archive development. From code to vision.
                    </p>
                </div>

                <div className="space-y-6">
                    {posts.map((post) => (
                        <article key={post.slug} className="bg-gray-800 p-6 rounded-lg">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="bg-blue-600 text-sm px-3 py-1 rounded-full">
                                    Week {post.week}
                                </span>
                                <time className="text-gray-400">{post.date}</time>
                            </div>

                            <Link href={`/blog/${post.slug}`}>
                                <h2 className="text-2xl font-semibold mb-3 hover:text-blue-400 transition-colors">
                                    {post.title}
                                </h2>
                            </Link>

                            <p className="text-gray-300 mb-4">{post.excerpt}</p>

                            <div className="flex items-center justify-between">
                                <div className="flex gap-2">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="text-xs bg-gray-700 px-2 py-1 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="text-blue-400 hover:text-blue-300 font-medium"
                                >
                                    Read More →
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </BlogLayout>
    )
}