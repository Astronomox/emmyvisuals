import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CORRECT_PIN = '211754'
const PIN_LEN = CORRECT_PIN.length

/* ── ON-SCREEN KEYPAD ── */
function Keypad({ value, onChange, onDone, err }) {
  const keys = ['1','2','3','4','5','6','7','8','9','','0','DEL']

  const press = (k) => {
    if (k === 'DEL') {
      onChange(value.slice(0, -1))
      return
    }
    if (!k) return
    if (value.length >= PIN_LEN) return
    const next = value + k
    onChange(next)
    if (next.length === PIN_LEN) {
      setTimeout(() => onDone(next), 120)
    }
  }

  return (
    <div>
      {/* PIN dots display */}
      <div style={{ display:'flex', gap:16, justifyContent:'center', marginBottom:32 }}>
        {Array.from({ length: PIN_LEN }).map((_, i) => (
          <div key={i} style={{
            width: 16, height: 16, borderRadius: '50%',
            background: i < value.length ? 'var(--ink)' : 'transparent',
            border: `2px solid ${err ? '#c0504a' : i < value.length ? 'var(--ink)' : 'var(--lineS)'}`,
            transition: 'all .2s var(--ease)',
            transform: i < value.length ? 'scale(1.1)' : 'scale(1)',
          }} />
        ))}
      </div>

      {/* Error */}
      <div style={{ minHeight:18, marginBottom:20, fontSize:12.5, color:'#c0504a', textAlign:'center' }}>
        {err || ''}
      </div>

      {/* Keypad grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, maxWidth:240, margin:'0 auto' }}>
        {keys.map((k, i) => (
          <button
            key={i}
            onClick={() => press(k)}
            disabled={!k && k !== '0'}
            style={{
              height: 64, borderRadius: 10,
              border: k === '⌫' ? '1px solid var(--lineS)' : '1px solid var(--lineS)',
              background: !k ? 'transparent' : k === 'DEL' ? 'transparent' : 'white',
              cursor: k ? 'pointer' : 'default',
              fontFamily: 'var(--disp)',
              fontSize: 26, fontWeight: 400, color: 'var(--ink)',
              transition: 'all .15s var(--ease)',
              boxShadow: k && k !== 'DEL' ? '0 1px 4px rgba(30,26,22,.08)' : 'none',
              opacity: !k ? 0 : 1,
              pointerEvents: !k ? 'none' : 'all',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            onMouseDown={e => e.preventDefault()}
            onMouseEnter={e => { if(k) e.currentTarget.style.background = k === 'DEL' ? 'rgba(30,26,22,.06)' : '#f5ede0' }}
            onMouseLeave={e => { if(k) e.currentTarget.style.background = k === 'DEL' ? 'transparent' : 'white' }}
            onTouchStart={e => { if(k) { e.currentTarget.style.background='#f5ede0'; e.currentTarget.style.transform='scale(.94)' } }}
            onTouchEnd={e => { if(k) { e.currentTarget.style.background = k==='DEL'?'transparent':'white'; e.currentTarget.style.transform='scale(1)' } }}
          >
            {k === 'DEL'
              ? <svg width="22" height="18" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-7-6z"/><line x1="13" y1="8" x2="19" y2="12"/><line x1="19" y1="8" x2="13" y2="12"/></svg>
              : k}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── GATE ── */
function AdminGate({ onUnlock }) {
  const [value, setValue] = useState('')
  const [err, setErr] = useState('')

  // Block all keyboard input on this screen
  useEffect(() => {
    const block = e => e.preventDefault()
    window.addEventListener('keydown', block)
    return () => window.removeEventListener('keydown', block)
  }, [])

  const showErr = msg => { setErr(msg); setTimeout(() => setErr(''), 2000) }

  const handleDone = (code) => {
    if (code === CORRECT_PIN) {
      onUnlock()
    } else {
      showErr('Wrong passcode')
      setTimeout(() => setValue(''), 400)
    }
  }

  const title = 'Studio access'
  const subtitle = `Enter your ${PIN_LEN}-digit passcode`

  return (
    <div style={{
      minHeight: '100svh', display: 'grid', placeItems: 'center',
      padding: 24, background: 'var(--bg)',
    }}>
      <div style={{ width: 'min(340px,100%)', textAlign: 'center' }}>
        {/* Lock */}
        <div style={{ width:52, height:52, borderRadius:'50%', border:'1.5px solid var(--lineS)', display:'grid', placeItems:'center', margin:'0 auto 28px', color:'var(--ink)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>

        <div style={{ fontSize:9, letterSpacing:'.3em', textTransform:'uppercase', color:'var(--muted)', marginBottom:10, fontFamily:'var(--sans)' }}>Emmy Visuals Studio</div>
        <h2 className="disp" style={{ fontSize:30, marginBottom:8 }}>{title}</h2>
        <p style={{ fontSize:13.5, color:'var(--muted)', marginBottom:36, lineHeight:1.6 }}>{subtitle}</p>

        <Keypad
          value={value}
          onChange={setValue}
          onDone={handleDone}
          err={err}
        />
      </div>
    </div>
  )
}

/* ── UPLOAD ── */
function Upload({ albums }) {
  const [album, setAlbum] = useState(albums[0].key)
  const [files, setFiles] = useState([])
  const [drag, setDrag] = useState(false)
  const [flash, setFlash] = useState('')
  const inputRef = useRef(null)

  const addFiles = list => {
    const arr = Array.from(list).slice(0,10).map(f => ({ name:f.name, progress:0, done:false }))
    setFiles(p => [...p, ...arr])
    arr.forEach(f => {
      const iv = setInterval(() => setFiles(p => p.map(x => x.name===f.name && !x.done ? { ...x, progress:Math.min(100,x.progress+7+Math.random()*15), done:x.progress>=92 } : x)), 150)
      setTimeout(() => clearInterval(iv), 4000)
    })
  }
  const demo = () => addFiles([{name:'IMG_4201.jpg'},{name:'IMG_4217.jpg'},{name:'IMG_4238.jpg'}])
  const allDone = files.length>0 && files.every(f=>f.done)
  const publish = () => {
    setFlash(`${files.length} photo${files.length>1?'s':''} published to ${albums.find(a=>a.key===album)?.label}`)
    setFiles([])
    setTimeout(() => setFlash(''), 3500)
  }

  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
        <span style={{ fontSize:11, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--muted)', whiteSpace:'nowrap' }}>Adding to</span>
        <select value={album} onChange={e=>setAlbum(e.target.value)} className="field" style={{ padding:'9px 14px', width:'auto', flex:1 }}>
          {albums.map(a => <option key={a.key} value={a.key}>{a.label}</option>)}
        </select>
      </div>
      <div
        className={`drop-zone${drag?' drag':''}`}
        onDragOver={e=>{e.preventDefault();setDrag(true)}}
        onDragLeave={()=>setDrag(false)}
        onDrop={e=>{e.preventDefault();setDrag(false);addFiles(e.dataTransfer.files)}}
        onClick={()=>inputRef.current?.click()}
      >
        <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={e=>addFiles(e.target.files)} />
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" style={{ display:'block', margin:'0 auto 10px' }}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
        <div style={{ fontSize:14, color:'var(--ink2)', marginBottom:4 }}>Drop photos here or <span style={{ textDecoration:'underline' }}>browse</span></div>
        <div style={{ fontSize:12, color:'var(--muted)' }}>JPG, PNG <button onClick={e=>{e.stopPropagation();demo()}} style={{ background:'none',border:'none',color:'var(--muted)',cursor:'pointer',textDecoration:'underline',fontFamily:'var(--sans)',fontSize:12,padding:0 }}>try demo</button></div>
      </div>
      {files.length > 0 && (
        <div style={{ marginTop:14, display:'flex', flexDirection:'column', gap:8 }}>
          {files.map((f,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 12px', borderRadius:6, background:'var(--bg)', border:'1px solid var(--line)' }}>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, marginBottom:3 }}>
                  <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{f.name}</span>
                  <span style={{ color:'var(--muted)', fontSize:11, marginLeft:8, flexShrink:0 }}>{f.done ? 'Ready' : Math.round(f.progress)+'%'}</span>
                </div>
                <div className="prog-bar"><div className={`prog-fill${f.done?' done':''}`} style={{ width:`${f.progress}%` }}/></div>
              </div>
              {f.done && <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink:0 }}><polyline points="20,6 9,17 4,12"/></svg>}
            </div>
          ))}
          <button className="btn" disabled={!allDone} onClick={publish} style={{ marginTop:4, justifyContent:'center' }}>
            {allDone ? `Publish ${files.length} photo${files.length>1?'s':''}` : 'Uploading…'}
          </button>
        </div>
      )}
      {flash && <div style={{ marginTop:12, display:'flex', alignItems:'center', gap:9, padding:'11px 14px', borderRadius:6, background:'rgba(74,124,95,.12)', color:'var(--green)', fontSize:13 }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>{flash}
      </div>}
    </div>
  )
}

const ALBUM_COLORS = { weddings:'#e8d4b0', portraits:'#d0c4b8', birthdays:'#eac8a8', fashion:'#c8bcd4', corporate:'#b8c8cc', passports:'#d4ccc0' }
const ALBUMS = [
  { key:'weddings',  label:'Weddings',  count:6 },
  { key:'portraits', label:'Portraits', count:6 },
  { key:'birthdays', label:'Birthdays', count:6 },
  { key:'fashion',   label:'Fashion',   count:6 },
  { key:'corporate', label:'Corporate', count:6 },
  { key:'passports', label:'Passports', count:6 },
]

function AlbumCard({ album }) {
  const [hover, setHover] = useState(false)
  return (
    <div onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
      style={{ borderRadius:10, overflow:'hidden', border:'1px solid var(--line)', background:'var(--card)', cursor:'pointer', transition:'box-shadow .3s', boxShadow:hover?'0 12px 40px -16px rgba(30,26,22,.25)':'none' }}>
      <div style={{ aspectRatio:'16/9', background:ALBUM_COLORS[album.key], position:'relative' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(ellipse at 30% 30%,rgba(255,255,255,.25),transparent 60%)' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,transparent 40%,rgba(20,16,12,.55))' }} />
        <div style={{ position:'absolute', bottom:14, left:16 }}>
          <div className="disp" style={{ color:'#fdf7ec', fontSize:20, lineHeight:1 }}>{album.label}</div>
          <div style={{ fontSize:9.5, letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(253,247,236,.7)', marginTop:4 }}>{album.count} photos</div>
        </div>
      </div>
      <div style={{ padding:'11px 14px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ fontSize:12, color:'var(--muted)' }}>Updated recently</span>
        <div style={{ display:'flex', gap:6 }}>
          {['Edit','View'].map(l => (
            <button key={l} style={{ padding:'4px 10px', fontSize:11, border:'1px solid var(--lineS)', borderRadius:3, background:'transparent', cursor:'pointer', fontFamily:'var(--sans)', color:'var(--ink2)', transition:'all .2s' }}
              onMouseEnter={e=>{e.currentTarget.style.background='var(--ink)';e.currentTarget.style.color='var(--bg)';e.currentTarget.style.borderColor='var(--ink)'}}
              onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='var(--ink2)';e.currentTarget.style.borderColor='var(--lineS)'}}
            >{l}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

function Stat({ value, label, sub, bar }) {
  return (
    <div style={{ padding:'22px 24px', borderRadius:10, border:'1px solid var(--line)', background:'var(--card)' }}>
      <div style={{ fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--muted)', marginBottom:10 }}>{label}</div>
      <div className="disp" style={{ fontSize:40, lineHeight:.95, color:'var(--ink)' }}>{value}</div>
      {sub && <div style={{ fontSize:12, color:'var(--muted)', marginTop:8 }}>{sub}</div>}
      {bar != null && <div style={{ marginTop:12, height:3, borderRadius:2, background:'var(--line)', overflow:'hidden' }}><div style={{ height:'100%', width:`${bar}%`, background:'var(--ink)', borderRadius:2 }}/></div>}
    </div>
  )
}

function Dashboard({ onLock, onExit }) {
  const hour = new Date().getHours()
  const greet = hour<12?'Good morning':hour<17?'Good afternoon':'Good evening'
  const today = new Date().toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'})
  const [tab, setTab] = useState('albums')

  return (
    <div style={{ minHeight:'100svh', background:'var(--bg)' }}>
      {/* Topbar */}
      <div style={{ position:'sticky', top:0, zIndex:50, background:'rgba(245,237,224,.95)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', borderBottom:'1px solid var(--line)', padding:'0 clamp(20px,4vw,48px)' }}>
        <div style={{ height:60, display:'flex', alignItems:'center', justifyContent:'space-between', maxWidth:1400, margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'baseline', gap:10, fontFamily:'var(--disp)', color:'var(--ink)' }}>
            <span style={{ fontSize:22, fontWeight:500 }}>Emmy</span>
            <span style={{ fontFamily:'var(--sans)', fontSize:9, letterSpacing:'.42em', textTransform:'uppercase', color:'var(--muted)' }}>Studio</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <button className="btn sm ghost" onClick={onExit}>View site</button>
            <button className="btn sm" onClick={onLock}>Lock</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1400, margin:'0 auto', padding:'36px clamp(20px,4vw,48px) 80px' }}>
        <div style={{ marginBottom:36 }}>
          <h1 className="disp" style={{ fontSize:'clamp(34px,4vw,52px)', lineHeight:1 }}>{greet}, Emmy.</h1>
          <p style={{ fontSize:14, color:'var(--muted)', marginTop:8 }}>{today}</p>
        </div>

        <div className='admin-stats' style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:44 }}>
          <Stat value={ALBUMS.length} label="Albums" sub="across the catalogue" />
          <Stat value={36} label="Photographs" sub="published and live" />
          <Stat value={23} label="This month" sub="new uploads" />
          <Stat value="6.8 GB" label="Drive storage" sub="of 15 GB used" bar={45} />
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', gap:0, marginBottom:28, borderBottom:'1px solid var(--line)' }}>
          {[['albums','Albums'],['upload','Upload'],['activity','Activity']].map(([k,l]) => (
            <button key={k} onClick={()=>setTab(k)} style={{ padding:'10px 22px', fontSize:13, fontFamily:'var(--sans)', cursor:'pointer', background:'none', border:'none', borderBottom:tab===k?'2px solid var(--ink)':'2px solid transparent', color:tab===k?'var(--ink)':'var(--muted)', marginBottom:-1, transition:'color .25s,border-color .25s' }}>{l}</button>
          ))}
        </div>

        {tab==='albums' && (
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
              <p style={{ fontSize:13.5, color:'var(--ink2)' }}>{ALBUMS.length} albums {ALBUMS.reduce((a,b)=>a+b.count,0)} photos total</p>
              <button className="btn sm ghost">+ New album</button>
            </div>
            <div className='admin-albums' style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
              {ALBUMS.map(a => <AlbumCard key={a.key} album={a} />)}
            </div>
          </div>
        )}

        {tab==='upload' && (
          <div style={{ maxWidth:580 }}>
            <p style={{ fontSize:13.5, color:'var(--ink2)', marginBottom:24 }}>Photos sync automatically to Google Drive after publishing.</p>
            <Upload albums={ALBUMS} />
          </div>
        )}

        {tab==='activity' && (
          <div style={{ maxWidth:560 }}>
            {[
              {action:'Published 12 photos',target:'Weddings album',time:'2 hours ago',icon:'check'},
              {action:'Created new album',target:'Fashion',time:'Yesterday',icon:'plus'},
              {action:'Drive backup completed',target:'All albums',time:'Yesterday',icon:'shield'},
              {action:'Published 8 photos',target:'Portraits album',time:'2 days ago',icon:'check'},
              {action:'PIN passcode updated',target:'Studio access',time:'Last week',icon:'lock'},
            ].map((item,i,arr) => (
              <div key={i} style={{ display:'flex', gap:16, padding:'16px 0', borderBottom:i<arr.length-1?'1px solid var(--line)':'none' }}>
                <div style={{ width:32, height:32, borderRadius:'50%', border:'1px solid var(--line)', display:'grid', placeItems:'center', flexShrink:0, color:'var(--ink2)' }}>
                  {item.icon==='check' && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>}
                  {item.icon==='plus'  && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>}
                  {item.icon==='shield'&& <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
                  {item.icon==='lock'  && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13.5, color:'var(--ink)' }}>{item.action} <span style={{ color:'var(--muted)' }}>in</span> {item.target}</div>
                  <div style={{ fontSize:11.5, color:'var(--muted)', marginTop:3 }}>{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Admin() {
  const [unlocked, setUnlocked] = useState(false)
  const navigate = useNavigate()
  if (!unlocked) return <AdminGate onUnlock={() => setUnlocked(true)} />
  return <Dashboard onLock={() => setUnlocked(false)} onExit={() => navigate('/')} />
}
