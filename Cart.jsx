import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { useCart } from '../context/CartContext'

const SHIPPING_THRESHOLD = 999
const SHIPPING_FEE = 99
const PROMO_CODE = 'ZVERSE10'

export default function Cart() {
  const { items, removeFromCart, setQty, subtotal } = useCart()
  const navigate = useNavigate()
  const [promoInput, setPromoInput] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState(false)

  const shipping = subtotal === 0 || subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0
  const total = subtotal + shipping - discount

  const applyPromo = () => {
    if (promoInput.trim().toUpperCase() === PROMO_CODE) {
      setPromoApplied(true)
      setPromoError(false)
    } else {
      setPromoError(true)
      setPromoApplied(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-24 flex flex-col items-center text-center">
        <ShoppingBag size={40} className="text-steel mb-5" aria-hidden="true" />
        <h1 className="font-display text-2xl font-bold">Your bag is empty</h1>
        <p className="text-steel text-sm mt-2">Everything you add will show up here.</p>
        <Link
          to="/shop"
          className="mt-7 bg-signal text-paper px-7 py-3.5 font-mono text-xs uppercase tracking-wide hover:bg-signal/90 transition-colors"
        >
          Start shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 md:py-14">
      <h1 className="font-display text-3xl font-bold mb-8">Your bag</h1>

      <div className="grid lg:grid-cols-[1fr_360px] gap-10">
        <div className="divide-y divide-line border-y border-line">
          {items.map((item) => (
            <div key={item.key} className="flex gap-4 py-6">
              <div className="w-24 h-28 bg-ink-2 shrink-0 flex items-center justify-center">
                <span className="font-display text-2xl font-black text-steel/30">{item.name.charAt(0)}</span>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[10px] text-steel tracking-widest2 uppercase">{item.code}</p>
                    <h3 className="text-sm mt-1">{item.name}</h3>
                    <p className="text-xs text-steel mt-1">
                      {item.color} · Size {item.size}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.key)}
                    aria-label={`Remove ${item.name}`}
                    className="text-steel hover:text-hazard transition-colors"
                  >
                    <X size={16} aria-hidden="true" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-line">
                    <button
                      onClick={() => setQty(item.key, item.qty - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:text-signal transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={12} aria-hidden="true" />
                    </button>
                    <span className="w-8 text-center font-mono text-xs">{item.qty}</span>
                    <button
                      onClick={() => setQty(item.key, item.qty + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:text-signal transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={12} aria-hidden="true" />
                    </button>
                  </div>
                  <span className="font-mono text-sm">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border border-line p-6 h-fit">
          <p className="font-mono text-[11px] tracking-widest2 uppercase text-steel mb-5">Order summary</p>

          <div className="flex gap-2 mb-5">
            <input
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              placeholder="Promo code"
              className="flex-1 px-3 py-2.5 border border-line text-sm"
            />
            <button
              onClick={applyPromo}
              className="border border-line px-4 font-mono text-xs uppercase tracking-wide hover:border-steel transition-colors shrink-0"
            >
              Apply
            </button>
          </div>
          {promoApplied && (
            <p className="font-mono text-xs text-signal mb-4">ZVERSE10 applied — 10% off</p>
          )}
          {promoError && <p className="font-mono text-xs text-hazard mb-4">Invalid code</p>}

          <div className="space-y-3 text-sm border-t border-line pt-5">
            <div className="flex justify-between">
              <span className="text-steel">Subtotal</span>
              <span className="font-mono">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-steel">Shipping</span>
              <span className="font-mono">{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
            </div>
            {promoApplied && (
              <div className="flex justify-between">
                <span className="text-steel">Discount</span>
                <span className="font-mono text-signal">−₹{discount.toLocaleString('en-IN')}</span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-baseline border-t border-line mt-5 pt-5">
            <span className="text-sm">Total</span>
            <span className="font-mono text-lg">₹{total.toLocaleString('en-IN')}</span>
          </div>

          {subtotal < SHIPPING_THRESHOLD && (
            <p className="font-mono text-[11px] text-steel mt-4">
              Add ₹{(SHIPPING_THRESHOLD - subtotal).toLocaleString('en-IN')} more for free shipping
            </p>
          )}

          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-signal text-paper py-3.5 font-mono text-xs uppercase tracking-wide hover:bg-signal/90 transition-colors mt-6"
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  )
}
