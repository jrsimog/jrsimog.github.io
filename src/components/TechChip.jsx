import { techIcons } from "../data/techIcons";

const TechChip = ({ name, onClick, isActive = false }) => {
  const ti = techIcons[name];
  if (!ti) return null;
  const Icon = ti.icon;
  return (
    <button
      onClick={() => onClick?.(name)}
      className={`flex items-center gap-1 text-xs rounded-full border border-slate-200 dark:border-white/10 bg-slate-100/60 dark:bg-white/5 px-2 py-0.5 text-slate-500 dark:text-white/40 transition hover:bg-slate-200 dark:hover:bg-white/10 hover:scale-105 ${isActive ? "ring-2 ring-blue-400 ring-offset-1 ring-offset-white dark:ring-offset-black scale-105" : ""}`}
    >
      {Icon && (
        <Icon className="text-sm shrink-0" style={{ color: ti.color }} />
      )}
      {name}
    </button>
  );
};

export default TechChip;
