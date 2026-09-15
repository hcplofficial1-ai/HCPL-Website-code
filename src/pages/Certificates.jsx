import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'

export default function Certificates() {
  const { certificates = [] } = useData()
  const [activeTab, setActiveTab] = useState('all')
  const [selectedCert, setSelectedCert] = useState(null)
  const [visibleCards, setVisibleCards] = useState({})
  const cardRefs = useRef({})
  const modalContentRef = useRef(null)

  const CATEGORIES = [
    { key: 'all', label: 'All Certificates & Letters', count: certificates.length },
    { key: 'multilateral', label: 'Planning Commission, World Bank & GIZ', count: certificates.filter(c => c.category === 'multilateral').length },
    { key: 'akdn', label: 'Aga Khan Network & SJDA', count: certificates.filter(c => c.category === 'akdn').length },
    { key: 'ingo', label: 'INGOs & Bilaterals (Concern, IRC, CBM, CARE)', count: certificates.filter(c => c.category === 'ingo').length },
    { key: 'national', label: 'Social Protection & NGOs (PSPA, RSPN)', count: certificates.filter(c => c.category === 'national').length },
  ]

  // Body scroll lock, scroll-to-top, and Escape key listener when modal opens
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden'
      if (modalContentRef.current) {
        modalContentRef.current.scrollTop = 0
      }
    } else {
      document.body.style.overflow = ''
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedCert(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedCert])

  const filtered = activeTab === 'all'
    ? certificates
    : certificates.filter((c) => c.category === activeTab)

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id')
            if (id) {
              setVisibleCards((prev) => ({ ...prev, [id]: true }))
            }
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    Object.values(cardRefs.current).forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [filtered])

  // PDF Generator & Print Document Opener
  const handleDownloadPDF = (cert) => {
    if (cert.downloadUrl && cert.downloadUrl !== '#' && (cert.downloadUrl.startsWith('data:application/pdf') || cert.downloadUrl.endsWith('.pdf'))) {
      const pdfWindow = window.open('', '_blank')
      if (pdfWindow) {
        pdfWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${cert.client} - Certificate PDF</title>
              <style>
                body { margin: 0; padding: 0; background: #1e293b; font-family: sans-serif; }
                .top-bar { position: fixed; top: 0; left: 0; right: 0; height: 50px; background: #760CB0; color: #fff; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; z-index: 99999; box-shadow: 0 2px 10px rgba(0,0,0,0.2); }
                .close-btn { background: #fff; color: #760CB0; border: none; padding: 6px 14px; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 14px; }
                .close-btn:hover { background: #f0e0fa; }
                iframe { position: absolute; top: 50px; left: 0; width: 100%; height: calc(100vh - 50px); border: none; }
              </style>
            </head>
            <body>
              <div class="top-bar">
                <span>📄 <strong>${cert.client}</strong> — Certificate Document</span>
                <button class="close-btn" onclick="window.close()">✕ Close Window</button>
              </div>
              <iframe src="${cert.downloadUrl}"></iframe>
            </body>
          </html>
        `)
        pdfWindow.document.close()
        return
      }
    }

    const printWindow = window.open('', '_blank', 'width=880,height=1000')
    if (!printWindow) {
      alert('Please allow popups to download and print the official certificate PDF.')
      return
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${cert.client} - Certificate of Completion (${cert.verifiedRef})</title>
          <meta charset="utf-8" />
          <style>
            @page { size: A4 portrait; margin: 20mm; }
            body {
              font-family: 'Georgia', 'Times New Roman', serif;
              color: #212121;
              line-height: 1.65;
              padding: 30px;
              background: #fff;
              max-width: 780px;
              margin: 0 auto;
            }
            .header-strip {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 2.5px solid #760CB0;
              padding-bottom: 18px;
              margin-bottom: 25px;
            }
            .org-title {
              font-size: 22px;
              font-weight: bold;
              color: #760CB0;
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }
            .org-sub {
              font-size: 13px;
              color: #666;
              font-family: Arial, sans-serif;
            }
            .doc-title {
              text-align: center;
              font-size: 24px;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 0.08em;
              color: #111;
              margin: 25px 0 10px;
            }
            .doc-subtitle {
              text-align: center;
              font-size: 14px;
              color: #555;
              font-family: Arial, sans-serif;
              margin-bottom: 25px;
            }
            .meta-box {
              display: flex;
              justify-content: space-between;
              background: #faf5ff;
              border: 1px solid #e9d5ff;
              padding: 12px 18px;
              border-radius: 6px;
              font-family: Arial, sans-serif;
              font-size: 13px;
              margin-bottom: 25px;
            }
            .body-text {
              font-size: 15px;
              color: #333;
              margin-bottom: 20px;
              text-align: justify;
            }
            .scope-box {
              background: #fdfaf7;
              border-left: 4px solid #760CB0;
              padding: 14px 18px;
              margin: 20px 0;
              font-size: 14px;
              font-family: Arial, sans-serif;
              color: #444;
            }
            .citation-box {
              background: #faf5ff;
              border: 1.5px dashed #760CB0;
              padding: 18px;
              border-radius: 8px;
              font-style: italic;
              color: #111;
              font-size: 14px;
              margin: 25px 0;
            }
            .signatory-strip {
              margin-top: 40px;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              border-top: 1px solid #ddd;
              padding-top: 20px;
              font-family: Arial, sans-serif;
            }
            .sign-name {
              font-weight: bold;
              font-size: 14px;
              color: #111;
            }
            .sign-desig {
              font-size: 13px;
              color: #555;
            }
            .seal-stamp {
              border: 2px solid #760CB0;
              color: #760CB0;
              font-weight: bold;
              font-size: 13px;
              text-transform: uppercase;
              padding: 8px 14px;
              border-radius: 6px;
              display: inline-block;
              letter-spacing: 0.1em;
            }
            .no-print-bar {
              position: sticky;
              top: 0;
              background: #760CB0;
              color: #fff;
              padding: 12px 18px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-family: Arial, sans-serif;
              font-size: 13px;
              margin-bottom: 24px;
              border-radius: 8px;
              box-shadow: 0 4px 14px rgba(0,0,0,0.15);
              z-index: 9999;
            }
            .action-btn {
              background: #ffffff;
              color: #760CB0;
              border: none;
              padding: 7px 14px;
              border-radius: 6px;
              font-weight: bold;
              cursor: pointer;
              font-size: 13px;
              margin-left: 8px;
            }
            .action-btn.close {
              background: rgba(255, 255, 255, 0.2);
              color: #ffffff;
              border: 1px solid #ffffff;
            }
            .action-btn:hover {
              opacity: 0.9;
            }
            @media print {
              .no-print-bar { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="no-print-bar">
            <span>🖨️ Official Certificate Document — <strong>${cert.client}</strong></span>
            <div>
              <button class="action-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
              <button class="action-btn close" onclick="window.close()">✕ Close Window</button>
            </div>
          </div>

          <div class="header-strip">
            <div>
              <div class="org-title">${cert.client}</div>
              <div class="org-sub">${cert.clientCategory} · Verified Institutional Document</div>
            </div>
            <div class="seal-stamp">OFFICIAL VERIFIED</div>
          </div>

          <div class="doc-title">Certificate of Completion</div>
          <div class="doc-subtitle">CONSULTANCY SERVICES EVALUATION & PERFORMANCE SIGN-OFF</div>

          <div class="meta-box">
            <div><strong>Reference ID:</strong> ${cert.verifiedRef}</div>
            <div><strong>Issue Date:</strong> ${cert.date}</div>
            <div><strong>Status:</strong> Successfully Delivered</div>
          </div>

          <div class="body-text">
            This is to certify that <strong>HIMAT Consulting Private Limited (HCPL)</strong> has satisfactorily completed the consultancy assignment entitled <strong>“${cert.title}”</strong> for <strong>${cert.client}</strong>.
          </div>

          <div class="scope-box">
            <strong>Scope of Engagement & Deliverables:</strong><br />
            ${cert.scope}
          </div>

          <div class="citation-box">
            <strong>Institutional Performance Evaluation:</strong><br />
            ${cert.citation}
          </div>

          <div class="signatory-strip">
            <div>
              <div class="sign-name">${cert.signatory}</div>
              <div class="sign-desig">Issuance Ref: ${cert.verifiedRef} · Date: ${cert.date}</div>
            </div>
            <div style="text-align: right;">
              <div class="seal-stamp">Verified 100% Satisfactory</div>
            </div>
          </div>
        </body>
      </html>
    `

    printWindow.document.open()
    printWindow.document.write(htmlContent)
    printWindow.document.close()
  }

  return (
    <div style={{ background: '#faf8fc', minHeight: '100vh' }}>
      {/* Hero Header with Earth Background */}
      <section
        style={{
          background: "linear-gradient(135deg, rgba(40, 0, 65, 0.90) 0%, rgba(118, 12, 176, 0.82) 55%, rgba(55, 0, 88, 0.92) 100%), url('./certificates-hero-bg.jpg') center center / cover no-repeat",
          padding: '6.5rem 0 5rem',
          color: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'inset 0 -15px 30px rgba(0,0,0,0.2)',
        }}
      >
        {/* Ambient atmospheric flare */}
        <div
          style={{
            position: 'absolute',
            top: '-25%',
            right: '-10%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)', fontFamily: "'Inter', Arial, sans-serif", marginBottom: '1.25rem' }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <span style={{ color: '#ffffff', fontWeight: 700 }}>Client Credentials</span>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', padding: '0.35rem 0.95rem', borderRadius: '999px', fontSize: '0.8125rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem', border: '1px solid rgba(255,255,255,0.2)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
            Official Verified Performance Records
          </div>

          <h1
            style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.08,
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
            }}
          >
            Completion Certificates & Performance Letters
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.9)',
              maxWidth: '680px',
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            A verified portfolio of <strong>20 official completion certificates</strong>, donor evaluations, and letters of commendation from the <strong>Government of Pakistan, World Bank, Aga Khan Foundation, UNICEF, GIZ, CARE, and Concern Worldwide</strong>.
          </p>
        </div>
      </section>

      {/* Filter Navigation Tabs */}
      <section style={{ background: '#ffffff', padding: '1.5rem 0', borderBottom: '1px solid rgba(118,12,176,0.1)', position: 'sticky', top: '70px', zIndex: 30, boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
        <div className="container" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
          {CATEGORIES.map((tab) => {
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  background: isActive ? 'linear-gradient(135deg, #760CB0 0%, #5a0886 100%)' : '#ffffff',
                  color: isActive ? '#ffffff' : '#424242',
                  border: isActive ? '1.5px solid #760CB0' : '1.5px solid rgba(118,12,176,0.15)',
                  padding: '0.55rem 1.25rem',
                  borderRadius: '999px',
                  fontFamily: "'Inter', Arial, sans-serif",
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isActive ? '0 6px 18px rgba(118,12,176,0.3)' : 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                }}
              >
                <span>{tab.label}</span>
                <span
                  style={{
                    background: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(118,12,176,0.08)',
                    color: isActive ? '#ffffff' : '#760CB0',
                    fontSize: '0.8125rem',
                    fontWeight: 800,
                    padding: '0.15rem 0.5rem',
                    borderRadius: '999px',
                  }}
                >
                  {tab.count}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Animated Certificate Cards Grid */}
      <section style={{ padding: '4.5rem 0 6rem' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '2rem',
            }}
          >
            {filtered.map((cert, index) => {
              const isVisible = visibleCards[cert.id]
              return (
                <div
                  key={cert.id}
                  data-id={cert.id}
                  ref={(el) => (cardRefs.current[cert.id] = el)}
                  style={{
                    background: '#ffffff',
                    borderRadius: '22px',
                    border: '1.5px solid rgba(118, 12, 176, 0.12)',
                    padding: '2rem',
                    boxShadow: isVisible
                      ? '0 12px 35px rgba(118, 12, 176, 0.08)'
                      : '0 4px 15px rgba(0, 0, 0, 0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    position: 'relative',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(35px) scale(0.96)',
                    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index % 3 * 0.1}s`,
                  }}
                  className="certificate-luxury-card"
                >
                  {/* Top Row: Logos & Verified Tag */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <div
                        style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '12px',
                          background: '#ffffff',
                          border: '1px solid rgba(118, 12, 176, 0.15)',
                          padding: '5px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        }}
                      >
                        <img
                          src={cert.logo}
                          alt={cert.client}
                          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }}
                          onError={(e) => { e.currentTarget.style.display = 'none' }}
                        />
                      </div>

                      {cert.secondaryLogo && (
                        <div
                          style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: '12px',
                            background: '#ffffff',
                            border: '1px solid rgba(118, 12, 176, 0.15)',
                            padding: '5px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                          }}
                        >
                          <img
                            src={cert.secondaryLogo}
                            alt={cert.client}
                            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }}
                            onError={(e) => { e.currentTarget.style.display = 'none' }}
                          />
                        </div>
                      )}

                      <div>
                        <div style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          {cert.clientCategory}
                        </div>
                        <div style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '0.92rem', fontWeight: 800, color: '#212121' }}>
                          {cert.client}
                        </div>
                      </div>
                    </div>

                    <span
                      style={{
                        background: '#f0fdf4',
                        color: '#16a34a',
                        border: '1px solid #bbf7d0',
                        fontFamily: "'Inter', Arial, sans-serif",
                        fontWeight: 800,
                        fontSize: '0.8125rem',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '999px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <span>✓</span> Verified
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "'Inter', Arial, sans-serif",
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      color: '#212121',
                      lineHeight: 1.35,
                      margin: 0,
                    }}
                  >
                    {cert.title}
                  </h3>

                  {/* Highlights Bar */}
                  <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        background: '#faf5ff',
                        color: '#760CB0',
                        fontFamily: "'Inter', Arial, sans-serif",
                        fontWeight: 700,
                        fontSize: '0.8125rem',
                        padding: '0.3rem 0.65rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(118, 12, 176, 0.12)',
                      }}
                    >
                      🏅 {cert.badge || cert.contractValue}
                    </span>
                    <span
                      style={{
                        background: '#f8fafc',
                        color: '#64748b',
                        fontFamily: "'Inter', Arial, sans-serif",
                        fontWeight: 600,
                        fontSize: '0.8125rem',
                        padding: '0.3rem 0.65rem',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                      }}
                    >
                      📅 {cert.date}
                    </span>
                  </div>

                  {/* Signatory summary */}
                  <div style={{ fontSize: '0.8125rem', color: '#64748b', lineHeight: 1.5, marginTop: 'auto' }}>
                    <strong style={{ color: '#334155' }}>Signatory:</strong> {cert.signatory.split('—')[0]}
                  </div>

                  {/* Action Buttons */}
                  <div
                    style={{
                      paddingTop: '1rem',
                      borderTop: '1px solid rgba(118, 12, 176, 0.08)',
                      display: 'grid',
                      gridTemplateColumns: '1fr auto',
                      gap: '0.65rem',
                    }}
                  >
                    <button
                      onClick={() => setSelectedCert(cert)}
                      style={{
                        background: 'linear-gradient(135deg, #760CB0 0%, #5a0886 100%)',
                        color: '#ffffff',
                        fontFamily: "'Inter', Arial, sans-serif",
                        fontWeight: 800,
                        fontSize: '0.82rem',
                        padding: '0.7rem 1rem',
                        borderRadius: '10px',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(118, 12, 176, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                    >
                      <span>📄 View Official Letter</span>
                      <span>→</span>
                    </button>

                    <button
                      onClick={() => handleDownloadPDF(cert)}
                      title="Open Printable Official Certificate PDF"
                      style={{
                        background: '#faf5ff',
                        color: '#760CB0',
                        fontFamily: "'Inter', Arial, sans-serif",
                        fontWeight: 800,
                        fontSize: '0.82rem',
                        padding: '0.7rem 1rem',
                        borderRadius: '10px',
                        border: '1.5px solid rgba(118, 12, 176, 0.2)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.35rem',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#760CB0'
                        e.currentTarget.style.color = '#ffffff'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#faf5ff'
                        e.currentTarget.style.color = '#760CB0'
                      }}
                    >
                      <span>📥 PDF</span>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Official Certificate & PDF Viewer Modal */}
      {selectedCert && createPortal(
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem',
            boxSizing: 'border-box',
          }}
          onClick={() => setSelectedCert(null)}
        >
          <div
            ref={modalContentRef}
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              maxWidth: '740px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '2.75rem',
              position: 'relative',
              boxShadow: '0 25px 70px rgba(0, 0, 0, 0.35)',
              border: '2px solid rgba(118, 12, 176, 0.18)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCert(null)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: '#faf5ff',
                border: '1px solid rgba(118,12,176,0.15)',
                cursor: 'pointer',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                fontSize: '1.3rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#760CB0',
                fontWeight: 700,
              }}
            >
              ×
            </button>

            {/* Official Letterhead Header */}
            <div style={{ borderBottom: '2.5px solid #760CB0', paddingBottom: '1.5rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
              <div>
                <div style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Institutional Performance Record · {selectedCert.clientCategory}
                </div>
                <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '1.75rem', fontWeight: 700, color: '#212121', lineHeight: 1.2, marginTop: '0.25rem' }}>
                  {selectedCert.title}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                <div style={{ width: '56px', height: '56px', background: '#fff', border: '1px solid rgba(118,12,176,0.15)', borderRadius: '12px', padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={selectedCert.logo} alt={selectedCert.client} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                </div>
                {selectedCert.secondaryLogo && (
                  <div style={{ width: '56px', height: '56px', background: '#fff', border: '1px solid rgba(118,12,176,0.15)', borderRadius: '12px', padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={selectedCert.secondaryLogo} alt={selectedCert.client} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                  </div>
                )}
              </div>
            </div>

            {/* Metadata Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#faf5ff', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid rgba(118,12,176,0.1)' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', textTransform: 'uppercase' }}>Official Reference ID</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#212121', marginTop: '0.15rem' }}>{selectedCert.verifiedRef}</div>
              </div>
              <div style={{ background: '#faf5ff', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid rgba(118,12,176,0.1)' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', textTransform: 'uppercase' }}>Issue Date</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#212121', marginTop: '0.15rem' }}>{selectedCert.date}</div>
              </div>
            </div>

            {/* Scope of Work */}
            <div style={{ background: '#fdfaff', padding: '1.15rem 1.35rem', borderRadius: '12px', border: '1px solid rgba(118,12,176,0.12)', marginBottom: '1.5rem', fontSize: '0.88rem', color: '#334155', lineHeight: 1.7 }}>
              <strong style={{ color: '#760CB0' }}>Scope of Assignment:</strong> {selectedCert.scope}
            </div>

            {/* Evaluator Commendation */}
            <div style={{ background: '#faf5ff', padding: '1.35rem', borderRadius: '14px', border: '1.5px dashed rgba(118,12,176,0.3)', marginBottom: '1.75rem' }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.06em' }}>
                Official Commendation & Performance Rating
              </div>
              <div style={{ fontStyle: 'italic', color: '#1e293b', fontSize: '0.92rem', lineHeight: 1.75 }}>
                {selectedCert.citation}
              </div>
            </div>

            {/* Signatory Authority */}
            <div style={{ background: '#f8fafc', padding: '1.1rem 1.35rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Authorized Signatory</div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a', marginTop: '0.2rem' }}>{selectedCert.signatory}</div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => handleDownloadPDF(selectedCert)}
                style={{
                  background: 'linear-gradient(135deg, #760CB0 0%, #5a0886 100%)',
                  color: '#ffffff',
                  fontFamily: "'Inter', Arial, sans-serif",
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  padding: '0.85rem 1.75rem',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(118,12,176,0.35)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                📥 Open & Save Certificate as PDF
              </button>
              <button
                onClick={() => setSelectedCert(null)}
                style={{
                  background: '#faf5ff',
                  color: '#760CB0',
                  fontFamily: "'Inter', Arial, sans-serif",
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  padding: '0.85rem 1.5rem',
                  borderRadius: '12px',
                  border: '1.5px solid rgba(118,12,176,0.2)',
                  cursor: 'pointer',
                }}
              >
                Close Window
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      <style>{`
        .certificate-luxury-card:hover {
          transform: translateY(-6px) scale(1.01) !important;
          box-shadow: 0 20px 45px rgba(118, 12, 176, 0.14) !important;
          border-color: rgba(118, 12, 176, 0.3) !important;
        }
      `}</style>
    </div>
  )
}
