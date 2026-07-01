import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FiSearch, FiX } from 'react-icons/fi'
import { posts } from '../data/posts'
import { useLanguage } from '../context/LanguageContext'
import LangToggle from '../components/LangToggle'
import ThemeToggle from '../components/ThemeToggle'
import T from '../components/T'
import StickyNav from '../components/StickyNav'
import { trackEvent } from '../utils/analytics'

const Blog = () => {
  const { t, lang } = useLanguage()
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const filterTag = searchParams.get('tag')

  const typeLabel = {
    playground: { label: t('blog.types.playground'), style: 'bg-blue-500/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-300 border border-blue-500/20 dark:border-blue-500/25' },
    pildora:    { label: t('blog.types.pildora'),    style: 'bg-amber-500/10  dark:bg-amber-500/15  text-amber-700  dark:text-amber-300  border border-amber-500/20  dark:border-amber-500/25'  },
  }

  const q = query.trim().toLowerCase()

  const filteredPosts = posts.filter(post => {
    const title = (lang === 'en' && post.title_en ? post.title_en : post.title).toLowerCase()
    const desc  = (lang === 'en' && post.description_en ? post.description_en : post.description).toLowerCase()
    const matchesTag   = !filterTag || post.tag.toLowerCase() === filterTag.toLowerCase()
    const matchesQuery = !q || title.includes(q) || desc.includes(q) || post.tag.toLowerCase().includes(q)
    return matchesTag && matchesQuery
  })

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-50 dark:bg-black transition-colors duration-300">
      <div className="absolute inset-0 z-0" style={{ background: 'var(--bg-radial)' }} />
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-12 slide-in-blurred-top max-sm:pb-24">

        {/* Desktop header — inline, always visible */}
        <div className="hidden sm:flex items-center justify-between mb-10">
          <Link to="/" className="rounded-full border border-slate-200 dark:border-white/15 bg-white/60 dark:bg-white/5 px-4 py-1.5 text-sm text-muted hover:text-sub backdrop-blur-sm transition">
            {t('blog.back')}
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LangToggle />
          </div>
        </div>

        {/* Mobile nav — StickyNav pill at bottom */}
        <StickyNav
          left={<Link to="/" className="px-3 py-1 text-sm text-muted hover:text-sub transition">{t('blog.back')}</Link>}
          right={<div className="flex items-center gap-1"><ThemeToggle compact /><LangToggle compact /></div>}
        />

        <h1
          className="text-2xl font-bold bg-clip-text text-transparent mb-1"
          style={{ backgroundImage: 'var(--dt-gradient-blue)' }}
        >
          <T id="blog.title" />
        </h1>
        <p className="text-muted text-sm mb-6"><T id="blog.subtitle" /></p>

        {/* Search input — only when there are more than 5 posts */}
        {posts.length > 5 && (
          <div className="relative mb-6">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted text-sm pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t('blog.search_placeholder')}
              className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-sm pl-9 pr-9 py-2.5 text-sm text-body placeholder:text-muted focus:outline-none focus:border-blue-400 dark:focus:border-blue-500/60 transition"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-sub transition"
              >
                <FiX className="text-sm" />
              </button>
            )}
          </div>
        )}

        {filterTag && (
          <div className="flex items-center gap-3 bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/20 dark:border-blue-500/30 rounded-xl px-4 py-2.5 mb-6 text-sm text-blue-700 dark:text-blue-300">
            <span>
              {t('blog.filter_by')} <strong className="font-semibold">{filterTag}</strong>
            </span>
            <Link to="/blog" className="text-xs underline hover:text-blue-900 dark:hover:text-blue-100 transition-colors ml-auto">
              {t('blog.clear_filter')}
            </Link>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center rounded-xl border border-dashed border-slate-200 dark:border-white/10 py-12 px-6 text-muted">
              <p className="text-sm">
                {q ? <><T id="blog.no_results" /> <strong className="text-sub">"{query}"</strong></> : <T id="blog.no_posts" />}
              </p>
              {q && (
                <button onClick={() => setQuery('')} className="mt-4 inline-block rounded-full bg-slate-200 dark:bg-white/10 px-5 py-2 text-xs font-semibold text-slate-700 dark:text-white/80 hover:bg-slate-300 dark:hover:bg-white/20 transition-all">
                  <T id="blog.clear_filter" />
                </button>
              )}
            </div>
          ) : (
            filteredPosts.map(({ slug, Icon, tag, type, title, title_en, description, description_en, date }) => {
              const badge = typeLabel[type]
              const displayTitle = lang === 'en' && title_en ? title_en : title
              const displayDesc  = lang === 'en' && description_en ? description_en : description
              return (
                <Link
                  key={slug}
                  to={slug}
                  className="group rounded-xl border border-slate-200/60 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md p-5 transition hover:bg-white/80 dark:hover:bg-white/10 hover:border-slate-300/80 dark:hover:border-white/20"
                  onClick={() => trackEvent('post_click', { slug, title: displayTitle })}
                >
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <div className="flex items-center gap-1.5 text-xs text-muted">
                      <Icon className="text-blue-400" />
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
                  <h2 className="text-sub font-semibold group-hover:text-accent dark:group-hover:text-heading transition">{displayTitle}</h2>
                  <p className="text-muted text-sm mt-1">{displayDesc}</p>
                </Link>
              )
            })
          )}
        </div>

      </div>
    </div>
  )
}

export default Blog
