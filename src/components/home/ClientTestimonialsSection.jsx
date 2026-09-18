import { useState } from 'react'

const TESTIMONIALS = [
  {
    client: 'Swiss Agency for Development and Cooperation (SDC)',
    logoText: 'SDC',
    color: '#d97706',
    quote: 'HCPL engaged effectively with a broad range of stakeholders—including local communities, women, and persons with disabilities—to develop a well-informed and insightful lessons learned report. Their recommendations have proven valuable in shaping the direction of future programming. We commend Himat for his professionalism, timely delivery, and the quality of work.',
    author: 'Swiss Agency for Development and Cooperation (SDC)',
  },
  {
    client: 'UNESCO Office in Pakistan',
    logoText: 'UNESCO',
    color: '#0284c7',
    quote: 'HIMAT Consulting Private Limited was engaged by UNESCO Office in Pakistan under two separate contracts, both of which were completed on time and to our satisfaction. UNESCO Pakistan wishes HIMAT Consulting the best of luck in the pursuit of its plans.',
    author: 'UNESCO Pakistan Directorate',
  },
  {
    client: 'Aga Khan Foundation Tajikistan',
    logoText: 'AKFT',
    color: '#16a34a',
    quote: 'Based on our experience with HIMAT Consulting Limited, we confidently recommend their services for similar projects. We express our appreciation for their professionalism and dedication to delivering high-quality services during our engagement. We extend our best wishes to HIMAT Consulting Limited in their future endeavors and look forward to further opportunities for collaboration.',
    author: 'Aga Khan Foundation Tajikistan',
  },
  {
    client: 'Ministry of Planning and Special Initiatives',
    logoText: 'SDG Unit',
    color: '#760CB0',
    quote: 'The SDG unit expressed complete satisfaction with the HCPL team\'s deliverables, emphasizing their exceptional quality and commitment to high work ethic. Wishing HIMAT Consulting Private Limited success in all their future endeavors.',
    author: 'Chief SDG Unit, Ministry of Planning',
  },
  {
    client: 'International Rescue Committee (IRC)',
    logoText: 'IRC',
    color: '#d97706',
    quote: 'HIMAT demonstrated strong technical expertise, contextual understanding, and professionalism throughout the assignment. We found their services highly valuable and recommend them for similar ICT-enabled health system strengthening initiatives.',
    author: 'International Rescue Committee (IRC)',
  },
  {
    client: 'CBM Germany',
    logoText: 'CBM',
    color: '#9333ea',
    quote: 'HIMAT Consulting demonstrated strong technical capacity, adherence to agreed deliverables, and effective collaboration with project stakeholders throughout the duration of these engagements. We acknowledge and appreciate the contributions of HIMAT Consulting to advancing CBM\'s mission of inclusion and disability rights through evidence-based research and evaluations.',
    author: 'CBM Germany International',
  },
  {
    client: 'Rural Support Programmes Network (RSPN)',
    logoText: 'RSPN',
    color: '#16a34a',
    quote: 'We found HIMAT\'s professional work methodologically strong and contextually grounded. We recommend them for similar education sector assessments and baseline studies.',
    author: 'Rural Support Programmes Network (RSPN)',
  },
]

export default function ClientTestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeTestimonial = TESTIMONIALS[activeIndex]

  return (
    <section
      style={{
        background: '#ffffff',
        color: '#210238',
        padding: '6rem 0 6.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div
            style={{
              fontFamily: "'Inter', Arial, sans-serif",
              fontSize: '0.8125rem',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#760CB0',
              background: '#f8f0fc',
              padding: '0.4rem 1.25rem',
              borderRadius: '999px',
              border: '1px solid rgba(118, 12, 176, 0.2)',
              display: 'inline-block',
              marginBottom: '1.2rem',
            }}
          >
            COMPANY PROFILE · 13
          </div>

          <h2
            style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              color: '#210238',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              marginBottom: '0.85rem',
            }}
          >
            OFFICIAL CLIENT TESTIMONIALS
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.05rem',
              color: '#555555',
              maxWidth: '650px',
              margin: '0 auto',
              lineHeight: 1.75,
              fontWeight: 500,
            }}
          >
            Direct commendations and institutional feedback from bilateral agencies, UN bodies, international NGOs, and government ministries.
          </p>
        </div>

        {/* Featured Testimonial Highlight Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #760CB0 0%, #4a0670 100%)',
            borderRadius: '30px',
            border: '1.5px solid rgba(118, 12, 176, 0.3)',
            boxShadow: '0 25px 65px rgba(118, 12, 176, 0.28)',
            padding: '4rem 3.5rem',
            maxWidth: '900px',
            margin: '0 auto 3rem',
            position: 'relative',
            textAlign: 'center',
            color: '#ffffff',
          }}
        >
          {/* Quote Mark Icon */}
          <div
            style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: '6rem',
              color: '#ffffff',
              opacity: 0.22,
              lineHeight: 0.5,
              marginBottom: '1rem',
            }}
          >
            “
          </div>

          <blockquote
            style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
              fontStyle: 'italic',
              color: '#ffffff',
              lineHeight: 1.6,
              margin: '0 0 2rem',
            }}
          >
            "{activeTestimonial.quote}"
          </blockquote>

          <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
            <span
              style={{
                fontFamily: "'Inter', Arial, sans-serif",
                fontWeight: 800,
                fontSize: '1.05rem',
                color: '#ffffff',
              }}
            >
              {activeTestimonial.client}
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: 600,
              }}
            >
              Institutional Commendation
            </span>
          </div>
        </div>

        {/* Interactive Client Selector Chips */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.85rem',
            justifyContent: 'center',
            maxWidth: '960px',
            margin: '0 auto',
          }}
        >
          {TESTIMONIALS.map((t, idx) => (
            <button
              key={t.client}
              onClick={() => setActiveIndex(idx)}
              style={{
                background: activeIndex === idx ? '#760CB0' : '#f8f0fc',
                color: activeIndex === idx ? '#ffffff' : '#760CB0',
                border: activeIndex === idx ? '2px solid #760CB0' : '1.5px solid rgba(118, 12, 176, 0.2)',
                borderRadius: '14px',
                padding: '0.75rem 1.4rem',
                fontFamily: "'Inter', Arial, sans-serif",
                fontWeight: 800,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: activeIndex === idx ? '0 8px 24px rgba(118, 12, 176, 0.3)' : '0 4px 14px rgba(0, 0, 0, 0.04)',
              }}
            >
              {t.logoText}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
