"use client"

import Link from 'next/link'
import BlogLayout from '@/components/blog/BlogLayout'
import { useState, useEffect } from 'react'

// Animated Border Module (复用)
const AnimatedBorderModule = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
    const [borderVisible, setBorderVisible] = useState(false)
    const [borderProgress, setBorderProgress] = useState(0)

    useEffect(() => {
        const delayTimer = setTimeout(() => {
            setBorderVisible(true)
            const progressTimer = setInterval(() => {
                setBorderProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(progressTimer)
                        return 100
                    }
                    return prev + 2
                })
            }, 30)
        }, delay)

        return () => clearTimeout(delayTimer)
    }, [delay])

    return (
        <div className={`bg-black font-mono h-full relative ${className}`}>
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-0 left-0 h-0.5 bg-white transition-all duration-100"
                    style={{
                        width: borderProgress <= 25 ? `${borderProgress * 4}%` : '100%',
                        opacity: borderVisible ? 1 : 0
                    }}
                />
                <div
                    className="absolute top-0 right-0 w-0.5 bg-white transition-all duration-100"
                    style={{
                        height: borderProgress > 25 && borderProgress <= 50 ? `${(borderProgress - 25) * 4}%` : borderProgress > 50 ? '100%' : '0%',
                        opacity: borderVisible ? 1 : 0
                    }}
                />
                <div
                    className="absolute bottom-0 right-0 h-0.5 bg-white transition-all duration-100"
                    style={{
                        width: borderProgress > 50 && borderProgress <= 75 ? `${(borderProgress - 50) * 4}%` : borderProgress > 75 ? '100%' : '0%',
                        opacity: borderVisible ? 1 : 0
                    }}
                />
                <div
                    className="absolute bottom-0 left-0 w-0.5 bg-white transition-all duration-100"
                    style={{
                        height: borderProgress > 75 ? `${(borderProgress - 75) * 4}%` : '0%',
                        opacity: borderVisible ? 1 : 0
                    }}
                />
                {borderProgress >= 100 && (
                    <div className="absolute inset-0 border border-white/20 animate-pulse" />
                )}
            </div>
            <div className="p-6 relative z-10">
                {children}
            </div>
        </div>
    )
}

