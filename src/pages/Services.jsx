import usePageSEO from '../hooks/usePageSEO'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ScrollCard from '../components/common/ScrollCard'
import { useData } from '../context/DataContext'
import { DEFAULT_SERVICES } from '../data/servicesData'

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
    id: 'training',
    icon: '🎯',
    title: 'Training & Workshops',
    desc: 'Expert-led training modules on Humanitarian Project Cycle Management, HPCM, financial management, gender equality, social accountability, DRR, and advanced data tools.',
    features: ['HPCM Trainings', 'Financial Governance', 'GESI Workshops', 'Data Management Tools', 'Field Enumerator Training'],
    image: './images/training-workshops-bg.jpg',
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
    image: './images/office-automation-erp-bg.jpg',
  },
  {
    id: 'capacity',
    icon: '💼',
    title: 'Organizational Capacity Assessments',
    desc: 'Organizational capacity assessments, tailored training programs, MERL system strengthening, and institutional development planning for civil society organizations and government departments.',
    features: ['Organizational Diagnostics', 'Training of Trainers (ToT)', 'MERL Capacity Building', 'CSO Strengthening', 'Grant Management Training'],
    image: './images/capacity-development-service-bg.jpg',
  },
  {
    id: 'research',
    icon: '🔬',
    title: 'Research & Diagnostics',
    desc: 'Applied mixed-methods research including baseline studies, endline surveys, KAP studies, labour market analyses, market studies, and situational diagnostics using quantitative and qualitative approaches.',
    features: ['Baseline & Endline Studies', 'SMART Nutritional Surveys', 'Labour Market Studies', 'Conflict & Gender Analysis', 'Feasibility Studies'],
    image: './images/organizational-assessment-bg.jpg',
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
  usePageSEO('Services & Practice Areas', 'Explore HIMAT Consulting’s specialized development advisory practice areas: OECD-DAC evaluations, third-party monitoring, applied research, and digital data collection solutions.')
  const { services } = useData()
  const displayServices = (services && services.length > 0) ? services : DEFAULT_SERVICES
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
            {displayServices.map((sv, idx) => {
              const isHovered = hoveredId === sv.id
              const isWhiteCard = isHovered

              return (
                <ScrollCard key={sv.id} index={idx} staggerDelay={150}>
                  <div
                    onMouseEnter={() => setHoveredId(sv.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                      background: isHovered ? 'linear-gradient(135deg, #760CB0 0%, #52077c 100%)' : '#ffffff',
                      borderRadius: '0px',
                      border: isHovered ? '1.5px solid #760CB0' : '1.5px solid rgba(118, 12, 176, 0.15)',
                      boxShadow: isHovered ? '0 20px 48px rgba(118, 12, 176, 0.28)' : '0 4px 16px rgba(0, 0, 0, 0.04)',
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
                      transform: isHovered ? 'translateY(-6px)' : 'none',
                    }}
                    className={`service-card-interactive ${isHovered ? 'is-hovered' : ''}`}
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
                          objectPosition: sv.focalPoint || 'center center',
                          display: 'block',
                          transition: 'transform 0.5s ease',
                          transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                        }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
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
                        color: isHovered ? '#ffffff' : '#210238',
                        transition: 'color 0.25s ease',
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
                            color: isHovered ? '#ffffff' : '#111111',
                            transition: 'color 0.25s ease',
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
                          color: isHovered ? 'rgba(255, 255, 255, 0.92)' : '#555555',
                          lineHeight: 1.65,
                          margin: 0,
                          fontWeight: 400,
                          transition: 'color 0.25s ease',
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
                              background: isHovered ? 'rgba(255, 255, 255, 0.18)' : 'rgba(118, 12, 176, 0.08)',
                              color: isHovered ? '#ffffff' : '#760CB0',
                              fontFamily: 'Arial, Helvetica, sans-serif',
                              fontWeight: 400,
                              fontSize: '13px',
                              padding: '0.3rem 0.75rem',
                              borderRadius: '999px',
                              border: isHovered ? '1px solid rgba(255, 255, 255, 0.35)' : '1px solid rgba(118, 12, 176, 0.12)',
                              transition: 'all 0.25s ease',
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

      
      {/* Specialized Digital Solutions & Survey Technologies Division */}
      <section style={{ background: '#ffffff', padding: '5.5rem 0 5rem', borderTop: '1px solid rgba(118,12,176,0.1)', borderBottom: '1px solid rgba(118,12,176,0.1)' }}>
        <div className="container" style={{ maxWidth: '1440px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
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
                marginBottom: '1rem',
              }}
            >
              DIGITAL & TECHNOLOGY DIVISION
            </div>
            <h2
              style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: '26px',
                fontWeight: 700,
                color: '#210238',
                lineHeight: 1.25,
                marginBottom: '0.75rem',
                textTransform: 'uppercase',
              }}
            >
              Digital Survey Systems & Web Platforms
            </h2>
            <p
              style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: '15px',
                fontWeight: 400,
                color: '#555',
                maxWidth: '720px',
                margin: '0 auto',
                lineHeight: 1.65,
              }}
            >
              Dedicated digital systems engineering and field technology solutions built to support large-scale evidence generation, CAPI survey logistics, and real-time donor dashboards.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {[
              {
                icon: '📱',
                title: 'CAPI & Mobile Data Collection',
                desc: 'End-to-end deployment of mobile survey tools utilizing KoBoToolbox, ODK, and SurveyCTO with automated validation rules, GPS geotagging, audio audit logging, and offline synchronization for high-risk field environments.',
                features: ['KoBoToolbox & ODK Custom Scripts', 'Real-time GPS Audit Tracking', 'Offline Multi-Lingual Forms', 'Automated Field Validation Logic']
              },
              {
                icon: '💻',
                title: 'Web Platforms & Donor Dashboards',
                desc: 'Custom web portal development using modern React, Node.js, and cloud backends. We build secure donor-facing progress dashboards, real-time KPI trackers, and interactive data visualization systems.',
                features: ['Custom Progress Portals', 'Interactive PowerBI & Web Dashboards', 'Role-Based Stakeholder Access', 'Automated Report Generation']
              },
              {
                icon: '🗄️',
                title: 'Survey Data Architecture & Analytics',
                desc: 'Secure database pipelines ensuring rigorous data cleaning, consistency verification, anonymization for human subject protection, and structured exports formatted for SPSS, Stata, R, and Python.',
                features: ['Data Anonymization & PII Security', 'SPSS & Stata Automated Pipelines', 'Cross-Sectional Cleaning Rules', 'Fiduciary Audit Documentation']
              },
              {
                icon: '⚙️',
                title: 'Office Automation & Institutional ERP',
                desc: 'Bespoke administrative tools, inventory tracking, field monitor dispatch systems, and project compliance workflows designed to streamline organizational operations and donor accountability.',
                features: ['Monitor Dispatch & Route Tracking', 'Institutional Asset Tracking', 'Automated Timesheet Verification', 'Secure Cloud Document Archives']
              }
            ].map((tech) => (
              <div
                key={tech.title}
                style={{
                  background: '#faf5ff',
                  borderRadius: '16px',
                  border: '1.5px solid rgba(118, 12, 176, 0.15)',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  boxShadow: '0 4px 18px rgba(118, 12, 176, 0.04)',
                }}
              >
                <div style={{ fontSize: '2rem', width: '54px', height: '54px', borderRadius: '12px', background: '#ffffff', border: '1px solid rgba(118,12,176,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  {tech.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '18px', fontWeight: 700, color: '#210238', margin: '0 0 0.5rem' }}>
                    {tech.title}
                  </h3>
                  <p style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px', color: '#555', lineHeight: 1.6, margin: 0 }}>
                    {tech.desc}
                  </p>
                </div>
                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(118,12,176,0.1)' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '13px', color: '#760CB0', lineHeight: 1.6, fontWeight: 600 }}>
                    {tech.features.map(f => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
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
