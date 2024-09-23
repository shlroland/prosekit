import {
  type EditorState,
  PluginKey,
  ProseMirrorPlugin,
} from '@prosekit/pm/state'
import { DecorationSet } from '@prosekit/pm/view'

import { defineFacet } from '../facets/facet'
import { defineFacetPayload } from '../facets/facet-extension'
import type { PlainExtension } from '../types/extension'

import { pluginFacet, type PluginPayload } from './plugin'

type DecorationPayload = (state: EditorState) => DecorationSet

export function defineDecoration(payload: DecorationPayload): PlainExtension {
  return defineFacetPayload(decorationFacet, [payload]) as PlainExtension
}

const decorationFacet = defineFacet<DecorationPayload, PluginPayload>({
  reduce: () => {
    let initialDecorationSet = DecorationSet.empty
    return (inputs) => {
      const decorationPlugin = new ProseMirrorPlugin({
        key: new PluginKey('prosekit-decoration'),
        props: {
          decorations: (state) => {
            for (const input of inputs) {
              const decorationSet = input(state)
              initialDecorationSet = initialDecorationSet.add(
                state.doc,
                decorationSet.find(),
              )
            }
            return initialDecorationSet
          },
        },
      })
      return decorationPlugin
    }
  },
  parent: pluginFacet,
})
