import React from 'react'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="deck-filter">
      <label htmlFor="deck-search">Filter decks</label>
      <input id="deck-search" type="search" placeholder="Search by name or description" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}
