import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function OurPurpose() {
  const navigate = useNavigate()
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mediaQuery.matches)
  }, [])

  const items = [
    {
      id: 'vision',
      badge: 'STRATEGIC DIRECTION',
      icon: '👁️',
      title: 'Our Vision',
      text: 'To lead impact-driven consulting through inclusive, context-responsive, and evidence-based solutions.',
      gradient: 'linear-gradient(135deg, #ffffff 0%, #faf5ff 100%)',
      borderColor: 'rgba(118,12,176,0.18)',
      iconBg: 'linear-gradient(135deg, #760CB0 0%, #9a2fd4 100%)',
      textColor: '#212121',
      subTextColor: '#424242',
      delay: reduceMotion ? '0s' : '0s',
    },
    {
      id: 'mission',
      badge: 'OPERATIONAL MANDATE',
      icon: '🎯',
      title: 'Our Mission',
      text: 'Transforming humanitarian and development challenges into opportunities by localizing global standards through evidence-based solutions for inclusive impact.',
      gradient: 'linear-gradient(135deg, #ffffff 0%, #faf5ff 100%)',
      borderColor: 'rgba(118,12,176,0.18)',
      iconBg: 'linear-gradient(135deg, #760CB0 0%, #9a2fd4 100%)',
      textColor: '#212121',
      subTextColor: '#424242',
      delay: reduceMotion ? '0s' : '0.2s',
    },
    {
      id: 'motto',
      badge: 'CORE OPERATING MOTTO',
      icon: '🔥',
      title: 'Our Motto',
      mottoLines: ['Local Insight.', 'Global Standards.', 'Real Impact.'],
      subtext: 'Grounded in OECD-DAC evaluation standards and deep-rooted community partnerships since 2009.',
      gradient: 'linear-gradient(145deg, #760CB0 0%, #5a0886 100%)',
      borderColor: 'rgba(255,255,255,0.25)',
      iconBg: 'linear-gradient(135deg, #ffffff 0%, #faf5ff 100%)',
      iconColor: '#760CB0',
      textColor: '#ffffff',
      subTextColor: 'rgba(255,255,255,0.95)',
      badgeBg: 'rgba(255,255,255,0.2)',
      badgeColor: '#ffffff',
      delay: reduceMotion ? '0s' : '0.4s',
    },
  ]

  return (
    <div style={{ background: '#faf5ff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Compact Page Header */}
      <section
        style={{
          background: 'linear-gradient(135deg, #760CB0 0%, #5a0886 100%)',
          padding: '4.5rem 0 3.5rem',
          color: '#ffffff',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.82rem',
              color: 'rgba(255,255,255,0.7)',
              fontFamily: "'Inter', Arial, sans-serif",
              marginBottom: '1rem',
            }}
          >
            <Link to="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
              Home
            </Link>
            <span>›</span>
            <Link to="/about" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
              About Us
            </Link>
            <span>›</span>
            <span style={{ color: '#ffffff', fontWeight: 700 }}>Our Purpose</span>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '999px',
              padding: '0.35rem 1rem',
              marginBottom: '1rem',
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', Arial, sans-serif",
                fontSize: '0.8125rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#ffffff',
              }}
            >
              INSTITUTIONAL FOUNDATION
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.1,
              margin: '0 0 0.85rem',
            }}
          >
            Vision, Mission & Operating Motto
          </h1>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.88)',
              maxWidth: '620px',
              margin: '0 auto',
              lineHeight: 1.65,
            }}
          >
            Guiding our development consulting practice across every research design, field mission, and policy evaluation output.
          </p>
        </div>
      </section>

      {/* Main Purpose Cards Section */}
      <main style={{ padding: '3.5rem 0 4.5rem', flex: 1 }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2rem',
              marginBottom: '3.5rem',
            }}
            className="purpose-cards-grid"
          >
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  background: item.gradient,
                  borderRadius: '26px',
                  border: `1.5px solid ${item.borderColor}`,
                  padding: '2.75rem 2.25rem',
                  boxShadow:
                    item.id === 'motto'
                      ? '0 18px 48px rgba(118,12,176,0.32)'
                      : '0 12px 38px rgba(118,12,176,0.09)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  opacity: reduceMotion ? 1 : 0,
                  transform: reduceMotion ? 'translateY(0)' : 'translateY(30px)',
                  animation: reduceMotion
                    ? 'none'
                    : `fadeUpIn 650ms cubic-bezier(0.16, 1, 0.3, 1) ${item.delay} forwards`,
                }}
                className="purpose-page-card"
              >
                {/* Icon Pill */}
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: item.iconBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.6rem',
                    color: item.iconColor || '#ffffff',
                    marginBottom: '1.6rem',
                    boxShadow:
                      item.id === 'motto'
                        ? '0 6px 18px rgba(0,0,0,0.15)'
                        : '0 6px 18px rgba(118,12,176,0.25)',
                  }}
                >
                  {item.icon}
                </div>

                {/* Category Badge */}
                <div
                  style={{
                    fontFamily: "'Inter', Arial, sans-serif",
                    fontSize: '0.8125rem',
                    fontWeight: 800,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: item.badgeColor || '#760CB0',
                    background: item.badgeBg || 'rgba(118,12,176,0.08)',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '999px',
                    alignSelf: 'flex-start',
                    marginBottom: '0.75rem',
                  }}
                >
                  {item.badge}
                </div>

                {/* Title */}
                <h2
                  style={{
                    fontFamily: "'Source Serif 4', Georgia, serif",
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: item.textColor,
                    marginBottom: '1rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.title}
                </h2>

                {/* Description or Motto Lines */}
                {item.mottoLines ? (
                  <div
                    style={{
                      fontFamily: "'Source Serif 4', Georgia, serif",
                      fontSize: '1.45rem',
                      fontWeight: 700,
                      lineHeight: 1.4,
                      color: item.textColor,
                    }}
                  >
                    {item.mottoLines.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </div>
                ) : (
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.96rem',
                      color: item.subTextColor,
                      lineHeight: 1.8,
                      margin: 0,
                    }}
                  >
                    {item.text}
                  </p>
                )}

                {item.subtext && (
                  <div
                    style={{
                      marginTop: '1.25rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid rgba(255,255,255,0.2)',
                      fontSize: '0.82rem',
                      color: 'rgba(255,255,255,0.88)',
                      lineHeight: 1.6,
                    }}
                  >
                    {item.subtext}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Back Buttons */}
          <div style={{ textAlign: 'center', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => navigate('/about')}
              style={{
                background: '#760CB0',
                color: '#ffffff',
                fontFamily: "'Inter', Arial, sans-serif",
                fontWeight: 800,
                fontSize: '0.92rem',
                padding: '0.85rem 1.8rem',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 6px 20px rgba(118, 12, 176, 0.3)',
                transition: 'all 0.25s ease',
              }}
              className="back-purpose-btn"
            >
              <span>← Back to About Us</span>
            </button>

            <Link
              to="/"
              style={{
                background: '#ffffff',
                color: '#760CB0',
                fontFamily: "'Inter', Arial, sans-serif",
                fontWeight: 700,
                fontSize: '0.92rem',
                padding: '0.85rem 1.8rem',
                borderRadius: '10px',
                border: '1.5px solid rgba(118, 12, 176, 0.2)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.25s ease',
              }}
              className="home-purpose-btn"
            >
              <span>Return to Homepage</span>
            </Link>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes fadeUpIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .purpose-page-card:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 20px 50px rgba(118, 12, 176, 0.22) !important;
        }

        .back-purpose-btn:hover {
          background: #5a0886 !important;
          transform: translateY(-2px);
        }

        .home-purpose-btn:hover {
          background: #faf5ff !important;
          transform: translateY(-2px);
        }

        @media (max-width: 991px) {
          .purpose-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  )
}
