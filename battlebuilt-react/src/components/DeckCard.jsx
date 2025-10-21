import React from 'react'
import { Link } from 'react-router-dom'

export default function DeckCard({ deck }) {
  return (
    <article className="deck-card" aria-labelledby={`deck-${deck.index}`}>
      <h3 id={`deck-${deck.index}`}>{deck.name}</h3>
      <div className="deck-description">{deck.description}</div>
      <div>
        <small className="deck-game">{deck.game}</small>
      </div>
      <p style={{ marginTop: 12 }}>
        <Link className="btn ghost" to={`/deck/${deck.index}`}>View</Link>
      </p>
    </article>
  )
}
