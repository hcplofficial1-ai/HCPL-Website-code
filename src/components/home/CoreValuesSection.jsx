import { useEffect, useRef, useState } from 'react'

const VALUES = [
  {
    num: '01',
    title: 'INTEGRITY',
    tag: 'ETHICAL RESPONSIBILITY',
    icon: '⚖️',
    desc: 'We operate with honesty, accountability, and unwavering ethical responsibility in all that we do.',
  },
  {
    num: '02',
    title: 'LOCAL EMPOWERMENT',
    tag: 'LOCAL OWNERSHIP',
    icon: '🌱',
    desc: 'We champion local ownership, amplifying marginalized voices and integrating local knowledge to ensure equitable and sustainable outcomes.',
  },
  {
    num: '03',
    title: 'EXCELLENCE',
    tag: 'EVIDENCE-BASED QUALITY',
    icon: '🏆',
    desc: 'We are committed to delivering high-quality, evidence-based, and context-relevant solutions that achieve measurable results.',
  },
  {
    num: '04',
    title: 'COLLABORATION',
    tag: 'INCLUSIVE PARTNERSHIPS',
    icon: '🤝',
    desc: 'We believe impactful change is co-created through inclusive partnerships built on mutual respect and shared ownership.',
  },
  {
    num: '05',
    title: 'IMPACT-DRIVEN',
    tag: 'SUSTAINABLE RESULTS',
    icon: '🎯',
    desc: 'We are results-oriented, focusing on practical solutions that deliver sustainable, meaningful, and lasting change for the communities we serve.',
  },
]

export default function CoreValuesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#ffffff',
        padding: '6rem 0 5.5rem',
        borderBottom: '1px solid rgba(118,12,176,0.08)',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Section Title */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="eyebrow">COMPANY PROFILE · 04</div>
          <h2
            style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              color: '#111111',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              marginBottom: '0.85rem',
            }}
          >
            OUR CORE VALUES
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.05rem',
              color: '#666666',
              maxWidth: '620px',
              margin: '0 auto',
              lineHeight: 1.75,
            }}
          >
            Principles that guide our advisory engagements, multi-stakeholder consultations, and field evaluations across South and Central Asia.
          </p>
        </div>

        {/* 5 Core Values Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}
        >
          {VALUES.map((val, idx) => (
            <div
              key={val.title}
              style={{
                background: '#faf5ff',
                borderRadius: '24px',
                border: '1.5px solid rgba(118, 12, 176, 0.12)',
                padding: '2.5rem 2rem 2.25rem',
                boxShadow: '0 8px 30px rgba(118, 12, 176, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                position: 'relative',
                overflow: 'hidden',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(35px)',
                transition: `all 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.12}s`,
              }}
              className="core-value-card"
            >
              {/* Decorative Number Badge */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: '2rem' }}>{val.icon}</span>
                <span
                  style={{
                    fontFamily: "'Source Serif 4', Georgia, serif",
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: '#760CB0',
                    opacity: 0.4,
                  }}
                >
                  {val.num}
                </span>
              </div>

              {/* Title */}
              <div>
                <span
                  style={{
                    fontFamily: "'Inter', Arial, sans-serif",
                    fontSize: '0.8125rem',
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#760CB0',
                    display: 'block',
                    marginBottom: '0.25rem',
                  }}
                >
                  {val.tag}
                </span>
                <h3
                  style={{
                    fontFamily: "'Inter', Arial, sans-serif",
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: '#111111',
                    margin: 0,
                  }}
                >
                  {val.title}
                </h3>
              </div>

              {/* Description */}
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.9rem',
                  color: '#555555',
                  lineHeight: 1.7,
                  margin: 0,
                  flex: 1,
                }}
              >
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .core-value-card:hover {
          background: #ffffff !important;
          transform: translateY(-8px) !important;
          box-shadow: 0 18px 45px rgba(118, 12, 176, 0.12) !important;
          border-color: rgba(118, 12, 176, 0.28) !important;
        }
      `}</style>
    </section>
  )
}
