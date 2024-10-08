import type { ConnectableElement, ReadonlySignal } from '@aria-ui/core'
import {
  type Editor,
  type FocusChangeHandler,
  defineFocusChangeHandler,
} from '@prosekit/core'

import { useEditorExtension } from './use-editor-extension'

/**
 * @internal
 */
export function useEditorFocusChangeEvent(
  host: ConnectableElement,
  editor: ReadonlySignal<Editor | null>,
  handler: FocusChangeHandler,
) {
  const extension = defineFocusChangeHandler(handler)
  useEditorExtension(host, editor, extension)
}
