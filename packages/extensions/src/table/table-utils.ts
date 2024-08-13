import { findParentNodeOfType } from '@prosekit/core'
import type { ResolvedPos } from '@prosekit/pm/model'
import type { EditorView } from '@prosekit/pm/view'
import type { ProsemirrorNode } from 'prosemirror-flat-list'
import { cellAround, CellSelection, TableMap } from 'prosemirror-tables'

export interface CellAxis {
  row: number
  col: number
}

export interface CellAxisWithPos extends CellAxis {
  $cell: ResolvedPos
}

export function isCellSelection(value: unknown): value is CellSelection {
  return typeof value === 'object' && value instanceof CellSelection
}

export function domCellAround(target: EventTarget | null): HTMLElement | null {
  while (
    target &&
    target instanceof HTMLElement &&
    target.nodeName != 'TD' &&
    target.nodeName != 'TH'
  )
    target = target.classList.contains('ProseMirror') ? null : target.parentNode
  return target as HTMLElement
}

export function getCellAxisByMouseEvent(
  view: EditorView,
  event: MouseEvent,
): CellAxisWithPos | null {
  const domCell = domCellAround(event.target)

  if (!domCell) {
    return null
  }

  const domCellRect = domCell.getBoundingClientRect()

  /**
   * `+1`  Ensure that the coordinates are within the selected cell,
   *  otherwise `Prosemirror` may mistakenly identify it as being in the previous cell.
   * */
  return getCellAxisByCoords(view, {
    left: domCellRect.left + 1,
    top: domCellRect.top + 1,
  })
}

export function getCellAxisByCoords(
  view: EditorView,
  coords: { left: number; top: number },
): CellAxisWithPos | null {
  const cellPos = view.posAtCoords(coords)

  if (!cellPos) {
    return null
  }

  const $cell = cellAround(view.state.doc.resolve(cellPos.pos))

  if (!$cell) {
    return null
  }

  const map = TableMap.get($cell.node(-1))
  const start = $cell.start(-1)
  const rect = map.findCell($cell.pos - start)
  const { left: col, top: row } = rect

  return { col, row, $cell }
}

export function findTable($pos: ResolvedPos) {
  return findParentNodeOfType('table', $pos)
}

export function getCellIndex(
  map: TableMap,
  rowIndex: number,
  colIndex: number,
): number {
  return map.width * rowIndex + colIndex
}

export function columnFirstCellPos(
  table: ProsemirrorNode,
  tablePos: number,
  index: number,
) {
  const map = TableMap.get(table)
  const cellIndex = getCellIndex(map, 0, index)
  const posInTable = map.map[cellIndex]
  return tablePos + posInTable + 1
}

export function rowFirstCellPos(
  table: ProsemirrorNode,
  tablePos: number,
  index: number,
) {
  const map = TableMap.get(table)
  const cellIndex = getCellIndex(map, index, 0)
  const posInTable = map.map[cellIndex]
  return tablePos + posInTable + 1
}
