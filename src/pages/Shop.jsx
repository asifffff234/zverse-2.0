import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { CATEGORIES, PRODUCTS } from '../data/products'

const PRICE_MIN = 0
const PRICE_MAX = 4000
const PRICE_STEP = 100

function PriceSlider({ min, max, onChange }) {
  const handleMin = (e) => {
    const v = Math.min(Number(e.target.value), max - PRICE_STEP)
    onChange(v, max)
  }
  const handleMax = (e) => {
    const v = Math.max(Number(e.target.value), min + PRICE_STEP)
    onChange(min, v)
  }
  const minPct = ((min - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100
  const maxPct = ((max - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="font-mono text-[11px] tracking-widest2 uppercase text-steel">Price</p>
        <span className="font-mono text-xs text-paper">
          ₹{min.toLocaleString('en-IN')} – ₹{max.toLocaleString('en-IN')}{max === PRICE_MAX ? '+' : ''}
        </span>
      </div>
      <div className="relative h-4">
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-1 bg-ink-3" />
        <div className="absolute top-1/2 -translate-y-1/2 h-1 bg-signal" style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }} />
        <input type="range" min={PRICE_MIN} max={PRICE_MAX} step={PRICE_STEP} value={min} onChange={handleMin} className="range-slider" style={{ zIndex: min > PRICE_MAX - 300 ? 5 : 3 }} aria-label="Minimum price" />
        <input type="range" min={PRICE_MIN} max={PRICE_MAX} step={PRICE_STEP} value={max} onChange={handleMax} className="range-slider" style={{ zIndex: 4 }} aria-label="Maximum price" />
      </div>
    </div>
  )
}

function Pills({ label, options, selected, toggle }) {
  return (
    <div>
      <p className="font-mono text-[11px] tracking-widest2 uppercase text-steel mb-3">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = selected.includes(opt)
          return (
            <button key={opt} onClick={() => toggle(opt)} aria-pressed={active}
              className={`px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-wide border transition-colors ${active ? 'bg-signal border-signal text-paper' : 'border-line text-steel hover:border-steel hover:text-paper'}`}>
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function FilterPanel({ categories, toggleCategory, types, selectedTypes, toggleType, priceMin, priceMax, setPriceRange, onClear }) {
  return (
    <div className="space-y-8">
      <Pills label="Category" options={CATEGORIES} selected={categories} toggle={toggleCategory} />
      <Pills label="Type" options={types} selected={selectedTypes} toggle={toggleType} />
      <PriceSlider min={priceMin} max={priceMax} onChange={setPriceRange} />
      <button onClick={onClear} className="font-mono text-xs uppercase tracking-wide text-steel hover:text-signal transition-colors">
        Clear all filters
      </button>
    </div>
  )
}

export default function Shop() {
  const [searchParams] = useSearchParams()
  const [categories, setCategories] = useState([])
  const [selectedTypes, setSelectedTypes] = useState([])
  const [priceMin, setPriceMin] = useState(PRICE_MIN)
  const [priceMax, setPriceMax] = useState(PRICE_MAX)
  const [sort, setSort] = useState('featured')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat) setCategories([cat])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const tagFilter = searchParams.get('tag')
  const allTypes = useMemo(() => [...new Set(PRODUCTS.map((p) => p.type))].sort(), [])

  const toggleCategory = (cat) => setCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]))
  const toggleType = (type) => setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  const setPriceRange = (min, max) => { setPriceMin(min); setPriceMax(max) }
  const clearFilters = () => { setCategories([]); setSelectedTypes([]); setPriceMin(PRICE_MIN); setPriceMax(PRICE_MAX) }

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (categories.length && !categories.includes(p.category)) return false
      if (selectedTypes.length && !selectedTypes.includes(p.type)) return false
      if (tagFilter && p.tag !== tagFilter) return false
      if (p.price < priceMin) return false
      if (priceMax < PRICE_MAX && p.price > priceMax) return false
      return true
    })
    if (sort === 'lowhigh') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'highlow') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'newest') list = [...list].sort((a, b) => (a.tag === 'New' ? -1 : 1) - (b.tag === 'New' ? -1 : 1))
    return list
  }, [categories, selectedTypes, priceMin, priceMax, sort, tagFilter])

  const heading = tagFilter === 'Sale' ? 'Sale' : categories.length === 1 ? categories[0] : 'All products'

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 md:py-14">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="font-mono text-[11px] tracking-widest2 uppercase text-signal mb-2">Catalog</p>
          <h1 className="font-display text-3xl font-bold">{heading}</h1>
          <p className="text-steel text-sm mt-1">{filtered.length} results</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden flex items-center gap-2 border border-line px-4 py-2.5 font-mono text-xs uppercase tracking-wide">
            <SlidersHorizontal size={14} aria-hidden="true" /> Filters
          </button>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="border border-line px-3 py-2.5 text-sm w-auto">
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="lowhigh">Price: low to high</option>
            <option value="highlow">Price: high to low</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 lg:hidden">
        {CATEGORIES.map((cat) => {
          const active = categories.includes(cat)
          return (
            <button key={cat} onClick={() => toggleCategory(cat)} aria-pressed={active}
              className={`px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-wide border transition-colors ${active ? 'bg-signal border-signal text-paper' : 'border-line text-steel hover:border-steel hover:text-paper'}`}>
              {cat}
            </button>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-10">
        <aside className="hidden lg:block">
          <FilterPanel categories={categories} toggleCategory={toggleCategory} types={allTypes} selectedTypes={selectedTypes} toggleType={toggleType} priceMin={priceMin} priceMax={priceMax} setPriceRange={setPriceRange} onClear={clearFilters} />
        </aside>
        <div>
          {filtered.length === 0 ? (
            <div className="border border-line py-24 flex flex-col items-center text-center gap-3">
              <p className="font-display text-xl">No pieces match those filters</p>
              <button onClick={clearFilters} className="font-mono text-xs uppercase tracking-wide text-signal">Clear filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/80" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-ink border-l border-line p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <p className="font-mono text-xs uppercase tracking-widest2">Filters</p>
              <button onClick={() => setMobileOpen(false)} aria-label="Close filters"><X size={20} aria-hidden="true" /></button>
            </div>
            <FilterPanel categories={categories} toggleCategory={toggleCategory} types={allTypes} selectedTypes={selectedTypes} toggleType={toggleType} priceMin={priceMin} priceMax={priceMax} setPriceRange={setPriceRange} onClear={clearFilters} />
            <button onClick={() => setMobileOpen(false)} className="w-full mt-8 bg-signal text-paper py-3 font-mono text-xs uppercase tracking-wide">Show {filtered.length} results</button>
          </div>
        </div>
      )}
    </div>
  )
}
