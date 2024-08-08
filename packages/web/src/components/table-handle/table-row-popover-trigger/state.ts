import {
  useEventListener,
  type ConnectableElement,
  type SignalState,
} from '@aria-ui/core'
import { useMenuTrigger } from '@aria-ui/menu'
import { selectRow } from '@prosekit/extensions/table'

import { tableRowPopoverContext } from '../context'

import type { TableRowPopoverTriggerProps } from './props'

export function useTableRowPopoverTrigger(
  host: ConnectableElement,
  state: SignalState<TableRowPopoverTriggerProps>,
) {
  useMenuTrigger(host)

  const context = tableRowPopoverContext.consume(host)

  useEventListener(host, 'pointerdown', () => {
    const editor = state.editor.get()
    if (!editor) return
    const { cellAxis, table } = context.get()
    if (!cellAxis || !table) return
    const { view } = editor
    selectRow({ table, rowIndex: cellAxis.row })(
      view.state,
      view.dispatch.bind(view),
      view,
    )
  })
}
