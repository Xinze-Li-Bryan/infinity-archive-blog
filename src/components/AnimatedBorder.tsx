'use client'

import { ReactNode, useRef, useEffect, useState } from 'react'

interface AnimatedBorderProps {
  children: ReactNode
  className?: string
  borderRadius?: string
}

export default function AnimatedBorder({
  children,
  className = '',
  borderRadius = '0.5rem'
}: AnimatedBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const animationRef = useRef<number>(0)
  const progressRef = useRef(0)
  const targetProgressRef = useRef(0)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const isHoveredRef = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    // 设置 canvas 尺寸
    const updateDimensions = () => {
      const rect = container.getBoundingClientRect()
      setDimensions({ width: rect.width, height: rect.height })
      canvas.width = rect.width
      canvas.height = rect.height
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    // 鼠标移动监听
    const handleMouseMove = (e: MouseEvent) => {
      if (!isHoveredRef.current) return

      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      mousePositionRef.current = { x, y }

      // 计算目标进度（根据鼠标位置）
      const perimeter = 2 * (rect.width + rect.height)
      let targetProgress = 0

      // 判断鼠标在哪个边上
      const margin = 50
      if (y < margin) {
        // 上边
        targetProgress = x / perimeter
      } else if (x > rect.width - margin) {
        // 右边
        targetProgress = (rect.width + y) / perimeter
      } else if (y > rect.height - margin) {
        // 下边
        targetProgress = (rect.width + rect.height + (rect.width - x)) / perimeter
      } else {
        // 左边
        targetProgress = (2 * rect.width + rect.height + (rect.height - y)) / perimeter
      }

      targetProgressRef.current = targetProgress
    }

    const handleMouseEnter = () => {
      isHoveredRef.current = true
    }

    const handleMouseLeave = () => {
      isHoveredRef.current = false
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('resize', updateDimensions)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const radius = parseFloat(borderRadius)
    const lineLength = 60 // 滑动线条的长度
    const lineWidth = 1 // 线条宽度

    const animate = () => {
      const { width, height } = dimensions
      if (width === 0 || height === 0) return

      // 清除画布
      ctx.clearRect(0, 0, width, height)

      // 平滑过渡进度
      const diff = targetProgressRef.current - progressRef.current
      progressRef.current += diff * 0.1

      // 如果没有悬停，慢速自动循环
      if (!isHoveredRef.current) {
        progressRef.current += 0.0005
        if (progressRef.current > 1) progressRef.current = 0
      }

      // 绘制圆角矩形路径
      const drawRoundedRectPath = () => {
        ctx.beginPath()
        ctx.moveTo(radius, 0)
        ctx.lineTo(width - radius, 0)
        ctx.arcTo(width, 0, width, radius, radius)
        ctx.lineTo(width, height - radius)
        ctx.arcTo(width, height, width - radius, height, radius)
        ctx.lineTo(radius, height)
        ctx.arcTo(0, height, 0, height - radius, radius)
        ctx.lineTo(0, radius)
        ctx.arcTo(0, 0, radius, 0, radius)
        ctx.closePath()
      }

      // 绘制底层边框（与背景同色，几乎不可见）
      drawRoundedRectPath()
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
      ctx.lineWidth = 1
      ctx.stroke()

      // 计算滑动线条的位置
      const perimeter = 2 * (width + height - 2 * radius) + 2 * Math.PI * radius
      const position = progressRef.current * perimeter

      // 绘制滑动线条
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)'
      ctx.lineWidth = lineWidth
      ctx.lineCap = 'round'

      // 计算线条在路径上的起始和结束位置
      const drawLineSegment = (start: number, end: number) => {
        let currentPos = 0

        // 上边
        const topLength = width - 2 * radius
        if (start < currentPos + topLength) {
          const segmentStart = Math.max(0, start - currentPos)
          const segmentEnd = Math.min(topLength, end - currentPos)
          if (segmentEnd > segmentStart) {
            ctx.beginPath()
            ctx.moveTo(radius + segmentStart, 0)
            ctx.lineTo(radius + segmentEnd, 0)
            ctx.stroke()
          }
        }
        currentPos += topLength

        // 右上角弧
        const arcLength = Math.PI * radius / 2
        currentPos += arcLength

        // 右边
        const rightLength = height - 2 * radius
        if (start < currentPos + rightLength && end > currentPos) {
          const segmentStart = Math.max(0, start - currentPos)
          const segmentEnd = Math.min(rightLength, end - currentPos)
          if (segmentEnd > segmentStart) {
            ctx.beginPath()
            ctx.moveTo(width, radius + segmentStart)
            ctx.lineTo(width, radius + segmentEnd)
            ctx.stroke()
          }
        }
        currentPos += rightLength

        // 右下角弧
        currentPos += arcLength

        // 下边
        const bottomLength = width - 2 * radius
        if (start < currentPos + bottomLength && end > currentPos) {
          const segmentStart = Math.max(0, start - currentPos)
          const segmentEnd = Math.min(bottomLength, end - currentPos)
          if (segmentEnd > segmentStart) {
            ctx.beginPath()
            ctx.moveTo(width - radius - segmentStart, height)
            ctx.lineTo(width - radius - segmentEnd, height)
            ctx.stroke()
          }
        }
        currentPos += bottomLength

        // 左下角弧
        currentPos += arcLength

        // 左边
        const leftLength = height - 2 * radius
        if (start < currentPos + leftLength && end > currentPos) {
          const segmentStart = Math.max(0, start - currentPos)
          const segmentEnd = Math.min(leftLength, end - currentPos)
          if (segmentEnd > segmentStart) {
            ctx.beginPath()
            ctx.moveTo(0, height - radius - segmentStart)
            ctx.lineTo(0, height - radius - segmentEnd)
            ctx.stroke()
          }
        }
      }

      drawLineSegment(position, position + lineLength)

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [dimensions, borderRadius])

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ borderRadius }}
    >
      {/* Canvas for animated border */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ borderRadius }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
