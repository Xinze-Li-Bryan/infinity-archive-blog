"use client"

import { useState, useEffect } from 'react'

interface AnimatedBorderModuleProps {
    children: React.ReactNode
    delay?: number
    className?: string
}

export default function AnimatedBorderModule({ children, delay = 0, className = "" }: AnimatedBorderModuleProps) {
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