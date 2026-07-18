import { useEffect, useRef, useState } from "react";

const ScrollParallaxImage = ({ src, alt, className = "", active = true }) => {
  const containerRef = useRef(null);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    if (!active) {
      setTranslateY(0);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let animationFrameId = null;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // El elemento está visible en el viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Normalizar la posición del scroll dentro de la sección
        // 0 cuando entra por abajo, 1 cuando sale por arriba
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        
        // Desplazamiento de -15px a 15px
        const y = (progress - 0.5) * 35;
        
        setTranslateY(y);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Ejecutar una vez al inicio
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [active, src]);

  return (
    <div 
      ref={containerRef} 
      className="relative overflow-hidden w-full h-full"
    >
      <img
        src={src}
        alt={alt}
        className={`w-full h-[120%] object-cover object-top absolute left-0 top-[-10%] transition-transform duration-75 ease-out will-change-transform ${className}`}
        style={{
          transform: active ? `translate3d(0, ${translateY}px, 0) scale(1.05)` : "none",
        }}
      />
    </div>
  );
};

export default ScrollParallaxImage;
