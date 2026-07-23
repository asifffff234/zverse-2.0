import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ChevronDown, Minus, Plus, Star } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import { getProductById, getRelatedProducts } from '../data/products'
import NotFound from './NotFound'

const ACCORDIONS = [
  { id: 'details', label: 'Details & fabric' },
  { id: 'shipping', label: 'Shipping & returns' },
  { id: 'size', label: 'Size & fit guide' },
]

function Stars({ rating }) {
  const full = Math.round(rating)
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={13} className={i <= full ? 'fill-signal text-signal' : 'text-steel'} aria-hidden="true" />
      ))}
    </div>
  )
}

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProductById(id)
  const { addToCart } = useCart()

  const [activeThumb, setActiveThumb] = useState(0)
  const [size, setSize] = useState(null)
  const [color, setColor] = useState(product?.colors?.[0]?.name ?? null)
  const [qty, setQty] = useState(1)
  const [sizeError, setSizeError] = useState(false)
  const [openAccordion, setOpenAccordion] = useState('details')

  if (!product) return <NotFound />

  const discount = Math.round((1 - product.price / product.mrp) * 100)
  const related = getRelatedProducts(product)

  const handleAdd = (goToCheckout = false) => {
    if (!size) {
      setSizeError(true)
      return
    }
    addToCart(product, size, color, qty)
    if (goToCheckout) navigate('/checkout')
  }

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-8 md:py-12">
      <p className="font-mono text-[11px] text-steel uppercase tracking-wide mb-8">
        <Link to="/" className="hover:text-paper transition-colors">Home</Link>
        {' / '}
        <Link to={`/shop?category=${product.category}`} className="hover:text-paper transition-colors">
          {product.category}
        </Link>
        {' / '}
        <span className="text-paper">{product.name}</span>
      </p>

      <div className="grid md:grid-cols-2 gap-10 md:gap-14">
        <div>
          <div className="relative aspect-[3/4] bg-ink-2 flex items-center justify-center">
            <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-steel/50" aria-hidden="true" />
            <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-steel/50" aria-hidden="true" />
            <span className="font-display text-8xl font-black text-steel/20 select-none">{product.name.charAt(0)}</span>
            {product.tag && (
              <span
                className={`absolute top-3 right-3 font-mono text-[10px] tracking-wide px-2 py-1 uppercase ${
                  product.tag === 'Sale' ? 'bg-oxblood text-paper' : 'bg-signal text-paper'
                }`}
              >
                {product.tag}
              </span>
            )}
          </div>
          <div className="grid grid-cols-4 gap-3 mt-3">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                onClick={() => setActiveThumb(i)}
                className={`aspect-square bg-ink-2 flex items-center justify-center border transition-colors ${
                  activeThumb === i ? 'border-signal' : 'border-line'
                }`}
              >
                <span className="font-display text-xl font-black text-steel/30">{product.name.charAt(0)}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-[11px] text-steel tracking-widest2 uppercase">{product.code}</p>
          <h1 className="font-display text-3xl font-bold mt-2">{product.name}</h1>

          <div className="flex items-center gap-2.5 mt-3">
            <Stars rating={product.rating} />
            <span className="text-xs text-steel">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          <div className="flex items-baseline gap-3 mt-5">
            <span className="font-mono text-2xl">₹{product.price.toLocaleString('en-IN')}</span>
            {product.mrp > product.price && (
              <>
                <span className="font-mono text-base text-steel line-through">
                  ₹{product.mrp.toLocaleString('en-IN')}
                </span>
                <span className="font-mono text-sm text-signal">{discount}% off</span>
              </>
            )}
          </div>

          <p className="text-steel text-sm leading-relaxed mt-5 max-w-md">{product.description}</p>

          {product.colors.length > 1 && (
            <div className="mt-7">
              <p className="font-mono text-[11px] tracking-widest2 uppercase text-steel mb-3">
                Color — {color}
              </p>
              <div className="flex gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    aria-label={c.name}
                    className={`w-8 h-8 rounded-full border-2 transition-colors ${
                      color === c.name ? 'border-signal' : 'border-line'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mt-7">
            <div className="flex items-center justify-between mb-3">
              <p className="font-mono text-[11px] tracking-widest2 uppercase text-steel">Size</p>
              {sizeError && <span className="font-mono text-[11px] text-hazard">Select a size</span>}
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSize(s)
                    setSizeError(false)
                  }}
                  className={`min-w-[44px] px-3 py-2.5 border font-mono text-xs transition-colors ${
                    size === s ? 'border-signal bg-signal/10 text-paper' : 'border-line text-steel hover:border-steel'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7">
            <p className="font-mono text-[11px] tracking-widest2 uppercase text-steel mb-3">Quantity</p>
            <div className="flex items-center border border-line w-fit">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center hover:text-signal transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={14} aria-hidden="true" />
              </button>
              <span className="w-10 text-center font-mono text-sm">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-10 h-10 flex items-center justify-center hover:text-signal transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={14} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              onClick={() => handleAdd(false)}
              className="flex-1 bg-signal text-paper py-3.5 font-mono text-xs uppercase tracking-wide hover:bg-signal/90 transition-colors"
            >
              Add to bag
            </button>
            <button
              onClick={() => handleAdd(true)}
              className="flex-1 border border-line py-3.5 font-mono text-xs uppercase tracking-wide hover:border-steel transition-colors"
            >
              Buy now
            </button>
          </div>

          <div className="mt-10 border-t border-line">
            {ACCORDIONS.map((acc) => (
              <div key={acc.id} className="border-b border-line">
                <button
                  onClick={() => setOpenAccordion(openAccordion === acc.id ? null : acc.id)}
                  className="w-full flex items-center justify-between py-4 text-left"
                >
                  <span className="text-sm">{acc.label}</span>
                  <ChevronDown
                    size={16}
                    className={`text-steel transition-transform ${openAccordion === acc.id ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                {openAccordion === acc.id && (
                  <div className="pb-5 text-sm text-steel leading-relaxed">
                    {acc.id === 'details' && (
                      <ul className="space-y-1.5 list-disc list-inside">
                        {product.details.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    )}
                    {acc.id === 'shipping' && (
                      <p>
                        Free shipping on orders over ₹999. Dispatched within 2 business days, delivered in 4–7 days.
                        Unworn items with tags attached can be returned within 30 days for a full refund.
                      </p>
                    )}
                    {acc.id === 'size' && (
                      <p>
                        This piece is cut to a {product.type === 'Bottoms' ? 'true-to-size' : 'relaxed'} fit — size
                        down for a closer silhouette. Full measurements are available on the size chart at checkout.
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-24">
          <h2 className="font-display text-2xl font-bold mb-8">You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
