import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SiElixir } from 'react-icons/si'
import { FiHome } from 'react-icons/fi'
import { posts } from '../../data/posts'
import { useLanguage } from '../../context/LanguageContext'
import LangToggle from '../../components/LangToggle'
import ThemeToggle from '../../components/ThemeToggle'
import T from '../../components/T'

const SLUG = '/blog/elixir-hello-world'
const related = posts.filter(p => p.slug !== SLUG)

const steps = {
  es: [
    {
      title: 'Un archivo vacío',
      showCode: false, highlight: null, showCommand: false, showOutput: false,
      explanation: 'En Elixir el código vive en archivos con extensión .ex. Vamos a crear nuestro primero y escribir una sola línea.',
    },
    {
      title: 'Una sola línea',
      showCode: true, highlight: null, showCommand: false, showOutput: false,
      explanation: 'Esta es la línea completa. Una sola instrucción para mostrar texto en pantalla. Vamos a entender qué significa cada parte.',
    },
    {
      title: 'IO — el módulo',
      showCode: true, highlight: 'IO', showCommand: false, showOutput: false,
      explanation: 'IO es un módulo. En Elixir, los módulos agrupan funciones con un propósito en común. IO maneja todo lo relacionado con entrada y salida de datos.',
    },
    {
      title: 'puts — la función',
      showCode: true, highlight: 'puts', showCommand: false, showOutput: false,
      explanation: 'puts es una función dentro del módulo IO. El punto (.) es cómo accedemos a las funciones de un módulo. Su trabajo: imprimir texto y agregar un salto de línea al final.',
    },
    {
      title: '"Hello, World!" — el string',
      showCode: true, highlight: 'string', showCommand: false, showOutput: false,
      explanation: 'El texto entre comillas dobles es un string. Es el argumento que le pasamos a puts — el texto que queremos mostrar en pantalla.',
    },
    {
      title: 'Ejecutamos el archivo',
      showCode: true, highlight: null, showCommand: true, showOutput: false,
      explanation: 'Para correr el archivo usamos el comando elixir en la terminal. Elixir lo leerá y ejecutará línea por línea.',
    },
    {
      title: '¡Y aparece en pantalla!',
      showCode: true, highlight: null, showCommand: true, showOutput: true,
      explanation: 'IO.puts tomó el string "Hello, World!" y lo imprimió en la terminal. Eso es todo lo que hace Elixir para mostrar texto en pantalla.',
    },
  ],
  en: [
    {
      title: 'An empty file',
      showCode: false, highlight: null, showCommand: false, showOutput: false,
      explanation: 'In Elixir, code lives in files with a .ex extension. Let\'s create our first one and write a single line.',
    },
    {
      title: 'A single line',
      showCode: true, highlight: null, showCommand: false, showOutput: false,
      explanation: 'This is the complete line. One single instruction to display text on screen. Let\'s understand what each part means.',
    },
    {
      title: 'IO — the module',
      showCode: true, highlight: 'IO', showCommand: false, showOutput: false,
      explanation: 'IO is a module. In Elixir, modules group functions with a common purpose. IO handles everything related to input and output of data.',
    },
    {
      title: 'puts — the function',
      showCode: true, highlight: 'puts', showCommand: false, showOutput: false,
      explanation: 'puts is a function inside the IO module. The dot (.) is how we access functions in a module. Its job: print text and add a newline at the end.',
    },
    {
      title: '"Hello, World!" — the string',
      showCode: true, highlight: 'string', showCommand: false, showOutput: false,
      explanation: 'Text between double quotes is a string. It\'s the argument we pass to puts — the text we want to display on screen.',
    },
    {
      title: 'We run the file',
      showCode: true, highlight: null, showCommand: true, showOutput: false,
      explanation: 'To run the file we use the elixir command in the terminal. Elixir will read it and execute it line by line.',
    },
    {
      title: 'And it appears on screen!',
      showCode: true, highlight: null, showCommand: true, showOutput: true,
      explanation: 'IO.puts took the string "Hello, World!" and printed it to the terminal. That\'s all Elixir does to display text on screen.',
    },
  ],
}

const CodeDisplay = ({ showCode, highlight }) => {
  if (!showCode) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-slate-400/40 dark:text-white/20 text-sm font-mono italic">empty file</span>
      </div>
    )
  }

  const token = (id, text, color) => (
    <span
      key={id}
      className={`transition-all duration-300 ${color} ${
        highlight === id ? 'bg-slate-900/5 dark:bg-white/15 rounded px-1 py-0.5 ring-1 ring-slate-900/10 dark:ring-white/25' : ''
      }`}
    >
      {text}
    </span>
  )

  return (
    <div className="flex items-center justify-center h-full">
      <code className="font-mono text-base sm:text-lg">
        {token('IO', 'IO', 'text-violet-500 dark:text-violet-400')}
        <span className="text-slate-400 dark:text-white/30">.</span>
        {token('puts', 'puts', 'text-amber-600 dark:text-amber-300')}
        <span className="text-slate-400 dark:text-white/30">(</span>
        {token('string', '"Hello, World!"', 'text-emerald-600 dark:text-emerald-400')}
        <span className="text-slate-400 dark:text-white/30">)</span>
      </code>
    </div>
  )
}

