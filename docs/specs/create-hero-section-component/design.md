# Heroセクションコンポーネント設計書

## 1. コンポーネント構造

### 1.1 ファイル構成

```
src/
  components/
    Hero.astro          # メインコンポーネント
    HeroNav.astro       # ナビゲーション部分
  types/
    hero.ts            # 型定義
```

### 1.2 コンポーネント階層

```
<Hero>
  <section> <!-- フルスクリーンコンテナ -->
    <div> <!-- 画像コンテナ -->
      <img /> <!-- メイン画像 -->
      <HeroNav /> <!-- ナビゲーション -->
    </div>
  </section>
</Hero>
```

## 2. 型定義

```typescript
// src/types/hero.ts
export interface HeroProps {
  image: {
    src: string;
    alt: string;
    srcset?: string;
    sizes?: string;
  };
  navigation?: Array<{
    label: string;
    href: string;
  }>;
}
```

## 3. スタイリング設計

### 3.1 Hero.astro のクラス構成

```html
<!-- セクション: フルスクリーン + PC余白 -->
<section class="bg-navy relative h-screen w-full lg:p-2.5">
  <!-- 画像コンテナ: 親要素いっぱい + 中央配置 -->
  <div
    class="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg lg:rounded-xl"
  >
    <!-- メイン画像: カバー + 中央固定 -->
    <img class="absolute inset-0 h-full w-full object-cover object-center" />

    <!-- ナビゲーション: 絶対配置 -->
    <HeroNav class="absolute top-4 right-4 md:top-6 md:right-6" />
  </div>
</section>
```

### 3.2 レスポンシブ対応

- **モバイル/タブレット（< 1024px）**:
  - padding なし、画面いっぱい
  - border-radius なし
- **デスクトップ（>= 1024px）**:
  - padding: 10px (p-2.5)
  - border-radius追加で角丸効果

## 4. 画像最適化設計

### 4.1 srcset/sizes 属性

```html
<img
  srcset="
    /images/hero-mobile.jpg   768w,
    /images/hero-tablet.jpg  1024w,
    /images/hero-desktop.jpg 1920w
  "
  sizes="
    (max-width: 768px) 100vw,
    (max-width: 1024px) 100vw,
    calc(100vw - 20px)
  "
/>
```

### 4.2 画像フォーマット

- WebP/AVIF 対応（picture要素での実装も検討）
- フォールバック用のJPEG画像

## 5. アクセシビリティ設計

### 5.1 セマンティックHTML

- `<section>` with aria-label
- `<nav>` for navigation links
- 適切な見出し構造（h1はページ内の別の場所に配置）

### 5.2 キーボードナビゲーション

- Tab順序の適切な設定
- フォーカスインジケーターの視認性確保

## 6. パフォーマンス設計

### 6.1 画像の遅延読み込み

```html
<img loading="eager" fetchpriority="high" />
```

- Heroは LCP 対象のため eager loading
- fetchpriority="high" で優先度を上げる

### 6.2 CSS最適化

- Tailwindクラスのみ使用（追加CSSなし）
- Critical CSSに含まれるよう設定

## 7. 将来の拡張性

### 7.1 Three.js アニメーション対応

- 画像コンテナに `data-animation-target` 属性を追加
- クライアントサイドでのCanvas要素の動的挿入位置を確保

### 7.2 ロゴ配置

- 現在は未実装だが、将来的に左上または中央に配置予定
- スロットまたはpropsで柔軟に対応

---

**この設計ファイルに問題がないか確認してください。**
