# List

The `list` node is used to represent a list item. It is built on top of [prosemirror-flat-list](https://github.com/ocavue/prosemirror-flat-list).

<!-- @include: @/examples/list.md -->

## Usage

```ts
import 'prosekit/extensions/list/style.css'

import { defineList } from 'prosekit/extensions/list'

const extension = defineList()
```

## Commands

### `dedentList`

Decreases the indentation of selected list nodes.

```ts
editor.commands.dedentList()
```

### `indentList`

Increases the indentation of selected list.

```ts
editor.commands.indentList()
```

### `moveList`

Moves up or down selected list nodes.

```ts
editor.commands.moveList('down')
```

### `splitList`

Split the current list node.

```ts
editor.commands.splitList()
```

### `toggleCollapsed`

Toggle the `collapsed` attribute of the list node.

```ts
editor.commands.toggleCollapsed()
```

### `toggleList`

Wraps the selection in a list with the given type and attributes, or change the list kind if the selection is already in another kind of list, or unwrap the selected list if otherwise.

```ts
editor.commands.toggleList({ kind: 'task', checked: true })
```

### `unwrapList`

Unwraps the list around the selection.

```ts
editor.commands.unwrapList()
```

### `wrapInList`

Wraps the selection in a list with the given type and attributes.

```ts
editor.commands.wrapInList({ kind: 'bullet' })
```

## Keyboard Interaction

To create different types of lists:

- Type `1.` and a space to start an ordered list.
- Type `-` or `*` and a space to start an unordered list.
- Type `[x]` or `[]` and a space to start a task list.
- Type `>>` and a space to start a toggle list.

## API Reference

- [prosekit/extensions/list](/references/extensions/list)
