import { useState } from 'react'
import { Link } from 'react-router-dom'
import { experience } from '../data/experience'
import {
  SiElixir, SiPhoenixframework, SiPhp, SiSymfony, SiMysql, SiDocker,
  SiPython, SiSpring, SiGooglecloud, SiTypescript, SiJavascript,
  SiReact, SiNodedotjs, SiLaravel, SiAngular, SiGithub, SiOpenjdk, SiInstagram,
} from 'react-icons/si'
import { FaLinkedin, FaAmazon } from 'react-icons/fa'
import { MdRollerSkating } from 'react-icons/md'
import { useLanguage } from '../context/LanguageContext'
import LangToggle from '../components/LangToggle'

const stack = [
  { name: 'Elixir',      icon: SiElixir,          level: 4 },
  { name: 'Phoenix',     icon: SiPhoenixframework, level: 4 },
  { name: 'React',       icon: SiReact,            level: 4 },
  { name: 'PHP',         icon: SiPhp,              level: 4 },
  { name: 'Symfony',     icon: SiSymfony,          level: 4 },
  { name: 'MySQL',       icon: SiMysql,            level: 4 },
  { name: 'Docker',      icon: SiDocker,           level: 4 },
  { name: 'Python',      icon: SiPython,           level: 3 },
  { name: 'Java',        icon: SiOpenjdk,          level: 3 },
  { name: 'Spring Boot', icon: SiSpring,           level: 3 },
  { name: 'GCP',         icon: SiGooglecloud,      level: 3 },
  { name: 'TypeScript',  icon: SiTypescript,       level: 3 },
  { name: 'JavaScript',  icon: SiJavascript,       level: 3 },
  { name: 'Node.js',     icon: SiNodedotjs,        level: 2 },
  { name: 'Laravel',     icon: SiLaravel,          level: 2 },
  { name: 'AWS',         icon: FaAmazon,           level: 2 },
  { name: 'AngularJS',   icon: SiAngular,          level: 1 },
]

const levelStyle = {
  4: 'bg-white/18 border-white/30 text-white/95 hover:bg-white/30 hover:border-white/50 hover:text-white',
  3: 'bg-white/10 border-white/18 text-white/60 hover:bg-white/22 hover:border-white/35 hover:text-white/90',
  2: 'bg-white/5  border-white/10 text-white/38 hover:bg-white/15 hover:border-white/25 hover:text-white/75',
  1: 'bg-white/3  border-white/6  text-white/22 hover:bg-white/10 hover:border-white/18 hover:text-white/55',
}

