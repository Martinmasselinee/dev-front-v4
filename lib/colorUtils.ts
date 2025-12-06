/**
 * Lightens a hex color by a given percentage
 */
export function lightenColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = (num >> 16) + Math.round((255 - (num >> 16)) * (percent / 100))
  const g = ((num >> 8) & 0x00ff) + Math.round((255 - ((num >> 8) & 0x00ff)) * (percent / 100))
  const b = (num & 0x0000ff) + Math.round((255 - (num & 0x0000ff)) * (percent / 100))
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

/**
 * Darkens a hex color by a given percentage
 */
export function darkenColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.round((num >> 16) * (1 - percent / 100))
  const g = Math.round(((num >> 8) & 0x00ff) * (1 - percent / 100))
  const b = Math.round((num & 0x0000ff) * (1 - percent / 100))
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

