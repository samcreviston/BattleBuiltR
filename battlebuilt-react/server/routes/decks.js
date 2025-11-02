import { Router } from 'express'
import Deck from '../models/Deck.js'
import { connectDB } from '../lib/db.js'

const router = Router()

// GET /api/decks -> list summaries
router.get('/', async (req, res) => {
  try {
    await connectDB()
    const decks = await Deck.find({}, { _id: 0, index: 1, name: 1, description: 1, game: 1 })
      .sort({ name: 1 })
      .lean()
    res.json(decks)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/decks/:index -> detail
router.get('/:index', async (req, res) => {
  try {
    await connectDB()
    const deck = await Deck.findOne({ index: req.params.index }, { _id: 0 }).lean()
    if (!deck) return res.status(404).json({ error: 'Not found' })
    res.json(deck)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/decks -> create
router.post('/', async (req, res) => {
  try {
    await connectDB()
    const payload = req.body || {}
    if (!payload.index || !payload.name || !payload.game) {
      return res.status(400).json({ error: 'index, name, and game are required' })
    }
    const created = await Deck.create(payload)
    res.status(201).json({ index: created.index })
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'index already exists' })
    res.status(500).json({ error: err.message })
  }
})

export default router
