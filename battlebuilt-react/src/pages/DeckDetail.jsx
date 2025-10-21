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
    fetch(`/data/decks/${index}.json`)
      .then((r) => {
        if (!r.ok) throw new Error('not found')
        return r.json()
      })
      .then((d) => {
        setDeck({ index: index, name: d.name, description: d.description, game: d.game })
        setCards(d.cards || null)
      })
      .catch(() => {
        fetch('/data/decks.json')
          .then((r) => r.json())
          .then((data) => {
            const found = data.find((d) => d.index === index) || null
            setDeck(found)
          })
          .catch((err) => console.error('Failed to load deck', err))
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
            {cards && (
              <section>
                <h3>Cards</h3>
                <ul>
                  {cards.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
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
