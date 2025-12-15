/**
 * Extract numeric value from a pixel string (e.g., "16px" -> 16)
 */
export const extractPixelValue = (pixelString: string): number => {
  return parseInt(pixelString.replace('px', '').replace('calc(', '').replace(')', '').trim(), 10) || 0
}

