import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import DeckGrid from '../components/DeckGrid'
import SearchBar from '../components/SearchBar'

export default function Home() {
  const [decks, setDecks] = useState([])
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/decks.json')
      .then((r) => r.json())
      .then((data) => setDecks(data))
      .catch((err) => console.error('Failed to load decks', err))
      .finally(() => setLoading(false))
  }, [])

  const filtered = decks.filter((d) => {
    const q = filter.trim().toLowerCase()
    if (!q) return true
    return d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)
  })

  return (
    <div>
      <Header />
      <main className="container">
        <h1>Welcome to BattleBuilt</h1>
        <p>Save and publish card game decks. Start by browsing published decks. Deck Builder feature soon to come.</p>

        <section id="published-decks" style={{ marginTop: 40 }}>
          <h2>Published Decks</h2>
          <SearchBar value={filter} onChange={setFilter} />

          {loading ? (
            <p>Loading decks…</p>
          ) : (
            <DeckGrid decks={filtered} />
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
