import { useState } from 'react'
import { Link } from 'react-router-dom'
import ScrollCard from '../components/common/ScrollCard'

const SERVICES = [
  {
    id: 'me',
    icon: '📊',
    title: 'Monitoring & Evaluation',
    desc: 'Comprehensive OECD-DAC compliant evaluations assessing relevance, coherence, effectiveness, efficiency, impact, and sustainability. We design and implement robust M&E systems from baseline to endline.',
    features: ['OECD-DAC Evaluations', 'Process Evaluations', 'Real-time M&E Systems', 'Results Framework Design', 'Value for Money Analysis'],
    image: './images/monitoring-evaluation-bg.jpg',
  },
  {
    id: 'research',
    icon: '🔬',
    title: 'Research & Diagnostics',
    desc: 'Applied mixed-methods research including baseline studies, endline surveys, KAP studies, labour market analyses, market studies, and situational diagnostics using quantitative and qualitative approaches.',
    features: ['Baseline & Endline Studies', 'SMART Nutritional Surveys', 'Labour Market Studies', 'Conflict & Gender Analysis', 'Feasibility Studies'],
    image: './images/organizational-assessment-bg.jpg',
  },
  {
    id: 'advisory',
    icon: '🏛️',
    title: 'Strategic Advisory & Policy',
    desc: 'High-level institutional policy formulation, theory of change development, organizational strategy design, and results-based management training for governments and international organizations.',
    features: ['Institutional Strategy', 'Theory of Change', 'Policy Mainstreaming', 'MERL Framework Design', 'SDG Localization'],
    image: './images/strategic-advisory-policy-bg.png',
  },
  {
    id: 'tpm',
    icon: '🌍',
    title: 'Third-Party Monitoring (TPM)',
    desc: 'Independent field verification, beneficiary registration audits, financial compliance checks, and real-time data collection systems for multilateral and bilateral donors across high-risk environments.',
    features: ['Beneficiary Verification', 'Field Spot Checks', 'Digital Data Collection', 'Remote Sensing Verification', 'Fiduciary Monitoring'],
    image: './images/third-party-monitoring-bg.jpg',
  },
  {
    id: 'capacity',
    icon: '💼',
    title: 'Capacity Development',
    desc: 'Organizational capacity assessments, tailored training programs, MERL system strengthening, and institutional development planning for civil society organizations and government departments.',
    features: ['Organizational Diagnostics', 'Training of Trainers (ToT)', 'MERL Capacity Building', 'CSO Strengthening', 'Grant Management Training'],
    image: './images/capacity-development-service-bg.jpg',
  },
  {
    id: 'training',
    icon: '🎯',
    title: 'Training & Workshops',
    desc: 'Expert-led training modules on Humanitarian Project Cycle Management, HPCM, financial management, gender equality, social accountability, DRR, and advanced data tools.',
    features: ['HPCM Trainings', 'Financial Governance', 'GESI Workshops', 'Data Management Tools', 'Field Enumerator Training'],
    image: './images/training-workshops-bg.jpg',
  },
]

const METHODS = [
  'Randomized Controlled Trials (RCT)',
  'Quasi-Experimental Designs',
  'SMART Nutritional Surveys',
  'Household Surveys (ODK/KoboToolbox)',
  'Key Informant Interviews (KII)',
  'Focus Group Discussions (FGD)',
  'Most Significant Change (MSC)',
  'Social Return on Investment (SROI)',
  'Do No Harm Analysis',
  'GESI Mainstreaming',
  'Value Chain Analysis',
  'Geospatial Mapping',
]

