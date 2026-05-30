import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 30)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close menu on route change
  useEffect(() => setOpen(false), [pathname])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const onSplash = pathname === '/' || pathname === ''
  const go = path => { navigate(path); setOpen(false) }

  return (
    <>
      <nav className={solid || !onSplash ? 'solid' : ''}>
        {/* Wordmark */}
        <button onClick={() => go('/')} style={{ background:'none', border:'none', cursor:'pointer', padding:0, display:'flex', alignItems:'baseline', gap:10, fontFamily:'var(--disp)', color:'var(--ink)' }}>
          <span style={{ fontSize: solid || !onSplash ? 20 : 24, fontWeight:500, letterSpacing:'-.01em', lineHeight:1, transition:'font-size .4s var(--ease)' }}>Emmy</span>
          <span style={{ fontFamily:'var(--sans)', fontSize:9.5, letterSpacing:'.46em', textTransform:'uppercase', color:'var(--muted)', fontWeight:500 }}>Visuals</span>
        </button>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          style={{ background:'none', border:'none', cursor:'pointer', padding:'6px', display:'flex', flexDirection:'column', gap:5, alignItems:'flex-end' }}
        >
          <span style={{ display:'block', height:1.5, background:'var(--ink)', borderRadius:2, width: open ? 22 : 22, transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none', transition:'all .3s var(--ease)', transformOrigin:'center' }} />
          <span style={{ display:'block', height:1.5, background:'var(--ink)', borderRadius:2, width:16, opacity: open ? 0 : 1, transition:'all .3s var(--ease)' }} />
          <span style={{ display:'block', height:1.5, background:'var(--ink)', borderRadius:2, width: open ? 22 : 22, transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none', transition:'all .3s var(--ease)', transformOrigin:'center' }} />
        </button>
      </nav>

      {/* Full-screen menu overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 90,
        background: 'var(--bg)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'all' : 'none',
        transition: 'opacity .4s var(--ease)',
      }}>
        <nav style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
          {[
            ['/', 'Home'],
            ['/catalog', 'Catalogue'],
            ['/services', 'Services'],
          ].map(([path, label], i) => (
            <button
              key={path}
              onClick={() => go(path)}
              style={{
                background:'none', border:'none', cursor:'pointer',
                fontFamily:'var(--disp)', fontWeight:500,
                fontSize:'clamp(42px,8vw,72px)',
                color: pathname === path ? 'var(--ink)' : 'var(--muted)',
                lineHeight: 1.1,
                transition: 'color .3s, transform .3s',
                transform: open ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${i * 0.06}s`,
                letterSpacing: '-.01em',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
              onMouseLeave={e => e.currentTarget.style.color = pathname === path ? 'var(--ink)' : 'var(--muted)'}
            >
              {label}
            </button>
          ))}

          {/* Book a shoot CTA */}
          <button
            onClick={() => go('/contact')}
            style={{
              marginTop: 32,
              padding: '14px 36px', borderRadius: 2,
              border: '1px solid var(--ink)', background: 'var(--ink)', color: 'var(--bg)',
              fontFamily: 'var(--sans)', fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'all .3s var(--ease)',
              transform: open ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '0.18s',
              opacity: open ? 1 : 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='var(--ink)' }}
            onMouseLeave={e => { e.currentTarget.style.background='var(--ink)'; e.currentTarget.style.color='var(--bg)' }}
          >
            Book a shoot
          </button>
        </nav>

        {/* Studio info at bottom */}
        <div style={{
          position:'absolute', bottom:40,
          fontSize:12, color:'var(--muted)', letterSpacing:'.06em', textAlign:'center',
          opacity: open ? 1 : 0, transition:'opacity .4s var(--ease) .3s',
        }}>
          hello@emmyvisuals.studio  Ikoyi, Lagos
        </div>
      </div>
    </>
  )
}
