"use client"

import { ReactNode } from 'react'

interface BlogLayoutProps {
    children: ReactNode
}

export default function BlogLayout({ children }: BlogLayoutProps) {
    return (
        <main className="min-h-screen bg-black text-white">
            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 md:px-8 pb-20 md:pb-24">
                {children}
            </div>
        </main>
    )
}