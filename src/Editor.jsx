import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Collaboration from '@tiptap/extension-collaboration'
import * as Y from 'yjs'
import { useMemo } from 'react'

export default function Editor() {
  // Create a Yjs document — this holds the shared state
  const ydoc = useMemo(() => new Y.Doc(), [])

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false, // Yjs handles undo/redo instead of Tiptap's default
      }),
      Collaboration.configure({
        document: ydoc,
      }),
    ],
  })

  return (
    <div className="editor-wrapper">
      <EditorContent editor={editor} />
    </div>
  )
}