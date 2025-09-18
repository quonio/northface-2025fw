import type { Direction } from './sticker-animation'
import type { DOMStructure } from './sticker-animation-dom'

interface Position {
  x: number
  y: number
}

interface PeelValues {
  bx: number // back translate X
  by: number // back translate Y
  sx: number // scale X
  sy: number // scale Y
  bs: string // shadow class
  bmx: number // back move X
  bmy: number // back move Y
  bsw: number // shadow width
  bsh: number // shadow height
  bsx: number // shadow X
  bsy: number // shadow Y
  cw: number // mask width
  ch: number // mask height
  cx: number // mask X
  cy: number // mask Y
  dw: number // depth width
  dh: number // depth height
  dx: number // depth X
  dy: number // depth Y
}

/**
 * Get the direction based on mouse position relative to element
 */
export function getDirection(e: MouseEvent, pos: Position, sizeQ: number): Direction {
  const fx = pos.x
  const fy = pos.y
  const tx = e.pageX - fx
  const ty = e.pageY - fy

  if (tx < sizeQ) return 'left'
  else if (tx > sizeQ * 3) return 'right'
  else if (ty < sizeQ) return 'top'
  else return 'bottom'
}

/**
 * Calculate peel values based on mouse position and direction
 */
export function calculatePeelValues(
  event: MouseEvent,
  pos: Position,
  size: { width: number; height: number },
  direction: Direction
): PeelValues {
  const fx = pos.x
  const fy = pos.y
  const tx = event.pageX - fx
  const ty = event.pageY - fy
  
  const a = size.width - tx
  const b = size.height - ty
  const c = tx >> 1
  const d = ty >> 1
  const e = a >> 1
  const f = b >> 1

  let values: PeelValues

  if (direction === 'left') {
    values = {
      bx: -size.width,
      by: 0,
      sx: -1,
      sy: 1,
      bs: 'shadowL',
      bmx: -size.width + tx,
      bmy: 0,
      bsw: tx,
      bsh: size.height,
      bsx: a,
      bsy: 0,
      cw: size.width - c,
      ch: size.height,
      cx: c,
      cy: 0,
      dw: c,
      dh: size.height,
      dx: c - (c >> 1),
      dy: 0,
    }
  } else if (direction === 'right') {
    values = {
      bx: size.width,
      by: 0,
      sx: -1,
      sy: 1,
      bs: 'shadowR',
      bmx: tx,
      bmy: 0,
      bsw: a,
      bsh: size.height,
      bsx: 0,
      bsy: 0,
      cw: size.width - e,
      ch: size.height,
      cx: 0,
      cy: 0,
      dw: e,
      dh: size.height,
      dx: size.width - a + (e >> 1),
      dy: 0,
    }
  } else if (direction === 'top') {
    values = {
      bx: 0,
      by: -size.height,
      sx: 1,
      sy: -1,
      bs: 'shadowT',
      bmx: 0,
      bmy: -size.height + ty,
      bsw: size.width,
      bsh: ty,
      bsx: 0,
      bsy: b,
      cw: size.width,
      ch: size.height - d,
      cx: 0,
      cy: d,
      dw: size.width,
      dh: d,
      dx: 0,
      dy: d - (d >> 1),
    }
  } else {
    // bottom
    values = {
      bx: 0,
      by: size.height,
      sx: 1,
      sy: -1,
      bs: 'shadowB',
      bmx: 0,
      bmy: ty,
      bsw: size.width,
      bsh: b,
      bsx: 0,
      bsy: 0,
      cw: size.width,
      ch: size.height - f,
      cx: 0,
      cy: 0,
      dw: size.width,
      dh: f,
      dx: 0,
      dy: size.height - b + (f >> 1),
    }
  }

  return values
}

/**
 * Setup event handlers for sticker animation
 */
export function setupEventHandlers(
  domStructure: DOMStructure,
  onEnter: (e: MouseEvent) => void,
  onLeave: (e: MouseEvent) => void,
  onMove: (e: MouseEvent) => void
): () => void {
  const { container } = domStructure

  // Event handlers
  const handleMouseEnter = (e: MouseEvent) => onEnter(e)
  const handleMouseLeave = (e: MouseEvent) => onLeave(e)
  const handleMouseMove = (e: MouseEvent) => onMove(e)

  // Touch event handlers (convert to mouse events)
  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0]
    // Create a synthetic mouse event with pageX/pageY
    const mouseEvent = new MouseEvent('mouseenter', {
      clientX: touch.clientX,
      clientY: touch.clientY,
    })
    // Manually add pageX/pageY properties
    Object.defineProperty(mouseEvent, 'pageX', { value: touch.pageX })
    Object.defineProperty(mouseEvent, 'pageY', { value: touch.pageY })
    onEnter(mouseEvent)
  }

  const handleTouchEnd = () => {
    const mouseEvent = new MouseEvent('mouseleave', {})
    onLeave(mouseEvent)
  }

  const handleTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0]
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY,
    })
    // Manually add pageX/pageY properties
    Object.defineProperty(mouseEvent, 'pageX', { value: touch.pageX })
    Object.defineProperty(mouseEvent, 'pageY', { value: touch.pageY })
    onMove(mouseEvent)
  }

  // Add event listeners
  container.addEventListener('mouseenter', handleMouseEnter)
  container.addEventListener('mouseleave', handleMouseLeave)
  container.addEventListener('mousemove', handleMouseMove)
  
  // Touch support
  container.addEventListener('touchstart', handleTouchStart, { passive: true })
  container.addEventListener('touchend', handleTouchEnd, { passive: true })
  container.addEventListener('touchmove', handleTouchMove, { passive: true })

  // Return cleanup function
  return () => {
    container.removeEventListener('mouseenter', handleMouseEnter)
    container.removeEventListener('mouseleave', handleMouseLeave)
    container.removeEventListener('mousemove', handleMouseMove)
    container.removeEventListener('touchstart', handleTouchStart)
    container.removeEventListener('touchend', handleTouchEnd)
    container.removeEventListener('touchmove', handleTouchMove)
  }
}

/**
 * Apply CSS styles based on peel values
 */
export function applyPeelStyles(
  domStructure: DOMStructure,
  values: PeelValues,
  transition: string = 'all 0s'
): void {
  const { mask, move, back, backImg, backShadow, depth } = domStructure

  // Update mask
  mask.style.transition = transition
  mask.style.width = `${values.cw}px`
  mask.style.height = `${values.ch}px`
  mask.style.transform = `translate(${values.cx}px, ${values.cy}px)`

  // Update move
  move.style.transition = transition
  move.style.transform = `translate(${-values.cx}px, ${-values.cy}px)`

  // Update back
  back.style.transition = transition
  back.style.transform = `translate(${values.bmx}px, ${values.bmy}px)`

  // Update back image
  backImg.style.transform = `scaleX(${values.sx}) scaleY(${values.sy})`

  // Update shadow
  backShadow.style.width = `${values.bsw}px`
  backShadow.style.height = `${values.bsh}px`
  backShadow.style.transform = `translate(${values.bsx}px, ${values.bsy}px)`

  // Update depth
  depth.style.width = `${values.dw}px`
  depth.style.height = `${values.dh}px`
  depth.style.transform = `translate(${values.dx}px, ${values.dy}px)`
}