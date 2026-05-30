import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()
  return (
    <footer>
      <div className="foot-grid" style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr', gap:30, padding:'52px 48px 38px', maxWidth:1240, margin:'0 auto' }}>
        <div>
          <button onClick={() => navigate('/')} style={{ background:'none', border:'none', cursor:'pointer', padding:0, display:'flex', alignItems:'baseline', gap:10, fontFamily:'var(--disp)', color:'var(--ink)', marginBottom:14 }}>
            <span style={{ fontSize:26, fontWeight:500 }}>Emmy</span>
            <span style={{ fontFamily:'var(--sans)', fontSize:9.5, letterSpacing:'.46em', textTransform:'uppercase', color:'var(--muted)', fontWeight:500 }}>Visuals</span>
          </button>
          <p style={{ color:'var(--ink2)', fontSize:14, lineHeight:1.68, maxWidth:280 }}>
            A Lagos photography studio for the days worth keeping.
          </p>
          <button className="btn ghost" style={{ marginTop:22, fontSize:11 }} onClick={() => navigate('/contact')}>
            Book a shoot
          </button>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          <div className="eyebrow" style={{ marginBottom:5 }}>Explore</div>
          {[['catalog','Catalogue'],['services','Services and Pricing']].map(([k, l]) => (
            <button key={k} onClick={() => navigate('/'+k)}
              style={{ background:'none', border:'none', textAlign:'left', padding:0, fontFamily:'var(--sans)', fontSize:14, color:'var(--ink2)', cursor:'pointer', transition:'color .3s' }}
              onMouseEnter={e => e.currentTarget.style.color='var(--ink)'}
              onMouseLeave={e => e.currentTarget.style.color='var(--ink2)'}
            >{l}</button>
          ))}
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          <div className="eyebrow" style={{ marginBottom:5 }}>Studio</div>
          {['Ikoyi, Lagos','hello@emmyvisuals.studio','+234 905 156 3208','@emmyvisuals'].map(v => (
            <span key={v} style={{ fontSize:14, color:'var(--ink2)' }}>{v}</span>
          ))}
        </div>
      </div>
      <div className="foot-bottom" style={{ padding:'0 48px 28px', maxWidth:1240, margin:'0 auto', fontSize:11, color:'var(--muted)' }}>
        {new Date().getFullYear()} Emmy Visuals
      </div>
    </footer>
  )
}
