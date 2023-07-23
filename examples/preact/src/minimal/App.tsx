import 'prosekit/basic/style.css'

import { useMemo } from 'preact/hooks'
import { addBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/preact'

export default function App() {
  const editor = useMemo(() => {
    const extension = addBasicExtension()
    return createEditor({ extension })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div ref={editor.mount} className="example-editor"></div>
    </ProseKit>
  )
}