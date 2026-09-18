import { useState } from 'react'
import { Link } from 'react-router-dom'

const SUBJECTS = ['Project Inquiry', 'Evaluation Consultancy', 'Research Collaboration', 'Partnership Proposal', 'Employment', 'Other']

export default function Contact() {
  const [form, setForm] = useState({ name: '', org: '', email: '', phone: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState({})

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.message.trim()) e.message = 'Please write a message'
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setSubmitError('')
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    
    setSubmitting(true)
    try {
      // 1. Save submission to MongoDB Atlas Database
      await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      }).catch(err => console.log('MongoDB save note:', err))

      // 2. Dispatch email directly to info@himatconsulting.com (Zero passwords required!)
      await fetch('https://formsubmit.co/ajax/info@himatconsulting.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `📬 New Website Inquiry: ${form.subject || 'General Inquiry'} from ${form.name}`,
          _template: 'table',
          _captcha: 'false',
          name: form.name,
          organization: form.org || 'N/A',
          email: form.email,
          phone: form.phone || 'N/A',
          subject: form.subject || 'General Inquiry',
          message: form.message
        })
      }).catch(err => console.log('Email relay note:', err))

      setSent(true)
    } catch (err) {
      console.error('Contact submit error:', err)
      setSent(true)
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle = (field) => ({
    width: '100%', fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: '#212121',
    background: errors[field] ? '#fff5f5' : '#fff',
    border: `1.5px solid ${errors[field] ? '#ef4444' : 'rgba(118,12,176,0.2)'}`,
    borderRadius: '10px', padding: '0.75rem 1rem', outline: 'none',
    transition: 'border-color 0.2s', boxSizing: 'border-box',
  })

  const CONTACT_INFO = [
    { icon: '📍', label: 'Pakistan Head Office', val: 'Office no 23 Ground Floor, Khudadad heights, Golra E11/4 E-11, Islamabad, Pakistan' },
    { icon: '🏢', label: 'USA Office', val: '10498 Fountain Lake Dr, Apt 1028, Stafford, Texas 77477, United States of America' },
    { icon: '✉️', label: 'Email', val: 'info@himatconsulting.com', href: 'mailto:info@himatconsulting.com' },
    { icon: '📞', label: 'Phone', val: '+923434484598', href: 'tel:+923434484598' },
    { icon: '☎️', label: 'Telephone', val: '+92 51 6131366', href: 'tel:+92516131366' },
    { icon: '🌐', label: 'Website', val: 'www.himatconsulting.com', href: 'https://himatconsulting.com' },
    { icon: '💼', label: 'LinkedIn', val: 'Himat Consulting pvt ltd', href: 'https://pk.linkedin.com/company/himat-consulting' },
  ]

  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #760CB0 0%, #5a0886 100%)', padding: '7.25rem 0 4rem' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.65)', fontFamily: "'Inter', Arial, sans-serif", marginBottom: '1.5rem' }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>Home</Link><span>›</span><span style={{ color: '#fff' }}>Contact</span>
          </div>
          <h1 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '1rem' }}>Get In Touch</h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', color: 'rgba(255,255,255,0.8)', maxWidth: '560px', lineHeight: 1.75 }}>Commission a study, explore partnerships, or enquire about our services — our team responds within 1 business day.</p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ background: '#fff', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '4rem', alignItems: 'start' }}>
            {/* Form */}
            <div>
              <div className="eyebrow" style={{ marginBottom: '0.75rem' }}>Send a Message</div>
              <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '1.75rem', fontWeight: 700, color: '#212121', marginBottom: '2rem' }}>Commission a Study or Enquire</h2>

              {sent ? (
                <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderLeft: '4px solid #22c55e', borderRadius: '12px', padding: '2rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✅</div>
                  <h3 style={{ fontFamily: "'Inter', Arial, sans-serif", fontWeight: 700, fontSize: '1.1rem', color: '#166534', marginBottom: '0.5rem' }}>Message Sent!</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: '#166534', lineHeight: 1.7 }}>Thank you, <strong>{form.name}</strong>! We've received your message and will get back to you within 1 business day at <strong>{form.email}</strong>.</p>
                  <button onClick={() => { setSent(false); setForm({ name: '', org: '', email: '', phone: '', subject: '', message: '' }) }} style={{ marginTop: '1.25rem', background: '#760CB0', color: '#fff', fontFamily: "'Inter', Arial, sans-serif", fontWeight: 700, fontSize: '0.875rem', padding: '0.6rem 1.25rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Send Another →</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} noValidate>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontFamily: "'Inter', Arial, sans-serif", fontWeight: 600, fontSize: '0.8125rem', color: '#424242', display: 'block', marginBottom: '0.4rem' }}>Full Name *</label>
                      <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your full name" style={inputStyle('name')} onFocus={e => e.target.style.borderColor = '#760CB0'} onBlur={e => e.target.style.borderColor = errors.name ? '#ef4444' : 'rgba(118,12,176,0.2)'} />
                      {errors.name && <span style={{ fontSize: '0.8125rem', color: '#ef4444', fontFamily: "'Inter', Arial, sans-serif" }}>{errors.name}</span>}
                    </div>
                    <div>
                      <label style={{ fontFamily: "'Inter', Arial, sans-serif", fontWeight: 600, fontSize: '0.8125rem', color: '#424242', display: 'block', marginBottom: '0.4rem' }}>Organization</label>
                      <input value={form.org} onChange={e => setForm(f => ({ ...f, org: e.target.value }))} placeholder="Your organization" style={inputStyle('org')} onFocus={e => e.target.style.borderColor = '#760CB0'} onBlur={e => e.target.style.borderColor = 'rgba(118,12,176,0.2)'} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontFamily: "'Inter', Arial, sans-serif", fontWeight: 600, fontSize: '0.8125rem', color: '#424242', display: 'block', marginBottom: '0.4rem' }}>Email *</label>
                      <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@organization.org" style={inputStyle('email')} onFocus={e => e.target.style.borderColor = '#760CB0'} onBlur={e => e.target.style.borderColor = errors.email ? '#ef4444' : 'rgba(118,12,176,0.2)'} />
                      {errors.email && <span style={{ fontSize: '0.8125rem', color: '#ef4444', fontFamily: "'Inter', Arial, sans-serif" }}>{errors.email}</span>}
                    </div>
                    <div>
                      <label style={{ fontFamily: "'Inter', Arial, sans-serif", fontWeight: 600, fontSize: '0.8125rem', color: '#424242', display: 'block', marginBottom: '0.4rem' }}>Phone</label>
                      <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+92 xxx xxxxxxx" style={inputStyle('phone')} onFocus={e => e.target.style.borderColor = '#760CB0'} onBlur={e => e.target.style.borderColor = 'rgba(118,12,176,0.2)'} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontFamily: "'Inter', Arial, sans-serif", fontWeight: 600, fontSize: '0.8125rem', color: '#424242', display: 'block', marginBottom: '0.4rem' }}>Subject</label>
                    <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} style={{ ...inputStyle('subject') }}>
                      <option value="">Select a subject…</option>
                      {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontFamily: "'Inter', Arial, sans-serif", fontWeight: 600, fontSize: '0.8125rem', color: '#424242', display: 'block', marginBottom: '0.4rem' }}>Message *</label>
                    <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Tell us about your project, evaluation needs, or inquiry…" rows={6} style={{ ...inputStyle('message'), resize: 'vertical' }} onFocus={e => e.target.style.borderColor = '#760CB0'} onBlur={e => e.target.style.borderColor = errors.message ? '#ef4444' : 'rgba(118,12,176,0.2)'} />
                    {errors.message && <span style={{ fontSize: '0.8125rem', color: '#ef4444', fontFamily: "'Inter', Arial, sans-serif" }}>{errors.message}</span>}
                  </div>
                  <button type="submit" disabled={submitting} style={{ background: submitting ? '#9e9e9e' : '#760CB0', color: '#fff', fontFamily: "'Inter', Arial, sans-serif", fontWeight: 700, fontSize: '0.9rem', padding: '0.85rem 2rem', borderRadius: '10px', border: 'none', cursor: submitting ? 'not-allowed' : 'pointer', boxShadow: '0 4px 16px rgba(118,12,176,0.3)', alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {submitting ? 'Sending Message…' : 'Send Message →'}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <div className="eyebrow" style={{ marginBottom: '0.75rem' }}>Contact Information</div>
              <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '1.75rem', fontWeight: 700, color: '#212121', marginBottom: '2rem' }}>Reach Our Team</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {CONTACT_INFO.map(c => (
                  <div key={c.label} style={{ background: '#faf5ff', borderRadius: '12px', padding: '1.1rem 1.25rem', border: '1px solid rgba(118,12,176,0.08)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{c.icon}</span>
                    <div>
                      <div style={{ fontFamily: "'Inter', Arial, sans-serif", fontWeight: 700, fontSize: '0.8125rem', color: '#760CB0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>{c.label}</div>
                      {c.href ? (
                        <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#424242', textDecoration: 'none', lineHeight: 1.5 }}>{c.val}</a>
                      ) : (
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#424242', lineHeight: 1.5 }}>{c.val}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '2rem', background: 'linear-gradient(135deg, #760CB0, #5a0886)', borderRadius: '14px', padding: '1.75rem', color: '#fff', textAlign: 'center' }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>⏱️</div>
                <div style={{ fontFamily: "'Inter', Arial, sans-serif", fontWeight: 700, fontSize: '1rem', marginBottom: '0.4rem' }}>Response Time</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>We respond to all inquiries within <strong>1 business day</strong> (Mon–Fri, 9am–5pm PKT)</div>
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:900px){section > .container > div[style*="gridTemplateColumns: 1.4fr"]{grid-template-columns:1fr!important;}}`}</style>
      </section>
    </div>
  )
}
