// Express server for BattleBuiltR API
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './lib/db.js'
import decksRouter from './routes/decks.js'

const app = express()
app.use(cors())
app.use(express.json())

// Health check
app.get('/api/health', async (req, res) => {
  try {
    const status = await connectDB()
    res.json({ ok: true, db: status })
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message })
  }
})

// Decks API
app.use('/api/decks', decksRouter)

const PORT = process.env.PORT || 3001
app.listen(PORT, async () => {
  await connectDB()
  console.log(`API server listening on http://localhost:${PORT}`)
})
