import { BaseElement, type SignalState } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'
import { defineProperties } from '../../../utils/define-properties'

import { defaultResizableRootProps, type ResizableRootProps } from './props'
import { useResizableRoot } from './state'

class ResizableRootElement extends BaseElement implements ResizableRootProps {
  readonly _s: SignalState<ResizableRootProps>

  constructor() {
    super()
    this._s = useResizableRoot(this)
  }
}

interface ResizableRootElement extends ResizableRootProps {}

defineProperties(ResizableRootElement, defaultResizableRootProps)

defineCustomElement('prosekit-resizable-root', ResizableRootElement)

export { ResizableRootElement }