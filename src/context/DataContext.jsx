import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { DEFAULT_PROJECTS } from '../data/projects'
import { DEFAULT_TEAM } from '../data/team'
import { PUBLISHED_REPORTS } from '../data/reportsData'
import { DEFAULT_COMPETENCIES } from '../data/competenciesData'
import { CLIENT_CERTIFICATES } from '../data/certificatesData'
import { DEFAULT_CONSULTANTS } from '../data/consultantsData'
import { DEFAULT_SERVICES } from '../data/servicesData'

const DataContext = createContext(null)
export const API_BASE = import.meta.env.VITE_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : '/api')

const PROJECTS_KEY = 'himat_projects_db'
const TEAM_KEY = 'himat_team_db'
const REPORTS_KEY = 'himat_reports_db'
const COMPETENCIES_KEY = 'himat_competencies_db_v2'
const CERTIFICATES_KEY = 'himat_certificates_db'
const CONSULTANTS_KEY = 'himat_consultants_db_v2'
const SERVICES_KEY = 'himat_services_db'

function safeSaveLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (quotaError) {
    console.warn(`[LocalStorage Quota Exceeded] Optimizing storage for ${key} by removing heavy PDF payloads.`, quotaError)
    try {
      const sanitized = Array.isArray(data)
        ? data.map((item) => {
            const copy = { ...item }
            if (copy.pdfUrl && copy.pdfUrl.startsWith('data:') && copy.pdfUrl.length > 500000) copy.pdfUrl = ''
            if (copy.downloadUrl && copy.downloadUrl.startsWith('data:') && copy.downloadUrl.length > 500000) copy.downloadUrl = ''
            return copy
          })
        : data
      localStorage.setItem(key, JSON.stringify(sanitized))
    } catch (_) {}
  }
}

export function applyCompetencyImages(list) {
  if (!Array.isArray(list)) return []
  return list.map((c) => {
    if (c.id === 'organizational-assessment') {
      return { ...c, image: './images/organizational-assessment-workshop.jpg', focalPoint: 'center 52%' }
    }
    if (c.id === 'capacity-building') {
      return { ...c, image: './images/capacity-building-bg.jpg', focalPoint: 'center center' }
    }
    if (c.id === 'third-party-monitoring' && (!c.image || c.image === './images/third-party-monitoring-bg.jpg')) {
      return { ...c, image: './images/office-automation-erp-bg.jpg' }
    }
    if (c.id === 'office-automation-erp') {
      return { ...c, image: './images/office-automation-erp-work.jpg', focalPoint: 'center 45%' }
    }
    if (c.id === 'inclusive-programming' && (!c.image || c.image === './images/inclusive-programming-bg.png')) {
      return { ...c, image: './images/inclusive-programming-bg.jpg', focalPoint: 'center 38%' }
    }
    return c
  })
}

export function sortConsultantsList(list) {
  if (!Array.isArray(list)) return []
  return [...list].sort((a, b) => {
    const aIsIzhar = a && (a.id === 'izhar-ali-hunzai' || (a.name && a.name.toLowerCase().includes('izhar')))
    const bIsIzhar = b && (b.id === 'izhar-ali-hunzai' || (b.name && b.name.toLowerCase().includes('izhar')))
    if (aIsIzhar && !bIsIzhar) return -1
    if (!aIsIzhar && bIsIzhar) return 1
    const orderA = a.order != null ? Number(a.order) : 99
    const orderB = b.order != null ? Number(b.order) : 99
    return orderA - orderB
  })
}

