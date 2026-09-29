import { useState, useEffect, useRef } from 'react'

export default function ScrollCard({
  children,
  index = 0,
  staggerDelay = 350, // Stagger delay in ms between cards
  duration = 750, // Smooth ease-out duration in ms
  translateY = 28, // Upward movement
  translateX = 0, // Horizontal movement
  direction = 'up', // 'up' | 'left' | 'right'
  animation = 'slide', // 'slide' | 'pop'
  className = '',
  style = {},
  onClick,
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mediaQuery.matches)

    const handleMotionChange = (e) => setReduceMotion(e.matches)
    mediaQuery.addEventListener('change', handleMotionChange)

    // Check immediate visibility on mount
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      if (rect.top < window.innerHeight + 150 && rect.bottom > -150) {
        setIsVisible(true)
      }
    }

    // Safety fallback: ensure card is unconditionally visible after 400ms even if observer is delayed
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true)
    }, 400)

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return () => {
        mediaQuery.removeEventListener('change', handleMotionChange)
        clearTimeout(fallbackTimer)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (cardRef.current) {
            observer.unobserve(cardRef.current)
          }
        }
      },
      {
        threshold: 0,
        rootMargin: '150px 0px 150px 0px',
      }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      clearTimeout(fallbackTimer)
      mediaQuery.removeEventListener('change', handleMotionChange)
      observer.disconnect()
    }
  }, [])

  // Cap stagger delay so cards lower on the page reveal promptly without staying invisible
  const actualDelaySec = Math.min((index * (staggerDelay / 1000)), 0.25)
  const delayInSeconds = actualDelaySec.toFixed(2) + 's'

  // Determine initial hidden transform and easing curve based on animation / direction
  let initialTransform = `translateY(${translateY}px)`
  let easeCurve = 'cubic-bezier(0.16, 1, 0.3, 1)'

  if (animation === 'pop') {
    initialTransform = 'scale(0.82) translateY(20px)'
    easeCurve = 'cubic-bezier(0.34, 1.56, 0.64, 1)'
  } else if (direction === 'left' || translateX !== 0) {
    const xVal = translateX !== 0 ? translateX : -60
    initialTransform = `translateX(${xVal}px)`
  } else if (direction === 'right') {
    initialTransform = `translateX(60px)`
  }

  const animatedStyle = reduceMotion || isVisible
    ? {
        opacity: 1,
        transform: animation === 'pop' ? 'scale(1) translateY(0)' : 'translate(0, 0)',
        transition: reduceMotion
          ? 'none'
          : `opacity ${duration}ms ${easeCurve} ${delayInSeconds}, transform ${duration}ms ${easeCurve} ${delayInSeconds}, box-shadow 0.3s ease`,
      }
    : {
        opacity: 0,
        transform: initialTransform,
        transition: reduceMotion
          ? 'none'
          : `opacity ${duration}ms ${easeCurve} ${delayInSeconds}, transform ${duration}ms ${easeCurve} ${delayInSeconds}, box-shadow 0.3s ease`,
      }

  return (
    <div
      ref={cardRef}
      className={`scroll-card-animated ${className}`}
      style={{
        ...style,
        ...animatedStyle,
        willChange: isVisible ? 'auto' : 'transform, opacity',
      }}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
