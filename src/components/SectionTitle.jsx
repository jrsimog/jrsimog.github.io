const gradients = {
  blue:   'bg-gradient-to-tl from-slate-900 via-blue-600 to-slate-500 dark:bg-none dark:text-white',
  violet: 'bg-gradient-to-tl from-slate-900 via-violet-600 to-slate-500 dark:from-slate-800 dark:via-violet-500 dark:to-zinc-400',
}

const SectionTitle = ({ children, color = 'blue', as: Tag = 'h2', className = '' }) => (
  <Tag className={`font-semibold uppercase tracking-widest bg-clip-text text-transparent ${gradients[color]} ${className}`}>
    {children}
  </Tag>
)

export default SectionTitle
