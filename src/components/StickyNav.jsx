import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "../context/LanguageContext";
import {
  FaFilePdf,
  FaBriefcase,
  FaCode,
  FaEnvelope,
  FaGraduationCap,
} from "react-icons/fa";
import { trackEvent } from "../utils/analytics";
import RippleButton from "./RippleButton";
import ThemeToggle from "./ThemeToggle";
import LangToggle from "./LangToggle";

const homeLinks = [
  { id: "experiencia", es: "Experiencia", en: "Experience", icon: FaBriefcase },
  { id: "proyectos", es: "Proyectos", en: "Projects", icon: FaCode },
  { id: "contacto", es: "Contacto", en: "Contact", icon: FaEnvelope },
  { id: "educacion", es: "Educación", en: "Education", icon: FaGraduationCap },
];

const shell =
  "fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center rounded-full border border-slate-200/80 dark:border-white/15 bg-white/80 dark:bg-black/60 backdrop-blur-md shadow-lg transition-all duration-300 max-w-[95vw] max-sm:top-auto max-sm:bottom-5 sm:animate-[nav-enter_0.5s_cubic-bezier(0.16,1,0.3,1)_0.1s_both]";
const shellMobileOnly =
  "sm:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center rounded-full border border-slate-200/80 dark:border-white/15 bg-white/80 dark:bg-black/60 backdrop-blur-md shadow-lg max-w-[95vw]";

