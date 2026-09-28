import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const sections = [
    {
      id: 'sec-1',
      num: '1',
      title: 'Information We Collect',
      content: (
        <>
          <p>
            HIMAT Consulting Private Limited (HCPL) collects information necessary to deliver professional services, engage consultants, communicate with partners, and maintain a secure online platform.
          </p>
          <p>We may collect information such as:</p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: '1.8', margin: '0.75rem 0' }}>
            <li>Full name, professional title, and organization;</li>
            <li>Contact details including email address, telephone numbers, and physical address;</li>
            <li>Curriculum Vitae (CV), employment history, academic qualifications, and professional references submitted for employment or consultancy rosters;</li>
            <li>Inquiry, partnership, or proposal details submitted voluntarily through forms on this Website;</li>
            <li>Technical and website usage information, including IP address, browser type, operating system, and browsing activity collected automatically.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'sec-2',
      num: '2',
      title: 'Legitimate Purposes & Use of Information',
      content: (
        <>
          <p>
            HCPL uses this information only for legitimate purposes, strictly aligned with development consultancy operations, including:
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: '1.8', margin: '0.75rem 0' }}>
            <li>Responding to general inquiries, requests for proposals, and institutional communications;</li>
            <li>Recruitment, expert vetting, and consultant engagement across international development projects;</li>
            <li>Partnership development, consortium building, and institutional collaboration;</li>
            <li>Project administration, contract execution, and technical deliverable management;</li>
            <li>Applied research, diagnostic assessments, monitoring, and evaluation activities;</li>
            <li>Website performance improvement, analytics, and user experience enhancements; and</li>
            <li>Maintaining cyber security and compliance with applicable legal, contractual, donor, and regulatory requirements.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'sec-3',
      num: '3',
      title: 'Core Data Principles, Confidentiality & Retention',
      content: (
        <>
          <p>
            HCPL follows strict principles of <strong>confidentiality, transparency, data minimization, secure storage, controlled access, ethical use, and responsible data sharing</strong> across all operations.
          </p>
          <p>
            Personal information is retained only as long as necessary to fulfill the operational, contractual, legal, or research purposes for which it was collected. When no longer required, information is securely disposed of, anonymized, or deleted in accordance with HCPL's institutional data retention protocols.
          </p>
        </>
      ),
    },
    {
      id: 'sec-4',
      num: '4',
      title: 'Data Sharing & Non-Disclosure (We Do Not Sell Information)',
      content: (
        <>
          <p>
            <strong>We do not sell personal information under any circumstances.</strong>
          </p>
          <p>
            Information may be shared only on a strict need-to-know basis with authorized employees, registered senior consultants, institutional clients, development partners, verified service providers, or regulatory authorities where necessary, lawful, or required for legitimate business purposes. All third-party recipients are bound by strict confidentiality and data-protection obligations.
          </p>
        </>
      ),
    },
    {
      id: 'sec-5',
      num: '5',
      title: 'Information Security & Technical Safeguards',
      content: (
        <>
          <p>
            HCPL applies robust and appropriate administrative, technical, and physical security measures to safeguard personal data against unauthorized access, loss, misuse, or alteration. These measures include:
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: '1.8', margin: '0.75rem 0' }}>
            <li>Role-based access controls limiting data accessibility to authorized personnel only;</li>
            <li>Strong password protection and multi-factor authentication protocols;</li>
            <li>Industry-standard data encryption in transit and where appropriate at rest;</li>
            <li>Systematic data backups and disaster-recovery safeguards; and</li>
            <li>Active cybersecurity monitoring and documented incident-response procedures.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'sec-6',
      num: '6',
      title: 'Cookies, Digital Tracking & External Links',
      content: (
        <>
          <p>
            Our website may use cookies or similar technologies to support essential website functionality, maintain security, gather aggregated usage analytics, and improve the user experience. You can adjust your browser settings to refuse cookies if preferred.
          </p>
          <p>
            Our Website may contain links to external third-party platforms, partner websites, or donor portals. Third-party websites linked from our site operate under their own independent privacy policies, and HCPL accepts no responsibility for their respective practices or content.
          </p>
        </>
      ),
    },
    {
      id: 'sec-7',
      num: '7',
      title: 'Data Subject Rights & Access Requests',
      content: (
        <>
          <p>
            Where applicable under relevant data-protection laws, individuals have the right to request:
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: '1.8', margin: '0.75rem 0' }}>
            <li>Confirmation of whether HCPL holds personal data concerning them;</li>
            <li>Access to or a copy of the personal information held;</li>
            <li>Correction or updating of inaccurate, outdated, or incomplete details;</li>
            <li>Deletion or restriction of personal data, subject to legal, contractual, research, safeguarding, or other legitimate retention requirements.</li>
          </ul>
          <p>
            To exercise these rights, individuals may contact HCPL’s administration via the official communication channels provided below.
          </p>
        </>
      ),
    },
  ]

  return (
    <div className="no-reveal" style={{ background: '#ffffff', minHeight: '100vh', color: '#212121', fontFamily: "'Inter', Arial, sans-serif" }}>
      {/* 1. Hero Header */}
      <section
        className="no-reveal"
        style={{
          background: 'linear-gradient(135deg, #760CB0 0%, #5a0886 100%)',
          padding: '6.5rem 0 4rem',
          color: '#ffffff',
          position: 'relative',
        }}
      >
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          {/* Breadcrumb */}
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.75)',
              marginBottom: '1.5rem',
              fontWeight: 500,
            }}
          >
            <Link to="/" style={{ color: '#ffffff', textDecoration: 'underline' }}>
              Home
            </Link>
            <span>›</span>
            <span>Legal & Governance</span>
            <span>›</span>
            <span style={{ color: '#ffffff', fontWeight: 700 }}>Privacy Policy</span>
          </div>

          {/* Badge */}
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
                fontSize: '0.8125rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#ffffff',
              }}
            >
              Data Protection & Privacy Standards
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.15,
              marginBottom: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
            }}
          >
            PRIVACY POLICY
          </h1>

          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.92)',
              fontWeight: 600,
              marginBottom: '0.5rem',
            }}
          >
            HIMAT Consulting Private Limited (HCPL)
          </div>

          <div
            style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.12)',
              padding: '0.25rem 0.85rem',
              borderRadius: '6px',
              fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.85)',
            }}
          >
            Last Updated: 28 September 2026
          </div>
        </div>
      </section>

      {/* 2. Preamble Banner */}
      <section className="no-reveal" style={{ background: '#faf5ff', borderBottom: '1px solid rgba(118,12,176,0.12)', padding: '2.5rem 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1.5px solid rgba(118,12,176,0.18)',
              padding: '2rem 2.25rem',
              boxShadow: '0 10px 30px rgba(118,12,176,0.06)',
              lineHeight: '1.75',
              fontSize: '1.05rem',
              color: '#212121',
            }}
          >
            <p style={{ margin: 0, fontWeight: 600, lineHeight: 1.8 }}>
              HIMAT Consulting Private Limited (HCPL) respects your privacy and is committed to protecting personal information collected through this website. This Privacy Policy details the types of information we collect, the legitimate operational purposes for which it is processed, and our comprehensive security protocols.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Main Legal Content (Sections) */}
      <section className="no-reveal" style={{ padding: '3.5rem 0 5rem' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {sections.map((s) => (
              <article
                key={s.id}
                id={s.id}
                className="no-reveal"
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  border: '1.5px solid rgba(118,12,176,0.18)',
                  padding: '2rem 2.25rem',
                  boxShadow: '0 10px 30px rgba(118,12,176,0.06)',
                  opacity: 1,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', borderBottom: '1px solid rgba(118,12,176,0.1)', paddingBottom: '0.85rem' }}>
                  <span
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, #760CB0 0%, #5a0886 100%)',
                      color: '#ffffff',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      flexShrink: 0,
                    }}
                  >
                    {s.num}
                  </span>
                  <h2
                    style={{
                      fontFamily: "'Source Serif 4', Georgia, serif",
                      fontSize: '1.45rem',
                      fontWeight: 700,
                      color: '#111111',
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    {s.title}
                  </h2>
                </div>

                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.96rem',
                    lineHeight: '1.8',
                    color: '#424242',
                  }}
                >
                  {s.content}
                </div>
              </article>
            ))}
          </div>

          {/* Contact & Inquiries Card */}
          <div
            style={{
              marginTop: '3.5rem',
              background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
              borderRadius: '16px',
              border: '1.5px solid rgba(118,12,176,0.25)',
              padding: '2.5rem',
              textAlign: 'center',
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '0.8125rem', color: '#760CB0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
              Data Protection & Privacy Directorate
            </div>
            <h3
              style={{
                fontFamily: "'Source Serif 4', Georgia, serif",
                fontSize: '1.75rem',
                fontWeight: 700,
                color: '#111111',
                margin: '0 0 0.85rem',
              }}
            >
              Questions or Data Requests?
            </h3>
            <p style={{ maxWidth: '640px', margin: '0 auto 1.75rem', color: '#555555', fontSize: '0.95rem', lineHeight: 1.65 }}>
              If you have any questions regarding this Privacy Policy, or wish to exercise your data subject rights, please reach out to HCPL's administrative directorate.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="mailto:info@himatconsulting.com"
                style={{
                  background: '#760CB0',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  padding: '0.75rem 1.65rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 14px rgba(118,12,176,0.3)',
                }}
              >
                ✉ Email Privacy Directorate
              </a>
              <Link
                to="/contact"
                style={{
                  background: '#ffffff',
                  color: '#760CB0',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  padding: '0.75rem 1.65rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  border: '1.5px solid rgba(118,12,176,0.3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                Official Contact Form →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
