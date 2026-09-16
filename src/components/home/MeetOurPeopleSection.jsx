import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function MeetOurPeopleSection({
  videoSrc = '/our-people.mp4',
  posterSrc = '',
  title = 'Meet our people',
  eyebrow = 'OUR PEOPLE',
  description = 'We look for people who are energized by the same things as our clients: bold thinking, real impact, and the courage to move first.',
  buttonText = 'Meet our people',
  buttonLink = '/team',
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef(null)
  const sectionRef = useRef(null)

  // IntersectionObserver: Auto-play when scrolled into view, pause when scrolled away
  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            video.muted = isMuted
            video
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => {
                // In case browser requires muted playback
                video.muted = true
                setIsMuted(true)
                video.play().then(() => setIsPlaying(true)).catch(() => {})
              })
          } else {
            video.pause()
            setIsPlaying(false)
          }
        })
      },
      {
        threshold: [0, 0.25, 0.5, 0.75],
        rootMargin: '0px 0px -50px 0px',
      }
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
    }
  }, [isMuted])

  const handlePlayToggle = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {})
    }
  }

  const handleSoundToggle = (e) => {
    e.stopPropagation()
    if (!videoRef.current) return
    const nextMuted = !isMuted
    videoRef.current.muted = nextMuted
    setIsMuted(nextMuted)
  }

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#ffffff',
        padding: '5.5rem 0',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid #f1f5f9',
        borderBottom: '1px solid #f1f5f9',
      }}
    >
      <div className="container" style={{ maxWidth: 'min(1560px, 94vw)', margin: '0 auto', padding: '0 clamp(1.25rem, 3vw, 2.5rem)' }}>
        {/* Eyebrow */}
        <div style={{ textAlign: 'center', marginBottom: '2.75rem' }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: '0.8125rem',
              fontWeight: 800,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#0f172a',
              fontFamily: 'var(--font-sans, "Inter", sans-serif)',
            }}
          >
            {eyebrow}
          </span>
        </div>

        {/* 2-Column Content Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Heading, Short Description, and Link Button */}
          <div style={{ maxWidth: '540px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-sans, "Inter", sans-serif)',
                fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
                fontWeight: 500,
                lineHeight: 1.18,
                color: '#760CB0',
                marginBottom: '1.25rem',
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </h2>

            <p
              style={{
                fontSize: 'clamp(1rem, 1.1vw, 1.0625rem)',
                lineHeight: 1.65,
                color: '#334155',
                marginBottom: '2.25rem',
                fontFamily: 'var(--font-sans, "Inter", sans-serif)',
                fontWeight: 400,
              }}
            >
              {description}
            </p>

            <Link
              to={buttonLink}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                background: '#760CB0',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.9375rem',
                padding: '0.875rem 2.25rem',
                borderRadius: '4px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(118, 12, 176, 0.25)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#5a0886'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(118, 12, 176, 0.35)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#760CB0'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(118, 12, 176, 0.25)'
              }}
            >
              <span>{buttonText}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Right Column: Video Container with Offset Decorative Accent Block */}
          <div style={{ position: 'relative', width: '100%', paddingRight: '1.25rem', paddingTop: '1.25rem' }}>
            {/* Theme Purple Offset Accent Block */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '65%',
                height: '80%',
                background: '#760CB0',
                borderRadius: '4px',
                zIndex: 1,
                opacity: 0.95,
              }}
            />

            {/* Video Frame Card */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 16px 40px rgba(0,0,0,0.2)',
                background: '#0f172a',
                aspectRatio: '16 / 9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              onClick={handlePlayToggle}
            >
              <video
                ref={videoRef}
                src={videoSrc}
                poster={posterSrc || undefined}
                preload="auto"
                playsInline
                muted={isMuted}
                loop
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

              {/* Sound Toggle Button (Bottom Right) */}
              <button
                type="button"
                onClick={handleSoundToggle}
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                style={{
                  position: 'absolute',
                  bottom: '1rem',
                  right: '1rem',
                  zIndex: 10,
                  background: 'rgba(0, 0, 0, 0.65)',
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  borderRadius: '50%',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#760CB0'
                  e.currentTarget.style.borderColor = '#ffffff'
                  e.currentTarget.style.transform = 'scale(1.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.65)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                {isMuted ? '🔇' : '🔊'}
              </button>

              {/* Play / Pause State Icon (Visible when paused) */}
              {!isPlaying && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    border: '2px solid rgba(255, 255, 255, 0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
                    zIndex: 5,
                  }}
                  title="Play video"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#ffffff"
                    style={{ marginLeft: '3px' }}
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}