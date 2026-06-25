import { useEffect, useRef, useState } from 'react'
import './RevealOnScroll.css'

export default function RevealOnScroll({
  tag: Tag = 'div',
  delay = 0,
  className = '',
  children,
  ...rest
}) {
  const rootRef = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const reduce =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setShown(true)
      return
    }
    const el = rootRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={rootRef}
      className={`reveal${shown ? ' reveal--in' : ''}${className ? ' ' + className : ''}`}
      style={{ '--delay': delay + 'ms' }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
