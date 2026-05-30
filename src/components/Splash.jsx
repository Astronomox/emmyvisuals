import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Blobs from './Blobs'

export default function Splash() {
  const [mounted, setMounted] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(t)
  }, [])

  const T = (delay, extra = {}) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'none' : 'translateY(22px)',
    transition: `opacity 1.4s var(--ease) ${delay}s, transform 1.4s var(--ease) ${delay}s`,
    ...extra,
  })

  return (
    <section style={{
      position: 'relative', minHeight: '100svh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: '0 24px', overflow: 'hidden',
    }}>
      {/* The blobs sit BEHIND everything */}
      <Blobs splash />

      {/* Content sits on top */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          fontFamily: 'var(--disp)', fontWeight: 500,
          fontSize: 'clamp(96px,19vw,260px)',
          lineHeight: .88, letterSpacing: '-.02em', color: 'var(--ink)',
          ...T(.22),
        }}>Emmy</div>

        <div style={{
          fontFamily: 'var(--sans)', fontWeight: 500,
          fontSize: 'clamp(13px,1.6vw,21px)',
          letterSpacing: '.64em', textTransform: 'uppercase',
          color: 'var(--muted)', marginTop: 'clamp(4px,1vw,16px)',
          paddingLeft: '.64em',
          ...T(.7),
        }}>Visuals</div>

        <p className="lede" style={{ maxWidth: 520, marginTop: 'clamp(24px,4vw,48px)', textWrap:'balance', ...T(1.1) }}>
          Photographs that hold the day still. Weddings, portraits<br />
          and the quiet milestones in between.
        </p>

        <div style={{ display: 'flex', gap: 14, marginTop: 'clamp(32px,4vw,50px)', flexWrap: 'wrap', justifyContent: 'center', ...T(1.38) }}>
          <button className="btn" onClick={() => navigate('/catalog')}>Enter the Catalogue</button>
          <button className="btn ghost" onClick={() => navigate('/services')}>Services and Pricing</button>
        </div>
      </div>

      {/* Breathe indicator */}
      <div style={{
        position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        opacity: mounted ? .6 : 0, transition: 'opacity 1.6s var(--ease) 2s',
        color: 'var(--muted)', fontSize: '9.5px', letterSpacing: '.32em', textTransform: 'uppercase',
        zIndex: 1,
      }}>
        <span></span>
        <span style={{ display: 'block', width: 1, height: 32, background: 'linear-gradient(var(--muted),transparent)', animation: 'breathe 4s ease-in-out infinite' }} />
      </div>
    </section>
  )
}
