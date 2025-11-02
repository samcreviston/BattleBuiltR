import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function DeckDetail() {
  const { index } = useParams()
  const [deck, setDeck] = useState(null)
  const [cards, setCards] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!index) return
    fetch(`/api/decks/${index}`)
      .then((r) => {
        if (!r.ok) throw new Error('not found')
        return r.json()
      })
      .then((d) => {
        setDeck({ index: d.index, name: d.name, description: d.description, game: d.game })
        setCards(d.cards || null)
      })
      .catch((err) => {
        console.error('Failed to load deck', err)
      })
      .finally(() => setLoading(false))
  }, [index])

  return (
    <div>
      <Header />
      <main className="container">
        {loading ? (
          <p>Loading…</p>
        ) : deck ? (
          <article>
            <h1>{deck.name}</h1>
            <p className="deck-description">{deck.description}</p>
            <p>
              <strong>Game:</strong> <span className="deck-game">{deck.game}</span>
            </p>
            {Array.isArray(cards) && cards.length > 0 && (
              <section>
                <h3>Cards</h3>
                <ul>
                  {cards.map((c, i) => {
                    const isObj = c && typeof c === 'object'
                    const name = isObj ? (c.name || c.id || 'Card') : String(c)
                    const key = isObj && c.id ? c.id : i
                    const img = isObj && c.images && (c.images.small || c.images.thumbnail || c.images.large)
                    return (
                      <li key={key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {img ? <img src={img} alt={name} style={{ width: 44, height: 'auto', borderRadius: 4 }} /> : null}
                        <span>{name}</span>
                      </li>
                    )
                  })}
                </ul>
              </section>
            )}
            <p>
              <Link to="/" className="btn ghost">Back</Link>
            </p>
          </article>
        ) : (
          <p>Deck not found.</p>
        )}
      </main>
      <Footer />
    </div>
  )
}
