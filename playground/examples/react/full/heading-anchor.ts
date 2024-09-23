import { defineDecoration } from 'prosekit/core'
import { DecorationSet, Decoration, type EditorView } from 'prosekit/pm/view'

export function defineHeadingAnchor() {
  return defineDecoration((state) => {
    const { $from } = state.selection
    const node = $from.node()
    if (node.type.name !== 'heading') return DecorationSet.empty

    return DecorationSet.create(state.doc, [
      Decoration.widget($from.before() , createHeadingAnchorWidget),
    ])
  })
}

function createHeadingAnchorWidget(view: EditorView, getPos: () => number | undefined) {
  const dom = document.createElement('span')
  dom.style = {
    position: 'absolute',
    left: 0,
    top: 0,
  }
  dom.textContent = '#'
  return dom
}
