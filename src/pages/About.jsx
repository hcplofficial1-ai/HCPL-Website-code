import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'

const VALUES = [
  { icon: '🔍', title: 'Integrity', desc: 'We uphold the highest standards of independence, objectivity, and ethical conduct in all our engagements.' },
  { icon: '🏆', title: 'Excellence', desc: 'Rigorous, high-quality evidence that meets international evaluation standards and donor expectations.' },
  { icon: '🤝', title: 'Inclusion', desc: 'GESI-mainstreamed approaches that amplify voices of women, youth, and marginalized communities.' },
  { icon: '💡', title: 'Innovation', desc: 'Cutting-edge digital data tools, econometric modeling, and adaptive learning frameworks.' },
]

const SECTORS = ['WASH', 'Health', 'Education', 'Agriculture', 'Economic Development', 'Governance & Policy', 'DRR', 'TVET', 'Women Empowerment', 'Humanitarian', 'Nutrition', 'Urban Planning', 'Climate Smart Agriculture', 'Social Protection', 'Renewable Energy', 'SDGs', 'Child Rights', 'Inclusion']

export default function About() {
  const { projects = [] } = useData()

  const TIMELINE = [
    { year: '2009', event: 'HIMAT Consulting founded in Islamabad with focus on local development advisory' },
    { year: '2011', event: 'First ADB contract — Baseline Study for Renewable Energy Programme in GB' },
    { year: '2015', event: 'First USAID evaluation partnership; expansion to KP, Balochistan and rural Sindh' },
    { year: '2018', event: 'Formal UN agency partnerships established with UNICEF, WFP, and UNESCO' },
    { year: '2020', event: '100 Projects milestone; COVID-19 humanitarian response evaluations across Pakistan' },
    { year: '2023', event: 'International expansion to Tajikistan, Kazakhstan, and South Sudan evaluations' },
    { year: '2026', event: `${projects.length} assignments delivered; 60+ institutional clients, 5 countries active` },
  ]
  const s = {
    hero: { background: 'linear-gradient(135deg, #760CB0 0%, #5a0886 100%)', color: '#fff', padding: '5rem 0 4rem' },
    eyebrow: { display: 'inline-block', background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.3rem 0.85rem', borderRadius: '999px', marginBottom: '1rem' },
    h1: { fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '1rem' },
    breadcrumb: { display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.65)', fontFamily: "'Inter', Arial, sans-serif" },
  }

  return (
    <div>
      {/* Hero */}
      <section style={s.hero}>
        <div className="container">
          <div style={s.breadcrumb}><Link to="/" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>Home</Link><span>›</span><span style={{ color: '#fff' }}>About</span></div>
          <div style={{ marginTop: '1.5rem' }}>
            <div style={s.eyebrow}>Our Story</div>
            <h1 style={s.h1}>About HIMAT Consulting</h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.0625rem', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', lineHeight: 1.75 }}>
              Pakistan's leading evidence-based international development advisory, evaluation and research firm — delivering rigorous impact intelligence since 2009.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section style={{ background: '#fff', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <div className="eyebrow">Who We Are</div>
              <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: '#212121', marginBottom: '1.25rem', lineHeight: 1.2 }}>
                Rigorous Evidence for Real-World Change
              </h2>
              <p style={{ color: '#616161', fontSize: '0.9375rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                Founded in 2009, HIMAT Consulting is headquartered in Islamabad with field presence across all provinces of Pakistan. We specialize in monitoring & evaluation, applied research, strategic advisory, and organizational capacity development for the international development sector.
              </p>
              <p style={{ color: '#616161', fontSize: '0.9375rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                Our multidisciplinary team brings deep sectoral expertise in WASH, health, education, gender, agriculture, climate, TVET, and governance — delivering high-quality evidence that drives informed decision-making and catalyzes transformative development outcomes.
              </p>
              <Link to="/contact" style={{ background: '#760CB0', color: '#fff', fontFamily: "'Inter', Arial, sans-serif", fontWeight: 700, fontSize: '0.875rem', padding: '0.7rem 1.5rem', borderRadius: '8px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', boxShadow: '0 4px 12px rgba(118,12,176,0.3)' }}>Partner With Us →</Link>
            </div>
            <div style={{ background: '#faf5ff', borderRadius: '20px', padding: '2.5rem', border: '1px solid rgba(118,12,176,0.1)' }}>
              {[
                { label: 'Founded', val: '2009' }, { label: 'Headquarters', val: 'Khudadad Heights, E-11, Islamabad' },
                { label: 'Field Offices', val: 'Karachi, Peshawar, Quetta' },
                { label: 'Sectors', val: '15+ Development Sectors' }, { label: 'Clients', val: '60+ Institutional Clients' },
              ].map(i => (
                <div key={i.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.85rem 0', borderBottom: '1px solid rgba(118,12,176,0.07)' }}>
                  <span style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '0.875rem', color: '#9e9e9e', fontWeight: 500 }}>{i.label}</span>
                  <span style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '0.875rem', color: '#212121', fontWeight: 700 }}>{i.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){section > .container > div:first-child{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* Values */}
      <section style={{ background: '#faf5ff', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="eyebrow">Our Principles</div>
            <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: '#212121' }}>Core Values</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {VALUES.map(v => (
              <div key={v.title} style={{ background: '#fff', borderRadius: '14px', padding: '2rem 1.5rem', textAlign: 'center', border: '1px solid rgba(118,12,176,0.08)', boxShadow: '0 2px 10px rgba(118,12,176,0.05)' }}>
                <div style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>{v.icon}</div>
                <h3 style={{ fontFamily: "'Inter', Arial, sans-serif", fontWeight: 700, fontSize: '1rem', color: '#760CB0', marginBottom: '0.6rem' }}>{v.title}</h3>
                <p style={{ fontSize: '0.85rem', color: '#757575', lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ background: '#fff', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="eyebrow">Our Journey</div>
            <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: '#212121' }}>Milestones</h2>
          </div>
          <div style={{ position: 'relative', maxWidth: '720px', margin: '0 auto' }}>
            <div style={{ position: 'absolute', left: '80px', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, #760CB0, rgba(118,12,176,0.1))' }} />
            {TIMELINE.map((t, i) => (
              <div key={t.year} style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', alignItems: 'flex-start' }}>
                <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontWeight: 700, fontSize: '1.1rem', color: '#760CB0', width: '60px', textAlign: 'right', flexShrink: 0, paddingTop: '0.15rem' }}>{t.year}</div>
                <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#760CB0', border: '3px solid #fff', boxShadow: '0 0 0 3px rgba(118,12,176,0.2)', flexShrink: 0, marginTop: '0.25rem' }} />
                <div style={{ flex: 1, background: '#faf5ff', borderRadius: '10px', padding: '0.9rem 1.25rem', border: '1px solid rgba(118,12,176,0.08)', fontSize: '0.9rem', color: '#424242', lineHeight: 1.65, fontFamily: "'Inter', sans-serif" }}>{t.event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section style={{ background: '#760CB0', padding: '4rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '2rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>Sectoral Expertise</h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9375rem' }}>Multidisciplinary depth across Pakistan's development landscape</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', justifyContent: 'center' }}>
            {SECTORS.map(sec => (
              <span key={sec} style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', fontFamily: "'Inter', Arial, sans-serif", fontWeight: 600, fontSize: '0.8125rem', padding: '0.4rem 1rem', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.2)' }}>{sec}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
