import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../../context/DataContext'

export function CircularArrowButton({ to = '/contact', title = 'Explore' }) {
  return (
    <Link
      to={to}
      title={title}
      style={{
        width: '52px',
        height: '52px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.18)',
        border: '1.5px solid rgba(255, 255, 255, 0.4)',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.35rem',
        textDecoration: 'none',
        transition: 'all 0.25s ease',
        flexShrink: 0,
      }}
      className="mckinsey-circle-arrow-btn"
    >
      →
    </Link>
  )
}

export function HeroIntro({
  label = 'PAKISTAN-ROOTED • INTERNATIONALLY EXPERIENCED • SINCE 2009',
  heading = null,
  paragraph = 'HIMAT Consulting delivers independent research, monitoring, evaluation and advisory services that help governments, UN agencies, donors and development partners understand complex challenges, strengthen programmes and achieve measurable results.',
  ctaTo = '/projects',
  ctaText = 'Explore Our Work',
}) {
  const { projects = [] } = useData()
  const [isWorkHovered, setIsWorkHovered] = useState(false)
  const [isDiscussHovered, setIsDiscussHovered] = useState(false)
  const displayHeading = heading || (
    <>
      Local Insights.
      <br />
      Global Standards.
      <br />
      <span style={{ color: '#fff', fontStyle: 'italic' }}>Transformative Impact.</span>
    </>
  )

  return (
    <div className="hero-intro-block" style={{ maxWidth: '820px' }}>
      {/* Small Eyebrow Badge with Green Dot */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.65rem',
          background: 'rgba(255, 255, 255, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          color: '#ffffff',
          fontFamily: "'Inter', Arial, sans-serif",
          fontSize: '0.8rem',
          fontWeight: 800,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          padding: '0.45rem 1.1rem',
          borderRadius: '999px',
          marginBottom: '1.5rem',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#4ade80',
            boxShadow: '0 0 10px #4ade80',
            display: 'inline-block',
          }}
        />
        <span>{label}</span>
      </div>

      {/* Heading */}
      <h1
        style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: 'clamp(3rem, 5.8vw, 4.8rem)',
          fontWeight: 700,
          lineHeight: 1.08,
          color: '#ffffff',
          marginBottom: '1.25rem',
          letterSpacing: '-0.02em',
          textShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
        }}
      >
        {displayHeading}
      </h1>

      {/* Supporting Paragraph */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '1.12rem',
          color: 'rgba(255, 255, 255, 0.95)',
          lineHeight: 1.75,
          maxWidth: '640px',
          marginBottom: '2rem',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.35)',
        }}
      >
        {paragraph}
      </p>

      {/* Action Links */}
      <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
        <Link
          to={ctaTo}
          onMouseEnter={() => setIsWorkHovered(true)}
          onMouseLeave={() => setIsWorkHovered(false)}
          style={{
            background: isWorkHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.12)',
            color: isWorkHovered ? '#760CB0' : '#ffffff',
            fontFamily: "'Inter', Arial, sans-serif",
            fontWeight: 800,
            fontSize: '0.95rem',
            padding: '0.9rem 2.2rem',
            borderRadius: '10px',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            border: isWorkHovered ? '1.5px solid #ffffff' : '1.5px solid rgba(255, 255, 255, 0.45)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: isWorkHovered ? '0 12px 32px rgba(0, 0, 0, 0.35)' : 'none',
            transform: isWorkHovered ? 'translateY(-2px)' : 'translateY(0)',
            transition: 'all 0.25s ease',
          }}
          className="hero-btn-primary"
        >
          <span>{ctaText}</span>
        </Link>
        <Link
          to="/contact"
          onMouseEnter={() => setIsDiscussHovered(true)}
          onMouseLeave={() => setIsDiscussHovered(false)}
          style={{
            background: isDiscussHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.12)',
            color: isDiscussHovered ? '#760CB0' : '#ffffff',
            fontFamily: "'Inter', Arial, sans-serif",
            fontWeight: 700,
            fontSize: '0.95rem',
            padding: '0.9rem 2rem',
            borderRadius: '10px',
            textDecoration: 'none',
            border: isDiscussHovered ? '1.5px solid #ffffff' : '1.5px solid rgba(255, 255, 255, 0.45)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: isDiscussHovered ? '0 12px 32px rgba(0, 0, 0, 0.35)' : 'none',
            transform: isDiscussHovered ? 'translateY(-2px)' : 'translateY(0)',
            transition: 'all 0.25s ease',
          }}
          className="hero-btn-secondary"
        >
          <span>Discuss an Assignment</span>
        </Link>
      </div>

      {/* Credibility Strip */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          flexWrap: 'wrap',
          paddingTop: '1.75rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.22)',
        }}
      >
        {[
          'Since 2009',
          `${projects.length} Documented Assignments`,
          '5-Country Experience',
          '58+ Institutional Clients',
        ].map((b) => (
          <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
            <span style={{ color: '#4ade80', fontWeight: 900, fontSize: '1rem' }}>✓</span>
            <span style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '0.85rem', color: '#ffffff', fontWeight: 700, textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
              {b}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function HomepageHero() {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.defaultMuted = true

    const attemptPlay = () => {
      const p = video.play()
      if (p !== undefined) {
        p.catch(() => {
          video.muted = true
          video.play().catch(() => {})
        })
      }
    }

    attemptPlay()

    // Resilient continuous loop & stall auto-recovery
    const handleLoop = () => {
      video.currentTime = 0
      attemptPlay()
    }

    const handleStall = () => {
      if (video.paused) {
        attemptPlay()
      }
    }

    video.addEventListener('ended', handleLoop)
    video.addEventListener('stalled', handleStall)
    video.addEventListener('waiting', handleStall)

    return () => {
      video.removeEventListener('ended', handleLoop)
      video.removeEventListener('stalled', handleStall)
      video.removeEventListener('waiting', handleStall)
    }
  }, [])

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#32004a',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        padding: '7.5rem 0 4.5rem',
        boxSizing: 'border-box',
      }}
    >
      {/* Full-Width Background Video Element */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
          zIndex: 1,
        }}
        className="hero-background-video"
      >
        <source src="/videos/hero-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Purple Gradient Overlay (~75% Opacity Left, ~35% Opacity Right) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(38, 0, 60, 0.88) 0%, rgba(76, 8, 120, 0.72) 45%, rgba(45, 0, 70, 0.38) 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Additional Subtle Top & Bottom Vignettes for Premium Depth */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(20, 0, 35, 0.45) 0%, transparent 35%, rgba(20, 0, 35, 0.55) 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Text Content Container Above Video */}
      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        <HeroIntro />
      </div>

      <style>{`
        .mckinsey-circle-arrow-btn:hover {
          background: #ffffff !important;
          color: #760CB0 !important;
          transform: scale(1.1);
        }

        .btn-white-square:hover {
          background: #f3e8ff !important;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .hero-background-video {
            display: block;
          }
        }
      `}</style>
    </section>
  )
}
