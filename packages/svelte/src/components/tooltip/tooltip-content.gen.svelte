<script lang="ts">
import '@prosekit/web/tooltip'

import { tooltipContentProps, tooltipContentEvents } from '@prosekit/web/tooltip'
import { ClientUpdate } from '../client-update'
import { useComponent } from '../use-component'
import { useEventHandlers } from '../use-event-handlers'

let attributes: Record<string, unknown> = {}
let eventHandlers: Record<string, (...args: any[]) => any> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useComponent(Object.keys(tooltipContentProps), Object.keys(tooltipContentEvents))

$: {
  [attributes, eventHandlers] = handleChange(element, $$props)
}
</script>

<ClientUpdate>
  <prosekit-tooltip-content {...attributes} use:useEventHandlers={eventHandlers} bind:this={element}>
    <slot />
  </prosekit-tooltip-content>
</ClientUpdate>
