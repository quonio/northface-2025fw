/**
 * DOM structure and management for sticker animation
 */

export interface DOMStructure {
  container: HTMLElement
  mask: HTMLElement
  move: HTMLElement
  front: HTMLElement
  back: HTMLElement
  backImg: HTMLElement
  backShadow: HTMLElement
  depth: HTMLElement
}

/**
 * Creates the DOM structure required for the sticker effect
 * @param originalElement - The original element to apply the effect to
 * @param width - The width of the element
 * @param height - The height of the element
 * @returns DOMStructure object containing references to all created elements
 */
export function createStickerDOM(originalElement: HTMLElement, width: number, height: number): DOMStructure {
  // Create container element
  const container = document.createElement('div')
  container.style.cssText = `
    position: relative;
    width: ${width}px;
    height: ${height}px;
    overflow: hidden;
    display: inline-block;
  `
  container.className = 'sticker-container'

  // Create mask layer
  const mask = document.createElement('div')
  mask.style.cssText = `
    position: relative;
    width: ${width}px;
    height: ${height}px;
    overflow: hidden;
    transition: all 0s;
  `
  mask.className = 'sticker-mask'

  // Create move layer
  const move = document.createElement('div')
  move.style.cssText = `
    position: relative;
    width: ${width}px;
    height: ${height}px;
    overflow: hidden;
    transition: all 0s;
  `
  move.className = 'sticker-move'

  // Create front layer (visible part)
  const front = document.createElement('div')
  front.style.cssText = `
    position: relative;
    width: ${width}px;
    height: ${height}px;
    z-index: 1;
  `
  front.className = 'sticker-front sticker-img'

  // Clone the original element into the front layer
  const frontContent = originalElement.cloneNode(true) as HTMLElement
  frontContent.style.cssText = `
    width: 100%;
    height: 100%;
    object-fit: cover;
  `
  front.appendChild(frontContent)

  // Create back layer (peeling part) - initially hidden off to the side
  const back = document.createElement('div')
  back.style.cssText = `
    position: absolute;
    width: ${width}px;
    height: ${height}px;
    left: 0;
    top: 0;
    z-index: 3;
    background-color: #ffffff;
    transform: translate(${width}px, 0px);
    overflow: hidden;
    transition: all 0s;
  `
  back.className = 'sticker-back'

  // Create back image (semi-transparent copy)
  const backImg = document.createElement('div')
  backImg.style.cssText = `
    position: relative;
    width: ${width}px;
    height: ${height}px;
    opacity: 0.4;
  `
  backImg.className = 'sticker-back-img sticker-img'

  // Clone the original element into the back image
  const backContent = originalElement.cloneNode(true) as HTMLElement
  backContent.style.cssText = `
    width: 100%;
    height: 100%;
    object-fit: cover;
  `
  backImg.appendChild(backContent)

  // Create back shadow layer
  const backShadow = document.createElement('div')
  backShadow.style.cssText = `
    position: absolute;
    width: ${width}px;
    height: ${height}px;
    left: 0;
    top: 0;
    z-index: 4;
    transition: all 0s;
  `
  backShadow.className = 'sticker-shadow'

  // Create depth shadow layer
  const depth = document.createElement('div')
  depth.style.cssText = `
    position: absolute;
    width: ${width}px;
    height: ${height}px;
    left: 0;
    top: 0;
    z-index: 1;
    transform: translate(-10000px, -10000px);
    transition: all 0s;
  `
  depth.className = 'sticker-shadow sticker-depth'

  // Assemble the DOM structure
  back.appendChild(backImg)
  back.appendChild(backShadow)
  move.appendChild(front)
  move.appendChild(depth)
  move.appendChild(back)
  mask.appendChild(move)
  container.appendChild(mask)

  return {
    container,
    mask,
    move,
    front,
    back,
    backImg,
    backShadow,
    depth,
  }
}

/**
 * Gets the size of an element considering its computed styles
 * @param element - The element to measure
 * @returns Object with width and height
 */
export function getElementSize(element: HTMLElement): { width: number; height: number } {
  const rect = element.getBoundingClientRect()
  const computedStyle = window.getComputedStyle(element)
  
  // Get the actual content size excluding padding and border
  const width = rect.width - 
    parseFloat(computedStyle.paddingLeft) - 
    parseFloat(computedStyle.paddingRight) -
    parseFloat(computedStyle.borderLeftWidth) -
    parseFloat(computedStyle.borderRightWidth)
    
  const height = rect.height -
    parseFloat(computedStyle.paddingTop) -
    parseFloat(computedStyle.paddingBottom) -
    parseFloat(computedStyle.borderTopWidth) -
    parseFloat(computedStyle.borderBottomWidth)
  
  return { width, height }
}

/**
 * Updates the wrapper element with the DOM structure
 * @param wrapper - The wrapper element to update
 * @param structure - The DOM structure to insert
 * @param originalElement - The original element being wrapped
 */
export function insertStickerDOM(
  wrapper: HTMLElement,
  structure: DOMStructure,
  originalElement: HTMLElement
): void {
  // Hide the original element
  originalElement.style.display = 'none'
  
  // Clear any existing content in the wrapper
  while (wrapper.firstChild) {
    if (wrapper.firstChild !== originalElement) {
      wrapper.removeChild(wrapper.firstChild)
    } else {
      break
    }
  }
  
  // Insert the sticker structure
  wrapper.insertBefore(structure.container, originalElement)
}