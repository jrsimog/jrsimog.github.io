import { techIcons } from "../data/techIcons";
import RippleButton from "./RippleButton";

const TechChip = ({ name, onClick, isActive = false }) => {
  const ti = techIcons[name];
  if (!ti) return null;
  const Icon = ti.icon;
  const baseColor = ti.color || "#3b82f6";
  const hexColor = baseColor.startsWith("#") ? baseColor : "#3b82f6";

  // Transparencia líquida personalizada del color del lenguaje (efecto Glassmorphism con color)
  const chipStyle = {
    backgroundColor: isActive ? `${hexColor}33` : `${hexColor}0f`, // 20% vs 6%
    borderColor: isActive ? `${hexColor}88` : `${hexColor}25`, // 53% vs 15%
    color: hexColor,
    backdropFilter: "blur(6px)",
  };

  return (
    <RippleButton
      onClick={() => onClick?.(name)}
      style={chipStyle}
      rippleColor={`${hexColor}40`}
      className={`flex items-center gap-1 text-[11px] rounded-full border px-2.5 py-0.5 font-medium transition-all duration-300 hover:brightness-125 hover:scale-105 cursor-pointer ${
        isActive
          ? "ring-1 ring-offset-1 ring-offset-white dark:ring-offset-black ring-blue-400/50 scale-105"
          : "opacity-85 hover:opacity-100"
      }`}
    >
      {Icon && (
        <Icon className="text-sm shrink-0" style={{ color: hexColor }} />
      )}
      <span className="dark:text-white/90 text-slate-800/90">{name}</span>
    </RippleButton>
  );
};

export default TechChip;

