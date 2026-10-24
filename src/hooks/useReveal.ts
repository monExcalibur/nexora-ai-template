import { useEffect } from 'react'

export default function useReveal() {
  useEffect(() => {
    const elements = [...document.querySelectorAll<HTMLElement>('[data-reveal]')]
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motion.matches || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.08 },
    )
    for (const element of elements) {
      if (element.getBoundingClientRect().top > window.innerHeight) {
        element.classList.add('reveal-pending')
        observer.observe(element)
      }
    }
    const onPreferenceChange = () => {
      if (motion.matches) {
        observer.disconnect()
        elements.forEach((element) => element.classList.remove('reveal-pending'))
      }
    }
    motion.addEventListener('change', onPreferenceChange)
    return () => {
      observer.disconnect()
      motion.removeEventListener('change', onPreferenceChange)
      elements.forEach((element) => element.classList.remove('reveal-pending', 'is-visible'))
    }
  }, [])
}
