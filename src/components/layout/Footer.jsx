import { useState } from 'react'
import { Link } from 'react-router-dom'

const NAV_COLUMNS = [
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About HIMAT' },
      { to: '/team', label: 'Our People' },
      { to: '/consultants', label: 'Senior Consultants' },
      { to: '/services', label: 'Our Capabilities' },
    ],
  },
  {
    title: 'Work & Evidence',
    links: [
      { to: '/projects', label: '121 Projects Portfolio' },
      { to: '/clients', label: 'Institutional Clients' },
      { to: '/certificates', label: 'Completion Certificates' },
      { to: '/reports', label: 'Published Reports' },
    ],
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setTimeout(() => {
      setSubscribed(false)
      setEmail('')
    }, 4000)
  }

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://pk.linkedin.com/company/himat-consulting',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/share/18MGcCVuG5/',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/himatconsulting?igsi=MXhraWN2ams5bXJqdQ==',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
  ]

  return (
    <footer style={{ background: '#ffffff', color: '#212121', borderTop: '1px solid rgba(118, 12, 176, 0.12)', fontFamily: "'Inter', Arial, sans-serif" }}>
      {/* Main Top Grid */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '5rem 1.5rem 3.5rem' }}>
        {/* Brand Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.85rem', textDecoration: 'none', marginBottom: '1rem' }}>
            <img
              src="./himat-logo.png"
              alt="HIMAT Consulting Logo"
              style={{ height: '46px', width: 'auto', display: 'block' }}
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
            <div>
              <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '2rem', color: '#212121', lineHeight: 1.1 }}>
                <strong style={{ fontWeight: 700 }}>HIMAT</strong>{' '}
                <span style={{ fontWeight: 400, fontSize: '0.82em' }}>Consulting</span>
              </div>
              <div style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Private Limited
              </div>
            </div>
          </Link>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: '#666', maxWidth: '580px', lineHeight: 1.75, margin: 0 }}>
            Evidence-based consulting, diagnostic research, and OECD-DAC evaluations across South Asia, Central Asia, and global development corridors.
          </p>
        </div>

        {/* 4-Column Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1.1fr 1.6fr 2fr',
            gap: '3rem',
          }}
          className="footer-grid-layout"
        >
          {/* Column 1: Company */}
          <div>
            <div style={{ fontFamily: "'Inter', Arial, sans-serif", fontWeight: 800, fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#760CB0', marginBottom: '1.25rem' }}>
              Company
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {NAV_COLUMNS[0].links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  style={{ color: '#424242', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#760CB0')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#424242')}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Work & Evidence */}
          <div>
            <div style={{ fontFamily: "'Inter', Arial, sans-serif", fontWeight: 800, fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#760CB0', marginBottom: '1.25rem' }}>
              Work & Evidence
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {NAV_COLUMNS[1].links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  style={{ color: '#424242', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#760CB0')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#424242')}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Global Presence */}
          <div>
            <div style={{ fontFamily: "'Inter', Arial, sans-serif", fontWeight: 800, fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#760CB0', marginBottom: '1.25rem' }}>
              Global Locations
            </div>

            {/* Pakistan HQ */}
            <div style={{ background: '#faf5ff', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid rgba(118,12,176,0.1)', marginBottom: '0.75rem' }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.2rem' }}>
                🇵🇰 Pakistan Head Office
              </div>
              <div style={{ fontSize: '0.8125rem', color: '#424242', lineHeight: 1.45 }}>
                Office no 23 Ground Floor, Khudadad heights, Golra E11/4, Islamabad
              </div>
            </div>

            {/* USA Office */}
            <div style={{ background: '#faf5ff', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid rgba(118,12,176,0.1)' }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.2rem' }}>
                🇺🇸 HIMAT Consulting Inc. – USA
              </div>
              <div style={{ fontSize: '0.8125rem', color: '#424242', lineHeight: 1.45 }}>
                10498 Fountain Lake Dr, Apt 1028, Stafford, Texas 77477
              </div>
            </div>

            <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: '#666', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div>✉️ <a href="mailto:info@himatconsulting.com" style={{ color: '#760CB0', fontWeight: 700, textDecoration: 'none' }}>info@himatconsulting.com</a></div>
              <div>📞 <a href="tel:+923434484598" style={{ color: '#424242', fontWeight: 600, textDecoration: 'none' }}>+92 343 4484598</a></div>
            </div>
          </div>

          {/* Column 4: McKinsey-Style Subscribe Box */}
          <div style={{ background: '#faf5ff', padding: '2rem', borderRadius: '20px', border: '1.5px solid rgba(118, 12, 176, 0.14)' }}>
            <div style={{ fontFamily: "'Inter', Arial, sans-serif", fontWeight: 800, fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#760CB0', marginBottom: '0.4rem' }}>
              Subscribe to Insights
            </div>
            <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '1.45rem', fontWeight: 700, color: '#212121', lineHeight: 1.2, marginBottom: '0.65rem' }}>
              Stay Current With Our Latest Research
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.84rem', color: '#666', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Receive executive briefings, OECD-DAC evaluation findings, and market diagnostics directly in your inbox.
            </p>

            {subscribed ? (
              <div style={{ background: '#dcfce7', color: '#15803d', padding: '0.85rem 1rem', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 700 }}>
                ✓ Thank you for subscribing to HIMAT Insights.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  style={{
                    flex: '1',
                    minWidth: '180px',
                    padding: '0.65rem 0.95rem',
                    borderRadius: '10px',
                    border: '1.5px solid rgba(118, 12, 176, 0.25)',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.85rem',
                    outline: 'none',
                    background: '#ffffff',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: '#760CB0',
                    color: '#ffffff',
                    fontFamily: "'Inter', Arial, sans-serif",
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    padding: '0.65rem 1.35rem',
                    borderRadius: '10px',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(118, 12, 176, 0.3)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid rgba(118, 12, 176, 0.1)', maxWidth: '1280px', margin: '0 auto' }} />

      {/* Bottom Social Icons & Legal Strip */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
        {/* Social Media Circular Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {socialLinks.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#212121',
                color: '#ffffff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#760CB0'
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(118, 12, 176, 0.35)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#212121'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}
            >
              {s.icon}
            </a>
          ))}
          <span style={{ fontSize: '0.82rem', color: '#666', fontWeight: 600, marginLeft: '0.35rem' }}>
            Follow @HimatConsulting
          </span>
        </div>

        {/* Legal & Utility Links */}
        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', fontSize: '0.8125rem', color: '#666', fontWeight: 600, alignItems: 'center' }}>
          <Link to="/about" style={{ color: '#666', textDecoration: 'none' }}>Privacy Policy</Link>
          <span>·</span>
          <Link to="/contact" style={{ color: '#666', textDecoration: 'none' }}>Terms of Use</Link>
          <span>·</span>
          <Link to="/certificates" style={{ color: '#666', textDecoration: 'none' }}>Compliance & Ethics</Link>
          <span>·</span>
          <Link to="/contact" style={{ color: '#760CB0', textDecoration: 'none', fontWeight: 700 }}>Contact Us</Link>
          <span>·</span>
          <Link to="/admin/login" style={{ color: '#760CB0', textDecoration: 'none', fontWeight: 800, background: '#faf5ff', padding: '0.2rem 0.65rem', borderRadius: '6px', border: '1px solid rgba(118,12,176,0.2)' }}>🔐 Staff Portal</Link>
        </div>
      </div>

      {/* Final Copyright Bar */}
      <div style={{ background: '#faf5ff', borderTop: '1px solid rgba(118, 12, 176, 0.06)', padding: '1rem 1.5rem', textAlign: 'center', fontSize: '0.8125rem', color: '#757575' }}>
        © 2009–2026 HIMAT Consulting Private Limited. All rights reserved. Registered in Pakistan & United States of America.
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-grid-layout {
            grid-template-columns: 1fr 1fr !important;
            gap: 2.5rem !important;
          }
        }
        @media (max-width: 640px) {
          .footer-grid-layout {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </footer>
  )
}
