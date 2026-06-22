import { useEffect, useRef, useState } from 'react'

export default function ScrollReveal({ children, className = '', delay = '0s' }) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const currentRef = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true)
          if (currentRef) {
            observer.unobserve(currentRef)
          }
        }
      },
      {
        threshold: 0.01,
        rootMargin: '0px 0px 100px 0px', // Trigger 100px before entering
      }
    )

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-75 ${isIntersecting ? 'slide-in-blurred-top' : 'opacity-0'} ${className}`}
      style={isIntersecting ? { animationDelay: delay } : {}}
    >
      {children}
    </div>
  )
}
