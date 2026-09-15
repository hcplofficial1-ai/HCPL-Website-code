import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import ScrollCard from '../common/ScrollCard'
import CompetencyIcon from '../common/CompetencyIcon'

export default function CoreCompetenciesSection() {
  const { competencies } = useData()
  const [activeId, setActiveId] = useState('program-development')
  const [hoveredId, setHoveredId] = useState(null)

  // Filter published competencies and sort by display order
  const displayList = (competencies || [])
    .filter((c) => c.published !== false)
    .sort((a, b) => (a.order || 99) - (b.order || 99))

  return (
    <section
      style={{
        background: '#da95eb',
        color: '#210238',
        padding: '6rem 0 6.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ maxWidth: '1440px', position: 'relative', zIndex: 2 }}>
        {/* SECTION HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div
            style={{
              fontFamily: "'Inter', Arial, sans-serif",
              fontSize: '0.85rem',
              fontWeight: 900,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#210238',
              background: 'rgba(255, 255, 255, 0.45)',
              padding: '0.45rem 1.4rem',
              borderRadius: '999px',
              border: '1.5px solid rgba(255, 255, 255, 0.7)',
              display: 'inline-block',
              marginBottom: '1.2rem',
              backdropFilter: 'blur(8px)',
            }}
          >
            KEY CAPABILITIES
          </div>

          <h2
            style={{
              fontFamily: "'Inter', Arial, sans-serif",
              fontSize: 'clamp(2.8rem, 6vw, 4.2rem)',
              fontWeight: 900,
              color: '#210238',
              lineHeight: 1.1,
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
            }}
          >
            CORE COMPETENCIES
          </h2>

          <p
            style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: 'clamp(1.35rem, 2.8vw, 1.85rem)',
              fontWeight: 700,
              color: '#210238',
              maxWidth: '750px',
              margin: '0 auto 1.2rem',
              lineHeight: 1.35,
            }}
          >
            Sharing our best to help more communities succeed
          </p>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.05rem',
              color: '#320454',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.7,
              fontWeight: 600,
            }}
          >
            HIMAT Consulting combines research, technology, and sectoral expertise to strengthen humanitarian and development outcomes.
          </p>
        </div>

        {/* MCKINSEY-STYLE COMPETENCIES GRID WITH INCREASED CARD WIDTH */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '2.5rem',
          }}
          className="competencies-grid-wide"
        >
          {displayList.map((comp, idx) => {
            const compId = comp.id || comp.slug
            const hasImage = Boolean(comp.image && comp.image.trim())
            const targetUrl = comp.detailUrl || '/services'
            const isSelected = activeId === compId
            const isHovered = hoveredId === compId
            const isWhiteCard = isSelected || isHovered

            return (
              <ScrollCard key={compId} index={idx} staggerDelay={150}>
                <div
                  onClick={() => setActiveId(compId)}
                  onMouseEnter={() => setHoveredId(compId)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    background: isWhiteCard ? '#ffffff' : 'transparent',
                    borderRadius: '0px',
                    border: isWhiteCard ? '2px solid #ffffff' : '1.5px solid rgba(255, 255, 255, 0.45)',
                    boxShadow: isWhiteCard ? '0 22px 55px rgba(33, 2, 56, 0.22)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    boxSizing: 'border-box',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className={`competency-card-interactive ${isWhiteCard ? 'is-white-active' : 'is-transparent'}`}
                >
                  {/* 1. Top Image Frame (Consistent 16:9 Landscape Aspect Ratio) */}
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '16 / 9',
                      overflow: 'hidden',
                      position: 'relative',
                      background: 'linear-gradient(135deg, #32004a 0%, #760CB0 100%)',
                    }}
                  >
                    {hasImage ? (
                      <img
                        src={comp.image}
                        alt={comp.altText || comp.title}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: comp.focalPoint || 'center center',
                          display: 'block',
                          transition: 'transform 0.5s ease',
                          transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                        }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          const parent = e.currentTarget.parentElement
                          if (parent) {
                            const fallbackDiv = parent.querySelector('.placeholder-fallback')
                            if (fallbackDiv) fallbackDiv.style.display = 'flex'
                          }
                        }}
                      />
                    ) : null}

                    {/* Placeholder Fallback if image not uploaded yet */}
                    <div
                      className="placeholder-fallback"
                      style={{
                        display: hasImage ? 'none' : 'flex',
                        position: 'absolute',
                        inset: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        gap: '0.65rem',
                        background: 'linear-gradient(135deg, #32004a 0%, #5a0886 100%)',
                        color: '#ffffff',
                        padding: '1.5rem',
                        textAlign: 'center',
                      }}
                    >
                      <div
                        style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '16px',
                          background: 'rgba(255, 255, 255, 0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backdropFilter: 'blur(8px)',
                          boxShadow: '0 6px 18px rgba(0,0,0,0.2)',
                        }}
                      >
                        <CompetencyIcon id={compId} color="#ffffff" size={28} />
                      </div>
                      <span
                        style={{
                          fontFamily: "'Inter', Arial, sans-serif",
                          fontSize: '0.8125rem',
                          fontWeight: 800,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'rgba(255, 255, 255, 0.85)',
                        }}
                      >
                        {comp.category}
                      </span>
                    </div>
                  </div>

                  {/* 2. McKinsey Card Body (Title + Short Description) */}
                  <div
                    style={{
                      padding: '2.1rem 1.85rem',
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      gap: '0.9rem',
                      color: isWhiteCard ? '#212121' : '#210238',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {/* Title with Right Angle Arrow (Clickable Link) */}
                    <Link
                      to={targetUrl}
                      style={{
                        textDecoration: 'none',
                        color: isWhiteCard ? '#111111' : '#210238',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        transition: 'color 0.3s ease',
                      }}
                      className="mckinsey-title-link"
                    >
                      <h3
                        style={{
                          fontFamily: "'Inter', Arial, sans-serif",
                          fontSize: '1.4rem',
                          fontWeight: 900,
                          margin: 0,
                          lineHeight: 1.3,
                          letterSpacing: '-0.01em',
                          color: isWhiteCard ? (isHovered ? '#760CB0' : '#111111') : '#210238',
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {comp.title}
                      </h3>
                    </Link>

                    {/* Short Description */}
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.92rem',
                        color: isWhiteCard ? '#555555' : '#320454',
                        lineHeight: 1.68,
                        margin: 0,
                        fontWeight: isWhiteCard ? 400 : 550,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {comp.description}
                    </p>
                  </div>
                </div>
              </ScrollCard>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (min-width: 1100px) {
          .competencies-grid-wide {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        @media (min-width: 680px) and (max-width: 1099px) {
          .competencies-grid-wide {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 679px) {
          .competencies-grid-wide {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
