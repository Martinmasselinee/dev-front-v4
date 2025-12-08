import { hexToRgba } from '../lib/colorUtils'
import { OPACITY } from './opacity'

export const COLOR = {
  PURPLE: '#5218F9',
  BLACK: '#000000',
  WHITE: '#ffffff',
  GREY: {
    LIGHT: '#f5f5f5',
    LIGHT_MEDIUM: '#e0e0e0',
    MEDIUM: '#b8bcc4',
    DARK: '#4b5563',
  },
} as const

export const COLOR_RGBA = {
  PURPLE_LIGHT: hexToRgba(COLOR.PURPLE, 0.25),
} as const

