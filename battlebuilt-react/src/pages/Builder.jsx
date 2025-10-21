import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CardTile from '../components/CardTile'
import AddCardModal from '../components/AddCardModal'

export default function Builder() {
  const [game, setGame] = useState('')
  const [step, setStep] = useState(0)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [battleGuide, setBattleGuide] = useState('')

  const [cards, setCards] = useState([])
  const [showAdd, setShowAdd] = useState(false)

  function onAddCard(card) {
    setCards((s) => [...s, { id: card.id, name: card.name, images: card.images || null }])
    setShowAdd(false)
  }

  function removeCard(idx) {
    setCards((s) => s.filter((_, i) => i !== idx))
  }

  function canSubmit() {
    return title.trim() && author.trim() && battleGuide.trim() && cards.length >= 3
  }

  if (!step) {
    return (
      <div>
        <Header />
        <main className="container">
          <h1>Deck Builder</h1>
          <p>Select the game you're building a deck for:</p>
          <div style={{ marginTop: 12 }}>
            <label>
              <input type="radio" name="game" value="Pokemon" onChange={() => { setGame('Pokemon'); setStep(1) }} /> Pokemon
            </label>
            <label style={{ marginLeft: 12 }}>
              <input type="radio" name="game" value="MTG" onChange={() => alert('MTG deck builder coming soon')} /> MTG (coming soon)
            </label>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  function handleSubmit() {
    // prepare JSON here; in the real app we'd send it to an API
    // submission popup removed — this is a no-op placeholder
  }

  return (
    <div>
      <Header />
      <main className="container">
        <h1>Deck Builder — {game}</h1>

        <section className="builder-form" style={{ marginTop: 12 }}>
          <label>Deck Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter deck title" />

          <label>Author</label>
          <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Your name" />

          <label>BattleGuide</label>
          <textarea value={battleGuide} onChange={(e) => setBattleGuide(e.target.value)} placeholder="Describe your deck (BattleGuide)" rows={4} />
        </section>

        <section style={{ marginTop: 24 }}>
          <h2>Cards</h2>
          <div className="card-grid">
            {cards.map((c, i) => (
              <div key={c.id} style={{ position: 'relative' }}>
                <CardTile card={c} />
                <button style={{ position: 'absolute', top: 6, right: 6 }} onClick={() => removeCard(i)}>x</button>
              </div>
            ))}

            <CardTile isAdd onClick={() => setShowAdd(true)} />
          </div>
        </section>

        <div style={{ marginTop: 24 }}>
          <button className="btn ghost" onClick={() => { setStep(0); setGame('') }}>Cancel</button>
          <button className="btn" disabled={!canSubmit()} style={{ marginLeft: 12 }} onClick={handleSubmit}>Submit Deck</button>
        </div>

        {showAdd && <AddCardModal onClose={() => setShowAdd(false)} onAdd={onAddCard} />}
  {/* submission popup removed */}
      </main>
      <Footer />
    </div>
  )
}
