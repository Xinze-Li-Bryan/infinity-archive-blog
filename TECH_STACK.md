# InftyChi Personal Homepage - Tech Stack Configuration

---

## 📦 核心技术栈

### 框架与库
```json
"next": "15.4.4"        // Next.js App Router
"react": "19.1.0"       // React 19 with Server Components
"react-dom": "19.1.0"   // React DOM
"typescript": "^5"      // TypeScript 5
```

### 样式系统
```json
"tailwindcss": "^4"                // Tailwind CSS 4
"@tailwindcss/postcss": "^4"       // Tailwind PostCSS Plugin
```

### Markdown 处理
```json
"@mdx-js/loader": "^3.1.0"        // MDX Loader
"@mdx-js/react": "^3.1.0"         // MDX React Integration
"@next/mdx": "^15.4.4"            // Next.js MDX Plugin
"remark-gfm": "^4.0.1"            // GitHub Flavored Markdown
"rehype-highlight": "^7.0.2"      // 代码高亮
```

### 开发工具
```json
"eslint": "^9"                    // ESLint 9 (Flat Config)
"eslint-config-next": "15.4.4"    // Next.js ESLint Config
"@eslint/eslintrc": "^3"          // ESLint RC Support
```

---

## ⚙️ 配置文件

### 1. next.config.ts
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

export default nextConfig;
```

**说明**:
- TypeScript 配置文件格式
- 支持 MDX 文件扩展名
- 极简配置，使用 Next.js 默认优化

---

### 2. tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  }
}
```

**关键配置**:
- `strict: true` - 严格类型检查
- `paths: { "@/*": ["./src/*"] }` - 路径别名
- `incremental: true` - 增量编译
- `jsx: "preserve"` - 保留 JSX 给 Next.js 处理

---

### 3. eslint.config.mjs
```javascript
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
```

**说明**:
- ESLint 9 Flat Config 格式
- 继承 Next.js 官方配置
- 忽略构建输出和依赖

---

### 4. postcss.config.mjs
```javascript
const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;
```

**说明**:
- Tailwind CSS 4 新插件
- 极简配置
- 自动优化 CSS

---

### 5. package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev -H 0.0.0.0",
    "build": "next build",
    "start": "next start -p ${PORT:-3000}",
    "lint": "eslint"
  }
}
```

**命令说明**:
- `npm run dev` - 开发服务器（绑定所有网络接口）
- `npm run build` - 生产构建
- `npm run start` - 启动生产服务器（支持环境变量端口）
- `npm run lint` - ESLint 检查

---

## 🎨 自定义动画系统

### 动画关键帧 (globals.css)

**上升动画** - 元素从底部上升到顶部
```css
@keyframes rise {
  0% { transform: translateY(100vh); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-100vh); opacity: 0; }
}

.animate-rise {
  animation: rise 15s linear infinite;
}
```

**下落动画** - 元素从顶部下落到底部
```css
@keyframes fall {
  0% { transform: translateY(-100vh); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
}

.animate-fall {
  animation: fall 20s linear infinite;
}
```

**漂浮动画** - 元素上下轻微漂浮
```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
```

**慢速脉冲** - 透明度缓慢脉动
```css
@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}
```

### 使用示例
```tsx
{/* 上升粒子 */}
<div className="animate-rise" />

{/* 下落粒子 */}
<div className="animate-fall" />

{/* 漂浮元素 */}
<div className="animate-float" />

{/* 慢速脉冲 */}
<div className="animate-pulse-slow" />
```

---

## 🏗️ 项目结构

```
infinity-archive-blog/
├── src/
│   ├── app/
│   │   ├── page.tsx             # 主页
│   │   ├── layout.tsx           # 根布局
│   │   ├── globals.css          # 全局样式 + 动画
│   │   ├── research/            # 学术研究页
│   │   └── future/              # 未来数学页
│   └── components/
│       ├── blog/
│       │   └── BlogLayout.tsx   # 页面布局
│       └── ThemeToggle.tsx      # 主题切换
├── public/
│   └── profile-photo.jpg        # 头像
├── next.config.ts               # Next.js 配置
├── tsconfig.json                # TypeScript 配置
├── eslint.config.mjs            # ESLint 配置
├── postcss.config.mjs           # PostCSS 配置
├── package.json                 # 依赖和脚本
├── DESIGN_SYSTEM.md             # 设计系统文档
├── THEME_SYSTEM.md              # 主题系统文档
├── STRUCTURE.md                 # 项目结构文档
└── TECH_STACK.md                # 技术栈文档（本文件）
```

---

## 🚀 开发流程

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
# 访问: http://localhost:3000
# 局域网访问: http://YOUR_IP:3000
```

### 3. 代码检查
```bash
npm run lint
```

### 4. 生产构建
```bash
npm run build
```

### 5. 启动生产服务器
```bash
npm run start
# 或者指定端口
PORT=8080 npm run start
```

---

## 📝 代码规范

### TypeScript
- ✅ 使用严格模式 (`strict: true`)
- ✅ 避免使用 `any`
- ✅ 为所有函数参数和返回值添加类型
- ✅ 使用接口定义组件 Props

### React
- ✅ 使用函数组件 + Hooks
- ✅ Client Components 使用 `'use client'`
- ✅ 避免不必要的 re-render
- ✅ 使用 `useEffect` 处理副作用

### 样式
- ✅ 优先使用 Tailwind 工具类
- ✅ 自定义动画写在 `globals.css`
- ✅ 遵循设计系统的透明度层级
- ✅ 使用响应式前缀 (`md:`, `sm:`)

---

## 🎯 性能优化

### Next.js 优化
- ✅ 图片使用 `next/image`
- ✅ 字体使用 `next/font`
- ✅ 动态导入重型组件
- ✅ 服务端组件优先

### CSS 优化
- ✅ Tailwind JIT 编译
- ✅ 移除未使用的样式
- ✅ PostCSS 自动优化
- ✅ 生产构建体积 < 50KB

### 动画性能
- ✅ 使用 `transform` 和 `opacity`（GPU 加速）
- ✅ 避免动画 `width`、`height` 等属性
- ✅ 使用 `will-change` 提示浏览器
- ✅ Canvas 动画使用 `requestAnimationFrame`

---

## 🔧 常见问题

### Q: TypeScript 报错 `Cannot find module '@/...'`
**A**: 检查 tsconfig.json 中的 `paths` 配置：
```json
"paths": { "@/*": ["./src/*"] }
```

### Q: Tailwind 样式不生效
**A**:
1. 检查 `globals.css` 中的 `@import "tailwindcss"`
2. 重启开发服务器
3. 清理缓存: `rm -rf .next`

### Q: ESLint 报错
**A**:
```bash
npm run lint
# 查看具体错误，按提示修复
```

### Q: 动画卡顿
**A**:
- 使用 Chrome DevTools Performance 分析
- 检查是否动画了非 GPU 加速属性
- 减少同时运行的动画数量

---

## 📚 参考资源

- [Next.js 文档](https://nextjs.org/docs)
- [React 文档](https://react.dev)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [TypeScript 文档](https://www.typescriptlang.org/docs)

---

**版本**: 0.1.0
**最后更新**: 2025-11-01
**框架**: Next.js 15 + React 19 + TypeScript 5
