import React, { useEffect, useRef, useState } from 'react'

export default function AddCardModal({ onClose, onAdd }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedId, setSelectedId] = useState(null)

  const key = import.meta.env.VITE_PTCG_KEY
  const abortRef = useRef(null)
  const cacheRef = useRef(new Map())

  useEffect(() => {
    // quick reset if query is empty
    if (!query) {
      // abort any inflight
      if (abortRef.current) {
        try { abortRef.current.abort() } catch (e) {}
        abortRef.current = null
      }
      setResults([])
      setError(null)
      setLoading(false)
      return
    }

    // if cached, use it immediately
    if (cacheRef.current.has(query)) {
      setResults(cacheRef.current.get(query))
      setError(null)
      setLoading(false)
      return
    }

    // clear any previous timeout/fetch by aborting in-flight request immediately
    if (abortRef.current) {
      try { abortRef.current.abort() } catch (e) {}
      abortRef.current = null
    }

    // prepare to fetch after debounce
    setError(null)
    const id = setTimeout(() => {
      setLoading(true)
      setResults([]) // clear previous results so UI shows loading state

      const controller = new AbortController()
      abortRef.current = controller

  const q = encodeURIComponent(`name:${query}`)
  // Request only the required fields (id, name, images) to reduce payload size
  const url = `/api/tcg/cards?q=${q}&page=1&pageSize=1&select=id,name,images`

      fetch(url, { signal: controller.signal })
        .then((r) => {
          if (!r.ok) throw new Error(`API ${r.status}`)
          return r.json()
        })
        .then((data) => {
          // keep only the first matching card to minimize client work
          const first = (data.data && data.data.length > 0) ? data.data[0] : null
          const mapped = first ? [{ id: first.id, name: first.name, images: first.images || null, raw: first }] : []
          cacheRef.current.set(query, mapped)
          setResults(mapped)
        })
        .catch((err) => {
          if (err.name === 'AbortError') return
          setError(err.message || 'Failed to fetch')
          setResults([])
        })
        .finally(() => {
          setLoading(false)
          abortRef.current = null
        })
    }, 350)

    return () => {
      clearTimeout(id)
      if (abortRef.current) {
        try { abortRef.current.abort() } catch (e) {}
        abortRef.current = null
      }
    }
  }, [query, key])

  function handleAdd() {
    const card = results.find((r) => r.id === selectedId)
    if (card) onAdd(card)
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        <h2>Add a card</h2>
        <p>Search for a card by name (Pokemon TCG). Select a result then click Add.</p>
        {!key && <p style={{ color: 'crimson' }}>No API key found. Please add VITE_PTCG_KEY to your .env file.</p>}

        <input className="card-search" value={query} onChange={(e) => { setQuery(e.target.value); setSelectedId(null) }} placeholder="Search card name..." />

        <div className="results">
          {loading && <div>Loading…</div>}
          {error && <div style={{ color: 'crimson' }}>{error}</div>}
          {!loading && !error && results.length === 0 && query && <div>No results</div>}

          {results.map((r) => (
            <div key={r.id} className={`result ${selectedId === r.id ? 'selected' : ''}`} onClick={() => setSelectedId(r.id)}>
              {r.image && <img src={r.image} alt={r.name} />}
              <div className="result-name">{r.name}</div>
            </div>
          ))}
        </div>

        <div className="modal-actions">
          <button className="btn ghost" onClick={onClose}>Cancel</button>
          <button className="btn" onClick={handleAdd} disabled={!selectedId}>Add</button>
        </div>
      </div>
    </div>
  )
}
