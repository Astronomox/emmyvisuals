import React, { useState } from 'react'
import { useReveal } from './Protection'

const SVCS = ['Weddings','Portraits','Events and Birthdays','Brand and Corporate','Passports']

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [form, setForm] = useState({ name:'', email:'', date:'', service:'Weddings', message:'' })
  const [errors, setErrors] = useState({})
  useReveal()

  const set = k => e => {
    setForm(f => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors(e => ({ ...e, [k]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Your name is required'
    if (!form.email.trim())   e.email   = 'Your email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email address'
    if (!form.message.trim()) e.message = 'Tell me about the day'
    return e
  }

  const submit = async e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setSending(true)
    await new Promise(r => setTimeout(r, 900)) // simulate send
    setSending(false)
    setSent(true)
  }

  const Field = ({ label, k, type='text', placeholder, required }) => (
    <div>
      <label style={{ fontSize:10, letterSpacing:'.14em', textTransform:'uppercase', fontWeight:500, color: errors[k] ? '#c0504a' : 'var(--muted)', display:'block', marginBottom:6 }}>
        {label}{required && ' *'}
      </label>
      <input
        className="field"
        type={type}
        placeholder={placeholder}
        value={form[k]}
        onChange={set(k)}
        style={{ borderColor: errors[k] ? '#c0504a' : '' }}
      />
      {errors[k] && <span style={{ fontSize:12, color:'#c0504a', marginTop:5, display:'block' }}>{errors[k]}</span>}
    </div>
  )

  return (
    <section className="page" style={{ paddingTop:'clamp(90px,12vh,140px)', paddingBottom:100 }}>
      <div className="wrap">
        <div className="contact-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1.1fr', gap:'clamp(36px,6vw,90px)', alignItems:'start' }}>

          {/* Left */}
          <div className="reveal">
            <div className="eyebrow" style={{ marginBottom:14 }}>Get in touch</div>
            <h1 className="disp" style={{ fontSize:'clamp(36px,5.5vw,64px)', lineHeight:.95, marginBottom:18 }}>
              Let's hold<br/>your day still
            </h1>
            <p className="body-t" style={{ maxWidth:340, marginBottom:40 }}>
              Tell me what you're planning. I reply personally to every enquiry, usually within a day.
            </p>
            <div style={{ display:'flex', flexDirection:'column' }}>
              {[
                ['Studio',    '14 Bourdillon Road, Ikoyi, Lagos'],
                ['Hours',     'Tuesday to Saturday, 9am to 6pm'],
                ['Email',     'hello@emmyvisuals.studio'],
                ['Phone',     '+234 905 156 3208'],
                ['Instagram', '@emmyvisuals'],
              ].map(([k, v]) => (
                <div key={k} style={{ display:'grid', gridTemplateColumns:'80px 1fr', gap:14, padding:'13px 0', borderBottom:'1px solid var(--line)' }}>
                  <span className="eyebrow" style={{ paddingTop:2 }}>{k}</span>
                  <span style={{ fontSize:14, color:'var(--ink)', lineHeight:1.5 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="reveal">
            {sent ? (
              <div style={{ padding:'52px 0', textAlign:'center' }}>
                <div style={{ width:54, height:54, borderRadius:'50%', background:'var(--ink)', color:'var(--bg)', display:'grid', placeItems:'center', margin:'0 auto 22px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>
                </div>
                <h3 className="disp" style={{ fontSize:30 }}>Sent, {form.name.split(' ')[0]}.</h3>
                <p className="body-t" style={{ marginTop:10, marginBottom:28 }}>I will be in touch at {form.email} shortly.</p>
                <button className="btn ghost" onClick={() => { setSent(false); setForm({ name:'', email:'', date:'', service:'Weddings', message:'' }) }}>
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate style={{ display:'flex', flexDirection:'column', gap:16 }}>
                <div style={{ marginBottom:4 }}>
                  <h2 className="disp" style={{ fontSize:30, marginBottom:4 }}>Start a conversation</h2>
                  <p style={{ fontSize:13, color:'var(--muted)' }}>Fields marked * are required.</p>
                </div>

                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                  <Field label="Name" k="name" placeholder="Your full name" required />
                  <Field label="Email" k="email" type="email" placeholder="you@email.com" required />
                </div>

                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                  <div>
                    <label style={{ fontSize:10, letterSpacing:'.14em', textTransform:'uppercase', fontWeight:500, color:'var(--muted)', display:'block', marginBottom:6 }}>Date in mind</label>
                    <input className="field" type="date" value={form.date} onChange={set('date')} />
                  </div>
                  <div>
                    <label style={{ fontSize:10, letterSpacing:'.14em', textTransform:'uppercase', fontWeight:500, color:'var(--muted)', display:'block', marginBottom:6 }}>Service</label>
                    <select className="field" value={form.service} onChange={set('service')} style={{ appearance:'none', cursor:'pointer' }}>
                      {SVCS.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize:10, letterSpacing:'.14em', textTransform:'uppercase', fontWeight:500, color: errors.message ? '#c0504a' : 'var(--muted)', display:'block', marginBottom:6 }}>
                    Message *
                  </label>
                  <textarea
                    className="field" rows={5}
                    placeholder="Tell me about the day, the people, what matters most..."
                    value={form.message}
                    onChange={set('message')}
                    style={{ resize:'vertical', borderColor: errors.message ? '#c0504a' : '' }}
                  />
                  {errors.message && <span style={{ fontSize:12, color:'#c0504a', marginTop:5, display:'block' }}>{errors.message}</span>}
                </div>

                <button
                  className="btn"
                  type="submit"
                  disabled={sending}
                  style={{ alignSelf:'flex-start', marginTop:4, minWidth:160, justifyContent:'center' }}
                >
                  {sending ? (
                    <span style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation:'spin 1s linear infinite' }}>
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span style={{ display:'flex', alignItems:'center', gap:8 }}>
                      Submit Enquiry
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>
                    </span>
                  )}
                </button>
                <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
