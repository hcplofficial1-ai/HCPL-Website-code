import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { DEFAULT_CONSULTANTS } from '../data/consultantsData'
import ScrollCard from '../components/common/ScrollCard'

function ConsultantCard({ consultant, index = 0 }) {
  return (
    <ScrollCard index={index} staggerDelay={180}>
      <div
        style={{
          background: '#ffffff',
          borderRadius: '26px',
          border: '1.5px solid rgba(118,12,176,0.12)',
          padding: '2.5rem',
          boxShadow: '0 10px 35px rgba(0, 0, 0, 0.03)',
          boxSizing: 'border-box',
        }}
        className="consultant-horizontal-card"
      >
        {/* Avatar Container */}
        <div
          style={{
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(118, 12, 176, 0.15)',
            border: '4px solid #ffffff',
            background: 'linear-gradient(135deg, #f5effc 0%, #ebe0f8 100%)',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {consultant.image ? (
            <img
              src={consultant.image}
              alt={consultant.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: consultant.imagePosition || 'center 10%',
                transform: consultant.imageZoom && consultant.imageZoom !== 1 ? `scale(${consultant.imageZoom})` : undefined,
                transformOrigin: consultant.imagePosition || 'center 10%',
                transition: 'transform 0.4s ease',
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Source Serif 4', Georgia, serif",
                fontWeight: 700,
                fontSize: '2.8rem',
                color: '#760CB0',
                background: '#faf5ff',
              }}
            >
              {consultant.initials}
            </div>
          )}
        </div>

        {/* Info Column */}
        <div style={{ flex: 1, textAlign: 'left' }}>
          <div style={{ marginBottom: '0.85rem' }}>
            <h3
              style={{
                fontFamily: "'Source Serif 4', Georgia, serif",
                fontWeight: 700,
                fontSize: '2rem',
                color: '#111111',
                margin: '0 0 0.35rem',
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
              }}
            >
              {consultant.name}
            </h3>

            <div
              style={{
                fontFamily: "'Inter', Arial, sans-serif",
                fontSize: '1rem',
                color: '#760CB0',
                fontWeight: 800,
                marginBottom: '0.2rem',
                lineHeight: 1.35,
              }}
            >
              {consultant.role}
            </div>

            <div
              style={{
                fontFamily: "'Inter', Arial, sans-serif",
                fontSize: '0.88rem',
                color: '#424242',
                fontWeight: 700,
              }}
            >
              {consultant.org}
            </div>
          </div>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.92rem',
              color: '#444444',
              lineHeight: 1.75,
              margin: '0 0 1.25rem',
            }}
          >
            {consultant.experience}
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              alignItems: 'center',
              paddingTop: '0.85rem',
              borderTop: '1px solid rgba(118,12,176,0.08)',
            }}
            className="consultant-tags"
          >
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#760CB0', textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: '0.25rem' }}>Core Expertise:</span>
            {consultant.specialties.map((sp, idx) => (
              <span
                key={idx}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#760CB0',
                  background: '#faf5ff',
                  border: '1px solid rgba(118,12,176,0.15)',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '999px',
                }}
              >
                {sp}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ScrollCard>
  )
}

export default function Consultants() {
  const { consultants = [] } = useData()
  const rawList = Array.isArray(consultants) && consultants.length > 0 ? consultants : DEFAULT_CONSULTANTS
  const displayConsultants = [...rawList].sort((a, b) => {
    const aIsIzhar = a && (a.id === 'izhar-ali-hunzai' || (a.name && a.name.toLowerCase().includes('izhar')))
    const bIsIzhar = b && (b.id === 'izhar-ali-hunzai' || (b.name && b.name.toLowerCase().includes('izhar')))
    if (aIsIzhar && !bIsIzhar) return -1
    if (!aIsIzhar && bIsIzhar) return 1
    const orderA = a.order != null ? Number(a.order) : 99
    const orderB = b.order != null ? Number(b.order) : 99
    return orderA - orderB
  })

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', color: '#212121', fontFamily: "'Inter', sans-serif" }}>
      {/* 1. Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #1b022c 0%, #4a0670 50%, #760CB0 100%)',
          color: '#ffffff',
          padding: '7.5rem 1.5rem 5.5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 40%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#ffffff',
              fontSize: '0.8125rem',
              fontWeight: 800,
              padding: '0.4rem 1rem',
              borderRadius: '999px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '1.5rem',
            }}
          >
            🎓 Independent Experts & Domain Advisors
          </div>

          <h1
            style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em',
              color: '#ffffff',
              maxWidth: '900px',
            }}
          >
            Senior Consultants & Strategic Advisors
          </h1>

          <p
            style={{
              fontSize: '1.15rem',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.9)',
              maxWidth: '720px',
              margin: '0 0 2rem',
            }}
          >
            Our senior consultant roster brings together leading domain experts, former institution directors, policy evaluators, and governance advisors across South Asia, Central Asia, and global development corridors.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              to="/contact"
              style={{
                background: '#ffffff',
                color: '#760CB0',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: '0.95rem',
                padding: '0.85rem 1.75rem',
                borderRadius: '10px',
                textDecoration: 'none',
                boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
              }}
            >
              Engage Advisor Roster
            </Link>
            <Link
              to="/team"
              style={{
                background: 'rgba(255,255,255,0.15)',
                color: '#ffffff',
                border: '1.5px solid rgba(255,255,255,0.3)',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: '0.95rem',
                padding: '0.85rem 1.75rem',
                borderRadius: '10px',
                textDecoration: 'none',
              }}
            >
              View Executive Team
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Consultants Roster List (Horizontal Layout) */}
      <section style={{ padding: '5.5rem 1.5rem', background: '#faf5ff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2
              style={{
                fontFamily: "'Source Serif 4', Georgia, serif",
                fontSize: '2.5rem',
                fontWeight: 700,
                color: '#111111',
                marginBottom: '0.75rem',
              }}
            >
              Featured Senior Consultants
            </h2>
            <p style={{ fontSize: '1rem', color: '#666666', maxWidth: '620px', margin: '0 auto', lineHeight: 1.6 }}>
              Independent leaders providing high-level technical oversight, diagnostic research, policy evaluation, and institutional advisory for HIMAT assignments.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2.25rem',
            }}
          >
            {displayConsultants.map((c, idx) => (
              <ConsultantCard key={c.id} consultant={c} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Call to Action */}
      <section style={{ padding: '4.5rem 1.5rem', background: '#ffffff', borderTop: '1px solid rgba(118,12,176,0.1)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: '2.2rem',
              fontWeight: 700,
              color: '#111111',
              marginBottom: '1rem',
            }}
          >
            Looking to Partner with Our Expert Roster?
          </h2>
          <p style={{ fontSize: '1rem', color: '#555555', marginBottom: '2rem', lineHeight: 1.6 }}>
            Connect with our leadership team to discuss specialized diagnostic evaluations, economic policy research, or institutional capacity advisory.
          </p>
          <Link
            to="/contact"
            style={{
              background: '#760CB0',
              color: '#ffffff',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: '0.95rem',
              padding: '0.9rem 2.25rem',
              borderRadius: '10px',
              textDecoration: 'none',
              display: 'inline-block',
              boxShadow: '0 6px 20px rgba(118,12,176,0.3)',
            }}
          >
            Contact Strategic Practice Lead
          </Link>
        </div>
      </section>
    </div>
  )
}
