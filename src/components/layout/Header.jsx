import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useData } from '../../context/DataContext'

const NAV_STRUCTURE = [
  { to: '/', label: 'Home' },
  {
    label: 'About Us',
    matchPaths: ['/about', '/team', '/consultants'],
    items: [
      {
        to: '/about',
        label: 'Company Overview',
        desc: 'Vision, Mission & 16+ Years Legacy',
        icon: '🏛️',
      },
      {
        to: '/team',
        label: 'Our People',
        desc: 'Executive Advisory & Specialists',
        icon: '👥',
      },
      {
        to: '/consultants',
        label: 'Senior Consultants',
        desc: 'Independent Experts & Domain Advisors',
        icon: '🎓',
      },
    ],
  },
  { to: '/services', label: 'Services' },
  {
    label: 'Our Work',
    matchPaths: ['/projects', '/clients', '/certificates'],
    items: [
      {
        to: '/projects',
        label: 'Projects Portfolio',
        desc: 'Search Complete Assignment Database',
        icon: '💼',
      },
      {
        to: '/clients',
        label: 'Institutional Clients',
        desc: 'UN Agencies, World Bank & Donors',
        icon: '🌍',
      },
      {
        to: '/certificates',
        label: 'Completion Certificates',
        desc: 'Verified Letters & Donor Commendations',
        icon: '🏅',
      },
    ],
  },
  { to: '/reports', label: 'Published Reports' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const { projects = [] } = useData()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [mobileExpanded, setMobileExpanded] = useState({ 'About Us': false, 'Our Work': false })
  const location = useLocation()
  const dropdownTimeoutRef = useRef(null)

  const isHomePage = location.pathname === '/'
  const isTransparentHeader = isHomePage && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setOpenDropdown(null)
  }, [location])

  const handleMouseEnter = (label) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
    setOpenDropdown(label)
  }

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null)
    }, 180)
  }

  const toggleMobileSubmenu = (label) => {
    setMobileExpanded((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  const s = {
    header: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: isTransparentHeader ? 'transparent' : '#ffffff',
      borderBottom: isTransparentHeader
        ? '1px solid rgba(255, 255, 255, 0.15)'
        : scrolled
        ? '1px solid rgba(118,12,176,0.12)'
        : '1px solid transparent',
      boxShadow: !isTransparentHeader && scrolled ? '0 4px 24px rgba(118,12,176,0.08)' : 'none',
      transition: 'all 0.3s ease',
      height: '74px',
    },
    inner: {
      maxWidth: 'min(1560px, 94vw)',
      margin: '0 auto',
      padding: '0 clamp(1.25rem, 3vw, 2.5rem)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '74px',
    },
    nav: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.4rem',
    },
    navLink: {
      fontFamily: "'Inter', Arial, sans-serif",
      fontWeight: 700,
      fontSize: '0.88rem',
      padding: '0.5rem 0.85rem',
      borderRadius: '8px',
      color: isTransparentHeader ? 'rgba(255, 255, 255, 0.95)' : '#424242',
      textDecoration: 'none',
      transition: 'all 0.2s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.35rem',
      cursor: 'pointer',
    },
    navLinkActive: {
      color: isTransparentHeader ? '#ffffff' : '#760CB0',
      background: isTransparentHeader ? 'rgba(255, 255, 255, 0.2)' : 'rgba(118,12,176,0.08)',
    },
    dropdownMenu: {
      position: 'absolute',
      top: 'calc(100% + 4px)',
      left: '0',
      minWidth: '290px',
      background: '#ffffff',
      borderRadius: '16px',
      border: '1.5px solid rgba(118,12,176,0.14)',
      boxShadow: '0 14px 40px rgba(118,12,176,0.14), 0 2px 10px rgba(0,0,0,0.04)',
      padding: '0.75rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.35rem',
      zIndex: 1010,
      animation: 'fadeInUp 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
    },
    dropdownItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      padding: '0.75rem 0.9rem',
      borderRadius: '10px',
      textDecoration: 'none',
      transition: 'all 0.2s ease',
    },
    cta: {
      background: isTransparentHeader ? '#ffffff' : '#760CB0',
      color: isTransparentHeader ? '#760CB0' : '#ffffff',
      fontFamily: "'Inter', Arial, sans-serif",
      fontWeight: 800,
      fontSize: '0.88rem',
      padding: '0.6rem 1.35rem',
      borderRadius: '10px',
      border: 'none',
      cursor: 'pointer',
      marginLeft: '0.75rem',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      boxShadow: isTransparentHeader ? '0 4px 16px rgba(0, 0, 0, 0.25)' : '0 4px 14px rgba(118,12,176,0.35)',
      transition: 'all 0.2s ease',
    },
    burger: {
      display: 'none',
      flexDirection: 'column',
      gap: '5px',
      cursor: 'pointer',
      padding: '0.5rem',
      background: 'none',
      border: 'none',
    },
    burgerBar: {
      width: '24px',
      height: '2.5px',
      background: isTransparentHeader ? '#ffffff' : '#760CB0',
      borderRadius: '2px',
      transition: 'all 0.3s',
    },
    mobileMenu: {
      position: 'fixed',
      top: '74px',
      left: 0,
      right: 0,
      bottom: 0,
      background: '#ffffff',
      zIndex: 999,
      display: menuOpen ? 'flex' : 'none',
      flexDirection: 'column',
      padding: '1.5rem',
      gap: '0.5rem',
      overflowY: 'auto',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    },
  }

  return (
    <>
      <header style={s.header}>
        <div style={s.inner}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <img
              src="./himat-logo.png"
              alt="HIMAT Consulting Logo"
              style={{
                height: '42px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <span
                style={{
                  fontFamily: "'Source Serif 4', Georgia, serif",
                  fontSize: '1.45rem',
                  color: isTransparentHeader ? '#ffffff' : '#212121',
                  letterSpacing: '-0.01em',
                }}
              >
                <strong style={{ fontWeight: 700 }}>HIMAT</strong>{' '}
                <span style={{ fontWeight: 400, fontSize: '0.85em' }}>Consulting</span>
              </span>
              <span
                style={{
                  fontFamily: "'Inter', Arial, sans-serif",
                  fontWeight: 800,
                  fontSize: '0.8125rem',
                  color: isTransparentHeader ? 'rgba(255,255,255,0.85)' : '#760CB0',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Private Limited
              </span>
            </div>
          </Link>

          {/* Desktop Navigation with Dropdowns */}
          <nav style={s.nav} className="desktop-nav">
            {NAV_STRUCTURE.map((item) => {
              if (item.items) {
                const isGroupActive = item.matchPaths.some((p) => location.pathname === p)
                const isOpen = openDropdown === item.label

                return (
                  <div
                    key={item.label}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      type="button"
                      style={{
                        ...s.navLink,
                        background: isGroupActive
                          ? isTransparentHeader
                            ? 'rgba(255,255,255,0.2)'
                            : 'rgba(118,12,176,0.08)'
                          : 'transparent',
                        color: isGroupActive
                          ? isTransparentHeader
                            ? '#ffffff'
                            : '#760CB0'
                          : isTransparentHeader
                          ? 'rgba(255, 255, 255, 0.95)'
                          : '#424242',
                      }}
                      onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                    >
                      <span>{item.label}</span>
                      <span style={{ fontSize: '0.8125rem', transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'none', color: isTransparentHeader ? '#ffffff' : '#760CB0' }}>
                        ▼
                      </span>
                    </button>

                    {isOpen && (
                      <div style={s.dropdownMenu}>
                        {item.items.map((sub) => {
                          const isSubActive = location.pathname === sub.to
                          return (
                            <Link
                              key={sub.to}
                              to={sub.to}
                              style={{
                                ...s.dropdownItem,
                                background: isSubActive ? 'rgba(118,12,176,0.08)' : '#faf5ff',
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.background = '#f0e0fa')}
                              onMouseLeave={(e) => (e.currentTarget.style.background = isSubActive ? 'rgba(118,12,176,0.08)' : '#faf5ff')}
                            >
                              <span style={{ fontSize: '1.2rem', marginTop: '0.1rem' }}>{sub.icon}</span>
                              <div>
                                <div style={{ fontFamily: "'Inter', Arial, sans-serif", fontWeight: 800, fontSize: '0.86rem', color: isSubActive ? '#760CB0' : '#212121' }}>
                                  {sub.to === '/projects' ? `${projects.length} Projects Portfolio` : sub.label}
                                </div>
                                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', color: '#666', marginTop: '0.15rem' }}>
                                  {sub.desc}
                                </div>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  style={({ isActive }) => ({
                    ...s.navLink,
                    color: isActive
                      ? isTransparentHeader
                        ? '#ffffff'
                        : '#760CB0'
                      : isTransparentHeader
                      ? 'rgba(255, 255, 255, 0.95)'
                      : '#424242',
                    background: isActive
                      ? isTransparentHeader
                        ? 'rgba(255,255,255,0.2)'
                        : 'rgba(118,12,176,0.08)'
                      : 'transparent',
                  })}
                  end={item.to === '/'}
                >
                  {item.label}
                </NavLink>
              )
            })}

            {/* Get In Touch CTA */}
            <Link to="/contact" style={s.cta} className="btn-touch">
              Get In Touch
            </Link>
          </nav>

          {/* Mobile Hamburger Icon */}
          <button
            type="button"
            style={s.burger}
            className="mobile-burger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <div style={{ ...s.burgerBar, transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <div style={{ ...s.burgerBar, opacity: menuOpen ? 0 : 1 }} />
            <div style={{ ...s.burgerBar, transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div style={s.mobileMenu} className="mobile-drawer">
        {NAV_STRUCTURE.map((item) => {
          if (item.items) {
            const isExpanded = mobileExpanded[item.label]
            const isGroupActive = item.matchPaths.some((p) => location.pathname === p)

            return (
              <div key={item.label} style={{ borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
                <button
                  type="button"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '0.75rem 0',
                    background: 'none',
                    border: 'none',
                    fontFamily: "'Inter', Arial, sans-serif",
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: isGroupActive ? '#760CB0' : '#212121',
                  }}
                  onClick={() => toggleMobileSubmenu(item.label)}
                >
                  <span>{item.label}</span>
                  <span style={{ fontSize: '0.8125rem', color: '#760CB0', transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                    ▼
                  </span>
                </button>

                {isExpanded && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1rem', paddingBottom: '0.5rem' }}>
                    {item.items.map((sub) => (
                      <Link
                        key={sub.to}
                        to={sub.to}
                        style={{
                          textDecoration: 'none',
                          fontFamily: "'Inter', Arial, sans-serif",
                          fontWeight: 600,
                          fontSize: '0.9rem',
                          color: location.pathname === sub.to ? '#760CB0' : '#555',
                          padding: '0.4rem 0',
                        }}
                      >
                        {sub.icon} {sub.to === '/projects' ? `${projects.length} Projects Portfolio` : sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          }

          return (
            <NavLink
              key={item.to}
              to={item.to}
              style={({ isActive }) => ({
                fontFamily: "'Inter', Arial, sans-serif",
                fontWeight: 700,
                fontSize: '1rem',
                padding: '0.75rem 0',
                color: isActive ? '#760CB0' : '#212121',
                textDecoration: 'none',
                borderBottom: '1px solid #eee',
              })}
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          )
        })}

        <Link
          to="/contact"
          style={{
            ...s.cta,
            marginLeft: 0,
            marginTop: '1rem',
            textAlign: 'center',
            justifyContent: 'center',
          }}
        >
          Get In Touch
        </Link>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 991px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-burger {
            display: flex !important;
          }
        }
      `}</style>
    </>
  )
}
