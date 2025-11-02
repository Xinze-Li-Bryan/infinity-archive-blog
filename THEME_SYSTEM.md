# InftyChi Theme System
## 亮色/暗色模式切换系统

---

## 🎨 设计理念

**护眼优先的智能反转系统**

不是简单的黑白反转，而是经过精心调校的多层滤镜组合，确保：
- 降低蓝光刺激（sepia 暖色调）
- 减少对比度（saturate + brightness 调整）
- 保持色彩准确性（PDF/公式二次反转）
- 温暖的阅读氛围（渐变覆盖层）

---

## 📐 核心参数配置

### 暗色模式（默认）
```css
background: #000000 (纯黑)
foreground: #FFFFFF (纯白)
filter: none
```

### 亮色模式（护眼反转）

#### 1. 全局反转滤镜
```css
filter: invert(1) hue-rotate(180deg) saturate(0.8) brightness(0.9) sepia(0.15);
transition: filter 0.3s ease-in-out;
```

**参数详解：**
- `invert(1)` - 完全反转黑白
- `hue-rotate(180deg)` - 抵消 invert 产生的色相反转
- `saturate(0.8)` - 降低饱和度 20%，柔和色彩
- `brightness(0.9)` - 降低亮度 10%，避免刺眼
- `sepia(0.15)` - 添加 15% 棕褐色调，温暖护眼

#### 2. PDF/公式反向抵消
```css
.react-pdf__Page__canvas,
iframe[title="PDF Preview"],
.MathJax,
.katex {
  filter: invert(1) hue-rotate(180deg) saturate(1.25) brightness(1.11) sepia(0) !important;
}
```

**为什么需要二次反转？**
- PDF 文档通常是白底黑字设计
- 一次全局反转后变成黑底白字（不符合预期）
- 再次反转让 PDF 恢复白底黑字

**补偿参数：**
- `saturate(1.25)` - 补偿全局 0.8 的损失（0.8 × 1.25 = 1.0）
- `brightness(1.11)` - 补偿全局 0.9 的损失（0.9 × 1.11 ≈ 1.0）
- `sepia(0)` - 移除全局 0.15 的棕褐色

#### 3. 护眼覆盖层
```css
background: linear-gradient(135deg,
  rgba(255, 250, 240, 0.3) 0%,      /* 象牙白 30% */
  rgba(255, 248, 235, 0.25) 50%,    /* 米色 25% */
  rgba(250, 245, 230, 0.2) 100%     /* 淡米色 20% */
);
mix-blend-mode: multiply;
pointer-events: none;
z-index: 99999;
```

**渐变色彩分析：**
- 左上到右下 135° 对角线渐变
- 暖黄色调（HSL 39°-45°）
- 透明度递减（30% → 20%）
- 正片叠底混合模式，创造纸质书质感

---

## 🎯 使用方式

### 组件位置
- 文件：`src/components/ThemeToggle.tsx`
- 位置：页面右上角固定位置
- 响应式：`top-4 md:top-8 right-4 md:right-8`

### 交互设计
- **按钮样式**：圆角开关样式
- **滑块动画**：300ms 平滑过渡
- **图标指示**：◐ (暗色) / ◯ (亮色)
- **悬停效果**：边框变亮 `border-white/40`

### 状态持久化
- 使用 `localStorage` 保存用户选择
- 键名：`theme`
- 值：`'dark'` 或 `'light'`
- 页面刷新后自动恢复上次设置

---

## 🔬 技术实现

### React Hook 流程
```typescript
1. 初始化 (useEffect)
   ├─ 从 localStorage 读取保存的主题
   ├─ 设置 mounted 状态（避免 SSR 不匹配）
   └─ 应用保存的主题

2. 主题切换 (useEffect)
   ├─ 检查 mounted 状态
   ├─ 清理旧的样式和覆盖层
   ├─ 应用全局滤镜 (light mode)
   ├─ 注入 PDF/公式样式 (light mode)
   ├─ 创建护眼覆盖层 (light mode)
   └─ 保存到 localStorage

3. 按钮点击
   └─ 切换 theme 状态 (dark ↔ light)
```

### 性能优化
- **硬件加速**：CSS filter 使用 GPU 处理
- **避免重排**：只触发重绘，不触发布局重排
- **平滑过渡**：0.3s ease-in-out 过渡
- **条件渲染**：mounted 状态避免闪烁

