import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

// Single master admin account
const ADMIN_USERS = [
  { username: 'admin', password: 'HimatAdmin2026!', role: 'Administrator', name: 'HCPL Admin' },
]

const SESSION_KEY = 'himat_admin_session'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_KEY)
    if (saved) {
      try { setUser(JSON.parse(saved)) } catch (_) {}
    }
    setLoading(false)
  }, [])

  const login = (username, password) => {
    const found = ADMIN_USERS.find(
      u => u.username === username.toLowerCase().trim() && u.password === password
    )
    if (found) {
      const session = { username: found.username, role: found.role, name: found.name }
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
      setUser(session)
      return { success: true }
    }
    return { success: false, error: 'Invalid username or password.' }
  }

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
