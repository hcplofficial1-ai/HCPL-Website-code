import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SHOWCASE_TABS = [
  {
    id: 'research',
    title: 'Research that reveals what matters',
    targetHash: '#domain-research',
  },
  {
    id: 'impact',
    title: 'Measuring change, strengthening results',
    targetHash: '#domain-impact',
  },
  {
    id: 'policy',
    title: 'Policy and digital systems built for action',
    targetHash: '#domain-policy',
  },
  {
    id: 'sectors',
    title: 'Sixteen sectors. One integrated perspective.',
    targetHash: '#domain-thematic-sectors',
  },
]

export default function PortfolioCapabilities({ videoSrc = '/DSC_0013.MOV' }) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState('0:00')
  const [duration, setDuration] = useState('0:00')
  const [progress, setProgress] = useState(0)
  const videoRef = useRef(null)

  const formatTime = (secs) => {
    if (isNaN(secs)) return '0:00'
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  const handlePlayToggle = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleTimeUpdate = () => {
    if (!videoRef.current) return
    const cur = videoRef.current.currentTime
    const dur = videoRef.current.duration
    setCurrentTime(formatTime(cur))
    if (dur) {
      setProgress((cur / dur) * 100)
    }
  }

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return
    setDuration(formatTime(videoRef.current.duration))
  }

  const handleNavigateToPortfolio = (hash = '') => {
    navigate(`/portfolio${hash}`)
  }

  return (
    <section
      id="portfolio-thematic-domains-section"
      style={{
        background: '#7e1997',
        color: '#ffffff',
        padding: '5.5rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ maxWidth: 'min(1560px, 94vw)', margin: '0 auto', padding: '0 clamp(1.25rem, 3vw, 2.5rem)', position: 'relative', zIndex: 2 }}>
        
        {/* ============================================================
            1. MCKINSEY-STYLE SHOWCASE CARD (HERO FEATURE FOR PORTFOLIO)
            ============================================================ */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '4px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.28)',
            overflow: 'hidden',
            marginBottom: '2.5rem',
            color: '#111827',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              alignItems: 'stretch',
            }}
          >
            {/* Left Content Side */}
            <div
              style={{
                padding: 'clamp(2.5rem, 5vw, 4.5rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxSizing: 'border-box',
              }}
            >
              {/* Eyebrow */}
              <div
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#64748b',
                  marginBottom: '1.25rem',
                  fontFamily: 'var(--font-sans, "Inter", sans-serif)',
                }}
              >
                HCPL CAPABILITIES · 2026
              </div>

              {/* Main Headline (Directs to /portfolio) */}
              <h2
                onClick={() => handleNavigateToPortfolio('')}
                style={{
                  fontFamily: 'var(--font-sans, "Inter", sans-serif)',
                  fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)',
                  fontWeight: 600,
                  lineHeight: 1.18,
                  color: '#0f172a',
                  marginBottom: '1.5rem',
                  letterSpacing: '-0.025em',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#7e1997' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#0f172a' }}
              >
                From evidence to impact: 16+ years across 16 development sectors{' '}
                <span style={{ color: '#7e1997', display: 'inline-block', transition: 'transform 0.2s ease' }}>›</span>
              </h2>

              {/* Short Descriptive Paragraph */}
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.15vw, 1.125rem)',
                  lineHeight: 1.65,
                  color: '#475569',
                  marginBottom: '2.5rem',
                  fontFamily: 'var(--font-sans, "Inter", sans-serif)',
                  fontWeight: 400,
                }}
              >
                HCPL combines rigorous research, evaluation, policy expertise, and digital systems to transform complex development challenges into practical and measurable solutions.
              </p>

              {/* Call to Action Button: Directs to /portfolio */}
              <div>
                <Link
                  to="/portfolio"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    background: '#7e1997',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                    padding: '0.9rem 2.25rem',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(126, 25, 151, 0.3)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#610c75'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(126, 25, 151, 0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#7e1997'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(126, 25, 151, 0.3)'
                  }}
                >
                  <span>Explore Our Portfolio</span>
                  <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>›</span>
                </Link>
              </div>
            </div>

            {/* Right Video Showcase with McKinsey UI Elements */}
            <div
              style={{
                position: 'relative',
                background: '#090d16',
                minHeight: '380px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <video
                ref={videoRef}
                src={videoSrc}
                preload="metadata"
                playsInline
                controls={isPlaying}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              {/* McKinsey Style Overlay (Shown when paused) */}
              {!isPlaying && (
                <div
                  onClick={handlePlayToggle}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.4) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '1.5rem',
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                  }}
                >
                  {/* Top Right Information Icon */}
                  <div style={{ alignSelf: 'flex-end' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(0,0,0,0.4)',
                        border: '1.5px solid rgba(255,255,255,0.75)',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                      }}
                    >
                      ℹ
                    </div>
                  </div>

                  {/* Centered Large McKinsey Play Button */}
                  <div style={{ alignSelf: 'center', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <div
                      style={{
                        width: '76px',
                        height: '76px',
                        borderRadius: '50%',
                        background: '#ffffff',
                        color: '#0f172a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.45)',
                        transition: 'transform 0.25s ease',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="#0f172a" style={{ marginLeft: '4px' }}>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom Video Progress Bar & Duration Overlay */}
                  <div>
                    <div
                      style={{
                        width: '100%',
                        height: '3px',
                        background: 'rgba(255,255,255,0.3)',
                        borderRadius: '2px',
                        marginBottom: '0.6rem',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: `${progress}%`,
                          height: '100%',
                          background: '#ffffff',
                          transition: 'width 0.1s linear',
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ffffff', fontSize: '0.8125rem', fontFamily: 'var(--font-sans, "Inter", sans-serif)', fontWeight: 600 }}>
                      <span>{currentTime}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span>{duration !== '0:00' ? duration : '0:25'}</span>
                        <span>🔊</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ============================================================
            2. FOUR BOTTOM NAVIGATION / LINK CARDS (Directs to /portfolio)
            ============================================================ */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {SHOWCASE_TABS.map((tab, idx) => {
            const isActive = activeTab === idx
            return (
              <div
                key={tab.id}
                onClick={() => {
                  setActiveTab(idx)
                  handleNavigateToPortfolio(tab.targetHash)
                }}
                style={{
                  cursor: 'pointer',
                  paddingTop: '0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  transition: 'opacity 0.2s ease, transform 0.2s ease',
                  opacity: isActive ? 1 : 0.85,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.opacity = '0.85'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {/* Horizontal Progress / Indicator Bar */}
                <div
                  style={{
                    width: '100%',
                    height: '4px',
                    background: isActive ? '#38bdf8' : 'rgba(255, 255, 255, 0.4)',
                    borderRadius: '2px',
                    transition: 'all 0.3s ease',
                    boxShadow: isActive ? '0 0 10px rgba(56, 189, 248, 0.6)' : 'none',
                  }}
                />

                {/* Card Text */}
                <p
                  style={{
                    fontFamily: 'var(--font-sans, "Inter", sans-serif)',
                    fontSize: '1.05rem',
                    fontWeight: isActive ? 700 : 500,
                    lineHeight: 1.45,
                    color: '#ffffff',
                    margin: 0,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {tab.title}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}