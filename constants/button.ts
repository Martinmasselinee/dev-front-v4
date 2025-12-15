import { COLOR } from './color'

export const BUTTON_HEIGHT = {
  MAIN: '35px',
  OVERLAY: '34px',
} as const

export const BUTTON_OVERLAY = {
  BORDER_RADIUS: '7px',
  INNER_BORDER_RADIUS: '6px',
} as const

export const BUTTON_MAIN = {
  BLACK: {
    backgroundColor: COLOR.BLACK,
    color: COLOR.WHITE,
  },
  PURPLE: {
    backgroundColor: COLOR.PURPLE,
    color: COLOR.WHITE,
  },
  WHITE: {
    backgroundColor: COLOR.WHITE,
    color: COLOR.BLACK,
  },
  RED: {
    backgroundColor: COLOR.RED,
    color: COLOR.WHITE,
  },
  ORANGE: {
    backgroundColor: COLOR.ORANGE,
    color: COLOR.WHITE,
  },
} as const

