import React from 'react'
import DeckCard from './DeckCard'

export default function DeckGrid({ decks }) {
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
