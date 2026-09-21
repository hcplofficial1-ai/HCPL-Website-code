import { useState, useMemo, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import ScrollCard from '../components/common/ScrollCard'

export default function Reports() {
  const { reports, projects = [] } = useData()
  const [search, setSearch] = useState('')
  const [selectedSector, setSelectedSector] = useState('All')
  const [pdfViewerReport, setPdfViewerReport] = useState(null)
  const [requestModalReport, setRequestModalReport] = useState(null)
  const [requestedSuccess, setRequestedSuccess] = useState(false)

  const sectors = [
    'All',
    'Poverty Alleviation & Social Protection',
    'TVET & Skills',
    'Enterprise & Economic Growth',
    'Education',
    'Climate & Agriculture',
    'Public Health & Nutrition',
    'Humanitarian & Disaster Recovery',
  ]

  const filteredReports = useMemo(() => {
    return (reports || []).filter((r) => {
      const matchesSector =
        selectedSector === 'All' ||
        r.sector?.toLowerCase().includes(selectedSector.toLowerCase()) ||
        selectedSector.toLowerCase().includes(r.sector?.toLowerCase())

      const matchesSearch =
        !search.trim() ||
        r.title?.toLowerCase().includes(search.toLowerCase()) ||
        r.client?.toLowerCase().includes(search.toLowerCase()) ||
        r.coverage?.toLowerCase().includes(search.toLowerCase()) ||
        r.sector?.toLowerCase().includes(search.toLowerCase())

      return matchesSector && matchesSearch
    })
  }, [reports, search, selectedSector])

  // Body scroll lock and Escape key listener for PDF viewer & request modal
  useEffect(() => {
    if (pdfViewerReport || requestModalReport) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setPdfViewerReport(null)
        setRequestModalReport(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [pdfViewerReport, requestModalReport])

  const handleRequestSubmit = (e) => {
    e.preventDefault()
    setRequestedSuccess(true)
    setTimeout(() => {
      setRequestedSuccess(false)
      setRequestModalReport(null)
    }, 2800)
  }

  // PDF Document Window Generator
  const generateReportPdfWindow = (report, action = 'view') => {
    const printWindow = window.open('', '_blank', 'width=900,height=1000')
    if (!printWindow) {
      alert('Please allow popups to view and download the official report PDF.')
      return
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${report.title} - Official Research Report (${report.year})</title>
          <meta charset="utf-8" />
          <style>
            @page { size: A4 portrait; margin: 20mm; }
            body {
              font-family: 'Georgia', 'Times New Roman', serif;
              color: #212121;
              line-height: 1.75;
              padding: 35px;
              background: #fff;
              max-width: 800px;
              margin: 0 auto;
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
            .header-strip {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 3px solid #760CB0;
              padding-bottom: 20px;
              margin-bottom: 25px;
            }
            .org-title {
              font-size: 24px;
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
              font-size: 26px;
              font-weight: bold;
              color: #111;
              margin: 20px 0 10px;
              line-height: 1.25;
            }
            .meta-box {
              display: flex;
              gap: 20px;
              background: #faf5ff;
              border: 1px solid #e9d5ff;
              padding: 14px 20px;
              border-radius: 8px;
              font-family: Arial, sans-serif;
              font-size: 13px;
              margin-bottom: 25px;
            }
            .summary-box {
              background: #fdfaf7;
              border-left: 4px solid #760CB0;
              padding: 16px 20px;
              margin: 20px 0;
              font-size: 15px;
              font-family: Arial, sans-serif;
              color: #333;
              line-height: 1.75;
            }
            .footer-strip {
              margin-top: 40px;
              border-top: 1px solid #ddd;
              padding-top: 20px;
              font-family: Arial, sans-serif;
              font-size: 12px;
              color: #777;
              display: flex;
              justify-content: space-between;
            }
          </style>
        </head>
        <body>
          <div class="no-print-bar">
            <div>📄 <strong>HIMAT Consulting Official Research Report</strong></div>
            <div>
              <button class="action-btn" onclick="window.print()">🖨️ Print / Save PDF</button>
              <button class="action-btn close" onclick="window.close()">✕ Close Window</button>
            </div>
          </div>

          <div class="header-strip">
            <div>
              <div class="org-title">${report.client || 'HIMAT Consulting'}</div>
              <div class="org-sub">${report.clientCategory || 'Institutional Assessment Report'}</div>
            </div>
            <div style="font-family: Arial, sans-serif; font-weight: bold; color: #760CB0; border: 2px solid #760CB0; padding: 6px 12px; border-radius: 6px;">OFFICIAL PUBLICATION</div>
          </div>

          <div class="doc-title">${report.title}</div>

          <div class="meta-box">
            <div><strong>Sector:</strong> ${report.sector || 'Consultancy'}</div>
            <div><strong>Coverage:</strong> ${report.coverage || 'Pakistan'}</div>
            <div><strong>Year:</strong> ${report.year || '2026'}</div>
            <div><strong>Pages:</strong> ${report.pages || 'Full Dossier'}</div>
          </div>

          <div class="summary-box">
            <strong style="color: #760CB0; display: block; margin-bottom: 8px;">EXECUTIVE SUMMARY:</strong>
            ${report.summary || 'Official study report publication.'}
          </div>

          ${report.methodology ? `
            <div style="background: #faf5ff; padding: 16px 20px; border-radius: 8px; font-family: Arial, sans-serif; font-size: 13px; color: #444; margin-bottom: 25px;">
              <strong style="color: #760CB0; display: block; margin-bottom: 6px;">RESEARCH METHODOLOGY:</strong>
              ${report.methodology}
            </div>
          ` : ''}

          <div class="footer-strip">
            <div>HIMAT Consulting Private Limited (HCPL) · www.himatconsulting.com</div>
            <div>Ref: REP-${report.year}-${report.id}</div>
          </div>
        </body>
      </html>
    `

    printWindow.document.open()
    printWindow.document.write(htmlContent)
    printWindow.document.close()

    if (action === 'print') {
      setTimeout(() => {
        printWindow.focus()
        printWindow.print()
      }, 400)
    }
  }

  const dataURLtoBlobUrl = (dataUrl) => {
    if (!dataUrl || !dataUrl.startsWith('data:')) return dataUrl
    try {
      const arr = dataUrl.split(',')
      const mimeMatch = arr[0].match(/:(.*?);/)
      const mime = mimeMatch ? mimeMatch[1] : 'application/pdf'
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      const blob = new Blob([u8arr], { type: mime })
      return URL.createObjectURL(blob)
    } catch (err) {
      return dataUrl
    }
  }

  // Open / Read Document Handler
  const handleOpenPdf = (report) => {
    const isWord = report.pdfUrl && (report.pdfUrl.includes('.doc') || report.pdfUrl.includes('wordprocessingml') || report.docType === 'word')
    if (isWord) {
      handleDownloadPdf(report)
      return
    }
    if (report.pdfUrl && report.pdfUrl.trim() && report.pdfUrl !== '#') {
      const resolvedUrl = report.pdfUrl.startsWith('data:') ? dataURLtoBlobUrl(report.pdfUrl) : report.pdfUrl
      setPdfViewerReport({ ...report, resolvedPdfUrl: resolvedUrl })
    } else {
      generateReportPdfWindow(report, 'view')
    }
  }

  // Download Document Handler (PDF or Word .docx)
  const handleDownloadPdf = (report) => {
    if (report.pdfUrl && report.pdfUrl.trim() && report.pdfUrl !== '#') {
      const isWord = report.pdfUrl.includes('.doc') || report.pdfUrl.includes('wordprocessingml') || report.docType === 'word'
      const ext = isWord ? '.docx' : '.pdf'
      const resolvedUrl = report.pdfUrl.startsWith('data:') ? dataURLtoBlobUrl(report.pdfUrl) : report.pdfUrl
      const link = document.createElement('a')
      link.href = resolvedUrl
      link.download = report.docName || `${(report.title || 'report').replace(/[^a-z0-9]/gi, '_')}${ext}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      generateReportPdfWindow(report, 'print')
    }
  }

  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #760CB0 0%, #5a0886 100%)', padding: '5.5rem 0 4.5rem', color: '#fff' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', fontFamily: "'Inter', Arial, sans-serif", marginBottom: '1.5rem' }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <span style={{ color: '#fff' }}>Published Reports & Research</span>
          </div>
          <h1 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '1.25rem' }}>
            Published Reports & Evaluation Studies
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)', maxWidth: '640px', lineHeight: 1.75 }}>
            Access our publicly released evaluation reports, diagnostic assessments, baseline studies, and research publications generated across {projects.length} institutional assignments since 2009.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ background: '#faf5ff', padding: '2.5rem 0', borderBottom: '1px solid rgba(118,12,176,0.08)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
            {[
              { val: `${projects.length}+`, label: 'Studies & Evaluations Produced' },
              { val: '16+ Years', label: 'Knowledge Generation' },
              { val: '58+ Donors', label: 'UN, World Bank & INGOs' },
              { val: '100% Rigor', label: 'OECD-DAC Compliant' },
            ].map((stat) => (
              <div key={stat.label} style={{ background: '#fff', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(118,12,176,0.08)', boxShadow: '0 2px 10px rgba(118,12,176,0.04)' }}>
                <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '2.25rem', fontWeight: 700, color: '#760CB0', lineHeight: 1.1 }}>{stat.val}</div>
                <div style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '0.8125rem', fontWeight: 700, color: '#666', marginTop: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section style={{ background: '#fff', padding: '2rem 0', borderBottom: '1px solid rgba(118,12,176,0.08)', position: 'sticky', top: '72px', zIndex: 100, boxShadow: '0 2px 12px rgba(118,12,176,0.05)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Search Input */}
            <div style={{ flex: '1', minWidth: '280px' }}>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="🔍  Search by title, organization, country, or sector…"
                style={{
                  width: '100%',
                  padding: '0.65rem 1.15rem',
                  borderRadius: '10px',
                  border: '1.5px solid rgba(118,12,176,0.2)',
                  fontFamily: "'Inter', Arial, sans-serif",
                  fontSize: '0.85rem',
                  outline: 'none',
                }}
              />
            </div>

            {/* Sector Tabs / Dropdown */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                style={{
                  padding: '0.65rem 1.15rem',
                  borderRadius: '10px',
                  border: '1.5px solid rgba(118,12,176,0.2)',
                  fontFamily: "'Inter', Arial, sans-serif",
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#760CB0',
                  background: '#faf5ff',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                {sectors.map((sec) => (
                  <option key={sec} value={sec}>
                    {sec === 'All' ? 'All Sectors' : sec}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Reports Grid */}
      <section style={{ background: '#faf5ff', padding: '4rem 0 6rem' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '0.9rem', color: '#666', fontWeight: 600 }}>
              Showing <strong style={{ color: '#760CB0' }}>{filteredReports.length}</strong> publication{filteredReports.length !== 1 ? 's' : ''}
            </div>
            <div style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '0.8125rem', color: '#760CB0', fontWeight: 700 }}>
              📄 Full reports available to authorized stakeholders & via PDF
            </div>
          </div>

          {filteredReports.length === 0 ? (
            <div style={{ background: '#ffffff', borderRadius: '24px', border: '1.5px dashed rgba(118,12,176,0.25)', padding: '4rem 2rem', textAlign: 'center', boxShadow: '0 8px 30px rgba(118,12,176,0.03)' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>📄</div>
              <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '1.6rem', fontWeight: 700, color: '#111111', marginBottom: '0.5rem' }}>
                No Research Reports Published Yet
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: '#666', maxWidth: '520px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
                {search || selectedSector !== 'All'
                  ? 'No publications match your filter criteria. Try clearing the search or sector filter.'
                  : 'Upload your official study dossiers and PDFs through the Admin Portal to publish them here.'}
              </p>
              {!(search || selectedSector !== 'All') && (
                <Link to="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#760CB0', color: '#ffffff', padding: '0.75rem 1.5rem', borderRadius: '10px', textDecoration: 'none', fontWeight: 800, fontSize: '0.875rem', boxShadow: '0 4px 14px rgba(118,12,176,0.25)' }}>
                  + Open Admin Portal to Add Report
                </Link>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {filteredReports.map((report, idx) => {
              return (
                <ScrollCard key={report.id} index={idx} staggerDelay={180}>
                  <div
                    style={{
                      background: '#ffffff',
                      borderRadius: '24px',
                      border: '1.5px solid rgba(118,12,176,0.12)',
                      padding: '2rem 2.25rem',
                      boxShadow: '0 8px 30px rgba(118,12,176,0.05)',
                      display: 'flex',
                      gap: '2rem',
                      alignItems: 'flex-start',
                      boxSizing: 'border-box',
                      transition: 'all 0.3s ease',
                    }}
                    className="report-horizontal-card"
                  >
                    {/* Left Column: Cover / Icon & Client Brand */}
                    <div style={{ width: '180px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center', textAlign: 'center' }}>
                      {report.coverImage ? (
                        <div style={{ width: '100%', height: '180px', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(118,12,176,0.15)', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' }}>
                          <img src={report.coverImage} alt={report.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.currentTarget.style.display = 'none'} />
                        </div>
                      ) : (
                        <div style={{ width: '100%', height: '140px', background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)', borderRadius: '14px', border: '1.5px dashed rgba(118,12,176,0.25)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                          <span style={{ fontSize: '2.5rem' }}>📄</span>
                          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#760CB0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>PDF Dossier</span>
                        </div>
                      )}

                      {/* Client Logo & Category */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {report.logo && (
                          <img src={report.logo} alt={report.client} style={{ height: '26px', maxWidth: '65px', objectFit: 'contain' }} onError={e => e.currentTarget.style.display = 'none'} />
                        )}
                        {report.secondaryLogo && (
                          <img src={report.secondaryLogo} alt="Partner" style={{ height: '26px', maxWidth: '65px', objectFit: 'contain' }} onError={e => e.currentTarget.style.display = 'none'} />
                        )}
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#760CB0' }}>{report.client}</span>
                      </div>
                      <span style={{ background: '#faf5ff', color: '#760CB0', border: '1px solid rgba(118,12,176,0.15)', fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '0.75rem', padding: '0.2rem 0.65rem', borderRadius: '999px' }}>
                        Publication {report.year}
                      </span>
                    </div>

                    {/* Right Column: Title, Metadata, Summary & Actions */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div>
                          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#760CB0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{report.clientCategory || 'Research Report'}</span>
                          <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '1.45rem', fontWeight: 700, color: '#111111', margin: '0.25rem 0 0', lineHeight: 1.3 }}>
                            {report.title}
                          </h3>
                          {report.fundingPartner && (
                            <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.35rem', lineHeight: 1.4 }}>
                              <span style={{ fontWeight: 700, color: '#444' }}>Funding Partner:</span> {report.fundingPartner}
                              {report.authoringFirm && (
                                <> · <span style={{ fontWeight: 700, color: '#444' }}>Authoring Firm:</span> {report.authoringFirm}</>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Badges strip */}
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <span style={{ background: 'rgba(118,12,176,0.08)', color: '#760CB0', fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '0.78rem', padding: '0.2rem 0.65rem', borderRadius: '999px' }}>
                          {report.sector}
                        </span>
                        {report.secondarySector && (
                          <span style={{ background: 'rgba(118,12,176,0.04)', color: '#6b21a8', fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '0.76rem', padding: '0.2rem 0.65rem', borderRadius: '999px', border: '1px solid rgba(118,12,176,0.12)' }}>
                            {report.secondarySector}
                          </span>
                        )}
                        <span style={{ background: '#f5f5f5', color: '#616161', fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '0.78rem', padding: '0.2rem 0.65rem', borderRadius: '999px' }}>
                          {report.type}
                        </span>
                        <span style={{ background: '#f0fdf4', color: '#16a34a', fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '0.78rem', padding: '0.2rem 0.65rem', borderRadius: '999px' }}>
                          📍 {report.coverage}
                        </span>
                        {report.pages && (
                          <span style={{ background: '#faf5ff', color: '#760CB0', fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '0.78rem', padding: '0.2rem 0.65rem', borderRadius: '999px' }}>
                            📄 {report.pages}
                          </span>
                        )}
                      </div>

                      {/* Summary */}
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: '#444444', lineHeight: 1.7, margin: 0, flex: 1 }}>
                        {report.summary}
                      </p>

                      {/* Methodology Overview */}
                      {report.methodology && (
                        <div style={{ background: '#faf5ff', padding: '0.65rem 0.95rem', borderRadius: '10px', border: '1px solid rgba(118,12,176,0.1)', fontSize: '0.82rem', color: '#555' }}>
                          <strong style={{ color: '#760CB0', display: 'block', marginBottom: '0.2rem', fontSize: '0.78rem', textTransform: 'uppercase' }}>🔬 Research Methodology:</strong>
                          {report.methodology}
                        </div>
                      )}

                      {/* Key Findings Highlights */}
                      {Array.isArray(report.keyFindings) && report.keyFindings.filter(Boolean).length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', background: '#fdfaf7', padding: '0.75rem 1rem', borderRadius: '10px', borderLeft: '3.5px solid #760CB0' }}>
                          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#760CB0', textTransform: 'uppercase' }}>💡 {report.findingsTitle || 'Key Research Findings'}:</div>
                          {report.keyFindings.filter(Boolean).map((kf, i) => (
                            <div key={i} style={{ fontSize: '0.82rem', color: '#333', display: 'flex', gap: '0.4rem', alignItems: 'flex-start' }}>
                              <span style={{ color: '#760CB0', fontWeight: 800 }}>✓</span>
                              <span>{kf}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Actions */}
                      <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(118,12,176,0.08)', flexWrap: 'wrap' }}>
                        {report.pdfUrl && (report.pdfUrl.includes('.doc') || report.pdfUrl.includes('wordprocessingml') || report.docType === 'word') ? (
                          <button
                            onClick={() => handleDownloadPdf(report)}
                            style={{
                              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                              color: '#ffffff',
                              fontFamily: "'Inter', Arial, sans-serif",
                              fontWeight: 800,
                              fontSize: '0.85rem',
                              padding: '0.65rem 1.25rem',
                              borderRadius: '10px',
                              border: 'none',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.4rem',
                              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)',
                            }}
                          >
                            📝 Download Word Document (.docx)
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => handleOpenPdf(report)}
                              style={{
                                background: 'linear-gradient(135deg, #760CB0 0%, #5a0886 100%)',
                                color: '#ffffff',
                                fontFamily: "'Inter', Arial, sans-serif",
                                fontWeight: 800,
                                fontSize: '0.85rem',
                                padding: '0.65rem 1.25rem',
                                borderRadius: '10px',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                boxShadow: '0 4px 14px rgba(118,12,176,0.25)',
                              }}
                            >
                              📄 Read Official Report
                            </button>

                            <button
                              onClick={() => handleDownloadPdf(report)}
                              style={{
                                background: '#faf5ff',
                                color: '#760CB0',
                                fontFamily: "'Inter', Arial, sans-serif",
                                fontWeight: 800,
                                fontSize: '0.85rem',
                                padding: '0.65rem 1.25rem',
                                borderRadius: '10px',
                                border: '1.5px solid rgba(118,12,176,0.2)',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                              }}
                            >
                              📥 Download PDF
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollCard>
              )
            })}
          </div>
        )}
        </div>
      </section>

      {/* Full PDF Viewer Modal */}
      {typeof document !== 'undefined' && pdfViewerReport && createPortal(
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            boxSizing: 'border-box',
          }}
          onClick={() => setPdfViewerReport(null)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              maxWidth: '1100px',
              width: '100%',
              height: '92vh',
              display: 'flex',
              flexDirection: 'column',
              padding: '1.25rem 1.5rem',
              position: 'relative',
              boxShadow: '0 25px 80px rgba(0,0,0,0.5)',
              border: '2px solid rgba(118, 12, 176, 0.25)',
              boxSizing: 'border-box',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '1.5px solid rgba(118,12,176,0.12)', paddingBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ flex: 1, minWidth: '240px' }}>
                <div style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '0.75rem', fontWeight: 800, color: '#760CB0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  📄 Official Report Publication · {pdfViewerReport.client || 'HIMAT Consulting'} {pdfViewerReport.year ? `(${pdfViewerReport.year})` : ''}
                </div>
                <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '1.2rem', fontWeight: 700, color: '#111111', margin: '0.2rem 0 0', lineHeight: 1.25 }}>
                  {pdfViewerReport.title}
                </h3>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={() => {
                    const targetUrl = pdfViewerReport.resolvedPdfUrl || pdfViewerReport.pdfUrl
                    if (targetUrl) {
                      window.open(targetUrl, '_blank')
                    } else {
                      generateReportPdfWindow(pdfViewerReport, 'view')
                    }
                  }}
                  style={{
                    background: '#faf5ff',
                    color: '#760CB0',
                    fontFamily: "'Inter', Arial, sans-serif",
                    fontWeight: 800,
                    fontSize: '0.8125rem',
                    padding: '0.5rem 0.95rem',
                    borderRadius: '8px',
                    border: '1.5px solid rgba(118,12,176,0.25)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  ↗ Open in New Tab
                </button>
                <button
                  onClick={() => handleDownloadPdf(pdfViewerReport)}
                  style={{
                    background: 'linear-gradient(135deg, #760CB0 0%, #5a0886 100%)',
                    color: '#ffffff',
                    fontFamily: "'Inter', Arial, sans-serif",
                    fontWeight: 800,
                    fontSize: '0.8125rem',
                    padding: '0.5rem 1.1rem',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    boxShadow: '0 4px 12px rgba(118,12,176,0.3)',
                  }}
                >
                  📥 Download Document
                </button>
                <button
                  onClick={() => setPdfViewerReport(null)}
                  style={{
                    background: '#f3f4f6',
                    border: '1px solid rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    fontSize: '1.25rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#374151',
                    fontWeight: 700,
                  }}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Embedded PDF Object with Iframe & Fallback */}
            <div style={{ flex: 1, borderRadius: '12px', overflow: 'hidden', background: '#f8fafc', border: '1px solid rgba(118,12,176,0.12)', position: 'relative' }}>
              <object
                data={pdfViewerReport.resolvedPdfUrl || pdfViewerReport.pdfUrl}
                type="application/pdf"
                width="100%"
                height="100%"
                style={{ display: 'block', width: '100%', height: '100%' }}
              >
                <iframe
                  src={pdfViewerReport.resolvedPdfUrl || pdfViewerReport.pdfUrl}
                  title={pdfViewerReport.title}
                  style={{ width: '100%', height: '100%', border: 'none' }}
                >
                  <div style={{ padding: '3rem', textAlign: 'center', color: '#4b5563', fontFamily: "'Inter', sans-serif" }}>
                    <p style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>
                      Unable to display PDF directly in your browser.
                    </p>
                    <a
                      href={pdfViewerReport.resolvedPdfUrl || pdfViewerReport.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-block',
                        background: '#760CB0',
                        color: '#fff',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: 700,
                      }}
                    >
                      Open PDF in New Tab
                    </a>
                  </div>
                </iframe>
              </object>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Formal Request Access Modal */}
      {typeof document !== 'undefined' && requestModalReport && createPortal(
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
          onClick={() => setRequestModalReport(null)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '20px',
              maxWidth: '560px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              padding: '2.5rem',
              position: 'relative',
              boxShadow: '0 25px 60px rgba(118,12,176,0.25)',
              border: '1.5px solid rgba(118,12,176,0.12)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setRequestModalReport(null)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: '#faf5ff',
                border: '1px solid rgba(118,12,176,0.1)',
                cursor: 'pointer',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#760CB0',
                fontWeight: 700,
              }}
            >
              ×
            </button>

            <div style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
              Institutional Data Access
            </div>
            <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '1.6rem', fontWeight: 700, color: '#212121', lineHeight: 1.25, marginBottom: '0.75rem' }}>
              Request Full Report: {requestModalReport.title}
            </h3>

            {requestedSuccess ? (
              <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: '12px', padding: '1.5rem', textAlign: 'center', color: '#15803d', margin: '1.5rem 0' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✓</div>
                <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '0.25rem' }}>Request Submitted Successfully</div>
                <div style={{ fontSize: '0.85rem' }}>Our institutional liaison team will review your credentials and share the study dossier within 24 hours.</div>
              </div>
            ) : (
              <form onSubmit={handleRequestSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: "'Inter', Arial, sans-serif", fontSize: '0.8125rem', fontWeight: 700, color: '#424242', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Full Name *</label>
                  <input required type="text" placeholder="Dr. / Mr. / Ms. Full Name" style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1.5px solid rgba(118,12,176,0.2)', fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontFamily: "'Inter', Arial, sans-serif", fontSize: '0.8125rem', fontWeight: 700, color: '#424242', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Official Email Address *</label>
                  <input required type="email" placeholder="name@organization.org" style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1.5px solid rgba(118,12,176,0.2)', fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontFamily: "'Inter', Arial, sans-serif", fontSize: '0.8125rem', fontWeight: 700, color: '#424242', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Organization / Institution *</label>
                  <input required type="text" placeholder="e.g. World Bank / UN Agency / Ministry / University" style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1.5px solid rgba(118,12,176,0.2)', fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontFamily: "'Inter', Arial, sans-serif", fontSize: '0.8125rem', fontWeight: 700, color: '#424242', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Intended Use of Report</label>
                  <textarea rows={3} placeholder="Please brief us on how this research will inform your program, research, or policy development..." style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1.5px solid rgba(118,12,176,0.2)', fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', outline: 'none', resize: 'vertical' }} />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                  <button type="button" onClick={() => setRequestModalReport(null)} style={{ background: '#f5f5f5', color: '#666', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}>Cancel</button>
                  <button type="submit" style={{ background: '#760CB0', color: '#fff', border: 'none', padding: '0.65rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontFamily: "'Inter', Arial, sans-serif", fontWeight: 800, fontSize: '0.85rem', boxShadow: '0 4px 12px rgba(118,12,176,0.3)' }}>Submit Request</button>
                </div>
              </form>
            )}
          </div>
        </div>,
        document.body
      )}
      <style>{`
        @media (max-width: 768px) {
          .report-horizontal-card {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .report-horizontal-card > div:first-child {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  )
}
