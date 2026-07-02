const GlassCard = ({ children, className = "", ...props }) => (
  <div
    className={`rounded-2xl border border-slate-200/80 bg-white/70 dark:border-white/15 dark:bg-white/8 p-6 shadow-xl dark:shadow-black/20 backdrop-blur-md transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export default GlassCard;
