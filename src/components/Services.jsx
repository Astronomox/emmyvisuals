import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useReveal } from './Protection'

const SVCS = [
  { key:'weddings',  label:'Weddings' },
  { key:'portraits', label:'Portraits' },
  { key:'events',    label:'Events and Birthdays' },
  { key:'brand',     label:'Brand and Corporate' },
]

const PRICING = {
  weddings: [
    { name:'Essential', price:'₦450k', tag:'The ceremony', summary:'Coverage for the moments that matter most.', features:['Up to 5 hours coverage','One lead photographer','120+ edited images','Private online gallery','7-day delivery'] },
    { name:'Signature', price:'₦850k', tag:'Most chosen', summary:'The full day, told properly.', features:['Up to 10 hours coverage','Lead and second shooter','350+ edited images','Engagement mini-session','Fine-art preview album','Private gallery and downloads','5-day delivery'], hi:true },
    { name:'Premium', price:'₦1.6m', tag:'The heirloom', summary:'Every chapter, plus a hand-bound keepsake.', features:['Two days unlimited hours','Lead and two assistants','600+ edited images','30-page layflat album','Highlight film 3 to 4 min','Same-day social teaser','Priority 72-hour delivery'] },
  ],
  portraits: [
    { name:'Essential', price:'₦80k', tag:'The headshot', summary:'A clean, confident frame in under an hour.', features:['45 min session','One look','8 edited images','Studio or daylight','3-day delivery'] },
    { name:'Signature', price:'₦150k', tag:'Most chosen', summary:'A proper sitting with room to breathe.', features:['2 hour session','Up to 3 looks','25 edited images','Wardrobe guidance','Two locations','Private gallery'], hi:true },
    { name:'Premium', price:'₦280k', tag:'The editorial', summary:'A directed shoot with full creative support.', features:['Half-day session','Unlimited looks','50+ edited images','On-set styling and MUA','Concept moodboard','Print-ready files'] },
  ],
  events: [
    { name:'Essential', price:'₦180k', tag:'The party', summary:'Candid coverage of the celebration.', features:['3 hours coverage','One photographer','100+ edited images','Online gallery','5-day delivery'] },
    { name:'Signature', price:'₦320k', tag:'Most chosen', summary:'Documentary coverage, beginning to end.', features:['6 hours coverage','Photographer and assistant','250+ edited images','Candid and portraits','Same-night teaser','Gallery and downloads'], hi:true },
    { name:'Premium', price:'₦560k', tag:'The full story', summary:'Every guest, every toast, every detail.', features:['Full-day coverage','Two photographers','450+ edited images','Photo booth corner','Highlight reel','72-hour delivery'] },
  ],
  brand: [
    { name:'Essential', price:'₦220k', tag:'The team', summary:'Consistent headshots for your people.', features:['Half-day on location','Up to 12 headshots','Matching edit style','Web and LinkedIn crops','5-day delivery'] },
    { name:'Signature', price:'₦480k', tag:'Most chosen', summary:'Headshots plus the working environment.', features:['Full-day on location','Up to 25 headshots','Office and culture shots','Brand colour grading','Usage licence included','Private gallery'], hi:true },
    { name:'Premium', price:'₦950k', tag:'The campaign', summary:'A complete visual library for your brand.', features:['Two-day production','Unlimited team members','Product and lifestyle sets','Art direction included','Extended commercial licence','Quarterly refresh option'] },
  ],
}

function Check() {
  return (
    <svg style={{ width:14, height:14, flex:'0 0 auto', marginTop:2 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20,6 9,17 4,12"/>
    </svg>
  )
}

export default function Services() {
  const [svc, setSvc] = useState('weddings')
  const navigate = useNavigate()
  useReveal()
  const tiers = PRICING[svc]

  return (
    <section className="page" style={{ paddingTop:'clamp(90px,12vh,140px)', paddingBottom:100 }}>
      <div className="wrap">
        <header className="reveal" style={{ textAlign:'center', maxWidth:580, margin:'0 auto 24px' }}>
          <div className="eyebrow" style={{ marginBottom:12 }}>Services and Pricing</div>
          <h1 className="disp" style={{ fontSize:'clamp(36px,6vw,70px)', lineHeight:.95 }}>Booked by the moment</h1>
          <p className="lede" style={{ marginTop:14 }}>Three ways into every kind of shoot, from a single frame to the whole unhurried day.</p>
        </header>

        {/* Category pills */}
        <div className="reveal" style={{ display:'flex', justifyContent:'center', gap:8, flexWrap:'wrap', margin:'24px 0 36px' }}>
          {SVCS.map(s => (
            <button key={s.key} onClick={() => setSvc(s.key)} style={{
              padding:'10px 18px', borderRadius:999, cursor:'pointer',
              fontFamily:'var(--sans)', fontSize:12.5, letterSpacing:'.05em',
              border:`1px solid ${svc===s.key ? 'var(--ink)' : 'var(--lineS)'}`,
              background: svc===s.key ? 'var(--ink)' : 'transparent',
              color: svc===s.key ? 'var(--bg)' : 'var(--ink2)',
              transition:'all .35s var(--ease)',
            }}>{s.label}</button>
          ))}
        </div>

        {/* Pricing cards */}
        <div className="reveal services-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, alignItems:'stretch' }}>
          {tiers.map(t => (
            <article key={t.name} style={{
              display:'flex', flexDirection:'column',
              padding:'28px 24px 24px', borderRadius:8,
              background: t.hi ? 'var(--ink)' : 'var(--card)',
              color: t.hi ? 'var(--bg)' : 'var(--ink)',
              border:`1px solid ${t.hi ? 'var(--ink)' : 'var(--line)'}`,
              boxShadow: t.hi ? '0 32px 64px -32px rgba(30,26,22,.6)' : 'none',
            }}>
              <div style={{ fontSize:9.5, letterSpacing:'.28em', textTransform:'uppercase', opacity:.6, marginBottom:10 }}>{t.tag}</div>
              <h3 className="disp" style={{ fontSize:26, margin:'0 0 2px' }}>{t.name}</h3>
              <div style={{ display:'flex', alignItems:'baseline', gap:6, margin:'10px 0 4px' }}>
                <span className="disp" style={{ fontSize:38, lineHeight:1 }}>{t.price}</span>
                <span style={{ fontSize:11, opacity:.5 }}>from</span>
              </div>
              <p style={{ fontSize:13, lineHeight:1.6, opacity:.7, margin:'6px 0 18px' }}>{t.summary}</p>
              <div style={{ height:1, background:t.hi?'rgba(255,255,255,.14)':'var(--line)', marginBottom:14 }}/>
              <ul style={{ listStyle:'none', padding:0, margin:0, flex:1 }}>
                {t.features.map(f => (
                  <li key={f} style={{ display:'flex', gap:10, fontSize:13, lineHeight:1.5, marginBottom:10, alignItems:'flex-start' }}>
                    <Check/>{f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/contact')}
                className={`btn${t.hi ? '' : ' ghost'}`}
                style={{ marginTop:20, justifyContent:'center', width:'100%', ...(t.hi ? {background:'var(--bg)',color:'var(--ink)',borderColor:'var(--bg)'} : {}) }}
              >
                Book this
              </button>
            </article>
          ))}
        </div>

        <p className="reveal body-t" style={{ textAlign:'center', marginTop:28, opacity:.6 }}>
          Every package is a starting point. Tell me about the day and we will shape it together.
        </p>
      </div>
    </section>
  )
}
