import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import LangToggle from './LangToggle'

const PageHeader = ({ back, backLabel, extra }) => (
  <div className="flex items-center justify-between mb-10">
    {back
      ? <Link to={back} className="text-slate-500 dark:text-white/40 hover:text-slate-800 dark:hover:text-white/70 text-sm transition">{backLabel}</Link>
      : <div />
    }
    <div className="flex items-center gap-3">
      {extra}
      <ThemeToggle />
      <LangToggle />
    </div>
  </div>
)

export default PageHeader
