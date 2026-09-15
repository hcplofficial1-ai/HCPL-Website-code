import { useEffect, useRef } from 'react'
import { useData } from '../../context/DataContext'

export default function HeroInteractiveVisual() {
  const { projects = [], team = [] } = useData()
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    const onResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', onResize)

    // Particle nodes for data network
    const particleCount = 28
    const particles = []
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2.5 + 2,
        color: i % 3 === 0 ? 'rgba(118, 12, 176, 0.75)' : i % 3 === 1 ? 'rgba(168, 85, 247, 0.65)' : 'rgba(90, 8, 134, 0.55)',
      })
    }

    let mouse = { x: null, y: null }
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onMouseLeave = () => {
      mouse.x = null
      mouse.y = null
    }

    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw connecting lines between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.35
            ctx.strokeStyle = `rgba(118, 12, 176, ${alpha})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw and update particles
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        // Mouse interaction attraction
        if (mouse.x !== null && mouse.y !== null) {
          const mdx = mouse.x - p.x
          const mdy = mouse.y - p.y
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy)
          if (mDist < 100) {
            p.x += mdx * 0.02
            p.y += mdy * 0.02
          }
        }

        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', onResize)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '460px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className="hero-visual-container"
    >
      {/* Background ambient lighting aura */}
      <div
        style={{
          position: 'absolute',
          width: '380px',
          height: '380px',
          background: 'radial-gradient(circle, rgba(118,12,176,0.14) 0%, rgba(168,85,247,0.06) 50%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(30px)',
          pointerEvents: 'none',
        }}
      />

      {/* Interactive Particle Network Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          borderRadius: '28px',
          pointerEvents: 'auto',
          zIndex: 1,
        }}
      />

      {/* Main Glassmorphism Central Control Showcase */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '88%',
          maxWidth: '420px',
          background: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '24px',
          border: '1.5px solid rgba(118, 12, 176, 0.16)',
          boxShadow: '0 20px 50px rgba(118, 12, 176, 0.14), 0 4px 16px rgba(0,0,0,0.04)',
          padding: '1.75rem',
          transition: 'all 0.4s ease',
        }}
        className="hero-center-glass-card"
      >
        {/* Header with live pulse indicator */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#22c55e',
                boxShadow: '0 0 0 3px rgba(34, 197, 94, 0.25)',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: "'Inter', Arial, sans-serif",
                fontSize: '0.8125rem',
                fontWeight: 800,
                color: '#760CB0',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Live Mission Intelligence
            </span>
          </div>
          <span
            style={{
              background: 'rgba(118,12,176,0.08)',
              color: '#760CB0',
              fontFamily: "'Inter', Arial, sans-serif",
              fontWeight: 800,
              fontSize: '0.8125rem',
              padding: '0.2rem 0.55rem',
              borderRadius: '999px',
            }}
          >
            16+ Years
          </span>
        </div>

        {/* Big Metric Highlight */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span
              style={{
                fontFamily: "'Source Serif 4', Georgia, serif",
                fontSize: '2.75rem',
                fontWeight: 700,
                color: '#212121',
                lineHeight: 1,
              }}
            >
              {projects.length}
            </span>
            <span
              style={{
                fontFamily: "'Inter', Arial, sans-serif",
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#760CB0',
              }}
            >
              Completed Assignments
            </span>
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', color: '#666', margin: '0.25rem 0 0', lineHeight: 1.5 }}>
            Evidence-based evaluations across UN agencies, World Bank, bilateral donors & governments.
          </p>
        </div>

        {/* Global Hubs Pills */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '0.8125rem', fontWeight: 800, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.45rem' }}>
            Active Country Corridors
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {[
              { flag: '🇵🇰', name: 'Pakistan HQ' },
              { flag: '🇺🇸', name: 'USA Office' },
              { flag: '🇹🇯', name: 'Tajikistan' },
              { flag: '🇦🇫', name: 'Afghanistan' },
            ].map((hub) => (
              <span
                key={hub.name}
                style={{
                  background: '#faf5ff',
                  border: '1px solid rgba(118,12,176,0.1)',
                  color: '#424242',
                  fontFamily: "'Inter', Arial, sans-serif",
                  fontWeight: 700,
                  fontSize: '0.8125rem',
                  padding: '0.25rem 0.6rem',
                  borderRadius: '8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
              >
                <span>{hub.flag}</span>
                <span>{hub.name}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Quality Standard Bar */}
        <div style={{ background: '#faf5ff', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid rgba(118,12,176,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.35rem' }}>
            <span style={{ color: '#212121', fontFamily: "'Inter', Arial, sans-serif" }}>OECD-DAC Evaluation Rigor</span>
            <span style={{ color: '#760CB0', fontFamily: "'Inter', Arial, sans-serif" }}>100% Aligned</span>
          </div>
          <div style={{ height: '6px', width: '100%', background: 'rgba(118,12,176,0.12)', borderRadius: '999px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: '100%',
                background: 'linear-gradient(90deg, #760CB0 0%, #a855f7 100%)',
                borderRadius: '999px',
              }}
            />
          </div>
        </div>
      </div>

      {/* Floating Pill Badge (Top Left) */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '-10px',
          zIndex: 3,
          background: '#ffffff',
          borderRadius: '16px',
          padding: '0.65rem 1rem',
          border: '1.5px solid rgba(118,12,176,0.14)',
          boxShadow: '0 12px 30px rgba(118,12,176,0.12)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          animation: 'floatSlow 4.5s ease-in-out infinite alternate',
        }}
        className="floating-metric-badge-1"
      >
        <span style={{ fontSize: '1.25rem' }}>📊</span>
        <div>
          <div style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '0.8125rem', fontWeight: 800, color: '#212121', lineHeight: 1.1 }}>
            58+ Institutional Clients
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', color: '#760CB0', fontWeight: 600 }}>
            UN · World Bank · EU · USAID
          </div>
        </div>
      </div>

      {/* Floating Pill Badge (Bottom Right) */}
      <div
        style={{
          position: 'absolute',
          bottom: '15px',
          right: '-10px',
          zIndex: 3,
          background: '#ffffff',
          borderRadius: '16px',
          padding: '0.65rem 1rem',
          border: '1.5px solid rgba(118,12,176,0.14)',
          boxShadow: '0 12px 30px rgba(118,12,176,0.12)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          animation: 'floatSlow 5.5s ease-in-out infinite alternate-reverse',
        }}
        className="floating-metric-badge-2"
      >
        <span style={{ fontSize: '1.25rem' }}>🔬</span>
        <div>
          <div style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '0.8125rem', fontWeight: 800, color: '#212121', lineHeight: 1.1 }}>
            Digital Survey Systems
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', color: '#22c55e', fontWeight: 700 }}>
            ● Real-Time Data Pipelines
          </div>
        </div>
      </div>
    </div>
  )
}
