import React, { useState } from 'react'

export default function AddCardModal({ onClose, onAdd }) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)

  // For now, mock results — API integration will come later
  const mockResults = query
    ? [
        { id: 'pika-1', name: `${query} Sample Card 1` },
        { id: 'pika-2', name: `${query} Sample Card 2` },
      ]
    : []

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        <h2>Add a card</h2>
        <p>Search for a card by name (Pokemon TCG). Select a result then click Add.</p>
        <input className="card-search" value={query} onChange={(e) => { setQuery(e.target.value); setSelected(null) }} placeholder="Search card name..." />

        <div className="results">
          {mockResults.map((r) => (
            <div key={r.id} className={`result ${selected === r.id ? 'selected' : ''}`} onClick={() => setSelected(r.id)}>
              {r.name}
            </div>
          ))}
        </div>

        <div className="modal-actions">
          <button className="btn ghost" onClick={onClose}>Cancel</button>
          <button className="btn" onClick={() => selected && onAdd(mockResults.find((m) => m.id === selected))} disabled={!selected}>Add</button>
        </div>
      </div>
    </div>
  )
}
