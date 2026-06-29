import { useState } from 'react'
import { Link } from 'react-router-dom'
import { experience } from '../data/experience'
import { posts } from '../data/posts'
import { projects } from '../data/projects'
import { education, certifications } from '../data/education'
import { techIcons } from '../data/techIcons'
import ProjectCard from '../components/ProjectCard'
import {
  SiGithub, SiInstagram, SiDiscord,
  SiVite, SiTailwindcss, SiReactrouter, SiGithubactions, SiYoutubemusic, SiX, SiReact,
} from 'react-icons/si'
import { FaLinkedin, FaFilePdf } from 'react-icons/fa'
import { MdRollerSkating } from 'react-icons/md'
import { useLanguage } from '../context/LanguageContext'
import LangToggle from '../components/LangToggle'
import ThemeToggle from '../components/ThemeToggle'
import ScrollReveal from '../components/ScrollReveal'
import StickyNav from '../components/StickyNav'
import T from '../components/T'

const stack = Array.from(
  new Set([
    ...experience.flatMap(e => e.stack || []),
    ...projects.flatMap(p => p.stack || []),
    ...certifications.flatMap(c => c.stack || []),
    ...posts.map(p => p.tag),
  ])
)
  .map(name => ({ name, ...techIcons[name] }))
  .filter(t => t.icon && t.level)
  .sort((a, b) => b.level - a.level)

const levelStyle = {
  4: 'bg-slate-900/10 border-slate-900/20 text-slate-800 hover:bg-slate-900/20 hover:border-slate-900/30 dark:bg-white/18 dark:border-white/30 dark:text-white/95 dark:hover:bg-white/30 dark:hover:border-white/50 dark:hover:text-white',
  3: 'bg-slate-900/5 border-slate-900/10 text-slate-600 hover:bg-slate-900/10 hover:border-slate-900/15 dark:bg-white/10 dark:border-white/18 dark:text-white/60 dark:hover:bg-white/22 dark:hover:border-white/35 dark:hover:text-white/90',
  2: 'bg-slate-900/3 border-slate-900/6 text-slate-500 hover:bg-slate-900/6 hover:border-slate-900/10 dark:bg-white/5  dark:border-white/10 dark:text-white/38 dark:hover:bg-white/15 dark:hover:border-white/25 dark:hover:text-white/75',
  1: 'bg-slate-900/1 border-slate-900/4 text-slate-400 hover:bg-slate-900/3 hover:border-slate-900/6 dark:bg-white/3  dark:border-white/6  dark:text-white/22 dark:hover:bg-white/10 dark:hover:border-white/18 dark:hover:text-white/55',
}

const GlassCard = ({ children, className = '', ...props }) => (
  <div className={`rounded-2xl border border-slate-200/80 bg-white/70 dark:border-white/15 dark:bg-white/8 p-6 shadow-xl dark:shadow-black/20 backdrop-blur-md transition-all duration-300 ${className}`} {...props}>
    {children}
  </div>
)

const TechChip = ({ name, onClick, isActive = false }) => {
  const ti = techIcons[name]
  if (!ti) return null
  const Icon = ti.icon
  return (
    <button
      onClick={() => onClick?.(name)}
      className={`flex items-center gap-1 text-xs rounded-full border border-slate-200 dark:border-white/10 bg-slate-100/60 dark:bg-white/5 px-2 py-0.5 text-slate-500 dark:text-white/40 transition hover:bg-slate-200 dark:hover:bg-white/10 hover:scale-105 ${isActive ? 'ring-2 ring-blue-400 ring-offset-1 ring-offset-white dark:ring-offset-black scale-105' : ''}`}
    >
      {Icon && <Icon className="text-sm shrink-0" style={{ color: ti.color }} />}
      {name}
    </button>
  )
}

