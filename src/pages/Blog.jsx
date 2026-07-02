import { useState, useRef, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FiSearch, FiX, FiCopy, FiCheck } from 'react-icons/fi'
import { SiX } from 'react-icons/si'
import { FaLinkedinIn } from 'react-icons/fa6'
import { posts } from '../data/posts'
import { readingTimeFromWords } from '../utils/readingTime'
import { useLanguage } from '../context/LanguageContext'
import PageHeader from '../components/PageHeader'
import { GradientText } from '../components/SectionTitle'
import T from '../components/T'
import { trackEvent } from '../utils/analytics'

const Blog = () => {
  const { t, lang } = useLanguage()
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [copiedSlug, setCopiedSlug] = useState(null)
  const timerRef = useRef(null)
  const filterTag = searchParams.get('tag')

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const postUrl = (slug) => `${window.location.origin}${slug}`

  const copyLink = (slug) => {
    navigator.clipboard.writeText(postUrl(slug))
    setCopiedSlug(slug)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setCopiedSlug(null), 2000)
    trackEvent('share', { method: 'copy_link', url: postUrl(slug) })
  }

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

        <PageHeader back="/" backLabel={t('blog.back')} />

        <GradientText as="h1" className="text-2xl font-bold mb-1">
          <T id="blog.title" />
        </GradientText>
        <p className="text-muted text-sm mb-6"><T id="blog.subtitle" /></p>

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
            filteredPosts.map(({ slug, Icon, tag, type, title, title_en, description, description_en, date, wordCount }) => {
              const badge = typeLabel[type]
              const displayTitle = lang === 'en' && title_en ? title_en : title
              const displayDesc  = lang === 'en' && description_en ? description_en : description
              return (
                <div
                  key={slug}
                  className="group relative rounded-xl border border-slate-200/60 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md p-5 transition hover:bg-white/80 dark:hover:bg-white/10 hover:border-slate-300/80 dark:hover:border-white/20"
                >
                  <Link
                    to={slug}
                    className="absolute inset-0 rounded-xl"
                    aria-label={displayTitle}
                    onClick={() => trackEvent('post_click', { slug, title: displayTitle })}
                  />
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <div className="flex items-center gap-1.5 text-xs text-muted">
                      <Icon className="text-blue-400" />
                      <span>{tag}</span>
                      <span>·</span>
                      <span>{date}</span>
                      {wordCount && (
                        <>
                          <span>·</span>
                          <span>{readingTimeFromWords(wordCount)} {t('blog.reading_time')}</span>
                        </>
                      )}
                    </div>
                    {badge && (
                      <span className={`text-xs rounded-full px-2 py-0.5 ${badge.style}`}>
                        {badge.label}
                      </span>
                    )}
                    <div className="relative ml-auto flex items-center gap-0.5">
                      <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${displayTitle} — ${displayDesc}\n\n${lang === 'es' ? 'Míralo aquí:' : 'Check it out:'}`)}&url=${encodeURIComponent(postUrl(slug))}&hashtags=${tag}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="X"
                        className="p-1.5 text-muted hover:text-sub transition"
                        onClick={() => trackEvent('share', { method: 'x', url: postUrl(slug) })}
                      >
                        <SiX className="text-xs" />
                      </a>
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl(slug))}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="LinkedIn"
                        className="p-1.5 text-muted hover:text-sub transition"
                        onClick={() => trackEvent('share', { method: 'linkedin', url: postUrl(slug) })}
                      >
                        <FaLinkedinIn className="text-xs" />
                      </a>
                      <button
                        onClick={() => copyLink(slug)}
                        title={lang === 'es' ? 'Copiar enlace' : 'Copy link'}
                        className="p-1.5 text-muted hover:text-sub transition"
                      >
                        {copiedSlug === slug
                          ? <FiCheck className="text-xs text-emerald-500" />
                          : <FiCopy className="text-xs" />}
                      </button>
                    </div>
                  </div>
                  <h2 className="text-sub font-semibold group-hover:text-accent dark:group-hover:text-heading transition">{displayTitle}</h2>
                  <p className="text-muted text-sm mt-1">{displayDesc}</p>
                </div>
              )
            })
          )}
        </div>

      </div>
    </div>
  )
}

export default Blog
