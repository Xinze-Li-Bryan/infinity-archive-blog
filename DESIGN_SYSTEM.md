# InftyChi Design System
## 完整设计规范文档

---

## 📐 核心设计哲学

**极简主义 + 数学美学 + 赛博道教**

- **Less is Infinite**: 通过极度克制的元素创造无限的深度感
- **Mathematical Precision**: 每个间距、字号、透明度都经过精确计算
- **Eastern Mysticism Meets Western Logic**: 易经卦象与形式化数学的融合
- **Computational Zen**: 机器与人类意识交汇的数字禅意

---

## 🎨 色彩系统

### 主色调
```css
/* 基础色 - 纯黑白对比 */
--color-background: #000000    /* 纯黑背景 */
--color-foreground: #FFFFFF    /* 纯白前景 */

/* 透明度层级 - 精确的白色透明度梯度 */
--opacity-ghost: 0.10          /* 幽灵元素 - 背景微光 */
--opacity-whisper: 0.20        /* 耳语元素 - 边框、分割线 */
--opacity-muted: 0.30          /* 静音元素 - 次要信息 */
--opacity-soft: 0.40           /* 柔和元素 - 辅助文本 */
--opacity-medium: 0.50         /* 中等元素 - 描述文字 */
--opacity-clear: 0.60          /* 清晰元素 - 正文内容 */
--opacity-bright: 0.80         /* 明亮元素 - 强调文本 */
--opacity-vivid: 0.90          /* 鲜明元素 - 悬停状态 */
--opacity-full: 1.00           /* 完全不透明 - 标题 */
```

### 功能色彩
```css
/* 梯度背景 - 微妙的色彩暗示 */
--gradient-indigo: from-indigo-950/10 via-black to-black    /* 首页 - 无限感 */
--gradient-purple: from-purple-950/10 via-black to-blue-950/10  /* Playground - 进化感 */
--gradient-slate: from-slate-950/20 via-black to-black      /* Prototype - 原初感 */
--gradient-tai: from-blue-950/10 via-black to-yellow-950/10 /* Nexus - 天地交泰 */

/* 产品色彩标识 */
--color-euclid: purple-200     /* 超级智能 - 紫色系 */
--color-beta: blue-200         /* Beta测试 - 蓝色系 */
--color-warning: yellow-200    /* 实验警告 - 黄色系 */
```

---

## 🔤 字体系统

### 字体族
```typescript
// 唯一字体 - JetBrains Mono
font-family: 'JetBrains Mono', monospace

// 为什么选择 JetBrains Mono:
// 1. 等宽字体 - 代码与数学符号的最佳载体
// 2. 清晰的字符区分 - 1/I/l, 0/O 完全可辨
// 3. 现代感与技术感 - 符合计算数学的气质
// 4. 优秀的连字支持 - 增强数学符号的可读性
```

### 字号层级
```css
/* 移动端优先，桌面端放大 */
--text-xs: 0.625rem   /* 10px - 标签、版权信息 */
--text-sm: 0.75rem    /* 12px - 辅助文字、说明 */
--text-base: 0.875rem /* 14px - 正文内容（移动端） */
--text-lg: 1rem       /* 16px - 正文内容（桌面端） */
--text-xl: 1.25rem    /* 20px - 小标题 */
--text-2xl: 1.5rem    /* 24px - 卡片标题 */
--text-3xl: 1.875rem  /* 30px - 页面子标题 */
--text-4xl: 2.25rem   /* 36px - 移动端主标题 */
--text-5xl: 3rem      /* 48px - 桌面端主标题 */
--text-6xl: 3.75rem   /* 60px - 超大标题 */

/* 响应式策略 */
标题: text-4xl sm:text-5xl md:text-6xl
正文: text-sm md:text-lg
辅助: text-xs md:text-sm
微型: text-[10px] md:text-xs
```

