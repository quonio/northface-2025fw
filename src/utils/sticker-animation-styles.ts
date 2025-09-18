/**
 * Style management for sticker animation
 */

const STYLE_ID = 'sticker-animation-styles'
const VENDOR_PREFIXES = ['webkit', 'Moz', 'ms', 'O']

/**
 * Get vendor-prefixed property name
 */
function getVendorProperty(el: HTMLElement, prop: string): string | undefined {
  const style = el.style as any
  const capitalizedProp = prop.charAt(0).toUpperCase() + prop.slice(1)
  
  for (const prefix of VENDOR_PREFIXES) {
    const vendorProp = prefix + capitalizedProp
    if (style[vendorProp] !== undefined) {
      return vendorProp
    }
  }
  
  if (style[prop] !== undefined) {
    return prop
  }
  
  return undefined
}

/**
 * Apply CSS with vendor prefixes
 */
export function applyVendorCSS(
  el: HTMLElement,
  properties: Record<string, string>
): void {
  const style = el.style as any
  
  for (const prop in properties) {
    const vendorProp = getVendorProperty(el, prop) || prop
    style[vendorProp] = properties[prop]
  }
}

/**
 * Create and inject global styles for sticker animation
 */
export function injectGlobalStyles(): () => void {
  // Check if styles already exist
  if (document.getElementById(STYLE_ID)) {
    return () => {} // Already injected
  }

  const styleElement = document.createElement('style')
  styleElement.id = STYLE_ID
  
  const gradientStyles = `
    /* Left shadow gradient */
    .sticker-shadow.shadowL {
      background: linear-gradient(to left, 
        rgba(0,0,0,0) 0%, 
        rgba(0,0,0,0.01) 1%, 
        rgba(0,0,0,0.7) 100%);
      background: -webkit-gradient(linear, right top, left top, 
        color-stop(0%,rgba(0,0,0,0)), 
        color-stop(1%,rgba(0,0,0,0.01)), 
        color-stop(100%,rgba(0,0,0,0.7)));
    }
    
    /* Right shadow gradient */
    .sticker-shadow.shadowR {
      background: linear-gradient(to right, 
        rgba(0,0,0,0) 0%, 
        rgba(0,0,0,0.01) 1%, 
        rgba(0,0,0,0.7) 100%);
      background: -webkit-gradient(linear, left top, right top, 
        color-stop(0%,rgba(0,0,0,0)), 
        color-stop(1%,rgba(0,0,0,0.01)), 
        color-stop(100%,rgba(0,0,0,0.7)));
    }
    
    /* Top shadow gradient */
    .sticker-shadow.shadowT {
      background: linear-gradient(to bottom, 
        rgba(0,0,0,0) 0%, 
        rgba(0,0,0,0.01) 1%, 
        rgba(0,0,0,0.7) 100%);
      background: -webkit-gradient(linear, left top, left bottom, 
        color-stop(0%,rgba(0,0,0,0)), 
        color-stop(1%,rgba(0,0,0,0.01)), 
        color-stop(100%,rgba(0,0,0,0.7)));
    }
    
    /* Bottom shadow gradient */
    .sticker-shadow.shadowB {
      background: linear-gradient(to top, 
        rgba(0,0,0,0) 0%, 
        rgba(0,0,0,0.01) 1%, 
        rgba(0,0,0,0.7) 100%);
      background: -webkit-gradient(linear, left bottom, left top, 
        color-stop(0%,rgba(0,0,0,0)), 
        color-stop(1%,rgba(0,0,0,0.01)), 
        color-stop(100%,rgba(0,0,0,0.7)));
    }
    
    /* Base sticker styles */
    .sticker-container {
      will-change: transform;
    }
    
    .sticker-container * {
      pointer-events: none;
    }
    
    .sticker-container {
      pointer-events: auto;
    }
    
    /* Image styles */
    .sticker-img img {
      pointer-events: none;
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
    }
    
    /* Performance optimizations */
    .sticker-mask,
    .sticker-move,
    .sticker-back,
    .sticker-shadow,
    .sticker-depth {
      will-change: transform, width, height;
    }
    
    /* Reduce motion support */
    @media (prefers-reduced-motion: reduce) {
      .sticker-mask,
      .sticker-move,
      .sticker-back,
      .sticker-shadow,
      .sticker-depth {
        transition: none !important;
        animation: none !important;
      }
    }
  `

  styleElement.textContent = gradientStyles
  document.head.appendChild(styleElement)
  
  // Return cleanup function
  return () => {
    const style = document.getElementById(STYLE_ID)
    if (style) {
      style.remove()
    }
  }
}

/**
 * Update CSS variables for dynamic styling
 */
export function updateCSSVariables(
  element: HTMLElement,
  variables: Record<string, string>
): void {
  for (const [key, value] of Object.entries(variables)) {
    element.style.setProperty(`--sticker-${key}`, value)
  }
}

/**
 * Create dynamic style object with shadow intensity
 */
export function createShadowStyle(intensity: number): string {
  const opacity = Math.max(0, Math.min(1, intensity))
  return `rgba(0,0,0,${opacity})`
}

/**
 * Cache for performance optimization
 */
const styleCache = new Map<string, CSSStyleDeclaration>()

/**
 * Get cached computed style for better performance
 */
export function getCachedComputedStyle(element: HTMLElement): CSSStyleDeclaration {
  const id = element.id || element.className
  
  if (styleCache.has(id)) {
    return styleCache.get(id)!
  }
  
  const computedStyle = window.getComputedStyle(element)
  styleCache.set(id, computedStyle)
  
  // Clear cache after a short delay to prevent memory leaks
  setTimeout(() => {
    styleCache.delete(id)
  }, 1000)
  
  return computedStyle
}