export default function CompanyProfileBar() {
  return (
    <section
      style={{
        background: '#ffffff',
        padding: '3rem 0',
        borderBottom: '1px solid rgba(118,12,176,0.1)',
      }}
    >
      <div className="container">
        <div
          style={{
            background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
            borderRadius: '24px',
            border: '1.5px solid rgba(118, 12, 176, 0.12)',
            padding: '2rem 2.5rem',
            boxShadow: '0 8px 30px rgba(118, 12, 176, 0.04)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          {/* SECP Registration */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <span style={{ fontSize: '1.8rem' }}>🏛️</span>
            <div>
              <div style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                SECP REGISTERED (ACT 2017)
              </div>
              <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '1.3rem', fontWeight: 700, color: '#111111' }}>
                CUI: 0116466 · NTN: 8904447
              </div>
            </div>
          </div>

          {/* Texas USA Incorporation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <span style={{ fontSize: '1.8rem' }}>🇺🇸</span>
            <div>
              <div style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                TEXAS USA INCORPORATION
              </div>
              <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '1.3rem', fontWeight: 700, color: '#111111' }}>
                HIMAT Consulting Inc. · EIN: 39-4494498
              </div>
            </div>
          </div>

          {/* Dual Offices */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <span style={{ fontSize: '1.8rem' }}>🌐</span>
            <div>
              <div style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                GLOBAL DUAL FOOTPRINT
              </div>
              <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '1.3rem', fontWeight: 700, color: '#111111' }}>
                Islamabad HQ & Stafford, Texas USA
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
