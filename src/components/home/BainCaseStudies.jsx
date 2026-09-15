import { useState } from 'react'
import { Link } from 'react-router-dom'
import ScrollCard from '../common/ScrollCard'

const CASE_STUDIES = [
  {
    id: 'cs-01',
    client: 'UNICEF South Sudan',
    logo: './logos/unicef.png',
    category: 'Labour Markets & TVET',
    title: 'Transforming Youth Employment Gaps Across 4 Conflict Corridors',
    stat: '+78%',
    statLabel: 'Employer Job Absorption Demand Identified',
    desc: 'Led a landmark 4-state diagnostic evaluating vocational skills mismatches, employer hiring requirements, and socio-economic integration for returning youth.',
    link: '/reports',
    image: './images/unicef-south-sudan-bg.jpg',
  },
  {
    id: 'cs-02',
    client: 'Aga Khan Foundation (AKF)',
    logo: './logos/akf.jpg',
    category: 'Enterprise & Startups',
    title: 'Accelerating 450+ High-Impact Startups Across Central & South Asia',
    stat: '+42%',
    statLabel: 'Average Enterprise Revenue Increase Over 3 Years',
    desc: 'Delivered an econometric Difference-in-Differences (DiD) evaluation tracking capital incubation across Kazakhstan, Tajikistan, Afghanistan, and Pakistan.',
    link: '/reports',
    image: './images/akf-startups-bg.png',
  },
  {
    id: 'cs-03',
    client: 'World Bank & SED Sindh',
    logo: './logos/worldbank.png',
    category: 'Education & Gender Parity',
    title: 'Strengthening Early Learning & School Safety in 12 Priority Districts',
    stat: '0.88',
    statLabel: 'Gender Parity Index Achieved in Targeted Schools',
    desc: 'Conducted a comprehensive process evaluation measuring classroom infrastructure, female teacher retention, and conditional cash grant disbursements.',
    link: '/certificates',
    image: './images/education-gender-parity-bg.jpg',
  },
]

