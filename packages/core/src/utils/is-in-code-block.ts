import type { NodeType } from '@prosekit/pm/model'
import type { Selection } from '@prosekit/pm/state'

function isCodeBlockType(type: NodeType) {
  return type.spec.code && type.isBlock
}

/**
 * Check if the selection is in a code block.
 *
 * @internal
 */
export function isInCodeBlock(selection: Selection) {
  return (
    isCodeBlockType(selection.$from.parent.type) ||
    isCodeBlockType(selection.$to.parent.type)
  )
}
