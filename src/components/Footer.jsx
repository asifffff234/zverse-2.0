import { Link } from 'react-router-dom'
import { CreditCard, Instagram, Twitter, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <div className="flex items-center gap-2.5">
            <img src="/assets/logo.png" alt="" aria-hidden="true" className="w-8 h-8 rounded-[6px] object-cover" />
            <span className="font-display font-black text-lg tracking-tight">
              Z<span className="text-signal">VERSE</span>
            </span>
          </div>
          <p className="font-mono text-[10px] tracking-widest2 uppercase text-signal mt-3">Wear the future</p>
          <p className="text-steel text-sm mt-2 max-w-xs leading-relaxed">
            Premium futurist streetwear, engineered in-house. New drops every Friday.
          </p>
          <div className="flex items-center gap-4 mt-5">
            <a href="#" aria-label="Instagram" className="text-steel hover:text-paper transition-colors">
              <Instagram size={18} aria-hidden="true" />
            </a>
            <a href="#" aria-label="Twitter" className="text-steel hover:text-paper transition-colors">
              <Twitter size={18} aria-hidden="true" />
            </a>
            <a href="#" aria-label="YouTube" className="text-steel hover:text-paper transition-colors">
              <Youtube size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div>
          <p className="font-mono text-[11px] tracking-widest2 uppercase text-steel mb-4">Shop</p>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/shop" className="hover:text-signal transition-colors">New arrivals</Link></li>
            <li><Link to="/shop?category=Men" className="hover:text-signal transition-colors">Men</Link></li>
            <li><Link to="/shop?category=Women" className="hover:text-signal transition-colors">Women</Link></li>
            <li><Link to="/shop?tag=Sale" className="hover:text-signal transition-colors">Sale</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[11px] tracking-widest2 uppercase text-steel mb-4">Support</p>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#" className="hover:text-signal transition-colors">Track order</a></li>
            <li><a href="#" className="hover:text-signal transition-colors">Returns</a></li>
            <li><a href="#" className="hover:text-signal transition-colors">Size guide</a></li>
            <li><a href="#" className="hover:text-signal transition-colors">Contact us</a></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[11px] tracking-widest2 uppercase text-steel mb-4">Company</p>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#" className="hover:text-signal transition-colors">About</a></li>
            <li><a href="#" className="hover:text-signal transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-signal transition-colors">Sustainability</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-5 flex flex-col-reverse md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-steel">© 2026 Z Verse. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <CreditCard size={16} className="text-steel" aria-hidden="true" />
            <span className="font-mono text-[11px] text-steel tracking-wide">CARD · UPI · COD</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
