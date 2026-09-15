import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { SECTORS, TYPES, YEARS } from '../data/projects'
import { getClientLogo } from '../utils/clientLogos'

const PAGE_SIZE = 20

function Modal({ project, onClose }) {
  if (!project) return null
  const logoInfo = getClientLogo(project.client)

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(4px)',
        zIndex: 9000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '20px',
          maxWidth: '680px',
          width: '100%',
          maxHeight: '85vh',
          overflow: 'auto',
          padding: '2.25rem',
          position: 'relative',
          boxShadow: '0 25px 60px rgba(118,12,176,0.2)',
          border: '1.5px solid rgba(118,12,176,0.12)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: '#faf5ff',
            border: '1px solid rgba(118,12,176,0.1)',
            cursor: 'pointer',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            fontSize: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#760CB0',
            fontWeight: 700,
            transition: 'all 0.2s',
          }}
        >
          ×
        </button>

        {/* Organization Logo & Client Banner */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem',
            background: '#faf5ff',
            padding: '1rem 1.25rem',
            borderRadius: '14px',
            border: '1px solid rgba(118,12,176,0.08)',
          }}
        >
          {logoInfo.src ? (
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                background: '#ffffff',
                border: '1px solid rgba(118,12,176,0.12)',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(118,12,176,0.06)',
              }}
            >
              <img
                src={logoInfo.src}
                alt={project.client}
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  mixBlendMode: 'multiply',
                  display: 'block',
                }}
              />
            </div>
          ) : (
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #760CB0 0%, #9a2fd4 100%)',
                color: '#fff',
                fontFamily: "'Inter', Arial, sans-serif",
                fontWeight: 800,
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {logoInfo.initials}
            </div>
          )}
          <div>
            <div
              style={{
                fontFamily: "'Inter', Arial, sans-serif",
                fontSize: '0.8125rem',
                fontWeight: 800,
                color: '#760CB0',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Commissioning Organization
            </div>
            <h3
              style={{
                fontFamily: "'Inter', Arial, sans-serif",
                fontSize: '1.15rem',
                fontWeight: 800,
                color: '#212121',
                margin: '0.1rem 0 0',
              }}
            >
              {project.client}
            </h3>
          </div>
        </div>

        {/* Badges */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <span
            style={{
              background: 'rgba(118,12,176,0.08)',
              color: '#760CB0',
              fontFamily: "'Inter', Arial, sans-serif",
              fontWeight: 700,
              fontSize: '0.8125rem',
              padding: '0.25rem 0.75rem',
              borderRadius: '999px',
            }}
          >
            {project.sector}
          </span>
          <span
            style={{
              background: project.status === 'Ongoing' ? '#dcfce7' : '#f5f5f5',
              color: project.status === 'Ongoing' ? '#16a34a' : '#757575',
              fontFamily: "'Inter', Arial, sans-serif",
              fontWeight: 700,
              fontSize: '0.8125rem',
              padding: '0.25rem 0.75rem',
              borderRadius: '999px',
            }}
          >
            {project.status}
          </span>
          <span
            style={{
              background: '#faf5ff',
              color: '#760CB0',
              border: '1px solid rgba(118,12,176,0.12)',
              fontFamily: "'Inter', Arial, sans-serif",
              fontWeight: 700,
              fontSize: '0.8125rem',
              padding: '0.25rem 0.75rem',
              borderRadius: '999px',
            }}
          >
            Assignment #{project.no}
          </span>
        </div>

        <h2
          style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: '1.55rem',
            fontWeight: 700,
            color: '#212121',
            lineHeight: 1.3,
            marginBottom: '1.25rem',
          }}
        >
          {project.title}
        </h2>

        {/* Details Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {[
            ['Assignment Type', project.type],
            ['Sector Domain', project.sector],
            ['Engagement Year', project.year],
            ['Portfolio Status', project.status],
          ].map(([l, v]) => (
            <div
              key={l}
              style={{
                background: '#faf5ff',
                borderRadius: '10px',
                padding: '0.85rem 1rem',
                border: '1px solid rgba(118,12,176,0.06)',
              }}
            >
              <div
                style={{
                  fontFamily: "'Inter', Arial, sans-serif",
                  fontSize: '0.8125rem',
                  fontWeight: 800,
                  color: '#760CB0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '0.2rem',
                }}
              >
                {l}
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', color: '#424242', fontWeight: 600 }}>
                {v}
              </div>
            </div>
          ))}
        </div>

        {project.description && (
          <div style={{ borderTop: '1px solid rgba(118,12,176,0.08)', paddingTop: '1.25rem' }}>
            <div
              style={{
                fontFamily: "'Inter', Arial, sans-serif",
                fontSize: '0.8125rem',
                fontWeight: 800,
                color: '#760CB0',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '0.4rem',
              }}
            >
              Assignment Overview & Scope
            </div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.9rem',
                color: '#555555',
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              {project.description}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Projects() {
  const { projects } = useData()
  const [search, setSearch] = useState('')
  const [sector, setSector] = useState('All')
  const [type, setType] = useState('All')
  const [year, setYear] = useState('All')
  const [status, setStatus] = useState('All')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => {
    let r = projects
    if (sector !== 'All') r = r.filter((p) => p.sector === sector)
    if (type !== 'All') r = r.filter((p) => p.type === type)
    if (year !== 'All') r = r.filter((p) => p.year === year)
    if (status !== 'All') r = r.filter((p) => p.status === status)
    if (search.trim()) {
      const q = search.toLowerCase()
      r = r.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.client?.toLowerCase().includes(q) ||
          p.sector?.toLowerCase().includes(q) ||
          p.type?.toLowerCase().includes(q)
      )
    }
    return [...r].sort((a, b) => (Number(a.no) || 0) - (Number(b.no) || 0))
  }, [projects, sector, type, year, status, search])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const resetFilters = () => {
    setSector('All')
    setType('All')
    setYear('All')
    setStatus('All')
    setSearch('')
    setPage(1)
  }

  const ss = {
    select: {
      fontFamily: "'Inter', Arial, sans-serif",
      fontSize: '0.8125rem',
      fontWeight: 600,
      color: '#424242',
      background: '#fff',
      border: '1.5px solid rgba(118,12,176,0.2)',
      borderRadius: '8px',
      padding: '0.5rem 0.85rem',
      cursor: 'pointer',
      outline: 'none',
    },
    th: {
      fontFamily: "'Inter', Arial, sans-serif",
      fontSize: '0.8125rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: '#760CB0',
      padding: '0.95rem 1.1rem',
      textAlign: 'left',
      whiteSpace: 'nowrap',
      borderBottom: '2px solid rgba(118,12,176,0.1)',
      background: '#faf5ff',
    },
    td: {
      fontFamily: "'Inter', sans-serif",
      fontSize: '0.82rem',
      color: '#424242',
      padding: '0.85rem 1.1rem',
      borderBottom: '1px solid rgba(118,12,176,0.06)',
      verticalAlign: 'middle',
    },
  }

  return (
    <div>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #760CB0 0%, #5a0886 100%)',
          padding: '5rem 0 4rem',
          color: '#fff',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
              fontSize: '0.8125rem',
              color: 'rgba(255,255,255,0.65)',
              fontFamily: "'Inter', Arial, sans-serif",
              marginBottom: '1.5rem',
            }}
          >
            <Link to="/" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>
              Home
            </Link>
            <span>›</span>
            <span style={{ color: '#fff' }}>Projects</span>
          </div>
          <h1
            style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}
          >
            {projects.length} Assignments Across 5 Countries
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.8)',
              maxWidth: '580px',
              lineHeight: 1.75,
            }}
          >
            Browse our complete portfolio of evaluation, research, and advisory engagements delivered for global institutional clients since 2009.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section
        style={{
          background: '#fff',
          padding: '1.75rem 0',
          borderBottom: '1px solid rgba(118,12,176,0.08)',
          position: 'sticky',
          top: '72px',
          zIndex: 100,
          boxShadow: '0 2px 12px rgba(118,12,176,0.05)',
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              placeholder="🔍  Search projects or organizations…"
              style={{ ...ss.select, flex: '1', minWidth: '220px', padding: '0.55rem 1rem' }}
            />
            <select
              style={ss.select}
              value={sector}
              onChange={(e) => {
                setSector(e.target.value)
                setPage(1)
              }}
            >
              <option value="All">All Sectors</option>
              {SECTORS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <select
              style={ss.select}
              value={type}
              onChange={(e) => {
                setType(e.target.value)
                setPage(1)
              }}
            >
              <option value="All">All Types</option>
              {TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <select
              style={ss.select}
              value={year}
              onChange={(e) => {
                setYear(e.target.value)
                setPage(1)
              }}
            >
              <option value="All">All Years</option>
              {YEARS.map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
            <select
              style={ss.select}
              value={status}
              onChange={(e) => {
                setStatus(e.target.value)
                setPage(1)
              }}
            >
              <option value="All">All Status</option>
              <option>Ongoing</option>
              <option>Completed</option>
            </select>
            {(sector !== 'All' || type !== 'All' || year !== 'All' || status !== 'All' || search) && (
              <button
                onClick={resetFilters}
                style={{
                  fontFamily: "'Inter', Arial, sans-serif",
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: '#760CB0',
                  background: 'rgba(118,12,176,0.08)',
                  border: 'none',
                  padding: '0.55rem 1rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                Clear ×
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Results Table */}
      <section style={{ background: '#faf5ff', padding: '2.5rem 0 4.5rem' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.25rem',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}
          >
            <div style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '0.875rem', color: '#757575', fontWeight: 500 }}>
              Showing <strong style={{ color: '#760CB0' }}>{filtered.length}</strong> of {projects.length} assignments
            </div>
          </div>

          <div
            style={{
              background: '#fff',
              borderRadius: '16px',
              border: '1px solid rgba(118,12,176,0.08)',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(118,12,176,0.05)',
            }}
          >
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['#', 'Organization / Client', 'Project Title', 'Type', 'Sector', 'Year', 'Status'].map((h) => (
                      <th key={h} style={ss.th}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paged.length === 0 && (
                    <tr>
                      <td colSpan={7} style={{ ...ss.td, textAlign: 'center', padding: '3.5rem', color: '#9e9e9e' }}>
                        No projects match your filters.
                      </td>
                    </tr>
                  )}
                  {paged.map((p, idx) => {
                    const logoInfo = getClientLogo(p.client)

                    return (
                      <tr
                        key={p.no}
                        onClick={() => setSelected(p)}
                        style={{
                          cursor: 'pointer',
                          background: idx % 2 === 0 ? '#fff' : '#fdfaff',
                          transition: 'background 0.2s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = '#f5ebfc')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = idx % 2 === 0 ? '#fff' : '#fdfaff')}
                      >
                        {/* Assignment Number */}
                        <td style={{ ...ss.td, fontWeight: 700, color: '#760CB0', width: '52px' }}>
                          #{p.no}
                        </td>

                        {/* Organization Logo & Name */}
                        <td style={{ ...ss.td, minWidth: '200px', maxWidth: '240px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                            {logoInfo.src ? (
                              <div
                                style={{
                                  width: '36px',
                                  height: '36px',
                                  borderRadius: '8px',
                                  background: '#ffffff',
                                  border: '1px solid rgba(118,12,176,0.12)',
                                  padding: '3px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                  boxShadow: '0 2px 6px rgba(118,12,176,0.04)',
                                }}
                              >
                                <img
                                  src={logoInfo.src}
                                  alt={p.client}
                                  style={{
                                    maxHeight: '100%',
                                    maxWidth: '100%',
                                    objectFit: 'contain',
                                    mixBlendMode: 'multiply',
                                    display: 'block',
                                  }}
                                />
                              </div>
                            ) : (
                              <div
                                style={{
                                  width: '36px',
                                  height: '36px',
                                  borderRadius: '8px',
                                  background: 'linear-gradient(135deg, #f0e0fa 0%, #e0c8f5 100%)',
                                  color: '#760CB0',
                                  fontFamily: "'Inter', Arial, sans-serif",
                                  fontWeight: 800,
                                  fontSize: '0.8125rem',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                }}
                              >
                                {logoInfo.initials}
                              </div>
                            )}
                            <span style={{ fontWeight: 700, color: '#212121', lineHeight: 1.35 }}>
                              {p.client}
                            </span>
                          </div>
                        </td>

                        {/* Project Title */}
                        <td style={{ ...ss.td, minWidth: '260px', maxWidth: '380px' }}>
                          <span
                            style={{
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              lineHeight: 1.45,
                              color: '#333333',
                            }}
                          >
                            {p.title}
                          </span>
                        </td>

                        {/* Type */}
                        <td style={{ ...ss.td, maxWidth: '140px', color: '#666' }}>
                          {p.type}
                        </td>

                        {/* Sector */}
                        <td style={ss.td}>
                          <span
                            style={{
                              background: 'rgba(118,12,176,0.08)',
                              color: '#760CB0',
                              fontFamily: "'Inter', Arial, sans-serif",
                              fontWeight: 700,
                              fontSize: '0.8125rem',
                              padding: '0.2rem 0.6rem',
                              borderRadius: '999px',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {p.sector}
                          </span>
                        </td>

                        {/* Year */}
                        <td style={{ ...ss.td, whiteSpace: 'nowrap', fontWeight: 600, color: '#555' }}>
                          {p.year}
                        </td>

                        {/* Status */}
                        <td style={ss.td}>
                          <span
                            style={{
                              background: p.status === 'Ongoing' ? '#dcfce7' : '#f5f5f5',
                              color: p.status === 'Ongoing' ? '#16a34a' : '#757575',
                              fontFamily: "'Inter', Arial, sans-serif",
                              fontWeight: 700,
                              fontSize: '0.8125rem',
                              padding: '0.2rem 0.65rem',
                              borderRadius: '999px',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                style={{
                  fontFamily: "'Inter', Arial, sans-serif",
                  fontWeight: 600,
                  fontSize: '0.8125rem',
                  padding: '0.5rem 0.95rem',
                  borderRadius: '8px',
                  border: '1.5px solid rgba(118,12,176,0.2)',
                  background: '#fff',
                  color: '#760CB0',
                  cursor: 'pointer',
                  opacity: page === 1 ? 0.4 : 1,
                }}
              >
                ← Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((n) => Math.abs(n - page) <= 2)
                .map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    style={{
                      fontFamily: "'Inter', Arial, sans-serif",
                      fontWeight: 700,
                      fontSize: '0.8125rem',
                      padding: '0.5rem 0.95rem',
                      borderRadius: '8px',
                      border: '1.5px solid rgba(118,12,176,0.2)',
                      background: n === page ? '#760CB0' : '#fff',
                      color: n === page ? '#fff' : '#760CB0',
                      cursor: 'pointer',
                    }}
                  >
                    {n}
                  </button>
                ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                style={{
                  fontFamily: "'Inter', Arial, sans-serif",
                  fontWeight: 600,
                  fontSize: '0.8125rem',
                  padding: '0.5rem 0.95rem',
                  borderRadius: '8px',
                  border: '1.5px solid rgba(118,12,176,0.2)',
                  background: '#fff',
                  color: '#760CB0',
                  cursor: 'pointer',
                  opacity: page === totalPages ? 0.4 : 1,
                }}
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </section>

      <Modal project={selected} onClose={() => setSelected(null)} />
    </div>
  )
}

