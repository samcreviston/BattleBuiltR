import React from 'react'
import { Deck } from '../types/deck'
import DeckCard from './DeckCard'

export default function DeckGrid({ decks }: { decks: Deck[] }) {
  if (!decks.length) return <p>No decks found.</p>
  return (
    <section aria-live="polite">
      <div className="deck-grid">
        {decks.map((d) => (
          <DeckCard key={d.index} deck={d} />
        ))}
      </div>
    </section>
  )
}
