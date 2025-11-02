// Seed MongoDB with decks from public/data
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { connectDB } from '../lib/db.js'
import Deck from '../models/Deck.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '../../')

async function run() {
  await connectDB()

  const decksListPath = path.join(root, 'public', 'data', 'decks.json')
  const decksDir = path.join(root, 'public', 'data', 'decks')

  const list = JSON.parse(fs.readFileSync(decksListPath, 'utf8'))
  let count = 0
  for (const entry of list) {
    const fp = path.join(decksDir, `${entry.index}.json`)
    let detail = {}
    if (fs.existsSync(fp)) {
      detail = JSON.parse(fs.readFileSync(fp, 'utf8'))
    }
    const doc = {
      index: entry.index,
      name: entry.name,
      description: entry.description,
      game: entry.game,
      cards: detail.cards || [],
      strategyDescription: detail.strategyDescription || '',
    }
    await Deck.updateOne({ index: doc.index }, { $set: doc }, { upsert: true })
    count++
  }
  console.log(`Seed complete: upserted ${count} decks`)
  process.exit(0)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
