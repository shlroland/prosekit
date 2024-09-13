import { provide } from '@lit/context'
import { Editor } from '@prosekit/core'
import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '@prosemirror-adapter/lit'

import { editorContext } from './contexts/editor-context'
import { ShallowLitElement } from './shallow-lit-element'


@customElement('prosekit-editor')
export class ProsekitEditor extends ShallowLitElement {
  @provide({ context: editorContext })
  @property({ type: Editor, attribute: 'editor' })
  editor: Editor | null = null

  protected render(): unknown {
    return html`
      <prosemirror-adapter-provider>
        <slot></slot>
      </prosemirror-adapter-provider>
    `
  }
}
