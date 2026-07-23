import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { PRODUCTS } from '../data/products'

const NAV_LINKS = [
  { label: 'New', to: '/shop' },
  { label: 'Men', to: '/shop?category=Men' },
  { label: 'Women', to: '/shop?category=Women' },
  { label: 'Accessories', to: '/shop?category=Accessories' },
  { label: 'Sale', to: '/shop?tag=Sale' },
]

export default function Navbar() {
  const { count } = useCart()
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const results =
    query.trim().length > 1
      ? PRODUCTS.filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 5)
      : []

  return (
    <header className="sticky top-0 z-40 bg-ink/90 backdrop-blur-md border-b border-line">
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="Z Verse home">
          <img src="/assets/logo.png" alt="" aria-hidden="true" className="w-8 h-8 rounded-[6px] object-cover" />
          <span className="font-display font-black text-lg tracking-tight leading-none">
            Z<span className="text-signal">VERSE</span>
            <span className="hidden sm:block font-mono text-[9px] font-normal tracking-widest2 uppercase text-steel mt-0.5">
              Wear the future
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `font-mono text-[11px] tracking-widest2 uppercase transition-colors ${
                  isActive ? 'text-paper' : 'text-steel hover:text-paper'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4 md:gap-5">
          <button
            aria-label="Search"
            onClick={() => setSearchOpen((s) => !s)}
            className="text-paper hover:text-signal transition-colors"
          >
            <Search size={19} aria-hidden="true" />
          </button>
          <Link to="/account" aria-label="Account" className="text-paper hover:text-signal transition-colors">
            <User size={19} aria-hidden="true" />
          </Link>
          <Link to="/cart" aria-label="Shopping bag" className="relative text-paper hover:text-signal transition-colors">
            <ShoppingBag size={19} aria-hidden="true" />
            {count > 0 && (
              <span
                key={count}
                className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-signal text-paper text-[9px] font-mono flex items-center justify-center animate-popIn"
              >
                {count > 9 ? '9+' : count}
              </span>
            )}
          </Link>
          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
            className="md:hidden text-paper"
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-line bg-ink-2 px-5 md:px-8 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 border border-line px-3 py-2.5 bg-ink-3">
              <Search size={16} className="text-steel shrink-0" aria-hidden="true" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products"
                className="bg-transparent flex-1 text-sm outline-none border-none py-0"
              />
            </div>
            {results.length > 0 && (
              <div className="mt-2 border border-line bg-ink-3 divide-y divide-line">
                {results.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      navigate(`/product/${p.id}`)
                      setSearchOpen(false)
                      setQuery('')
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-ink-2 transition-colors"
                  >
                    <span className="text-sm">{p.name}</span>
                    <span className="font-mono text-xs text-steel">₹{p.price.toLocaleString('en-IN')}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {open && (
        <div className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-ink z-30 px-6 py-8 overflow-y-auto">
          <div className="flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setOpen(false)}
                className="font-display text-2xl font-bold"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