export function DataProvider({ children }) {
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem(PROJECTS_KEY)
      const parsed = saved ? JSON.parse(saved) : null
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_PROJECTS
    } catch {
      return DEFAULT_PROJECTS
    }
  })
  const [team, setTeam] = useState(() => {
    try {
      const saved = localStorage.getItem(TEAM_KEY)
      const parsed = saved ? JSON.parse(saved) : null
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_TEAM
    } catch {
      return DEFAULT_TEAM
    }
  })
  const [reports, setReports] = useState(() => {
    try {
      const saved = localStorage.getItem(REPORTS_KEY)
      const parsed = saved ? JSON.parse(saved) : null
      if (Array.isArray(parsed) && parsed.length > 0) {
        const cleaned = parsed.filter((r) => !['rep-srso-cif-2024', 'rep-nutrition-survey-2023', 'rep-cpi-success-2021'].includes(r.id))
        const ids = new Set(cleaned.map(r => r.id))
        const merged = [...cleaned]
        for (const pub of PUBLISHED_REPORTS) {
          if (!ids.has(pub.id)) {
            merged.unshift(pub)
            ids.add(pub.id)
          }
        }
        return merged
      }
      return PUBLISHED_REPORTS
    } catch {
      return PUBLISHED_REPORTS
    }
  })
  const [competencies, setCompetencies] = useState(() => {
    try {
      const saved = localStorage.getItem(COMPETENCIES_KEY)
      const parsed = saved ? JSON.parse(saved) : null
      return Array.isArray(parsed) && parsed.length > 0 ? applyCompetencyImages(parsed) : DEFAULT_COMPETENCIES
    } catch {
      return DEFAULT_COMPETENCIES
    }
  })
  const [certificates, setCertificates] = useState(() => {
    try {
      const saved = localStorage.getItem(CERTIFICATES_KEY)
      const parsed = saved ? JSON.parse(saved) : null
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : CLIENT_CERTIFICATES
    } catch {
      return CLIENT_CERTIFICATES
    }
  })
  const [consultants, setConsultants] = useState(() => {
    try {
      const saved = localStorage.getItem(CONSULTANTS_KEY)
      const parsed = saved ? JSON.parse(saved) : null
      return Array.isArray(parsed) && parsed.length > 0 ? sortConsultantsList(parsed) : DEFAULT_CONSULTANTS
    } catch {
      return DEFAULT_CONSULTANTS
    }
  })
  const [services, setServices] = useState(() => {
    try {
      const saved = localStorage.getItem(SERVICES_KEY)
      const parsed = saved ? JSON.parse(saved) : null
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_SERVICES
    } catch {
      return DEFAULT_SERVICES
    }
  })
  const [dbStatus, setDbStatus] = useState('connecting')

  // 1. Initial Load & Fetch from MongoDB Atlas API
  useEffect(() => {
    async function loadData() {
      try {
        // Health Check
        const healthRes = await fetch(`${API_BASE}/health`)
        if (healthRes.ok) {
          setDbStatus('connected')
        }

        // Fetch Projects
        try {
          const projRes = await fetch(`${API_BASE}/projects`)
          if (projRes.ok) {
            const data = await projRes.json()
            if (Array.isArray(data) && data.length > 0) {
              setProjects(data)
              safeSaveLocalStorage(PROJECTS_KEY, data)
            } else {
              setProjects(DEFAULT_PROJECTS)
            }
          } else {
            setProjects(DEFAULT_PROJECTS)
          }
        } catch (_) {
          setProjects(DEFAULT_PROJECTS)
        }

        // Fetch Team
        try {
          const teamRes = await fetch(`${API_BASE}/team`)
          if (teamRes.ok) {
            const data = await teamRes.json()
            if (Array.isArray(data) && data.length > 0) {
              setTeam(data)
              safeSaveLocalStorage(TEAM_KEY, data)
            } else {
              setTeam(DEFAULT_TEAM)
            }
          } else {
            setTeam(DEFAULT_TEAM)
          }
        } catch (_) {
          setTeam(DEFAULT_TEAM)
        }

        // Fetch Reports
        try {
          const repRes = await fetch(`${API_BASE}/reports`)
          if (repRes.ok) {
            const data = await repRes.json()
            if (Array.isArray(data)) {
              const cleaned = data.filter((r) => !['rep-srso-cif-2024', 'rep-nutrition-survey-2023', 'rep-cpi-success-2021'].includes(r.id))
              const ids = new Set(cleaned.map(r => r.id))
              const merged = [...cleaned]
              for (const pub of PUBLISHED_REPORTS) {
                if (!ids.has(pub.id)) {
                  merged.unshift(pub)
                  ids.add(pub.id)
                }
              }
              setReports(merged)
              safeSaveLocalStorage(REPORTS_KEY, merged)
            } else {
              setReports(PUBLISHED_REPORTS)
            }
          } else {
            setReports(PUBLISHED_REPORTS)
          }
        } catch (_) {
          // fallback to localStorage or PUBLISHED_REPORTS
        }

        // Fetch Certificates
        try {
          const certRes = await fetch(`${API_BASE}/certificates`)
          if (certRes.ok) {
            const data = await certRes.json()
            if (Array.isArray(data) && data.length > 0) {
              setCertificates(data)
              safeSaveLocalStorage(CERTIFICATES_KEY, data)
            } else {
              setCertificates(CLIENT_CERTIFICATES)
            }
          } else {
            setCertificates(CLIENT_CERTIFICATES)
          }
        } catch (_) {
          setCertificates(CLIENT_CERTIFICATES)
        }

        // Fetch Competencies
        try {
          const compRes = await fetch(`${API_BASE}/competencies`)
          if (compRes.ok) {
            const data = await compRes.json()
            if (Array.isArray(data) && data.length > 0) {
              const updated = applyCompetencyImages(data)
              setCompetencies(updated)
              safeSaveLocalStorage(COMPETENCIES_KEY, updated)
            } else {
              setCompetencies(DEFAULT_COMPETENCIES)
            }
          } else {
            setCompetencies(DEFAULT_COMPETENCIES)
          }
        } catch (_) {
          setCompetencies(DEFAULT_COMPETENCIES)
        }

        // Fetch Consultants
        try {
          const consRes = await fetch(`${API_BASE}/consultants`)
          if (consRes.ok) {
            const data = await consRes.json()
            if (Array.isArray(data) && data.length > 0) {
              const sorted = sortConsultantsList(data)
              setConsultants(sorted)
              safeSaveLocalStorage(CONSULTANTS_KEY, sorted)
            } else {
              setConsultants(DEFAULT_CONSULTANTS)
            }
          } else {
            setConsultants(DEFAULT_CONSULTANTS)
          }
        } catch (_) {
          setConsultants(DEFAULT_CONSULTANTS)
        }
        // Fetch Services
        try {
          const srvRes = await fetch(`${API_BASE}/services`)
          if (srvRes.ok) {
            const data = await srvRes.json()
            if (Array.isArray(data) && data.length > 0) {
              setServices(data)
              safeSaveLocalStorage(SERVICES_KEY, data)
            } else {
              setServices(DEFAULT_SERVICES)
            }
          } else {
            setServices(DEFAULT_SERVICES)
          }
        } catch (_) {
          setServices(DEFAULT_SERVICES)
        }
      } catch (err) {
        console.warn('API server unreachable, fallback to localStorage/defaults:', err.message)
        setDbStatus('offline')

        const savedProj = localStorage.getItem(PROJECTS_KEY)
        setProjects(savedProj ? JSON.parse(savedProj) : DEFAULT_PROJECTS)

        const savedTeam = localStorage.getItem(TEAM_KEY)
        setTeam(savedTeam ? JSON.parse(savedTeam) : DEFAULT_TEAM)

        const savedRep = localStorage.getItem(REPORTS_KEY)
        setReports(savedRep ? JSON.parse(savedRep) : PUBLISHED_REPORTS)

        const savedCert = localStorage.getItem(CERTIFICATES_KEY)
        setCertificates(savedCert ? JSON.parse(savedCert) : CLIENT_CERTIFICATES)

        const savedComp = localStorage.getItem(COMPETENCIES_KEY)
        setCompetencies(savedComp ? applyCompetencyImages(JSON.parse(savedComp)) : DEFAULT_COMPETENCIES)

        const savedCons = localStorage.getItem(CONSULTANTS_KEY)
        setConsultants(savedCons ? sortConsultantsList(JSON.parse(savedCons)) : DEFAULT_CONSULTANTS)

        const savedSrv = localStorage.getItem(SERVICES_KEY)
        setServices(savedSrv ? JSON.parse(savedSrv) : DEFAULT_SERVICES)
      }
    }

    loadData()
  }, [])

  // PROJECTS CRUD WITH MONGODB ATLAS SYNC
  const addProject = useCallback(async (proj) => {
    setProjects((prev) => {
      const next = [...prev, proj].sort((a, b) => (Number(a.no) || 0) - (Number(b.no) || 0))
      safeSaveLocalStorage(PROJECTS_KEY, next)
      return next
    })
    try {
      await fetch(`${API_BASE}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(proj),
      })
    } catch (_) {}
  }, [])

  const updateProject = useCallback(async (id, updates) => {
    setProjects((prev) => {
      const next = prev.map((p) => (p.no === id ? { ...p, ...updates } : p))
      safeSaveLocalStorage(PROJECTS_KEY, next)
      return next
    })
    try {
      await fetch(`${API_BASE}/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
    } catch (_) {}
  }, [])

  const deleteProject = useCallback(async (id) => {
    setProjects((prev) => {
      const next = prev.filter((p) => p.no !== id)
      safeSaveLocalStorage(PROJECTS_KEY, next)
      return next
    })
    try {
      await fetch(`${API_BASE}/projects/${id}`, { method: 'DELETE' })
    } catch (_) {}
  }, [])

  const resetProjects = useCallback(async () => {
    setProjects(DEFAULT_PROJECTS)
    localStorage.removeItem(PROJECTS_KEY)
    try {
      await fetch(`${API_BASE}/reset-all`, { method: 'POST' })
    } catch (_) {}
  }, [])

  // TEAM CRUD WITH MONGODB ATLAS SYNC
  const addTeamMember = useCallback(async (member) => {
    setTeam((prev) => {
      const next = [...prev, member]
      safeSaveLocalStorage(TEAM_KEY, next)
      return next
    })
    try {
      await fetch(`${API_BASE}/team`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(member),
      })
    } catch (_) {}
  }, [])

  const updateTeamMember = useCallback(async (id, updates) => {
    setTeam((prev) => {
      const next = prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
      safeSaveLocalStorage(TEAM_KEY, next)
      return next
    })
    try {
      await fetch(`${API_BASE}/team/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
    } catch (_) {}
  }, [])

  const deleteTeamMember = useCallback(async (id) => {
    setTeam((prev) => {
      const next = prev.filter((m) => m.id !== id)
      safeSaveLocalStorage(TEAM_KEY, next)
      return next
    })
    try {
      await fetch(`${API_BASE}/team/${id}`, { method: 'DELETE' })
    } catch (_) {}
  }, [])

  const resetTeam = useCallback(async () => {
    setTeam(DEFAULT_TEAM)
    localStorage.removeItem(TEAM_KEY)
    try {
      await fetch(`${API_BASE}/reset-all`, { method: 'POST' })
    } catch (_) {}
  }, [])

  // REPORTS CRUD WITH MONGODB ATLAS SYNC
  const addReport = useCallback(async (rep) => {
    // 1. Optimistic Local Save
    setReports((prev) => {
      const filtered = (prev || []).filter((r) => r.id !== rep.id)
      const next = [rep, ...filtered]
      safeSaveLocalStorage(REPORTS_KEY, next)
      return next
    })

    try {
      let res = await fetch(`${API_BASE}/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rep),
      })

      // If payload is too large for Vercel Serverless (HTTP 413)
      if (res.status === 413 || (!res.ok && rep.pdfUrl && rep.pdfUrl.startsWith('data:'))) {
        console.warn('PDF payload exceeds serverless limit. Retrying without heavy file binary to persist metadata...')
        const leanPayload = { ...rep, pdfUrl: '' }
        res = await fetch(`${API_BASE}/reports`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leanPayload),
        })
        if (res.ok) {
          return { success: true, warning: 'Report saved to MongoDB Atlas. Note: Large PDFs in Vercel serverless are stored in your local session.' }
        }
      }

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}))
        console.warn('Backend failed to save report:', errJson)
        return { success: true, warning: errJson.error || 'Report saved in browser session.' }
      }

      const savedData = await res.json()
      setReports((prev) => {
        const filtered = (prev || []).filter((r) => r.id !== savedData.id)
        const next = [{ ...rep, ...savedData }, ...filtered]
        safeSaveLocalStorage(REPORTS_KEY, next)
        return next
      })
      return { success: true, data: savedData }
    } catch (err) {
      console.warn('Backend server unreachable, saved locally:', err.message)
      return { success: true }
    }
  }, [])

  const updateReport = useCallback(async (id, updates) => {
    setReports((prev) => {
      const next = (prev || []).map((r) => (r.id === id ? { ...r, ...updates } : r))
      safeSaveLocalStorage(REPORTS_KEY, next)
      return next
    })

    try {
      let res = await fetch(`${API_BASE}/reports/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })

      if (res.status === 413 || (!res.ok && updates.pdfUrl && updates.pdfUrl.startsWith('data:'))) {
        const leanPayload = { ...updates, pdfUrl: '' }
        res = await fetch(`${API_BASE}/reports/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leanPayload),
        })
      }

      if (res.ok) {
        const savedData = await res.json()
        setReports((prev) => {
          const next = (prev || []).map((r) => (r.id === id ? { ...r, ...savedData } : r))
          safeSaveLocalStorage(REPORTS_KEY, next)
          return next
        })
        return { success: true, data: savedData }
      }
      return { success: true }
    } catch (err) {
      console.warn('Backend server unreachable, updating locally:', err.message)
      return { success: true }
    }
  }, [])

  const deleteReport = useCallback(async (id) => {
    setReports((prev) => {
      const next = prev.filter((r) => r.id !== id)
      safeSaveLocalStorage(REPORTS_KEY, next)
      return next
    })
    try {
      await fetch(`${API_BASE}/reports/${id}`, { method: 'DELETE' })
    } catch (_) {}
  }, [])

  const resetReports = useCallback(async () => {
    setReports(PUBLISHED_REPORTS)
    localStorage.removeItem(REPORTS_KEY)
    try {
      await fetch(`${API_BASE}/reset-all`, { method: 'POST' })
    } catch (_) {}
  }, [])

  // COMPETENCIES CRUD WITH MONGODB ATLAS SYNC
  const updateCompetency = useCallback(async (id, updates) => {
    setCompetencies((prev) => {
      const next = prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
      safeSaveLocalStorage(COMPETENCIES_KEY, next)
      return next
    })
    try {
      await fetch(`${API_BASE}/competencies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
    } catch (_) {}
  }, [])

  const resetCompetencies = useCallback(async () => {
    setCompetencies(DEFAULT_COMPETENCIES)
    localStorage.removeItem(COMPETENCIES_KEY)
    try {
      await fetch(`${API_BASE}/reset-all`, { method: 'POST' })
    } catch (_) {}
  }, [])

  // SERVICES CRUD WITH MONGODB ATLAS SYNC
  const updateService = useCallback(async (id, updates) => {
    setServices((prev) => {
      const next = (prev || []).map((s) => (s.id === id ? { ...s, ...updates } : s))
      safeSaveLocalStorage(SERVICES_KEY, next)
      return next
    })
    try {
      await fetch(`${API_BASE}/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
    } catch (_) {}
  }, [])

  const resetServices = useCallback(async () => {
    setServices(DEFAULT_SERVICES)
    localStorage.removeItem(SERVICES_KEY)
    try {
      await fetch(`${API_BASE}/reset-all`, { method: 'POST' })
    } catch (_) {}
  }, [])

  // CERTIFICATES CRUD WITH MONGODB ATLAS SYNC
  const addCertificate = useCallback(async (cert) => {
    setCertificates((prev) => {
      const filtered = (prev || []).filter((c) => c.id !== cert.id)
      const next = [cert, ...filtered]
      safeSaveLocalStorage(CERTIFICATES_KEY, next)
      return next
    })

    try {
      let res = await fetch(`${API_BASE}/certificates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cert),
      })

      if (res.status === 413 || (!res.ok && cert.downloadUrl && cert.downloadUrl.startsWith('data:'))) {
        const leanPayload = { ...cert, downloadUrl: '' }
        res = await fetch(`${API_BASE}/certificates`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leanPayload),
        })
      }

      if (!res.ok) {
        return { success: true, warning: 'Saved locally in browser.' }
      }
      const savedData = await res.json()
      setCertificates((prev) => {
        const filtered = (prev || []).filter((c) => c.id !== savedData.id)
        const next = [{ ...cert, ...savedData }, ...filtered]
        safeSaveLocalStorage(CERTIFICATES_KEY, next)
        return next
      })
      return { success: true, data: savedData }
    } catch (err) {
      console.warn('Backend server unreachable, saved certificate locally:', err.message)
      return { success: true }
    }
  }, [])

  const updateCertificate = useCallback(async (id, updates) => {
    setCertificates((prev) => {
      const next = (prev || []).map((c) => (c.id === id ? { ...c, ...updates } : c))
      safeSaveLocalStorage(CERTIFICATES_KEY, next)
      return next
    })

    try {
      let res = await fetch(`${API_BASE}/certificates/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })

      if (res.status === 413 || (!res.ok && updates.downloadUrl && updates.downloadUrl.startsWith('data:'))) {
        const leanPayload = { ...updates, downloadUrl: '' }
        res = await fetch(`${API_BASE}/certificates/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leanPayload),
        })
      }

      if (res.ok) {
        const savedData = await res.json()
        setCertificates((prev) => {
          const next = (prev || []).map((c) => (c.id === id ? { ...c, ...savedData } : c))
          safeSaveLocalStorage(CERTIFICATES_KEY, next)
          return next
        })
        return { success: true, data: savedData }
      }
      return { success: true }
    } catch (err) {
      console.warn('Backend server unreachable, updating certificate locally:', err.message)
      return { success: true }
    }
  }, [])

  const deleteCertificate = useCallback(async (id) => {
    setCertificates((prev) => {
      const next = prev.filter((c) => c.id !== id)
      safeSaveLocalStorage(CERTIFICATES_KEY, next)
      return next
    })
    try {
      await fetch(`${API_BASE}/certificates/${id}`, { method: 'DELETE' })
    } catch (_) {}
  }, [])

  const resetCertificates = useCallback(async () => {
    setCertificates(CLIENT_CERTIFICATES)
    localStorage.removeItem(CERTIFICATES_KEY)
    try {
      await fetch(`${API_BASE}/reset-all`, { method: 'POST' })
    } catch (_) {}
  }, [])

  // CONSULTANTS CRUD WITH MONGODB ATLAS SYNC
  const addConsultant = useCallback(async (cons) => {
    setConsultants((prev) => {
      const filtered = (prev || []).filter((c) => c.id !== cons.id)
      const next = sortConsultantsList([cons, ...filtered])
      safeSaveLocalStorage(CONSULTANTS_KEY, next)
      return next
    })
    try {
      const res = await fetch(`${API_BASE}/consultants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cons),
      })
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}))
        console.warn('Backend failed to save consultant:', errJson)
        return { success: false, error: errJson.error || 'Server rejected consultant save' }
      }
      return { success: true }
    } catch (err) {
      console.warn('Backend server unreachable, saved locally:', err.message)
      return { success: true }
    }
  }, [])

  const updateConsultant = useCallback(async (id, updates) => {
    setConsultants((prev) => {
      const next = sortConsultantsList((prev || []).map((c) => (c.id === id ? { ...c, ...updates } : c)))
      safeSaveLocalStorage(CONSULTANTS_KEY, next)
      return next
    })
    try {
      const res = await fetch(`${API_BASE}/consultants/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}))
        console.warn('Backend failed to update consultant:', errJson)
        return { success: false, error: errJson.error || 'Server rejected consultant update' }
      }
      return { success: true }
    } catch (err) {
      console.warn('Backend server unreachable, updated locally:', err.message)
      return { success: true }
    }
  }, [])

  const deleteConsultant = useCallback(async (id) => {
    setConsultants((prev) => {
      const next = (prev || []).filter((c) => c.id !== id)
      safeSaveLocalStorage(CONSULTANTS_KEY, next)
      return next
    })
    try {
      await fetch(`${API_BASE}/consultants/${id}`, { method: 'DELETE' })
    } catch (_) {}
  }, [])

  const resetConsultants = useCallback(async () => {
    setConsultants(DEFAULT_CONSULTANTS)
    localStorage.removeItem(CONSULTANTS_KEY)
    try {
      await fetch(`${API_BASE}/reset-all`, { method: 'POST' })
    } catch (_) {}
  }, [])

  // Stats
  const stats = {
    total: projects.length,
    ongoing: projects.filter((p) => p.status === 'Ongoing').length,
    completed: projects.filter((p) => p.status === 'Completed').length,
    clients: [...new Set(projects.map((p) => p.client))].length,
    reportsCount: reports.length,
    competenciesCount: competencies.length,
    certificatesCount: certificates.length,
    consultantsCount: consultants.length,
    dbStatus,
  }

  return (
    <DataContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        deleteProject,
        resetProjects,
        team,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        resetTeam,
        reports,
        addReport,
        updateReport,
        deleteReport,
        resetReports,
        competencies,
        updateCompetency,
        resetCompetencies,
        certificates,
        addCertificate,
        updateCertificate,
        deleteCertificate,
        resetCertificates,
        consultants,
        addConsultant,
        updateConsultant,
        deleteConsultant,
        resetConsultants,
        services,
        updateService,
        resetServices,
        stats,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used inside DataProvider')
  return ctx
}
