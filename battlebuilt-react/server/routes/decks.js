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

// PUT /api/decks/:index -> update text fields
router.put('/:index', async (req, res) => {
  try {
    await connectDB()
    const allowed = ['name', 'description', 'strategyDescription', 'author', 'game']
    const updates = {}
    for (const k of allowed) if (k in req.body) updates[k] = req.body[k]
    if (Object.keys(updates).length === 0) return res.status(400).json({ error: 'No updatable fields provided' })
    const result = await Deck.updateOne({ index: req.params.index }, { $set: updates })
    if (result.matchedCount === 0) return res.status(404).json({ error: 'Not found' })
    const latest = await Deck.findOne({ index: req.params.index }, { _id: 0 }).lean()
    res.json(latest)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE /api/decks/:index -> delete deck
router.delete('/:index', async (req, res) => {
  try {
    await connectDB()
    const result = await Deck.deleteOne({ index: req.params.index })
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Not found' })
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
