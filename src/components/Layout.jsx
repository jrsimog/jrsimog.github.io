import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { posts } from '../data/posts'

const Layout = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

      if (e.key === 'j') window.scrollBy({ top: 160, behavior: 'smooth' })
      if (e.key === 'k') window.scrollBy({ top: -160, behavior: 'smooth' })
      if (e.ctrlKey && e.key === 'd') { e.preventDefault(); window.scrollBy({ top: window.innerHeight / 2, behavior: 'smooth' }) }
      if (e.ctrlKey && e.key === 'u') { e.preventDefault(); window.scrollBy({ top: -window.innerHeight / 2, behavior: 'smooth' }) }

      if (e.key === '[' || e.key === ']') {
        const idx = posts.findIndex(p => p.slug === location.pathname)
        if (e.key === '[' && idx > 0)                  navigate(posts[idx - 1].slug)
        if (e.key === ']' && idx < posts.length - 1)   navigate(posts[idx + 1].slug)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [location.pathname])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-50 dark:bg-black transition-colors duration-300">
      <div className="absolute inset-0 z-0" style={{ background: 'var(--bg-radial)' }} />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default Layout
