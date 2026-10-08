import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { DEFAULT_PROJECTS } from '../data/projects'
import { DEFAULT_TEAM } from '../data/team'
import { PUBLISHED_REPORTS } from '../data/reportsData'
import { DEFAULT_COMPETENCIES } from '../data/competenciesData'
import { CLIENT_CERTIFICATES } from '../data/certificatesData'
import { DEFAULT_CONSULTANTS } from '../data/consultantsData'
import { DEFAULT_SERVICES } from '../data/servicesData'

const DataContext = createContext(null)
export const API_BASE = import.meta.env.VITE_API_URL || (['localhost', '127.0.0.1'].includes(window.location.hostname) ? 'http://localhost:5000/api' : '/api')

const PROJECTS_KEY = 'himat_projects_db'
const TEAM_KEY = 'himat_team_db'
const REPORTS_KEY = 'himat_reports_db'
const COMPETENCIES_KEY = 'himat_competencies_db_v2'
const CERTIFICATES_KEY = 'himat_certificates_db'
const CONSULTANTS_KEY = 'himat_consultants_db_v2'
const SERVICES_KEY = 'himat_services_db'
const DELETED_IDS_KEY = 'himat_deleted_ids'

function getInitialDeletedIds() {
  try {
    const saved = localStorage.getItem(DELETED_IDS_KEY)
    return saved ? new Set(JSON.parse(saved)) : new Set()
  } catch {
    return new Set()
  }
}

function sanitizeForStorage(data) {
  if (!Array.isArray(data)) return data
  return data.map((item) => {
    if (!item || typeof item !== 'object') return item
    const copy = { ...item }
    // Never store heavy base64 binaries in browser localStorage (prevents UI freeze & quota errors)
    if (typeof copy.pdfUrl === 'string' && copy.pdfUrl.startsWith('data:') && copy.pdfUrl.length > 50000) {
      copy.pdfUrl = ''
    }
    if (typeof copy.downloadUrl === 'string' && copy.downloadUrl.startsWith('data:') && copy.downloadUrl.length > 50000) {
      copy.downloadUrl = ''
    }
    if (typeof copy.coverImage === 'string' && copy.coverImage.startsWith('data:') && copy.coverImage.length > 80000) {
      copy.coverImage = ''
    }
    if (typeof copy.image === 'string' && copy.image.startsWith('data:') && copy.image.length > 80000) {
      copy.image = ''
    }
    return copy
  })
}

function safeSaveLocalStorage(key, data) {
  // Use non-blocking execution so main UI thread and animations never freeze
  setTimeout(() => {
    try {
      const clean = sanitizeForStorage(data)
      localStorage.setItem(key, JSON.stringify(clean))
    } catch (quotaError) {
      try {
        if (Array.isArray(data)) {
          const lean = data.map(({ pdfUrl, downloadUrl, coverImage, image, ...rest }) => rest)
          localStorage.setItem(key, JSON.stringify(lean))
        }
      } catch (_) {}
    }
  }, 0)
}

export function applyCompetencyImages(list) {
  if (!Array.isArray(list)) return []
  return list.map((c) => {
    if (c.id === 'program-development') {
      return { ...c, image: './images/program-development-bg.jpg', focalPoint: 'center 40%' }
    }
    if (c.id === 'organizational-assessment') {
      return {
        ...c,
        title: 'Organizational Capacity Assessment',
        category: 'ORGANIZATIONAL CAPACITY ASSESSMENT',
        image: './images/organizational-assessment-workshop.jpg',
        focalPoint: 'center 52%'
      }
    }
    if (c.id === 'capacity-building') {
      return {
        ...c,
        title: 'Organizational Capacity Building',
        category: 'ORGANIZATIONAL CAPACITY BUILDING',
        image: './images/capacity-building-bg.jpg',
        focalPoint: 'center 45%'
      }
    }
    if (c.id === 'third-party-monitoring' && (!c.image || c.image === './images/third-party-monitoring-bg.jpg')) {
      return { ...c, image: './images/office-automation-erp-bg.jpg' }
    }
    if (c.id === 'office-automation-erp') {
      return { ...c, image: './images/office-automation-erp-work.png', focalPoint: 'center 45%' }
    }
    if (c.id === 'web-development-digital-tools') {
      return { ...c, image: './images/web-development-bg.jpg', focalPoint: 'center 45%' }
    }
    if (c.id === 'inclusive-programming' && (!c.image || c.image === './images/inclusive-programming-bg.png')) {
      return { ...c, image: './images/inclusive-programming-bg.jpg', focalPoint: 'center 38%' }
    }
    if (c.id === 'climate-change-drm') {
      return {
        ...c,
        title: 'Climate Change & DRR',
        category: 'CLIMATE CHANGE & DISASTER RISK REDUCTION',
        image: './images/climate-change-drm-bg.jpg',
        focalPoint: 'center 45%'
      }
    }
    return c
  })
}

