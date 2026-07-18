import { useState, useRef } from "react";

const Hover3DCard = ({ children, active = true, className = "" }) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shineStyle, setShineStyle] = useState({ opacity: 0 });

  if (!active) {
    return <div className={className}>{children}</div>;
  }

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    
    // Obtener la posición del mouse relativa a la tarjeta
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calcular la rotación (-15deg a 15deg)
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    
    // Inversión para que se incline hacia el cursor
    const rX = -(y - midY) / (rect.height / 15);
    const rY = (x - midX) / (rect.width / 15);

    setRotateX(rX);
    setRotateY(rY);

    // Efecto de brillo (shine) siguiendo al cursor
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;
    
    setShineStyle({
      opacity: 0.15,
      background: `radial-gradient(circle 120px at ${shineX}% ${shineY}%, rgba(255, 255, 255, 0.8), transparent)`,
    });
  };

  const handleMouseLeave = () => {
    // Resetear posición
    setRotateX(0);
    setRotateY(0);
    setShineStyle({ opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-all duration-200 ease-out will-change-transform ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Brillo en hover */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-3xl z-30 transition-opacity duration-300"
        style={shineStyle}
      />
      {/* Contenido envuelto */}
      <div style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </div>
  );
};

export default Hover3DCard;
