import mongoose from 'mongoose'

const DeckSchema = new mongoose.Schema(
  {
    index: { type: String, required: true, unique: true }, // matches file-based id
    name: { type: String, required: true },
    description: { type: String, default: '' },
    author: { type: String, default: '' },
    game: { type: String, required: true },
    cards: { type: [mongoose.Schema.Types.Mixed], default: [] }, // supports strings or objects with id/name/images
    strategyDescription: { type: String, default: '' },
  },
  { timestamps: true }
)

export default mongoose.models.Deck || mongoose.model('Deck', DeckSchema)
