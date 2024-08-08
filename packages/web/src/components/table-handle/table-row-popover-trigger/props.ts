import type { Editor } from '@prosekit/core'

export interface TableRowPopoverTriggerProps {
  editor: Editor | null
}

export const defaultTableRowPopoverTriggerProps = Object.freeze({
  editor: null,
})
