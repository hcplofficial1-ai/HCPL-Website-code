import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useData, API_BASE } from '../../context/DataContext'
import CompetencyIcon from '../../components/common/CompetencyIcon'
import ImageAdjuster from '../../components/admin/ImageAdjuster'

const EMPTY_PROJECT = { no: '', client: '', title: '', type: 'Impact Assessment', sector: 'Poverty Alleviation & Social Protection', year: new Date().getFullYear().toString(), status: 'Ongoing', description: '' }
const EMPTY_REPORT = {
  id: '',
  title: '',
  client: '',
  clientCategory: 'Multilateral & Bilateral Partner',
  year: new Date().getFullYear().toString(),
  sector: 'Poverty Alleviation & Social Protection',
  type: 'Impact Assessment Study',
  coverage: 'Pakistan (National)',
  pages: '',
  pdfUrl: '',
  coverImage: '',
  summary: '',
  keyFindings: [],
  methodology: '',
  docType: 'pdf',
  docName: '',
}
const EMPTY_TEAM_MEMBER = {
  id: '',
  name: '',
  role: '',
  dept: '',
  category: 'associate',
  email: '',
  linkedin: '',
  image: '',
  imagePosition: '50% 10%',
  imageZoom: 1,
  education: '',
  experience: '',
  specialties: [],
  initials: '',
  order: 99,
}
const EMPTY_CERTIFICATE = {
  id: '',
  client: '',
  clientCategory: 'Multilateral & Bilateral Partner',
  category: 'multilateral',
  date: '',
  verifiedRef: '',
  title: '',
  logo: '',
  secondaryLogo: '',
  scope: '',
  citation: '',
  signatory: '',
  downloadUrl: '#',
}

