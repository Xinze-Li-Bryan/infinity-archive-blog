export interface BlogPost {
    slug: string
    title: string
    date: string
    excerpt: string
    week: number
    tags: string[]
    status: 'published' | 'draft'
}

export const blogPosts: BlogPost[] = [
    {
        slug: 'week-4-multi-file-revolution',
        title: 'Week 4 Update: Multi-File Revolution - Building the Mathematical IDE of the Future',
        date: '2025-01-28',
        excerpt: 'This week we launched the multi-file system for Infinity Archive. Real-time verification, file management, and auto-save - the IDE is becoming real.',
        week: 4,
        tags: ['development', 'multi-file', 'ide', 'lean4'],
        status: 'published'
    }
]

export function getBlogPosts() {
    return blogPosts.filter(post => post.status === 'published')
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogPost(slug: string) {
    return blogPosts.find(post => post.slug === slug)
}