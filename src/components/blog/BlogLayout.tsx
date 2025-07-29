import Link from 'next/link'
import { ReactNode } from 'react'

interface BlogLayoutProps {
    children: ReactNode
}

export default function BlogLayout({ children }: BlogLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <header className="border-b border-gray-700">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="text-2xl font-bold">
                            ∞χ Infinity Archive Blog
                        </Link>
                        <nav className="space-x-6">
                            <Link href="/" className="hover:text-blue-400">Home</Link>
                            <Link href="/blog" className="hover:text-blue-400">Blog</Link>
                            <Link href="https://inftychi.vercel.app" target="_blank" className="hover:text-blue-400">
                                Live Demo
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8">
                {children}
            </main>

            <footer className="border-t border-gray-700 mt-16">
                <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-400">
                    <p>Building the planetary mathematical computer, one commit at a time.</p>
                </div>
            </footer>
        </div>
    )
}