const EMPTY_CONSULTANT = {
  id: '',
  name: '',
  role: '',
  org: '',
  specialties: [],
  experience: '',
  image: '',
  imagePosition: '50% 10%',
  imageZoom: 1,
  initials: '',
}

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const {
    projects, addProject, updateProject, deleteProject, resetProjects,
    stats, team, addTeamMember, updateTeamMember, deleteTeamMember, resetTeam,
    reports, addReport, updateReport, deleteReport, resetReports,
    competencies, updateCompetency, resetCompetencies,
    certificates, addCertificate, updateCertificate, deleteCertificate, resetCertificates,
    consultants = [], addConsultant, updateConsultant, deleteConsultant, resetConsultants,
  } = useData()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('team')
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState('')
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const handleLogout = () => { logout(); navigate('/admin/login') }

  // Team State & Modals
  const [showTeamModal, setShowTeamModal] = useState(false)
  const [editTeamMemberObj, setEditTeamMemberObj] = useState(null)
  const [teamForm, setTeamForm] = useState(EMPTY_TEAM_MEMBER)
  const [deleteTeamId, setDeleteTeamId] = useState(null)
  const [specialtyInput, setSpecialtyInput] = useState('')

  // Certificate State & Modals
  const [showCertModal, setShowCertModal] = useState(false)
  const [editCertObj, setEditCertObj] = useState(null)
  const [certForm, setCertForm] = useState(EMPTY_CERTIFICATE)
  const [deleteCertId, setDeleteCertId] = useState(null)
  const [isSavingCert, setIsSavingCert] = useState(false)

  // Project State & Modals
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [editProjectObj, setEditProjectObj] = useState(null)
  const [projectForm, setProjectForm] = useState(EMPTY_PROJECT)
  const [deleteProjectId, setDeleteProjectId] = useState(null)

  // Report State & Modals
  const [showReportModal, setShowReportModal] = useState(false)
  const [editReportObj, setEditReportObj] = useState(null)
  const [reportForm, setReportForm] = useState(EMPTY_REPORT)
  const [deleteReportId, setDeleteReportId] = useState(null)
  const [isSavingReport, setIsSavingReport] = useState(false)
  const [keyFindingInput, setKeyFindingInput] = useState('')

  // Competency State & Modals
  const [showCompetencyModal, setShowCompetencyModal] = useState(false)
  const [editCompetencyObj, setEditCompetencyObj] = useState(null)
  const [competencyForm, setCompetencyForm] = useState(null)
  const [newPointInput, setNewPointInput] = useState('')

  // Consultant State & Modals
  const [showConsultantModal, setShowConsultantModal] = useState(false)
  const [editConsultantObj, setEditConsultantObj] = useState(null)
  const [consultantForm, setConsultantForm] = useState(EMPTY_CONSULTANT)
  const [deleteConsultantId, setDeleteConsultantId] = useState(null)
  const [isSavingConsultant, setIsSavingConsultant] = useState(false)
  const [consultantSpecialtyInput, setConsultantSpecialtyInput] = useState('')

  // Inquiries State & Handlers
  const [inquiries, setInquiries] = useState([])
  const [loadingInquiries, setLoadingInquiries] = useState(false)

  const fetchInquiries = async () => {
    setLoadingInquiries(true)
    try {
      const res = await fetch(`${API_BASE}/contact`)
      if (res.ok) {
        const data = await res.json()
        setInquiries(data)
      }
    } catch (err) {
      console.error('Error fetching inquiries:', err)
    } finally {
      setLoadingInquiries(false)
    }
  }

  useEffect(() => {
    fetchInquiries()
  }, [])

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return
    try {
      const res = await fetch(`${API_BASE}/contact/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setInquiries(prev => prev.filter(i => i.id !== id))
        showToast('Inquiry deleted ✓')
      }
    } catch (err) {
      console.error('Error deleting inquiry:', err)
    }
  }

  // Filters
  const filteredInquiries = useMemo(() => {
    if (!search.trim()) return inquiries
    const q = search.toLowerCase()
    return inquiries.filter(i => i.name?.toLowerCase().includes(q) || i.email?.toLowerCase().includes(q) || i.subject?.toLowerCase().includes(q) || i.org?.toLowerCase().includes(q) || i.message?.toLowerCase().includes(q))
  }, [inquiries, search])

  const filteredTeam = useMemo(() => {
    if (!search.trim()) return team
    const q = search.toLowerCase()
    return team.filter(m => m.name?.toLowerCase().includes(q) || m.role?.toLowerCase().includes(q) || m.dept?.toLowerCase().includes(q))
  }, [team, search])

  const filteredCerts = useMemo(() => {
    if (!search.trim()) return certificates
    const q = search.toLowerCase()
    return certificates.filter(c => c.client?.toLowerCase().includes(q) || c.title?.toLowerCase().includes(q) || c.verifiedRef?.toLowerCase().includes(q))
  }, [certificates, search])

  const filteredProjects = useMemo(() => {
    let list = projects
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(p => p.title?.toLowerCase().includes(q) || p.client?.toLowerCase().includes(q) || p.sector?.toLowerCase().includes(q) || String(p.no).includes(q))
    }
    return [...list].sort((a, b) => (Number(a.no) || 0) - (Number(b.no) || 0))
  }, [projects, search])

  const filteredReports = useMemo(() => {
    if (!search.trim()) return reports
    const q = search.toLowerCase()
    return reports.filter(r => r.title?.toLowerCase().includes(q) || r.client?.toLowerCase().includes(q) || r.sector?.toLowerCase().includes(q))
  }, [reports, search])

  const filteredCompetencies = useMemo(() => {
    const list = competencies || []
    if (!search.trim()) return list
    const q = search.toLowerCase()
    return list.filter(c => c.title?.toLowerCase().includes(q) || c.category?.toLowerCase().includes(q))
  }, [competencies, search])

  const filteredConsultants = useMemo(() => {
    const list = consultants || []
    if (!search.trim()) return list
    const q = search.toLowerCase()
    return list.filter(c => c.name?.toLowerCase().includes(q) || c.role?.toLowerCase().includes(q) || c.org?.toLowerCase().includes(q))
  }, [consultants, search])

  // File Upload Helper (Images & PDFs)
  const handleFileUpload = (e, callback, maxMb = 35) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > maxMb * 1024 * 1024) {
      alert(`File is too large. Please select a file under ${maxMb}MB.`)
      return
    }
    const reader = new FileReader()
    reader.onload = (evt) => {
      callback(evt.target.result)
    }
    reader.readAsDataURL(file)
  }

  // High-performance client-side image compression (prevents storage quota & glitching)
  const handleImageUpload = (e, callback, maxWidth = 600, maxHeight = 600) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (evt) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let { width, height } = img
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width)
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height)
            height = maxHeight
          }
        }
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.85)
        callback(compressedBase64)
      }
      img.src = evt.target.result
    }
    reader.readAsDataURL(file)
  }

  // TEAM HANDLERS
  const openAddTeam = () => {
    setEditTeamMemberObj(null)
    setTeamForm({
      ...EMPTY_TEAM_MEMBER,
      id: 'team-' + Date.now().toString().slice(-5),
      order: team.length,
    })
    setSpecialtyInput('')
    setShowTeamModal(true)
  }

  const openEditTeam = (m) => {
    setEditTeamMemberObj(m)
    setTeamForm({
      ...m,
      specialties: Array.isArray(m.specialties) ? [...m.specialties] : [],
    })
    setSpecialtyInput('')
    setShowTeamModal(true)
  }

  const closeTeamModal = () => {
    setShowTeamModal(false)
    setEditTeamMemberObj(null)
    setTeamForm(EMPTY_TEAM_MEMBER)
    setSpecialtyInput('')
  }

  const handleSaveTeamMember = () => {
    if (!teamForm.name.trim() || !teamForm.role.trim()) {
      return alert('Full Name and Designation/Role are required.')
    }
    // Auto-generate initials if blank
    const calculatedInitials = teamForm.initials.trim() || teamForm.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    const payload = { ...teamForm, initials: calculatedInitials }

    if (editTeamMemberObj) {
      updateTeamMember(editTeamMemberObj.id, payload)
      showToast('Team member updated ✓')
    } else {
      addTeamMember(payload)
      showToast('New team member added to website ✓')
    }
    closeTeamModal()
  }

  const confirmDeleteTeam = () => {
    deleteTeamMember(deleteTeamId)
    setDeleteTeamId(null)
    showToast('Team member removed ✓')
  }

  const handleAddSpecialty = () => {
    if (!specialtyInput.trim()) return
    setTeamForm(f => ({ ...f, specialties: [...(f.specialties || []), specialtyInput.trim()] }))
    setSpecialtyInput('')
  }

  const handleRemoveSpecialty = (idx) => {
    setTeamForm(f => ({ ...f, specialties: f.specialties.filter((_, i) => i !== idx) }))
  }

  // CERTIFICATE HANDLERS
  const openAddCert = () => {
    setEditCertObj(null)
    setCertForm({
      ...EMPTY_CERTIFICATE,
      id: 'cert-' + Date.now().toString().slice(-5),
    })
    setShowCertModal(true)
  }

  const openEditCert = (c) => {
    setEditCertObj(c)
    setCertForm({ ...c })
    setShowCertModal(true)
  }

  const closeCertModal = () => {
    setShowCertModal(false)
    setEditCertObj(null)
    setCertForm(EMPTY_CERTIFICATE)
  }

  const handleSaveCert = async () => {
    if (!certForm.client.trim() || !certForm.title.trim()) {
      return alert('Client Name and Title/Assignment are required.')
    }
    setIsSavingCert(true)
    try {
      const payload = {
        ...certForm,
        id: certForm.id || 'cert-' + Date.now().toString().slice(-5),
        clientCategory: certForm.clientCategory || (
          certForm.category === 'multilateral' ? 'Multilateral & Bilateral Partner' :
          certForm.category === 'akdn' ? 'Aga Khan Development Network (AKDN)' :
          certForm.category === 'ingo' ? 'International NGO' : 'Social Protection & NGO Partner'
        ),
      }
      let result
      if (editCertObj) {
        result = await updateCertificate(editCertObj.id, payload)
        showToast('Certificate record updated ✓')
      } else {
        result = await addCertificate(payload)
        showToast('New certificate published ✓')
      }
      if (result && result.error) {
        alert(`Warning: ${result.error}`)
      }
      closeCertModal()
    } catch (err) {
      alert(`Error publishing certificate: ${err.message}`)
    } finally {
      setIsSavingCert(false)
    }
  }

  const confirmDeleteCert = () => {
    deleteCertificate(deleteCertId)
    setDeleteCertId(null)
    showToast('Certificate removed ✓')
  }

  // PROJECT HANDLERS
  const openAddProject = () => {
    setEditProjectObj(null)
    const nextNo = (Math.max(...projects.map(p => Number(p.no) || 0), 0) + 1).toString()
    setProjectForm({
      ...EMPTY_PROJECT,
      no: nextNo,
      type: 'Impact Assessment',
      sector: 'Poverty Alleviation & Social Protection',
      year: new Date().getFullYear().toString(),
      status: 'Ongoing',
    })
    setShowProjectModal(true)
  }
  const openEditProject = (p) => { setEditProjectObj(p); setProjectForm({ ...p }); setShowProjectModal(true) }
  const closeProjectModal = () => { setShowProjectModal(false); setEditProjectObj(null); setProjectForm(EMPTY_PROJECT) }
  const handleSaveProject = () => {
    if (!projectForm.title.trim() || !projectForm.client.trim()) return alert('Title and Client are required.')
    const numNo = String(projectForm.no || (Math.max(...projects.map(p => Number(p.no) || 0), 0) + 1))
    const payload = { ...projectForm, no: numNo }
    if (editProjectObj) {
      updateProject(editProjectObj.no, payload)
      showToast(`Project #${numNo} updated ✓`)
    } else {
      addProject(payload)
      showToast(`Project #${numNo} added to end of portfolio ✓`)
    }
    closeProjectModal()
  }
  const confirmDeleteProject = () => { deleteProject(deleteProjectId); setDeleteProjectId(null); showToast('Project deleted ✓') }

  // REPORT HANDLERS
  const openAddReport = () => {
    setEditReportObj(null)
    setReportForm({ ...EMPTY_REPORT, id: 'rep-' + Date.now().toString().slice(-4), year: new Date().getFullYear().toString() })
    setKeyFindingInput('')
    setShowReportModal(true)
  }
  const openEditReport = (rep) => {
    setEditReportObj(rep)
    setReportForm({
      ...rep,
      keyFindings: Array.isArray(rep.keyFindings) ? [...rep.keyFindings] : [],
    })
    setKeyFindingInput('')
    setShowReportModal(true)
  }
  const closeReportModal = () => {
    setShowReportModal(false)
    setEditReportObj(null)
    setReportForm(EMPTY_REPORT)
    setKeyFindingInput('')
    setIsSavingReport(false)
  }
  const handleAddKeyFinding = () => {
    if (!keyFindingInput.trim()) return
    setReportForm(f => ({ ...f, keyFindings: [...(f.keyFindings || []), keyFindingInput.trim()] }))
    setKeyFindingInput('')
  }
  const handleRemoveKeyFinding = (idx) => {
    setReportForm(f => ({ ...f, keyFindings: (f.keyFindings || []).filter((_, i) => i !== idx) }))
  }
  const handleSaveReport = async () => {
    if (!reportForm.title.trim() || !reportForm.client.trim()) return alert('Title and Client are required.')
    setIsSavingReport(true)
    try {
      const payload = {
        ...reportForm,
        id: reportForm.id || 'rep-' + Date.now().toString().slice(-4),
        year: reportForm.year || new Date().getFullYear().toString(),
        sector: reportForm.sector || 'Poverty Alleviation & Social Protection',
        type: reportForm.type || 'Impact Assessment Study',
        clientCategory: reportForm.clientCategory || 'Multilateral Partner',
      }
      let result
      if (editReportObj) {
        result = await updateReport(editReportObj.id, payload)
        showToast('Report updated ✓')
      } else {
        result = await addReport(payload)
        showToast('Report published ✓')
      }
      if (result && result.error) {
        alert(`Warning: ${result.error}`)
      }
      closeReportModal()
    } catch (err) {
      alert(`Error publishing report: ${err.message}`)
    } finally {
      setIsSavingReport(false)
    }
  }
  const confirmDeleteReport = () => { deleteReport(deleteReportId); setDeleteReportId(null); showToast('Report deleted ✓') }

  // COMPETENCY HANDLERS
  const openEditCompetency = (comp) => { setEditCompetencyObj(comp); setCompetencyForm({ ...comp, expertise: Array.isArray(comp.expertise) ? [...comp.expertise] : [] }); setNewPointInput(''); setShowCompetencyModal(true) }
  const closeCompetencyModal = () => { setShowCompetencyModal(false); setEditCompetencyObj(null); setCompetencyForm(null); setNewPointInput('') }
  const handleSaveCompetency = () => {
    if (!competencyForm.title.trim() || !competencyForm.category.trim()) return alert('Category label and Title are required.')
    updateCompetency(editCompetencyObj.id, competencyForm)
    showToast(`${competencyForm.category} updated ✓`)
    closeCompetencyModal()
  }

  // CONSULTANT HANDLERS
  const openAddConsultant = () => {
    setEditConsultantObj(null)
    setConsultantForm({
      ...EMPTY_CONSULTANT,
      id: 'cons-' + Date.now().toString().slice(-5),
    })
    setConsultantSpecialtyInput('')
    setShowConsultantModal(true)
  }

  const openEditConsultant = (c) => {
    setEditConsultantObj(c)
    setConsultantForm({
      ...c,
      specialties: Array.isArray(c.specialties) ? [...c.specialties] : [],
    })
    setConsultantSpecialtyInput('')
    setShowConsultantModal(true)
  }

  const closeConsultantModal = () => {
    setShowConsultantModal(false)
    setEditConsultantObj(null)
    setConsultantForm(EMPTY_CONSULTANT)
    setConsultantSpecialtyInput('')
    setIsSavingConsultant(false)
  }

  const handleAddConsultantSpecialty = () => {
    if (!consultantSpecialtyInput.trim()) return
    setConsultantForm(f => ({ ...f, specialties: [...(f.specialties || []), consultantSpecialtyInput.trim()] }))
    setConsultantSpecialtyInput('')
  }

  const handleRemoveConsultantSpecialty = (idx) => {
    setConsultantForm(f => ({ ...f, specialties: f.specialties.filter((_, i) => i !== idx) }))
  }

  const handleSaveConsultant = async () => {
    if (!consultantForm.name.trim() || !consultantForm.role.trim()) {
      return alert('Full Name and Designation/Role are required.')
    }
    const calculatedInitials = consultantForm.initials.trim() || consultantForm.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    const payload = { ...consultantForm, initials: calculatedInitials }

    setIsSavingConsultant(true)
    try {
      let result
      if (editConsultantObj) {
        result = await updateConsultant(editConsultantObj.id, payload)
        showToast('Senior Consultant updated ✓')
      } else {
        result = await addConsultant(payload)
        showToast('New Senior Consultant added to roster ✓')
      }
      if (result && result.error) {
        alert(`Warning: ${result.error}`)
      }
      closeConsultantModal()
    } catch (err) {
      alert(`Error saving consultant: ${err.message}`)
    } finally {
      setIsSavingConsultant(false)
    }
  }

  const confirmDeleteConsultant = () => {
    deleteConsultant(deleteConsultantId)
    setDeleteConsultantId(null)
    showToast('Senior Consultant removed ✓')
  }

  // Styles
  const s = {
    topbar: { background: '#760CB0', height: '60px', display: 'flex', alignItems: 'center', padding: '0 2rem', gap: '1rem', justifyContent: 'space-between', boxShadow: '0 2px 12px rgba(118,12,176,0.3)', position: 'sticky', top: 0, zIndex: 200 },
    body: { minHeight: 'calc(100vh - 60px)', background: '#faf5ff', padding: '2rem' },
    card: { background: '#fff', borderRadius: '14px', padding: '1.5rem', border: '1px solid rgba(118,12,176,0.08)', boxShadow: '0 2px 10px rgba(118,12,176,0.06)' },
    th: { fontFamily: "'Inter', Arial, sans-serif", fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#760CB0', padding: '0.75rem 1rem', textAlign: 'left', whiteSpace: 'nowrap', background: '#faf5ff', borderBottom: '2px solid rgba(118,12,176,0.1)' },
    td: { fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', color: '#424242', padding: '0.65rem 1rem', borderBottom: '1px solid rgba(118,12,176,0.05)', verticalAlign: 'middle' },
    input: { fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: '#212121', background: '#fff', border: '1.5px solid rgba(118,12,176,0.2)', borderRadius: '8px', padding: '0.6rem 0.85rem', outline: 'none', width: '100%', boxSizing: 'border-box' },
    btn: (bg, col = '#fff') => ({ background: bg, color: col, fontFamily: "'Inter', Arial, sans-serif", fontWeight: 700, fontSize: '0.8125rem', padding: '0.45rem 0.95rem', borderRadius: '7px', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }),
  }

  const KPI_CARDS = [
    { label: 'Contact Inquiries', val: inquiries.length, icon: '📬', color: '#9333ea' },
    { label: 'Team Members', val: team.length, icon: '👥', color: '#760CB0' },
    { label: 'Senior Consultants', val: consultants.length, icon: '🎓', color: '#6b21a8' },
    { label: 'Certificates & Letters', val: certificates.length, icon: '📜', color: '#0284c7' },
    { label: 'Published Reports', val: reports.length, icon: '📚', color: '#16a34a' },
    { label: 'Documented Projects', val: stats.total, icon: '📋', color: '#d97706' },
  ]

  return (
    <div style={{ fontFamily: "'Inter', Arial, sans-serif" }}>
      {/* Toast Notification */}
      {toast && (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: '#16a34a', color: '#fff', padding: '0.85rem 1.5rem', borderRadius: '10px', fontWeight: 700, zIndex: 9999, boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
          {toast}
        </div>
      )}

      {/* Topbar */}
      <div style={s.topbar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontWeight: 900, fontSize: '1.1rem', color: '#fff', letterSpacing: '-0.02em' }}>HIMAT Admin Portal</span>
          <span style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '0.8125rem', fontWeight: 600, padding: '0.2rem 0.65rem', borderRadius: '999px' }}>Staff Dashboard</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.85rem', fontWeight: 700 }}>👤 Logged in as: {user?.name}</span>
          <button onClick={handleLogout} style={s.btn('rgba(255,255,255,0.2)', '#fff')}>Sign Out</button>
        </div>
      </div>

      <div style={s.body}>
        {/* KPI Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {KPI_CARDS.map(k => (
            <div key={k.label} style={{ ...s.card, display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '2rem', background: '#faf5ff', padding: '0.5rem', borderRadius: '12px' }}>{k.icon}</span>
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: k.color }}>{k.val}</div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#757575', textTransform: 'uppercase' }}>{k.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tab Header Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {[
            { id: 'inquiries', label: `📬 Contact Inquiries (${inquiries.length})` },
            { id: 'team', label: `👥 Team Profiles (${team.length})` },
            { id: 'consultants', label: `🎓 Senior Consultants (${consultants.length})` },
            { id: 'certificates', label: `📜 Certificates & Letters (${certificates.length})` },
            { id: 'reports', label: `📚 Reports & PDFs (${reports.length})` },
            { id: 'projects', label: `📋 Projects (${projects.length})` },
            { id: 'competencies', label: '🎯 Core Competencies & Images' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                fontWeight: 700,
                fontSize: '0.85rem',
                padding: '0.6rem 1.25rem',
                borderRadius: '8px',
                border: '1.5px solid',
                borderColor: activeTab === t.id ? '#760CB0' : 'rgba(118,12,176,0.2)',
                background: activeTab === t.id ? '#760CB0' : '#fff',
                color: activeTab === t.id ? '#fff' : '#760CB0',
                cursor: 'pointer',
                boxShadow: activeTab === t.id ? '0 4px 14px rgba(118,12,176,0.25)' : 'none',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* 1. TEAM MEMBERS TAB */}
        {activeTab === 'team' && (
          <div style={s.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#212121', marginBottom: '0.2rem' }}>Leadership & Executive Staff ({team.length} Members)</h2>
                <div style={{ fontSize: '0.8125rem', color: '#9e9e9e' }}>Add new team members or update profile pictures, titles, education, descriptions, email, and LinkedIn links. Automatically reflects in McKinsey circular card theme on the website.</div>
              </div>
              <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search team…" style={{ ...s.input, width: '180px', fontSize: '0.82rem', padding: '0.45rem 0.85rem' }} />
                <button onClick={openAddTeam} style={s.btn('#760CB0')}>+ Add Team Member</button>
                <button onClick={() => { if (window.confirm('Reset team roster to default members?')) { resetTeam(); showToast('Team reset to default ✓') } }} style={s.btn('#ef4444')}>↺ Reset Team</button>
              </div>
            </div>

            {/* Grid of Team Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
              {filteredTeam.map(m => (
                <div key={m.id} style={{ background: '#faf5ff', borderRadius: '16px', padding: '1.25rem', border: '1.5px solid rgba(118,12,176,0.12)', display: 'flex', flexDirection: 'column', gap: '0.75rem', position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #760CB0', flexShrink: 0, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {m.image ? (
                        <img src={m.image} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.currentTarget.style.display = 'none'} />
                      ) : (
                        <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#760CB0' }}>{m.initials || m.name[0]}</span>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: '1rem', color: '#111' }}>{m.name}</div>
                      <div style={{ fontSize: '0.82rem', color: '#760CB0', fontWeight: 700 }}>{m.role}</div>
                      <div style={{ fontSize: '0.78rem', color: '#666', marginTop: '0.1rem' }}>{m.dept || ''}</div>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.8125rem', color: '#444', lineHeight: 1.5, background: '#fff', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(118,12,176,0.08)' }}>
                    {m.experience || m.bio || 'No bio specified.'}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: '#666' }}>
                    <span>✉ {m.email || 'No email'}</span>
                    <span>in {m.linkedin ? 'Linked' : 'None'}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                    <button onClick={() => openEditTeam(m)} style={{ ...s.btn('#760CB0'), flex: 1, justifyContent: 'center' }}>✏️ Edit Member</button>
                    <button onClick={() => setDeleteTeamId(m.id)} style={s.btn('#ef4444')}>Del</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SENIOR CONSULTANTS TAB */}
        {activeTab === 'consultants' && (
          <div style={s.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#212121', marginBottom: '0.2rem' }}>Senior Consultants & Domain Experts ({consultants.length} Members)</h2>
                <div style={{ fontSize: '0.8125rem', color: '#9e9e9e' }}>Manage senior consultants, technical advisors, and evaluation specialists. Changes immediately sync to MongoDB Atlas and update the `/consultants` page!</div>
              </div>
              <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search consultants…" style={{ ...s.input, width: '200px', fontSize: '0.82rem', padding: '0.45rem 0.85rem' }} />
                <button onClick={openAddConsultant} style={s.btn('#760CB0')}>+ Add Senior Consultant</button>
                <button onClick={() => { if (window.confirm('Reset senior consultants roster to defaults?')) { resetConsultants(); showToast('Consultants reset to default ✓') } }} style={s.btn('#ef4444')}>↺ Reset</button>
              </div>
            </div>

            {/* Grid of Consultant Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
              {filteredConsultants.map(c => (
                <div key={c.id} style={{ background: '#faf5ff', borderRadius: '16px', padding: '1.25rem', border: '1.5px solid rgba(118,12,176,0.12)', display: 'flex', flexDirection: 'column', gap: '0.75rem', position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #760CB0', flexShrink: 0, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {c.image ? (
                        <img src={c.image} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.currentTarget.style.display = 'none'} />
                      ) : (
                        <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#760CB0' }}>{c.initials || c.name[0]}</span>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: '1rem', color: '#111' }}>{c.name}</div>
                      <div style={{ fontSize: '0.82rem', color: '#760CB0', fontWeight: 700 }}>{c.role}</div>
                      <div style={{ fontSize: '0.78rem', color: '#666', marginTop: '0.1rem' }}>{c.org || ''}</div>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.8125rem', color: '#444', lineHeight: 1.5, background: '#fff', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(118,12,176,0.08)' }}>
                    {c.experience || 'No description provided.'}
                  </div>

                  {c.specialties && c.specialties.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {c.specialties.map((sp, idx) => (
                        <span key={idx} style={{ background: '#fff', color: '#760CB0', border: '1px solid rgba(118,12,176,0.18)', fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '999px', fontWeight: 600 }}>
                          {sp}
                        </span>
                      ))}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                    <button onClick={() => openEditConsultant(c)} style={{ ...s.btn('#760CB0'), flex: 1, justifyContent: 'center' }}>✏️ Edit Consultant</button>
                    <button onClick={() => setDeleteConsultantId(c.id)} style={s.btn('#ef4444')}>Del</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. CERTIFICATES TAB */}
        {activeTab === 'certificates' && (
          <div style={s.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#212121', marginBottom: '0.2rem' }}>Official Client Certificates & Performance Commendations ({certificates.length})</h2>
                <div style={{ fontSize: '0.8125rem', color: '#9e9e9e' }}>Add new client appreciation letters, verified reference IDs, official scope, evaluator citations, and logos. Directly renders on `/certificates` with full screen modal viewer!</div>
              </div>
              <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search certificates…" style={{ ...s.input, width: '180px', fontSize: '0.82rem', padding: '0.45rem 0.85rem' }} />
                <button onClick={openAddCert} style={s.btn('#760CB0')}>+ Add Certificate</button>
                <button onClick={() => { if (window.confirm('Reset certificates to default client list?')) { resetCertificates(); showToast('Certificates reset to default ✓') } }} style={s.btn('#ef4444')}>↺ Reset</button>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Logo', 'Client / Partner', 'Reference ID', 'Assignment Title', 'Category', 'Date', 'Signatory', 'Actions'].map(h => (
                      <th key={h} style={s.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredCerts.map(c => (
                    <tr key={c.id}>
                      <td style={s.td}>
                        <div style={{ width: '40px', height: '40px', background: '#fff', border: '1px solid rgba(118,12,176,0.15)', borderRadius: '8px', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <img src={c.logo} alt={c.client} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} onError={e => e.currentTarget.style.display = 'none'} />
                        </div>
                      </td>
                      <td style={{ ...s.td, fontWeight: 800, color: '#760CB0' }}>{c.client}</td>
                      <td style={{ ...s.td, fontWeight: 700, whiteSpace: 'nowrap' }}>{c.verifiedRef}</td>
                      <td style={{ ...s.td, fontWeight: 600, maxWidth: '280px' }}>{c.title}</td>
                      <td style={s.td}>
                        <span style={{ background: '#faf5ff', color: '#760CB0', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.78rem' }}>{c.category}</span>
                      </td>
                      <td style={{ ...s.td, whiteSpace: 'nowrap' }}>{c.date}</td>
                      <td style={{ ...s.td, fontSize: '0.78rem' }}>{c.signatory}</td>
                      <td style={s.td}>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <button onClick={() => openEditCert(c)} style={s.btn('#760CB0')}>Edit</button>
                          <button onClick={() => setDeleteCertId(c.id)} style={s.btn('#ef4444')}>Del</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. REPORTS TAB */}
        {activeTab === 'reports' && (
          <div style={s.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#212121', marginBottom: '0.2rem' }}>Published Research Reports & PDF Documents ({reports.length})</h2>
                <div style={{ fontSize: '0.8125rem', color: '#9e9e9e' }}>Manage diagnostic studies, research summaries, and attached PDF publications.</div>
              </div>
              <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search reports…" style={{ ...s.input, width: '180px', fontSize: '0.82rem', padding: '0.45rem 0.85rem' }} />
                <button onClick={openAddReport} style={s.btn('#760CB0')}>+ Add New Report</button>
                <button onClick={() => { if (window.confirm('Reset all reports to defaults?')) { resetReports(); showToast('Reports reset complete ✓') } }} style={s.btn('#ef4444')}>↺ Reset</button>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Cover', 'Client / Partner', 'Client Category', 'Report Assignment Title', 'Sector', 'Year & Coverage', 'Document', 'Actions'].map(h => (
                      <th key={h} style={s.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.map(rep => {
                    const isWord = rep.pdfUrl && (rep.pdfUrl.includes('.doc') || rep.pdfUrl.includes('wordprocessingml') || rep.docType === 'word')
                    return (
                      <tr key={rep.id}>
                        <td style={s.td}>
                          {rep.coverImage ? (
                            <img src={rep.coverImage} alt={rep.title} style={{ width: '40px', height: '54px', objectFit: 'cover', borderRadius: '6px', border: '1px solid rgba(118,12,176,0.15)' }} onError={e => e.currentTarget.style.display = 'none'} />
                          ) : (
                            <div style={{ width: '40px', height: '54px', background: '#faf5ff', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', color: '#760CB0', border: '1px dashed rgba(118,12,176,0.3)' }}>{isWord ? '📝' : '📄'}</div>
                          )}
                        </td>
                        <td style={{ ...s.td, fontWeight: 800, color: '#760CB0' }}>{rep.client}</td>
                        <td style={{ ...s.td, fontSize: '0.8rem', color: '#666' }}>{rep.clientCategory || '—'}</td>
                        <td style={{ ...s.td, fontWeight: 600, maxWidth: '280px' }}>{rep.title}</td>
                        <td style={s.td}>
                          <span style={{ background: '#faf5ff', color: '#760CB0', fontWeight: 700, padding: '0.2rem 0.65rem', borderRadius: '999px', fontSize: '0.78rem' }}>
                            {rep.sector}
                          </span>
                        </td>
                        <td style={{ ...s.td, whiteSpace: 'nowrap' }}>
                          <div><strong>{rep.year || '—'}</strong></div>
                          <div style={{ fontSize: '0.78rem', color: '#666' }}>{rep.coverage || 'Pakistan'}</div>
                        </td>
                        <td style={s.td}>
                          {rep.pdfUrl ? (
                            <span style={{ background: isWord ? '#eff6ff' : '#f0fdf4', color: isWord ? '#1d4ed8' : '#16a34a', border: isWord ? '1px solid #bfdbfe' : '1px solid #bbf7d0', fontWeight: 800, fontSize: '0.78rem', padding: '0.25rem 0.65rem', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                              {isWord ? '📝 Word Doc' : '📄 PDF Attached'}
                            </span>
                          ) : (
                            <span style={{ color: '#9ca3af', fontSize: '0.8rem' }}>No Doc</span>
                          )}
                        </td>
                        <td style={s.td}>
                          <div style={{ display: 'flex', gap: '0.4rem' }}>
                            <button onClick={() => openEditReport(rep)} style={s.btn('#760CB0')}>Edit</button>
                            <button onClick={() => setDeleteReportId(rep.id)} style={s.btn('#ef4444')}>Del</button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div style={s.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#212121', marginBottom: '0.2rem' }}>Master Project Portfolio ({projects.length} Total)</h2>
                <div style={{ fontSize: '0.8125rem', color: '#9e9e9e' }}>Full dataset of all {projects.length} documented assignments since 2009</div>
              </div>
              <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search projects…" style={{ ...s.input, width: '180px', fontSize: '0.82rem', padding: '0.45rem 0.85rem' }} />
                <button onClick={openAddProject} style={s.btn('#760CB0')}>+ Add Project</button>
                <button onClick={() => { if (window.confirm(`Reset project dataset to original default items?`)) { resetProjects(); showToast('Projects reset to default ✓') } }} style={s.btn('#ef4444')}>↺ Reset</button>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['#', 'Client', 'Assignment Title', 'Type', 'Sector', 'Year', 'Status', 'Actions'].map(h => (
                      <th key={h} style={s.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map(p => (
                    <tr key={p.no}>
                      <td style={{ ...s.td, fontWeight: 700, color: '#760CB0' }}>#{p.no}</td>
                      <td style={{ ...s.td, fontWeight: 600 }}>{p.client}</td>
                      <td style={{ ...s.td, maxWidth: '280px' }}>{p.title}</td>
                      <td style={s.td}>{p.type}</td>
                      <td style={s.td}>{p.sector}</td>
                      <td style={s.td}>{p.year}</td>
                      <td style={s.td}>
                        <span style={{ background: p.status === 'Ongoing' ? '#fef3c7' : '#dcfce7', color: p.status === 'Ongoing' ? '#d97706' : '#16a34a', fontSize: '0.8125rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '999px' }}>
                          {p.status}
                        </span>
                      </td>
                      <td style={s.td}>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <button onClick={() => openEditProject(p)} style={s.btn('#760CB0')}>Edit</button>
                          <button onClick={() => setDeleteProjectId(p.no)} style={s.btn('#ef4444')}>Del</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. CORE COMPETENCIES TAB */}
        {activeTab === 'competencies' && (
          <div style={s.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#212121', marginBottom: '0.2rem' }}>Core Competencies & 16:9 Image Management</h2>
                <div style={{ fontSize: '0.8125rem', color: '#9e9e9e' }}>Upload separate 16:9 landscape images for each competency, adjust focal point alignment, edit titles, descriptions, and expertise points.</div>
              </div>
              <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search competencies…" style={{ ...s.input, width: '200px', fontSize: '0.82rem', padding: '0.45rem 0.85rem' }} />
                <button onClick={() => { if (window.confirm('Reset all competencies to default content and images?')) { resetCompetencies(); showToast('Competencies reset to default ✓') } }} style={s.btn('#ef4444')}>↺ Reset Competencies</button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {filteredCompetencies.map(comp => (
                <div key={comp.id} style={{ background: '#fff', borderRadius: '16px', border: '1.5px solid rgba(118, 12, 176, 0.12)', boxShadow: '0 4px 16px rgba(118, 12, 176, 0.05)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ width: '100%', aspectRatio: '16 / 9', background: 'linear-gradient(135deg, #32004a 0%, #760CB0 100%)', position: 'relative', overflow: 'hidden' }}>
                    {comp.image ? (
                      <img src={comp.image} alt={comp.altText || comp.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: comp.focalPoint || 'center center' }} onError={e => e.currentTarget.style.display = 'none'} />
                    ) : (
                      <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#fff', padding: '1rem', textAlign: 'center' }}>
                        <CompetencyIcon id={comp.id} color="#fff" size={28} />
                        <span style={{ fontSize: '0.8125rem', fontWeight: 800, marginTop: '0.4rem', letterSpacing: '0.08em' }}>NO IMAGE UPLOADED</span>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '0.75rem' }}>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', textTransform: 'uppercase' }}>{comp.category}</div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#212121', margin: 0 }}>{comp.title}</h3>
                    <p style={{ fontSize: '0.82rem', color: '#555', lineHeight: 1.5, margin: 0, flex: 1 }}>{comp.description}</p>
                    <button onClick={() => openEditCompetency(comp)} style={{ ...s.btn('#760CB0'), width: '100%', justifyContent: 'center', padding: '0.65rem', marginTop: '0.5rem' }}>✏️ Edit Competency & Image</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. CONTACT INQUIRIES TAB */}
        {activeTab === 'inquiries' && (
          <div style={s.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#212121', marginBottom: '0.2rem' }}>Website Contact Inquiries ({inquiries.length})</h2>
                <div style={{ fontSize: '0.8125rem', color: '#9e9e9e' }}>Real-time messages submitted via the website contact form (Saved in MongoDB Atlas & dispatched to info@himatconsulting.com)</div>
              </div>
              <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search inquiries…" style={{ ...s.input, width: '200px', fontSize: '0.82rem', padding: '0.45rem 0.85rem' }} />
                <button onClick={fetchInquiries} style={s.btn('#760CB0')}>🔄 Refresh</button>
              </div>
            </div>

            {loadingInquiries ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: '#760CB0', fontWeight: 700 }}>Loading contact form submissions...</div>
            ) : filteredInquiries.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: '#757575', background: '#faf5ff', borderRadius: '12px' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📬</div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#212121' }}>No Contact Inquiries Found</div>
                <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>Submissions from the public Contact page will appear here automatically.</div>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      {['Date & Time', 'Submitter', 'Organization', 'Contact Details', 'Subject', 'Message', 'Actions'].map(h => (
                        <th key={h} style={s.th}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInquiries.map(inq => (
                      <tr key={inq.id || inq._id}>
                        <td style={{ ...s.td, whiteSpace: 'nowrap', fontSize: '0.78rem', color: '#666' }}>
                          <div>{new Date(inq.createdAt || Date.now()).toLocaleDateString()}</div>
                          <div style={{ fontSize: '0.72rem', color: '#9e9e9e' }}>{new Date(inq.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                        </td>
                        <td style={{ ...s.td, fontWeight: 800, color: '#212121' }}>{inq.name}</td>
                        <td style={{ ...s.td, color: '#760CB0', fontWeight: 600 }}>{inq.org || '—'}</td>
                        <td style={s.td}>
                          <div style={{ fontWeight: 600 }}><a href={`mailto:${inq.email}`} style={{ color: '#760CB0', textDecoration: 'none' }}>{inq.email}</a></div>
                          {inq.phone && <div style={{ fontSize: '0.78rem', color: '#666' }}>📞 {inq.phone}</div>}
                        </td>
                        <td style={s.td}>
                          <span style={{ background: '#faf5ff', color: '#760CB0', fontWeight: 700, padding: '0.2rem 0.65rem', borderRadius: '999px', fontSize: '0.78rem' }}>
                            {inq.subject || 'General'}
                          </span>
                        </td>
                        <td style={{ ...s.td, maxWidth: '320px', lineHeight: 1.5, fontSize: '0.82rem' }}>
                          <div style={{ background: '#faf5ff', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(118,12,176,0.08)' }}>
                            {inq.message}
                          </div>
                        </td>
                        <td style={s.td}>
                          <button onClick={() => handleDeleteInquiry(inq.id || inq._id)} style={s.btn('#ef4444')}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* TEAM MEMBER MODAL */}
      {showTeamModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={closeTeamModal}>
          <div style={{ background: '#fff', borderRadius: '20px', width: '100%', maxWidth: '960px', maxHeight: '92vh', overflow: 'auto', padding: '2rem', boxShadow: '0 25px 70px rgba(0,0,0,0.35)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(118,12,176,0.1)', paddingBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#760CB0', margin: 0 }}>
                {editTeamMemberObj ? `Edit Team Member: ${editTeamMemberObj.name}` : 'Add New Team Member'}
              </h2>
              <button onClick={closeTeamModal} style={{ background: '#f5f5f5', color: '#666', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontWeight: 900 }}>✕</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              {/* Left Column: Form Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Profile Image Upload & Interactive Framing Adjuster */}
                <ImageAdjuster
                  image={teamForm.image}
                  imagePosition={teamForm.imagePosition || '50% 10%'}
                  imageZoom={teamForm.imageZoom || 1}
                  onChangePosition={(pos) => setTeamForm(f => ({ ...f, imagePosition: pos }))}
                  onChangeZoom={(zoom) => setTeamForm(f => ({ ...f, imageZoom: zoom }))}
                  onImageUpload={(e) => handleImageUpload(e, base64 => setTeamForm(f => ({ ...f, image: base64 })))}
                  onRemoveImage={() => setTeamForm(f => ({ ...f, image: '' }))}
                  label="📷 Profile Picture & Framing Adjustment"
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#760CB0', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Full Name *</label>
                    <input value={teamForm.name || ''} onChange={e => setTeamForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Dr. Ayesha Khan" style={s.input} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#760CB0', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Designation / Title *</label>
                    <input value={teamForm.role || ''} onChange={e => setTeamForm(f => ({ ...f, role: e.target.value }))} placeholder="e.g. Senior M&E Lead" style={s.input} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#760CB0', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Department / Specialty Subtitle</label>
                  <input value={teamForm.dept || ''} onChange={e => setTeamForm(f => ({ ...f, dept: e.target.value }))} placeholder="e.g. Research & Operations / Health & WASH (Optional)" style={s.input} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#760CB0', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Email Address</label>
                    <input value={teamForm.email || ''} onChange={e => setTeamForm(f => ({ ...f, email: e.target.value }))} placeholder="name@himatconsulting.com" style={s.input} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#760CB0', marginBottom: '0.25rem', textTransform: 'uppercase' }}>LinkedIn URL</label>
                    <input value={teamForm.linkedin || ''} onChange={e => setTeamForm(f => ({ ...f, linkedin: e.target.value }))} placeholder="https://linkedin.com/in/..." style={s.input} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#760CB0', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Education / Qualifications</label>
                  <input value={teamForm.education || ''} onChange={e => setTeamForm(f => ({ ...f, education: e.target.value }))} placeholder="e.g. PhD in Development Economics" style={s.input} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#760CB0', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Bio Description / Experience Summary</label>
                  <textarea value={teamForm.experience || ''} onChange={e => setTeamForm(f => ({ ...f, experience: e.target.value }))} rows={4} placeholder="Summary of professional achievements and experience..." style={{ ...s.input, resize: 'vertical' }} />
                </div>

                {/* Specialties Tag Input */}
                <div style={{ background: '#faf5ff', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(118,12,176,0.12)' }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                    Specialties & Expertise Tags
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <input value={specialtyInput} onChange={e => setSpecialtyInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddSpecialty() } }} placeholder="Add specialty tag..." style={s.input} />
                    <button type="button" onClick={handleAddSpecialty} style={s.btn('#760CB0')}>+ Add</button>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {(teamForm.specialties || []).map((sp, idx) => (
                      <span key={idx} style={{ background: '#fff', border: '1px solid rgba(118,12,176,0.2)', color: '#760CB0', fontSize: '0.78rem', padding: '0.2rem 0.6rem', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                        {sp}
                        <button type="button" onClick={() => handleRemoveSpecialty(idx)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 800 }}>✕</button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Live McKinsey Card Preview */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  📱 LIVE PUBLIC WEBSITE CARD PREVIEW
                </div>

                <div style={{ background: '#ffffff', borderRadius: '26px', border: '1.5px solid rgba(118,12,176,0.15)', padding: '2.5rem 1.75rem 2rem', boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', marginBottom: '1.25rem', boxShadow: '0 10px 30px rgba(118, 12, 176, 0.15)', border: '4px solid #ffffff', background: 'linear-gradient(135deg, #f5effc 0%, #ebe0f8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {teamForm.image ? (
                      <img
                        src={teamForm.image}
                        alt={teamForm.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: teamForm.imagePosition || '50% 10%',
                          transform: teamForm.imageZoom && teamForm.imageZoom !== 1 ? `scale(${teamForm.imageZoom})` : undefined,
                          transformOrigin: teamForm.imagePosition || '50% 10%',
                        }}
                        onError={e => e.currentTarget.style.display = 'none'}
                      />
                    ) : (
                      <span style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontWeight: 700, fontSize: '2.8rem', color: '#760CB0' }}>{teamForm.initials || (teamForm.name ? teamForm.name[0] : '?')}</span>
                    )}
                  </div>
                  <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontWeight: 700, fontSize: '1.8rem', color: '#111', margin: '0 0 0.35rem' }}>{teamForm.name || 'Full Name'}</h3>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: '#760CB0', fontWeight: 800, marginBottom: '1rem' }}>{teamForm.role || 'Designation / Title'}</div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#555', lineHeight: 1.6, margin: '0 0 1.5rem' }}>{teamForm.experience || 'Experience description will appear here.'}</p>
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#111', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✉</div>
                    <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#111', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>in</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: 'auto', paddingTop: '1rem' }}>
                  <button type="button" onClick={closeTeamModal} style={{ background: '#f5f5f5', color: '#666', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}>Cancel</button>
                  <button type="button" onClick={handleSaveTeamMember} style={s.btn('#760CB0')}>💾 Save & Publish Team Member</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE TEAM MODAL */}
      {deleteTeamId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '2rem', maxWidth: '420px', width: '100%', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ef4444', marginBottom: '0.5rem' }}>Delete Team Member?</h3>
            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1.5rem' }}>This team member profile will be removed from the active team roster.</p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button onClick={() => setDeleteTeamId(null)} style={{ background: '#f5f5f5', color: '#666', border: 'none', padding: '0.55rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}>Cancel</button>
              <button onClick={confirmDeleteTeam} style={s.btn('#ef4444')}>Yes, Remove Member</button>
            </div>
          </div>
        </div>
      )}

      {/* SENIOR CONSULTANT MODAL */}
      {showConsultantModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={closeConsultantModal}>
          <div style={{ background: '#fff', borderRadius: '20px', width: '100%', maxWidth: '960px', maxHeight: '92vh', overflow: 'auto', padding: '2rem', boxShadow: '0 25px 70px rgba(0,0,0,0.35)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(118,12,176,0.1)', paddingBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#760CB0', margin: 0 }}>
                {editConsultantObj ? `Edit Consultant: ${editConsultantObj.name}` : 'Add New Senior Consultant'}
              </h2>
              <button onClick={closeConsultantModal} style={{ background: '#f5f5f5', color: '#666', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontWeight: 900 }}>✕</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              {/* Left Column: Form Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Profile Picture Upload & Interactive Framing Adjuster */}
                <ImageAdjuster
                  image={consultantForm.image}
                  imagePosition={consultantForm.imagePosition || '50% 10%'}
                  imageZoom={consultantForm.imageZoom || 1}
                  onChangePosition={(pos) => setConsultantForm(f => ({ ...f, imagePosition: pos }))}
                  onChangeZoom={(zoom) => setConsultantForm(f => ({ ...f, imageZoom: zoom }))}
                  onImageUpload={(e) => handleImageUpload(e, base64 => setConsultantForm(f => ({ ...f, image: base64 })))}
                  onRemoveImage={() => setConsultantForm(f => ({ ...f, image: '' }))}
                  label="📷 Profile Picture & Framing Adjustment"
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#760CB0', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Full Name *</label>
                    <input value={consultantForm.name || ''} onChange={e => setConsultantForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Dr. Atiq ur Rehman" style={s.input} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#760CB0', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Designation / Title *</label>
                    <input value={consultantForm.role || ''} onChange={e => setConsultantForm(f => ({ ...f, role: e.target.value }))} placeholder="e.g. M&E Specialist" style={s.input} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#760CB0', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Organization / Affiliation</label>
                  <input value={consultantForm.org || ''} onChange={e => setConsultantForm(f => ({ ...f, org: e.target.value }))} placeholder="e.g. EDC (Pvt.) Limited / Former Director PIDE" style={s.input} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#760CB0', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Bio / Experience Description *</label>
                  <textarea value={consultantForm.experience || ''} onChange={e => setConsultantForm(f => ({ ...f, experience: e.target.value }))} rows={5} placeholder="Full professional profile description..." style={{ ...s.input, resize: 'vertical' }} />
                </div>

                {/* Specialties Tag Input */}
                <div style={{ background: '#faf5ff', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(118,12,176,0.12)' }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                    Core Expertise & Specialties Tags
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <input value={consultantSpecialtyInput} onChange={e => setConsultantSpecialtyInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddConsultantSpecialty() } }} placeholder="Add specialty tag..." style={s.input} />
                    <button type="button" onClick={handleAddConsultantSpecialty} style={s.btn('#760CB0')}>+ Add</button>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {(consultantForm.specialties || []).map((sp, idx) => (
                      <span key={idx} style={{ background: '#fff', border: '1px solid rgba(118,12,176,0.2)', color: '#760CB0', fontSize: '0.78rem', padding: '0.2rem 0.6rem', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                        {sp}
                        <button type="button" onClick={() => handleRemoveConsultantSpecialty(idx)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 800 }}>✕</button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Live Horizontal Website Card Preview */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  📱 LIVE PUBLIC WEBSITE CARD PREVIEW
                </div>

                <div style={{ background: '#ffffff', borderRadius: '22px', border: '1.5px solid rgba(118,12,176,0.15)', padding: '1.5rem', boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', boxShadow: '0 10px 30px rgba(118, 12, 176, 0.15)', border: '3px solid #ffffff', background: 'linear-gradient(135deg, #f5effc 0%, #ebe0f8 100%)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {consultantForm.image ? (
                        <img
                          src={consultantForm.image}
                          alt={consultantForm.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: consultantForm.imagePosition || '50% 10%',
                            transform: consultantForm.imageZoom && consultantForm.imageZoom !== 1 ? `scale(${consultantForm.imageZoom})` : undefined,
                            transformOrigin: consultantForm.imagePosition || '50% 10%',
                          }}
                          onError={e => e.currentTarget.style.display = 'none'}
                        />
                      ) : (
                        <span style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontWeight: 700, fontSize: '2rem', color: '#760CB0' }}>{consultantForm.initials || (consultantForm.name ? consultantForm.name[0] : '?')}</span>
                      )}
                    </div>
                    <div>
                      <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontWeight: 700, fontSize: '1.35rem', color: '#111', margin: '0 0 0.2rem' }}>{consultantForm.name || 'Full Name'}</h3>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', color: '#760CB0', fontWeight: 800 }}>{consultantForm.role || 'Designation / Title'}</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#555', fontWeight: 600 }}>{consultantForm.org || 'Organization'}</div>
                    </div>
                  </div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: '#444', lineHeight: 1.6, margin: 0, maxHeight: '120px', overflowY: 'auto' }}>{consultantForm.experience || 'Bio description preview...'}</p>
                  {consultantForm.specialties && consultantForm.specialties.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(118,12,176,0.08)' }}>
                      {consultantForm.specialties.map((sp, idx) => (
                        <span key={idx} style={{ fontSize: '0.72rem', fontWeight: 700, color: '#760CB0', background: '#faf5ff', padding: '0.2rem 0.5rem', borderRadius: '999px' }}>{sp}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: 'auto', paddingTop: '1rem' }}>
                  <button type="button" onClick={closeConsultantModal} disabled={isSavingConsultant} style={{ background: '#f5f5f5', color: '#666', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}>Cancel</button>
                  <button type="button" onClick={handleSaveConsultant} disabled={isSavingConsultant} style={{ ...s.btn('#760CB0'), opacity: isSavingConsultant ? 0.7 : 1, cursor: isSavingConsultant ? 'not-allowed' : 'pointer' }}>
                    {isSavingConsultant ? '⏳ Saving Consultant...' : '💾 Save & Publish Consultant'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE CONSULTANT MODAL */}
      {deleteConsultantId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '2rem', maxWidth: '420px', width: '100%', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ef4444', marginBottom: '0.5rem' }}>Delete Senior Consultant?</h3>
            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1.5rem' }}>This consultant profile will be removed from the public website.</p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button onClick={() => setDeleteConsultantId(null)} style={{ background: '#f5f5f5', color: '#666', border: 'none', padding: '0.55rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}>Cancel</button>
              <button onClick={confirmDeleteConsultant} style={s.btn('#ef4444')}>Yes, Remove Consultant</button>
            </div>
          </div>
        </div>
      )}

      {/* CERTIFICATE MODAL */}
      {showCertModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={closeCertModal}>
          <div style={{ background: '#fff', borderRadius: '20px', width: '100%', maxWidth: '960px', maxHeight: '92vh', overflow: 'auto', padding: '2rem', boxShadow: '0 25px 70px rgba(0,0,0,0.35)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(118,12,176,0.1)', paddingBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#760CB0', margin: 0 }}>
                {editCertObj ? `Edit Certificate: ${editCertObj.client}` : 'Add New Client Certificate / Letter'}
              </h2>
              <button onClick={closeCertModal} style={{ background: '#f5f5f5', color: '#666', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontWeight: 900 }}>✕</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.75rem' }}>
              {/* Form Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ background: '#faf5ff', padding: '1rem', borderRadius: '12px', border: '1.5px solid rgba(118,12,176,0.15)' }}>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                      📷 Client Primary Logo
                    </label>
                    <input type="file" accept="image/*" onChange={e => handleImageUpload(e, base64 => setCertForm(f => ({ ...f, logo: base64 })))} style={{ fontSize: '0.8125rem', marginBottom: '0.4rem' }} />
                    <input value={certForm.logo || ''} onChange={e => setCertForm(f => ({ ...f, logo: e.target.value }))} placeholder="./logos/client.png or image URL..." style={s.input} />
                  </div>
                  <div style={{ background: '#faf5ff', padding: '1rem', borderRadius: '12px', border: '1.5px solid rgba(118,12,176,0.15)' }}>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                      📷 Partner Secondary Logo (Optional)
                    </label>
                    <input type="file" accept="image/*" onChange={e => handleImageUpload(e, base64 => setCertForm(f => ({ ...f, secondaryLogo: base64 })))} style={{ fontSize: '0.8125rem', marginBottom: '0.4rem' }} />
                    <input value={certForm.secondaryLogo || ''} onChange={e => setCertForm(f => ({ ...f, secondaryLogo: e.target.value }))} placeholder="./logos/partner.png or image URL..." style={s.input} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#760CB0', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Client Name *</label>
                    <input value={certForm.client || ''} onChange={e => setCertForm(f => ({ ...f, client: e.target.value }))} placeholder="e.g. World Bank / GIZ" style={s.input} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#760CB0', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Category</label>
                    <select value={certForm.category || 'multilateral'} onChange={e => setCertForm(f => ({ ...f, category: e.target.value }))} style={s.input}>
                      <option value="multilateral">Multilateral (World Bank, GIZ, PC)</option>
                      <option value="akdn">Aga Khan Network & SJDA</option>
                      <option value="ingo">INGOs & Bilaterals (Concern, IRC, CBM)</option>
                      <option value="national">Social Protection & NGOs (PSPA, RSPN)</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#760CB0', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Verified Reference ID</label>
                    <input value={certForm.verifiedRef || ''} onChange={e => setCertForm(f => ({ ...f, verifiedRef: e.target.value }))} placeholder="e.g. WB-PAK-2024-CERT-01" style={s.input} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#760CB0', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Issue Date</label>
                    <input value={certForm.date || ''} onChange={e => setCertForm(f => ({ ...f, date: e.target.value }))} placeholder="e.g. November 2024" style={s.input} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#760CB0', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Assignment Title *</label>
                  <input value={certForm.title || ''} onChange={e => setCertForm(f => ({ ...f, title: e.target.value }))} placeholder="Title of assignment evaluation..." style={s.input} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#760CB0', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Scope of Assignment</label>
                  <textarea value={certForm.scope || ''} onChange={e => setCertForm(f => ({ ...f, scope: e.target.value }))} rows={2} style={{ ...s.input, resize: 'vertical' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#760CB0', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Official Commendation Citation</label>
                  <textarea value={certForm.citation || ''} onChange={e => setCertForm(f => ({ ...f, citation: e.target.value }))} rows={3} style={{ ...s.input, resize: 'vertical' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#760CB0', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Authorized Signatory</label>
                  <input value={certForm.signatory || ''} onChange={e => setCertForm(f => ({ ...f, signatory: e.target.value }))} placeholder="Name and official title of signatory..." style={s.input} />
                </div>

                {/* PDF File Upload Box */}
                <div style={{ background: '#faf5ff', padding: '1.1rem', borderRadius: '12px', border: '1.5px solid rgba(118,12,176,0.15)' }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                    📄 Completion Certificate PDF (Upload PDF File or Enter Path/URL)
                  </label>
                  <input type="file" accept="application/pdf" onChange={e => handleFileUpload(e, base64 => setCertForm(f => ({ ...f, downloadUrl: base64 })), 25)} style={{ fontSize: '0.8125rem', marginBottom: '0.5rem' }} />
                  <input value={certForm.downloadUrl || ''} onChange={e => setCertForm(f => ({ ...f, downloadUrl: e.target.value }))} placeholder="./certificates/cert.pdf or https://..." style={s.input} />
                  {certForm.downloadUrl && certForm.downloadUrl !== '#' && (
                    <div style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 700, marginTop: '0.35rem' }}>
                      ✓ PDF Attached {certForm.downloadUrl.startsWith('data:') ? '(Uploaded PDF File)' : ''}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Live Modal Preview */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  📱 LIVE MODAL VIEWER PREVIEW
                </div>

                <div style={{ background: '#fff', borderRadius: '18px', border: '2px solid rgba(118,12,176,0.18)', padding: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                  <div style={{ borderBottom: '2px solid #760CB0', paddingBottom: '1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#760CB0', textTransform: 'uppercase' }}>Record · {certForm.client}</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111' }}>{certForm.title || 'Assignment Title'}</div>
                    </div>
                    {certForm.logo && <img src={certForm.logo} alt="" style={{ height: '40px', maxWidth: '80px', objectFit: 'contain' }} onError={e => e.currentTarget.style.display = 'none'} />}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#555', marginBottom: '0.75rem' }}><strong>Ref:</strong> {certForm.verifiedRef || 'N/A'} • {certForm.date}</div>
                  <div style={{ fontStyle: 'italic', fontSize: '0.82rem', background: '#faf5ff', padding: '0.75rem', borderRadius: '8px', color: '#333' }}>"{certForm.citation || 'Commendation citation text...'}"</div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: 'auto', paddingTop: '1rem' }}>
                  <button type="button" onClick={closeCertModal} disabled={isSavingCert} style={{ background: '#f5f5f5', color: '#666', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}>Cancel</button>
                  <button type="button" onClick={handleSaveCert} disabled={isSavingCert} style={{ ...s.btn('#760CB0'), opacity: isSavingCert ? 0.7 : 1, cursor: isSavingCert ? 'not-allowed' : 'pointer' }}>
                    {isSavingCert ? '⏳ Publishing Certificate...' : '💾 Save & Publish Certificate'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE CERTIFICATE MODAL */}
      {deleteCertId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '2rem', maxWidth: '420px', width: '100%', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ef4444', marginBottom: '0.5rem' }}>Delete Certificate?</h3>
            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1.5rem' }}>This certificate record will be removed from public view.</p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button onClick={() => setDeleteCertId(null)} style={{ background: '#f5f5f5', color: '#666', border: 'none', padding: '0.55rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}>Cancel</button>
              <button onClick={confirmDeleteCert} style={s.btn('#ef4444')}>Yes, Delete Certificate</button>
            </div>
          </div>
        </div>
      )}

      {/* PROJECT MODAL */}
      {showProjectModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={closeProjectModal}>
          <div style={{ background: '#fff', borderRadius: '20px', width: '100%', maxWidth: '720px', maxHeight: '92vh', overflow: 'auto', padding: '2rem', boxShadow: '0 25px 70px rgba(0,0,0,0.35)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(118,12,176,0.1)', paddingBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#760CB0', margin: 0 }}>
                {editProjectObj ? `Edit Assignment #${projectForm.no}: ${projectForm.client}` : 'Add New Portfolio Assignment'}
              </h2>
              <button onClick={closeProjectModal} style={{ background: '#f5f5f5', color: '#666', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontWeight: 900 }}>✕</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', marginBottom: '0.3rem', textTransform: 'uppercase' }}># (Assignment Number) *</label>
                <input value={projectForm.no || ''} onChange={e => setProjectForm(f => ({ ...f, no: e.target.value }))} placeholder="e.g. 122" style={s.input} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Organization / Client *</label>
                <input value={projectForm.client || ''} onChange={e => setProjectForm(f => ({ ...f, client: e.target.value }))} placeholder="e.g. World Bank / UNICEF" style={s.input} />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Project Title *</label>
                <input value={projectForm.title || ''} onChange={e => setProjectForm(f => ({ ...f, title: e.target.value }))} placeholder="Full title of project assignment..." style={s.input} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Type *</label>
                <input value={projectForm.type || ''} onChange={e => setProjectForm(f => ({ ...f, type: e.target.value }))} placeholder="e.g. Impact Assessment" style={s.input} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Sector *</label>
                <input value={projectForm.sector || ''} onChange={e => setProjectForm(f => ({ ...f, sector: e.target.value }))} placeholder="e.g. Poverty Alleviation & Social Protection" style={s.input} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Year *</label>
                <input value={projectForm.year || ''} onChange={e => setProjectForm(f => ({ ...f, year: e.target.value }))} placeholder="e.g. 2026" style={s.input} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Status *</label>
                <select value={projectForm.status || 'Ongoing'} onChange={e => setProjectForm(f => ({ ...f, status: e.target.value }))} style={s.input}>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Assignment Overview & Scope</label>
                <textarea value={projectForm.description || ''} onChange={e => setProjectForm(f => ({ ...f, description: e.target.value }))} rows={3} placeholder="Scope, methodologies, and key objectives of assignment..." style={{ ...s.input, resize: 'vertical' }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem', borderTop: '1px solid rgba(118,12,176,0.1)', paddingTop: '1rem' }}>
              <button type="button" onClick={closeProjectModal} style={{ background: '#f5f5f5', color: '#666', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}>Cancel</button>
              <button type="button" onClick={handleSaveProject} style={s.btn('#760CB0')}>💾 Save & Append Project #{projectForm.no}</button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE PROJECT MODAL */}
      {deleteProjectId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '2rem', maxWidth: '420px', width: '100%', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ef4444', marginBottom: '0.5rem' }}>Delete Project?</h3>
            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1.5rem' }}>Project assignment #{deleteProjectId} will be removed.</p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button onClick={() => setDeleteProjectId(null)} style={{ background: '#f5f5f5', color: '#666', border: 'none', padding: '0.55rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}>Cancel</button>
              <button onClick={confirmDeleteProject} style={s.btn('#ef4444')}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* REPORT MODAL */}
      {showReportModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={closeReportModal}>
          <div style={{ background: '#fff', borderRadius: '20px', width: '100%', maxWidth: '920px', maxHeight: '92vh', overflow: 'auto', padding: '2rem', boxShadow: '0 25px 70px rgba(0,0,0,0.35)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(118,12,176,0.1)', paddingBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#760CB0', margin: 0 }}>
                {editReportObj ? `Edit Published Report: ${editReportObj.title}` : 'Add New Published Report & Research Dossier'}
              </h2>
              <button onClick={closeReportModal} style={{ background: '#f5f5f5', color: '#666', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontWeight: 900 }}>✕</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Client / Partner Organization *</label>
                <input value={reportForm.client || ''} onChange={e => setReportForm(f => ({ ...f, client: e.target.value }))} placeholder="e.g. World Bank / UNICEF / Asian Development Bank / RSPN" style={s.input} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Client Category / Classification</label>
                <input value={reportForm.clientCategory || ''} onChange={e => setReportForm(f => ({ ...f, clientCategory: e.target.value }))} placeholder="e.g. UN Agency / Multilateral Bank / Government Ministry / INGO" style={s.input} />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Report Assignment Title *</label>
                <input value={reportForm.title || ''} onChange={e => setReportForm(f => ({ ...f, title: e.target.value }))} placeholder="Full title of evaluation, diagnostic, or research publication assignment..." style={s.input} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Sector *</label>
                <select value={reportForm.sector || 'Poverty Alleviation & Social Protection'} onChange={e => setReportForm(f => ({ ...f, sector: e.target.value }))} style={s.input}>
                  <option value="Poverty Alleviation & Social Protection">Poverty Alleviation & Social Protection</option>
                  <option value="TVET & Skills">TVET & Skills Development</option>
                  <option value="Enterprise & Economic Growth">Enterprise & Economic Growth</option>
                  <option value="Education">Education & Human Capital</option>
                  <option value="Climate & Agriculture">Climate Resilience & Agriculture</option>
                  <option value="Public Health & Nutrition">Public Health & Nutrition</option>
                  <option value="Humanitarian & Disaster Recovery">Humanitarian & Disaster Recovery</option>
                  <option value="Community Infrastructure & Governance">Community Infrastructure & Governance</option>
                  <option value="Institutional Governance & Reform">Institutional Governance & Reform</option>
                  <option value="Gender & Social Inclusion">Gender & Social Inclusion</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Publication Year</label>
                <input value={reportForm.year || ''} onChange={e => setReportForm(f => ({ ...f, year: e.target.value }))} placeholder="e.g. 2026" style={s.input} />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Geographic Coverage / Region</label>
                <input value={reportForm.coverage || ''} onChange={e => setReportForm(f => ({ ...f, coverage: e.target.value }))} placeholder="e.g. Sindh, Pakistan / South Asia / 8 Districts / National" style={s.input} />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Executive Summary / Overview</label>
                <textarea value={reportForm.summary || ''} onChange={e => setReportForm(f => ({ ...f, summary: e.target.value }))} rows={3} placeholder="Comprehensive executive summary or overview of the assignment and research findings..." style={{ ...s.input, resize: 'vertical' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Report Type</label>
                <select value={reportForm.type || 'Impact Assessment Study'} onChange={e => setReportForm(f => ({ ...f, type: e.target.value }))} style={s.input}>
                  <option value="Impact Assessment Study">Impact Assessment Study</option>
                  <option value="Final Evaluation Report">Final Evaluation Report</option>
                  <option value="Midterm Review & Evaluation">Midterm Review & Evaluation</option>
                  <option value="Baseline Study & Diagnostic">Baseline Study & Diagnostic</option>
                  <option value="Labour Market Survey">Labour Market Survey</option>
                  <option value="Needs Assessment & Situation Analysis">Needs Assessment & Situation Analysis</option>
                  <option value="Policy Brief & Thematic Research">Policy Brief & Thematic Research</option>
                  <option value="Value for Money (VfM) Analysis">Value for Money (VfM) Analysis</option>
                  <option value="Third-Party Monitoring Report">Third-Party Monitoring Report</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Number of Pages</label>
                <input value={reportForm.pages || ''} onChange={e => setReportForm(f => ({ ...f, pages: e.target.value }))} placeholder="e.g. 78 pages" style={s.input} />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Research Methodology & Approach</label>
                <textarea value={reportForm.methodology || ''} onChange={e => setReportForm(f => ({ ...f, methodology: e.target.value }))} rows={2} placeholder="e.g. Mixed-methods quasi-experimental evaluation utilizing Difference-in-Differences (DiD), 1,400 household surveys, and 24 Key Informant Interviews." style={{ ...s.input, resize: 'vertical' }} />
              </div>

              {/* Key Findings Tag Builder */}
              <div style={{ gridColumn: 'span 2', background: '#faf5ff', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(118,12,176,0.15)' }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                  💡 Key Research Findings & Takeaways
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.6rem' }}>
                  <input
                    value={keyFindingInput}
                    onChange={e => setKeyFindingInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddKeyFinding() } }}
                    placeholder="Enter a key finding bullet point..."
                    style={s.input}
                  />
                  <button type="button" onClick={handleAddKeyFinding} style={s.btn('#760CB0')}>+ Add Finding</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {(reportForm.keyFindings || []).filter(Boolean).map((kf, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ffffff', padding: '0.45rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(118,12,176,0.12)', fontSize: '0.82rem', color: '#333' }}>
                      <span>• {kf}</span>
                      <button type="button" onClick={() => handleRemoveKeyFinding(idx)} style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 800, cursor: 'pointer', padding: '0 0.4rem' }}>✕</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Document Upload Box: Supports PDF and Word Document (.pdf, .doc, .docx) */}
            <div style={{ marginTop: '1.25rem', background: '#faf5ff', padding: '1.25rem', borderRadius: '14px', border: '1.5px solid rgba(118,12,176,0.18)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', textTransform: 'uppercase' }}>
                  📎 Document Upload (PDF or Word Document · .pdf, .doc, .docx)
                </label>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6b21a8', background: '#f3e8ff', padding: '0.15rem 0.55rem', borderRadius: '4px' }}>
                  Supports .pdf, .docx, .doc
                </span>
              </div>

              <input
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={(e) => {
                  const file = e.target.files[0]
                  if (!file) return
                  const isWordFile = file.name.endsWith('.doc') || file.name.endsWith('.docx') || file.type.includes('word')
                  handleFileUpload(e, (base64) => {
                    setReportForm(f => ({
                      ...f,
                      pdfUrl: base64,
                      docName: file.name,
                      docType: isWordFile ? 'word' : 'pdf',
                    }))
                  }, 40)
                }}
                style={{ fontSize: '0.8125rem', marginBottom: '0.6rem' }}
              />

              <input
                value={reportForm.pdfUrl || ''}
                onChange={e => {
                  const val = e.target.value
                  const isWord = val.includes('.doc') || val.includes('.docx')
                  setReportForm(f => ({ ...f, pdfUrl: val, docType: isWord ? 'word' : 'pdf' }))
                }}
                placeholder="./reports/sample.pdf, ./docs/report.docx, or direct document URL..."
                style={s.input}
              />

              {reportForm.pdfUrl && reportForm.pdfUrl !== '#' && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.65rem', background: '#f0fdf4', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>
                      {reportForm.docType === 'word' || reportForm.pdfUrl.includes('.doc') ? '📝' : '📄'}
                    </span>
                    <span style={{ fontSize: '0.8125rem', color: '#16a34a', fontWeight: 800 }}>
                      ✓ {reportForm.docType === 'word' || reportForm.pdfUrl.includes('.doc') ? 'Word Document Attached' : 'PDF Document Attached'} {reportForm.docName ? `(${reportForm.docName})` : ''}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    {reportForm.pdfUrl.startsWith('data:application/pdf') && (
                      <button
                        type="button"
                        onClick={() => {
                          const w = window.open()
                          w.document.write(`<iframe src="${reportForm.pdfUrl}" style="width:100%;height:100vh;border:none;"></iframe>`)
                        }}
                        style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '0.3rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer' }}
                      >
                        👁️ Preview PDF
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setReportForm(f => ({ ...f, pdfUrl: '', docName: '', docType: '' }))}
                      style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '0.3rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer' }}
                    >
                      🗑️ Remove Document
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cover Image Upload Box (Optional) */}
            <div style={{ marginTop: '1rem', background: '#faf5ff', padding: '1.15rem', borderRadius: '14px', border: '1.5px solid rgba(118,12,176,0.18)' }}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                🖼️ Report Cover Image / Thumbnail (Optional)
              </label>
              <input type="file" accept="image/*" onChange={e => handleImageUpload(e, base64 => setReportForm(f => ({ ...f, coverImage: base64 })))} style={{ fontSize: '0.8125rem', marginBottom: '0.5rem' }} />
              <input value={reportForm.coverImage || ''} onChange={e => setReportForm(f => ({ ...f, coverImage: e.target.value }))} placeholder="./reports/cover.jpg or image URL..." style={s.input} />
              {reportForm.coverImage && (
                <div style={{ marginTop: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(118,12,176,0.2)', background: '#fff' }}>
                    <img src={reportForm.coverImage} alt="Cover Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.currentTarget.style.display = 'none'} />
                  </div>
                  <button type="button" onClick={() => setReportForm(f => ({ ...f, coverImage: '' }))} style={{ background: '#fee2e2', color: '#ef4444', border: '1px solid #fca5a5', padding: '0.3rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer' }}>🗑️ Remove Cover Image</button>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem', borderTop: '1px solid rgba(118,12,176,0.1)', paddingTop: '1rem' }}>
              <button type="button" onClick={closeReportModal} disabled={isSavingReport} style={{ background: '#f5f5f5', color: '#666', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}>Cancel</button>
              <button type="button" onClick={handleSaveReport} disabled={isSavingReport} style={{ ...s.btn('#760CB0'), opacity: isSavingReport ? 0.7 : 1, cursor: isSavingReport ? 'not-allowed' : 'pointer' }}>
                {isSavingReport ? '⏳ Publishing Report...' : '💾 Save & Publish Report'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE REPORT MODAL */}
      {deleteReportId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '2rem', maxWidth: '420px', width: '100%', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ef4444', marginBottom: '0.5rem' }}>Delete Report?</h3>
            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1.5rem' }}>Report item will be removed.</p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button onClick={() => setDeleteReportId(null)} style={{ background: '#f5f5f5', color: '#666', border: 'none', padding: '0.55rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}>Cancel</button>
              <button onClick={confirmDeleteReport} style={s.btn('#ef4444')}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* COMPETENCY MODAL */}
      {showCompetencyModal && competencyForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={closeCompetencyModal}>
          <div style={{ background: '#fff', borderRadius: '20px', width: '100%', maxWidth: '920px', maxHeight: '92vh', overflow: 'auto', padding: '2rem', boxShadow: '0 25px 70px rgba(0,0,0,0.35)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(118,12,176,0.1)', paddingBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#760CB0', margin: 0 }}>Edit Core Competency: {competencyForm.category}</h2>
              <button onClick={closeCompetencyModal} style={{ background: '#f5f5f5', color: '#666', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontWeight: 900 }}>✕</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#760CB0', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Title *</label>
                <input value={competencyForm.title || ''} onChange={e => setCompetencyForm(f => ({ ...f, title: e.target.value }))} style={s.input} />
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#760CB0', marginTop: '1rem', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Description</label>
                <textarea value={competencyForm.description || ''} onChange={e => setCompetencyForm(f => ({ ...f, description: e.target.value }))} rows={4} style={{ ...s.input, resize: 'vertical' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: '#faf5ff', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(118,12,176,0.15)' }}>
                  <label style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#760CB0', display: 'block', marginBottom: '0.5rem' }}>16:9 Competency Image</label>
                  <input type="file" accept="image/*" onChange={e => handleImageUpload(e, base64 => setCompetencyForm(f => ({ ...f, image: base64 })))} style={{ fontSize: '0.8125rem', marginBottom: '0.5rem' }} />
                  <input value={competencyForm.image || ''} onChange={e => setCompetencyForm(f => ({ ...f, image: e.target.value }))} placeholder="./images/...jpg" style={s.input} />
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: 'auto' }}>
                  <button type="button" onClick={closeCompetencyModal} style={{ background: '#f5f5f5', color: '#666', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}>Cancel</button>
                  <button type="button" onClick={handleSaveCompetency} style={s.btn('#760CB0')}>💾 Save Competency</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
