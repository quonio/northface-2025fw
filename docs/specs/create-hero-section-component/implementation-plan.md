# Heroセクションコンポーネント実装計画書

## 1. 実装順序

### Phase 1: 基盤構築（15分）

1. 型定義ファイル（hero.ts）の作成
2. HeroNav.astroコンポーネントの作成
3. Hero.astroコンポーネントの基本構造作成

### Phase 2: スタイリング実装（20分）

1. レスポンシブ対応のクラス設定
2. 画像配置の最適化
3. ナビゲーション配置の調整

### Phase 3: 統合とテスト（10分）

1. index.astroへの組み込み
2. サンプル画像での表示確認
3. レスポンシブ動作の確認

## 2. ファイル作成計画

### 2.1 src/types/hero.ts

```typescript
export interface HeroImage {
  src: string;
  alt: string;
  srcset?: string;
  sizes?: string;
}

export interface HeroNavItem {
  label: string;
  href: string;
}

export interface HeroProps {
  image: HeroImage;
  navigation?: HeroNavItem[];
}
```

### 2.2 src/components/HeroNav.astro

```astro
---
export interface Props {
  items?: Array<{
    label: string;
    href: string;
  }>;
  class?: string;
}

const { items = [], class: className = '' } = Astro.props;
---

<nav class={`flex gap-4 text-sm ${className}`}>
  {
    items.map((item) => (
      <a href={item.href} class="text-white/80 transition-colors hover:text-white">
        {item.label}
      </a>
    ))
  }
</nav>
```

### 2.3 src/components/Hero.astro

```astro
---
import type { HeroProps } from '../types/hero';
import HeroNav from './HeroNav.astro';

export interface Props extends HeroProps {}

const { image, navigation = [] } = Astro.props;
---

<section class="bg-navy relative h-screen w-full lg:p-2.5" aria-label="Hero section">
  <div
    class="relative flex h-full w-full items-center justify-center overflow-hidden lg:rounded-xl"
  >
    <img
      src={image.src}
      alt={image.alt}
      srcset={image.srcset}
      sizes={image.sizes}
      loading="eager"
      fetchpriority="high"
      class="absolute inset-0 h-full w-full object-cover object-center"
    />

    {
      navigation.length > 0 && (
        <HeroNav items={navigation} class="absolute top-4 right-4 z-10 md:top-6 md:right-6" />
      )
    }
  </div>
</section>
```

## 3. テスト用データ

### 3.1 仮画像の配置

- public/images/hero-sample.jpg を配置（任意の家族写真風画像）
- 横長（1920x1080）の画像を推奨

### 3.2 index.astroでの使用例

```astro
---
import Hero from '../components/Hero.astro';

const heroData = {
  image: {
    src: '/images/hero-sample.jpg',
    alt: 'THE NORTH FACE Maternity+ 2025FW - 家族の温かい時間',
    srcset: '/images/hero-sample.jpg 1920w',
    sizes: '100vw',
  },
  navigation: [
    { label: 'Shop', href: '#shop' },
    { label: 'Story', href: '#story' },
  ],
};
---

<Hero {...heroData} />
```

## 4. 確認項目

### 4.1 表示確認

- [ ] デスクトップ：画面端に10pxの余白、画像は角丸
- [ ] モバイル：画面いっぱいに表示、余白なし
- [ ] 画像の中央が常に表示される
- [ ] ナビゲーションが右上に表示される

### 4.2 レスポンシブ確認

- [ ] 390px（モバイル）
- [ ] 768px（タブレット）
- [ ] 1280px（デスクトップ）
- [ ] 1440px（大画面）

### 4.3 アクセシビリティ確認

- [ ] alt属性が適切に設定されている
- [ ] キーボードでナビゲーションリンクに到達できる
- [ ] コントラスト比が十分（白文字/navy背景）

## 5. 注意事項

1. **画像ファイル**: 実装時は適切なサンプル画像を用意
2. **パス設定**: TypeScriptのパスエイリアスを使用（@/types/hero）
3. **エラーハンドリング**: 画像読み込みエラー時の処理は次フェーズで実装

---

**この実装計画に問題がないか確認してください。**
