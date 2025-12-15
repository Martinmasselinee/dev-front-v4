'use client'

import { useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  Row,
} from '@tanstack/react-table'
import { COLOR } from '../constants/color'
import { SPACING } from '../constants/spacing'
import { BORDER_WIDTH, BORDER_RADIUS } from '../constants/border'
import { DISPLAY } from '../constants/display'
import { FLEX_DIRECTION, ALIGN_ITEMS, JUSTIFY_CONTENT, FLEX } from '../constants/flex'
import { POSITION_TYPE, POSITION } from '../constants/position'
import { Z_INDEX } from '../constants/zIndex'
import { OVERFLOW } from '../constants/overflow'
import { WIDTH } from '../constants/width'
import { MULTIPLIER } from '../constants/multiplier'
import { NUMBER } from '../constants/number'
import { TEXT_ALIGN } from '../constants/text'
import { darkenColor } from '../lib/colorUtils'
import { TRANSITION } from '../constants/transition'
import { CURSOR } from '../constants/interaction'
import { TABLE } from '../constants/table'

interface TableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  getRowBackgroundColor?: (row: Row<T>, index: number) => string
  showTopBorder?: boolean
  stickyTopOffset?: string
}

export function Table<T>({ 
  data, 
  columns, 
  getRowBackgroundColor,
  showTopBorder = false,
  stickyTopOffset
}: TableProps<T>) {
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null)
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div
      style={{
        width: WIDTH.FULL,
        overflowX: OVERFLOW.AUTO,
        borderTop: showTopBorder ? `${BORDER_WIDTH.THIN} solid ${COLOR.GREY.LIGHT_MEDIUM}` : undefined,
        borderBottom: `${BORDER_WIDTH.THIN} solid ${COLOR.GREY.LIGHT_MEDIUM}`,
        borderRadius: POSITION.ZERO,
        display: DISPLAY.FLEX,
        flexDirection: FLEX_DIRECTION.COLUMN,
      }}
    >
      <div
        style={{
          display: DISPLAY.FLEX,
          flexDirection: FLEX_DIRECTION.COLUMN,
          width: WIDTH.FULL,
          minWidth: 'max-content',
        }}
      >
        {/* Table Header */}
        <div
          style={{
            display: DISPLAY.FLEX,
            backgroundColor: COLOR.GREY.LIGHT,
            position: POSITION_TYPE.STICKY,
            top: stickyTopOffset || POSITION.ZERO,
            zIndex: Z_INDEX.COMPONENT_OVERLAY,
            width: WIDTH.FULL,
            minWidth: 'max-content',
            borderBottom: `${BORDER_WIDTH.THIN} solid ${COLOR.GREY.LIGHT_MEDIUM}`,
          }}
        >
          {table.getHeaderGroups().map(headerGroup =>
            headerGroup.headers.map((header, headerIndex) => {
              const meta = header.column.columnDef.meta as any
              const isFirstColumn = headerIndex === 0
              const isLastColumn = headerIndex === headerGroup.headers.length - 1
              return (
                <div
                  key={header.id}
                  style={{
                    width: meta?.width || `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L})`,
                    minWidth: meta?.width || `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L})`,
                    flex: meta?.sticky ? FLEX.ZERO : FLEX.ONE,
                    paddingTop: SPACING.M,
                    paddingBottom: SPACING.M,
                    paddingLeft: isFirstColumn ? SPACING.L : SPACING.M,
                    paddingRight: isLastColumn ? SPACING.L : SPACING.M,
                    flexShrink: FLEX.ZERO,
                    display: DISPLAY.FLEX,
                    alignItems: ALIGN_ITEMS.CENTER,
                    justifyContent: meta?.align === 'right' ? JUSTIFY_CONTENT.FLEX_END : meta?.align === 'center' ? JUSTIFY_CONTENT.CENTER : JUSTIFY_CONTENT.FLEX_START,
                    position: meta?.sticky ? POSITION_TYPE.STICKY : POSITION_TYPE.RELATIVE,
                    right: meta?.stickyRight,
                    backgroundColor: COLOR.GREY.LIGHT,
                    zIndex: meta?.sticky ? Z_INDEX.COMPONENT_CONTENT : Z_INDEX.COMPONENT_OVERLAY,
                    borderLeft: meta?.borderLeft ? `${BORDER_WIDTH.THIN} solid ${COLOR.GREY.LIGHT_MEDIUM}` : undefined,
                    gap: SPACING.S,
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </div>
              )
            })
          )}
        </div>

        {/* Table Body */}
        <div
          style={{
            display: DISPLAY.FLEX,
            flexDirection: FLEX_DIRECTION.COLUMN,
          }}
        >
          {table.getRowModel().rows.map((row, rowIndex) => {
            const baseRowBgColor = getRowBackgroundColor 
              ? getRowBackgroundColor(row, rowIndex)
              : rowIndex % MULTIPLIER.TABLE_ROW_ALTERNATE === NUMBER.ZERO ? COLOR.WHITE : COLOR.GREY.LIGHT
            
            const isHovered = hoveredRowIndex === rowIndex
            const darkenPercent = (MULTIPLIER.COLOR_DARKEN_PERCENT * MULTIPLIER.DARKEN_PERCENT_HALF) + (MULTIPLIER.COLOR_DARKEN_PERCENT * MULTIPLIER.DARKEN_PERCENT_QUARTER)
            const rowBgColor = isHovered 
              ? darkenColor(baseRowBgColor, darkenPercent)
              : baseRowBgColor

            return (
              <div
                key={row.id}
                onMouseEnter={() => setHoveredRowIndex(rowIndex)}
                onMouseLeave={() => setHoveredRowIndex(null)}
                style={{
                  display: DISPLAY.FLEX,
                  backgroundColor: rowBgColor,
                  width: WIDTH.FULL,
                  minWidth: 'max-content',
                  cursor: CURSOR.DEFAULT,
                  transition: `background-color ${TRANSITION.FAST_EASE}`,
                }}
              >
                {row.getVisibleCells().map((cell, cellIndex) => {
                  const meta = cell.column.columnDef.meta as any
                  const isFirstColumn = cellIndex === 0
                  const isLastColumn = cellIndex === row.getVisibleCells().length - 1
                  return (
                    <div
                      key={cell.id}
                      style={{
                        width: meta?.width || `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L})`,
                        minWidth: meta?.width || `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L})`,
                        flex: meta?.sticky ? FLEX.ZERO : FLEX.ONE,
                        paddingTop: SPACING.M,
                        paddingBottom: SPACING.M,
                        paddingLeft: isFirstColumn ? SPACING.L : SPACING.M,
                        paddingRight: isLastColumn ? SPACING.L : SPACING.M,
                        flexShrink: FLEX.ZERO,
                        overflow: OVERFLOW.HIDDEN,
                        display: DISPLAY.FLEX,
                        alignItems: ALIGN_ITEMS.CENTER,
                        justifyContent: meta?.align === 'right' ? JUSTIFY_CONTENT.FLEX_END : meta?.align === 'center' ? JUSTIFY_CONTENT.CENTER : JUSTIFY_CONTENT.FLEX_START,
                        position: meta?.sticky ? POSITION_TYPE.STICKY : POSITION_TYPE.RELATIVE,
                        right: meta?.stickyRight,
                        backgroundColor: rowBgColor,
                        zIndex: meta?.sticky ? Z_INDEX.COMPONENT_CONTENT : undefined,
                        borderLeft: meta?.borderLeft ? `${BORDER_WIDTH.THIN} solid ${COLOR.GREY.LIGHT_MEDIUM}` : undefined,
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
