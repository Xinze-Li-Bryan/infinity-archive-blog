# InftyChi Personal Homepage - Project Structure

---

## 📁 文件结构

```
infinity-archive-blog/
├── src/
│   ├── app/
│   │   ├── page.tsx              # 主页 - 个人简介 + 导航卡片
│   │   ├── research/
│   │   │   └── page.tsx          # 学术研究页 - 传统数学研究
│   │   ├── future/
│   │   │   └── page.tsx          # 未来数学页 - 机器出版与人机协作
│   │   ├── layout.tsx            # 根布局 - JetBrains Mono 字体
│   │   ├── globals.css           # 全局样式 - InftyChi 设计系统
│   │   └── favicon.ico           # 网站图标
│   └── components/
│       ├── blog/
│       │   └── BlogLayout.tsx    # 页面布局容器
│       └── ThemeToggle.tsx       # 主题切换组件
├── public/
│   └── profile-photo.jpg         # 个人头像
├── DESIGN_SYSTEM.md              # 设计系统完整文档
├── THEME_SYSTEM.md               # 主题切换系统文档
└── STRUCTURE.md                  # 项目结构说明（本文件）
```

---

## 🏗️ 页面架构

### 1. 主页 (`/`)
**文件**: `src/app/page.tsx`

**内容**:
- 个人简介（头像 + 姓名 + 简短描述）
- 占位文本：`[更个人化的介绍将在这里...]`
- 两个导航卡片：
  - **Mathematical Research** → `/research`
  - **Future of Mathematics** → `/future`

**设计**:
- 极简布局
- 2列网格导航卡片（移动端 1 列）
- 悬停效果：边框变亮 + 背景高光

---

### 2. 学术研究页 (`/research`)
**文件**: `src/app/research/page.tsx`

**内容**:
- 研究方向详细介绍：
  - Min-Max Theory
  - Comparison Geometry
  - Geometric Measure Theory
- 发表论文列表（带链接）
- 学术职位信息

**设计**:
- 标准白色边框卡片
- 左上角返回按钮 `← BACK`
- 右上角主题切换按钮

---

### 3. 未来数学页 (`/future`)
**文件**: `src/app/future/page.tsx`

**内容**:
- 机器出版愿景
- InftyChi 项目介绍：
  - Multi-File IDE
  - Real-time Verification
  - Collaborative Mathematics
- 机器出版范式：
  - Verifiable by Default
  - Composable Knowledge
  - AI-Assisted Discovery
- 哲学引言

**设计**:
- 紫色高亮卡片 (`bg-purple-950/5`, `border-purple-900/20`)
- 蓝色哲学引言区块
- InftyChi Demo 按钮
- 左上角返回按钮 `← BACK`

---

## �� 设计系统

### 色彩
- **背景**: 纯黑 `#000000`
- **前景**: 纯白 `#FFFFFF`
- **透明度梯度**: 10% → 20% → 30% → 40% → 60% → 80% → 100%
- **特殊色**:
  - 紫色系：`purple-900`, `purple-950` (未来数学主题)
  - 蓝色系：`blue-950` (哲学引言)

### 字体
- **唯一字体**: JetBrains Mono (等宽)
- **字重**:
  - 标题: `font-thin` (300)
  - 正文: `font-normal` (400)
  - 强调: `font-medium` (500)

### 间距
- **移动端**: `p-4`, `gap-6`, `space-y-12`
- **桌面端**: `md:p-8`, `md:gap-8`, `md:space-y-20`
- **页面边距**: `px-4 md:px-8 py-20 md:py-24`

### 动画
- **页面加载**: 2000ms 淡入 + 上移
- **交互**: 500ms 边框/颜色变化
- **主题切换**: 300ms 滤镜过渡

---

## 🔧 组件说明

### BlogLayout
**位置**: `src/components/blog/BlogLayout.tsx`

**功能**:
- 提供统一的页面容器
- 纯黑背景 + 白色文字
- 居中内容（max-width: 4xl）
- 响应式边距

**用法**:
```tsx
<BlogLayout>
  {children}
</BlogLayout>
```

