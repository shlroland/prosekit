 目前我对 flip-grid 的判断可以总结成这几条。

  flip-grid 的本质是一个“多列内容布局”扩展，不是和 flip 动效相关的东西。它定义了 flipGrid 容器节点和 flipGridColumn 列节点，提供 setFlipGrid(columns) 命令插入分栏，并在 node view 里做列的插入、删除和宽度重分配。现有命名和真实语义不完全一致，更像历史
  命名残留。

  从结构职责上看，这个扩展现在有点过度依赖 node view。尤其是容器的 display: flex 和 gap，目前主要是在 src/prosekit/extensions/flip-grid/view.tsx:20 里通过运行时 DOM 操作生效；而 schema 的 src/prosekit/extensions/flip-grid/spec.ts:28 只输出了 data-
  type、data-gap，没有把基础布局表达完整。这意味着一旦脱离 node view，flip-grid 的最基本分栏展示都会退化。

  所以更合理的分层应该是：

  - schema / 静态 DOM：负责节点成立所需的基础语义和基础展示
  - CSS：负责 [data-type="flip-grid"]、[data-type="flip-grid-column"] 这类稳定选择器上的基础布局样式
  - node view：只负责编辑器增强能力，比如 hover 控件、选中态、插入列、删除列、交互修正

  具体到样式，我认为这些不该只依赖 node view：

  - [data-type="flip-grid"] 的 display: flex
  - [data-type="flip-grid"] 的 align-items: stretch
  - [data-type="flip-grid"] 的 width: 100%
  - gap 的实际生效路径
  - [data-type="flip-grid-column"] 的 min-width: 0

  选择器上，用 [data-type="flip-grid"] 和 [data-type="flip-grid-column"] 是对的，因为这是 schema 产出的稳定结构，比依赖 React/node view 的临时 class 更稳，也更适合 SSR、只读渲染、序列化 HTML 和调试。

  gap 这块我现在的判断很明确：它不应该只作为数据属性存在，也不应该只靠 node view 设置内联样式。更稳的做法是二选一：

  - 在 toDOM 里直接输出 style: gap: ...
  - 或输出 CSS 变量，比如 --flip-grid-gap，再由 [data-type="flip-grid"] { gap: var(--flip-grid-gap, 16px); } 消费

  isolating: true 和 defining: true 的使用是合理的。这个扩展本身是结构性布局节点，确实应该阻止普通编辑行为随意把边界冲散，也应该让编辑器在替换/粘贴时尽量保留这个结构，而不是把它当成普通包裹层。

  如果你接下来要动这块，我会建议目标不是“重写 flip-grid”，而是“把基础布局能力从 node view 下沉出来，让 node view 回到增强层”。这样改完之后，这个扩展的行为会更稳，DOM 语义也会更自洽。
