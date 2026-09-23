import { useState, useEffect, useRef } from 'react'
import { useData } from '../../context/DataContext'

function AnimatedCounter({ targetValue, duration = 1800, isVisible, reduceMotion }) {
  const [displayValue, setDisplayValue] = useState(0)

  // Parse numeric part and suffix e.g. "16+" -> number 16, suffix "+"
  const match = String(targetValue).match(/^(\d+)(.*)$/)
  const numericTarget = match ? parseInt(match[1], 10) : 0
  const suffix = match ? match[2] : ''

  useEffect(() => {
    if (!isVisible) return
    if (reduceMotion) {
      setDisplayValue(numericTarget)
      return
    }

    let startTime = null
    let animationFrameId

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // Smooth cubic ease-out deceleration curve
      const easeOutProgress = 1 - Math.pow(1 - progress, 3)
      const currentNumber = Math.floor(easeOutProgress * numericTarget)
      setDisplayValue(currentNumber)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step)
      } else {
        setDisplayValue(numericTarget)
      }
    }

    animationFrameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animationFrameId)
  }, [isVisible, numericTarget, duration, reduceMotion])

  return (
    <span>
      {reduceMotion || isVisible ? displayValue : 0}
      {suffix}
    </span>
  )
}

export default function AnimatedStatsStrip() {
  const { projects = [], team = [], stats } = useData()
  const [isVisible, setIsVisible] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const stripRef = useRef(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mediaQuery.matches)

    const handleMotionChange = (e) => setReduceMotion(e.matches)
    mediaQuery.addEventListener('change', handleMotionChange)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (stripRef.current) {
            observer.unobserve(stripRef.current)
          }
        }
      },
      { threshold: 0.15 }
    )

    if (stripRef.current) {
      observer.observe(stripRef.current)
    }

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange)
      observer.disconnect()
    }
  }, [])

  const statItems = [
    { val: '16+', label: 'Years of Proven Impact' },
    { val: `${projects.length || stats?.total || 121}+`, label: 'Completed Assignments' },
    { val: String(team.length || 8), label: 'Core Advisory Leads' },
    { val: '58+', label: 'Global Institutional Donors' },
  ]

  return (
    <section
      ref={stripRef}
      style={{
        background: '#faf5ff',
        padding: '3.5rem 0 2.5rem',
        borderBottom: '1px solid rgba(118, 12, 176, 0.1)',
        position: 'relative',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.75rem',
            textAlign: 'center',
          }}
        >
          {statItems.map((st, idx) => {
            const delayInSeconds = (idx * 0.15).toFixed(2) + 's'

            return (
              <div
                key={st.label}
                style={{
                  background: '#ffffff',
                  padding: '1.75rem 1.5rem',
                  borderRadius: '22px',
                  border: '1.5px solid rgba(118, 12, 176, 0.1)',
                  boxShadow: '0 6px 20px rgba(118, 12, 176, 0.05)',
                  opacity: reduceMotion || isVisible ? 1 : 0,
                  transform: reduceMotion || isVisible ? 'translateY(0)' : 'translateY(25px)',
                  transition: reduceMotion
                    ? 'none'
                    : `opacity 650ms cubic-bezier(0.16, 1, 0.3, 1) ${delayInSeconds}, transform 650ms cubic-bezier(0.16, 1, 0.3, 1) ${delayInSeconds}, box-shadow 0.3s ease, border-color 0.3s ease`,
                }}
                className="stat-card-animated"
              >
                <div
                  style={{
                    fontFamily: "'Source Serif 4', Georgia, serif",
                    fontSize: '3.25rem',
                    fontWeight: 700,
                    color: '#760CB0',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  <AnimatedCounter
                    targetValue={st.val}
                    duration={1600}
                    isVisible={isVisible}
                    reduceMotion={reduceMotion}
                  />
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', Arial, sans-serif",
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    color: '#555555',
                    marginTop: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {st.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .stat-card-animated:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 16px 40px rgba(118, 12, 176, 0.14) !important;
          border-color: rgba(118, 12, 176, 0.25) !important;
        }
      `}</style>
    </section>
  )
}
