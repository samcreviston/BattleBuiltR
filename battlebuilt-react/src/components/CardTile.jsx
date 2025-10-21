import React from 'react'

export default function CardTile({ card, onClick, isAdd = false }) {
  return (
    <div className={`card-tile ${isAdd ? 'add-card' : ''}`} onClick={onClick}>
      {isAdd ? (
        <div className="add-inner">
          <div className="plus">+</div>
          <div className="add-text">click to add a card</div>
        </div>
      ) : (
        <div className="card-inner">
          <div className="card-name">{card.name}</div>
        </div>
      )}
    </div>
  )
}
