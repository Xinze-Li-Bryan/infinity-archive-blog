export interface BlogPost {
    slug: string
    title: string
    date: string
    excerpt: string
    version: string
    tags: string[]
    status: 'published' | 'draft'
}

export const blogPosts: BlogPost[] = [
    {
        slug: 'week-4-multi-file-revolution',
        title: 'Multi-File Revolution - Building the Mathematical IDE of the Future',
        date: '2025-07-26',
        excerpt: 'Multi-file system launch with real-time verification, file management, and auto-save.',
        version: 'v1.4.0',
        tags: ['development', 'multi-file', 'ide', 'lean4'],
        status: 'published'
    }
]

export function getBlogPosts() {
    return blogPosts.filter(post => post.status === 'published')
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogPost(slug: string) {
    return blogPosts.find(post => post.slug === slug) || null
}

// 以后添加新博客只需要在这里加一个条目
export function addBlogPost(post: BlogPost) {
    blogPosts.unshift(post) // 添加到开头
}