---

### ThemeToggle
**位置**: `src/components/ThemeToggle.tsx`

**功能**:
- 切换亮色/暗色模式
- localStorage 持久化
- 圆角开关样式
- 图标指示：◐ (暗) / ◯ (亮)

**滤镜**:
- **亮色模式**: `invert(1) hue-rotate(180deg) saturate(0.8) brightness(0.9) sepia(0.15)`
- **护眼覆盖层**: 135° 渐变 + multiply 混合
- **PDF/公式二次反转**: 保持正确显示

**用法**:
```tsx
<div className="fixed top-4 md:top-8 right-4 md:right-8 z-50">
  <ThemeToggle />
</div>
```

---

## 🎯 导航系统

### 主页导航卡片
两个大型可点击卡片，引导用户进入不同主题页面：

**1. Mathematical Research**
- 路径: `/research`
- 风格: 标准白色边框
- 描述: 传统科研范式

**2. Future of Mathematics**
- 路径: `/future`
- 风格: 紫色高亮边框 + 背景
- 描述: 机器出版 · 人机协作

### 子页面返回
所有子页面左上角固定返回按钮：
```tsx
<Link href="/">
  <div className="fixed top-4 md:top-8 left-4 md:left-8 z-50">
    ← BACK
  </div>
</Link>
```

---

## 📱 响应式断点

| 断点 | 宽度 | 用途 |
|------|------|------|
| 默认 | < 768px | 移动端 |
| md | ≥ 768px | 平板/桌面 |

**策略**: 移动端优先，桌面端增强

---

## 🚀 技术栈

```json
{
  "framework": "Next.js 15",
  "language": "TypeScript",
  "styling": "Tailwind CSS v4",
  "fonts": "Google Fonts (JetBrains Mono)",
  "deployment": "Vercel"
}
```

---

## 📝 内容更新指南

### 更新主页个人简介
编辑 `src/app/page.tsx:52-54`:
```tsx
<p className="text-white/50 text-sm md:text-base leading-relaxed italic">
  [更个人化的介绍将在这里...]
</p>
```
替换为你的个人描述。

### 添加新的论文
编辑 `src/app/research/page.tsx`，在 Publications 部分添加：
```tsx
<div className="border-l border-white/20 pl-6 hover:border-white/40 transition-all duration-500">
  <h3 className="text-base md:text-lg font-normal mb-2">
    <a href="YOUR_LINK" target="_blank" className="hover:text-white/80 transition-all duration-500">
      论文标题
    </a>
  </h3>
  <p className="text-white/40 text-xs md:text-sm mb-2">作者</p>
  <p className="text-white/50 text-xs md:text-sm leading-relaxed">摘要</p>
</div>
```

### 更新 InftyChi 项目信息
编辑 `src/app/future/page.tsx`，修改 InftyChi Project 部分的内容。

---

## 🎨 设计规范参考

- **完整设计系统**: 见 `DESIGN_SYSTEM.md`
- **主题切换系统**: 见 `THEME_SYSTEM.md`

---

## 📊 页面流程图

```
         [主页 /]
            |
    ┌───────┴───────┐
    ↓               ↓
[/research]    [/future]
学术研究      未来数学
    |               |
    └───── ← ──────┘
      返回主页
```

---

## 🔍 SEO 元数据

**位置**: `src/app/layout.tsx`

```typescript
export const metadata: Metadata = {
  title: "InftyChi - Xinze Li",
  description: "Mathematical research and computational philosophy",
}
```

---

## ✨ 特色功能

1. **极简设计** - 纯黑白美学，JetBrains Mono 等宽字体
2. **护眼模式** - 智能亮色模式滤镜，温暖阅读体验
3. **响应式** - 移动端优先，完美适配所有屏幕
4. **平滑动画** - 2秒页面加载淡入，500ms 交互过渡
5. **卡片导航** - 大型可点击卡片，引导用户探索
6. **双主题呈现** - 传统研究 vs 未来愿景，平行展示

---

**版本**: v1.0
**最后更新**: 2025-11-01
**作者**: Xinze Li
