import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" to="/">BattleBuilt</Link>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/builder">Deck Builder (In Progress)</Link>
        </nav>
      </div>
    </header>
  )
}
