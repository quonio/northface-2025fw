// Type definitions for Sticker Animation

/**
 * Configuration options for the sticker animation
 */
export interface StickerAnimationConfig {
  /** Animation duration in milliseconds */
  duration?: number
  /** CSS easing function */
  easing?: string
  /** Direction from which the sticker peels */
  direction?: Direction
  /** Delay before animation starts in milliseconds */
  delay?: number
  /** Shadow intensity from 0 to 1 */
  shadowIntensity?: number
  /** 3D perspective strength */
  perspective?: number
  /** Intersection Observer options */
  observerOptions?: IntersectionObserverInit
}

/**
 * Result object returned by the sticker animation hook
 */
export interface StickerAnimationResult {
  /** The wrapper element containing the animation structure */
  element: HTMLElement
  /** Cleanup function to remove all effects and listeners */
  destroy: () => void
  /** Reset the animation to initial state */
  reset: () => void
  /** Manually trigger the animation */
  trigger: () => void
}

/**
 * Animation phase states
 */
export type AnimationPhase = 'idle' | 'peeling' | 'stuck' | 'paused'

/**
 * Direction of the peel effect
 */
export type Direction = 'left' | 'right' | 'top' | 'bottom'

/**
 * 3D transformation values
 */
export interface Transform3D {
  translateX: number
  translateY: number
  rotateY: number
  scaleX: number
  scaleY: number
  clipPath: string
}

/**
 * Current animation state
 */
export interface AnimationState {
  phase: AnimationPhase
  progress: number // 0.0 to 1.0
  direction: Direction
  startTime: number
  currentTransform: Transform3D
}

/**
 * Shadow effect state
 */
export interface ShadowState {
  type: 'left' | 'right' | 'top' | 'bottom'
  width: number
  height: number
  opacity: number
}

// Import DOM utilities
import {
  createStickerDOM,
  getElementSize,
  insertStickerDOM,
  type DOMStructure,
} from './sticker-animation-dom'

// Re-export DOMStructure type
export type { DOMStructure } from './sticker-animation-dom'

// Import event utilities
import {
  setupEventHandlers,
  getDirection,
  calculatePeelValues,
  applyPeelStyles,
} from './sticker-animation-events'

// Import style utilities
import {
  injectGlobalStyles,
  updateCSSVariables,
} from './sticker-animation-styles'

// Default configuration values
const DEFAULT_CONFIG: Required<StickerAnimationConfig> = {
  duration: 800,
  easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
  direction: 'left',
  delay: 0,
  shadowIntensity: 0.7,
  perspective: 800,
  observerOptions: {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px',
  },
}

/**
 * Main hook for creating sticker peel animation
 * @param targetElement - The HTML element to apply the sticker effect to
 * @param config - Optional configuration object
 * @returns StickerAnimationResult object with control methods
 */
