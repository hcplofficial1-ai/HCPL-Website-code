import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ScrollCard from '../components/common/ScrollCard'

const DOMAINS = [
  {
    id: 'domain-research',
    category: 'RESEARCH & EVALUATION',
    icon: '🔬',
    items: [
      { name: 'Qualitative Research Methodology', desc: 'In-depth KIIs, FGDs, ethnographic observations, and contextual thematic coding.' },
      { name: 'Quantitative Research Methodology', desc: 'Nationwide representative household sampling, CAPI mobile surveys, and econometric modeling.' },
      { name: 'Mixed-Method Design', desc: 'Triangulating quantitative survey data with qualitative stakeholder narratives.' },
      { name: 'Theory of Change & RBM', desc: 'Developing Results-Based Management (RBM) frameworks and structural logic models.' },
    ],
  },
  {
    id: 'domain-impact',
    category: 'IMPACT & MONITORING',
    icon: '🎯',
    items: [
      { name: 'Randomized Control Trials (RCTs)', desc: 'Rigorous experimental & quasi-experimental impact evaluation counterfactuals.' },
      { name: 'Outcome Mapping & MSC', desc: 'Tracking behavioral changes and Most Significant Change (MSC) qualitative stories.' },
      { name: 'Citizen Report Cards', desc: 'Empirical public feedback scorecards on essential social service delivery.' },
      { name: 'Value for Money (VfM) Analysis', desc: 'Evaluating Economy, Efficiency, Effectiveness, and Equity across grant investments.' },
    ],
  },
  {
    id: 'domain-policy',
    category: 'POLICY & DIGITALIZATION',
    icon: '💻',
    tag: 'Digital Transformation',
    items: [
      { name: 'Policy Context Analysis & Stakeholder Consultation', desc: 'Formulating strategic action frameworks, provincial policies, and organizational restructuring.' },
      { name: 'Management Information Systems (MIS)', desc: 'Designing customized web-based databases, KMS, and office automation ERP engines.' },
      { name: 'KoBo Toolbox & ODK Survey Deployments', desc: 'Deploying secure offline-capable CAPI data collection tools for large field surveys.' },
      { name: 'Organizational Capacity Assessment (OCA)', desc: 'Facilitating self-assessment workshops and capacity strengthening roadmaps.' },
    ],
  },
]

const THEMATIC_AREAS = [
  'Education',
  'Health',
  'Climate Smart Agriculture & Food Security',
  'Water, Sanitation & Hygiene (WASH)',
  'Women Empowerment',
  'Gender Based Rights Issues (Children, Women, Transgender)',
  'Climate & Environment Degradation',
  'Social Protection Program',
  'Human Resource Development',
  'Economic Growth / Value Chain',
  'Labor Market Analysis',
  'Rural Development Programs',
  'Nutrition',
  'Governance',
  'Livelihood & Vocational Skills (TVET)',
  'Accounting & Finance',
]