### 字重系统
```css
font-weight: 100  /* Thin - 不使用 */
font-weight: 200  /* ExtraLight - 不使用 */
font-weight: 300  /* Light - 主要使用，创造轻盈感 */
font-weight: 400  /* Regular - 正文 */
font-weight: 500  /* Medium - 强调文本 */
font-weight: 600+ /* 不使用 - 避免过重 */

/* 应用原则 */
h1, h2, h3: font-thin (font-weight: 300)
body: font-normal (font-weight: 400)
emphasis: font-medium (font-weight: 500)
```

### 字间距
```css
/* Letter Spacing - 创造呼吸感 */
tracking-tight: -0.025em   /* 不使用 */
tracking-normal: 0em       /* 正文 */
tracking-wide: 0.025em     /* 轻微扩展 */
tracking-wider: 0.05em     /* 标题、按钮 */
tracking-widest: 0.1em     /* 标签、卦象标识 */

/* 特殊场景 */
tracking-[0.2em]: 极度扩展 - 卦象说明
tracking-[0.3em]: 最大扩展 - 顶部标识
tracking-[0.5em]: 超级扩展 - 特殊强调
```

---

## 📏 间距系统

### Tailwind 间距倍数
```css
/* 基础单位：4px (0.25rem) */
0: 0px
1: 4px    /* 极微小 */
2: 8px    /* 微小 */
3: 12px   /* 小 */
4: 16px   /* 常用基础 */
6: 24px   /* 中等 */
8: 32px   /* 大 */
12: 48px  /* 很大 */
16: 64px  /* 极大 */
20: 80px  /* 超大 */
24: 96px  /* 页面级 */
32: 128px /* 区块级 */

/* 响应式间距模式 */
移动端优先: p-4 md:p-8
章节间距: mb-12 md:mb-20
页面边距: px-4 md:px-8
顶部边距: py-20 md:py-24
```

### 布局间距规则
```css
/* 卡片内边距 */
小卡片: p-4 md:p-6
标准卡片: p-6 md:p-8

/* 元素间距 */
列表项间距: space-y-2
卡片间距: gap-6 md:gap-8
网格间距: gap-4 md:gap-6

/* 分区间距 */
章节分隔: mt-12 md:mt-20, mb-16 md:mb-24
顶部底部: pt-12 md:pt-16, pb-16 md:pb-20
```

---

## 🎭 视觉效果

### 边框系统
```css
/* 边框宽度 - 永远使用 1px */
border-width: 1px  /* 唯一宽度 */

/* 边框颜色透明度 */
border-white/10: 幽灵边框 - 背景分隔
border-white/20: 标准边框 - 卡片默认
border-white/30: 中等边框 - 轻微强调
border-white/40: 明显边框 - 悬停状态

/* 特殊颜色边框 */
border-purple-900/20: EUCLID 卡片
border-blue-900/20: BETA 卡片
border-yellow-900/30: 警告信息
```

### 背景效果
```css
/* 纯黑背景层 */
bg-black: 绝对黑色背景

/* 白色透明背景 */
bg-white/5: 极微弱高光 - PLAYGROUND
bg-white/10: 微弱高光 - 填充按钮

/* 彩色透明背景 */
bg-purple-950/5: EUCLID 卡片底色
bg-blue-950/5: BETA 卡片底色
bg-yellow-950/10: 警告信息底色

/* 渐变背景 */
bg-gradient-radial: 径向渐变 - 首页
bg-gradient-to-br: 左上到右下 - PLAYGROUND
bg-gradient-to-b: 垂直渐变 - NEXUS
```

### 阴影系统
```css
/* 不使用传统阴影 */
/* 通过透明度和边框创造层次 */

/* 替代方案 */
层次1: border-white/10 + bg-black
层次2: border-white/20 + bg-white/5
层次3: border-white/40 + bg-white/10
```

---

## 🎬 动画系统

### 过渡时长
```css
/* 标准时长 */
duration-300: 快速响应 - 按钮悬停、颜色变化
duration-500: 标准过渡 - 边框、透明度
duration-700: 慢速过渡 - 布局变化、卡片
duration-2000: 超慢过渡 - 页面加载淡入

/* 缓动函数 */
transition-all: 所有属性（谨慎使用）
transition-colors: 仅颜色
transition-opacity: 仅透明度
transition-transform: 仅变形
```

