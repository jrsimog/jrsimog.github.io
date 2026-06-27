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
      className="fixed bottom-5 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 dark:border-white/15 bg-white/80 dark:bg-black/60 text-slate-500 dark:text-white/50 shadow-lg backdrop-blur-md transition-all duration-200 hover:text-slate-800 dark:hover:text-white/80 sm:bottom-6 sm:right-6"
    >
      ↑
    </button>
  )
}

export default ScrollToTop
