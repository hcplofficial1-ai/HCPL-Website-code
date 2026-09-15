import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { DEFAULT_TEAM } from '../data/team'
import ScrollCard from '../components/common/ScrollCard'

function ExecutiveMemberCard({ member, index = 0 }) {
  const getObjectPosition = (id) => {
    switch (id) {
      case 'himatullah':
        return 'center 12%'
      case 'mashooq':
        return 'center 4%'
      case 'shoaib':
        return 'center 8%'
      case 'jawad':
        return 'center 12%'
      case 'mahrukh':
        return 'center 10%'
      case 'zeeshan':
        return 'center 8%'
      case 'hassan':
        return 'center 10%'
      case 'shomaila':
        return 'center 15%'
      case 'urooj':
        return 'center 12%'
      case 'mawish':
        return 'center 10%'
      default:
        return 'center 10%'
    }
  }

  return (
    <ScrollCard index={index} staggerDelay={180}>
      <div
        style={{
          background: '#ffffff',
          borderRadius: '26px',
          border: '1.5px solid rgba(118,12,176,0.18)',
          padding: '3rem 2rem 2.5rem',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative',
          height: '100%',
          boxSizing: 'border-box',
        }}
        className="executive-team-card"
      >
        {/* McKinsey Circular Avatar Container */}
        <div
          style={{
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            overflow: 'hidden',
            marginBottom: '1.5rem',
            boxShadow: '0 10px 30px rgba(118, 12, 176, 0.15)',
            border: '4px solid #ffffff',
            background: 'linear-gradient(135deg, #f5effc 0%, #ebe0f8 100%)',
            flexShrink: 0,
            position: 'relative',
          }}
        >
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: member.imagePosition || getObjectPosition(member.id),
                transform: member.imageZoom && member.imageZoom !== 1 ? `scale(${member.imageZoom})` : undefined,
                transformOrigin: member.imagePosition || getObjectPosition(member.id),
                transition: 'transform 0.4s ease',
              }}
              className="member-portrait-img"
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
              {member.initials || (member.name ? member.name[0] : '?')}
            </div>
          )}
        </div>

        {/* Name */}
        <h3
          style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontWeight: 700,
            fontSize: '1.85rem',
            color: '#111111',
            margin: '0 0 0.35rem',
            lineHeight: 1.2,
          }}
        >
          {member.name}
        </h3>

        {/* Designation / Position */}
        <div
          style={{
            fontFamily: "'Inter', Arial, sans-serif",
            fontSize: '0.92rem',
            color: '#212121',
            fontWeight: 800,
            marginBottom: member.dept ? '0.25rem' : '1.15rem',
            lineHeight: 1.35,
          }}
        >
          {member.role}
        </div>

        {/* Department */}
        {member.dept && (
          <div
            style={{
              fontFamily: "'Inter', Arial, sans-serif",
              fontSize: '0.8rem',
              color: '#760CB0',
              fontWeight: 700,
              marginBottom: '1.15rem',
            }}
          >
            {member.dept}
          </div>
        )}

        {/* Description / Experience */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.88rem',
            fontWeight: 400,
            color: '#555555',
            lineHeight: 1.65,
            margin: '0 0 1.75rem',
            maxWidth: '310px',
            flex: 1,
          }}
        >
          {member.experience}
        </p>

        {/* Circular Social Action Icons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.85rem',
            marginTop: 'auto',
          }}
        >
          {/* Circular Email */}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              title={`Email ${member.name}`}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: '#111111',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.95rem',
                textDecoration: 'none',
                transition: 'all 0.25s ease',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
              className="mckinsey-icon-btn"
            >
              ✉
            </a>
          )}

          {/* Circular LinkedIn */}
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              title={`LinkedIn Profile of ${member.name}`}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: '#111111',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Inter', Arial, sans-serif",
                fontWeight: 800,
                fontSize: '0.85rem',
                textDecoration: 'none',
                transition: 'all 0.25s ease',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
              className="mckinsey-icon-btn"
            >
              in
            </a>
          )}
        </div>
      </div>
    </ScrollCard>
  )
}

