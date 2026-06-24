import { useState } from 'react'
import { Link } from 'react-router-dom'
import { experience } from '../data/experience'
import { posts } from '../data/posts'
import { projects } from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import {
  SiElixir, SiPhoenixframework, SiPhp, SiSymfony, SiMysql, SiDocker,
  SiPython, SiSpring, SiGooglecloud, SiTypescript, SiJavascript,
  SiReact, SiNodedotjs, SiLaravel, SiAngular, SiGithub, SiOpenjdk, SiInstagram,
  SiVite, SiTailwindcss, SiReactrouter, SiGithubactions, SiYoutubemusic,
} from 'react-icons/si'
import { FaLinkedin, FaAmazon } from 'react-icons/fa'
import { MdRollerSkating } from 'react-icons/md'
import { useLanguage } from '../context/LanguageContext'
import LangToggle from '../components/LangToggle'
import ThemeToggle from '../components/ThemeToggle'
import ScrollReveal from '../components/ScrollReveal'

const stack = [
  { name: 'Elixir',      icon: SiElixir,          level: 4, color: '#A07CF8' },
  { name: 'Phoenix',     icon: SiPhoenixframework, level: 4, color: '#FD4F00' },
  { name: 'React',       icon: SiReact,            level: 4, color: '#00b4d8' },
  { name: 'PHP',         icon: SiPhp,              level: 4, color: '#777BB4' },
  { name: 'Symfony',     icon: SiSymfony,          level: 4, color: '#6E7681' },
  { name: 'MySQL',       icon: SiMysql,            level: 4, color: '#00758F' },
  { name: 'Docker',      icon: SiDocker,           level: 4, color: '#2496ED' },
  { name: 'Python',      icon: SiPython,           level: 3, color: '#3776AB' },
  { name: 'Java',        icon: SiOpenjdk,          level: 3, color: '#E76F00' },
  { name: 'Spring Boot', icon: SiSpring,           level: 3, color: '#6DB33F' },
  { name: 'GCP',         icon: SiGooglecloud,      level: 3, color: '#4285F4' },
  { name: 'TypeScript',  icon: SiTypescript,       level: 3, color: '#3178C6' },
  { name: 'JavaScript',  icon: SiJavascript,       level: 3, color: '#E9B000' },
  { name: 'Node.js',     icon: SiNodedotjs,        level: 2, color: '#339933' },
  { name: 'Laravel',     icon: SiLaravel,          level: 2, color: '#FF2D20' },
  { name: 'AWS',         icon: FaAmazon,           level: 2, color: '#FF9900' },
  { name: 'AngularJS',   icon: SiAngular,          level: 1, color: '#DD0031' },
]

const levelStyle = {
  4: 'bg-slate-900/10 border-slate-900/20 text-slate-800 hover:bg-slate-900/20 hover:border-slate-900/30 dark:bg-white/18 dark:border-white/30 dark:text-white/95 dark:hover:bg-white/30 dark:hover:border-white/50 dark:hover:text-white',
  3: 'bg-slate-900/5 border-slate-900/10 text-slate-600 hover:bg-slate-900/10 hover:border-slate-900/15 dark:bg-white/10 dark:border-white/18 dark:text-white/60 dark:hover:bg-white/22 dark:hover:border-white/35 dark:hover:text-white/90',
  2: 'bg-slate-900/3 border-slate-900/6 text-slate-500 hover:bg-slate-900/6 hover:border-slate-900/10 dark:bg-white/5  dark:border-white/10 dark:text-white/38 dark:hover:bg-white/15 dark:hover:border-white/25 dark:hover:text-white/75',
  1: 'bg-slate-900/1 border-slate-900/4 text-slate-400 hover:bg-slate-900/3 hover:border-slate-900/6 dark:bg-white/3  dark:border-white/6  dark:text-white/22 dark:hover:bg-white/10 dark:hover:border-white/18 dark:hover:text-white/55',
}