export default function BainCaseStudies() {
  const [activeId, setActiveId] = useState('cs-01')
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
              background: 'rgba(255, 255, 255, 0.25)',
              padding: '0.45rem 1.4rem',
              borderRadius: '999px',
              border: '1.5px solid rgba(255, 255, 255, 0.45)',
              display: 'inline-block',
              marginBottom: '1.2rem',
              backdropFilter: 'blur(8px)',
            }}
          >
            CLIENT RESULTS & PROVEN IMPACT
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
            FEATURED CASE STUDIES IN ACTION
          </h2>

          <p
            style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: 'clamp(1.35rem, 2.8vw, 1.85rem)',
              fontWeight: 700,
              color: 'rgba(255, 255, 255, 0.95)',
              maxWidth: '750px',
              margin: '0 auto 1.2rem',
              lineHeight: 1.35,
            }}
          >
            Empirical evidence and field-verified outcomes delivered for international development partners
          </p>
        </div>

        {/* 3-Column Visual Cards with Same Rectangles & Photo/Text Portion */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '2.5rem',
          }}
          className="case-studies-grid-wide"
        >
          {CASE_STUDIES.map((cs, idx) => {
            const isSelected = activeId === cs.id
            const isHovered = hoveredId === cs.id
            const isWhiteCard = isSelected || isHovered

            return (
              <ScrollCard key={cs.id} index={idx} staggerDelay={450} direction="left" duration={850}>
                <div
                  onClick={() => setActiveId(cs.id)}
                  onMouseEnter={() => setHoveredId(cs.id)}
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
                  className={`case-study-card-interactive case-study-drift-${(idx % 3) + 1} ${isWhiteCard ? 'is-white-active' : 'is-transparent'}`}
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
                      src={cs.image}
                      alt={cs.title}
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

                  {/* 2. Card Body (Title + Short Description + Metric) */}
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
                    {/* Header Client & Category */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <div
                          style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '8px',
                            background: '#fff',
                            border: '1px solid rgba(118,12,176,0.15)',
                            padding: '3px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                          }}
                        >
                          <img
                            src={cs.logo}
                            alt={cs.client}
                            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }}
                          />
                        </div>
                        <div>
                          <div style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '0.8125rem', fontWeight: 800, color: isWhiteCard ? '#760CB0' : 'rgba(255, 255, 255, 0.9)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            {cs.category}
                          </div>
                          <div style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '0.9rem', fontWeight: 800, color: isWhiteCard ? '#212121' : '#ffffff' }}>
                            {cs.client}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Title with Right Angle Arrow */}
                    <Link
                      to={cs.link}
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
                          color: isWhiteCard ? (isHovered ? '#760CB0' : '#111111') : '#ffffff',
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {cs.title}
                      </h3>
                    </Link>

                    {/* Impact Stat Box */}
                    <div
                      style={{
                        background: isWhiteCard ? '#faf5ff' : 'rgba(255, 255, 255, 0.18)',
                        borderRadius: '0px',
                        padding: '1rem 1.2rem',
                        border: isWhiteCard ? '1px solid rgba(118, 12, 176, 0.12)' : '1px solid rgba(255, 255, 255, 0.3)',
                        transition: 'background 0.3s ease',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Source Serif 4', Georgia, serif",
                          fontSize: '2.2rem',
                          fontWeight: 700,
                          color: isWhiteCard ? '#760CB0' : '#ffffff',
                          lineHeight: 1,
                        }}
                      >
                        {cs.stat}
                      </div>
                      <div style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '0.8125rem', fontWeight: 700, color: isWhiteCard ? '#666' : 'rgba(255, 255, 255, 0.85)', marginTop: '0.35rem' }}>
                        {cs.statLabel}
                      </div>
                    </div>

                    {/* Short Description */}
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.92rem',
                        color: isWhiteCard ? '#555555' : 'rgba(255, 255, 255, 0.95)',
                        lineHeight: 1.68,
                        margin: 0,
                        fontWeight: isWhiteCard ? 400 : 500,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {cs.desc}
                    </p>
                  </div>
                </div>
              </ScrollCard>
            )
          })}
        </div>
      </div>

      {/* Ambient Drifting Background Glow Orbs */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '5%',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 70%)',
          pointerEvents: 'none',
          animation: 'ambientDrift1 12s ease-in-out infinite alternate',
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '8%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0) 70%)',
          pointerEvents: 'none',
          animation: 'ambientDrift2 15s ease-in-out infinite alternate',
          zIndex: 1,
        }}
      />

      <style>{`
        /* Drift Animations for Featured Case Studies Cards */
        .case-study-drift-1 {
          animation: cardDrift1 6s ease-in-out infinite alternate;
        }

        .case-study-drift-2 {
          animation: cardDrift2 7.5s ease-in-out 0.8s infinite alternate;
        }

        .case-study-drift-3 {
          animation: cardDrift3 6.8s ease-in-out 1.5s infinite alternate;
        }

        .case-study-card-interactive:hover {
          animation-play-state: paused !important;
          transform: translateY(-10px) scale(1.02) !important;
          box-shadow: 0 26px 65px rgba(0, 0, 0, 0.35) !important;
        }

        @keyframes cardDrift1 {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) translateX(2px) rotate(0.2deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }

        @keyframes cardDrift2 {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) translateX(-3px) rotate(-0.25deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }

        @keyframes cardDrift3 {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-7px) translateX(3px) rotate(0.2deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }

        @keyframes ambientDrift1 {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          50% {
            transform: translate(40px, 25px) scale(1.1);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes ambientDrift2 {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          50% {
            transform: translate(-35px, -30px) scale(1.08);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @media (min-width: 1100px) {
          .case-studies-grid-wide {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        @media (min-width: 680px) and (max-width: 1099px) {
          .case-studies-grid-wide {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 679px) {
          .case-studies-grid-wide {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
