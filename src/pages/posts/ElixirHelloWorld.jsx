import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SiElixir } from "react-icons/si";
import { FiHome } from "react-icons/fi";
import { posts } from "../../data/posts";
import { useLanguage } from "../../context/LanguageContext";
import LangToggle from "../../components/LangToggle";
import ThemeToggle from "../../components/ThemeToggle";
import T from "../../components/T";
import StickyNav from "../../components/StickyNav";
import ShareButtons from "../../components/ShareButtons";
import PostNav from "../../components/PostNav";

const SLUG = "/blog/elixir-hello-world";
const related = posts.filter((p) => p.slug !== SLUG);

const steps = {
  es: [
    {
      mode: "iex",
      iexState: "prompt",
      title: "¿Qué es la IEx?",
      explanation:
        "IEx (Interactive Elixir) es la consola interactiva que viene con Elixir. La abres con iex y puedes escribir cualquier expresión al instante: llamar una función y ver qué retorna, crear una variable y usarla en la siguiente línea, probar un módulo, hacer un cálculo. Sin archivos, sin compilación — escribes y ves el resultado de una.",
    },
    {
      mode: "iex",
      iexState: "command",
      title: "Escribimos en el prompt",
      explanation:
        'Escribir IO.puts("Hello, World!") en la IEx es exactamente lo mismo que hacerlo en un archivo. El módulo IO, la función puts, el string entre comillas — todo igual. La diferencia es que aquí el resultado aparece de una, en la misma pantalla.',
    },
    {
      mode: "iex",
      iexState: "output",
      title: "La IEx responde con dos líneas",
      explanation:
        '"Hello, World!" es el texto que IO.puts imprimió. Pero la IEx también muestra :ok en azul — ese es el valor de retorno de la función. En Elixir toda expresión devuelve un valor. :ok es un átomo: un identificador inmutable que aquí significa que la operación fue exitosa.',
    },
    {
      mode: "transition",
      title: "Ahora, en un archivo",
      explanation:
        "La IEx es perfecta para experimentar, pero el código que quieres conservar y reutilizar vive en archivos .ex. Vamos a hacer exactamente el mismo Hola Mundo — esta vez escrito en un archivo y ejecutado desde la terminal.",
    },
    {
      mode: "file",
      title: "Un archivo vacío",
      showCode: false,
      highlight: null,
      showCommand: false,
      showOutput: false,
      explanation:
        "En Elixir el código vive en archivos con extensión .ex. Vamos a crear nuestro primero y escribir una sola línea.",
    },
    {
      mode: "file",
      title: "Una sola línea",
      showCode: true,
      highlight: null,
      showCommand: false,
      showOutput: false,
      explanation:
        "Esta es la línea completa. Una sola instrucción para mostrar texto en pantalla. Vamos a entender qué significa cada parte.",
    },
    {
      mode: "file",
      title: "IO — el módulo",
      showCode: true,
      highlight: "IO",
      showCommand: false,
      showOutput: false,
      explanation:
        "IO es un módulo. En Elixir, los módulos agrupan funciones con un propósito en común. IO maneja todo lo relacionado con entrada y salida de datos.",
    },
    {
      mode: "file",
      title: "puts — la función",
      showCode: true,
      highlight: "puts",
      showCommand: false,
      showOutput: false,
      explanation:
        "puts es una función dentro del módulo IO. El punto (.) es cómo accedemos a las funciones de un módulo. Su trabajo: imprimir texto y agregar un salto de línea al final.",
    },
    {
      mode: "file",
      title: '"Hello, World!" — el string',
      showCode: true,
      highlight: "string",
      showCommand: false,
      showOutput: false,
      explanation:
        "El texto entre comillas dobles es un string. Es el argumento que le pasamos a puts — el texto que queremos mostrar en pantalla.",
    },
    {
      mode: "file",
      title: "Ejecutamos el archivo",
      showCode: true,
      highlight: null,
      showCommand: true,
      showOutput: false,
      explanation:
        "Para correr el archivo usamos el comando elixir en la terminal. Elixir lo leerá y ejecutará línea por línea.",
    },
    {
      mode: "file",
      title: "¡Y aparece en pantalla!",
      showCode: true,
      highlight: null,
      showCommand: true,
      showOutput: true,
      explanation:
        'IO.puts tomó el string "Hello, World!" y lo imprimió en la terminal. Eso es todo lo que hace Elixir para mostrar texto en pantalla.',
    },
  ],
  en: [
    {
      mode: "iex",
      iexState: "prompt",
      title: "What is IEx?",
      explanation:
        "IEx (Interactive Elixir) is the interactive console that ships with Elixir. Open it with iex and you can type any expression instantly: call a function and see what it returns, create a variable and use it on the next line, try a module, run a quick calculation. No files, no compilation — just type and see the result.",
    },
    {
      mode: "iex",
      iexState: "command",
      title: "We type at the prompt",
      explanation:
        'Typing IO.puts("Hello, World!") in IEx is exactly the same as writing it in a file. The IO module, the puts function, the string in quotes — all identical. The difference is that here the result appears instantly, right on the same screen.',
    },
    {
      mode: "iex",
      iexState: "output",
      title: "IEx responds with two lines",
      explanation:
        '"Hello, World!" is the text IO.puts printed to the screen. But IEx also shows :ok in blue — that\'s the return value of the function. In Elixir every expression returns a value. :ok is an atom: an immutable identifier that here means the operation was successful.',
    },
    {
      mode: "transition",
      title: "Now, in a file",
      explanation:
        "IEx is perfect for exploration, but code you want to keep and reuse lives in .ex files. Let's do the exact same Hello World — this time written in a file and executed from the terminal.",
    },
    {
      mode: "file",
      title: "An empty file",
      showCode: false,
      highlight: null,
      showCommand: false,
      showOutput: false,
      explanation:
        "In Elixir, code lives in files with a .ex extension. Let's create our first one and write a single line.",
    },
    {
      mode: "file",
      title: "A single line",
      showCode: true,
      highlight: null,
      showCommand: false,
      showOutput: false,
      explanation:
        "This is the complete line. One single instruction to display text on screen. Let's understand what each part means.",
    },
    {
      mode: "file",
      title: "IO — the module",
      showCode: true,
      highlight: "IO",
      showCommand: false,
      showOutput: false,
      explanation:
        "IO is a module. In Elixir, modules group functions with a common purpose. IO handles everything related to input and output of data.",
    },
    {
      mode: "file",
      title: "puts — the function",
      showCode: true,
      highlight: "puts",
      showCommand: false,
      showOutput: false,
      explanation:
        "puts is a function inside the IO module. The dot (.) is how we access functions in a module. Its job: print text and add a newline at the end.",
    },
    {
      mode: "file",
      title: '"Hello, World!" — the string',
      showCode: true,
      highlight: "string",
      showCommand: false,
      showOutput: false,
      explanation:
        "Text between double quotes is a string. It's the argument we pass to puts — the text we want to display on screen.",
    },
    {
      mode: "file",
      title: "We run the file",
      showCode: true,
      highlight: null,
      showCommand: true,
      showOutput: false,
      explanation:
        "To run the file we use the elixir command in the terminal. Elixir will read it and execute it line by line.",
    },
    {
      mode: "file",
      title: "And it appears on screen!",
      showCode: true,
      highlight: null,
      showCommand: true,
      showOutput: true,
      explanation:
        'IO.puts took the string "Hello, World!" and printed it to the terminal. That\'s all Elixir does to display text on screen.',
    },
  ],
};

