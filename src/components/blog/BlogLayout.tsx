"use client"

import Link from 'next/link'
import { ReactNode, useState, useEffect } from 'react'

interface BlogLayoutProps {
    children: ReactNode
}

// Typewriter Effect
const TypewriterText = ({ text, speed = 100, delay = 0, onComplete }: { text: string; speed?: number; delay?: number; onComplete?: () => void }) => {
    const [displayText, setDisplayText] = useState("")
    const [currentIndex, setCurrentIndex] = useState(0)
    const [started, setStarted] = useState(false)

    useEffect(() => {
        if (delay > 0) {
            const delayTimer = setTimeout(() => setStarted(true), delay)
            return () => clearTimeout(delayTimer)
        } else {
            setStarted(true)
        }
    }, [delay])

    useEffect(() => {
        if (started && currentIndex < text.length) {
            const timer = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex])
                setCurrentIndex(prev => prev + 1)
            }, speed)
            return () => clearTimeout(timer)
        } else if (started && currentIndex === text.length && onComplete) {
            onComplete()
        }
    }, [currentIndex, text, speed, started, onComplete])

    return (
        <span>
            {displayText}
            {started && currentIndex < text.length && (
                <span className="animate-pulse">|</span>
            )}
        </span>
    )
}

// System Status
const SystemStatus = () => {
    const [uptime, setUptime] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setUptime(prev => prev + 1)
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="font-mono text-xs text-white/60 space-y-1">
            <div>BLOG_UPTIME: {Math.floor(uptime / 60)}:{(uptime % 60).toString().padStart(2, '0')}</div>
            <div>STATUS: OPERATIONAL</div>
            <div>LAST_UPDATE: LIVE</div>
        </div>
    )
}

export default function BlogLayout({ children }: BlogLayoutProps) {
    const [titleComplete, setTitleComplete] = useState(false)

    return (
        <main className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Scan Line Effect */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent animate-pulse"></div>
            </div>

            <div className="relative z-10">
                {/* Header */}
                <header className="border-b border-white/20 p-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center justify-between">
                            <div className="font-mono">
                                <Link href="/" className="text-2xl font-black tracking-wider">
                                    <TypewriterText text="∞χ_DEVELOPMENT_LOG" speed={80} />
                                </Link>
                                <div className="text-xs text-white/40 mt-1">
                                    <TypewriterText
                                        text="MATHEMATICAL_RESEARCH_PROTOCOL"
                                        speed={60}
                                        delay={1500}
                                        onComplete={() => setTitleComplete(true)}
                                    />
                                </div>
                            </div>

                            <nav className="font-mono text-sm space-x-6">
                                <Link href="/" className="hover:text-white/60 transition-colors">HOME</Link>
                                <Link href="/blog" className="hover:text-white/60 transition-colors">BLOG</Link>
                                <Link href="/about" className="hover:text-white/60 transition-colors">ABOUT</Link>
                                <Link
                                    href="https://inftychi.vercel.app"
                                    target="_blank"
                                    className="hover:text-white/60 transition-colors"
                                >
                                    LIVE_DEMO
                                </Link>
                            </nav>
                        </div>

                        {/* Status Bar */}
                        <div className="flex items-center gap-4 text-xs font-mono mt-4 pt-4 border-t border-white/10">
                            <span className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                OPERATIONAL
                            </span>
                            <span className="text-white/40">|</span>
                            <span>DEVELOPMENT_ACTIVE</span>
                            <span className="text-white/40">|</span>
                            <span>REAL_TIME_UPDATES</span>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="max-w-6xl mx-auto p-8">
                    <div className="grid grid-cols-12 gap-6">
                        {/* Content */}
                        <div className="col-span-9">
                            {children}
                        </div>

                        {/* Sidebar */}
                        <div className="col-span-3">
                            <div className="bg-black border border-white/20 p-6 font-mono">
                                <div className="text-xs text-white/40 mb-4">SYSTEM_STATUS:</div>
                                <SystemStatus />

                                <div className="mt-6 pt-4 border-t border-white/10">
                                    <div className="text-xs text-white/40 mb-2">QUICK_ACCESS:</div>
                                    <div className="space-y-2 text-xs">
                                        <Link href="/blog" className="block hover:text-white/60">→ ALL_POSTS</Link>
                                        <Link href="/about" className="block hover:text-white/60">→ RESEARCHER_INFO</Link>
                                        <Link href="https://inftychi.vercel.app" target="_blank" className="block hover:text-white/60">→ LIVE_SYSTEM</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="border-t border-white/20 mt-16 p-8">
                    <div className="max-w-6xl mx-auto font-mono text-xs text-white/40">
                        <div className="flex justify-between items-center">
                            <div>BUILDING_THE_PLANETARY_MATHEMATICAL_COMPUTER</div>
                            <div>©2025_INFINITY_ARCHIVE_PROTOCOL</div>
                        </div>
                    </div>
                </footer>
            </div>
        </main>
    )
}