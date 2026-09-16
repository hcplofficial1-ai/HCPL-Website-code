import { Link } from 'react-router-dom'

export default function VisionMissionMotto() {
  return (
    <section
      style={{
        background: '#ffffff',
        padding: '0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Full-Width Edge-to-Edge Banner Image with Overlay Button shifted further down */}
      <div
        style={{
          width: '100%',
          position: 'relative',
          maxHeight: '520px',
          overflow: 'hidden',
          background: '#32004a',
        }}
      >
        <img
          src="./images/vision-mission-banner.png"
          alt="Vision, Mission & Motto - Explore the purpose behind our work"
          style={{
            width: '100%',
            height: '100%',
            maxHeight: '520px',
            minHeight: '320px',
            objectFit: 'cover',
            objectPosition: 'center right',
            display: 'block',
          }}
          onError={(e) => {
            e.currentTarget.src = './images/hero-centre.jpg'
          }}
        />

        {/* Overlay Button Shifted Further Down towards bottom margin */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(38,0,60,0.68) 0%, rgba(76,8,120,0.25) 45%, transparent 100%)',
            display: 'flex',
            alignItems: 'flex-end',
            paddingLeft: 'clamp(2rem, 8vw, 8rem)',
            paddingBottom: '3.5rem',
          }}
          className="banner-button-overlay"
        >
          <Link
            to="/our-purpose"
            style={{
              background: '#ffffff',
              color: '#760CB0',
              fontFamily: "'Inter', Arial, sans-serif",
              fontWeight: 800,
              fontSize: '1.02rem',
              padding: '0.95rem 2.4rem',
              borderRadius: '999px',
              border: 'none',
              textDecoration: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="show-our-purpose-overlay-btn"
          >
            <span>Show Our Purpose</span>
            <span style={{ fontSize: '1.1rem' }}>→</span>
          </Link>
        </div>
      </div>

      <style>{`
        .show-our-purpose-overlay-btn:hover {
          background: #f3e8ff !important;
          color: #5a0886 !important;
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 16px 45px rgba(0, 0, 0, 0.5) !important;
        }

        @media (max-width: 768px) {
          .banner-button-overlay {
            padding-left: 1.5rem !important;
            padding-bottom: 2.2rem !important;
          }
        }
      `}</style>
    </section>
  )
}
