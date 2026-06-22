import { useLanguage } from '../context/LanguageContext'

export default function LangToggle() {
  const { lang, toggle } = useLanguage()
  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm transition hover:bg-white/10"
      title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      {lang === 'es'
        ? <><span>🇪🇸</span><span className="text-white/50 text-xs">ES</span></>
        : <><span>🇺🇸</span><span className="text-white/50 text-xs">EN</span></>
      }
    </button>
  )
}
