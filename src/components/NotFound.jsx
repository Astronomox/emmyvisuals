import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Blobs from './Blobs'

export default function NotFound() {
  const navigate = useNavigate()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60)
    return () => clearTimeout(t)
  }, [])

  const T = (delay) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'none' : 'translateY(18px)',
    transition: `opacity 1.2s var(--ease) ${delay}s, transform 1.2s var(--ease) ${delay}s`,
  })

  return (
    <div style={{
      minHeight: '100svh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: '0 24px', position: 'relative', overflow: 'hidden',
    }}>
      <Blobs splash />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Big 404 */}
        <div style={{
          fontFamily: 'var(--disp)', fontWeight: 500,
          fontSize: 'clamp(120px,22vw,280px)',
          lineHeight: .85, letterSpacing: '-.03em',
          color: 'var(--ink)', opacity: .12,
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none', userSelect: 'none',
          whiteSpace: 'nowrap',
        }}>404</div>

        {/* Content */}
        <div style={{ position: 'relative' }}>
          <div className="eyebrow" style={{ ...T(.1), marginBottom: 20 }}>Page not found</div>

          <h1 className="disp" style={{ fontSize: 'clamp(36px,6vw,72px)', ...T(.22), marginBottom: 16 }}>
            This frame<br />doesn't exist
          </h1>

          <p className="lede" style={{ maxWidth: 400, margin: '0 auto 40px', ...T(.4) }}>
            The page you are looking for has moved, been removed, or never existed.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', ...T(.55) }}>
            <button className="btn" onClick={() => navigate('/')}>
              Back to home
            </button>
            <button className="btn ghost" onClick={() => navigate('/catalog')}>
              View catalogue
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
