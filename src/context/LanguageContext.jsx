import { createContext, useContext, useState } from 'react'
import { translations } from '../i18n/translations'

const LanguageContext = createContext()

const FADE_OUT_MS = 180

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'es')
  const [isChanging, setIsChanging] = useState(false)

  const toggle = () => {
    setIsChanging(true)
    setTimeout(() => {
      const next = lang === 'es' ? 'en' : 'es'
      setLang(next)
      localStorage.setItem('lang', next)
      setIsChanging(false)
    }, FADE_OUT_MS)
  }

  const t = (path) => {
    const keys = path.split('.')
    let val = translations[lang]
    for (const key of keys) val = val?.[key]
    return val ?? path
  }

  return (
    <LanguageContext.Provider value={{ lang, toggle, t, isChanging }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
