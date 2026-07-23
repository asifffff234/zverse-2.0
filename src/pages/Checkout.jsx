import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { useCart } from '../context/CartContext'

const SHIPPING_THRESHOLD = 999
const SHIPPING_FEE = 99

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [payment, setPayment] = useState('card')
  const [placed, setPlaced] = useState(false)
  const [orderNo, setOrderNo] = useState('')

  const shipping = subtotal === 0 || subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  const total = subtotal + shipping

  if (items.length === 0 && !placed) {
    return (
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-24 flex flex-col items-center text-center">
        <h1 className="font-display text-2xl font-bold">Your bag is empty</h1>
        <p className="text-steel text-sm mt-2">Add something before checking out.</p>
        <Link
          to="/shop"
          className="mt-7 bg-signal text-paper px-7 py-3.5 font-mono text-xs uppercase tracking-wide hover:bg-signal/90 transition-colors"
        >
          Start shopping
        </Link>
      </div>
    )
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    const no = `ZV${Math.floor(100000 + Math.random() * 900000)}`
    setOrderNo(no)
    setPlaced(true)
    clearCart()
  }

  if (placed) {
    return (
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-24 flex flex-col items-center text-center">
        <img src="/assets/logo.png" alt="" aria-hidden="true" className="w-12 h-12 rounded-[8px] object-cover mb-5" />
        <CheckCircle2 size={44} className="text-signal mb-5" aria-hidden="true" />
        <h1 className="font-display text-2xl font-bold">Order confirmed</h1>
        <p className="text-steel text-sm mt-2">
          Order <span className="font-mono text-paper">{orderNo}</span> is being prepared for dispatch.
        </p>
        <p className="text-steel text-xs mt-1 max-w-sm">
          This is a UI demo — no real payment was processed and no email will be sent.
        </p>
        <Link
          to="/"
          className="mt-7 bg-signal text-paper px-7 py-3.5 font-mono text-xs uppercase tracking-wide hover:bg-signal/90 transition-colors"
        >
          Back to home
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 md:py-14">
      <h1 className="font-display text-3xl font-bold mb-2">Checkout</h1>
      <p className="font-mono text-[11px] text-hazard uppercase tracking-wide mb-8">
        Demo checkout — no real payment is processed
      </p>

      <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-[1fr_360px] gap-10">
        <div className="space-y-10">
          <div>
            <p className="font-mono text-[11px] tracking-widest2 uppercase text-steel mb-4">Contact</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <input required type="email" placeholder="Email address" className="px-3 py-3 border border-line text-sm" />
              <input required type="tel" placeholder="Phone number" className="px-3 py-3 border border-line text-sm" />
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] tracking-widest2 uppercase text-steel mb-4">Shipping address</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <input required placeholder="Full name" className="px-3 py-3 border border-line text-sm sm:col-span-2" />
              <input required placeholder="Address line" className="px-3 py-3 border border-line text-sm sm:col-span-2" />
              <input required placeholder="City" className="px-3 py-3 border border-line text-sm" />
              <input required placeholder="State" className="px-3 py-3 border border-line text-sm" />
              <input required placeholder="PIN code" className="px-3 py-3 border border-line text-sm" />
              <input required placeholder="Country" defaultValue="India" className="px-3 py-3 border border-line text-sm" />
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] tracking-widest2 uppercase text-steel mb-4">Payment method</p>
            <div className="space-y-2.5">
              {[
                { id: 'card', label: 'Credit / debit card' },
                { id: 'upi', label: 'UPI' },
                { id: 'cod', label: 'Cash on delivery' },
              ].map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center gap-3 border px-4 py-3.5 cursor-pointer transition-colors ${
                    payment === method.id ? 'border-signal' : 'border-line'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === method.id}
                    onChange={() => setPayment(method.id)}
                    className="w-4 h-4 accent-[#FF3A00]"
                  />
                  <span className="text-sm">{method.label}</span>
                </label>
              ))}
            </div>

            {payment === 'card' && (
              <div className="grid sm:grid-cols-2 gap-3 mt-4">
                <input required placeholder="Card number" className="px-3 py-3 border border-line text-sm sm:col-span-2" />
                <input required placeholder="MM / YY" className="px-3 py-3 border border-line text-sm" />
                <input required placeholder="CVV" className="px-3 py-3 border border-line text-sm" />
              </div>
            )}
            {payment === 'upi' && (
              <div className="mt-4">
                <input required placeholder="UPI ID — name@bank" className="w-full px-3 py-3 border border-line text-sm" />
              </div>
            )}
          </div>
        </div>

        <div className="border border-line p-6 h-fit">
          <p className="font-mono text-[11px] tracking-widest2 uppercase text-steel mb-5">Order summary</p>
          <div className="divide-y divide-line">
            {items.map((item) => (
              <div key={item.key} className="flex justify-between py-3 text-sm">
                <div>
                  <p>{item.name}</p>
                  <p className="text-xs text-steel">
                    {item.color} · {item.size} · Qty {item.qty}
                  </p>
                </div>
                <span className="font-mono">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
          <div className="space-y-3 text-sm border-t border-line mt-4 pt-5">
            <div className="flex justify-between">
              <span className="text-steel">Subtotal</span>
              <span className="font-mono">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-steel">Shipping</span>
              <span className="font-mono">{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
            </div>
          </div>
          <div className="flex justify-between items-baseline border-t border-line mt-5 pt-5">
            <span className="text-sm">Total</span>
            <span className="font-mono text-lg">₹{total.toLocaleString('en-IN')}</span>
          </div>
          <button
            type="submit"
            className="w-full bg-signal text-paper py-3.5 font-mono text-xs uppercase tracking-wide hover:bg-signal/90 transition-colors mt-6"
          >
            Place order
          </button>
        </div>
      </form>
    </div>
  )
}
