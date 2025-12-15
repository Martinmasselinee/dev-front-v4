'use client'

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
import { TEXT_ALIGN } from '../constants/text'

interface TableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  getRowBackgroundColor?: (row: Row<T>, index: number) => string
}

export function Table<T>({ 
  data, 
  columns, 
  getRowBackgroundColor 
}: TableProps<T>) {
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
            top: POSITION.ZERO,
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
                    width: meta?.width || `calc(10 * ${SPACING.L})`,
                    minWidth: meta?.width || `calc(10 * ${SPACING.L})`,
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
            const rowBgColor = getRowBackgroundColor 
              ? getRowBackgroundColor(row, rowIndex)
              : rowIndex % 2 === 0 ? COLOR.WHITE : COLOR.GREY.LIGHT

            return (
              <div
                key={row.id}
                style={{
                  display: DISPLAY.FLEX,
                  backgroundColor: rowBgColor,
                  width: WIDTH.FULL,
                  minWidth: 'max-content',
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
                        width: meta?.width || `calc(10 * ${SPACING.L})`,
                        minWidth: meta?.width || `calc(10 * ${SPACING.L})`,
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
                        backgroundColor: meta?.sticky ? rowBgColor : undefined,
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