### 页面加载动画
```typescript
// 淡入 + 上移模式
const [mounted, setMounted] = useState(false)

useEffect(() => {
  setMounted(true)
}, [])

// 应用
className={`transition-all duration-2000 ${
  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
}`}

// 延迟分层
delay-300: 第一层元素
delay-600: 第二层元素
delay-900: 第三层元素
delay-1200: 第四层元素
```

### 交互动画
```css
/* 悬停效果 */
hover:border-white/40      /* 边框变亮 */
hover:text-white/80        /* 文字变亮 */
hover:bg-white/10          /* 背景变亮 */
hover:tracking-[0.2em]     /* 字间距扩展 */

/* 点击效果 */
active:scale-95            /* 桌面端轻微缩小 */
active:scale-[0.99]        /* 移动端更微妙 */

/* 组合效果 - 按钮 */
transition-all duration-700
hover:border-white/40 hover:bg-white/10
active:scale-[0.99] md:active:scale-100
```

### 自定义动画
```css
/* 脉冲指示器 - LIVE 状态 */
animate-ping: 持续脉冲扩散

/* 粒子系统 */
Canvas 动画 - 60fps
- 球面映射到平面
- 鼠标交互产生"剑气"效果
- 太极图案隐现（0-1循环）
- 微尘般的连续大小分布
```

---

## 🧩 组件模式

### 按钮
```tsx
// 标准按钮
<button className="px-6 md:px-8 py-2 md:py-3
                   text-xs md:text-sm tracking-wider
                   border border-white/20 text-white/60
                   hover:border-white/40 hover:text-white/80
                   transition-all duration-500
                   active:scale-95">
  BUTTON TEXT →
</button>

// 填充按钮
<button className="px-6 md:px-8 py-2 md:py-3
                   text-xs md:text-sm tracking-wider
                   bg-white/10 border border-white/20 text-white/60
                   hover:bg-white/20 hover:border-white/40 hover:text-white/80
                   transition-all duration-500">
  FILLED BUTTON
</button>
```

### 卡片
```tsx
// 标准卡片
<div className="border border-white/10 p-6 md:p-8
                hover:border-white/30
                transition-all duration-500">
  {/* 内容 */}
</div>

// 高亮卡片（PLAYGROUND）
<div className="bg-white/5 border border-white/20 p-6 md:p-8
                hover:bg-white/10 hover:border-white/40
                transition-all duration-700">
  {/* 内容 */}
</div>

// 彩色卡片（EUCLID）
<div className="border border-purple-900/20 p-6 md:p-8
                bg-purple-950/5
                hover:border-purple-900/40
                transition-all duration-700">
  {/* 内容 */}
</div>
```

### 标题层级
```tsx
// 页面主标题
<h1 className="text-4xl sm:text-5xl md:text-6xl
               font-thin tracking-wider
               mb-3 md:mb-4">
  TITLE
</h1>

// 副标题
<p className="text-white/40 text-xs md:text-sm
              tracking-widest">
  SUBTITLE
</p>

// 卡片标题
<h2 className="text-xl md:text-2xl
               font-thin tracking-wider">
  CARD TITLE
</h2>

// 小标签
<p className="text-[9px] md:text-[10px]
              text-white/30
              tracking-[0.3em] md:tracking-[0.5em]">
  LABEL
</p>
```

### 导航返回
```tsx
<Link href="/">
  <div className="fixed top-4 md:top-8 left-4 md:left-8 z-50
                  cursor-pointer group">
    <div className="flex items-center gap-2 md:gap-3">
      <span className="text-white/40
                       group-hover:text-white/80
                       transition-all">←</span>
      <span className="text-white/40
                       group-hover:text-white/80
                       transition-all
                       text-xs md:text-sm
                       tracking-wider">
        BACK
      </span>
    </div>
  </div>
</Link>
```

---

## 🔣 特殊元素

