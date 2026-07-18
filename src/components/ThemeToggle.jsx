import { useTheme } from '../context/ThemeContext'
import { FiSun, FiMoon } from 'react-icons/fi'
import RippleButton from './RippleButton'

const ThemeToggle = ({ compact = false }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <RippleButton
      onClick={toggleTheme}
      className={compact
        ? 'flex items-center justify-center w-8 h-8 rounded-full text-slate-500 dark:text-white/50 transition hover:text-slate-800 dark:hover:text-white/80 hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer'
        : 'flex items-center justify-center w-11 h-11 rounded-full border border-slate-200 dark:border-white/15 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/60 transition hover:bg-slate-200 dark:hover:bg-white/10 cursor-pointer'
      }
      rippleColor={theme === 'dark' ? 'rgba(234, 179, 8, 0.25)' : 'rgba(37, 99, 235, 0.25)'}
      title={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
    >
      {theme === 'dark' ? (
        <FiSun className="text-base text-yellow-400" />
      ) : (
        <FiMoon className="text-base text-blue-500" />
      )}
    </RippleButton>
  )
}

export default ThemeToggle
