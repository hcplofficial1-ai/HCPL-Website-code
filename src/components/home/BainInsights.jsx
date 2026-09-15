import { useState } from 'react'
import { Link } from 'react-router-dom'
import ScrollCard from '../common/ScrollCard'

const INSIGHTS = [
  {
    id: 'ins-01',
    category: 'TVET & Labour Policy',
    readTime: '6 Min Read',
    title: 'Bridging the Skills Gap in Fragile & Post-Conflict Economies: Lessons from South Sudan',
    author: 'Dr. Jawad Khan, PhD & Research Directorate',
    desc: 'How targeted market diagnostics and public-private TVET linkages can accelerate youth employment absorption in developing economies.',
    year: '2025',
    link: '/reports',
    image: './images/tvet-south-sudan-briefing-bg.jpg',
  },
  {
    id: 'ins-02',
    category: 'Econometrics & Startups',
    readTime: '8 Min Read',
    title: 'Measuring Early-Stage Incubation Impact: A Difference-in-Differences Evaluation Framework',
    author: 'Prof. Dr. Tariq Mahmood, PhD',
    desc: 'Methodological approaches for isolating entrepreneurial treatment effects across heterogeneous micro-enterprise cohorts in Central Asia.',
    year: '2025',
    link: '/reports',
    image: './images/incubation-did-framework-bg.png',
  },
  {
    id: 'ins-03',
    category: 'Climate & Agronomy',
    readTime: '5 Min Read',
    title: 'Regenerative Agriculture in High-Heat Corridors: Soil Carbon & Water Stewardship Baselines',
    author: 'Engr. Kamran Farooq, MSc',
    desc: 'Empirical benchmarks from Punjab and Sindh smallholders demonstrating the economic feasibility of water-saving cotton cultivation.',
    year: '2024',
    link: '/reports',
    image: './images/regenerative-agronomy-bg.jpg',
  },
]

export default function BainInsights() {
  const [activeId, setActiveId] = useState('ins-01')
  const [hoveredId, setHoveredId] = useState(null)

  return (
    <section
      style={{
        background: '#950db7',
        color: '#ffffff',
        padding: '6rem 0 6.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ maxWidth: '1440px', position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div
            style={{
              fontFamily: "'Inter', Arial, sans-serif",
              fontSize: '0.85rem',
              fontWeight: 900,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#ffffff',
              background: 'rgba(255, 255, 255, 0.15)',
              padding: '0.45rem 1.4rem',
              borderRadius: '999px',
              border: '1.5px solid rgba(255, 255, 255, 0.3)',
              display: 'inline-block',
              marginBottom: '1.2rem',
              backdropFilter: 'blur(8px)',
            }}
          >
            INSIGHTS & INTELLIGENCE
          </div>

          <h2
            style={{
              fontFamily: "'Inter', Arial, sans-serif",
              fontSize: 'clamp(2.8rem, 6vw, 4.2rem)',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.1,
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
            }}
          >
            EXECUTIVE POLICY BRIEFINGS & PUBLICATIONS
          </h2>

          <p
            style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: 'clamp(1.35rem, 2.8vw, 1.85rem)',
              fontWeight: 700,
              color: 'rgba(255, 255, 255, 0.88)',
              maxWidth: '750px',
              margin: '0 auto 1.2rem',
              lineHeight: 1.35,
            }}
          >
            Thought leadership, econometric methodologies, and evidence-based policy frameworks
          </p>
        </div>

        {/* 3-Column Visual Cards with Same Rectangles & Photo/Text Portion */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '2.5rem',
          }}
          className="insights-grid-wide"
        >
          {INSIGHTS.map((ins, idx) => {
            const isSelected = activeId === ins.id
            const isHovered = hoveredId === ins.id
            const isWhiteCard = isSelected || isHovered

            return (
              <ScrollCard key={ins.id} index={idx} staggerDelay={350} animation="pop" duration={700}>
                <div
                  onClick={() => setActiveId(ins.id)}
                  onMouseEnter={() => setHoveredId(ins.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    background: isWhiteCard ? '#ffffff' : 'rgba(255, 255, 255, 0.06)',
                    borderRadius: '0px',
                    border: isWhiteCard ? '2px solid #ffffff' : '1.5px solid rgba(255, 255, 255, 0.35)',
                    boxShadow: isWhiteCard ? '0 22px 55px rgba(0, 0, 0, 0.28)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    boxSizing: 'border-box',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className={`insight-card-interactive ${isWhiteCard ? 'is-white-active' : 'is-transparent'}`}
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
                    <img
                      src={ins.image}
                      alt={ins.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center center',
                        display: 'block',
                        transition: 'transform 0.5s ease',
                        transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                      }}
                    />
                  </div>

                  {/* 2. Card Body (Title + Author + Description) */}
                  <div
                    style={{
                      padding: '2.1rem 1.85rem',
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      gap: '0.9rem',
                      color: isWhiteCard ? '#212121' : '#ffffff',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {/* Category & Read Time */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span
                        style={{
                          background: isWhiteCard ? 'rgba(149, 13, 183, 0.1)' : 'rgba(255, 255, 255, 0.2)',
                          color: isWhiteCard ? '#950db7' : '#ffffff',
                          fontFamily: "'Inter', Arial, sans-serif",
                          fontWeight: 800,
                          fontSize: '0.8125rem',
                          padding: '0.3rem 0.75rem',
                          borderRadius: '999px',
                        }}
                      >
                        {ins.category}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.8125rem',
                          color: isWhiteCard ? '#777777' : 'rgba(255, 255, 255, 0.75)',
                          fontWeight: 600,
                        }}
                      >
                        {ins.readTime}
                      </span>
                    </div>

                    {/* Title with Right Angle Arrow */}
                    <Link
                      to={ins.link}
                      style={{
                        textDecoration: 'none',
                        color: isWhiteCard ? '#111111' : '#ffffff',
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
                          color: isWhiteCard ? (isHovered ? '#950db7' : '#111111') : '#ffffff',
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {ins.title}
                      </h3>
                    </Link>

                    {/* Author Tag */}
                    <div
                      style={{
                        fontSize: '0.85rem',
                        color: isWhiteCard ? '#950db7' : 'rgba(255, 255, 255, 0.95)',
                        fontWeight: 700,
                        fontFamily: "'Inter', Arial, sans-serif",
                      }}
                    >
                      By {ins.author}
                    </div>

                    {/* Short Description */}
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.92rem',
                        color: isWhiteCard ? '#555555' : 'rgba(255, 255, 255, 0.85)',
                        lineHeight: 1.68,
                        margin: 0,
                        fontWeight: 400,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {ins.desc}
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
          .insights-grid-wide {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        @media (min-width: 680px) and (max-width: 1099px) {
          .insights-grid-wide {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 679px) {
          .insights-grid-wide {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
