/**
 * Logger utility for conditional logging based on environment
 * Logs are only output in development mode, except for errors which are always shown
 */

// Astro provides import.meta.env.DEV which is true in development mode
const isDev = import.meta.env.DEV

/**
 * Custom logger that respects environment settings
 */
export const logger = {
  /**
   * General log output - only in development
   */
  log: (...args: any[]): void => {
    if (isDev) {
      console.log(...args)
    }
  },

  /**
   * Warning output - only in development
   */
  warn: (...args: any[]): void => {
    if (isDev) {
      console.warn(...args)
    }
  },

  /**
   * Error output - always shown (even in production)
   * Critical errors should always be visible for monitoring
   */
  error: (...args: any[]): void => {
    console.error(...args)
  },

  /**
   * Debug output with [DEBUG] prefix - only in development
   */
  debug: (...args: any[]): void => {
    if (isDev) {
      console.log('[DEBUG]', ...args)
    }
  },

  /**
   * Group related logs - only in development
   */
  group: (label?: string): void => {
    if (isDev) {
      console.group(label)
    }
  },

  /**
   * End log group - only in development
   */
  groupEnd: (): void => {
    if (isDev) {
      console.groupEnd()
    }
  },

  /**
   * Table output - only in development
   */
  table: (data: any, columns?: string[]): void => {
    if (isDev) {
      console.table(data, columns)
    }
  },

  /**
   * Time measurement start - only in development
   */
  time: (label?: string): void => {
    if (isDev) {
      console.time(label)
    }
  },

  /**
   * Time measurement end - only in development
   */
  timeEnd: (label?: string): void => {
    if (isDev) {
      console.timeEnd(label)
    }
  }
}

// Re-export as default for convenience
export default logger