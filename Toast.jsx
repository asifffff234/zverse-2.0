import { CheckCircle2 } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Toast() {
  const { toast } = useCart()

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-5 right-5 z-50 flex items-center gap-2.5 bg-ink-2 border border-line px-4 py-3.5 shadow-[0_12px_32px_rgba(0,0,0,0.4)] transition-all duration-300 ${
        toast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <CheckCircle2 size={16} className="text-signal shrink-0" aria-hidden="true" />
      <span className="font-mono text-xs tracking-wide">{toast}</span>
    </div>
  )
}
