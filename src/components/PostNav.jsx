import { Link } from 'react-router-dom'
import { posts } from '../data/posts'
import { useLanguage } from '../context/LanguageContext'

const PostNav = ({ slug }) => {
  const { lang, t } = useLanguage()
  const idx = posts.findIndex(p => p.slug === slug)
  const prev = posts[idx - 1] ?? null
  const next = posts[idx + 1] ?? null

  if (!prev && !next) return null

  return (
    <div className="flex gap-3 mt-8">
      {prev ? (
        <Link
          to={prev.slug}
          className="flex-1 group rounded-xl border border-slate-200/60 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md px-4 py-3 transition hover:bg-white/80 dark:hover:bg-white/10 hover:border-slate-300/80 dark:hover:border-white/20"
        >
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted mb-1 flex items-center gap-1">
            <span>←</span> {t('post.previous')}
            <kbd className="ml-auto font-mono text-[9px] px-1 py-0.5 rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-muted">[</kbd>
          </p>
          <p className="text-sm font-medium text-sub group-hover:text-accent dark:group-hover:text-heading transition truncate">
            {lang === 'en' && prev.title_en ? prev.title_en : prev.title}
          </p>
        </Link>
      ) : <div className="flex-1" />}

      {next ? (
        <Link
          to={next.slug}
          className="flex-1 group rounded-xl border border-slate-200/60 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md px-4 py-3 transition hover:bg-white/80 dark:hover:bg-white/10 hover:border-slate-300/80 dark:hover:border-white/20 text-right"
        >
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted mb-1 flex items-center gap-1 justify-end">
            <kbd className="mr-auto font-mono text-[9px] px-1 py-0.5 rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-muted">]</kbd>
            {t('post.next')} <span>→</span>
          </p>
          <p className="text-sm font-medium text-sub group-hover:text-accent dark:group-hover:text-heading transition truncate">
            {lang === 'en' && next.title_en ? next.title_en : next.title}
          </p>
        </Link>
      ) : <div className="flex-1" />}
    </div>
  )
}

export default PostNav
