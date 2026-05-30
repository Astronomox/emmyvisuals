import React, { useState } from 'react'
import { useReveal } from './Protection'

const SVCS = ['Weddings','Portraits','Events and Birthdays','Brand and Corporate','Passports']

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name:'', email:'', date:'', service:'Weddings', message:'' })
  const [errors, setErrors] = useState({})
  useReveal()

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Your name is required'
    if (!form.email.trim())   e.email   = 'Your email is required'
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.message.trim()) e.message = 'Tell me about the day'
    return e
  }

  const submit = e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setSent(true)
  }

  return (
    <section className="page" style={{ paddingTop:'clamp(105px,13vh,148px)', paddingBottom:120 }}>
      <div className="wrap">
        <div className='contact-grid' style={{ display:'grid', gridTemplateColumns:'1fr 1.15fr', gap:'clamp(40px,7vw,100px)', alignItems:'start' }}>

          {/* Left info */}
          <div className="reveal">
            <div className="eyebrow" style={{ marginBottom:16 }}>Booking and Enquiries</div>
            <h1 className="disp" style={{ fontSize:'clamp(38px,5.5vw,68px)', lineHeight:.95, marginBottom:20 }}>
              Let's hold<br/>your day still
            </h1>
            <p className="body-t" style={{ maxWidth:340, marginBottom:44 }}>
              Tell me what you're planning. I reply personally to every enquiry, usually within a day.
            </p>
            <div style={{ display:'flex', flexDirection:'column' }}>
              {[
                ['Studio',    '14 Bourdillon Road, Ikoyi, Lagos'],
                ['Hours',     'Tuesday to Saturday, 9am to 6pm'],
                ['Email',     'hello@emmyvisuals.studio'],
                ['Phone',     '+234 802 000 0000'],
                ['Instagram', '@emmyvisuals'],
              ].map(([k, v]) => (
                <div key={k} style={{ display:'grid', gridTemplateColumns:'90px 1fr', gap:16, padding:'15px 0', borderBottom:'1px solid var(--line)' }}>
                  <span className="eyebrow" style={{ paddingTop:2 }}>{k}</span>
                  <span style={{ fontSize:14, color:'var(--ink)', lineHeight:1.5 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="reveal">
            {sent ? (
              <div style={{ padding:'60px 0', textAlign:'center' }}>
                <div style={{ width:56, height:56, borderRadius:'50%', background:'var(--ink)', color:'var(--bg)', display:'grid', placeItems:'center', margin:'0 auto 24px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>
                </div>
                <h3 className="disp" style={{ fontSize:32 }}>Sent, {form.name.split(' ')[0]}.</h3>
                <p className="body-t" style={{ marginTop:10, marginBottom:28 }}>I will be in touch at {form.email} shortly.</p>
                <button className="btn ghost" onClick={() => { setSent(false); setForm({ name:'', email:'', date:'', service:'Weddings', message:'' }) }}>
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate style={{ display:'flex', flexDirection:'column', gap:20 }}>
                <div>
                  <h2 className="disp" style={{ fontSize:32, marginBottom:6 }}>Start a conversation</h2>
                  <p style={{ fontSize:13, color:'var(--muted)' }}>All fields marked are required.</p>
                </div>

                {/* Name + Email row */}
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                  <div>
                    <label style={{ fontSize:'10px', letterSpacing:'.14em', textTransform:'uppercase', color: errors.name ? '#c0504a' : 'var(--muted)', display:'block', marginBottom:6 }}>Name *</label>
                    <input className="field" type="text" placeholder="Your full name" value={form.name} onChange={set('name')} style={{ borderColor: errors.name ? '#c0504a' : '' }} />
                    {errors.name && <span style={{ fontSize:11.5, color:'#c0504a', marginTop:4, display:'block' }}>{errors.name}</span>}
                  </div>
                  <div>
                    <label style={{ fontSize:'10px', letterSpacing:'.14em', textTransform:'uppercase', color: errors.email ? '#c0504a' : 'var(--muted)', display:'block', marginBottom:6 }}>Email *</label>
                    <input className="field" type="email" placeholder="you@email.com" value={form.email} onChange={set('email')} style={{ borderColor: errors.email ? '#c0504a' : '' }} />
                    {errors.email && <span style={{ fontSize:11.5, color:'#c0504a', marginTop:4, display:'block' }}>{errors.email}</span>}
                  </div>
                </div>

                {/* Date + Service row */}
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                  <div>
                    <label style={{ fontSize:'10px', letterSpacing:'.14em', textTransform:'uppercase', color:'var(--muted)', display:'block', marginBottom:6 }}>Date in mind</label>
                    <input className="field" type="text" placeholder="e.g. 14 February 2026" value={form.date} onChange={set('date')} />
                  </div>
                  <div>
                    <label style={{ fontSize:'10px', letterSpacing:'.14em', textTransform:'uppercase', color:'var(--muted)', display:'block', marginBottom:6 }}>Service</label>
                    <select className="field" value={form.service} onChange={set('service')} style={{ appearance:'none', cursor:'pointer' }}>
                      {SVCS.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label style={{ fontSize:'10px', letterSpacing:'.14em', textTransform:'uppercase', color: errors.message ? '#c0504a' : 'var(--muted)', display:'block', marginBottom:6 }}>Message *</label>
                  <textarea className="field" rows={5} placeholder="Tell me about the day, the people, what matters most..." value={form.message} onChange={set('message')} style={{ resize:'vertical', borderColor: errors.message ? '#c0504a' : '' }} />
                  {errors.message && <span style={{ fontSize:11.5, color:'#c0504a', marginTop:4, display:'block' }}>{errors.message}</span>}
                </div>

                <button className="btn" type="submit" style={{ alignSelf:'flex-start', marginTop:4 }}>
                  Send Enquiry
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
