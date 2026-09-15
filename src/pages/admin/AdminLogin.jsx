import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 600)) // Simulate auth delay
    const result = login(username, password)
    setLoading(false)
    if (result.success) {
      navigate('/admin', { replace: true })
    } else {
      setError(result.error)
    }
  }

  const inp = (extra = {}) => ({
    width: '100%', fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: '#fff',
    background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)',
    borderRadius: '10px', padding: '0.8rem 1rem', outline: 'none',
    boxSizing: 'border-box', transition: 'border-color 0.2s',
    ...extra,
  })

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a0a2e 0%, #2d0447 50%, #1a0a2e 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
      {/* Background orbs */}
      <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(118,12,176,0.2) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(118,12,176,0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: '400px', position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontFamily: "'Inter', Arial, sans-serif", fontWeight: 900, fontSize: '2rem', color: '#c07de0', letterSpacing: '-0.03em', marginBottom: '0.25rem' }}>HIMAT</div>
          <div style={{ fontFamily: "'Inter', Arial, sans-serif", fontWeight: 400, fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>Consulting</div>
        </div>

        {/* Card */}
        <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '2.5rem 2rem', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
          <h1 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '1.6rem', fontWeight: 700, color: '#fff', textAlign: 'center', marginBottom: '0.5rem' }}>Staff Portal</h1>
          <div style={{ background: 'rgba(118,12,176,0.2)', border: '1px solid rgba(192,125,224,0.35)', borderRadius: '12px', padding: '0.85rem 1rem', marginBottom: '1.25rem', fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#e9d5ff', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'center' }}>
            <div>🔑 <strong>Master Admin Login Credentials:</strong></div>
            <div style={{ fontSize: '0.78rem' }}>Username: <code style={{ background: 'rgba(0,0,0,0.4)', padding: '0.15rem 0.45rem', borderRadius: '4px', color: '#fff', fontWeight: 700 }}>admin</code> | Password: <code style={{ background: 'rgba(0,0,0,0.4)', padding: '0.15rem 0.45rem', borderRadius: '4px', color: '#fff', fontWeight: 700 }}>HimatAdmin2026!</code></div>
            <button
              type="button"
              onClick={() => {
                setUsername('admin')
                setPassword('HimatAdmin2026!')
              }}
              style={{ marginTop: '0.25rem', background: '#760CB0', color: '#fff', border: 'none', padding: '0.35rem 0.9rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
            >
              ⚡ Quick Auto-Fill & Click Sign In
            </button>
          </div>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1.25rem', fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: '#fca5a5', textAlign: 'center' }}>
              🔒 {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div>
              <label style={{ fontFamily: "'Inter', Arial, sans-serif", fontWeight: 600, fontSize: '0.8125rem', color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '0.4rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Username</label>
              <input value={username} onChange={e => setUsername(e.target.value)} placeholder="your.username" autoComplete="username" style={inp()} onFocus={e => e.target.style.borderColor = '#760CB0'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
            </div>
            <div>
              <label style={{ fontFamily: "'Inter', Arial, sans-serif", fontWeight: 600, fontSize: '0.8125rem', color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '0.4rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••••" autoComplete="current-password" style={inp({ paddingRight: '3rem' })} onFocus={e => e.target.style.borderColor = '#760CB0'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
                <button type="button" onClick={() => setShowPw(s => !s)} style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', fontSize: '1rem' }}>{showPw ? '🙈' : '👁'}</button>
              </div>
            </div>
            <button type="submit" disabled={loading} style={{ marginTop: '0.5rem', background: loading ? 'rgba(118,12,176,0.5)' : '#760CB0', color: '#fff', fontFamily: "'Inter', Arial, sans-serif", fontWeight: 700, fontSize: '0.9rem', padding: '0.85rem', borderRadius: '10px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 4px 16px rgba(118,12,176,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'all 0.2s' }}>
              {loading ? (
                <><span style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} /> Verifying…</>
              ) : 'Sign In →'}
            </button>
          </form>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link to="/" style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>← Back to Website</Link>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