export default function Services() {
  const [activeId, setActiveId] = useState('me')
  const [hoveredId, setHoveredId] = useState(null)

  const breadcrumb = {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
    fontSize: '13px',
    color: 'rgba(255,255,255,0.75)',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontWeight: 400,
    marginBottom: '1.5rem',
  }

  return (
    <div>
      {/* Hero Header */}
      <section style={{ background: 'linear-gradient(135deg, #760CB0 0%, #5a0886 100%)', padding: '5rem 0 4rem' }}>
        <div className="container">
          <div style={breadcrumb}>
            <Link to="/" style={{ color: '#fff', fontWeight: 700, textDecoration: 'underline', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              Home
            </Link>
            <span>›</span>
            <span style={{ color: '#fff', fontWeight: 400 }}>Services</span>
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '999px',
              padding: '0.3rem 0.85rem',
              marginBottom: '1rem',
            }}
          >
            {/* Category text: Arial/Helvetica, 13px, Regular */}
            <span
              style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: '13px',
                fontWeight: 400,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#fff',
              }}
            >
              Expert Services
            </span>
          </div>

          {/* Main Headline: Arial/Helvetica, 26 pt (26px), Bold */}
          <h1
            style={{
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontSize: '26px',
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.25,
              marginBottom: '1rem',
            }}
          >
            Our Services & Expertise
          </h1>

          {/* Description/Body: Arial/Helvetica, 15px (14-16 pt), Regular */}
          <p
            style={{
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontSize: '15px',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.9)',
              maxWidth: '640px',
              lineHeight: 1.65,
            }}
          >
            Comprehensive, OECD-DAC aligned evaluation, research and advisory solutions for international development organizations.
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section style={{ background: '#f5effc', padding: '6rem 0 6.5rem', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ maxWidth: '1440px', position: 'relative', zIndex: 2 }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            {/* Category text: Arial/Helvetica, 13px (12-14 pt), Regular */}
            <div
              style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: '13px',
                fontWeight: 400,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#760CB0',
                background: 'rgba(118, 12, 176, 0.1)',
                padding: '0.45rem 1.4rem',
                borderRadius: '999px',
                border: '1.5px solid rgba(118, 12, 176, 0.25)',
                display: 'inline-block',
                marginBottom: '1.2rem',
              }}
            >
              WHAT WE OFFER
            </div>

            {/* Main Headline: Arial/Helvetica, 26 pt (26px), Bold */}
            <h2
              style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: '26px',
                fontWeight: 700,
                color: '#210238',
                lineHeight: 1.25,
                marginBottom: '1rem',
                letterSpacing: '-0.01em',
                textTransform: 'uppercase',
              }}
            >
              SIX CORE SERVICE AREAS
            </h2>

            {/* Description/Body: Arial/Helvetica, 15px, Regular */}
            <p
              style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: '15px',
                fontWeight: 400,
                color: '#320454',
                maxWidth: '750px',
                margin: '0 auto',
                lineHeight: 1.65,
              }}
            >
              Combining quantitative rigor with contextual field insight across South Asia & globally
            </p>
          </div>

          {/* Service Cards Grid (Increased Width) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))',
              gap: '3rem',
            }}
            className="services-grid-wide"
          >
            {SERVICES.map((sv, idx) => {
              const isSelected = activeId === sv.id
              const isHovered = hoveredId === sv.id
              const isWhiteCard = isSelected || isHovered

              return (
                <ScrollCard key={sv.id} index={idx} staggerDelay={150}>
                  <div
                    onClick={() => setActiveId(sv.id)}
                    onMouseEnter={() => setHoveredId(sv.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                      background: isWhiteCard ? '#ffffff' : 'transparent',
                      borderRadius: '0px',
                      border: isWhiteCard ? '2px solid #ffffff' : '1.5px solid rgba(118, 12, 176, 0.25)',
                      boxShadow: isWhiteCard ? '0 22px 55px rgba(33, 2, 56, 0.18)' : 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      boxSizing: 'border-box',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                      animation: 'slowWaveCard 5s ease-in-out infinite',
                      animationDelay: `${idx * 0.45}s`,
                      position: 'relative',
                    }}
                    className={`service-card-interactive ${isWhiteCard ? 'is-white-active' : 'is-transparent'}`}
                  >
                    {/* 1. Top Image Frame (16:9 Landscape Aspect Ratio) */}
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
                        src={sv.image}
                        alt={sv.title}
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

                    {/* 2. Card Body */}
                    <div
                      style={{
                        padding: '2.5rem 2.25rem',
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        gap: '1rem',
                        color: isWhiteCard ? '#212121' : '#210238',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {/* Main Headline (Card Headline): Arial/Helvetica, 26 pt (26px), Bold */}
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.45rem',
                        }}
                      >
                        <h3
                          style={{
                            fontFamily: 'Arial, Helvetica, sans-serif',
                            fontSize: '26px',
                            fontWeight: 700,
                            margin: 0,
                            lineHeight: 1.25,
                            letterSpacing: '-0.01em',
                            color: isWhiteCard ? (isHovered ? '#760CB0' : '#111111') : '#210238',
                            transition: 'color 0.3s ease',
                          }}
                        >
                          {sv.title}
                        </h3>
                      </div>

                      {/* Description/body: Arial/Helvetica, 15px (14-16 pt), Regular */}
                      <p
                        style={{
                          fontFamily: 'Arial, Helvetica, sans-serif',
                          fontSize: '15px',
                          color: isWhiteCard ? '#555555' : '#320454',
                          lineHeight: 1.65,
                          margin: 0,
                          fontWeight: 400,
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {sv.desc}
                      </p>

                      {/* Category text / Feature Tags: Arial/Helvetica, 13px (12-14 pt), Regular */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                        {sv.features.map((f) => (
                          <span
                            key={f}
                            style={{
                              background: isWhiteCard ? 'rgba(118, 12, 176, 0.08)' : 'rgba(255, 255, 255, 0.6)',
                              color: '#760CB0',
                              fontFamily: 'Arial, Helvetica, sans-serif',
                              fontWeight: 400,
                              fontSize: '13px',
                              padding: '0.3rem 0.75rem',
                              borderRadius: '999px',
                              border: '1px solid rgba(118, 12, 176, 0.12)',
                            }}
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollCard>
              )
            })}
          </div>
        </div>
      </section>

      {/* Methodologies Section */}
      <section style={{ background: '#faf5ff', padding: '4.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            {/* Category text: Arial/Helvetica, 13px (12-14 pt), Regular */}
            <div
              className="eyebrow"
              style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.12em' }}
            >
              How We Work
            </div>
            {/* Main Headline: Arial/Helvetica, 26 pt (26px), Bold */}
            <h2 style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '26px', fontWeight: 700, color: '#212121', lineHeight: 1.25 }}>
              Our Methodologies
            </h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            {METHODS.map((m) => (
              <span
                key={m}
                style={{
                  background: '#fff',
                  color: '#424242',
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  fontWeight: 400,
                  fontSize: '13px',
                  padding: '0.5rem 1.1rem',
                  borderRadius: '999px',
                  border: '1px solid rgba(118,12,176,0.15)',
                  boxShadow: '0 1px 4px rgba(118,12,176,0.06)',
                }}
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ background: 'linear-gradient(135deg, #760CB0 0%, #5a0886 100%)', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          {/* Main Headline: Arial/Helvetica, 26 pt (26px), Bold */}
          <h2 style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '26px', fontWeight: 700, color: '#fff', marginBottom: '0.75rem', lineHeight: 1.25 }}>
            Let's Design Your Study
          </h2>
          {/* Description/Body: Arial/Helvetica, 15px, Regular */}
          <p style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '15px', fontWeight: 400, color: 'rgba(255,255,255,0.85)', marginBottom: '2rem', maxWidth: '520px', margin: '0 auto 2rem', lineHeight: 1.65 }}>
            Our team is ready to design a rigorous, contextually relevant evaluation or research study for your programme.
          </p>
          {/* Links / Action Button: Arial/Helvetica, Bold, Underline / Hyperlink styling */}
          <Link
            to="/contact"
            style={{
              background: '#fff',
              color: '#760CB0',
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontWeight: 700,
              fontSize: '15px',
              padding: '0.85rem 2rem',
              borderRadius: '10px',
              textDecoration: 'underline',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            }}
          >
            Get A Proposal →
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes slowWaveCard {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .service-card-interactive::after {
          content: '';
          position: absolute;
          top: 0;
          left: -120%;
          width: 70%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.28) 50%,
            transparent 100%
          );
          transform: skewX(-25deg);
          pointer-events: none;
          animation: slowWaveShimmer 6s ease-in-out infinite;
          animation-delay: inherit;
        }

        @keyframes slowWaveShimmer {
          0% {
            left: -120%;
          }
          35%, 100% {
            left: 220%;
          }
        }

        .service-card-interactive:hover {
          animation-play-state: paused !important;
          transform: translateY(-12px) scale(1.015) !important;
          box-shadow: 0 28px 65px rgba(118, 12, 176, 0.22) !important;
        }

        @media (min-width: 900px) {
          .services-grid-wide {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 3rem !important;
          }
        }

        @media (max-width: 899px) {
          .services-grid-wide {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  )
}