const CodeDisplay = ({ showCode, highlight }) => {
  if (!showCode) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-slate-400/40 dark:text-white/20 text-sm font-mono italic">
          empty file
        </span>
      </div>
    );
  }

  const token = (id, text, color) => (
    <span
      key={id}
      className={`transition-all duration-300 ${color} ${
        highlight === id
          ? "bg-slate-900/5 dark:bg-white/15 rounded px-1 py-0.5 ring-1 ring-slate-900/10 dark:ring-white/25"
          : ""
      }`}
    >
      {text}
    </span>
  );

  return (
    <div className="flex items-center justify-center h-full">
      <code className="font-mono text-base sm:text-lg">
        {token("IO", "IO", "text-violet-500 dark:text-violet-400")}
        <span className="text-slate-400 dark:text-white/30">.</span>
        {token("puts", "puts", "text-amber-600 dark:text-amber-300")}
        <span className="text-slate-400 dark:text-white/30">(</span>
        {token(
          "string",
          '"Hello, World!"',
          "text-emerald-600 dark:text-emerald-400",
        )}
        <span className="text-slate-400 dark:text-white/30">)</span>
      </code>
    </div>
  );
};

const IexPanel = ({ iexState }) => (
  <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-900 dark:bg-black/70 backdrop-blur-md overflow-hidden">
    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-white/5">
      <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded border border-white/20 bg-white/10 text-xs font-mono text-white/50 leading-none">
        &gt;_
      </span>
      <span className="text-xs text-white/40 font-mono">iex</span>
    </div>
    <div className="h-36 p-4 font-mono text-sm">
      <p className="text-white/30 text-xs mb-2">$ iex</p>
      <p className="text-white/20 text-xs mb-3">
        Interactive Elixir · Ctrl+C twice to exit
      </p>
      {iexState === "prompt" && (
        <div className="flex items-center gap-2">
          <span className="text-violet-400">iex(1)&gt;</span>
          <span className="inline-block w-1.5 h-4 bg-white/40 animate-pulse" />
        </div>
      )}
      {(iexState === "command" || iexState === "output") && (
        <>
          <div className="flex items-baseline gap-2 mb-1 flex-wrap">
            <span className="text-violet-400 shrink-0">iex(1)&gt;</span>
            <span>
              <span className="text-violet-400">IO</span>
              <span className="text-white/30">.</span>
              <span className="text-amber-300">puts</span>
              <span className="text-white/30">(</span>
              <span className="text-emerald-400">
                &quot;Hello, World!&quot;
              </span>
              <span className="text-white/30">)</span>
            </span>
          </div>
          {iexState === "output" && (
            <>
              <p className="text-emerald-400">Hello, World!</p>
              <p className="text-blue-300">:ok</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-violet-400">iex(2)&gt;</span>
                <span className="inline-block w-1.5 h-4 bg-white/40 animate-pulse" />
              </div>
            </>
          )}
          {iexState === "command" && (
            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-4 bg-white/40 animate-pulse" />
            </div>
          )}
        </>
      )}
    </div>
  </div>
);

