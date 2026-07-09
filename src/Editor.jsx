import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export default function Editor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Start typing here...</p>',
  })

  return (
    <div className="editor-wrapper">
      <EditorContent editor={editor} />
    </div>
  )
}