import { useState, useEffect } from 'react'
import { MdOutlineSegment, MdClose } from 'react-icons/md'
import { Link, NavLink, useLocation } from 'react-router-dom'

const NAV = [['/', 'Home'], ['/experience', 'Experience'], ['/projects', 'Personal Projects'], ['/skills', 'Skills'], ['/research', 'Research'], ['/contact', 'Contact']]

export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth > 1024 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])
  return (
    <header>
      <div className="w">
        <nav aria-label="Primary" className={open ? 'open' : ''}>
          <Link className="brand" to="/"><b>Muhammad Arslan</b></Link>
          <button type="button" className="menu" aria-label="Open navigation" aria-expanded={open} aria-controls="sidebar" onClick={() => setOpen(true)}>
            <MdOutlineSegment />
          </button>
          <div className="backdrop" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="links" id="sidebar">
            <div className="side-head">
              <b>Muhammad Arslan</b>
              <button type="button" className="close" aria-label="Close navigation" onClick={() => setOpen(false)}>
                <MdClose />
              </button>
            </div>
            {NAV.slice(1).map(([to, label]) => <NavLink key={to} to={to}>{label}</NavLink>)}
          </div>
        </nav>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="ft">
      <div className="w">
        <div className="fg">
          <div>
            <b className="fb">Muhammad Arslan</b>
            <p>Senior AI Engineer and team lead. Generative AI, LLMs, RAG, AI agents and voice AI.</p>
            <p className="open">Open to remote work and relocation.</p>
          </div>
          <div><h4>Pages</h4>{NAV.map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}</div>
          <div>
            <h4>Connect</h4>
            <a href="mailto:arslanalvi.ai@gmail.com">Email</a>
            <a href="https://www.linkedin.com/in/marslanalvi" rel="me noopener">LinkedIn</a>
            <a href="https://github.com/marslanalvi" rel="me noopener">GitHub</a>
            <a href="tel:+923355503111">+92 335 5503111</a>
          </div>
          <div><h4>Focus</h4><span>LLMs and RAG</span><span>Voice AI agents</span><span>AI platforms</span><span>MCP and agent skills</span></div>
        </div>
        <div className="fb2">
          <span>© 2026 Muhammad Arslan</span>
          <span>Built with React and Three.js</span>
          <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0 }) }}>Back to top</a>
        </div>
      </div>
    </footer>
  )
}
