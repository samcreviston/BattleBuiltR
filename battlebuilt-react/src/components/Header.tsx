import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" to="/">BattleBuilt</Link>
        <nav>
          <Link to="/">Home</Link>
          <a href="#">Deck Builder (In Progress)</a>
        </nav>
      </div>
    </header>
  )
}