export function useStickerAnimation(
  targetElement: HTMLElement,
  config?: StickerAnimationConfig
): StickerAnimationResult {
  // Merge configuration with defaults
  const finalConfig: Required<StickerAnimationConfig> = {
    ...DEFAULT_CONFIG,
    ...config,
    observerOptions: {
      ...DEFAULT_CONFIG.observerOptions,
      ...config?.observerOptions,
    },
  }

  // Validate configuration
  if (!targetElement || !(targetElement instanceof HTMLElement)) {
    throw new Error(
      'useStickerAnimation: targetElement must be a valid HTMLElement'
    )
  }

  if (finalConfig.duration <= 0) {
    console.warn(
      'useStickerAnimation: duration must be positive, using default'
    )
    finalConfig.duration = DEFAULT_CONFIG.duration
  }

  if (finalConfig.shadowIntensity < 0 || finalConfig.shadowIntensity > 1) {
    console.warn(
      'useStickerAnimation: shadowIntensity must be between 0 and 1, using default'
    )
    finalConfig.shadowIntensity = DEFAULT_CONFIG.shadowIntensity
  }

  // Initialize animation state
  let animationState: AnimationState = {
    phase: 'idle',
    progress: 0,
    direction: finalConfig.direction,
    startTime: 0,
    currentTransform: {
      translateX: 0,
      translateY: 0,
      rotateY: 0,
      scaleX: 1,
      scaleY: 1,
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    },
  }

  // Track cleanup functions
  const cleanupFunctions: (() => void)[] = []

  // Inject global styles
  const cleanupStyles = injectGlobalStyles()
  cleanupFunctions.push(cleanupStyles)

  // Create wrapper element
  const wrapperElement = document.createElement('div')
  wrapperElement.style.position = 'relative'
  wrapperElement.style.display = 'inline-block'

  // Wrap the target element
  targetElement.parentNode?.insertBefore(wrapperElement, targetElement)
  wrapperElement.appendChild(targetElement)

  // Get element size and create DOM structure
  const elementSize = getElementSize(targetElement)
  const domStructure = createStickerDOM(
    targetElement,
    elementSize.width,
    elementSize.height
  )

  // Insert the sticker DOM structure
  insertStickerDOM(wrapperElement, domStructure, targetElement)

  // Store DOM references for later use
  let stickerDOM: DOMStructure = domStructure

  // Tracking variables
  let currentDirection: Direction = finalConfig.direction
  let savePos: ReturnType<typeof calculatePeelValues> | null = null
  let elementPos: { x: number; y: number } | null = null

  // Event handlers
  const handleMouseEnter = (e: MouseEvent) => {
    const rect = stickerDOM.container.getBoundingClientRect()
    elementPos = {
      x: rect.left + window.pageXOffset,
      y: rect.top + window.pageYOffset,
    }

    // Get direction and initial peel values
    const sizeQ = Math.min(elementSize.width, elementSize.height) / 4
    currentDirection = getDirection(e, elementPos, sizeQ)
    savePos = calculatePeelValues(e, elementPos, elementSize, currentDirection)

    // Update shadow classes
    const shadowClass = `sticker-shadow ${savePos.bs}`
    stickerDOM.backShadow.className = shadowClass
    stickerDOM.depth.className = shadowClass

    // Update CSS variables for dynamic styling
    updateCSSVariables(stickerDOM.container, {
      'shadow-intensity': finalConfig.shadowIntensity.toString(),
      perspective: finalConfig.perspective.toString(),
      duration: finalConfig.duration.toString(),
    })

    // Apply initial styles without transition
    applyPeelStyles(stickerDOM, savePos, 'all 0s')

    // Update state
    animationState.phase = 'peeling'
    animationState.direction = currentDirection
    animationState.startTime = Date.now()
  }

  const handleMouseLeave = (e: MouseEvent) => {
    if (!savePos) return

    // Apply transition for smooth return
    const transition = `all ${finalConfig.duration}ms ${finalConfig.easing}`

    // Reset to initial position
    const resetValues = calculatePeelValues(
      e,
      elementPos!,
      elementSize,
      currentDirection
    )
    applyPeelStyles(
      stickerDOM,
      {
        ...resetValues,
        bmx:
          currentDirection === 'left'
            ? -elementSize.width
            : currentDirection === 'right'
              ? elementSize.width
              : 0,
        bmy:
          currentDirection === 'top'
            ? -elementSize.height
            : currentDirection === 'bottom'
              ? elementSize.height
              : 0,
        cw: elementSize.width,
        ch: elementSize.height,
        cx: 0,
        cy: 0,
        dx: -10000,
        dy: -10000,
      },
      transition
    )

    // Update state
    animationState.phase = 'stuck'
    animationState.progress = 1
    savePos = null

    // Add drop shadow effect after animation
    setTimeout(() => {
      stickerDOM.container.style.filter =
        'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
    }, finalConfig.duration)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!savePos || !elementPos) {
      handleMouseEnter(e)

      // Setup document mouseup listener for touch-like behavior
      const handleMouseUp = () => {
        document.removeEventListener('mouseup', handleMouseUp)
        handleMouseLeave(e)
      }
      document.addEventListener('mouseup', handleMouseUp)
    }

    if (!elementPos) return

    // Calculate new peel values based on mouse position
    const newValues = calculatePeelValues(
      e,
      elementPos,
      elementSize,
      currentDirection
    )
    applyPeelStyles(stickerDOM, newValues, 'all 0s')

    // Update progress
    const maxDistance =
      currentDirection === 'left' || currentDirection === 'right'
        ? elementSize.width
        : elementSize.height
    const currentDistance =
      currentDirection === 'left' || currentDirection === 'right'
        ? Math.abs(newValues.bmx)
        : Math.abs(newValues.bmy)
    animationState.progress = 1 - currentDistance / maxDistance
  }

  // Setup event handlers
  const cleanupEvents = setupEventHandlers(
    stickerDOM,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove
  )

  // Add event cleanup to cleanup functions
  cleanupFunctions.push(cleanupEvents)

  // Setup Intersection Observer for scroll trigger (optional visibility)
  if (finalConfig.observerOptions && 'IntersectionObserver' in window) {
    let hasTriggered = false
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasTriggered) {
          hasTriggered = true

          // Apply delay if configured
          const showElement = () => {
            stickerDOM.container.style.opacity = '1'
            observer.unobserve(stickerDOM.container)
          }

          if (finalConfig.delay > 0) {
            setTimeout(showElement, finalConfig.delay)
          } else {
            showElement()
          }
        }
      })
    }, finalConfig.observerOptions)

    // Start observing
    observer.observe(stickerDOM.container)

    // Initially hide the sticker
    stickerDOM.container.style.opacity = '0'
    stickerDOM.container.style.transition = `opacity ${finalConfig.duration}ms ${finalConfig.easing}`

    // Add observer cleanup
    cleanupFunctions.push(() => {
      observer.disconnect()
    })
  }

  // Control methods
  const destroy = () => {
    // Run all cleanup functions
    cleanupFunctions.forEach((cleanup) => cleanup())

    // Remove sticker DOM
    stickerDOM.container.remove()

    // Restore original element
    targetElement.style.display = ''

    // Restore original DOM structure
    if (
      wrapperElement.parentNode &&
      targetElement.parentNode === wrapperElement
    ) {
      wrapperElement.parentNode.insertBefore(targetElement, wrapperElement)
      wrapperElement.remove()
    }

    // Reset state
    animationState.phase = 'idle'
    animationState.progress = 0
  }

  const reset = () => {
    animationState = {
      ...animationState,
      phase: 'idle',
      progress: 0,
      startTime: 0,
      currentTransform: {
        translateX: 0,
        translateY: 0,
        rotateY: 0,
        scaleX: 1,
        scaleY: 1,
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      },
    }
    // Additional reset logic will be added with animation implementation
  }

  const trigger = () => {
    if (animationState.phase === 'idle' || animationState.phase === 'stuck') {
      animationState.phase = 'peeling'
      animationState.startTime = Date.now()
      // Animation trigger logic will be added in later tasks
    }
  }

  // Add cleanup for potential future event listeners
  cleanupFunctions.push(() => {
    // Cleanup will be populated as we add features
  })

  return {
    element: wrapperElement,
    destroy,
    reset,
    trigger,
  }
}
