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

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const onSplash = pathname === '/' || pathname === ''
  const go = path => { navigate(path); setOpen(false) }

  const links = [
    ['/catalog', 'Catalogue'],
    ['/services', 'Services'],
    ['/contact', 'Book a shoot'],
  ]

  return (
    <>
      <nav className={solid || !onSplash ? 'solid' : ''} style={{ zIndex: 110 }}>
        {/* Wordmark */}
        <button onClick={() => go('/')} style={{ background:'none', border:'none', cursor:'pointer', padding:0, display:'flex', alignItems:'baseline', gap:10, fontFamily:'var(--disp)', color:'var(--ink)' }}>
          <span style={{ fontSize: solid || !onSplash ? 20 : 24, fontWeight:500, letterSpacing:'-.01em', lineHeight:1, transition:'font-size .4s var(--ease)' }}>Emmy</span>
          <span style={{ fontFamily:'var(--sans)', fontSize:9.5, letterSpacing:'.46em', textTransform:'uppercase', color:'var(--muted)', fontWeight:500 }}>Visuals</span>
        </button>

        {/* Hamburger — bigger tap target */}
        <button
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          style={{ background:'none', border:'none', cursor:'pointer', padding:'10px 4px', display:'flex', flexDirection:'column', gap:5, alignItems:'flex-end', minWidth:44, minHeight:44, justifyContent:'center' }}
        >
          <span style={{ display:'block', height:1.5, background: open ? 'var(--ink)' : (solid || !onSplash ? 'var(--ink)' : 'var(--ink)'), borderRadius:2, width:22, transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none', transition:'all .3s var(--ease)', transformOrigin:'center' }} />
          <span style={{ display:'block', height:1.5, background:'var(--ink)', borderRadius:2, width:14, opacity: open ? 0 : 1, transition:'opacity .3s var(--ease)' }} />
          <span style={{ display:'block', height:1.5, background:'var(--ink)', borderRadius:2, width:22, transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none', transition:'all .3s var(--ease)', transformOrigin:'center' }} />
        </button>
      </nav>

      {/* Backdrop blur when open */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 105,
        backdropFilter: open ? 'blur(2px)' : 'none',
        WebkitBackdropFilter: open ? 'blur(2px)' : 'none',
        pointerEvents: 'none',
        transition: 'backdrop-filter .4s',
      }} />

      {/* Full-screen menu */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 106,
        background: 'var(--bg)',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'all' : 'none',
        transition: 'opacity .35s var(--ease)',
      }}>
        <nav style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
          {links.map(([path, label], i) => {
            const isBook = path === '/contact'
            const active = pathname === path
            return isBook ? (
              <button
                key={path}
                onClick={() => go(path)}
                style={{
                  marginTop: 28,
                  padding: '14px 40px', borderRadius: 2,
                  border: '1px solid var(--ink)', background: 'var(--ink)', color: 'var(--bg)',
                  fontFamily: 'var(--sans)', fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase',
                  cursor: 'pointer',
                  opacity: open ? 1 : 0,
                  transform: open ? 'translateY(0)' : 'translateY(16px)',
                  transition: `all .35s var(--ease) ${0.06 + i * 0.06}s`,
                }}
              >{label}</button>
            ) : (
              <button
                key={path}
                onClick={() => go(path)}
                style={{
                  background:'none', border:'none', cursor:'pointer',
                  fontFamily:'var(--disp)', fontWeight:500,
                  fontSize: 'clamp(36px,10vw,64px)',
                  color: active ? 'var(--ink)' : 'var(--muted)',
                  lineHeight: 1.15,
                  letterSpacing: '-.01em',
                  opacity: open ? 1 : 0,
                  transform: open ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity .35s var(--ease) ${i * 0.06}s, transform .35s var(--ease) ${i * 0.06}s, color .2s`,
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
                onMouseLeave={e => e.currentTarget.style.color = active ? 'var(--ink)' : 'var(--muted)'}
              >{label}</button>
            )
          })}
        </nav>

        {/* Studio info */}
        <div style={{
          position:'absolute', bottom:36,
          fontSize:12, color:'var(--muted)', letterSpacing:'.04em', textAlign:'center',
          lineHeight: 1.8,
          opacity: open ? 1 : 0,
          transition: 'opacity .4s var(--ease) .22s',
        }}>
          hello@emmyvisuals.studio<br/>Ikoyi, Lagos
        </div>
      </div>
    </>
  )
}
