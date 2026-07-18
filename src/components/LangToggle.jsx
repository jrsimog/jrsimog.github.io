import { useLanguage } from '../context/LanguageContext'
import { trackEvent } from '../utils/analytics'
import RippleButton from './RippleButton'

const LangToggle = ({ compact = false }) => {
  const { lang, toggle } = useLanguage()
  const handleToggle = () => {
    trackEvent('language_switch', { to: lang === 'es' ? 'en' : 'es' })
    toggle()
  }

  return (
    <RippleButton
      onClick={handleToggle}
      className={compact
        ? 'flex items-center gap-1 rounded-full px-2 py-1 text-xs text-slate-500 dark:text-white/50 transition hover:text-slate-800 dark:hover:text-white/80 hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer'
        : 'flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-white/15 bg-slate-100 dark:bg-white/5 px-3 py-2.5 min-h-[44px] text-sm transition hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white/80 cursor-pointer'
      }
      rippleColor="rgba(59, 130, 246, 0.25)"
      title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      {lang === 'es'
        ? <><span>🇪🇸</span><span className="text-slate-500 dark:text-white/50 text-xs font-semibold">ES</span></>
        : <><span>🇺🇸</span><span className="text-slate-500 dark:text-white/50 text-xs font-semibold">EN</span></>
      }
    </RippleButton>
  )
}

export default LangToggle
