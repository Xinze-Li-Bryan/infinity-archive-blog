import Link from 'next/link'
import BlogLayout from '@/components/blog/BlogLayout'
import { getBlogPosts } from '@/lib/blog'

export default function HomePage() {
  const posts = getBlogPosts()

  return (
    <BlogLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            🌌 Infinity Archive Development Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Real-time updates on building the planetary mathematical computer.
            Follow our journey from prototype to revolution.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Latest Updates</h2>
          <div className="space-y-4">
            {posts.map((post) => (
              <article key={post.slug} className="border-l-4 border-blue-500 pl-4">
                <Link href={`/blog/${post.slug}`} className="block hover:bg-gray-700 p-4 rounded transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-600 text-xs px-2 py-1 rounded">Week {post.week}</span>
                    <time className="text-sm text-gray-400">{post.date}</time>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-300">{post.excerpt}</p>
                  <div className="flex gap-2 mt-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-xs bg-gray-600 px-2 py-1 rounded">{tag}</span>
                    ))}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </BlogLayout>
  )
}