const TransitionPanel = ({ lang }) => (
  <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md overflow-hidden">
    <div className="h-36 flex items-center justify-center gap-8">
      <div className="text-center">
        <p className="font-mono text-sm text-violet-400 mb-1">iex&gt;</p>
        <p className="text-xs text-muted">
          {lang === "es" ? "exploración" : "exploration"}
        </p>
      </div>
      <div className="text-slate-300 dark:text-white/20 text-2xl">→</div>
      <div className="text-center">
        <p className="font-mono text-sm text-amber-500 dark:text-amber-400 mb-1">
          hello.ex
        </p>
        <p className="text-xs text-muted">
          {lang === "es" ? "persistencia" : "persistence"}
        </p>
      </div>
    </div>
  </div>
);

const ElixirHelloWorld = () => {
  const [step, setStep] = useState(0);
  const { lang, t } = useLanguage();
  const currentSteps = steps[lang];
  const current = currentSteps[step];
  const isLast = step === currentSteps.length - 1;

  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (e.key === "h" || e.key === "ArrowLeft")
        setStep((s) => Math.max(0, s - 1));
      if (e.key === "l" || e.key === "ArrowRight")
        setStep((s) => Math.min(currentSteps.length - 1, s + 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentSteps.length]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-50 dark:bg-black transition-colors duration-300">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "var(--bg-radial)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-12 max-sm:pb-24">
        {/* Desktop header — inline, always visible */}
        <div className="hidden sm:flex items-center justify-between mb-8">
          <Link
            to="/blog"
            className="rounded-full border border-slate-200 dark:border-white/15 bg-white/60 dark:bg-white/5 px-4 py-1.5 text-sm text-muted hover:text-sub backdrop-blur-sm transition"
          >
            {t("nav.back_blog")}
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center justify-center w-11 h-11 rounded-full border border-slate-200 dark:border-white/15 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/60 transition hover:bg-slate-200 dark:hover:bg-white/10"
              aria-label="Home"
            >
              <FiHome className="text-base" />
            </Link>
            <ThemeToggle />
            <LangToggle />
          </div>
        </div>

        {/* Mobile nav — StickyNav pill at bottom */}
        <StickyNav
          left={
            <Link
              to="/blog"
              className="px-3 py-1 text-sm text-muted hover:text-sub transition"
            >
              {t("nav.back_blog")}
            </Link>
          }
          right={
            <div className="flex items-center gap-1">
              <Link
                to="/"
                className="flex items-center justify-center w-8 h-8 rounded-full text-muted hover:text-sub transition"
                aria-label="Home"
              >
                <FiHome className="text-base" />
              </Link>
              <ThemeToggle compact />
              <LangToggle compact />
            </div>
          }
        />

        <div className="flex items-center gap-2 text-xs text-muted mb-3">
          <SiElixir className="text-violet-500 dark:text-violet-400" />
          Elixir · Playground
        </div>

        <h1
          className="text-2xl font-bold bg-clip-text text-transparent mb-2"
          style={{ backgroundImage: "var(--dt-gradient-blue)" }}
        >
          <T>
            {lang === "es" ? "Hola Mundo en Elixir" : "Hello World in Elixir"}
          </T>
        </h1>
        <p className="text-muted text-sm mb-6 leading-relaxed">
          {lang === "es"
            ? "Elixir ofrece dos formas de ejecutar código: la IEx, una consola interactiva para explorar al instante, y los archivos .ex, donde el código persiste y puede reutilizarse. Vamos a hacer el mismo Hola Mundo de las dos formas."
            : "Elixir gives you two ways to run code: IEx, an interactive console for instant exploration, and .ex files, where code persists and can be reused. We'll run the same Hello World both ways."}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="rounded-xl border border-violet-500/30 dark:border-violet-500/40 bg-violet-500/5 dark:bg-violet-500/15 backdrop-blur-sm overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-violet-500/15 dark:border-violet-500/30">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-violet-500 dark:text-violet-400">
                IEx
              </span>
              <span className="text-[10px] text-violet-400/60">
                {lang === "es"
                  ? "· exploración interactiva"
                  : "· interactive exploration"}
              </span>
            </div>
            <div className="p-3 font-mono text-xs space-y-0.5">
              <p className="text-slate-400 dark:text-violet-400/50 text-[10px] mb-1.5">
                $ iex
              </p>
              <div>
                <span className="text-violet-500 dark:text-violet-400">
                  iex(1)&gt;
                </span>{" "}
                <span className="text-violet-500 dark:text-violet-400">IO</span>
                <span className="text-slate-400 dark:text-white/30">.</span>
                <span className="text-amber-600 dark:text-amber-300">puts</span>
                <span className="text-slate-400 dark:text-white/25">(</span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  &quot;Hello, World!&quot;
                </span>
                <span className="text-slate-400 dark:text-white/25">)</span>
              </div>
              <p className="text-emerald-600 dark:text-emerald-400">
                Hello, World!
              </p>
              <p className="text-blue-500 dark:text-blue-300">:ok</p>
            </div>
          </div>

          <div className="rounded-xl border border-amber-500/30 dark:border-amber-500/40 bg-amber-500/5 dark:bg-amber-500/12 backdrop-blur-sm overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-amber-500/15 dark:border-amber-500/30">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-500">
                hello.ex
              </span>
              <span className="text-[10px] text-amber-500/60">
                {lang === "es" ? "· código persistente" : "· persistent code"}
              </span>
            </div>
            <div className="p-3 font-mono text-xs space-y-0.5">
              <div className="mb-1.5">
                <span className="text-violet-500 dark:text-violet-400">IO</span>
                <span className="text-slate-400 dark:text-white/30">.</span>
                <span className="text-amber-600 dark:text-amber-300">puts</span>
                <span className="text-slate-400 dark:text-white/25">(</span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  &quot;Hello, World!&quot;
                </span>
                <span className="text-slate-400 dark:text-white/25">)</span>
              </div>
              <p className="text-slate-400 dark:text-white/30 text-[10px]">
                $ elixir hello.ex
              </p>
              <p className="text-emerald-600 dark:text-emerald-400">
                Hello, World!
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-1.5 mb-6 justify-center">
          {currentSteps.map((s, i) => (
            <button
              key={s.title}
              onClick={() => setStep(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step
                  ? "w-6 bg-blue-500 dark:bg-blue-400"
                  : "w-1.5 bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <div className="mb-4">
          {current.mode === "iex" && <IexPanel iexState={current.iexState} />}
          {current.mode === "transition" && <TransitionPanel lang={lang} />}
          {current.mode === "file" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-200 dark:border-white/10">
                  <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded border border-slate-300 dark:border-white/20 bg-slate-100 dark:bg-white/10 text-xs font-mono text-slate-500 dark:text-white/50 leading-none">
                    &gt;_
                  </span>
                  <span className="text-xs text-slate-400 dark:text-white/25 font-mono">
                    hello.ex
                  </span>
                </div>
                <div className="h-36 p-4">
                  <CodeDisplay
                    showCode={current.showCode}
                    highlight={current.highlight}
                  />
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-900 dark:bg-black/70 backdrop-blur-md overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-200 dark:border-white/10 bg-white/5">
                  <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded border border-slate-300 dark:border-white/20 bg-slate-100 dark:bg-white/10 text-xs font-mono text-slate-500 dark:text-white/50 leading-none">
                    &gt;_
                  </span>
                  <span className="text-xs text-slate-400 dark:text-white/40 font-mono">
                    terminal
                  </span>
                </div>
                <div className="h-36 p-4 font-mono text-sm">
                  {current.showCommand ? (
                    <p className="text-white/50">$ elixir hello.ex</p>
                  ) : (
                    <T className="text-slate-400/50 dark:text-white/15 text-xs">
                      {lang === "es" ? "esperando..." : "waiting..."}
                    </T>
                  )}
                  {current.showOutput && (
                    <p className="text-emerald-400 mt-1">Hello, World!</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div
          key={`${step}-${lang}`}
          className="rounded-xl border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md p-6 mb-6 slide-in-blurred-top"
          style={{ animationDuration: "0.25s" }}
        >
          <div className="flex items-center gap-2 mb-2">
            {current.mode === "iex" && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-500 dark:text-violet-400 border border-violet-500/20">
                IEx
              </span>
            )}
            {current.mode === "file" && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                hello.ex
              </span>
            )}
            <p
              className="text-xs font-semibold uppercase tracking-widest bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--dt-gradient-blue)" }}
            >
              {step + 1} / {currentSteps.length} — <T>{current.title}</T>
            </p>
          </div>
          <p className="text-body text-sm leading-relaxed">
            <T>{current.explanation}</T>
          </p>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/15 bg-slate-100 dark:bg-white/5 px-5 py-2 text-sm text-slate-600 dark:text-white/60 transition hover:bg-slate-200 dark:hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed"
          >
            ← <T>{lang === "es" ? "Anterior" : "Previous"}</T>
            <kbd className="hidden sm:inline font-mono text-[9px] px-1 py-0.5 rounded border border-slate-300 dark:border-white/10 bg-white/60 dark:bg-white/5 text-muted leading-none">
              h
            </kbd>
          </button>
          <button
            onClick={() =>
              setStep((s) => Math.min(currentSteps.length - 1, s + 1))
            }
            disabled={isLast}
            className="flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 dark:bg-blue-500/15 px-5 py-2 text-sm text-accent transition hover:bg-blue-500/20 dark:hover:bg-blue-500/25 disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <kbd className="hidden sm:inline font-mono text-[9px] px-1 py-0.5 rounded border border-blue-500/20 bg-blue-500/10 text-accent leading-none">
              l
            </kbd>
            <T>{lang === "es" ? "Siguiente" : "Next"}</T> →
          </button>
        </div>

        {isLast && (
          <div
            className="mt-8 slide-in-blurred-top"
            style={{ animationDuration: "0.3s" }}
          >
            <div className="border-t border-slate-200 dark:border-white/10 pt-8">
              <ShareButtons lang={lang} />
              {related.length > 0 && (
                <>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">
                    {t("blog.related")}
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
                          {lang === "en" && title_en ? title_en : title}
                        </p>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <PostNav slug={SLUG} />
      </div>
    </div>
  );
};

export default ElixirHelloWorld;
