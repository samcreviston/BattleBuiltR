import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function DeckDetail() {
  const { index } = useParams()
  const navigate = useNavigate()
  const [deck, setDeck] = useState(null)
  const [cards, setCards] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ name: '', author: '', description: '', strategyDescription: '', game: '' })

  useEffect(() => {
    if (!index) return
    fetch(`/api/decks/${index}`)
      .then((r) => {
        if (!r.ok) throw new Error('not found')
        return r.json()
      })
      .then((d) => {
        const full = { index: d.index, name: d.name, author: d.author || '', description: d.description || '', strategyDescription: d.strategyDescription || '', game: d.game }
        setDeck(full)
        setCards(d.cards || null)
        setForm({ name: full.name, author: full.author, description: full.description, strategyDescription: full.strategyDescription, game: full.game })
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
            {!editing ? (
              <>
                <h1>{deck.name}</h1>
                {deck.author ? <p><strong>Author:</strong> {deck.author}</p> : null}
                <p className="deck-description">{deck.description}</p>
                {deck.strategyDescription ? (
                  <p className="deck-description"><strong>BattleGuide:</strong> {deck.strategyDescription}</p>
                ) : null}
                <p>
                  <strong>Game:</strong> <span className="deck-game">{deck.game}</span>
                </p>
                <div style={{ marginTop: 12 }}>
                  <button className="btn" onClick={() => setEditing(true)}>Edit</button>
                </div>
              </>
            ) : (
              <>
                <h1>Edit Deck</h1>
                <div className="builder-form" style={{ marginTop: 12 }}>
                  <label>Name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  <label>Author</label>
                  <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
                  <label>Description</label>
                  <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                  <label>BattleGuide</label>
                  <textarea rows={3} value={form.strategyDescription} onChange={(e) => setForm({ ...form, strategyDescription: e.target.value })} />
                </div>
                <div style={{ marginTop: 12 }}>
                  <button className="btn" disabled={saving} onClick={async () => {
                    setSaving(true)
                    try {
                      const res = await fetch(`/api/decks/${deck.index}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          name: form.name,
                          author: form.author,
                          description: form.description,
                          strategyDescription: form.strategyDescription,
                        }),
                      })
                      if (!res.ok) throw new Error(await res.text())
                      const updated = await res.json()
                      setDeck({ ...deck, ...updated })
                      setEditing(false)
                    } catch (err) {
                      alert(`Save failed: ${err.message || err}`)
                    } finally {
                      setSaving(false)
                    }
                  }}>{saving ? 'Saving…' : 'Save'}</button>
                  <button className="btn ghost" style={{ marginLeft: 8 }} onClick={() => { setEditing(false); setForm({ name: deck.name, author: deck.author || '', description: deck.description || '', strategyDescription: deck.strategyDescription || '', game: deck.game }) }}>Cancel</button>
                </div>
              </>
            )}
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
            <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
              <Link to="/" className="btn ghost">Back</Link>
              <button className="btn ghost" style={{ marginLeft: 8, borderColor: 'crimson', color: 'crimson' }} onClick={async () => {
                if (!confirm('Delete this deck? This cannot be undone.')) return
                try {
                  const res = await fetch(`/api/decks/${deck.index}`, { method: 'DELETE' })
                  if (!res.ok) throw new Error(await res.text())
                  navigate('/')
                } catch (err) {
                  alert(`Delete failed: ${err.message || err}`)
                }
              }}>Delete</button>
            </div>
          </article>
        ) : (
          <p>Deck not found.</p>
        )}
      </main>
      <Footer />
    </div>
  )
}
