import { Link } from 'react-router-dom'

const CAPABILITIES = [
  {
    num: '01',
    title: 'Monitoring, Evaluation & Learning (MERL)',
    desc: 'OECD-DAC compliant formative, summative, process, and impact evaluations employing rigorous econometric counterfactuals.',
    tags: ['Difference-in-Differences', 'RCTs', 'Process Evaluations', 'Longitudinal Studies'],
  },
  {
    num: '02',
    title: 'Applied Research & Economic Diagnostics',
    desc: 'Mixed-methods baseline surveys, endlines, KAP studies, and macro-sector assessments across South and Central Asia.',
    tags: ['Household Surveys', 'CAPI/ODK Mobile Data', 'KIIs & FGDs', 'Econometric Modeling'],
  },
  {
    num: '03',
    title: 'Strategic Institutional Advisory & Policy',
    desc: 'High-level policy formulation, multi-year organizational strategies, and Results-Based Management (RBM) frameworks.',
    tags: ['Theory of Change', 'Provincial Policy Briefs', 'Strategic Roadmaps', 'Institutional Capacity'],
  },
  {
    num: '04',
    title: 'Labour Markets, Skills & TVET Systems',
    desc: 'Comprehensive employer demand mapping, industrial trade studies, and vocational training institute modernization.',
    tags: ['Skills Gap Analyses', 'Green Jobs Transition', 'Private Sector Linkages', 'Curriculum Design'],
  },
  {
    num: '05',
    title: 'Climate Smart Agriculture & Natural Resources',
    desc: 'Water stewardship diagnostics, regenerative agriculture baselines, carbon inventories, and high-altitude glacial resilience.',
    tags: ['Better Cotton Principles', 'GLOF Risk Analysis', 'Soil Organic Carbon', 'WASH Audits'],
  },
  {
    num: '06',
    title: 'Third-Party Verification & Field Audits',
    desc: 'Independent real-time verification, beneficiary eligibility audits, and post-emergency cash response monitoring.',
    tags: ['Biometric Spot-Checks', 'GPS Polygon Verification', 'Zero Data Discrepancy', 'Donor Transparency'],
  },
]

export default function BainCapabilities() {
  return (
    <section style={{ background: '#faf5ff', padding: '6rem 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="eyebrow">Strategic Capabilities</div>
          <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 700, color: '#212121', marginBottom: '0.85rem' }}>
            What We Do: Global Standards, Local Insight
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', color: '#666', maxWidth: '680px', margin: '0 auto', lineHeight: 1.75 }}>
            We combine world-class quantitative precision with deep local field infrastructure to address the most complex humanitarian and development challenges.
          </p>
        </div>

        {/* Numbered Matrix Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.num}
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                border: '1.5px solid rgba(118, 12, 176, 0.1)',
                padding: '2.5rem',
                boxShadow: '0 4px 20px rgba(118, 12, 176, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                position: 'relative',
                transition: 'all 0.35s ease',
              }}
              className="purpose-card"
            >
              {/* Big Number */}
              <div
                style={{
                  fontFamily: "'Source Serif 4', Georgia, serif",
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: '#760CB0',
                  lineHeight: 1,
                  opacity: 0.85,
                }}
              >
                {cap.num}
              </div>

              {/* Title */}
              <h3 style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '1.2rem', fontWeight: 800, color: '#212121', lineHeight: 1.35, margin: 0 }}>
                {cap.title}
              </h3>

              {/* Description */}
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', color: '#555', lineHeight: 1.7, margin: 0, flex: 1 }}>
                {cap.desc}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
                {cap.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      background: 'rgba(118, 12, 176, 0.07)',
                      color: '#760CB0',
                      fontFamily: "'Inter', Arial, sans-serif",
                      fontWeight: 700,
                      fontSize: '0.8125rem',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '999px',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Link */}
              <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(118, 12, 176, 0.08)' }}>
                <Link
                  to="/services"
                  style={{
                    color: '#760CB0',
                    fontFamily: "'Inter', Arial, sans-serif",
                    fontWeight: 800,
                    fontSize: '0.84rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  Explore Capability →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