export default function AboutPage() {
    return (
        <BlogLayout>
            <div className="space-y-8 font-mono">
                {/* Personal Info */}
                <AnimatedBorderModule delay={300}>
                    <div className="grid grid-cols-12 gap-6">
                        {/* Photo Placeholder */}
                        <div className="col-span-3">
                            <div className="aspect-square bg-white/10 border border-white/20 flex items-center justify-center">
                                <div className="text-center text-white/40">
                                    <div className="text-4xl mb-2">∞</div>
                                    <div className="text-xs">PHOTO_PLACEHOLDER</div>
                                </div>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="col-span-9 space-y-4">
                            <div>
                                <h1 className="text-3xl font-black tracking-wider mb-2">XINZE_LI (李昕泽)</h1>
                                <div className="text-sm text-white/60 space-y-1">
                                    <div>POSITION: MATHEMATICS_PHD_STUDENT</div>
                                    <div>INSTITUTION: UNIVERSITY_OF_TORONTO</div>
                                    <div>RESEARCH_FOCUS: MIN_MAX_THEORY | COMPARISON_GEOMETRY</div>
                                    <div>SPECIALIZATION: GEOMETRIC_MEASURE_THEORY</div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/10">
                                <p className="text-white/60 leading-relaxed">
                                    DOCTORAL_STUDENT_IN_MATHEMATICS_SPECIALIZING_IN_MIN_MAX_THEORY_
                                    WITHIN_GEOMETRIC_MEASURE_THEORY_AND_COMPARISON_GEOMETRY._
                                    RESEARCH_FOCUSES_ON_VARIATIONAL_METHODS_AND_THEIR_APPLICATIONS_
                                    TO_GEOMETRIC_ANALYSIS.
                                </p>
                            </div>
                        </div>
                    </div>
                </AnimatedBorderModule>

                {/* Publications */}
                <AnimatedBorderModule delay={600}>
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 bg-white text-black flex items-center justify-center text-lg font-black">
                                χ
                            </div>
                            <div>
                                <div className="text-xl font-black">PAPERS_AND_NOTES</div>
                                <div className="text-xs text-white/40">ARXIV_PUBLICATIONS</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="border-l-2 border-white/20 pl-6 py-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="bg-white text-black text-xs px-2 py-1 font-black">PAPER_01</span>
                                    <span className="text-xs text-white/40">CO_AUTHORED</span>
                                </div>
                                <h3 className="font-black mb-2">
                                    <a
                                        href="https://arxiv.org/abs/2205.13694"
                                        target="_blank"
                                        className="hover:text-white/60 transition-colors"
                                    >
                                        ON_THE_EQUIDISTRIBUTION_OF_CLOSED_GEODESICS_AND_GEODESIC_NETS
                                    </a>
                                </h3>
                                <p className="text-white/40 text-sm">AUTHORS: XINZE_LI, BRUNO_STAFFA</p>
                            </div>

                            <div className="border-l-2 border-white/20 pl-6 py-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="bg-white text-black text-xs px-2 py-1 font-black">NOTES_01</span>
                                    <span className="text-xs text-white/40">LECTURE_SERIES</span>
                                </div>
                                <h3 className="font-black mb-2">
                                    <a
                                        href="https://arxiv.org/abs/2404.09792"
                                        target="_blank"
                                        className="hover:text-white/60 transition-colors"
                                    >
                                        LECTURE_NOTES_ON_COMPARISON_GEOMETRY
                                    </a>
                                </h3>
                                <p className="text-white/40 text-sm">AUTHOR: XINZE_LI</p>
                            </div>
                        </div>
                    </div>
                </AnimatedBorderModule>

                {/* Current Project */}
                <AnimatedBorderModule delay={900}>
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 bg-white text-black flex items-center justify-center text-lg font-black">
                                ∞
                            </div>
                            <div>
                                <div className="text-xl font-black">SIDE_PROJECT</div>
                                <div className="text-xs text-white/40">CURRENT_DEVELOPMENT</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-white/60 leading-relaxed">
                                CO_FOUNDER_AND_FULL_STACK_DEVELOPER_OF_INFINITY_ARCHIVE,_
                                A_BROWSER_BASED_MATHEMATICAL_IDE_FOR_LEAN4_WITH_DECENTRALIZED_
                                COLLABORATION_FEATURES._THE_GOAL_IS_TO_MAKE_FORMAL_MATHEMATICS_
                                MORE_ACCESSIBLE_AND_INTUITIVE_FOR_RESEARCHERS.
                            </p>

                            <div className="grid grid-cols-3 gap-4 text-center">
                                <Link
                                    href="https://inftychi.vercel.app"
                                    target="_blank"
                                    className="bg-white text-black p-3 font-black hover:bg-white/90 transition-colors"
                                >
                                    LIVE_DEMO
                                </Link>
                                <Link
                                    href="https://github.com/Xinze-Li-Bryan/inftychi"
                                    target="_blank"
                                    className="border border-white p-3 font-black hover:bg-white/10 transition-colors"
                                >
                                    SOURCE_CODE
                                </Link>
                                <Link
                                    href="/blog"
                                    className="border border-white p-3 font-black hover:bg-white/10 transition-colors"
                                >
                                    DEV_LOG
                                </Link>
                            </div>
                        </div>
                    </div>
                </AnimatedBorderModule>

                {/* Contact */}
                <AnimatedBorderModule delay={1200}>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 bg-white text-black flex items-center justify-center text-lg font-black">
                                @
                            </div>
                            <div>
                                <div className="text-xl font-black">CONTACT_PROTOCOL</div>
                                <div className="text-xs text-white/40">COMMUNICATION_CHANNEL</div>
                            </div>
                        </div>

                        <div className="border-l-2 border-white/20 pl-6 py-4">
                            <div className="text-sm">
                                EMAIL: <span className="text-white">xbryanli.li@mail.utoronto.ca</span>
                            </div>
                        </div>
                    </div>
                </AnimatedBorderModule>
            </div>
        </BlogLayout>
    )
}