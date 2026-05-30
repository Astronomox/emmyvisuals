import React, { useState, useMemo, useRef, useEffect } from 'react'
import { useReveal } from './Protection'

// Auto-scrolls right on mobile once to hint there are more pills, then rests
function CatScroll({ children }) {
  const ref = useRef(null)
  const hinted = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || hinted.current) return
    const isMobile = window.innerWidth < 768
    if (!isMobile) return
    hinted.current = true

    // Wait for mount, then nudge right and back
    const t1 = setTimeout(() => {
      el.scrollTo({ left: 120, behavior: 'smooth' })
      const t2 = setTimeout(() => {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      }, 900)
      return () => clearTimeout(t2)
    }, 800)
    return () => clearTimeout(t1)
  }, [])

  return (
    <div
      ref={ref}
      className="noscroll"
      style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '2px 0' }}
    >
      {children}
    </div>
  )
}

const CATS = [
  { key:'weddings',  label:'Weddings',  note:'Whole days kept whole, from the first look to the last dance.' },
  { key:'portraits', label:'Portraits', note:'Stillness and gaze. One person, fully seen.' },
  { key:'birthdays', label:'Birthdays', note:'The candlelight years, loud joy and quiet milestones.' },
  { key:'fashion',   label:'Fashion',   note:'Editorial and lookbook work for designers and houses.' },
  { key:'corporate', label:'Corporate', note:'Headshots, teams and the working floor, with warmth.' },
  { key:'passports', label:'Passports', note:'Compliant, clean and flattering. In and out in minutes.' },
]

const RATIOS = [[3,4],[4,3],[1,1],[2,3],[3,2],[4,5]]

const UNSPLASH = {
  weddings: [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
    'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80',
    'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&q=80',
  ],
  portraits: [
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&q=80',
    'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=800&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
    'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80',
  ],
  birthdays: [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
    'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80',
    'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&q=80',
    'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&q=80',
    'https://images.unsplash.com/photo-1602631985686-1bb0e6a8696e?w=800&q=80',
  ],
  fashion: [
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
    'https://images.unsplash.com/photo-1558618047-f4e70f1f2f75?w=800&q=80',
  ],
  corporate: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80',
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
    'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&q=80',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80',
  ],
  passports: [
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=800&q=80',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80',
    'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=800&q=80',
  ],
}

const TITLES = {
  weddings:  ['Amara and Tunde','Golden Vows','The First Dance','Veil and Light','The Ceremony','Held'],
  portraits: ['Quiet Study','Window Light','Her Gaze','Stillness','In Profile','Soft Focus'],
  birthdays: ['Candlelight','Eighteen','Confetti Hour','Joy Loud','The Toast','Sweet Sixteen'],
  fashion:   ['Editorial I','Drape','Bias Cut','Atelier','Runway Off','The Look'],
  corporate: ['The Desk','Founders','In Session','The Headshot','The Floor','At Work'],
  passports: ['Plain Light','For the Record','Clean Frame','Identity','Square One','Neutral'],
}

export const ALL_PHOTOS = CATS.flatMap(c =>
  Array.from({ length: 6 }, (_, i) => {
    const [a, b] = RATIOS[i % RATIOS.length]
    return {
      id: `${c.key}${i + 1}`,
      cat: c.key, catLabel: c.label,
      src: UNSPLASH[c.key][i],
      w: a, h: b, ratio: `${a}/${b}`,
      title: TITLES[c.key][i],
    }
  })
)