### 易经卦象
```tsx
// 右上角卦象标识
<div className="fixed top-4 md:top-8 right-4 md:right-8 z-40">
  <span className="text-2xl md:text-3xl text-white/20">䷊</span>
  <p className="text-[9px] md:text-[10px]
                text-white/20
                tracking-[0.2em] md:tracking-[0.3em]
                mt-1 md:mt-2">
    HARMONY
  </p>
</div>

// 常用卦象
䷊ 泰卦 (HARMONY) - Nexus 页面
䷬ 萃卦 (GATHERING) - Join 页面
```

### 数学符号
```tsx
// 无穷符号 ∞
// 常用数学符号: ∫ ∑ ∇ ∂
// 特殊标记: → ✉

// 应用示例
<span className="text-purple-200/20">∞</span>  // EUCLID
<span className="text-white/30 mr-2">→</span>  // 列表项
```

### 引用文字
```tsx
// 底部哲学引言
<p className="text-white/30 text-[10px] md:text-xs
              italic tracking-wider">
  &ldquo;Quote text here.&rdquo;
</p>

// 中文 + 英文格式
<p className="text-white/30 text-center
              text-[10px] md:text-xs
              tracking-wider">
  「卦辞」 — ENGLISH TRANSLATION
</p>
```

---

## 📱 响应式设计

### 断点系统
```css
/* Tailwind 默认断点 */
sm: 640px   /* 小平板 */
md: 768px   /* 平板/小桌面（主要断点）*/
lg: 1024px  /* 桌面 */
xl: 1280px  /* 大桌面 */

/* 设计策略 */
移动端优先: 默认样式为移动端
主要断点: md（768px）- 大部分调整发生在这里
次要断点: sm - 仅在必要时使用
大屏断点: lg/xl - 很少使用

/* 响应式模式 */
文字: text-xs md:text-sm
间距: p-4 md:p-8
网格: grid-cols-1 md:grid-cols-2
显示: hidden md:block
```

### 移动端优化
```css
/* 触摸目标 - 最小 44x44px */
min-height: py-2 (8px * 2 + line-height)

/* 点击效果差异化 */
active:scale-[0.99]              /* 移动端 */
md:active:scale-100              /* 桌面端取消 */

/* 字号调整 */
移动端基础: text-sm (12px)
桌面端基础: md:text-base (14px)
```

---

## 🎨 主题系统

### 暗色模式（默认）
```css
background: #000000 (纯黑)
foreground: #FFFFFF (纯白)
透明度系统: white/10 到 white/100
```

### 亮色模式（反转）
```css
/* 全局反转 + 护眼滤镜 */
filter: invert(1) hue-rotate(180deg)
        saturate(0.8) brightness(0.9) sepia(0.15)

/* 护眼覆盖层 */
background: linear-gradient(135deg,
  rgba(255, 250, 240, 0.3) 0%,
  rgba(255, 248, 235, 0.25) 50%,
  rgba(250, 245, 230, 0.2) 100%
)
mix-blend-mode: multiply

/* PDF/公式反向抵消 */
.react-pdf__Page__canvas,
.MathJax,
.katex {
  filter: invert(1) hue-rotate(180deg)
          saturate(1.25) brightness(1.11) sepia(0)
}
```

---

## 🎯 设计原则

### 1. 极简主义
- 每个元素必须有明确目的
- 删除一切装饰性元素
- 让内容本身成为视觉焦点
- 空白即内容

### 2. 层次构建
- 不通过颜色，而通过透明度创造层次
- 不通过阴影，而通过边框创造深度
- 不通过粗细，而通过间距创造节奏

### 3. 呼吸感
- 充足的行间距（leading-relaxed）
- 适度的字间距（tracking-wider）
- 宽松的元素间距（space-y-4）
- 留白即设计语言

### 4. 精确性
- 所有间距基于 4px 倍数
- 所有透明度基于 0.1 倍数
- 所有过渡时长基于 100ms 倍数
- 数学般的精确

### 5. 响应式哲学
- 移动端优先，体验无损
- 渐进增强，桌面端更丰富
- 触摸友好，交互直观
- 性能优先，动画节制

