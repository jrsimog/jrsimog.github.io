import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import LangToggle from '../components/LangToggle'
import ThemeToggle from '../components/ThemeToggle'

const NotFound = () => {
  const { t } = useLanguage()

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-50 dark:bg-black transition-colors duration-300">
      <div
        className="absolute inset-0 z-0"
        style={{ background: 'var(--bg-radial)' }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 pt-12 pb-4">
        <div className="flex justify-end items-center gap-3 mb-6">
          <ThemeToggle />
          <LangToggle />
        </div>

        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
          <p className="text-8xl font-bold bg-gradient-to-tl from-slate-900 via-violet-600 to-slate-500 dark:from-slate-800 dark:via-violet-500 dark:to-zinc-400 bg-clip-text text-transparent mb-4 leading-none">
            {t('not_found.code')}
          </p>
          <h1 className="text-xl font-semibold text-slate-800 dark:text-white/90 mb-2">
            {t('not_found.title')}
          </h1>
          <p className="text-sm text-slate-500 dark:text-white/40 mb-8 max-w-sm">
            {t('not_found.message')}
          </p>
          <Link
            to="/"
            className="rounded-full border border-violet-200 dark:border-purple-400/40 bg-violet-100 dark:bg-purple-500/20 px-6 py-2.5 text-sm text-violet-700 dark:text-purple-200 transition hover:bg-violet-200 dark:hover:bg-purple-500/30"
          >
            {t('not_found.back')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
