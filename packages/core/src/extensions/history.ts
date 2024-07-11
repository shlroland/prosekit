import { history, redo, undo } from '@prosekit/pm/history'

import { union } from '../editor/union'
import { isApple } from '../utils/env'

import { defineCommands } from './command'
import { defineKeymap, type Keymap } from './keymap'
import { definePlugin } from './plugin'

const keymap: Keymap = {
  'Mod-z': undo,
  'Shift-Mod-z': redo,
}

if (!isApple) {
  keymap['Mod-y'] = redo
}

const commands = {
  undo: () => undo,
  redo: () => redo,
} as const

/**
 * Options for {@link defineHistory}.
 *
 * @public
 */
export interface HistoryOptions {
  /**
   * The amount of history events that are collected before the oldest events
   * are discarded.
   *
   * @default 200
   */
  depth?: number

  /**
   * The delay in milliseconds between changes after which a new group should be
   * started.
   *
   * @default 250
   */
  newGroupDelay?: number
}

/**
 * Add undo/redo history to the editor.
 *
 * @public
 */
export function defineHistory({
  depth = 200,
  newGroupDelay = 250,
}: HistoryOptions = {}) {
  return union([
    definePlugin(history({ depth, newGroupDelay })),
    defineKeymap(keymap),
    defineCommands(commands),
  ])
}