const StickyNav = ({ onActiveChange, left, right }) => {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(!!left || (typeof window !== "undefined" && window.innerWidth < 640));
  const [active, setActive] = useState(null);
  const [isFlashing, setIsFlashing] = useState(false);
  
  const containerRef = useRef(null);
  const [hoveredStyle, setHoveredStyle] = useState({ opacity: 0, left: 0, width: 0, height: 0, top: 0 });

  const isCustom = !!left;

  useEffect(() => {
    if (isCustom) return;
    if (visible) {
      setIsFlashing(true);
      const timer = setTimeout(() => setIsFlashing(false), 650);
      return () => clearTimeout(timer);
    }
  }, [visible, isCustom]);

  const updateActive = (id) => {
    setActive(id);
    onActiveChange?.(id);
  };

  useEffect(() => {
    if (isCustom) return;
    
    const checkVisibility = () => {
      const isMobile = window.innerWidth < 640;
      if (isMobile) {
        setVisible(true);
      } else {
        setVisible(window.scrollY > 320);
      }
    };

    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", checkVisibility);
    checkVisibility();

    return () => {
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
    };
  }, [isCustom]);

  useEffect(() => {
    if (isCustom) return;
    const onScroll = () => {
      const nearBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 80;
      if (nearBottom) {
        setActive("educacion");
        onActiveChange?.("educacion");
        return;
      }
      const OFFSET = 250;
      let current = null,
        minDist = Infinity;
      homeLinks.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top - OFFSET;
        if (top <= 0 && Math.abs(top) < minDist) {
          minDist = Math.abs(top);
          current = id;
        }
      });
      if (current) {
        setActive(current);
        onActiveChange?.(current);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isCustom, onActiveChange]);

  const handleMouseEnter = (e) => {
    const target = e.currentTarget;
    setHoveredStyle({
      opacity: 1,
      left: target.offsetLeft,
      width: target.clientWidth,
      height: target.clientHeight,
      top: target.offsetTop,
    });
  };

  const handleMouseLeave = () => {
    const container = containerRef.current;
    if (!container) {
      setHoveredStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }
    const activeBtn = container.querySelector(`[data-id="${active}"]`);
    if (activeBtn) {
      setHoveredStyle({
        opacity: 1,
        left: activeBtn.offsetLeft,
        width: activeBtn.clientWidth,
        height: activeBtn.clientHeight,
        top: activeBtn.offsetTop,
      });
    } else {
      setHoveredStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;
      const activeBtn = container.querySelector(`[data-id="${active}"]`);
      if (activeBtn) {
        setHoveredStyle({
          opacity: 1,
          left: activeBtn.offsetLeft,
          width: activeBtn.clientWidth,
          height: activeBtn.clientHeight,
          top: activeBtn.offsetTop,
        });
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [active, visible]);


  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    updateActive(id);
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 64,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  const node = isCustom ? (
    <div className={shellMobileOnly}>
      <div className="flex items-center gap-1 px-3 py-1.5 whitespace-nowrap">
        {left}
      </div>
      <div className="w-px h-5 bg-slate-200 dark:bg-white/15 shrink-0" />
      <div className="flex items-center gap-1 px-3 py-1.5">{right}</div>
    </div>
  ) : (
    <>
      {isFlashing && (
        <div 
          className="hidden sm:block fixed left-1/2 -translate-x-1/2 h-[4px] bg-gradient-to-r from-transparent via-blue-400 via-white via-blue-400 to-transparent blur-[0.3px] shadow-[0_0_18px_#3b82f6,0_0_35px_#ffffff,0_0_55px_#3b82f6] rounded-full animate-[flare-beam_0.6s_cubic-bezier(0.16,1,0.3,1)_both] pointer-events-none z-50"
          style={{ width: "500px", top: "calc(16px + 23px)" }}
        >
          {/* Partícula de destello izquierdo saliendo del centro hacia la izquierda */}
          <div className="absolute top-1/2 h-2 w-2 rounded-full bg-white blur-[0.5px] shadow-[0_0_8px_#ffffff,0_0_15px_#3b82f6] animate-[flare-left_0.6s_cubic-bezier(0.16,1,0.3,1)_both]" />
          
          {/* Partícula de destello derecho saliendo del centro hacia la derecha */}
          <div className="absolute top-1/2 h-2 w-2 rounded-full bg-white blur-[0.5px] shadow-[0_0_8px_#ffffff,0_0_15px_#3b82f6] animate-[flare-right_0.6s_cubic-bezier(0.16,1,0.3,1)_both]" />
        </div>
      )}
      <div className={shell}>
      <div 
        ref={containerRef}
        onMouseLeave={handleMouseLeave}
        className="relative flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none px-3 py-2 sm:px-4 sm:py-2"
      >
        {/* Indicador elástico deslizante (foco magnético) */}
        <div
          className="absolute bg-blue-500/10 dark:bg-white/10 rounded-full transition-all duration-300 ease-out pointer-events-none z-0"
          style={{
            left: `${hoveredStyle.left}px`,
            width: `${hoveredStyle.width}px`,
            height: `${hoveredStyle.height}px`,
            top: `${hoveredStyle.top}px`,
            opacity: hoveredStyle.opacity,
          }}
        />

        {homeLinks.map(({ id, es, en, icon: Icon }) => (
          <RippleButton
            key={id}
            data-id={id}
            onClick={() => scrollTo(id)}
            onMouseEnter={handleMouseEnter}
            title={lang === "en" ? en : es}
            className={`relative z-10 shrink-0 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold transition-colors duration-300 cursor-pointer ${
              active === id
                ? "text-blue-600 dark:text-blue-300 bg-blue-500/5 dark:bg-white/5"
                : "text-slate-500 dark:text-white/50 hover:text-slate-800 dark:hover:text-white/80"
            }`}
          >
            <span className="hidden sm:inline">{lang === "en" ? en : es}</span>
            <Icon className="sm:hidden text-base" />
          </RippleButton>
        ))}
      </div>
      <div className="w-px h-5 sm:h-6 bg-slate-200 dark:bg-white/15 shrink-0" />
      <div className="relative shrink-0 mx-1.5 sm:mx-2.5">
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
        </span>
        <RippleButton
          href="/CV — José Ramón Simó Guerra.pdf"
          download
          title={lang === "en" ? "Download CV" : "Descargar CV"}
          className="pdf-icon flex items-center justify-center rounded-full border border-transparent p-2 sm:p-2.5 transition-all duration-200 cursor-pointer"
          onClick={() => trackEvent("cv_download", { location: "sticky_nav" })}
        >
          <FaFilePdf className="text-base sm:text-lg text-red-400" />
        </RippleButton>
      </div>
      <div className="w-px h-5 sm:h-6 bg-slate-200 dark:bg-white/15 shrink-0" />
      <div className="flex items-center gap-0.5 sm:gap-1 px-1 sm:px-1.5 shrink-0">
        <ThemeToggle compact={true} />
        <LangToggle compact={true} />
      </div>
    </div>
  </>
  );

  return createPortal(node, document.body);
};

export default StickyNav;