### 6. 文化融合
- 易经卦象 - 东方神秘主义
- 形式化数学 - 西方逻辑美学
- 赛博美学 - 未来科技感
- 禅意极简 - 当下的纯粹

---

## 🚀 性能优化

### 字体加载
```typescript
// 使用 next/font 优化
import { JetBrains_Mono } from "next/font/google"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: 'swap',  // 字体交换策略
})
```

### 动画性能
```css
/* 优先使用 GPU 加速属性 */
transform: translateY()  ✓
opacity                  ✓
filter                   ✓

/* 避免触发重排的属性 */
width, height            ✗
margin, padding          ✗
top, left               ✗

/* Canvas 粒子系统 */
- 使用 requestAnimationFrame
- 控制粒子数量（移动端减少）
- 离屏时暂停动画
```

### 图片优化
```typescript
// 使用 next/image
import Image from 'next/image'

<Image
  src="/path"
  width={800}
  height={600}
  quality={90}
  loading="lazy"
/>
```

---

## 📦 技术栈

```json
{
  "framework": "Next.js 15",
  "language": "TypeScript",
  "styling": "Tailwind CSS",
  "fonts": "Google Fonts (JetBrains Mono)",
  "animation": "CSS Transitions + Canvas",
  "icons": "Unicode Symbols (无图标库)"
}
```

---

## 🎓 使用指南

### 快速开始
```bash
# 1. 安装依赖
npm install next@latest react@latest tailwindcss

# 2. 配置 Tailwind
npx tailwindcss init -p

# 3. 添加字体
import { JetBrains_Mono } from "next/font/google"

# 4. 复制样式类
# 从本文档中复制需要的组件样式
```

### 常用场景

**创建新页面**
```tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function NewPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 背景 */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-radial
                        from-indigo-950/10 via-black to-black" />
      </div>

      {/* 返回导航 */}
      <Link href="/">
        <div className="fixed top-4 md:top-8 left-4 md:left-8 z-50
                        cursor-pointer group">
          <span className="text-white/40 group-hover:text-white/80">←</span>
          <span className="text-white/40 group-hover:text-white/80">BACK</span>
        </div>
      </Link>

      {/* 主内容 */}
      <div className="relative min-h-screen px-4 md:px-8 py-20 md:py-24">
        <div className={`transition-all duration-2000 ${
          mounted ? 'opacity-100' : 'opacity-0'
        }`}>
          {/* 你的内容 */}
        </div>
      </div>
    </div>
  )
}
```

**创建卡片网格**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
  {items.map((item) => (
    <div key={item.id}
         className="border border-white/10 p-6 md:p-8
                    hover:border-white/30 transition-all duration-500">
      <h3 className="text-xl md:text-2xl font-thin tracking-wider mb-4">
        {item.title}
      </h3>
      <p className="text-white/60 text-sm md:text-base leading-relaxed">
        {item.description}
      </p>
    </div>
  ))}
</div>
```

---

## 📝 版本历史

**v1.0** - 2025.01
- 建立完整设计系统
- JetBrains Mono 字体
- 黑白极简美学
- 易经元素融入
- Canvas 粒子系统
- 响应式设计

---

## 🌟 设计资产

### Unicode 符号库
```
数学: ∞ ∫ ∑ ∇ ∂ ≈ ≠ ≤ ≥ ∈ ∉ ⊂ ⊃ ∪ ∩
箭头: → ← ↑ ↓ ⇒ ⇐ ⇔ ↗ ↘
符号: • · ◦ ○ ● ★ ☆ ✓ ✗ ✉ ⚡
易经: ䷀ ䷁ ䷊ ䷋ ䷌䷍ ䷎ ䷏ ䷬
```

### 色值速查
```
纯黑: #000000
纯白: #FFFFFF
白10%: rgba(255,255,255,0.1)
白20%: rgba(255,255,255,0.2)
白30%: rgba(255,255,255,0.3)
白40%: rgba(255,255,255,0.4)
白60%: rgba(255,255,255,0.6)
白80%: rgba(255,255,255,0.8)
```

---

**"Form follows function. Simplicity is complexity resolved."**

—— InftyChi Design Philosophy