const ElixirHelloWorld = () => {
  const [step, setStep] = useState(0)
  const { lang, t } = useLanguage()

  const currentSteps = steps[lang]
  const current = currentSteps[step]
  const isLast = step === currentSteps.length - 1

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-50 dark:bg-black transition-colors duration-300">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'var(--bg-radial)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-12">

        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/blog"
            className="rounded-full border border-slate-200 dark:border-white/15 bg-white/60 dark:bg-white/5 px-4 py-1.5 text-sm text-muted hover:text-sub backdrop-blur-sm transition"
          >
            {t('nav.back_blog')}
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="rounded-full border border-slate-200 dark:border-white/15 bg-white/60 dark:bg-white/5 p-1.5 text-muted hover:text-sub backdrop-blur-sm transition"
              aria-label="Home"
            >
              <FiHome size={16} />
            </Link>
            <ThemeToggle />
            <LangToggle />
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted mb-3">
          <SiElixir className="text-violet-500 dark:text-violet-400" />
          Elixir · Playground
        </div>

        <h1
          className="text-2xl font-bold bg-clip-text text-transparent mb-1"
          style={{ backgroundImage: 'var(--dt-gradient-blue)' }}
        >
          <T>{lang === 'es' ? 'Hola Mundo en Elixir' : 'Hello World in Elixir'}</T>
        </h1>
        <p className="text-muted text-sm mb-8">
          <T>{lang === 'es' ? 'Cómo Elixir muestra texto en pantalla, paso a paso.' : 'How Elixir prints text to the screen, step by step.'}</T>
        </p>

        <div className="flex gap-1.5 mb-6 justify-center">
          {currentSteps.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step ? 'w-6 bg-blue-500 dark:bg-blue-400' : 'w-1.5 bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-slate-200 dark:border-white/10">
              <span className="h-2 w-2 rounded-full bg-red-500/50" />
              <span className="h-2 w-2 rounded-full bg-yellow-500/50" />
              <span className="h-2 w-2 rounded-full bg-green-500/50" />
              <span className="ml-2 text-xs text-slate-400 dark:text-white/25 font-mono">hello.ex</span>
            </div>
            <div className="h-28 p-4">
              <CodeDisplay showCode={current.showCode} highlight={current.highlight} />
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-900 dark:bg-black/70 backdrop-blur-md overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-slate-200 dark:border-white/10">
              <span className="h-2 w-2 rounded-full bg-red-500/50" />
              <span className="h-2 w-2 rounded-full bg-yellow-500/50" />
              <span className="h-2 w-2 rounded-full bg-green-500/50" />
              <span className="ml-2 text-xs text-slate-400 dark:text-white/25 font-mono">terminal</span>
            </div>
            <div className="h-28 p-4 font-mono text-sm">
              {current.showCommand
                ? <p className="text-white/50">$ elixir hello.ex</p>
                : <T className="text-slate-400/50 dark:text-white/15 text-xs">{lang === 'es' ? 'esperando...' : 'waiting...'}</T>
              }
              {current.showOutput && (
                <p className="text-emerald-400 mt-1">Hello, World!</p>
              )}
            </div>
          </div>
        </div>

        <div
          key={`${step}-${lang}`}
          className="rounded-xl border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md p-6 mb-6 slide-in-blurred-top"
          style={{ animationDuration: '0.25s' }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest bg-clip-text text-transparent mb-2"
            style={{ backgroundImage: 'var(--dt-gradient-blue)' }}
          >
            {step + 1} / {currentSteps.length} — <T>{current.title}</T>
          </p>
          <p className="text-body text-sm leading-relaxed"><T>{current.explanation}</T></p>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            className="rounded-full border border-slate-200 dark:border-white/15 bg-slate-100 dark:bg-white/5 px-5 py-2 text-sm text-slate-600 dark:text-white/60 transition hover:bg-slate-200 dark:hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed"
          >
            ← <T>{lang === 'es' ? 'Anterior' : 'Previous'}</T>
          </button>
          <button
            onClick={() => setStep(s => Math.min(currentSteps.length - 1, s + 1))}
            disabled={isLast}
            className="rounded-full border border-blue-500/30 bg-blue-500/10 dark:bg-blue-500/15 px-5 py-2 text-sm text-accent transition hover:bg-blue-500/20 dark:hover:bg-blue-500/25 disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <T>{lang === 'es' ? 'Siguiente' : 'Next'}</T> →
          </button>
        </div>

        {isLast && (
          <div className="mt-8 slide-in-blurred-top" style={{ animationDuration: '0.3s' }}>
            <div className="border-t border-slate-200 dark:border-white/10 pt-8">
              {related.length > 0 && (
                <>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">
                    {t('blog.related')}
                  </p>
                  <div className="flex flex-col gap-3 mb-6">
                    {related.map(({ slug, Icon, tag, title, title_en }) => (
                      <Link
                        key={slug}
                        to={slug}
                        className="group rounded-xl border border-slate-200/60 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md p-4 transition hover:bg-white/80 dark:hover:bg-white/10 hover:border-slate-300/80 dark:hover:border-white/20"
                      >
                        <div className="flex items-center gap-2 text-xs text-muted mb-1">
                          <Icon className="text-violet-400" />
                          <span>{tag}</span>
                        </div>
                        <p className="text-sub text-sm font-medium group-hover:text-accent dark:group-hover:text-heading transition">
                          {lang === 'en' && title_en ? title_en : title}
                        </p>
                      </Link>
                    ))}
                  </div>
                </>
              )}
              <div className="flex gap-3">
                <Link
                  to="/blog"
                  className="rounded-full border border-slate-200 dark:border-white/15 bg-slate-100 dark:bg-white/5 px-5 py-2 text-sm text-slate-600 dark:text-white/60 transition hover:bg-slate-200 dark:hover:bg-white/10"
                >
                  {t('blog.see_blog')}
                </Link>
                <Link
                  to="/"
                  className="rounded-full border border-blue-500/30 bg-blue-500/10 dark:bg-blue-500/15 px-5 py-2 text-sm text-accent transition hover:bg-blue-500/20 dark:hover:bg-blue-500/25"
                >
                  {t('blog.back_home')}
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default ElixirHelloWorld
