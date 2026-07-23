import { Link } from 'react-router-dom'
import { ArrowUpRight, CreditCard, RotateCcw, ShieldCheck, Truck } from 'lucide-react'
import TickerStrip from '../components/TickerStrip'
import ProductCard from '../components/ProductCard'
import useReveal from '../hooks/useReveal'
import useParallax from '../hooks/useParallax'
import { PRODUCTS } from '../data/products'

const TRUST_ITEMS = [
  { icon: Truck, label: 'Free shipping over ₹999' },
  { icon: RotateCcw, label: '30 day returns' },
  { icon: ShieldCheck, label: '100% authentic' },
  { icon: CreditCard, label: 'Secure checkout' },
]

const CATEGORY_TILES = [
  { label: 'Men', category: 'Men' },
  { label: 'Women', category: 'Women' },
  { label: 'Accessories', category: 'Accessories' },
]

function Reveal({ children, className = '' }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} className={`${className} ${visible ? 'animate-fadeUp' : 'opacity-0'}`}>
      {children}
    </div>
  )
}

function ProductSection({ eyebrow, title, products, viewAllHref }) {
  return (
    <Reveal className="max-w-7xl mx-auto px-5 md:px-8 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="font-mono text-[11px] tracking-widest2 uppercase text-signal mb-2">{eyebrow}</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold">{title}</h2>
        </div>
        <Link
          to={viewAllHref}
          className="hidden sm:flex items-center gap-1 font-mono text-xs uppercase tracking-wide text-steel hover:text-paper transition-colors"
        >
          View all <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </Reveal>
  )
}

