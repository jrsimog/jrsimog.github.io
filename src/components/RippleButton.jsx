import { useState, useEffect } from "react";

const RippleButton = ({
  children,
  onClick,
  className = "",
  style = {},
  href,
  target,
  rel,
  download,
  title,
  as = "button",
  rippleColor,
  ...props
}) => {
  const [ripples, setRipples] = useState([]);

  const createRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2.2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple = {
      x,
      y,
      size,
      id: Date.now() + Math.random(),
    };

    setRipples((prev) => [...prev, newRipple]);
  };

  // Limpiar ripples después de que termine la animación
  useEffect(() => {
    if (ripples.length === 0) return;

    const lastRipple = ripples[ripples.length - 1];
    const timer = setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== lastRipple.id));
    }, 850);

    return () => clearTimeout(timer);
  }, [ripples]);

  const handleMouseDown = (e) => {
    createRipple(e);
  };

  const Component = href ? "a" : as;

  const hasPosition = className.includes("relative") || className.includes("absolute") || className.includes("fixed") || className.includes("sticky");

  const combinedClassName = `
    ${hasPosition ? "" : "relative"} overflow-hidden cursor-pointer select-none transition-all duration-300 ease-out
    focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50
    hover:brightness-110 active:scale-[0.98]
    ${className}
  `.trim().replace(/\s+/g, " ");

  const componentProps = {
    className: combinedClassName,
    style: { ...style, ...(hasPosition ? {} : { position: "relative" }) },
    onMouseDown: handleMouseDown,
    onClick,
    title,
    ...props,
  };

  if (href) {
    componentProps.href = href;
    if (target) componentProps.target = target;
    if (rel) componentProps.rel = rel;
    if (download) componentProps.download = download;
  }

  return (
    <Component {...componentProps}>
      {/* Contenido principal del botón (por encima del ripple) */}
      <span className="relative z-10 pointer-events-none flex items-center justify-center gap-2 h-full w-full">
        {children}
      </span>

      {/* Renderizado de las ondas de agua (Ripples) */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none animate-[ripple-effect_0.8s_ease-out_both] z-0"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: `${ripple.size}px`,
            height: `${ripple.size}px`,
            backgroundColor: rippleColor || "rgba(59, 130, 246, 0.25)",
          }}
        />
      ))}
    </Component>
  );
};

export default RippleButton;
