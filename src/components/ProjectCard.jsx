import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../context/LanguageContext'
import { techIcons } from '../data/techIcons'

export default function ProjectCard({ project }) {
  const { lang, t } = useLanguage()
  const [lightbox, setLightbox] = useState(null)

  const description = lang === 'en' ? project.description_en : project.description_es

  return (
    <>
      <div className="rounded-2xl border border-slate-200/80 bg-white/70 dark:border-white/15 dark:bg-white/8 shadow-xl dark:shadow-black/20 backdrop-blur-md overflow-hidden transition-all duration-300">

        {/* Screenshot grid */}
        <div className="grid grid-cols-2 gap-0.5 bg-slate-200/50 dark:bg-white/5">
          {project.screenshots.map((src, i) => (
            <button
              key={i}
              onClick={() => setLightbox(i)}
              className="relative overflow-hidden aspect-video bg-slate-100 dark:bg-white/5 hover:opacity-90 transition-opacity group"
            >
              <img
                src={src}
                alt={`${project.name} screenshot ${i + 1}`}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-medium transition-opacity">
                  {t('projects.view')}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Info */}
        <div className="p-5">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="text-slate-800 dark:text-white/90 font-semibold text-base">
              {project.name}
            </h3>
            {project.date && (
              <span className="text-xs text-slate-400 dark:text-white/30 shrink-0">{project.date}</span>
            )}
          </div>
          <p className="text-slate-600 dark:text-white/50 text-xs leading-relaxed mb-4">
            {description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map(tech => {
              const tech_icon = techIcons[tech]
              const Icon = tech_icon?.icon
              return (
                <span
                  key={tech}
                  className="flex items-center gap-1 text-xs rounded-full border border-slate-200 dark:border-white/15 bg-slate-100 dark:bg-white/8 px-2.5 py-0.5 text-slate-600 dark:text-white/55"
                >
                  {Icon && <Icon className="text-sm shrink-0" style={{ color: tech_icon.color }} />}
                  {tech}
                </span>
              )
            })}
          </div>
        </div>
      </div>

      {/* Lightbox — renderizado en document.body para evitar conflictos con transforms */}
      {lightbox !== null && createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <div className="relative flex flex-col items-center px-16" onClick={e => e.stopPropagation()}>

            <img
              src={project.screenshots[lightbox]}
              alt={`${project.name} screenshot ${lightbox + 1}`}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />

            {/* Prev / Next */}
            {project.screenshots.length > 1 && (
              <>
                <button
                  onClick={() => setLightbox(i => (i - 1 + project.screenshots.length) % project.screenshots.length)}
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl w-12 h-12 flex items-center justify-center"
                >
                  ‹
                </button>
                <button
                  onClick={() => setLightbox(i => (i + 1) % project.screenshots.length)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl w-12 h-12 flex items-center justify-center"
                >
                  ›
                </button>
              </>
            )}

            {/* Counter */}
            <p className="text-white/40 text-xs mt-3">
              {lightbox + 1} / {project.screenshots.length}
            </p>
          </div>

          {/* Close */}
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-6 text-white/60 hover:text-white text-sm transition"
          >
            {t('projects.close')} ✕
          </button>
        </div>,
        document.body
      )}
    </>
  )
}
