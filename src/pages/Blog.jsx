import { Link } from 'react-router-dom'
import { posts } from '../data/posts'
import { useLanguage } from '../context/LanguageContext'
import LangToggle from '../components/LangToggle'
import ThemeToggle from '../components/ThemeToggle'

export default function Blog() {
  const { t, lang } = useLanguage()

  const typeLabel = {
    playground: { label: t('blog.types.playground'), style: 'bg-violet-500/10 dark:bg-violet-500/15 text-violet-600 dark:text-violet-300 border border-violet-500/20 dark:border-violet-500/25' },
    pildora:    { label: t('blog.types.pildora'),    style: 'bg-amber-500/10  dark:bg-amber-500/15  text-amber-700  dark:text-amber-300  border border-amber-500/20  dark:border-amber-500/25'  },
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-50 dark:bg-black transition-colors duration-300">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'var(--bg-radial)',
        }}
      />
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-12 slide-in-blurred-top">

        <div className="flex items-center justify-between mb-10">
          <Link to="/" className="text-slate-500 dark:text-white/40 hover:text-slate-800 dark:hover:text-white/70 text-sm transition">
            {t('blog.back')}
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LangToggle />
          </div>
        </div>

        <h1 className="text-2xl font-bold bg-gradient-to-tl from-slate-900 via-violet-600 to-slate-500 dark:from-slate-800 dark:via-violet-500 dark:to-zinc-400 bg-clip-text text-transparent mb-1">
          {t('blog.title')}
        </h1>
        <p className="text-slate-500 dark:text-white/40 text-sm mb-8">{t('blog.subtitle')}</p>

        <div className="flex flex-col gap-4">
          {posts.map(({ slug, Icon, tag, type, title, title_en, description, description_en, date }) => {
            const badge = typeLabel[type]
            const displayTitle = lang === 'en' && title_en ? title_en : title
            const displayDesc  = lang === 'en' && description_en ? description_en : description
            return (
              <Link
                key={slug}
                to={slug}
                className="group rounded-xl border border-slate-200/60 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md p-5 transition hover:bg-white/80 dark:hover:bg-white/10 hover:border-slate-300/80 dark:hover:border-white/20"
              >
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-white/40">
                    <Icon className="text-violet-400" />
                    <span>{tag}</span>
                    <span>·</span>
                    <span>{date}</span>
                  </div>
                  {badge && (
                    <span className={`text-xs rounded-full px-2 py-0.5 ${badge.style}`}>
                      {badge.label}
                    </span>
                  )}
                </div>
                <h2 className="text-slate-800 dark:text-white/90 font-semibold group-hover:text-indigo-600 dark:group-hover:text-white transition">{displayTitle}</h2>
                <p className="text-slate-500 dark:text-white/40 text-sm mt-1">{displayDesc}</p>
              </Link>
            )
          })}
        </div>

      </div>
    </div>
  )
}
