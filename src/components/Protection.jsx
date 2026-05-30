import { useEffect } from 'react'

export function useSiteProtection() {
  useEffect(() => {
    const noCtx = e => e.preventDefault()
    const onVis = () => document.body.classList.toggle('tab-away', document.hidden)
    const noKey = e => {
      if (
        e.key === 'PrintScreen' ||
        (e.ctrlKey && e.shiftKey && e.key === 's') ||
        (e.metaKey && e.shiftKey && ['3','4','s'].includes(e.key))
      ) e.preventDefault()
    }
    document.addEventListener('contextmenu', noCtx)
    document.addEventListener('visibilitychange', onVis)
    document.addEventListener('keydown', noKey)
    return () => {
      document.removeEventListener('contextmenu', noCtx)
      document.removeEventListener('visibilitychange', onVis)
      document.removeEventListener('keydown', noKey)
    }
  }, [])
}

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target) } })
    }, { threshold: .13 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

export function ProtectedImage({ src, alt, ratio, watermark = true, style, imgStyle }) {
  return (
    <div className="pimg" style={{ aspectRatio: ratio || 'auto', ...style }}>
      <img
        src={src} alt={alt || ''}
        draggable="false"
        onContextMenu={e => e.preventDefault()}
        onDragStart={e => e.preventDefault()}
        style={imgStyle}
      />
      <div
        className="shield"
        onContextMenu={e => e.preventDefault()}
        onDragStart={e => e.preventDefault()}
        onMouseDown={e => e.preventDefault()}
      />
      {watermark && <div className="wm">Emmy Visuals</div>}
    </div>
  )
}
