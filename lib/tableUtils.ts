import { COLOR } from '../constants/color'
import { Row } from '@tanstack/react-table'

export const getAlternatingRowColor = <T,>(row: Row<T>, index: number): string => {
  return index % 2 === 0 ? COLOR.WHITE : COLOR.GREY.LIGHT
}

