import type { Extension } from "@prosekit/core"


export type FlipGridAttrs = {
  gap?: string
}

export type FlipGridColumnAttrs = {
  width?: number
}

export type FlipGridSpecExtension = Extension<{
  Nodes: {
    flipGrid: FlipGridAttrs
    flipGridColumn: FlipGridColumnAttrs
  }
}>