export default function Portfolio() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 100)
      }
    }
  }, [location])

  return (
    <div style={{ background: '#7e1997', minHeight: '100vh', color: '#ffffff' }}>
      
      {/* 1. Header Hero Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(66, 0, 99, 0.4) 0%, rgba(126, 25, 151, 0) 100%)',
          padding: '6.5rem 0 3.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        }}
      >
        <div className="container" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
          <div
            style={{
              fontFamily: "'Inter', Arial, sans-serif",
              fontSize: '0.8125rem',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#ffffff',
              background: 'rgba(255, 255, 255, 0.25)',
              padding: '0.4rem 1.25rem',
              borderRadius: '999px',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              display: 'inline-block',
              marginBottom: '1.25rem',
              backdropFilter: 'blur(8px)',
            }}
          >
            COMPANY PROFILE · 06 & 07
          </div>

          <h1
            style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: 'clamp(2.5rem, 5.5vw, 4rem)',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
              lineHeight: 1.15,
            }}
          >
            OUR PORTFOLIO & THEMATIC DOMAINS
          </h1>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(1.05rem, 1.3vw, 1.2rem)',
              color: 'rgba(255, 255, 255, 0.95)',
              maxWidth: '750px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.75,
              fontWeight: 400,
            }}
          >
            Combining enthusiasm, energy, and 16+ years of specialized experience across research methodologies, policy frameworks, and 16 development sectors.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                textDecoration: 'none',
                padding: '0.75rem 1.75rem',
                borderRadius: '4px',
                fontWeight: 600,
                fontSize: '0.9rem',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = '#7e1997' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'; e.currentTarget.style.color = '#ffffff' }}
            >
              ← Back to Home
            </Link>

            <Link
              to="/services"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#ffffff',
                color: '#7e1997',
                textDecoration: 'none',
                padding: '0.75rem 1.75rem',
                borderRadius: '4px',
                fontWeight: 700,
                fontSize: '0.9rem',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Explore Our Services →
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Practice Areas Grid */}
      <div style={{ padding: '5.5rem 0' }}>
        <div className="container" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '2.5rem',
              marginBottom: '5.5rem',
            }}
          >
            {DOMAINS.map((dom, idx) => (
              <ScrollCard key={dom.category} index={idx} staggerDelay={200}>
                <div
                  id={dom.id}
                  style={{
                    background: '#f8ecfa',
                    borderRadius: '24px',
                    border: '1.5px solid rgba(255, 255, 255, 0.5)',
                    padding: '2.5rem 2rem',
                    boxShadow: '0 16px 45px rgba(0, 0, 0, 0.18)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    height: '100%',
                    boxSizing: 'border-box',
                    color: '#212121',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="portfolio-domain-card"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '2.4rem' }}>{dom.icon}</span>
                    <span
                      style={{
                        background: 'rgba(126, 25, 151, 0.12)',
                        color: '#7e1997',
                        fontFamily: "'Inter', Arial, sans-serif",
                        fontWeight: 800,
                        fontSize: '0.8125rem',
                        padding: '0.35rem 0.85rem',
                        borderRadius: '999px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        border: '1px solid rgba(126, 25, 151, 0.15)',
                      }}
                    >
                      {dom.category}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', flex: 1 }}>
                    {dom.items.map((it) => (
                      <div
                        key={it.name}
                        style={{
                          background: '#ffffff',
                          borderRadius: '14px',
                          padding: '1.1rem 1.25rem',
                          border: '1.5px solid rgba(126, 25, 151, 0.12)',
                          boxShadow: '0 2px 8px rgba(126, 25, 151, 0.04)',
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "'Inter', Arial, sans-serif",
                            fontWeight: 800,
                            fontSize: '0.94rem',
                            color: '#7e1997',
                            marginBottom: '0.35rem',
                          }}
                        >
                          {it.name}
                        </div>
                        <div
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '0.835rem',
                            color: '#444444',
                            lineHeight: 1.62,
                          }}
                        >
                          {it.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollCard>
            ))}
          </div>

          {/* 3. 16 Thematic Areas Showcase */}
          <div
            id="domain-thematic-sectors"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1.5px solid rgba(255, 255, 255, 0.35)',
              borderRadius: '30px',
              padding: '4rem 3rem',
              color: '#ffffff',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span
                style={{
                  fontFamily: "'Inter', Arial, sans-serif",
                  fontSize: '0.8125rem',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  background: 'rgba(255, 255, 255, 0.25)',
                  padding: '0.35rem 1.1rem',
                  borderRadius: '999px',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  display: 'inline-block',
                  marginBottom: '1rem',
                }}
              >
                SECTORAL EXPERTISE
              </span>
              <h3
                style={{
                  fontFamily: "'Source Serif 4', Georgia, serif",
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                }}
              >
                16 CORE THEMATIC SECTORS
              </h3>
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                justifyContent: 'center',
                maxWidth: '960px',
                margin: '0 auto',
              }}
            >
              {THEMATIC_AREAS.map((th) => (
                <div
                  key={th}
                  style={{
                    background: 'rgba(255, 255, 255, 0.18)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.35)',
                    borderRadius: '12px',
                    padding: '0.65rem 1.25rem',
                    fontFamily: "'Inter', Arial, sans-serif",
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    color: '#ffffff',
                    transition: 'all 0.25s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                  className="thematic-chip"
                >
                  <span style={{ color: '#4ade80' }}>✓</span>
                  <span>{th}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .portfolio-domain-card:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 24px 55px rgba(0, 0, 0, 0.3) !important;
        }
        .thematic-chip:hover {
          background: #ffffff !important;
          color: #7e1997 !important;
          transform: translateY(-3px) scale(1.04) !important;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25) !important;
        }
      `}</style>
    </div>
  )
}