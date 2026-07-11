import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Collaboration from '@tiptap/extension-collaboration'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { useMemo, useEffect } from 'react'

export default function Editor() {
  const ydoc = useMemo(() => new Y.Doc(), [])

  const provider = useMemo(
    () => new WebsocketProvider('ws://localhost:1234', 'my-document-room', ydoc),
    [ydoc]
  )

  useEffect(() => {
    return () => provider.destroy()
  }, [provider])

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ history: false }),
      Collaboration.configure({ document: ydoc }),
    ],
  })

  return (
    <div className="editor-wrapper">
      <EditorContent editor={editor} />
    </div>
  )
}