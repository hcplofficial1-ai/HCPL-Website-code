import React, { useState } from 'react'
import { X, Send, CheckCircle2, AlertCircle, Loader2 } from './Icons'
import { submitProposalLead } from '../../services/chatService'

export default function ProposalModal({ isOpen, onClose, onSuccessNotification }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    phone: '',
    serviceRequired: 'Monitoring & Evaluation (M&E) & TPM',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  const services = [
    'Monitoring & Evaluation (M&E) & TPM',
    'Large-Scale Surveys & Digital Data Collection',
    'Programme Design & Project Cycle Management (PCM)',
    'Institutional Assessments & Capacity Building',
    'Policy Research & Strategic Advisory',
    'Office Automation & ERP / MIS Solutions',
    'General Development Consulting'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Please provide your name and email address.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      await submitProposalLead(formData)
      setSubmitted(true)
      if (onSuccessNotification) {
        onSuccessNotification(
          `Thank you, **${formData.name}**! Your request for proposal has been dispatched to the HCPL technical directorate. A senior consultant will review your requirements and reach out to you within 1 business day.`
        )
      }
      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          name: '',
          email: '',
          organization: '',
          phone: '',
          serviceRequired: 'Monitoring & Evaluation (M&E) & TPM',
          message: ''
        })
        onClose()
      }, 2000)
    } catch (err) {
      setError(err.message || 'Failed to submit request. Please try again or email info@himatconsulting.com.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="hcpl-modal-overlay">
      <div className="hcpl-modal-card">
        {/* Header */}
        <div className="hcpl-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4ade80' }} />
            <h4>Request a Proposal / Consultation</h4>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer', display: 'flex', padding: '4px', borderRadius: '6px' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="hcpl-modal-body">
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '30px 10px' }}>
              <div style={{ color: '#22c55e', marginBottom: '12px' }}>
                <CheckCircle2 size={44} />
              </div>
              <h4 style={{ color: '#1a202c', fontSize: '15px', fontWeight: 700, margin: '0 0 6px 0' }}>
                Proposal Request Submitted!
              </h4>
              <p style={{ color: '#4a5568', fontSize: '12px', margin: 0 }}>
                Our advisory team will review your scope and contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="hcpl-form-alert-error">
                  <AlertCircle size={15} />
                  <span>{error}</span>
                </div>
              )}

              <div className="hcpl-form-group">
                <label className="hcpl-form-label">
                  Full Name <span className="req">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Sarah Ahmed"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="hcpl-form-input"
                />
              </div>

              <div className="hcpl-form-row">
                <div className="hcpl-form-group">
                  <label className="hcpl-form-label">
                    Email Address <span className="req">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@agency.org"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="hcpl-form-input"
                  />
                </div>
                <div className="hcpl-form-group">
                  <label className="hcpl-form-label">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="+92 300 1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="hcpl-form-input"
                  />
                </div>
              </div>

              <div className="hcpl-form-group">
                <label className="hcpl-form-label">Organization / Donor / Entity</label>
                <input
                  type="text"
                  placeholder="e.g. INGO, Donor Agency, Corporate, Govt"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="hcpl-form-input"
                />
              </div>

              <div className="hcpl-form-group">
                <label className="hcpl-form-label">Primary Service Required</label>
                <select
                  value={formData.serviceRequired}
                  onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                  className="hcpl-form-select"
                >
                  {services.map((s, idx) => (
                    <option key={idx} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="hcpl-form-group">
                <label className="hcpl-form-label">Brief Scope / Objectives</label>
                <textarea
                  rows={3}
                  placeholder="Thematic areas, geographical scope, timeline, target outputs..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="hcpl-form-textarea"
                />
              </div>

              <div className="hcpl-modal-footer">
                <button
                  type="button"
                  onClick={onClose}
                  className="hcpl-btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="hcpl-btn-primary"
                >
                  {loading ? (
                    <>
                      <Loader2 size={14} />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send size={13} />
                      <span>Submit Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
