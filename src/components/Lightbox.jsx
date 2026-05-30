import React, { useState, useEffect, useRef, useCallback } from 'react'

export default function Lightbox({ photos, index, onClose }) {
  const [i, setI] = useState(index)
  const stripRef = useRef(null)
  const photo = photos[i]

  const go = useCallback(d => setI(p => (p + d + photos.length) % photos.length), [photos.length])

  useEffect(() => setI(index), [index])

  useEffect(() => {
    const fn = e => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', fn); document.body.style.overflow = '' }
  }, [go, onClose])

  useEffect(() => {
    const strip = stripRef.current; if (!strip) return
    const el = strip.querySelector(`[data-idx="${i}"]`); if (!el) return
    strip.scrollTo({ left: el.offsetLeft - strip.clientWidth / 2 + el.clientWidth / 2, behavior: 'smooth' })
  }, [i])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,           /* above everything including nav */
      display: 'grid',
      gridTemplateRows: '64px 1fr 88px',
      background: '#0a0704',
      animation: 'lbFadeIn .3s ease',
    }}>
      <style>{`
        @keyframes lbFadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes lbImgIn  { from { opacity:0; transform:scale(.98) } to { opacity:1; transform:scale(1) } }
      `}</style>

      {/* ── ROW 1: TOP BAR 64px ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        borderBottom: '1px solid rgba(255,255,255,.1)',
        minWidth: 0,
      }}>
        {/* Title */}
        <div style={{ minWidth: 0, paddingRight: 12 }}>
          <div style={{ fontFamily: 'var(--disp)', color: '#fdf7ec', fontSize: 'clamp(15px,2vw,22px)', lineHeight: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {photo.title}
          </div>
          <div style={{ fontSize: 10, letterSpacing: '.26em', textTransform: 'uppercase', color: 'rgba(253,247,236,.45)', marginTop: 5 }}>
            {photo.catLabel} · {String(i + 1).padStart(2, '0')} of {String(photos.length).padStart(2, '0')}
          </div>
        </div>

        {/* CLOSE BUTTON — hard right, never hidden */}
        <button
          onClick={onClose}
          aria-label="Close lightbox"
          style={{
            flexShrink: 0,
            width: 42, height: 42,
            borderRadius: '50%',
            background: 'rgba(255,255,255,.12)',
            border: '1.5px solid rgba(255,255,255,.25)',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background .2s, transform .15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.28)'; e.currentTarget.style.transform = 'scale(1.1)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.12)'; e.currentTarget.style.transform = 'scale(1)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {/* ── ROW 2: IMAGE STAGE ── */}
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '12px 68px',
      }}>
        {/* Prev */}
        <button onClick={() => go(-1)} aria-label="Previous" style={{
          position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
          width: 48, height: 48, borderRadius: '50%', minWidth: 48, minHeight: 48, zIndex: 2, flexShrink: 0,
          background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.18)',
          color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><polyline points="15,18 9,12 15,6"/></svg>
        </button>

        {/* Next */}
        <button onClick={() => go(1)} aria-label="Next" style={{
          position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
          width: 48, height: 48, borderRadius: '50%', minWidth: 48, minHeight: 48, zIndex: 2, flexShrink: 0,
          background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.18)',
          color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><polyline points="9,18 15,12 9,6"/></svg>
        </button>

        {/* Image — never cropped, always fits */}
        <img
          key={photo.id}
          src={photo.src}
          alt={photo.title}
          draggable="false"
          onContextMenu={e => e.preventDefault()}
          onDragStart={e => e.preventDefault()}
          style={{
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: 5,
            boxShadow: '0 24px 70px -10px rgba(0,0,0,.9)',
            animation: 'lbImgIn .4s ease',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* ── ROW 3: FILMSTRIP 88px ── */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,.1)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
        <div
          ref={stripRef}
          className="noscroll"
          style={{
            display: 'flex',
            gap: 6,
            overflowX: 'auto',
            padding: '0 16px',
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}
        >
          {photos.map((p, idx) => (
            <button
              key={p.id}
              data-idx={idx}
              onClick={() => setI(idx)}
              style={{
                flexShrink: 0,
                width: 58, height: 58,
                borderRadius: 4,
                overflow: 'hidden',
                cursor: 'pointer',
                padding: 0,
                border: 'none',
                outline: idx === i ? '2.5px solid #fff' : '2.5px solid transparent',
                outlineOffset: 2,
                opacity: idx === i ? 1 : 0.32,
                transition: 'opacity .25s, outline-color .25s',
              }}
            >
              <img src={p.src} alt="" draggable="false" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
