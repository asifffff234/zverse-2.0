import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-5 py-24 flex flex-col items-center text-center">
      <p className="font-mono text-signal text-sm mb-3">404 / NOT FOUND</p>
      <h1 className="font-display text-3xl font-bold">This page doesn't exist.</h1>
      <p className="text-steel text-sm mt-2">The piece you're looking for may have sold out or moved.</p>
      <Link
        to="/"
        className="mt-7 bg-signal text-paper px-7 py-3.5 font-mono text-xs uppercase tracking-wide hover:bg-signal/90 transition-colors"
      >
        Back to home
      </Link>
    </div>
  )
}
