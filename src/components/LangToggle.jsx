import { useLanguage } from '../context/LanguageContext'

export default function LangToggle() {
  const { lang, toggle } = useLanguage()
  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-white/15 bg-slate-100 dark:bg-white/5 px-3 py-2.5 min-h-[44px] text-sm transition hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white/80"
      title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      {lang === 'es'
        ? <><span>🇪🇸</span><span className="text-slate-500 dark:text-white/50 text-xs">ES</span></>
        : <><span>🇺🇸</span><span className="text-slate-500 dark:text-white/50 text-xs">EN</span></>
      }
    </button>
  )
}
