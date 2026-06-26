import { useState, useEffect } from 'react'

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Volver arriba"
      className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 dark:border-white/20 bg-white/80 dark:bg-white/10 text-slate-600 dark:text-white/70 shadow-lg backdrop-blur-md transition-all duration-200 hover:bg-slate-100 dark:hover:bg-white/20 hover:scale-110 hover:shadow-xl"
    >
      ↑
    </button>
  )
}

export default ScrollToTop
