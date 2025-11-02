import mongoose from 'mongoose'

let isConnected = false

export async function connectDB() {
  if (isConnected) return { connected: true }
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI not set')
  if (mongoose.connection.readyState === 1) {
    isConnected = true
    return { connected: true }
  }
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
  })
  isConnected = true
  return { connected: true }
}
