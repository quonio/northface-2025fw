/**
 * Auto animation for sticker peel effect
 */

import type { DOMStructure, Direction } from './sticker-animation'
import { applyPeelStyles } from './sticker-animation-events'
import { logger } from './logger'

interface AutoAnimationConfig {
  duration: number
  easing: string
  direction: Direction
  shadowIntensity: number
}

/**
 * Create automatic peel animation
 */
export function createAutoAnimation(
  domStructure: DOMStructure,
  size: number,
  config: AutoAnimationConfig
): () => void {
  logger.log('Starting auto animation with:', { size, config })
  let animationFrame: number | null = null
  let startTime: number | null = null
  let isAnimating = false

  const animate = (currentTime: number) => {
    if (!startTime) startTime = currentTime
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / config.duration, 1)

    // Easing function (cubic-bezier approximation)
    const easedProgress = cubicBezier(0.23, 1, 0.32, 1, progress)

    // Calculate peel values based on progress
    const peelValues = calculateAutoAnimationValues(
      size,
      config.direction,
      easedProgress,
      config.shadowIntensity
    )

    // Apply styles without transition (we're animating manually)
    applyPeelStyles(domStructure, peelValues, 'all 0s')

    if (progress < 1) {
      animationFrame = requestAnimationFrame(animate)
    } else {
      // Animation complete
      isAnimating = false
      // Add final drop shadow
      domStructure.container.style.filter =
        'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
    }
  }

  const start = () => {
    if (isAnimating) return

    // Set initial state - sticker is completely hidden
    const initialValues = calculateAutoAnimationValues(
      size,
      config.direction,
      0,
      config.shadowIntensity
    )
    applyPeelStyles(domStructure, initialValues, 'all 0s')

    // Start animation
    isAnimating = true
    startTime = null
    animationFrame = requestAnimationFrame(animate)
  }

  const stop = () => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame)
      animationFrame = null
    }
    isAnimating = false
  }

  // Start the animation
  start()

  // Return cleanup function
  return stop
}

/**
 * Calculate animation values for automatic peel
 */
function calculateAutoAnimationValues(
  size: number,
  direction: Direction,
  progress: number,
  shadowIntensity: number
) {
  // Progress from 0 (hidden) to 1 (fully revealed)
  const revealProgress = progress
  const shadowProgress = Math.min(progress * 1.5, 1) // Shadow appears faster

  // Calculate dimensions based on direction and progress
  if (direction === 'left') {
    const revealedWidth = size * revealProgress
    const shadowWidth = Math.max(0, revealedWidth - 20) * shadowProgress

    return {
      bx: 0,
      by: 0,
      sx: -1,
      sy: 1,
      bs: 'shadowL',
      bmx: revealedWidth,
      bmy: 0,
      bsw: shadowWidth,
      bsh: size,
      bsx: size - shadowWidth,
      bsy: 0,
      cw: revealedWidth || 1, // Ensure minimum width
      ch: size,
      cx: 0,
      cy: 0,
      dw: Math.min(revealedWidth * 0.3, size * 0.2),
      dh: size,
      dx: revealedWidth > 10 ? revealedWidth - 10 : -10000,
      dy: 0,
    }
  } else if (direction === 'right') {
    const revealedWidth = size * revealProgress
    const shadowWidth = Math.max(0, revealedWidth - 20) * shadowProgress

    return {
      bx: 0,
      by: 0,
      sx: -1,
      sy: 1,
      bs: 'shadowR',
      bmx: -revealedWidth,
      bmy: 0,
      bsw: shadowWidth,
      bsh: size,
      bsx: 0,
      bsy: 0,
      cw: revealedWidth || 1, // Ensure minimum width
      ch: size,
      cx: size - revealedWidth,
      cy: 0,
      dw: Math.min(revealedWidth * 0.3, size * 0.2),
      dh: size,
      dx: revealedWidth > 10 ? size - revealedWidth + 10 : -10000,
      dy: 0,
    }
  } else if (direction === 'top') {
    const revealedHeight = size * revealProgress
    const shadowHeight = Math.max(0, revealedHeight - 20) * shadowProgress

    return {
      bx: 0,
      by: -size + revealedHeight,
      sx: 1,
      sy: -1,
      bs: 'shadowT',
      bmx: 0,
      bmy: -size + revealedHeight,
      bsw: size,
      bsh: shadowHeight,
      bsx: 0,
      bsy: size - shadowHeight,
      cw: size,
      ch: size,
      cx: 0,
      cy: 0,
      dw: size,
      dh: Math.min(revealedHeight * 0.3, size * 0.2),
      dx: 0,
      dy: revealedHeight - 10,
    }
  } else {
    // bottom
    const revealedHeight = size * revealProgress
    const shadowHeight = Math.max(0, revealedHeight - 20) * shadowProgress

    return {
      bx: 0,
      by: size - revealedHeight,
      sx: 1,
      sy: -1,
      bs: 'shadowB',
      bmx: 0,
      bmy: size - revealedHeight,
      bsw: size,
      bsh: shadowHeight,
      bsx: 0,
      bsy: 0,
      cw: size,
      ch: size,
      cx: 0,
      cy: 0,
      dw: size,
      dh: Math.min(revealedHeight * 0.3, size * 0.2),
      dx: 0,
      dy: size - revealedHeight + 10,
    }
  }
}

/**
 * Cubic bezier easing function
 */
function cubicBezier(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  t: number
): number {
  // Simplified cubic bezier calculation
  const cx = 3 * x1
  const bx = 3 * (x2 - x1) - cx
  const ax = 1 - cx - bx
  const cy = 3 * y1
  const by = 3 * (y2 - y1) - cy
  const ay = 1 - cy - by

  // Newton-Raphson iteration
  let x = t
  for (let i = 0; i < 4; i++) {
    const currentX = ((ax * x + bx) * x + cx) * x
    const currentSlope = (3 * ax * x + 2 * bx) * x + cx
    if (Math.abs(currentX - t) < 0.001) break
    x -= (currentX - t) / currentSlope
  }

  return ((ay * x + by) * x + cy) * x
}
