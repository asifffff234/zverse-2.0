import { useState } from 'react'

export default function Account() {
  const [mode, setMode] = useState('login')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="max-w-md mx-auto px-5 py-16 md:py-24">
      <div className="flex flex-col items-center text-center mb-8">
        <img src="/assets/logo.png" alt="Z Verse" className="w-14 h-14 rounded-[10px] object-cover mb-4" />
        <p className="font-mono text-[10px] tracking-widest2 uppercase text-signal">Wear the future</p>
      </div>

      <div className="flex border border-line mb-8">
        <button
          onClick={() => {
            setMode('login')
            setSubmitted(false)
          }}
          className={`flex-1 py-3 font-mono text-xs uppercase tracking-wide transition-colors ${
            mode === 'login' ? 'bg-signal text-paper' : 'text-steel'
          }`}
        >
          Log in
        </button>
        <button
          onClick={() => {
            setMode('signup')
            setSubmitted(false)
          }}
          className={`flex-1 py-3 font-mono text-xs uppercase tracking-wide transition-colors ${
            mode === 'signup' ? 'bg-signal text-paper' : 'text-steel'
          }`}
        >
          Create account
        </button>
      </div>

      {submitted ? (
        <div className="text-center py-10">
          <p className="font-display text-xl font-bold">
            {mode === 'login' ? 'Log in submitted' : 'Account created'}
          </p>
          <p className="text-steel text-sm mt-2 max-w-xs mx-auto">
            This is a UI demo — connect an auth provider to enable real accounts and order history.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'signup' && (
            <input required placeholder="Full name" className="w-full px-3 py-3 border border-line text-sm" />
          )}
          <input required type="email" placeholder="Email address" className="w-full px-3 py-3 border border-line text-sm" />
          <input required type="password" placeholder="Password" className="w-full px-3 py-3 border border-line text-sm" />
          {mode === 'signup' && (
            <input
              required
              type="password"
              placeholder="Confirm password"
              className="w-full px-3 py-3 border border-line text-sm"
            />
          )}

          {mode === 'login' && (
            <div className="text-right">
              <button type="button" className="font-mono text-[11px] text-steel hover:text-signal transition-colors">
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-signal text-paper py-3.5 font-mono text-xs uppercase tracking-wide hover:bg-signal/90 transition-colors mt-2"
          >
            {mode === 'login' ? 'Log in' : 'Create account'}
          </button>
        </form>
      )}
    </div>
  )
}
