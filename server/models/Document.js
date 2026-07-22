import mongoose from 'mongoose'

const documentSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  state: { type: Buffer, required: true }, // stores the Yjs binary update
  updatedAt: { type: Date, default: Date.now },
})

export default mongoose.model('Document', documentSchema)