import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function ComplianceEthics() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const coreCommitments = [
    {
      num: '1',
      title: 'Integrity & Accountability',
      desc: 'We conduct our work honestly, responsibly, and in accordance with applicable laws, contractual obligations, donor requirements, and professional standards.',
      policy: 'HCPL Code of Professional Conduct',
      badge: 'Legal & Professional Standards',
      icon: '⚖️',
    },
    {
      num: '2',
      title: 'Zero Tolerance for Fraud & Corruption',
      desc: 'Fraud, bribery, kickbacks, collusion, coercion, theft, money laundering, and other corrupt practices are strictly prohibited across HCPL operations, field activities, and institutional partnerships.',
      policy: 'Anti-Fraud and Anti-Corruption Policy',
      badge: 'Zero-Tolerance Policy',
      icon: '🛡️',
    },
    {
      num: '3',
      title: 'Safeguarding & Respectful Workplace',
      desc: 'HCPL maintains zero tolerance for sexual exploitation, abuse, harassment (PSEA/SH), discrimination, and retaliation, backed by formal reporting channels, independent investigation procedures, and survivor-centered support mechanisms.',
      policy: 'PASEASH Policy HCPL 2025 (Final)',
      badge: 'PSEA & Child Safeguarding',
      icon: '🤝',
    },
    {
      num: '4',
      title: 'Gender Equality & Inclusion',
      desc: 'We promote equal opportunities, merit-based decision-making, non-discrimination, inclusive employment practices, and gender-responsive programming across all consulting assignments and research teams.',
      policy: 'Gender Audit Policy HCPL 2025',
      badge: 'GESI Mainstreaming',
      icon: '🌱',
    },
    {
      num: '5',
      title: 'Data Protection & Confidentiality',
      desc: 'HCPL applies accountability, transparency, integrity, security, legal compliance, and ethical-use principles to all primary, secondary, survey, and institutional data collected, stored, processed, and shared.',
      policy: 'Data Governance and Protection Policy',
      badge: 'Data Security Protocols',
      icon: '🔒',
    },
    {
      num: '6',
      title: 'Health, Safety & Environment (HSE)',
      desc: 'We integrate comprehensive risk management, workplace safety, environmental responsibility, emergency preparedness, and field staff protection into our daily project operations and logistical missions.',
      policy: 'HCPL Health, Safety and Environment Policy',
      badge: 'Operational Safety & Risk',
      icon: '🩺',
    },
    {
      num: '7',
      title: 'Responsible Governance',
      desc: 'HCPL uses rigorous internal controls, risk assessments, continuous monitoring, structured reporting, independent audits, and periodic policy reviews to strengthen compliance and institutional accountability.',
      policy: 'Institutional Governance Framework',
      badge: 'Corporate Oversight',
      icon: '🏛️',
    },
    {
      num: '8',
      title: 'Non-Retaliation & Good-Faith Reporting',
      desc: 'Staff, enumerators, consultants, and external stakeholders are encouraged to raise concerns in good faith. HCPL policies provide strict confidentiality and absolute protection from retaliation where misconduct is reported.',
      policy: 'Whistleblower & Safeguarding Policy',
      badge: 'Whistleblower Protection',
      icon: '📢',
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
            <span style={{ color: '#ffffff', fontWeight: 700 }}>Compliance & Ethics</span>
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
              Institutional Integrity & Global Compliance Standards
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
            COMPLIANCE & ETHICS
          </h1>

          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.92)',
              fontWeight: 600,
              marginBottom: '0',
            }}
          >
            HIMAT Consulting Private Limited (HCPL)
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
              lineHeight: '1.8',
              fontSize: '1.05rem',
              color: '#212121',
            }}
          >
            <p style={{ margin: '0 0 1rem', fontSize: '1.15rem', fontWeight: 700, color: '#760CB0' }}>
              Our Institutional Commitment to Ethical Excellence
            </p>
            <p style={{ margin: '0 0 1rem' }}>
              At <strong>HIMAT Consulting Private Limited (HCPL)</strong>, integrity, accountability, transparency, and ethical conduct are central to how we work. Our compliance framework applies across our entire operations, assignments, employees, consultants, partners, vendors, and other stakeholders.
            </p>
            <p style={{ margin: 0, color: '#424242' }}>
              HCPL’s quality framework promotes transparency, ethical practice, accountability, evidence-based work, and continuous improvement. Our Anti-Fraud and Anti-Corruption Policy further establishes an absolute zero-tolerance approach to fraud, corruption, bribery, collusion, coercion, misuse of resources, and other unethical practices.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Main Content (Core Commitments Grid + Operational Ethics + Grievance Card) */}
      <section className="no-reveal" style={{ padding: '3.5rem 0 5rem' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Section 1: Quality Framework & Anti-Corruption */}
            <article
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
                  1
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
                  Quality Framework & Anti-Corruption Oversight
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
                <p>
                  HCPL operates an institutional quality framework rooted in transparency, ethical practice, accountability, rigorous evidence-based methodologies, and continuous organizational learning.
                </p>
                <p>
                  Our <strong>Anti-Fraud and Anti-Corruption Policy</strong> establishes an uncompromised zero-tolerance mandate. Any form of fraudulent representation, financial mismanagement, bribery, kickbacks, collusive bidding, coercive pressure, or unauthorized diversion of funds is strictly prohibited across all HCPL contracts, projects, and vendor relationships.
                </p>
              </div>
            </article>

            {/* Section 2: Core Commitments Cards */}
            <article
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
                  2
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
                  Our Core Institutional Commitments
                </h2>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
                  gap: '1.25rem',
                  marginTop: '1.5rem',
                }}
              >
                {coreCommitments.map((c) => (
                  <div
                    key={c.num}
                    style={{
                      background: '#faf5ff',
                      borderRadius: '12px',
                      border: '1.5px solid rgba(118,12,176,0.14)',
                      padding: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <span style={{ fontSize: '1.75rem' }}>{c.icon}</span>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                            background: '#ffffff',
                            color: '#760CB0',
                            border: '1px solid rgba(118,12,176,0.2)',
                            padding: '0.2rem 0.55rem',
                            borderRadius: '999px',
                          }}
                        >
                          {c.badge}
                        </span>
                      </div>
                      <h3
                        style={{
                          fontFamily: "'Source Serif 4', Georgia, serif",
                          fontSize: '1.15rem',
                          fontWeight: 700,
                          color: '#212121',
                          margin: '0 0 0.5rem',
                          lineHeight: 1.3,
                        }}
                      >
                        {c.title}
                      </h3>
                      <p style={{ fontSize: '0.9rem', color: '#555555', lineHeight: 1.6, margin: 0 }}>
                        {c.desc}
                      </p>
                    </div>

                    <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px dashed rgba(118,12,176,0.2)', fontSize: '0.78rem', color: '#760CB0', fontWeight: 700 }}>
                      📋 Policy: {c.policy}
                    </div>
                  </div>
                ))}
              </div>
            </article>

            {/* Section 3: Ethical Conduct in Our Work */}
            <article
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
                  3
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
                  Ethical Conduct Across Our Work & Operations
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
                <p>
                  Our ethical commitments extend to every dimension of our consulting practice — including applied research, impact assessments, third-party monitoring (TPM), field operations, strategic partnerships, vendor procurement, data collection, enumerator management, and stakeholder engagement.
                </p>
                <p>
                  HCPL strictly expects all employees, international and national consultants, subcontractors, survey firms, and institutional partners to uphold the same rigorous standards of professional and ethical conduct.
                </p>
                <div style={{ background: '#faf5ff', padding: '1rem 1.25rem', borderRadius: '10px', border: '1px solid rgba(118,12,176,0.18)', marginTop: '1rem' }}>
                  <strong style={{ color: '#760CB0' }}>Sustainability & ESG Integration:</strong> HCPL actively integrates environmental sustainability, responsible institutional governance, comprehensive quality assurance, workplace HSE, and global regulatory compliance directly into its systems and consulting practice.
                </div>
              </div>
            </article>

            {/* Section 4: Protecting the People Behind the Data */}
            <article
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
                  4
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
                  Protecting the People Behind the Data: HCPL's Standard for Ethical Research and Evaluation
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
                <p style={{ fontSize: '1.02rem', fontWeight: 600, color: '#760CB0', marginBottom: '1rem' }}>
                  At HCPL, no respondent is asked a single question until she understands why the study is being done, how she was chosen, and that every answer is hers to give or withhold.
                </p>
                <p>
                  Under the HCPL Informed Consent and Data Protection Protocol, participation is voluntary at every stage: she may skip any question, pause, or stop altogether, without explanation and without consequence. For under 18 children, we require both parent or guardian permission and the girl's own agreement, and her refusal always prevails. Trained female enumerators conduct interviews in private settings, guided by clear steps for responding to distress and reporting any risk of harm.
                </p>
                <p>
                  Identities are never stored with answers; they are held in a separate, restricted file and linked only by a unique code, and data is used solely for the analysis explained to the respondent. When a client requests respondent-level data, we first remove direct and indirect identifiers, share only what the purpose requires, and keep a record of every release. The client owns the research data, and HCPL safeguards it as custodian. Named focal points, field spot-checks, audits, a breach-reporting window and an accessible complaints route turn these commitments into practice. The result is research that donors and clients can trust, respondents can take part in safely, and HCPL can stand behind with confidence.
                </p>

                <div
                  style={{
                    background: '#faf5ff',
                    borderRadius: '14px',
                    border: '1.5px solid rgba(118, 12, 176, 0.2)',
                    padding: '1.5rem 1.75rem',
                    marginTop: '1.5rem',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Source Serif 4', Georgia, serif",
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: '#760CB0',
                      margin: '0 0 0.65rem',
                    }}
                  >
                    Research Participants and Respondents
                  </h3>
                  <p style={{ margin: '0 0 0.85rem', lineHeight: '1.75' }}>
                    When we collect data for research, surveys, interviews or evaluations, including with adolescent girls, refugees and other vulnerable people, we follow HCPL's Research Data Protection and Safeguarding Protocol. In summary:
                  </p>
                  <ul style={{ paddingLeft: '1.25rem', lineHeight: '1.85', margin: 0 }}>
                    <li><strong>Prior Purpose Explanation:</strong> We explain the purpose of the study and how you were selected before asking anything.</li>
                    <li><strong>Voluntary Participation:</strong> Taking part is voluntary; you may skip any question or stop at any stage without penalty.</li>
                    <li><strong>Minors & Adolescent Safeguards:</strong> For girls under 18 we obtain parent or guardian permission as well as her own agreement; the minor's refusal always prevails.</li>
                    <li><strong>Data Purpose Limitation:</strong> We use the information only for analysis as explained during consent.</li>
                    <li><strong>Full De-identification:</strong> If a client asks for data, we remove respondents' personal identity first.</li>
                    <li><strong>Client Ownership & Custodianship:</strong> Under our client contracts the research data belongs to the client, and HCPL holds it only for the project.</li>
                  </ul>
                </div>
              </div>
            </article>

            {/* Section 5: Reporting Concerns & Whistleblower Mechanisms */}
            <article
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
                  5
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
                  Reporting Concerns, Grievances & Misconduct
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
                <p>
                  Concerns relating to fraud, corruption, bribery, harassment, safeguarding violations, gender discrimination, data misuse, conflicts of interest, or other unethical misconduct may be reported through HCPL’s designated management, grievance redressal, safeguarding focal persons, or confidential reporting channels.
                </p>
                <p>
                  All reports are treated with the utmost seriousness and, where applicable, under strict confidentiality. HCPL guarantees impartial review, independent fact-finding, structured corrective action, and unwavering protection against any form of retaliation.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  )
}
