import React from 'react'
import { Link } from 'react-router-dom'

export default function SubmittedModal({ onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        <h2>Your deck has been submitted!</h2>
        <p>Thanks — your deck JSON has been prepared and would be sent to the submission endpoint in a production flow.</p>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
          <Link to="/" className="btn ghost">Return to Home</Link>
        </div>
      </div>
    </div>
  )
}
