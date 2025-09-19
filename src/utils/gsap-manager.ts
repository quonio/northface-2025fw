import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { logger } from './logger'

// GSAPプラグインの登録（一度だけ）
gsap.registerPlugin(ScrollTrigger)

// グローバルな設定
export const GSAP_CONFIG = {
  defaultDuration: 1,
  defaultEase: 'power2.inOut',
  scrollTrigger: {
    markers: false, // 開発時は true に変更
    toggleActions: 'play pause resume pause',
  },
}

// ScrollTriggerのインスタンス管理
const scrollTriggers = new Map<string, ScrollTrigger>()

/**
 * ScrollTriggerを作成・管理するヘルパー関数
 */
export function createManagedScrollTrigger(
  id: string,
  config: ScrollTrigger.Vars
): ScrollTrigger | null {
  // 既存のトリガーがあれば削除
  if (scrollTriggers.has(id)) {
    scrollTriggers.get(id)?.kill()
  }

  try {
    const trigger = ScrollTrigger.create({
      ...GSAP_CONFIG.scrollTrigger,
      ...config,
    })
    scrollTriggers.set(id, trigger)
    return trigger
  } catch (error) {
    logger.error(`Failed to create ScrollTrigger for ${id}:`, error)
    return null
  }
}

/**
 * 特定のScrollTriggerを削除
 */
export function killScrollTrigger(id: string): void {
  const trigger = scrollTriggers.get(id)
  if (trigger) {
    trigger.kill()
    scrollTriggers.delete(id)
  }
}

/**
 * すべてのScrollTriggerを削除
 */
export function killAllScrollTriggers(): void {
  scrollTriggers.forEach((trigger) => trigger.kill())
  scrollTriggers.clear()
}

/**
 * ScrollTriggerをリフレッシュ
 */
export function refreshScrollTriggers(): void {
  ScrollTrigger.refresh()
}

/**
 * デバッグ情報を出力
 */
export function debugScrollTriggers(): void {
  logger.log('Active ScrollTriggers:', scrollTriggers.size)
  scrollTriggers.forEach((trigger, id) => {
    logger.log(`- ${id}:`, trigger)
  })
}

// グローバルイベントの設定
if (typeof window !== 'undefined') {
  // リサイズ時の自動リフレッシュ
  let resizeTimer: ReturnType<typeof setTimeout>
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      refreshScrollTriggers()
    }, 250)
  })

  // Astro page transitions対応
  document.addEventListener('astro:before-swap', () => {
    killAllScrollTriggers()
  })
}