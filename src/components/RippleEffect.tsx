'use client'

import { useRef, useEffect } from 'react'

interface Ripple {
  x: number
  y: number
  radius: number
  maxRadius: number
  opacity: number
  createdAt: number
}

export default function RippleEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ripplesRef = useRef<Ripple[]>([])
  const animationRef = useRef<number | undefined>(undefined)
  const lastRippleTimeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 设置 canvas 尺寸
    const updateDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    // 鼠标移动监听
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()

      // 节流：每 300ms 最多创建一个涟漪（减少频率）
      if (now - lastRippleTimeRef.current < 300) return

      // 检查鼠标是否在可交互元素上
      const target = e.target as HTMLElement
      const isInteractive = target.closest('a, button, input, textarea, [role="button"]')

      // 只在空白区域创建涟漪
      if (!isInteractive) {
        lastRippleTimeRef.current = now

        ripplesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          radius: 0,
          maxRadius: 80 + Math.random() * 40, // 80-120px
          opacity: 1,
          createdAt: now
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    // 动画循环
    const animate = () => {
      const now = Date.now()

      // 清除画布
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 更新和绘制涟漪
      ripplesRef.current = ripplesRef.current.filter(ripple => {
        const age = now - ripple.createdAt
        const duration = 1500 // 1.5秒消失

        // 计算进度 (0-1)
        const progress = Math.min(age / duration, 1)

        // 涟漪扩散
        ripple.radius = ripple.maxRadius * progress

        // 透明度衰减（先快后慢）
        ripple.opacity = Math.pow(1 - progress, 2)

        // 绘制涟漪（使用高光反色效果）
        ctx.save()

        // 使用 globalCompositeOperation 实现反色效果
        ctx.globalCompositeOperation = 'difference'
        ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.opacity * 0.15})`  // 降低透明度从0.6到0.15
        ctx.lineWidth = 1  // 降低线宽从2到1
        ctx.beginPath()
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
        ctx.stroke()

        // 绘制更细的内圈
        if (progress > 0.2) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.opacity * 0.08})`  // 降低透明度从0.3到0.08
          ctx.lineWidth = 0.5  // 降低线宽从1到0.5
          ctx.beginPath()
          ctx.arc(ripple.x, ripple.y, ripple.radius * 0.7, 0, Math.PI * 2)
          ctx.stroke()
        }

        ctx.restore()

        // 保留未消失的涟漪
        return progress < 1
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', updateDimensions)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40"
      style={{ mixBlendMode: 'difference' }}
    />
  )
}
