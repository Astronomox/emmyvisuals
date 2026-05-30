import React, { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useSiteProtection } from './Protection'
import Blobs from './Blobs'
import Nav from './Nav'
import Footer from './Footer'
import WhatsApp from './WhatsApp'
import Splash from './Splash'
import Catalog from './Catalog'
import Services from './Services'
import Contact from './Contact'
import Admin from './Admin'
import Lightbox from './Lightbox'
import NotFound from './NotFound'

export default function App() {
  useSiteProtection()
  const { pathname } = useLocation()
  const [lb, setLb] = useState(null)

  const isAdmin  = pathname.startsWith('/admin')
  const isSplash = pathname === '/'
  const showChrome = !isAdmin && !isSplash
  const lbOpen = lb !== null

  return (
    <div id="blur-target">
      {showChrome && <Blobs />}
      {!isAdmin && !lbOpen && <Nav />}

      <main>
        <Routes>
          <Route path="/"         element={<Splash />} />
          <Route path="/catalog"  element={<Catalog onLightbox={(photos, i) => setLb({ photos, index: i })} />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact"  element={<Contact />} />
          <Route path="/admin"    element={<Admin />} />
          <Route path="*"         element={<NotFound />} />
        </Routes>
      </main>

      {showChrome && !lbOpen && <Footer />}

      {/* WhatsApp float — visible everywhere except admin */}
      {!isAdmin && !lbOpen && <WhatsApp />}

      {lbOpen && (
        <Lightbox
          photos={lb.photos}
          index={lb.index}
          onClose={() => setLb(null)}
        />
      )}
    </div>
  )
}
