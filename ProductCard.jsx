import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'

export default function ProductCard({ product }) {
  const [wish, setWish] = useState(false)
  const discount = Math.round((1 - product.price / product.mrp) * 100)

  return (
    <div className="group relative">
      <Link to={`/product/${product.id}`} className="block" aria-label={product.name}>
        <div className="relative aspect-[3/4] bg-ink-2 overflow-hidden">
          <span className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-steel/40 group-hover:border-signal transition-colors z-10" />
          <span className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-steel/40 group-hover:border-signal transition-colors z-10" />

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-6xl font-black text-steel/20 select-none">{product.name.charAt(0)}</span>
          </div>

          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-paper/[0.06] to-transparent pointer-events-none" />

          {product.tag && (
            <span
              className={`absolute top-2.5 right-2.5 font-mono text-[10px] tracking-wide px-2 py-1 uppercase z-10 ${
                product.tag === 'Sale' ? 'bg-oxblood text-paper' : 'bg-signal text-paper'
              }`}
            >
              {product.tag}
            </span>
          )}
        </div>
      </Link>

      <button
        onClick={() => setWish((w) => !w)}
        aria-label={wish ? 'Remove from wishlist' : 'Add to wishlist'}
        className="absolute top-2.5 left-2.5 w-7 h-7 flex items-center justify-center bg-ink/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity z-10"
      >
        <Heart size={14} className={wish ? 'fill-hazard text-hazard' : 'text-paper'} aria-hidden="true" />
      </button>

      <div className="pt-3">
        <p className="font-mono text-[10px] text-steel tracking-widest2 uppercase">{product.code}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm mt-1 hover:text-signal transition-colors">{product.name}</h3>
        </Link>
        <div className="flex items-baseline gap-2 mt-1 flex-wrap">
          <span className="font-mono text-sm">₹{product.price.toLocaleString('en-IN')}</span>
          {product.mrp > product.price && (
            <>
              <span className="font-mono text-xs text-steel line-through">₹{product.mrp.toLocaleString('en-IN')}</span>
              <span className="font-mono text-xs text-signal">{discount}% off</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