export default function Team() {
  const { team = [], projects = [] } = useData()
  const teamList = Array.isArray(team) && team.length > 0 ? team : DEFAULT_TEAM

  const founder = teamList.find((m) => m.category === 'executive' || m.id === 'himatullah') || teamList[0]
  const otherMembers = teamList.filter((m) => m.id !== founder?.id)

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      {/* 1. Hero Header */}
      <section
        style={{
          background: 'linear-gradient(135deg, #760CB0 0%, #5a0886 100%)',
          padding: '5.5rem 0 4.5rem',
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
              fontSize: '0.8125rem',
              color: 'rgba(255,255,255,0.7)',
              fontFamily: "'Inter', Arial, sans-serif",
              marginBottom: '1.25rem',
            }}
          >
            <Link to="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
              Home
            </Link>
            <span>›</span>
            <span style={{ color: '#ffffff', fontWeight: 700 }}>Our People</span>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '999px',
              padding: '0.35rem 1rem',
              marginBottom: '1.25rem',
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
              People & Organizational Performance
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.08,
              marginBottom: '1rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            OUR PEOPLE
          </h1>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.08rem',
              color: 'rgba(255,255,255,0.88)',
              maxWidth: '640px',
              margin: '0 auto',
              lineHeight: 1.75,
            }}
          >
            Multidisciplinary researchers, econometricians, GESI specialists, and advisory leaders driving transformative development impact across global corridors.
          </p>

          {/* Stats Bar */}
          <div
            style={{
              display: 'flex',
              gap: '2.5rem',
              justifyContent: 'center',
              marginTop: '2.5rem',
              flexWrap: 'wrap',
            }}
          >
            {[
              ['16+', 'Years Experience'],
              [`${teamList.length}`, 'Core Advisory Leads'],
              [`${projects.length}`, 'Assignments Delivered'],
              ['58+', 'Institutional Clients'],
            ].map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontFamily: "'Source Serif 4', Georgia, serif",
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    lineHeight: 1,
                  }}
                >
                  {v}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', Arial, sans-serif",
                    fontSize: '0.8125rem',
                    color: 'rgba(255,255,255,0.7)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginTop: '0.3rem',
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. CEO Spotlight Section */}
      {founder && (
        <section style={{ background: '#faf5ff', padding: '5.5rem 0 4.5rem', borderBottom: '1px solid rgba(118,12,176,0.1)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div className="eyebrow" style={{ color: '#760CB0', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.8125rem', letterSpacing: '0.08em' }}>
                EXECUTIVE LEADERSHIP
              </div>
              <h2
                style={{
                  fontFamily: "'Source Serif 4', Georgia, serif",
                  fontSize: 'clamp(2rem, 4.5vw, 3rem)',
                  fontWeight: 700,
                  color: '#111111',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                FOUNDER & CHIEF EXECUTIVE OFFICER
              </h2>
            </div>

            <ScrollCard index={0}>
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: '30px',
                  border: '2px solid rgba(118,12,176,0.18)',
                  boxShadow: '0 20px 60px rgba(118,12,176,0.12)',
                  maxWidth: '860px',
                  margin: '0 auto',
                  padding: '3.5rem 3rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                }}
              >
                {/* Highlight Badge */}
                <div
                  style={{
                    background: 'linear-gradient(135deg, #760CB0 0%, #5a0886 100%)',
                    color: '#ffffff',
                    fontFamily: "'Inter', Arial, sans-serif",
                    fontSize: '0.8125rem',
                    fontWeight: 800,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    padding: '0.4rem 1.25rem',
                    borderRadius: '999px',
                    marginBottom: '1.75rem',
                    boxShadow: '0 4px 14px rgba(118,12,176,0.25)',
                  }}
                >
                  Principal Investigator & Executive Leader
                </div>

                {/* Circular Avatar */}
                <div
                  style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    marginBottom: '1.75rem',
                    boxShadow: '0 12px 35px rgba(118, 12, 176, 0.2)',
                    border: '5px solid #ffffff',
                    background: 'linear-gradient(135deg, #760CB0 0%, #5a0886 100%)',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={founder.image || './himatullah.jpg'}
                    alt={founder.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: founder.imagePosition || 'top center',
                      transform: founder.imageZoom && founder.imageZoom !== 1 ? `scale(${founder.imageZoom})` : undefined,
                      transformOrigin: founder.imagePosition || 'top center',
                    }}
                    onError={(e) => {
                      e.currentTarget.src = './himatullah.jpg'
                    }}
                  />
                </div>

                {/* CEO Name */}
                <h2
                  style={{
                    fontFamily: "'Source Serif 4', Georgia, serif",
                    fontSize: '2.4rem',
                    fontWeight: 700,
                    color: '#111111',
                    margin: '0 0 0.4rem',
                  }}
                >
                  {founder.name}
                </h2>

                <div
                  style={{
                    fontFamily: "'Inter', Arial, sans-serif",
                    fontSize: '1.1rem',
                    color: '#760CB0',
                    fontWeight: 800,
                    marginBottom: '0.5rem',
                  }}
                >
                  {founder.role}
                </div>

                {founder.education && (
                  <div
                    style={{
                      fontFamily: "'Inter', Arial, sans-serif",
                      fontSize: '0.85rem',
                      color: '#666666',
                      fontWeight: 600,
                      marginBottom: '1.5rem',
                    }}
                  >
                    🎓 {founder.education}
                  </div>
                )}

                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.96rem',
                    color: '#555555',
                    lineHeight: 1.75,
                    maxWidth: '680px',
                    margin: '0 0 2rem',
                  }}
                >
                  {founder.experience}
                </p>

                {/* Contact Icons */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  {founder.email && (
                    <a
                      href={`mailto:${founder.email}`}
                      title={`Email ${founder.name}`}
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        background: '#111111',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.1rem',
                        textDecoration: 'none',
                        boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                        transition: 'all 0.25s ease',
                      }}
                      className="mckinsey-icon-btn"
                    >
                      ✉
                    </a>
                  )}
                  {founder.linkedin && (
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      title={`LinkedIn Profile of ${founder.name}`}
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        background: '#111111',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: "'Inter', Arial, sans-serif",
                        fontWeight: 800,
                        fontSize: '0.95rem',
                        textDecoration: 'none',
                        boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                        transition: 'all 0.25s ease',
                      }}
                      className="mckinsey-icon-btn"
                    >
                      in
                    </a>
                  )}
                </div>
              </div>
            </ScrollCard>
          </div>
        </section>
      )}

      {/* 3. Team Cards Grid */}
      <section style={{ background: '#ffffff', padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
            <div className="eyebrow" style={{ color: '#760CB0', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.8125rem', letterSpacing: '0.08em' }}>
              OUR PEOPLE
            </div>
            <h2
              style={{
                fontFamily: "'Source Serif 4', Georgia, serif",
                fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                fontWeight: 700,
                color: '#111111',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              OUR ADVISORY TEAMS & SPECIALISTS
            </h2>
            <p style={{ color: '#666666', fontSize: '1rem', maxWidth: '600px', margin: '0.65rem auto 0', lineHeight: 1.7 }}>
              Advising senior executives, international donors, multilateral organizations, and government leaders across global development corridors.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem',
            }}
          >
            {otherMembers.map((m, idx) => (
              <ExecutiveMemberCard key={m.id} member={m} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Panoramic Team Showcase */}
      <section style={{ background: '#faf5ff', padding: '5.5rem 0', borderTop: '1px solid rgba(118,12,176,0.08)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="eyebrow" style={{ color: '#760CB0', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.8125rem', letterSpacing: '0.08em' }}>
              Collective Force
            </div>
            <h2
              style={{
                fontFamily: "'Source Serif 4', Georgia, serif",
                fontSize: '2.5rem',
                fontWeight: 700,
                color: '#212121',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              HIMAT CONSULTING PEOPLE & FIELD TEAMS
            </h2>
            <p style={{ color: '#666666', fontSize: '0.98rem', maxWidth: '650px', margin: '0.5rem auto 0', lineHeight: 1.7 }}>
              Our multidisciplinary team of principal investigators, evaluation experts, econometricians, field operations managers, and sectoral advisors.
            </p>
          </div>

          <div
            style={{
              background: '#ffffff',
              borderRadius: '26px',
              border: '2px solid rgba(118,12,176,0.15)',
              padding: '1.25rem',
              boxShadow: '0 16px 48px rgba(118,12,176,0.08)',
              marginBottom: '3rem',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                borderRadius: '18px',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              }}
            >
              <img
                src="./team-full.png"
                alt="HIMAT Consulting People & Advisory Directorate"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '520px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
            <div
              style={{
                padding: '1.25rem 1rem 0.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div>
                <h4
                  style={{
                    fontFamily: "'Inter', Arial, sans-serif",
                    fontWeight: 800,
                    fontSize: '1.05rem',
                    color: '#212121',
                    margin: '0 0 0.2rem',
                  }}
                >
                  HIMAT Consulting Annual Core People & Field Operations Assembly
                </h4>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.84rem', color: '#760CB0', margin: 0, fontWeight: 600 }}>
                  Islamabad Headquarters & Multi-Provincial Field Leadership
                </p>
              </div>
              <span
                style={{
                  background: 'rgba(118,12,176,0.08)',
                  color: '#760CB0',
                  fontFamily: "'Inter', Arial, sans-serif",
                  fontWeight: 800,
                  fontSize: '0.8125rem',
                  padding: '0.35rem 0.9rem',
                  borderRadius: '999px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                16+ Years of Field Excellence
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Join CTA */}
      <section
        style={{
          background: 'linear-gradient(135deg, #760CB0 0%, #5a0886 100%)',
          padding: '4.5rem 0',
          textAlign: 'center',
          color: '#ffffff',
        }}
      >
        <div className="container">
          <h2
            style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: '2.2rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            JOIN OUR PEOPLE
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.85)',
              marginBottom: '2rem',
              maxWidth: '520px',
              margin: '0 auto 2rem',
              fontSize: '0.95rem',
              lineHeight: 1.7,
            }}
          >
            We are always looking for passionate development evaluation professionals, researchers, and data experts to join our advisory network.
          </p>
          <Link
            to="/contact"
            style={{
              background: '#ffffff',
              color: '#760CB0',
              fontFamily: "'Inter', Arial, sans-serif",
              fontWeight: 800,
              fontSize: '0.9rem',
              padding: '0.85rem 2rem',
              borderRadius: '12px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
            }}
          >
            Submit CV & Expression of Interest →
          </Link>
        </div>
      </section>

      <style>{`
        .executive-team-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 22px 50px rgba(0,0,0,0.08) !important;
          border-color: rgba(118,12,176,0.3) !important;
        }
        .executive-team-card:hover .member-portrait-img {
          transform: scale(1.06);
        }
        .mckinsey-icon-btn:hover {
          background: #760CB0 !important;
          transform: translateY(-3px) scale(1.08);
          box-shadow: 0 8px 20px rgba(118, 12, 176, 0.35) !important;
        }
      `}</style>
    </div>
  )
}