export default function Home() {
  const newArrivals = PRODUCTS.filter((p) => p.tag === 'New').slice(0, 4)
  const bestsellers = PRODUCTS.filter((p) => p.tag === 'Bestseller').slice(0, 4)
  const sale = PRODUCTS.filter((p) => p.tag === 'Sale').slice(0, 4)
  const parallaxSlow = useParallax(0.12)
  const parallaxFast = useParallax(0.28)

  return (
    <div>
      <section className="relative border-b border-line overflow-hidden min-h-[90vh] flex items-center bg-ink">
        {/* Parallax background layer: ghost wordmark + diagonal blade, echoing the logo */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            ref={parallaxSlow}
            className="absolute -right-24 top-1/2 -translate-y-1/2 md:-right-10"
          >
            <span className="font-display font-bold text-[46vw] md:text-[34rem] leading-none text-maroon/40 select-none">
              Z
            </span>
          </div>
          <div
            ref={parallaxFast}
            className="absolute top-[38%] left-0 w-full h-24 md:h-36 -rotate-6 bg-gradient-to-r from-signal/0 via-signal/25 to-signal/0"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/10 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-24 pb-16 md:pt-16 md:pb-16 w-full">
          <p className="font-mono text-xs text-signal tracking-widest2 uppercase mb-5">Collection 001 — FW.26</p>
          <h1 className="font-display font-black text-[13vw] leading-[0.95] md:text-[5.5rem] md:leading-[0.95] tracking-tight max-w-4xl">
            Engineered
            <br />
            for what's
            <br />
            next.
          </h1>
          <p className="font-display font-bold text-2xl md:text-3xl text-signal mt-6 tracking-tight">
            Wear the future.
          </p>
          <p className="text-steel max-w-md mt-4 text-base leading-relaxed">
            Technical fabrics, precision cuts and drop-culture design. Z Verse builds streetwear like it's specced,
            not just styled.
          </p>
          <div className="flex flex-wrap gap-3 mt-9">
            <Link
              to="/shop"
              className="bg-signal text-paper px-7 py-3.5 font-mono text-xs uppercase tracking-wide hover:bg-signal/90 transition-colors"
            >
              Shop the drop
            </Link>
            <Link
              to="/shop?category=Men"
              className="border border-line px-7 py-3.5 font-mono text-xs uppercase tracking-wide hover:border-steel hover:text-signal transition-colors"
            >
              Explore lookbook
            </Link>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 absolute top-10 right-10 font-mono text-[10px] text-steel uppercase tracking-widest2">
          <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" aria-hidden="true" />
          Drop 001 live
        </div>
        <div className="hidden md:block absolute bottom-10 right-10 w-16 h-16 border border-line" aria-hidden="true" />
      </section>

      <TickerStrip />

      <Reveal className="max-w-7xl mx-auto px-5 md:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-line border border-line">
          {TRUST_ITEMS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center text-center gap-2 py-6 px-3">
              <Icon size={20} className="text-signal" aria-hidden="true" />
              <span className="font-mono text-[11px] text-steel uppercase tracking-wide">{label}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="max-w-7xl mx-auto px-5 md:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CATEGORY_TILES.map((tile) => (
            <Link
              key={tile.label}
              to={`/shop?category=${tile.category}`}
              className="group relative border border-line bg-ink-2 h-56 md:h-72 flex items-end p-6 overflow-hidden"
            >
              <span className="absolute top-4 left-4 font-mono text-[10px] text-steel uppercase tracking-widest2">
                {PRODUCTS.filter((p) => p.category === tile.category).length} pieces
              </span>
              <div className="flex items-center justify-between w-full">
                <h3 className="font-display text-2xl font-bold group-hover:text-signal transition-colors">
                  {tile.label}
                </h3>
                <ArrowUpRight
                  size={22}
                  className="text-steel group-hover:text-signal group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                  aria-hidden="true"
                />
              </div>
            </Link>
          ))}
        </div>
      </Reveal>

      <ProductSection eyebrow="Just landed" title="New arrivals" products={newArrivals} viewAllHref="/shop" />

      <Reveal className="border-y border-line bg-maroon relative overflow-hidden">
        <div className="absolute inset-0 z-blade opacity-[0.06]" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="font-mono text-[11px] tracking-widest2 uppercase text-signal mb-4">Process</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight">
              Engineered, not just designed.
            </h2>
            <p className="text-paper/70 mt-5 leading-relaxed max-w-md">
              Every piece starts as a spec sheet before it's a sketch — fabric weight, construction, fit tolerance.
              We build garments the way products get built: tested, versioned, and shipped only when they hold up.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-1 mt-6 font-mono text-xs uppercase tracking-wide text-paper hover:text-signal transition-colors"
            >
              Shop the collection <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <div className="relative aspect-[4/3] border border-signal/40 bg-ink-3/60 backdrop-blur-sm flex items-center justify-center">
            <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-signal/60" aria-hidden="true" />
            <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-signal/60" aria-hidden="true" />
            <span className="font-mono text-xs text-steel tracking-widest2 uppercase">Fabric.spec / 420 GSM</span>
          </div>
        </div>
      </Reveal>

      <ProductSection eyebrow="Most worn" title="Bestsellers" products={bestsellers} viewAllHref="/shop" />
      <ProductSection eyebrow="Up to 45% off" title="Sale" products={sale} viewAllHref="/shop?tag=Sale" />

      <Reveal className="max-w-7xl mx-auto px-5 md:px-8 py-16">
        <div className="border border-line bg-ink-2 px-6 py-12 md:px-14 md:py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-xl md:text-2xl font-bold">Join the Z Verse inner circle</h3>
            <p className="text-steel text-sm mt-2">Early access to drops, member pricing, and archive restocks.</p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full md:w-auto gap-2"
          >
            <input
              type="email"
              required
              placeholder="name@email.com"
              className="flex-1 md:w-64 px-4 py-3 border border-line text-sm"
            />
            <button className="bg-signal text-paper px-6 font-mono text-xs uppercase tracking-wide hover:bg-signal/90 transition-colors shrink-0">
              Join
            </button>
          </form>
        </div>
      </Reveal>
    </div>
  )
}