const tagsWithPosts = new Set(posts.map(post => post.tag.toLowerCase()))
const tagsWithProjects = new Set(projects.flatMap(p => p.stack.map(s => s.toLowerCase())))
const tagsWithExperience = new Set(experience.flatMap(e => (e.stack || []).map(s => s.toLowerCase())))
const tagsWithCertifications = new Set(certifications.flatMap(c => (c.stack || []).map(s => s.toLowerCase())))

const PREVIEW = 2

const Home = () => {
  const { t, lang } = useLanguage()
  const [expanded, setExpanded] = useState(false)
  const [navActive, setNavActive] = useState(null)
  const [filterSkill, setFilterSkill] = useState(null)

  const toggleFilter = (name) => setFilterSkill(prev => prev === name ? null : name)

  const filteredExperience = filterSkill
    ? experience.filter(e => e.stack?.some(s => s.toLowerCase() === filterSkill.toLowerCase()))
    : expanded ? experience : experience.slice(0, PREVIEW)

  const filteredProjects = filterSkill
    ? projects.filter(p => p.stack.some(s => s.toLowerCase() === filterSkill.toLowerCase()))
    : projects

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-50 dark:bg-black transition-colors duration-300">
      <StickyNav onActiveChange={setNavActive} />
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'var(--bg-radial)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-12 pb-24 sm:pb-4">

        <div className="flex justify-end items-center gap-3 mb-6">
          <a href="/CV — José Ramón Simó Guerra.pdf" download
            className="flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/15 bg-slate-100 dark:bg-white/5 px-4 py-2 text-sm text-slate-600 dark:text-white/60 transition hover:bg-slate-200 dark:hover:bg-white/10">
            <FaFilePdf className="text-base text-red-500" /> <T id="home.download_cv" />
          </a>
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
            <h1
              className="mb-1 text-3xl sm:text-4xl font-bold tracking-tight bg-clip-text text-transparent"
              style={{ backgroundImage: 'var(--dt-gradient-blue)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              José Simó
            </h1>
            <p className="mb-1 text-lg text-blue-600 dark:text-blue-300"><T id="home.role" /></p>
            <p className="mb-5 text-sm text-slate-500 dark:text-white/40"><T id="home.subtitle" /></p>
            <p className="mx-auto mb-7 max-w-lg text-sm leading-relaxed text-slate-600 dark:text-white/55">
              <T id="home.bio" />
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
                className="rounded-full border border-slate-200 dark:border-white/20 bg-slate-100 dark:bg-white/10 px-5 py-2 text-sm text-slate-700 dark:text-white/80 transition hover:bg-slate-200 dark:hover:bg-white/20">
                <T id="home.contact" />
              </a>
              <a href="https://discord.com/users/jrsimog" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/20 bg-slate-100 dark:bg-white/10 px-5 py-2 text-sm text-slate-700 dark:text-white/80 transition hover:bg-slate-200 dark:hover:bg-white/20">
                <SiDiscord className="text-base text-[#5865F2]" /> Discord
              </a>
              <a href="https://www.instagram.com/khdtto" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/20 bg-slate-100 dark:bg-white/10 px-5 py-2 text-sm text-slate-700 dark:text-white/80 transition hover:bg-slate-200 dark:hover:bg-white/20">
                <SiInstagram className="text-base text-[#E1306C]" /> Instagram
              </a>
              <a href="https://x.com/jrsimog" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/20 bg-slate-100 dark:bg-white/10 px-5 py-2 text-sm text-slate-700 dark:text-white/80 transition hover:bg-slate-200 dark:hover:bg-white/20">
                <SiX className="text-base" /> X
              </a>
              <Link to="/blog"
                className="contact-active rounded-full border border-blue-500/50 px-5 py-2 text-sm text-white transition">
                <T id="home.blog" />
              </Link>
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* Banner filtro activo */}
        {filterSkill && (
          <div className="flex items-center gap-3 mb-6 px-4 py-2.5 rounded-xl bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/20 dark:border-blue-500/30 text-sm text-blue-700 dark:text-blue-300">
            <span className="flex-1">
              {lang === 'en' ? 'Filtering by' : 'Filtrando por'}: <strong>{filterSkill}</strong>
            </span>
            <Link to={`/blog?tag=${filterSkill}`} className="text-xs underline hover:text-blue-900 dark:hover:text-blue-100 transition-colors shrink-0">
              {lang === 'en' ? 'See posts →' : 'Ver posts →'}
            </Link>
            <button onClick={() => setFilterSkill(null)} className="text-xs text-blue-500 hover:text-blue-700 dark:hover:text-blue-200 transition shrink-0">
              ✕
            </button>
          </div>
        )}

        {/* Experiencia */}
        <div id="experiencia" className="mb-8">
          <ScrollReveal delay="0.3s">
            <h2 className="text-sm font-semibold uppercase tracking-widest bg-clip-text text-transparent mb-5" style={{ backgroundImage: 'var(--dt-gradient-blue)' }}>
              <T id="home.experience_title" />
            </h2>
          </ScrollReveal>

          <div className="relative">
            <div className="absolute left-0 top-2 bottom-2 w-px bg-slate-200 dark:bg-white/10" />
            <div className="flex flex-col gap-4 pl-6">
              {filteredExperience.map(({ company, role_es, role_en, period_es, period_en, desc_es, desc_en, stack: expStack, current }, i) => (
                <ScrollReveal key={i} className="relative" delay={i < PREVIEW ? `${0.45 + i * 0.08}s` : `${(i - PREVIEW) * 0.06}s`} variant="left">
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
                    <p className="text-slate-600 dark:text-white/45 text-xs leading-relaxed mb-2">
                      {lang === 'en' ? desc_en : desc_es}
                    </p>
                    {expStack?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {expStack.map(tech => (
                          <TechChip key={tech} name={tech} onClick={toggleFilter} isActive={filterSkill === tech} />
                        ))}
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {!filterSkill && experience.length > PREVIEW && (
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
        <div id="proyectos" className="mb-8">
          <ScrollReveal delay="0.05s">
            <h2 className="text-sm font-semibold uppercase tracking-widest bg-clip-text text-transparent mb-5" style={{ backgroundImage: 'var(--dt-gradient-blue)' }}>
              <T id="projects.title" />
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {filteredProjects.length > 0 ? filteredProjects.map((project, i) => (
              <ScrollReveal key={project.id} delay={`${0.1 + i * 0.08}s`} variant="left">
                <ProjectCard project={project} />
              </ScrollReveal>
            )) : (
              <p className="text-sm text-slate-400 dark:text-white/30 col-span-2">
                <T>{lang === 'en' ? 'No projects with this technology yet.' : 'Sin proyectos con esta tecnología aún.'}</T>
              </p>
            )}
          </div>
        </div>

        {/* Cards */}
        <div id="contacto" className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Columna izquierda: Sobre mí + Contacto */}
          <div className="flex flex-col gap-5">
            <ScrollReveal delay="0.05s">
              <GlassCard>
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest bg-clip-text text-transparent" style={{ backgroundImage: 'var(--dt-gradient-blue)' }}>
                  <T id="home.about_title" />
                </h2>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-white/55"><T id="home.about_text" /></p>
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
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest bg-clip-text text-transparent" style={{ backgroundImage: 'var(--dt-gradient-blue)' }}>
                  <T id="home.contact_title" />
                </h2>
                <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-white/55"><T id="home.contact_text" /></p>
                <a href="mailto:jrsimog@gmail.com"
                  className={`inline-block rounded-full border px-4 py-1.5 text-xs transition-all duration-500 ${
                    navActive === 'contacto'
                      ? 'contact-active border-blue-500/50 text-white'
                      : 'border-slate-200 dark:border-white/20 bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white/80'
                  }`}>
                  jrsimog@gmail.com
                </a>
              </GlassCard>
            </ScrollReveal>
          </div>

          {/* Columna derecha: Stack */}
          <ScrollReveal delay="0.1s" className="h-full">
            <GlassCard className="h-full">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest bg-clip-text text-transparent" style={{ backgroundImage: 'var(--dt-gradient-blue)' }}>
                <T id="home.stack_title" />
              </h2>
              <div className="flex flex-wrap gap-2">
                {stack.map(({ name, icon: Icon, level, color }) => {
                  const hasPosts = tagsWithPosts.has(name.toLowerCase())
                  const hasProjects = tagsWithProjects.has(name.toLowerCase())
                  const hasExperience = tagsWithExperience.has(name.toLowerCase())
                  const hasCerts = tagsWithCertifications.has(name.toLowerCase())
                  const isActive = filterSkill === name
                  const beamColor = hasPosts ? color : (hasProjects || hasExperience || hasCerts) ? '#3b82f6' : null
                  return (
                    <button
                      key={name}
                      onClick={() => toggleFilter(name)}
                      className={`relative flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-sm ${levelStyle[level]} ${beamColor ? 'border-beam-active' : ''} ${isActive ? 'ring-2 ring-blue-400 ring-offset-1 ring-offset-white dark:ring-offset-black scale-105' : ''}`}
                      style={beamColor ? { '--beam-color': beamColor } : {}}
                    >
                      <Icon className="text-sm shrink-0" style={{ color }} />
                      <span>{name}</span>
                    </button>
                  )
                })}
              </div>
            </GlassCard>
          </ScrollReveal>

        </div>

        {/* Educación y Certificaciones */}
        <div id="educacion" className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
          <ScrollReveal delay="0.05s">
            <GlassCard>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest bg-clip-text text-transparent" style={{ backgroundImage: 'var(--dt-gradient-blue)' }}>
                {lang === 'en' ? 'Education' : 'Educación'}
              </h2>
              {education.map((edu, i) => (
                <div key={i}>
                  <p className="text-slate-800 dark:text-white/90 font-semibold text-sm">{edu.institution}</p>
                  <p className="text-slate-600 dark:text-white/55 text-xs mt-0.5">{lang === 'en' ? edu.degree_en : edu.degree_es}</p>
                  <p className="text-slate-400 dark:text-white/30 text-xs">{lang === 'en' ? edu.field_en : edu.field_es} · {edu.period}</p>
                </div>
              ))}
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay="0.1s">
            <GlassCard>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest bg-clip-text text-transparent" style={{ backgroundImage: 'var(--dt-gradient-blue)' }}>
                {lang === 'en' ? 'Courses & Certifications' : 'Cursos y Certificaciones'}
              </h2>
              <div className="flex flex-col gap-3">
                {certifications.map((cert, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                    <div>
                      {cert.url ? (
                        <a href={cert.url} target="_blank" rel="noopener noreferrer"
                          className="text-slate-700 dark:text-white/75 text-xs font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          {lang === 'en' ? cert.name_en : cert.name_es} ↗
                        </a>
                      ) : (
                        <p className="text-slate-700 dark:text-white/75 text-xs font-medium">{lang === 'en' ? cert.name_en : cert.name_es}</p>
                      )}
                      <p className="text-slate-400 dark:text-white/30 text-xs">{cert.issuer}</p>
                      {cert.stack?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {cert.stack.map(tech => (
                            <TechChip key={tech} name={tech} onClick={toggleFilter} isActive={filterSkill === tech} />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>

        {/* Footer */}
        <ScrollReveal>
          <footer className="mt-4 border-t border-slate-200 dark:border-white/5 pt-2 pb-0.5 text-center text-[10px] text-slate-500 dark:text-white/30">
            <p className="mb-0.5 font-medium tracking-wider uppercase text-[8px] text-slate-400 dark:text-white/35">
              <T id="home.built_with" />
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

export default Home
