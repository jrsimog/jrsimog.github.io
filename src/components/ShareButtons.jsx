import { useState } from 'react'
import { SiX } from 'react-icons/si'
import { FaLinkedinIn } from 'react-icons/fa6'
import { FiCopy, FiCheck } from 'react-icons/fi'

const ShareButtons = ({ lang }) => {
  const [copied, setCopied] = useState(false)

  const url = window.location.href
  const tweetUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`

  const copyLink = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const btnClass = 'flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-white/15 bg-slate-100 dark:bg-white/5 px-3 py-1.5 text-xs text-slate-600 dark:text-white/60 transition hover:bg-slate-200 dark:hover:bg-white/10'

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-xs text-muted">{lang === 'es' ? 'Compartir:' : 'Share:'}</span>
      <a href={tweetUrl} target="_blank" rel="noopener noreferrer" className={btnClass}>
        <SiX className="text-sm" /> X
      </a>
      <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className={btnClass}>
        <FaLinkedinIn className="text-sm text-[#0077B5]" /> LinkedIn
      </a>
      <button onClick={copyLink} className={btnClass}>
        {copied
          ? <FiCheck className="text-sm text-emerald-500" />
          : <FiCopy className="text-sm" />}
        {copied
          ? (lang === 'es' ? '¡Copiado!' : 'Copied!')
          : (lang === 'es' ? 'Copiar enlace' : 'Copy link')}
      </button>
    </div>
  )
}

export default ShareButtons
