const Layout = ({ children }) => (
  <div className="relative min-h-screen w-full overflow-hidden bg-slate-50 dark:bg-black transition-colors duration-300">
    <div className="absolute inset-0 z-0" style={{ background: 'var(--bg-radial)' }} />
    <div className="relative z-10">
      {children}
    </div>
  </div>
)

export default Layout
