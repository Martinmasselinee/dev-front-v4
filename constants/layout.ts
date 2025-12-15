import { SPACING } from './spacing'

export const LAYOUT = {
  CONTAINER_MAX_WIDTH: '384px', // 448px - 4rem (64px)
  CONTAINER_PADDING_X: SPACING.M, // 12px
  MIN_SCREEN_HEIGHT: '100vh', // min-h-screen
  NAVBAR_MARGIN_HORIZONTAL: '12.5%',
  SIDEBAR_WIDTH: '220px',
} as const

export const CALCULATION = {
  GRID_COLUMN_COUNT: 3,
  GRID_GAP_MULTIPLIER: 2,
} as const

