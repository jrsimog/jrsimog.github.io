const GA_ID = import.meta.env.VITE_GA_ID

export const initGA = () => {
  if (!GA_ID || !import.meta.env.PROD) return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = (...args) => window.dataLayer.push(args)
  window.gtag('js', new Date())
  window.gtag('config', GA_ID)
}

export const trackEvent = (action, params = {}) => {
  if (!import.meta.env.PROD) console.log('[analytics]', action, params)
  if (typeof window.gtag !== 'function') return
  window.gtag('event', action, params)
}