function GlassCard({ children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-slate-200/80 bg-white/70 dark:border-white/15 dark:bg-white/8 p-6 shadow-xl dark:shadow-black/20 backdrop-blur-md transition-all duration-300 ${className}`}>
      {children}
    </div>
  )
}

const tagsWithPosts = new Set(posts.map(post => post.tag.toLowerCase()))

const PREVIEW = 2

export default function Home() {
  const { t, lang } = useLanguage()
  const [expanded, setExpanded] = useState(false)

  const visible = expanded ? experience : experience.slice(0, PREVIEW)

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-50 dark:bg-black transition-colors duration-300">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'var(--bg-radial)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-12 pb-4">

        <div className="flex justify-end items-center gap-3 mb-6">
          <ThemeToggle />
          <LangToggle />
        </div>

        {/* Hero */}
        <ScrollReveal delay="0s">
          <GlassCard className="mb-6 text-center rounded-3xl px-6 py-8 sm:px-10 sm:py-10">
            <img
              src="https://avatars.githubusercontent.com/u/4277373?v=4"
              alt="José Simó"
              className="mx-auto mb-5 h-20 w-20 rounded-full border border-slate-200 dark:border-white/20 object-cover"
            />
            <h1 className="mb-1 text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-tl from-slate-900 via-blue-600 to-slate-500 bg-clip-text text-transparent dark:bg-none dark:text-white">
              José Simó
            </h1>
            <p className="mb-1 text-lg text-blue-600 dark:text-blue-300">{t('home.role')}</p>
            <p className="mb-5 text-sm text-slate-500 dark:text-white/40">{t('home.subtitle')}</p>
            <p className="mx-auto mb-7 max-w-lg text-sm leading-relaxed text-slate-600 dark:text-white/55">
              {t('home.bio')}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="https://github.com/jrsimog" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/20 bg-slate-100 dark:bg-white/10 px-5 py-2 text-sm text-slate-700 dark:text-white/80 transition hover:bg-slate-200 dark:hover:bg-white/20">
                <SiGithub className="text-base" /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/jrsimog" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/20 bg-slate-100 dark:bg-white/10 px-5 py-2 text-sm text-slate-700 dark:text-white/80 transition hover:bg-slate-200 dark:hover:bg-white/20">
                <FaLinkedin className="text-base text-[#0A66C2]" /> LinkedIn
              </a>
              <a href="mailto:jrsimog@gmail.com"
                className="rounded-full border border-blue-200 dark:border-blue-400/40 bg-blue-100 dark:bg-blue-500/20 px-5 py-2 text-sm text-blue-700 dark:text-blue-200 transition hover:bg-blue-200 dark:hover:bg-blue-500/30">
                {t('home.contact')}
              </a>
              <a href="https://www.instagram.com/khdtto" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/20 bg-slate-100 dark:bg-white/10 px-5 py-2 text-sm text-slate-700 dark:text-white/80 transition hover:bg-slate-200 dark:hover:bg-white/20">
                <SiInstagram className="text-base" /> Instagram
              </a>
              <Link to="/blog"
                className="rounded-full border border-blue-100 dark:border-blue-400/30 bg-blue-50 dark:bg-blue-500/10 px-5 py-2 text-sm text-blue-600 dark:text-blue-300 transition hover:bg-blue-100 dark:hover:bg-blue-500/20">
                {t('home.blog')}
              </Link>
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* Experiencia */}
        <div className="mb-8">
          <ScrollReveal delay="0.3s">
            <h2 className="text-sm font-semibold uppercase tracking-widest bg-gradient-to-tl from-slate-900 via-blue-600 to-slate-500 bg-clip-text text-transparent dark:bg-none dark:text-white mb-5">
              {t('home.experience_title')}
            </h2>
          </ScrollReveal>

          <div className="relative">
            <div className="absolute left-0 top-2 bottom-2 w-px bg-slate-200 dark:bg-white/10" />
            <div className="flex flex-col gap-4 pl-6">
              {visible.map(({ company, role_es, role_en, period_es, period_en, desc_es, desc_en, current }, i) => (
                <ScrollReveal key={i} className="relative" delay={`${0.45 + i * 0.08}s`} variant="left">
                  <div className={`absolute -left-[1.625rem] top-2 h-2.5 w-2.5 rounded-full border-2 ${
                    current ? 'bg-blue-500 border-blue-500 dark:bg-blue-400 dark:border-blue-400' : 'bg-slate-50 dark:bg-black border-slate-300 dark:border-white/25'
                  }`} />
                  <div className="rounded-xl border border-slate-200/60 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md px-5 py-4 transition hover:bg-white/80 dark:hover:bg-white/8 hover:border-slate-300/80 dark:hover:border-white/15">
                    <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                      <div className="min-w-0">
                        <span className="text-slate-800 dark:text-white/90 font-semibold text-sm">{company}</span>
                        <span className="text-slate-500 dark:text-white/40 text-xs ml-2">
                          {lang === 'en' ? role_en : role_es}
                        </span>
                      </div>
                      <span className={`text-xs shrink-0 ${current ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-white/30'}`}>
                        {lang === 'en' ? period_en : period_es}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-white/45 text-xs leading-relaxed">
                      {lang === 'en' ? desc_en : desc_es}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {experience.length > PREVIEW && (
            <ScrollReveal className="inline-block" delay="0.62s">
              <button
                onClick={() => setExpanded(e => !e)}
                className="mt-4 ml-6 text-xs text-slate-400 hover:text-slate-600 dark:text-white/35 dark:hover:text-white/60 transition flex items-center gap-1.5"
              >
                <span className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>↓</span>
                {expanded
                  ? (lang === 'en' ? 'Show less' : 'Ver menos')
                  : (lang === 'en' ? `Show ${experience.length - PREVIEW} more` : `Ver ${experience.length - PREVIEW} más`)
                }
              </button>
            </ScrollReveal>
          )}
        </div>

        {/* Proyectos */}
        <div className="mb-8">
          <ScrollReveal delay="0.05s">
            <h2 className="text-sm font-semibold uppercase tracking-widest bg-gradient-to-tl from-slate-900 via-blue-600 to-slate-500 bg-clip-text text-transparent dark:bg-none dark:text-white mb-5">
              {t('projects.title')}
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {projects.map((project, i) => (
              <ScrollReveal key={project.id} delay={`${0.1 + i * 0.08}s`} variant="left">
                <ProjectCard project={project} />
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Columna izquierda: Sobre mí + Contacto */}
          <div className="flex flex-col gap-5">
            <ScrollReveal delay="0.05s">
              <GlassCard>
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest bg-gradient-to-tl from-slate-900 via-blue-600 to-slate-500 bg-clip-text text-transparent dark:bg-none dark:text-white">
                  {t('home.about_title')}
                </h2>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-white/55">{t('home.about_text')}</p>
                <div className="mt-3 flex flex-col gap-2">
                  <div className="flex items-center gap-1.5 text-slate-400 dark:text-white/25">
                    <MdRollerSkating className="text-lg" />
                    <span className="text-xs">Inline Downhill</span>
                  </div>
                  <a
                    href="https://music.youtube.com/playlist?list=PLrTZHWsW-mdayf2WOylkb5R33x1NtpS3S&si=pDPydJOi6LXTbrVj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/20 bg-slate-100 dark:bg-white/10 px-3 py-1.5 text-xs text-slate-700 dark:text-white/80 transition hover:bg-slate-200 dark:hover:bg-white/20 w-fit"
                  >
                    <SiYoutubemusic className="text-base text-[#FF0000]" />
                    Coding Playlist
                  </a>
                </div>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal delay="0.15s">
              <GlassCard>
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest bg-gradient-to-tl from-slate-900 via-blue-600 to-slate-500 bg-clip-text text-transparent dark:bg-none dark:text-white">
                  {t('home.contact_title')}
                </h2>
                <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-white/55">{t('home.contact_text')}</p>
                <a href="mailto:jrsimog@gmail.com"
                  className="inline-block rounded-full border border-slate-200 dark:border-white/20 bg-slate-100 dark:bg-white/10 px-4 py-1.5 text-xs text-slate-700 dark:text-white/80 transition hover:bg-slate-200 dark:hover:bg-white/20">
                  jrsimog@gmail.com
                </a>
              </GlassCard>
            </ScrollReveal>
          </div>

          {/* Columna derecha: Stack */}
          <ScrollReveal delay="0.1s" className="h-full">
            <GlassCard className="h-full">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest bg-gradient-to-tl from-slate-900 via-blue-600 to-slate-500 bg-clip-text text-transparent dark:bg-none dark:text-white">
                {t('home.stack_title')}
              </h2>
              <div className="flex flex-wrap gap-2">
                {stack.map(({ name, icon: Icon, level, color }) => {
                  const hasPosts = tagsWithPosts.has(name.toLowerCase())
                  return (
                    <Link key={name}
                      to={`/blog?tag=${name}`}
                      className={`relative flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-sm ${levelStyle[level]} ${hasPosts ? 'border-beam-active' : ''}`}
                      style={hasPosts ? { '--beam-color': color } : {}}
                    >
                      <Icon className="text-sm shrink-0" style={{ color }} />
                      <span>{name}</span>
                    </Link>
                  )
                })}
              </div>
            </GlassCard>
          </ScrollReveal>

        </div>

        {/* Footer */}
        <ScrollReveal>
          <footer className="mt-4 border-t border-slate-200 dark:border-white/5 pt-2 pb-0.5 text-center text-[10px] text-slate-500 dark:text-white/30">
            <p className="mb-0.5 font-medium tracking-wider uppercase text-[8px] text-slate-400 dark:text-white/35">
              {t('home.built_with')}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-0.5">
              <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-500 dark:text-white/45 hover:text-slate-800 dark:hover:text-white/80 transition-colors duration-200">
                <SiReact className="text-xs text-[#61DAFB]" /> React
              </a>
              <a href="https://vite.dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-500 dark:text-white/45 hover:text-slate-800 dark:hover:text-white/80 transition-colors duration-200">
                <SiVite className="text-xs text-[#646CFF]" /> Vite
              </a>
              <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-500 dark:text-white/45 hover:text-slate-800 dark:hover:text-white/80 transition-colors duration-200">
                <SiTailwindcss className="text-xs text-[#38BDF8]" /> Tailwind CSS
              </a>
              <a href="https://reactrouter.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-500 dark:text-white/45 hover:text-slate-800 dark:hover:text-white/80 transition-colors duration-200">
                <SiReactrouter className="text-xs text-[#F44250]" /> React Router
              </a>
              <a href="https://github.com/features/actions" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-500 dark:text-white/45 hover:text-slate-800 dark:hover:text-white/80 transition-colors duration-200">
                <SiGithubactions className="text-xs text-[#2088FF]" /> GitHub Actions
              </a>
            </div>
            <p className="mt-1.5 text-[8px] text-slate-300 dark:text-white/15">
              © {new Date().getFullYear()} José Simó.
            </p>
          </footer>
        </ScrollReveal>

      </div>
    </div>
  )
}
