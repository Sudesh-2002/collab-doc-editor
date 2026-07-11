import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCaret from '@tiptap/extension-collaboration-caret'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { useMemo, useEffect } from 'react'
import { getRandomUser } from './utils/randomUser'

export default function Editor() {
  const ydoc = useMemo(() => new Y.Doc(), [])
  const user = useMemo(() => getRandomUser(), [])

  const provider = useMemo(
    () => new WebsocketProvider('ws://localhost:1234', 'my-document-room', ydoc),
    [ydoc]
  )

  useEffect(() => {
    return () => provider.destroy()
  }, [provider])

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ undoRedo: false }), // note: v3 renamed `history` -> `undoRedo`
      Collaboration.configure({ document: ydoc }),
      CollaborationCaret.configure({
        provider: provider,
        user: user,
      }),
    ],
  })

  return (
    <div className="editor-wrapper">
      <EditorContent editor={editor} />
    </div>
  )
}