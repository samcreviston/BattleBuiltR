import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DeckDetail from './pages/DeckDetail'
import Builder from './pages/Builder'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
  <Route path="/deck/:index" element={<DeckDetail />} />
  <Route path="/builder" element={<Builder />} />
      </Routes>
    </BrowserRouter>
  )
}
