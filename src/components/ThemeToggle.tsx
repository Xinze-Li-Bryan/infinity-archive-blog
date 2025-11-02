'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('light')
  const [mounted, setMounted] = useState(false)

  // 初始化：从 localStorage 读取保存的主题
  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null
    if (saved) {
      setTheme(saved)
    }
    setMounted(true)
  }, [])

  // 应用主题效果
  useEffect(() => {
    if (!mounted) return

    // 清理旧的样式和覆盖层
    document.getElementById('theme-styles')?.remove()
    document.getElementById('theme-overlay')?.remove()

    if (theme === 'dark') {
      // 暗色模式：全局反转滤镜（将浅色变成深色）
      document.documentElement.style.filter =
        'invert(1) hue-rotate(180deg) saturate(0.8) brightness(0.9)'
      document.documentElement.style.transition = 'filter 0.3s ease-in-out'

      // PDF/公式/画廊图片反向抵消（保持原色）
      const style = document.createElement('style')
      style.id = 'theme-styles'
      style.textContent = `
        .react-pdf__Page__canvas,
        iframe[title="PDF Preview"],
        .MathJax,
        .katex,
        .gallery-image-container {
          filter: invert(1) hue-rotate(180deg) saturate(1.25) brightness(1.11) !important;
        }
      `
      document.head.appendChild(style)
    } else {
      // 浅色模式：不用滤镜，保持原始浅色背景
      document.documentElement.style.filter = 'none'

      // 添加浅色护眼覆盖层
      const overlay = document.createElement('div')
      overlay.id = 'theme-overlay'
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg,
          rgba(255, 250, 240, 0.3) 0%,
          rgba(255, 248, 235, 0.25) 50%,
          rgba(250, 245, 230, 0.2) 100%
        );
        mix-blend-mode: multiply;
        pointer-events: none;
        z-index: 99999;
      `
      document.body.appendChild(overlay)
    }

    // 保存到 localStorage
    localStorage.setItem('theme', theme)
  }, [theme, mounted])

  // 避免 SSR 不匹配问题
  if (!mounted) {
    return (
      <div className="w-10 h-10 border border-white/20" />
    )
  }

  return (
    <button
      onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
      className="w-10 h-10 border border-white/20
                 hover:border-white/40 hover:bg-white/5
                 transition-all duration-500
                 flex items-center justify-center"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* 图标 */}
      <span className="text-white/60 text-lg transition-all duration-300">
        {theme === 'dark' ? '☀' : '☾'}
      </span>
    </button>
  )
}
