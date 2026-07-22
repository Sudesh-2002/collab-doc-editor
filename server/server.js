import 'dotenv/config'
import { WebSocketServer } from 'ws'
import http from 'http'
import mongoose from 'mongoose'
import * as Y from 'yjs'
import { setupWSConnection } from 'y-websocket/bin/utils.js'
import DocumentModel from './models/Document.js'

await mongoose.connect(process.env.MONGO_URI)
console.log('MongoDB connected')

const server = http.createServer()
const wss = new WebSocketServer({ server })

// In-memory cache of active Yjs docs (per room)
const docs = new Map()

async function loadDocument(roomId) {
  const existing = await DocumentModel.findOne({ roomId })
  const ydoc = new Y.Doc()
  if (existing) {
    Y.applyUpdate(ydoc, existing.state)
  }
  return ydoc
}

async function saveDocument(roomId, ydoc) {
  const state = Buffer.from(Y.encodeStateAsUpdate(ydoc))
  await DocumentModel.findOneAndUpdate(
    { roomId },
    { state, updatedAt: new Date() },
    { upsert: true }
  )
}

wss.on('connection', async (conn, req) => {
  const roomId = req.url.slice(1).split('?')[0] || 'default-room'

  if (!docs.has(roomId)) {
    const ydoc = await loadDocument(roomId)
    docs.set(roomId, ydoc)
  }

  setupWSConnection(conn, req, { docName: roomId, gc: true })

  const ydoc = docs.get(roomId)

  // Debounced save — avoid hammering MongoDB on every keystroke
  let saveTimeout
  ydoc.on('update', () => {
    clearTimeout(saveTimeout)
    saveTimeout = setTimeout(() => saveDocument(roomId, ydoc), 2000)
  })
})

const PORT = process.env.PORT || 1234
server.listen(PORT, () => console.log(`WebSocket server running on port ${PORT}`))