function Tile({ photo, onOpen }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      style={{ position: 'relative', marginBottom: 12, cursor: 'pointer', breakInside: 'avoid' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onOpen}
    >
      <div style={{
        overflow: 'hidden', borderRadius: 4,
        boxShadow: hover ? '0 28px 55px -26px rgba(40,28,18,.65)' : '0 10px 30px -22px rgba(40,28,18,.45)',
        transition: 'box-shadow .6s var(--ease)',
      }}>
        <img
          src={photo.src} alt={photo.title}
          draggable="false"
          onContextMenu={e => e.preventDefault()}
          onDragStart={e => e.preventDefault()}
          style={{
            display: 'block', width: '100%', aspectRatio: photo.ratio,
            objectFit: 'cover',
            transform: hover ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 1.4s var(--ease)',
            pointerEvents: 'none', userSelect: 'none',
          }}
        />
      </div>
      <div style={{ position: 'absolute', inset: 0, zIndex: 3 }}
        onContextMenu={e => e.preventDefault()}
        onDragStart={e => e.preventDefault()}
      />
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '36px 16px 14px', borderRadius: '0 0 4px 4px',
        background: 'linear-gradient(transparent, rgba(22,14,8,.58))',
        opacity: hover ? 1 : 0, transition: 'opacity .5s var(--ease)', pointerEvents: 'none',
      }}>
        <div style={{ fontFamily: 'var(--disp)', color: '#fdf7ec', fontSize: 19, lineHeight: 1.1 }}>{photo.title}</div>
        <div style={{ fontSize: '9.5px', letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(253,247,236,.7)', marginTop: 5 }}>{photo.catLabel}</div>
      </div>
    </div>
  )
}

export default function Catalog({ onLightbox }) {
  const [active, setActive] = useState('all')
  const [fade, setFade] = useState(false)
  useReveal()

  const photos = useMemo(() => active === 'all' ? ALL_PHOTOS : ALL_PHOTOS.filter(p => p.cat === active), [active])
  const meta = CATS.find(c => c.key === active)

  const pick = k => {
    if (k === active) return
    setFade(true)
    setTimeout(() => { setActive(k); setFade(false) }, 270)
  }

  return (
    <section className="page" style={{ paddingTop: 'clamp(96px,12vh,140px)', paddingBottom: 110 }}>
      <div className="wrap">
        <header className="reveal" style={{ marginBottom: 28 }}>
          <div className="eyebrow">The Catalogue</div>
          <h1 className="disp" style={{ fontSize: 'clamp(40px,6vw,78px)', margin: '12px 0 0' }}>
            {active === 'all' ? 'Everything, curated' : meta.label}
          </h1>
          <p className="body-t" style={{ maxWidth: 540, marginTop: 14 }}>
            {active === 'all' ? '' : meta.note}
          </p>
        </header>

        <div className="sticky-catbar">
          <div className="wrap">
            <CatScroll>
              {[{ key: 'all', label: 'All Work' }, ...CATS].map(t => {
                const on = active === t.key
                const count = t.key === 'all' ? ALL_PHOTOS.length : ALL_PHOTOS.filter(p => p.cat === t.key).length
                return (
                  <button key={t.key} onClick={() => pick(t.key)} style={{
                    flex: '0 0 auto', display: 'inline-flex', alignItems: 'center', gap: 9,
                    padding: '10px 18px', borderRadius: 999, cursor: 'pointer',
                    fontFamily: 'var(--sans)', fontSize: 12.5, letterSpacing: '.05em',
                    border: `1px solid ${on ? 'var(--ink)' : 'var(--lineS)'}`,
                    background: on ? 'var(--ink)' : 'transparent',
                    color: on ? 'var(--bg)' : 'var(--ink2)',
                    transition: 'all .38s var(--ease)',
                  }}>
                    {t.label}
                    <span style={{ fontSize: 10, opacity: .6 }}>{count}</span>
                  </button>
                )
              })}
            </CatScroll>
          </div>
        </div>

        <div className="masonry reveal" style={{ opacity: fade ? 0 : 1, transform: fade ? 'translateY(8px)' : 'none', transition: 'opacity .28s, transform .28s' }}>
          {photos.map((p, i) => (
            <Tile key={p.id} photo={p} onOpen={() => onLightbox(photos, i)} />
          ))}
        </div>
      </div>
    </section>
  )
}
