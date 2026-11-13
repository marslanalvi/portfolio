import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Header, Footer } from './Layout.jsx'
import { Home, Experience, Projects, Skills, Research, Contact } from './pages.jsx'
import { META } from './data.js'

const KEYS = { '/': 'home', '/experience': 'experience', '/projects': 'projects', '/skills': 'skills', '/research': 'research', '/contact': 'contact' }

export default function App() {
  const { pathname } = useLocation()
  useEffect(() => {
    const m = META[KEYS[pathname] || 'home']
    document.title = m[0]
    document.querySelector('meta[name="description"]')?.setAttribute('content', m[1])
    window.scrollTo(0, 0)
  }, [pathname])
  return (
    <>
      <Header />
      <main key={pathname} className="pgin">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/research" element={<Research />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
