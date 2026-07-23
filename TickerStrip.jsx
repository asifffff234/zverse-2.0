const TICKER_TEXT =
  'FREE SHIPPING OVER \u20B9999 \u2014 NEW DROP EVERY FRIDAY \u2014 30 DAY RETURNS \u2014 DESIGNED IN-HOUSE \u2014 LIMITED RUN PIECES \u2014 '

export default function TickerStrip() {
  return (
    <div className="border-y border-line bg-ink-2 overflow-hidden py-2.5">
      <div className="flex w-max animate-marquee">
        <span className="font-mono text-[11px] tracking-widest2 uppercase text-steel whitespace-nowrap px-4">
          {TICKER_TEXT}
        </span>
        <span className="font-mono text-[11px] tracking-widest2 uppercase text-steel whitespace-nowrap px-4">
          {TICKER_TEXT}
        </span>
      </div>
    </div>
  )
}
