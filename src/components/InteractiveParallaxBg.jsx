import { useEffect, useRef } from "react";

const InteractiveParallaxBg = ({ active = true }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const container = containerRef.current;
    if (!container) return;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = window.scrollY;
    let animationFrameId = null;

    // Obtener los bloques de código individuales
    const codeBlocks = container.querySelectorAll(".code-element-block");

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const animate = () => {
      // Suavizado del cursor
      mouseX += (targetX - mouseX) * 0.08;
      mouseY += (targetY - mouseY) * 0.08;

      const layers = {
        back: container.querySelector(".code-parallax-back"),
        mid: container.querySelector(".code-parallax-mid"),
        front: container.querySelector(".code-parallax-front"),
      };

      // 1. Movimiento Parallax de capas
      if (layers.back) {
        const yScroll = scrollY * 0.15;
        const xMouse = ((mouseX / window.innerWidth) - 0.5) * -20;
        const yMouse = ((mouseY / window.innerHeight) - 0.5) * -20;
        layers.back.style.transform = `translate3d(${xMouse}px, ${yMouse - yScroll}px, 0)`;
      }

      if (layers.mid) {
        const yScroll = scrollY * 0.32;
        const xMouse = ((mouseX / window.innerWidth) - 0.5) * -45;
        const yMouse = ((mouseY / window.innerHeight) - 0.5) * -45;
        layers.mid.style.transform = `translate3d(${xMouse}px, ${yMouse - yScroll}px, 0)`;
      }

      if (layers.front) {
        const yScroll = scrollY * 0.50;
        const xMouse = ((mouseX / window.innerWidth) - 0.5) * -80;
        const yMouse = ((mouseY / window.innerHeight) - 0.5) * -80;
        layers.front.style.transform = `translate3d(${xMouse}px, ${yMouse - yScroll}px, 0)`;
      }

      // 2. Efecto de Proximidad Física (Magnetismo y Revelación de Luz)
      codeBlocks.forEach((block) => {
        const rect = block.getBoundingClientRect();
        
        // Centro del bloque
        const blockCenterX = rect.left + rect.width / 2;
        const blockCenterY = rect.top + rect.height / 2;

        // Distancia del mouse al centro del bloque
        const deltaX = mouseX - blockCenterX;
        const deltaY = mouseY - blockCenterY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        // Radio de efecto (250px)
        const effectRadius = 250;

        if (distance < effectRadius) {
          const strength = (effectRadius - distance) / effectRadius; // 0 a 1
          
          // Repulsión sutil
          const pushX = (deltaX / distance) * -12 * strength;
          const pushY = (deltaY / distance) * -12 * strength;

          block.style.opacity = `${0.35 + strength * 0.6}`;
          block.style.boxShadow = `0 0 ${strength * 20}px rgba(59, 130, 246, ${strength * 0.15})`;
          block.style.borderColor = `rgba(59, 130, 246, ${0.1 + strength * 0.4})`;
          block.style.transform = `translate3d(${pushX}px, ${pushY}px, 0) scale(${1 + strength * 0.02})`;
        } else {
          block.style.opacity = "";
          block.style.boxShadow = "";
          block.style.borderColor = "";
          block.style.transform = "";
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ minHeight: "220vh" }}
    >
      {/* CAPA TRASERA: Luces y comentarios de código de fondo */}
      <div className="code-parallax-back absolute inset-0 opacity-40 dark:opacity-30 transition-transform will-change-transform">
        <div className="absolute top-[8%] left-[2%] w-[45rem] h-[45rem] rounded-full bg-gradient-to-tr from-blue-500/15 to-indigo-500/10 blur-[130px]" />
        <div className="absolute top-[45%] right-[-5%] w-[55rem] h-[55rem] rounded-full bg-gradient-to-bl from-purple-500/15 to-pink-500/10 blur-[160px]" />
        <div className="absolute top-[75%] left-[-10%] w-[50rem] h-[50rem] rounded-full bg-gradient-to-br from-teal-500/10 to-blue-500/10 blur-[140px]" />

        <div className="absolute top-[4%] right-[8%] font-mono text-3xl font-bold text-slate-500/8 dark:text-white/8 uppercase tracking-widest select-none">
          // DEVELOPER PORTFOLIO //
        </div>
        <div className="absolute top-[35%] left-[5%] font-mono text-2xl font-bold text-slate-500/8 dark:text-white/8 uppercase tracking-widest select-none">
          // EXPERIENCE_DASHBOARD //
        </div>
        <div className="absolute top-[68%] right-[10%] font-mono text-2xl font-bold text-slate-500/8 dark:text-white/8 uppercase tracking-widest select-none">
          // CODE_REPOSITORY //
        </div>
      </div>

      {/* CAPA INTERMEDIA: Bloques de código real por secciones */}
      <div className="code-parallax-mid absolute inset-0 transition-transform will-change-transform font-mono text-xs select-none">
        
        {/* SECCIÓN 1 (HERO): Elixir Code / Config - Desplazado más a la izquierda para no invadir la tarjeta */}
        <div 
          className="code-element-block absolute top-[9%] left-[1.5%] border-l border-purple-500/30 dark:border-l-white/35 pl-4 py-1.5 bg-purple-500/[0.02] dark:bg-purple-400/[0.01] rounded-r-lg opacity-40 dark:opacity-30 transition-all duration-300"
        >
          <pre className="text-slate-600/50 dark:text-white/35">
            <span className="text-purple-600 dark:text-purple-400 font-semibold">defmodule</span> <span className="text-blue-600 dark:text-blue-400 font-medium">Jrsimog.Profile</span> <span className="text-purple-600 dark:text-purple-400 font-semibold">do</span>{"\n"}
            {"  "}<span className="text-purple-600 dark:text-purple-400">use</span> <span className="text-cyan-600 dark:text-cyan-400">GenServer</span>{"\n\n"}
            {"  "}<span className="text-purple-600 dark:text-purple-400">def</span> <span className="text-blue-600 dark:text-blue-400">start_link</span>(opts) <span className="text-purple-600 dark:text-purple-400">do</span>{"\n"}
            {"    "}<span className="text-cyan-600 dark:text-cyan-400">GenServer</span>.start_link(__MODULE__, :ok, opts){"\n"}
            {"  "}<span className="text-purple-600 dark:text-purple-400">end</span>{"\n\n"}
            {"  "}<span className="text-purple-600 dark:text-purple-400">def</span> <span className="text-blue-600 dark:text-blue-400">init</span>(:ok) <span className="text-purple-600 dark:text-purple-400">do</span>{"\n"}
            {"    "}&#123;:ok, %&#123;<span className="text-teal-600 dark:text-teal-400">name:</span> <span className="text-green-600 dark:text-green-400">"José Simó"</span>, <span className="text-teal-600 dark:text-teal-400">role:</span> <span className="text-green-600 dark:text-green-400">"Dev"</span>&#125;&#125;{"\n"}
            {"  "}<span className="text-purple-600 dark:text-purple-400">end</span>{"\n"}
            <span className="text-purple-600 dark:text-purple-400">end</span>
          </pre>
        </div>

        {/* SECCIÓN 2 (EXPERIENCIA): Lógica React & Hooks */}
        <div 
          className="code-element-block absolute top-[30%] right-[3%] border-r border-blue-500/30 dark:border-r-white/35 pr-4 py-1.5 text-right bg-blue-500/[0.02] dark:bg-blue-400/[0.01] rounded-l-lg opacity-40 dark:opacity-30 transition-all duration-300"
        >
          <pre className="text-slate-600/50 dark:text-white/35">
            <span className="text-purple-600 dark:text-purple-400 font-semibold">const</span> [expanded, setExpanded] = <span className="text-blue-600 dark:text-blue-400">useState</span>(<span className="text-amber-600 dark:text-amber-400">false</span>);{"\n"}
            <span className="text-purple-600 dark:text-purple-400 font-semibold">const</span> filteredExperience = <span className="text-blue-600 dark:text-blue-400">useMemo</span>(() =&gt; &#123;{"\n"}
            {"  "}<span className="text-purple-600 dark:text-purple-400">return</span> experience.<span className="text-blue-600 dark:text-blue-400">filter</span>(e =&gt; &#123;{"\n"}
            {"    "}<span className="text-purple-600 dark:text-purple-400">return</span> e.stack.<span className="text-blue-600 dark:text-blue-400">includes</span>(filterSkill);{"\n"}
            {"  "}&#125;);{"\n"}
            &#125;, [filterSkill]);
          </pre>
        </div>

        {/* SECCIÓN 3 (PROYECTOS): Tailwind v4 & Vite config */}
        <div 
          className="code-element-block absolute top-[61%] left-[3%] border-l border-teal-500/30 dark:border-l-white/35 pl-4 py-1.5 bg-teal-500/[0.02] dark:bg-teal-400/[0.01] rounded-r-lg opacity-40 dark:opacity-30 transition-all duration-300"
        >
          <pre className="text-slate-600/50 dark:text-white/35">
            <span className="text-slate-400/60 dark:text-slate-500/60">// vite.config.js</span>{"\n"}
            <span className="text-purple-600 dark:text-purple-400 font-semibold">import</span> &#123; defineConfig &#125; <span className="text-purple-600 dark:text-purple-400">from</span> <span className="text-green-600 dark:text-green-400">"vite"</span>;{"\n"}
            <span className="text-purple-600 dark:text-purple-400 font-semibold">import</span> react <span className="text-purple-600 dark:text-purple-400">from</span> <span className="text-green-600 dark:text-green-400">"@vitejs/plugin-react"</span>;{"\n"}
            <span className="text-purple-600 dark:text-purple-400 font-semibold">import</span> tailwindcss <span className="text-purple-600 dark:text-purple-400">from</span> <span className="text-green-600 dark:text-green-400">"@tailwindcss/vite"</span>;{"\n\n"}
            <span className="text-purple-600 dark:text-purple-400 font-semibold">export default</span> <span className="text-blue-600 dark:text-blue-400">defineConfig</span>(&#123;{"\n"}
            {"  "}plugins: [react(), tailwindcss()],{"\n"}
            &#125;);
          </pre>
        </div>

        {/* SECCIÓN 4 (SOBRE MÍ & CONTACTO): JSON de información personal */}
        <div 
          className="code-element-block absolute top-[84%] right-[4%] border-r border-pink-500/30 dark:border-r-white/35 pr-4 py-1.5 text-right bg-pink-500/[0.02] dark:bg-pink-400/[0.01] rounded-l-lg opacity-40 dark:opacity-30 transition-all duration-300"
        >
          <pre className="text-slate-600/50 dark:text-white/35">
            &#123;{"\n"}
            {"  "}<span className="text-pink-600 dark:text-pink-400 font-semibold">"profile"</span>: &#123;{"\n"}
            {"    "}<span className="text-pink-600 dark:text-pink-400">"username"</span>: <span className="text-green-600 dark:text-green-400">"jrsimog"</span>,{"\n"}
            {"    "}<span className="text-pink-600 dark:text-pink-400">"location"</span>: <span className="text-green-600 dark:text-green-400">"Spain/Online"</span>,{"\n"}
            {"    "}<span className="text-pink-600 dark:text-pink-400">"interests"</span>: [{"\n"}
            {"      "}<span className="text-green-600 dark:text-green-400">"Web Architecture"</span>,{"\n"}
            {"      "}<span className="text-green-600 dark:text-green-400">"Elixir"</span>,{"\n"}
            {"      "}<span className="text-green-600 dark:text-green-400">"Inline Downhill"</span>{"\n"}
            {"    "}]{"\n"}
            {"  "}&#125;{"\n"}
            &#125;
          </pre>
        </div>
      </div>

      {/* CAPA DELANTERA: Símbolos flotantes rápidos */}
      <div className="code-parallax-front absolute inset-0 transition-transform will-change-transform font-mono select-none">
        
        {/* Símbolos sueltos (desplazados horizontalmente para no quedar detrás de la tarjeta) */}
        <div className="absolute top-[13%] right-[15%] text-3xl font-light text-blue-500/25 dark:text-blue-400/25">
          &#123; &#125;
        </div>
        <div className="absolute top-[24%] left-[10%] text-2xl font-semibold text-purple-500/20 dark:text-purple-400/25">
          &lt;/&gt;
        </div>
        <div className="absolute top-[49%] left-[10%] text-4xl font-light text-teal-500/20 dark:text-teal-400/25">
          [ ]
        </div>
        <div className="absolute top-[59%] right-[12%] text-2xl font-bold text-pink-500/25 dark:text-pink-400/25">
          =&gt;
        </div>
        <div className="absolute top-[79%] left-[18%] text-3xl font-light text-indigo-500/20 dark:text-indigo-400/25">
          &amp;&amp;
        </div>
        <div className="absolute top-[88%] right-[22%] text-4xl font-light text-blue-500/20 dark:text-blue-400/25">
          ()
        </div>

        {/* Líneas de código flotantes en primer plano (reubicadas para no invadir la tarjeta del Hero) */}
        <div 
          className="code-element-block absolute top-[21%] left-[12%] text-xs font-medium text-slate-500/35 dark:text-white/20 bg-slate-900/10 dark:bg-white/10 border border-slate-900/15 dark:border-white/40 px-2.5 py-1 rounded backdrop-blur-[2px] shadow-sm opacity-40 dark:opacity-30 transition-all duration-300"
        >
          <span className="text-purple-600/50 dark:text-purple-400/40">import</span> &#123; useLanguage &#125; <span className="text-purple-600/50 dark:text-purple-400/40">from</span> <span className="text-green-600/50 dark:text-green-400/40">"../context/LanguageContext"</span>;
        </div>
        
        <div 
          className="code-element-block absolute top-[40%] left-[22%] text-xs font-medium text-slate-500/35 dark:text-white/20 bg-slate-900/10 dark:bg-white/10 border border-slate-900/15 dark:border-white/40 px-2.5 py-1 rounded backdrop-blur-[2px] shadow-sm opacity-40 dark:opacity-30 transition-all duration-300"
        >
          <span className="text-blue-600/50 dark:text-blue-400/40">trackEvent</span>(<span className="text-green-600/50 dark:text-green-400/40">"cv_download"</span>, &#123; <span className="text-teal-600/50 dark:text-teal-400/40">location:</span> <span className="text-green-600/50 dark:text-green-400/40">"header"</span> &#125;);
        </div>

        <div 
          className="code-element-block absolute top-[66%] right-[32%] text-xs font-medium text-slate-500/35 dark:text-white/20 bg-slate-900/10 dark:bg-white/10 border border-slate-900/15 dark:border-white/40 px-2.5 py-1 rounded backdrop-blur-[2px] shadow-sm opacity-40 dark:opacity-30 transition-all duration-300"
        >
          &lt;<span className="text-blue-600/50 dark:text-blue-400/40">ProjectCard</span> <span className="text-teal-600/50 dark:text-teal-400/40">project</span>=&#123;project&#125; /&gt;
        </div>

        <div 
          className="code-element-block absolute top-[86%] left-[14%] text-xs font-medium text-slate-500/35 dark:text-white/20 bg-slate-900/10 dark:bg-white/10 border border-slate-900/15 dark:border-white/40 px-2.5 py-1 rounded backdrop-blur-[2px] shadow-sm opacity-40 dark:opacity-30 transition-all duration-300"
        >
          <span className="text-teal-600/50 dark:text-teal-400/40">email:</span> <span className="text-green-600/50 dark:text-green-400/40">"jrsimog@gmail.com"</span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveParallaxBg;