function GlassCard({ children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-white/15 bg-white/8 p-6 shadow-xl backdrop-blur-md ${className}`}>
      {children}
    </div>
  )
}

const PREVIEW = 2

export default function Home() {
  const { t, lang } = useLanguage()
  const [expanded, setExpanded] = useState(false)

  const visible = expanded ? experience : experience.slice(0, PREVIEW)

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.25), transparent 70%), #000000',
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-12">

        <div className="flex justify-end mb-6">
          <LangToggle />
        </div>

        {/* Hero */}
        <GlassCard className="slide-in-blurred-top mb-6 text-center rounded-3xl px-10 py-10">
          <img
            src="https://avatars.githubusercontent.com/u/4277373?v=4"
            alt="José Simó"
            className="mx-auto mb-5 h-20 w-20 rounded-full border border-white/20 object-cover"
          />
          <h1 className="mb-1 text-4xl font-bold tracking-tight bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 bg-clip-text text-transparent">
            José Simó
          </h1>
          <p className="mb-1 text-lg text-purple-300">{t('home.role')}</p>
          <p className="mb-5 text-sm text-white/40">{t('home.subtitle')}</p>
          <p className="mx-auto mb-7 max-w-lg text-sm leading-relaxed text-white/55">
            {t('home.bio')}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://github.com/jrsimog" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm text-white/80 transition hover:bg-white/20">
              <SiGithub className="text-base" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/jrsimog" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm text-white/80 transition hover:bg-white/20">
              <FaLinkedin className="text-base" /> LinkedIn
            </a>
            <a href="mailto:jrsimog@gmail.com"
              className="rounded-full border border-purple-400/40 bg-purple-500/20 px-5 py-2 text-sm text-purple-200 transition hover:bg-purple-500/30">
              {t('home.contact')}
            </a>
            <a href="https://www.instagram.com/khdtto" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm text-white/80 transition hover:bg-white/20">
              <SiInstagram className="text-base" /> Instagram
            </a>
            <Link to="/blog"
              className="rounded-full border border-violet-400/30 bg-violet-500/10 px-5 py-2 text-sm text-violet-300 transition hover:bg-violet-500/20">
              {t('home.blog')}
            </Link>
          </div>
        </GlassCard>

        {/* Experiencia */}
        <div className="slide-in-blurred-top mb-8" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-sm font-semibold uppercase tracking-widest bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 bg-clip-text text-transparent mb-5">
            {t('home.experience_title')}
          </h2>

          <div className="relative">
            <div className="absolute left-0 top-2 bottom-2 w-px bg-white/10" />
            <div className="flex flex-col gap-4 pl-6">
              {visible.map(({ company, role_es, role_en, period_es, period_en, desc_es, desc_en, current }, i) => (
                <div key={i} className="relative">
                  <div className={`absolute -left-[1.625rem] top-2 h-2.5 w-2.5 rounded-full border-2 ${
                    current ? 'bg-violet-400 border-violet-400' : 'bg-black border-white/25'
                  }`} />
                  <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md px-5 py-4 transition hover:bg-white/8 hover:border-white/15">
                    <div className="flex items-start justify-between gap-4 flex-wrap mb-1">
                      <div>
                        <span className="text-white/90 font-semibold text-sm">{company}</span>
                        <span className="text-white/40 text-xs ml-2">
                          {lang === 'en' ? role_en : role_es}
                        </span>
                      </div>
                      <span className={`text-xs shrink-0 ${current ? 'text-violet-400' : 'text-white/30'}`}>
                        {lang === 'en' ? period_en : period_es}
                      </span>
                    </div>
                    <p className="text-white/45 text-xs leading-relaxed">
                      {lang === 'en' ? desc_en : desc_es}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {experience.length > PREVIEW && (
            <button
              onClick={() => setExpanded(e => !e)}
              className="mt-4 ml-6 text-xs text-white/35 hover:text-white/60 transition flex items-center gap-1.5"
            >
              <span className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>↓</span>
              {expanded
                ? (lang === 'en' ? 'Show less' : 'Ver menos')
                : (lang === 'en' ? `Show ${experience.length - PREVIEW} more` : `Ver ${experience.length - PREVIEW} más`)
              }
            </button>
          )}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 slide-in-blurred-top" style={{ animationDelay: '0.3s' }}>
          <GlassCard>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 bg-clip-text text-transparent">
              {t('home.about_title')}
            </h2>
            <p className="text-sm leading-relaxed text-white/55">{t('home.about_text')}</p>
            <div className="mt-3 flex items-center gap-1.5 text-white/25">
              <MdRollerSkating className="text-lg" />
              <span className="text-xs">Inline Downhill</span>
            </div>
          </GlassCard>

          <GlassCard>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 bg-clip-text text-transparent">
              {t('home.stack_title')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {stack.map(({ name, icon: Icon, level }) => (
                <span key={name}
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-all duration-200 cursor-default ${levelStyle[level]}`}>
                  <Icon className="text-sm shrink-0" />
                  {name}
                </span>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 bg-clip-text text-transparent">
              {t('home.contact_title')}
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-white/55">{t('home.contact_text')}</p>
            <a href="mailto:jrsimog@gmail.com"
              className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs text-white/80 transition hover:bg-white/20">
              jrsimog@gmail.com
            </a>
          </GlassCard>
        </div>

      </div>
    </div>
  )
}