export function applyServicesOverrides(list) {
  if (!Array.isArray(list)) return []
  const orderMap = {
    me: 1,
    training: 2,
    advisory: 3,
    tpm: 4,
    capacity: 5,
    research: 6,
  }
  return list
    .map((s) => {
      let updated = { ...s }
      if (s.id === 'tpm') {
        updated.image = './images/office-automation-erp-bg.jpg'
      }
      if (s.id === 'capacity') {
        updated.title = 'Organizational Capacity Assessments'
      }
      if (orderMap[s.id] != null) {
        updated.order = orderMap[s.id]
      }
      return updated
    })
    .sort((a, b) => (a.order || 99) - (b.order || 99))
}

export function applyTeamImages(list) {
  if (!Array.isArray(list)) return []
  return list.map((m) => {
    if (m.id === 'himatullah') {
      return {
        ...m,
        experience: "25+ years of executive leadership in international development advisory, third-party monitoring, and diagnostic research. Trusted principal investigator for the World Bank, UN agencies, USAID, EU, GIZ, ADB and 60+ institutional clients across Pakistan, Afghanistan, Tajikistan, Kazakhstan, and South Sudan."
      }
    }
    if (m.id === 'jawad') {
      return { ...m, image: './jawad.jpg' }
    }
    if (m.id === 'hassan') {
      return {
        ...m,
        experience: "Hassan Khan is an Economics graduate from NUST with nearly three years of experience in business development and international development consultancy. He has worked on proposal development, donor research, partner coordination, and assignments for organizations including UNICEF, GIZ, WFP, and the World Bank Group, across sectors such as health, education, WASH, climate change, and child protection."
      }
    }
    if (m.id === 'urooj') {
      return {
        ...m,
        experience: "Computer Science graduate and IT Associate with experience in business development support, proposal preparation, website development, digital systems, corporate documentation, and IT support. Skilled in developing responsive websites and web applications using React.js, JavaScript, Node.js, and modern web technologies, with additional experience in AI-powered applications and database management."
      }
    }
    return m
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

export function mergeConsultantsWithDefaults(list, deletedSet = new Set()) {
  const filteredList = (Array.isArray(list) ? list : []).filter(c => !deletedSet.has(c.id))
  const defMap = new Map(DEFAULT_CONSULTANTS.map(c => [c.id, c]))
  const updated = filteredList.map(c => defMap.has(c.id) ? { ...defMap.get(c.id), ...c } : c)
  const ids = new Set(updated.map(c => c.id))
  const merged = [...updated]
  for (const def of DEFAULT_CONSULTANTS) {
    if (!ids.has(def.id) && !deletedSet.has(def.id)) {
      merged.push(def)
      ids.add(def.id)
    }
  }
  return sortConsultantsList(merged)
}


export function DataProvider({ children }) {
  const [deletedIds, setDeletedIds] = useState(getInitialDeletedIds)

  const markAsDeleted = useCallback((id) => {
    setDeletedIds((prev) => {
      const next = new Set(prev)
      next.add(id)
      try {
        localStorage.setItem(DELETED_IDS_KEY, JSON.stringify([...next]))
      } catch (_) {}
      return next
    })
  }, [])

  const unmarkDeleted = useCallback((id) => {
    setDeletedIds((prev) => {
      const next = new Set(prev)
      next.delete(id)
      try {
        localStorage.setItem(DELETED_IDS_KEY, JSON.stringify([...next]))
      } catch (_) {}
      return next
    })
  }, [])

  const [projects, setProjects] = useState(() => {
    try {
      const initDel = getInitialDeletedIds()
      const saved = localStorage.getItem(PROJECTS_KEY)
      const parsed = saved ? JSON.parse(saved) : null
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.filter(p => !initDel.has(`proj-${p.no}`))
      }
      return DEFAULT_PROJECTS.filter(p => !initDel.has(`proj-${p.no}`))
    } catch {
      return DEFAULT_PROJECTS
    }
  })
  const [team, setTeam] = useState(() => {
    try {
      const initDel = getInitialDeletedIds()
      const saved = localStorage.getItem(TEAM_KEY)
      const parsed = saved ? JSON.parse(saved) : null
      if (Array.isArray(parsed) && parsed.length > 0) {
        return applyTeamImages(parsed.filter(t => !initDel.has(t.id)))
      }
      return DEFAULT_TEAM.filter(t => !initDel.has(t.id))
    } catch {
      return DEFAULT_TEAM
    }
  })
  const [reports, setReports] = useState(() => {
    try {
      const initDel = getInitialDeletedIds()
      const saved = localStorage.getItem(REPORTS_KEY)
      const parsed = saved ? JSON.parse(saved) : null
      if (Array.isArray(parsed) && parsed.length > 0) {
        const cleaned = parsed.filter((r) => !initDel.has(r.id) && !['rep-nutrition-survey-2023', 'rep-cpi-success-2021'].includes(r.id))
        const pubMap = new Map(PUBLISHED_REPORTS.map(p => [p.id, p]))
        const updated = cleaned.map(r => pubMap.has(r.id) ? { ...r, ...pubMap.get(r.id) } : r)
        const ids = new Set(updated.map(r => r.id))
        const merged = [...updated]
        for (const pub of PUBLISHED_REPORTS) {
          if (!ids.has(pub.id) && !initDel.has(pub.id)) {
            merged.unshift(pub)
            ids.add(pub.id)
          }
        }
        return merged
      }
      return PUBLISHED_REPORTS.filter(r => !initDel.has(r.id))
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
      const initDel = getInitialDeletedIds()
      const saved = localStorage.getItem(CERTIFICATES_KEY)
      const parsed = saved ? JSON.parse(saved) : null
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.filter(c => !initDel.has(c.id))
      }
      return CLIENT_CERTIFICATES.filter(c => !initDel.has(c.id))
    } catch {
      return CLIENT_CERTIFICATES
    }
  })
  const [consultants, setConsultants] = useState(() => {
    try {
      const initDel = getInitialDeletedIds()
      const saved = localStorage.getItem(CONSULTANTS_KEY)
      const parsed = saved ? JSON.parse(saved) : null
      return Array.isArray(parsed) && parsed.length > 0 ? mergeConsultantsWithDefaults(parsed, initDel) : DEFAULT_CONSULTANTS.filter(c => !initDel.has(c.id))
    } catch {
      return DEFAULT_CONSULTANTS
    }
  })
  const [services, setServices] = useState(() => {
    try {
      const saved = localStorage.getItem(SERVICES_KEY)
      const parsed = saved ? JSON.parse(saved) : null
      return Array.isArray(parsed) && parsed.length > 0 ? applyServicesOverrides(parsed) : DEFAULT_SERVICES
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

        // Fetch Deleted IDs
        let currentDeleted = getInitialDeletedIds()
        try {
          const delRes = await fetch(`${API_BASE}/deleted-ids`)
          if (delRes.ok) {
            const delData = await delRes.json()
            if (Array.isArray(delData)) {
              currentDeleted = new Set([...currentDeleted, ...delData])
              setDeletedIds(currentDeleted)
              try {
                localStorage.setItem(DELETED_IDS_KEY, JSON.stringify([...currentDeleted]))
              } catch (_) {}
            }
          }
        } catch (_) {}

        // Fetch Projects
        try {
          const projRes = await fetch(`${API_BASE}/projects`)
          if (projRes.ok) {
            const data = await projRes.json()
            if (Array.isArray(data)) {
              const filtered = data.filter(p => !currentDeleted.has(`proj-${p.no}`))
              setProjects(filtered)
              safeSaveLocalStorage(PROJECTS_KEY, filtered)
            } else {
              setProjects(DEFAULT_PROJECTS.filter(p => !currentDeleted.has(`proj-${p.no}`)))
            }
          } else {
            setProjects(DEFAULT_PROJECTS.filter(p => !currentDeleted.has(`proj-${p.no}`)))
          }
        } catch (_) {
          setProjects(DEFAULT_PROJECTS.filter(p => !currentDeleted.has(`proj-${p.no}`)))
        }

        // Fetch Team
        try {
          const teamRes = await fetch(`${API_BASE}/team`)
          if (teamRes.ok) {
            const data = await teamRes.json()
            if (Array.isArray(data)) {
              const filtered = data.filter(t => !currentDeleted.has(t.id))
              const updated = applyTeamImages(filtered)
              setTeam(updated)
              safeSaveLocalStorage(TEAM_KEY, updated)
            } else {
              setTeam(DEFAULT_TEAM.filter(t => !currentDeleted.has(t.id)))
            }
          } else {
            setTeam(DEFAULT_TEAM.filter(t => !currentDeleted.has(t.id)))
          }
        } catch (_) {
          setTeam(DEFAULT_TEAM.filter(t => !currentDeleted.has(t.id)))
        }

        // Fetch Reports
        try {
          const repRes = await fetch(`${API_BASE}/reports`)
          if (repRes.ok) {
            const data = await repRes.json()
            if (Array.isArray(data)) {
              const cleaned = data.filter((r) => !currentDeleted.has(r.id) && !['rep-nutrition-survey-2023', 'rep-cpi-success-2021'].includes(r.id))
              const pubMap = new Map(PUBLISHED_REPORTS.map(p => [p.id, p]))
              const updated = cleaned.map(r => pubMap.has(r.id) ? { ...r, ...pubMap.get(r.id) } : r)
              const ids = new Set(updated.map(r => r.id))
              const merged = [...updated]
              for (const pub of PUBLISHED_REPORTS) {
                if (!ids.has(pub.id) && !currentDeleted.has(pub.id)) {
                  merged.unshift(pub)
                  ids.add(pub.id)
                }
              }
              setReports(merged)
              safeSaveLocalStorage(REPORTS_KEY, merged)
            } else {
              setReports(PUBLISHED_REPORTS.filter(r => !currentDeleted.has(r.id)))
            }
          } else {
            setReports(PUBLISHED_REPORTS.filter(r => !currentDeleted.has(r.id)))
          }
        } catch (_) {
          // fallback to localStorage or PUBLISHED_REPORTS
        }

        // Fetch Certificates
        try {
          const certRes = await fetch(`${API_BASE}/certificates`)
          if (certRes.ok) {
            const data = await certRes.json()
            if (Array.isArray(data)) {
              const filtered = data.filter(c => !currentDeleted.has(c.id))
              setCertificates(filtered)
              safeSaveLocalStorage(CERTIFICATES_KEY, filtered)
            } else {
              setCertificates(CLIENT_CERTIFICATES.filter(c => !currentDeleted.has(c.id)))
            }
          } else {
            setCertificates(CLIENT_CERTIFICATES.filter(c => !currentDeleted.has(c.id)))
          }
        } catch (_) {
          setCertificates(CLIENT_CERTIFICATES.filter(c => !currentDeleted.has(c.id)))
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
            if (Array.isArray(data)) {
              const sorted = mergeConsultantsWithDefaults(data, currentDeleted)
              setConsultants(sorted)
              safeSaveLocalStorage(CONSULTANTS_KEY, sorted)
            } else {
              setConsultants(DEFAULT_CONSULTANTS.filter(c => !currentDeleted.has(c.id)))
            }
          } else {
            setConsultants(DEFAULT_CONSULTANTS.filter(c => !currentDeleted.has(c.id)))
          }
        } catch (_) {
          setConsultants(DEFAULT_CONSULTANTS.filter(c => !currentDeleted.has(c.id)))
        }
        // Fetch Services
        try {
          const srvRes = await fetch(`${API_BASE}/services`)
          if (srvRes.ok) {
            const data = await srvRes.json()
            if (Array.isArray(data) && data.length > 0) {
              const updated = applyServicesOverrides(data)
              setServices(updated)
              safeSaveLocalStorage(SERVICES_KEY, updated)
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

        const initDel = getInitialDeletedIds()
        const savedProj = localStorage.getItem(PROJECTS_KEY)
        setProjects(savedProj ? JSON.parse(savedProj).filter(p => !initDel.has(`proj-${p.no}`)) : DEFAULT_PROJECTS.filter(p => !initDel.has(`proj-${p.no}`)))

        const savedTeam = localStorage.getItem(TEAM_KEY)
        setTeam(savedTeam ? applyTeamImages(JSON.parse(savedTeam).filter(t => !initDel.has(t.id))) : DEFAULT_TEAM.filter(t => !initDel.has(t.id)))

        const savedRep = localStorage.getItem(REPORTS_KEY)
        setReports(savedRep ? JSON.parse(savedRep).filter(r => !initDel.has(r.id)) : PUBLISHED_REPORTS.filter(r => !initDel.has(r.id)))

        const savedCert = localStorage.getItem(CERTIFICATES_KEY)
        setCertificates(savedCert ? JSON.parse(savedCert).filter(c => !initDel.has(c.id)) : CLIENT_CERTIFICATES.filter(c => !initDel.has(c.id)))

        const savedComp = localStorage.getItem(COMPETENCIES_KEY)
        setCompetencies(savedComp ? applyCompetencyImages(JSON.parse(savedComp)) : DEFAULT_COMPETENCIES)

        const savedCons = localStorage.getItem(CONSULTANTS_KEY)
        setConsultants(savedCons ? sortConsultantsList(JSON.parse(savedCons).filter(c => !initDel.has(c.id))) : DEFAULT_CONSULTANTS.filter(c => !initDel.has(c.id)))

        const savedSrv = localStorage.getItem(SERVICES_KEY)
        setServices(savedSrv ? applyServicesOverrides(JSON.parse(savedSrv)) : DEFAULT_SERVICES)
      }
    }

    loadData()
  }, [])

  // PROJECTS CRUD WITH MONGODB ATLAS SYNC
  const addProject = useCallback(async (proj) => {
    const projNo = String(proj.no || (Math.max(0, ...projects.map(p => Number(p.no) || 0)) + 1))
    unmarkDeleted(`proj-${projNo}`)
    const item = { ...proj, no: projNo }
    setProjects((prev) => {
      const filtered = prev.filter(p => String(p.no) !== projNo)
      const next = [item, ...filtered].sort((a, b) => (Number(b.no) || 0) - (Number(a.no) || 0))
      safeSaveLocalStorage(PROJECTS_KEY, next)
      return next
    })
    try {
      const res = await fetch(`${API_BASE}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      })
      if (res.ok) {
        const saved = await res.json()
        setProjects((prev) => {
          const filtered = prev.filter(p => String(p.no) !== String(saved.no))
          const next = [saved, ...filtered].sort((a, b) => (Number(b.no) || 0) - (Number(a.no) || 0))
          safeSaveLocalStorage(PROJECTS_KEY, next)
          return next
        })
        return { success: true, data: saved }
      }
      return { success: true }
    } catch (_) {
      return { success: true }
    }
  }, [projects, unmarkDeleted])

  const updateProject = useCallback(async (id, updates) => {
    unmarkDeleted(`proj-${id}`)
    setProjects((prev) => {
      const next = prev.map((p) => (String(p.no) === String(id) ? { ...p, ...updates } : p))
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
  }, [unmarkDeleted])

  const deleteProject = useCallback(async (id) => {
    markAsDeleted(`proj-${id}`)
    setProjects((prev) => {
      const next = prev.filter((p) => String(p.no) !== String(id))
      safeSaveLocalStorage(PROJECTS_KEY, next)
      return next
    })
    try {
      await fetch(`${API_BASE}/projects/${id}`, { method: 'DELETE' })
    } catch (_) {}
  }, [markAsDeleted])

  const resetProjects = useCallback(async () => {
    setProjects(DEFAULT_PROJECTS)
    localStorage.removeItem(PROJECTS_KEY)
    try {
      await fetch(`${API_BASE}/reset-all`, { method: 'POST' })
    } catch (_) {}
  }, [])

  // TEAM CRUD WITH MONGODB ATLAS SYNC
  const addTeamMember = useCallback(async (member) => {
    const memId = member.id || 'team-' + Date.now().toString().slice(-6)
    unmarkDeleted(memId)
    const normalized = { ...member, id: memId }
    setTeam((prev) => {
      const filtered = prev.filter(m => m.id !== memId)
      const next = [...filtered, normalized]
      safeSaveLocalStorage(TEAM_KEY, next)
      return next
    })
    try {
      const res = await fetch(`${API_BASE}/team`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(normalized),
      })
      if (res.ok) {
        const saved = await res.json()
        setTeam((prev) => {
          const filtered = prev.filter(m => m.id !== saved.id)
          const next = [...filtered, saved]
          safeSaveLocalStorage(TEAM_KEY, next)
          return next
        })
      }
    } catch (_) {}
  }, [unmarkDeleted])

  const updateTeamMember = useCallback(async (id, updates) => {
    unmarkDeleted(id)
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
  }, [unmarkDeleted])

  const deleteTeamMember = useCallback(async (id) => {
    markAsDeleted(id)
    setTeam((prev) => {
      const next = prev.filter((m) => m.id !== id)
      safeSaveLocalStorage(TEAM_KEY, next)
      return next
    })
    try {
      await fetch(`${API_BASE}/team/${id}`, { method: 'DELETE' })
    } catch (_) {}
  }, [markAsDeleted])

  const resetTeam = useCallback(async () => {
    setTeam(DEFAULT_TEAM)
    localStorage.removeItem(TEAM_KEY)
    try {
      await fetch(`${API_BASE}/reset-all`, { method: 'POST' })
    } catch (_) {}
  }, [])

  // REPORTS CRUD WITH MONGODB ATLAS SYNC
  const addReport = useCallback(async (rawRep) => {
    let rep = { ...rawRep }
    unmarkDeleted(rep.id)

    // Direct upload if base64 to ensure URL persistence
    if (rep.pdfUrl && rep.pdfUrl.startsWith('data:')) {
      try {
        const upRes = await fetch(`${API_BASE}/upload`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dataUrl: rep.pdfUrl, subfolder: 'reports', name: rep.docName || rep.title || 'report' }),
        })
        if (upRes.ok) {
          const upJson = await upRes.json()
          if (upJson.url) rep.pdfUrl = upJson.url
        }
      } catch (_) {}
    }
    if (rep.coverImage && rep.coverImage.startsWith('data:')) {
      try {
        const upRes = await fetch(`${API_BASE}/upload`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dataUrl: rep.coverImage, subfolder: 'covers', name: rep.title || 'cover' }),
        })
        if (upRes.ok) {
          const upJson = await upRes.json()
          if (upJson.url) rep.coverImage = upJson.url
        }
      } catch (_) {}
    }

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

      if (res.ok) {
        const savedData = await res.json()
        setReports((prev) => {
          const filtered = (prev || []).filter((r) => r.id !== savedData.id && r.id !== rep.id)
          const next = [{ ...rep, ...savedData }, ...filtered]
          safeSaveLocalStorage(REPORTS_KEY, next)
          return next
        })
        return { success: true, data: savedData }
      }
      return { success: true }
    } catch (err) {
      console.warn('Backend server unreachable, saved locally:', err.message)
      return { success: true }
    }
  }, [unmarkDeleted])

  const updateReport = useCallback(async (id, rawUpdates) => {
    let updates = { ...rawUpdates }
    unmarkDeleted(id)

    if (updates.pdfUrl && updates.pdfUrl.startsWith('data:')) {
      try {
        const upRes = await fetch(`${API_BASE}/upload`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dataUrl: updates.pdfUrl, subfolder: 'reports', name: updates.docName || updates.title || 'report' }),
        })
        if (upRes.ok) {
          const upJson = await upRes.json()
          if (upJson.url) updates.pdfUrl = upJson.url
        }
      } catch (_) {}
    }

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
  }, [unmarkDeleted])

  const deleteReport = useCallback(async (id) => {
    markAsDeleted(id)
    setReports((prev) => {
      const next = (prev || []).filter((r) => r.id !== id)
      safeSaveLocalStorage(REPORTS_KEY, next)
      return next
    })
    try {
      await fetch(`${API_BASE}/reports/${id}`, { method: 'DELETE' })
    } catch (_) {}
  }, [markAsDeleted])

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
  const addCertificate = useCallback(async (rawCert) => {
    let cert = { ...rawCert }
    unmarkDeleted(cert.id)

    if (cert.downloadUrl && cert.downloadUrl.startsWith('data:')) {
      try {
        const upRes = await fetch(`${API_BASE}/upload`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dataUrl: cert.downloadUrl, subfolder: 'certificates', name: cert.client || 'certificate' }),
        })
        if (upRes.ok) {
          const upJson = await upRes.json()
          if (upJson.url) cert.downloadUrl = upJson.url
        }
      } catch (_) {}
    }

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

      if (res.ok) {
        const savedData = await res.json()
        setCertificates((prev) => {
          const filtered = (prev || []).filter((c) => c.id !== savedData.id && c.id !== cert.id)
          const next = [{ ...cert, ...savedData }, ...filtered]
          safeSaveLocalStorage(CERTIFICATES_KEY, next)
          return next
        })
        return { success: true, data: savedData }
      }
      return { success: true }
    } catch (err) {
      console.warn('Backend server unreachable, saved certificate locally:', err.message)
      return { success: true }
    }
  }, [unmarkDeleted])

  const updateCertificate = useCallback(async (id, rawUpdates) => {
    let updates = { ...rawUpdates }
    unmarkDeleted(id)

    if (updates.downloadUrl && updates.downloadUrl.startsWith('data:')) {
      try {
        const upRes = await fetch(`${API_BASE}/upload`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dataUrl: updates.downloadUrl, subfolder: 'certificates', name: updates.client || 'certificate' }),
        })
        if (upRes.ok) {
          const upJson = await upRes.json()
          if (upJson.url) updates.downloadUrl = upJson.url
        }
      } catch (_) {}
    }

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
  }, [unmarkDeleted])

  const deleteCertificate = useCallback(async (id) => {
    markAsDeleted(id)
    setCertificates((prev) => {
      const next = (prev || []).filter((c) => c.id !== id)
      safeSaveLocalStorage(CERTIFICATES_KEY, next)
      return next
    })
    try {
      await fetch(`${API_BASE}/certificates/${id}`, { method: 'DELETE' })
    } catch (_) {}
  }, [markAsDeleted])

  const resetCertificates = useCallback(async () => {
    setCertificates(CLIENT_CERTIFICATES)
    localStorage.removeItem(CERTIFICATES_KEY)
    try {
      await fetch(`${API_BASE}/reset-all`, { method: 'POST' })
    } catch (_) {}
  }, [])

  // CONSULTANTS CRUD WITH MONGODB ATLAS SYNC
  const addConsultant = useCallback(async (cons) => {
    const consId = cons.id || 'cons-' + Date.now().toString().slice(-6)
    unmarkDeleted(consId)
    const normalized = { ...cons, id: consId }
    setConsultants((prev) => {
      const filtered = (prev || []).filter((c) => c.id !== consId)
      const next = sortConsultantsList([normalized, ...filtered])
      safeSaveLocalStorage(CONSULTANTS_KEY, next)
      return next
    })
    try {
      const res = await fetch(`${API_BASE}/consultants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(normalized),
      })
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}))
        console.warn('Backend failed to save consultant:', errJson)
        return { success: false, error: errJson.error || 'Server rejected consultant save' }
      }
      const saved = await res.json()
      setConsultants((prev) => {
        const filtered = (prev || []).filter((c) => c.id !== saved.id)
        const next = sortConsultantsList([saved, ...filtered])
        safeSaveLocalStorage(CONSULTANTS_KEY, next)
        return next
      })
      return { success: true }
    } catch (err) {
      console.warn('Backend server unreachable, saved locally:', err.message)
      return { success: true }
    }
  }, [unmarkDeleted])

  const updateConsultant = useCallback(async (id, updates) => {
    unmarkDeleted(id)
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
  }, [unmarkDeleted])

  const deleteConsultant = useCallback(async (id) => {
    markAsDeleted(id)
    setConsultants((prev) => {
      const next = (prev || []).filter((c) => c.id !== id)
      safeSaveLocalStorage(CONSULTANTS_KEY, next)
      return next
    })
    try {
      await fetch(`${API_BASE}/consultants/${id}`, { method: 'DELETE' })
    } catch (_) {}
  }, [markAsDeleted])

  const resetConsultants = useCallback(async () => {
    setConsultants(DEFAULT_CONSULTANTS)
    localStorage.removeItem(CONSULTANTS_KEY)
    try {
      await fetch(`${API_BASE}/reset-all`, { method: 'POST' })
    } catch (_) {}
  }, [])

  // Stats
  const stats = useMemo(() => ({
    total: projects.length,
    ongoing: projects.filter((p) => p.status === 'Ongoing').length,
    completed: projects.filter((p) => p.status === 'Completed').length,
    clients: [...new Set(projects.map((p) => p.client))].length,
    reportsCount: reports.length,
    competenciesCount: competencies.length,
    certificatesCount: certificates.length,
    consultantsCount: consultants.length,
    dbStatus,
  }), [projects, reports, competencies, certificates, consultants, dbStatus])

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
