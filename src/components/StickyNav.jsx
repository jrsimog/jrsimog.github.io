import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { FaFilePdf, FaBriefcase, FaCode, FaEnvelope, FaGraduationCap } from 'react-icons/fa'

const links = [
  { id: 'experiencia', es: 'Experiencia', en: 'Experience', icon: FaBriefcase },
  { id: 'proyectos',   es: 'Proyectos',   en: 'Projects',   icon: FaCode      },
  { id: 'contacto',   es: 'Contacto',     en: 'Contact',    icon: FaEnvelope  },
  { id: 'educacion',  es: 'Educación',    en: 'Education',  icon: FaGraduationCap },
]

const StickyNav = ({ onActiveChange }) => {
  const { lang } = useLanguage()
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(null)

  const updateActive = (id) => {
    setActive(id)
    onActiveChange?.(id)
  }

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const nearBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 80
      if (nearBottom) {
        updateActive('educacion')
        return
      }
      const OFFSET = 250
      let current = null
      let minDist = Infinity
      links.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (!el) return
        const top = el.getBoundingClientRect().top - OFFSET
        if (top <= 0 && Math.abs(top) < minDist) {
          minDist = Math.abs(top)
          current = id
        }
      })
      if (current) updateActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    updateActive(id)
    const top = el.getBoundingClientRect().top + window.scrollY - 64
    window.scrollTo({ top, behavior: 'smooth' })
  }

  if (!visible) return null

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center rounded-full border border-slate-200/80 dark:border-white/15 bg-white/80 dark:bg-black/60 backdrop-blur-md shadow-lg transition-all duration-300 max-w-[95vw]">
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-none px-3 py-1.5">
        {links.map(({ id, es, en, icon: Icon }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            title={lang === 'en' ? en : es}
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 ${
              active === id
                ? 'bg-blue-500/15 text-blue-600 dark:text-blue-300'
                : 'text-slate-500 dark:text-white/50 hover:text-slate-800 dark:hover:text-white/80'
            }`}
          >
            <span className="hidden sm:inline">{lang === 'en' ? en : es}</span>
            <Icon className="sm:hidden text-sm" />
          </button>
        ))}
      </div>
      <div className="w-px h-4 bg-slate-200 dark:bg-white/15 shrink-0" />
      <a
        href="/CV — José Ramón Simó Guerra.pdf"
        download
        title={lang === 'en' ? 'Download CV' : 'Descargar CV'}
        className="pdf-icon shrink-0 flex items-center justify-center rounded-full border border-transparent p-1.5 mx-1 transition-all duration-200"
      >
        <FaFilePdf className="text-sm text-red-400" />
      </a>
    </div>
  )
}

export default StickyNav
