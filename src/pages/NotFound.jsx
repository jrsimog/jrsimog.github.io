import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import PageHeader from '../components/PageHeader'
import SectionTitle from '../components/SectionTitle'

const NotFound = () => {
  const { t } = useLanguage()

  return (
    <div className="mx-auto max-w-3xl px-6 pt-12 pb-4">
      <PageHeader />

      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <SectionTitle as="p" color="violet" className="text-8xl font-bold mb-4 leading-none">
          {t('not_found.code')}
        </SectionTitle>
        <h1 className="text-xl font-semibold text-slate-800 dark:text-white/90 mb-2">
          {t('not_found.title')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-white/40 mb-8 max-w-sm">
          {t('not_found.message')}
        </p>
        <Link
          to="/"
          className="rounded-full border border-violet-200 dark:border-purple-400/40 bg-violet-100 dark:bg-purple-500/20 px-6 py-2.5 text-sm text-violet-700 dark:text-purple-200 transition hover:bg-violet-200 dark:hover:bg-purple-500/30"
        >
          {t('not_found.back')}
        </Link>
      </div>
    </div>
  )
}

export default NotFound
