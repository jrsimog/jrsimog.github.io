import { Link } from 'react-router-dom'
import { posts } from '../data/posts'
import { useLanguage } from '../context/LanguageContext'
import LangToggle from '../components/LangToggle'

export default function Blog() {
  const { t, lang } = useLanguage()

  const typeLabel = {
    playground: { label: t('blog.types.playground'), style: 'bg-violet-500/15 text-violet-300 border border-violet-500/25' },
    pildora:    { label: t('blog.types.pildora'),    style: 'bg-amber-500/15  text-amber-300  border border-amber-500/25'  },
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.25), transparent 70%), #000000',
        }}
      />
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-12 slide-in-blurred-top">

        <div className="flex items-center justify-between mb-10">
          <Link to="/" className="text-white/40 hover:text-white/70 text-sm transition">
            {t('blog.back')}
          </Link>
          <LangToggle />
        </div>

        <h1 className="text-2xl font-bold bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 bg-clip-text text-transparent mb-1">
          {t('blog.title')}
        </h1>
        <p className="text-white/40 text-sm mb-8">{t('blog.subtitle')}</p>

        <div className="flex flex-col gap-4">
          {posts.map(({ slug, Icon, tag, type, title, title_en, description, description_en, date }) => {
            const badge = typeLabel[type]
            const displayTitle = lang === 'en' && title_en ? title_en : title
            const displayDesc  = lang === 'en' && description_en ? description_en : description
            return (
              <Link
                key={slug}
                to={slug}
                className="group rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-5 transition hover:bg-white/10 hover:border-white/20"
              >
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <div className="flex items-center gap-1.5 text-xs text-white/40">
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
                <h2 className="text-white/90 font-semibold group-hover:text-white transition">{displayTitle}</h2>
                <p className="text-white/40 text-sm mt-1">{displayDesc}</p>
              </Link>
            )
          })}
        </div>

      </div>
    </div>
  )
}