---

## 📱 浏览器兼容性

| 浏览器 | filter | mix-blend-mode | 支持度 |
|--------|--------|----------------|--------|
| Chrome 90+ | ✓ | ✓ | 完美 |
| Firefox 88+ | ✓ | ✓ | 完美 |
| Safari 14+ | ✓ | ✓ | 完美 |
| Edge 90+ | ✓ | ✓ | 完美 |

**降级策略：**
- 不支持 filter → 保持暗色模式
- 不支持 mix-blend-mode → 覆盖层失效（仍可用）

---

## 🎨 视觉效果示例

### 颜色转换
```
暗色模式                    亮色模式
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
背景 #000000        →      米白 #F5F3EE
文字 #FFFFFF/60     →      暖黑 #0A0805/54
边框 white/10       →      深灰 gray/10
紫色卡片保持色相    →      柔和紫色调
```

### 护眼效果对比
```
传统反转              InftyChi 亮色模式
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
纯白刺眼背景    →    温暖米白背景
色彩过饱和      →    柔和自然色彩
蓝光强烈        →    暖色调护眼
PDF 显示错误    →    PDF 正确显示
```

---

## 🛠️ 自定义调整

### 更护眼（更暖）
```css
sepia(0.15) → sepia(0.25)
覆盖层透明度 +0.05
```

### 更清爽（更冷）
```css
sepia(0.15) → sepia(0.05)
覆盖层透明度 -0.05
```

### 更亮
```css
brightness(0.9) → brightness(1.0)
```

### 更暗
```css
brightness(0.9) → brightness(0.8)
```

### 色彩更鲜艳
```css
saturate(0.8) → saturate(0.9)
PDF saturate(1.25) → saturate(1.35)
```

---

## 📊 参数速查表

| 参数 | 全局滤镜 | PDF反转 | 作用 |
|------|---------|---------|------|
| invert | 1 | 1 | 黑白反转 |
| hue-rotate | 180deg | 180deg | 色相恢复 |
| saturate | 0.8 ↓ | 1.25 ↑ | 饱和度调节 |
| brightness | 0.9 ↓ | 1.11 ↑ | 亮度调节 |
| sepia | 0.15 ↑ | 0 ↓ | 棕褐色调 |

---

## 🎓 使用示例

### 在其他页面使用
```tsx
import ThemeToggle from '@/components/ThemeToggle'

export default function AnyPage() {
  return (
    <div>
      {/* 固定在右上角 */}
      <div className="fixed top-4 md:top-8 right-4 md:right-8 z-50">
        <ThemeToggle />
      </div>

      {/* 页面内容 */}
      <main>...</main>
    </div>
  )
}
```

### 手动控制主题
```javascript
// 切换到亮色模式
localStorage.setItem('theme', 'light')
window.location.reload()

// 切换到暗色模式
localStorage.setItem('theme', 'dark')
window.location.reload()
```

---

## 🔍 故障排查

### 问题：切换后页面闪烁
**原因**：SSR 渲染时主题未同步
**解决**：使用 `mounted` 状态延迟渲染

### 问题：PDF 显示错误
**原因**：未应用二次反转滤镜
**解决**：检查 `#theme-styles` 是否成功注入

### 问题：覆盖层遮挡点击
**原因**：未设置 `pointer-events: none`
**解决**：已在组件中设置，检查 z-index

### 问题：颜色过于鲜艳/暗淡
**原因**：参数未调优
**解决**：参考上方"自定义调整"部分微调参数

---

## 📚 设计哲学

> "护眼不只是调亮度，而是重现纸质书的温暖质感。"

传统的亮色模式往往只是简单的黑白反转，导致：
- ❌ 纯白背景刺眼
- ❌ 蓝光强烈，长时间阅读疲劳
- ❌ 色彩过饱和，视觉疲劳
- ❌ PDF/图片显示错误

InftyChi 亮色模式通过多层滤镜组合：
- ✅ 米白温暖背景（降低蓝光）
- ✅ 柔和自然色彩（降低饱和度）
- ✅ 适中亮度（避免刺眼）
- ✅ PDF 正确显示（智能二次反转）
- ✅ 纸质书质感（渐变覆盖层）

---

**版本**: v1.0
**最后更新**: 2025-11-01
**设计**: InftyChi Design System
