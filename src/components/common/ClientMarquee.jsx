import { useState, useEffect, useRef } from 'react'
import { CLIENT_LOGOS } from '../../data/clientLogos'

// Split 58 clients into 6 rows
const ROW1 = CLIENT_LOGOS.slice(0, 10)
const ROW2 = CLIENT_LOGOS.slice(10, 20)
const ROW3 = CLIENT_LOGOS.slice(20, 30)
const ROW4 = CLIENT_LOGOS.slice(30, 40)
const ROW5 = CLIENT_LOGOS.slice(40, 50)
const ROW6 = CLIENT_LOGOS.slice(50, 58)

function FloatingLogo({ client, globalIndex }) {
  // Strict sequential delay: Logo 1 -> Logo 2 -> Logo 3 -> Logo 4...
  const delay = (globalIndex * 0.07).toFixed(2)

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.75rem 1.25rem',
        margin: '0 1rem',
        background: 'transparent',
        border: 'none',
        borderRadius: '0px',
        boxShadow: 'none',
        flexShrink: 0,
        userSelect: 'none',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: 0,
        animation: `logoDropFromTop 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s forwards`,
      }}
      className="floating-client-logo"
      title={client.name}
    >
      {client.img ? (
        <img
          src={client.img}
          alt={client.name}
          style={{
            height: '64px',
            maxHeight: '64px',
            maxWidth: '220px',
            width: 'auto',
            objectFit: 'contain',
            display: 'block',
            mixBlendMode: 'multiply',
          }}
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      ) : client.svg ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'scale(1.3)' }}>
          {client.svg}
        </div>
      ) : (
        <span
          style={{
            fontFamily: "'Inter', Arial, sans-serif",
            fontWeight: 800,
            fontSize: '1.15rem',
            color: '#ffffff',
            whiteSpace: 'nowrap',
          }}
        >
          {client.name}
        </span>
      )}
    </div>
  )
}

export default function ClientMarquee() {
  const [isVisible, setIsVisible] = useState(false)
  const marqueeRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (marqueeRef.current) {
      observer.observe(marqueeRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // All rows move left-to-right (LTR)
  const rows = [
    { data: ROW1, speed: '32s', label: 'Multilateral & UN Agencies' },
    { data: ROW2, speed: '36s', label: 'INGOs & Bilaterals' },
    { data: ROW3, speed: '30s', label: 'Aga Khan Network (AKDN)' },
    { data: ROW4, speed: '35s', label: 'Government & Sovereign Units' },
    { data: ROW5, speed: '31s', label: 'Social Protection & RSPN' },
    { data: ROW6, speed: '34s', label: 'Global Research Partners' },
  ]

  let runningIndex = 0

  return (
    <div
      ref={marqueeRef}
      style={{
        overflow: 'hidden',
        padding: '2rem 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.35rem',
        background: 'transparent',
      }}
    >
      {rows.map((row, rowIdx) => (
        <div
          key={rowIdx}
          className="marquee-row"
          style={{
            overflow: 'hidden',
            display: 'flex',
            maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(-30px)',
            transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${rowIdx * 0.15}s`,
          }}
        >
          <div
            className="marquee-track-ltr"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              animationDuration: row.speed,
            }}
          >
            {[...row.data, ...row.data, ...row.data, ...row.data].map((c, i) => {
              const currentGlobalIndex = runningIndex++
              return <FloatingLogo key={`${c.id}-${rowIdx}-${i}`} client={c} globalIndex={currentGlobalIndex} />
            })}
          </div>
        </div>
      ))}

      <style>{`
        @keyframes logoDropFromTop {
          0% {
            opacity: 0;
            transform: translateY(-40px) scale(0.85);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .floating-client-logo:hover {
          transform: translateY(-4px) scale(1.1) !important;
          filter: drop-shadow(0 10px 18px rgba(118, 12, 176, 0.35)) !important;
        }

        .marquee-track-ltr {
          animation: marquee-ltr linear infinite;
        }

        @keyframes marquee-ltr {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
