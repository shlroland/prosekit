import type { VirtualElement } from '@floating-ui/dom'
import {
  union,
  defineDOMEventHandler,
  type FindParentNodeResult,
} from '@prosekit/core'
import {
  columnFirstCellPos,
  findTable,
  getCellAxisByMouseEvent,
  type CellAxis,
} from '@prosekit/extensions/table'
import { type EditorView } from '@prosekit/pm/view'

import { throttle } from '../../../utils/throttle'

export type ElementHoverHandler = (
  reference: VirtualElement | null,
  table: FindParentNodeResult | null,
  cellAxis: CellAxis | null,
) => void

export function defineElementHoverHandler(handler: ElementHoverHandler) {
  const handlePointerEvent = (view: EditorView, event: PointerEvent) => {
    const cellAxis = getCellAxisByMouseEvent(view, event)
    if (!cellAxis) return handler(null, null, null)
    const table = findTable(cellAxis?.$cell)
    if (!table) return handler(null, null, null)
    const pos = columnFirstCellPos(table.node, table.pos, cellAxis.col)
    const columnCellDom = view.nodeDOM(pos) as HTMLElement
    if (!columnCellDom) return handler(null, null, null)

    return handler(columnCellDom, table, {
      col: cellAxis.col,
      row: cellAxis.row,
    })
  }

  return union(
    defineDOMEventHandler('pointermove', throttle(handlePointerEvent, 200)),
    defineDOMEventHandler('pointerout', handlePointerEvent),
    defineDOMEventHandler('keypress', () => handler(null, null, null)),
  )
}
