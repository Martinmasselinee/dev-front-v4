import { OPACITY } from './opacity'

export const SHADOW = {
  POPUP: `0 10px 25px rgba(0, 0, 0, ${OPACITY.SHADOW})`,
  NAVBAR: `0 0 50px rgba(0, 0, 0, ${OPACITY.NAVBAR_SHADOW})`,
  SLIDER_HANDLE: `0 2px 4px rgba(0, 0, 0, ${OPACITY.SLIDER_SHADOW})`,
} as const

