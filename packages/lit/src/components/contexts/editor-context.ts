import { createContext } from '@lit/context'
import type { Editor } from '@prosekit/core'

export const editorContext = createContext<Editor | null>(
  Symbol.for('prosekit-editor-context'),
)
