import React from 'react'
import { FileText, MessageSquare, Briefcase, PhoneCall, Sparkles } from './Icons'

export default function QuickActions({ actions = [], onSelectAction, isBusy = false }) {
  if (!actions || actions.length === 0) return null

  const getIcon = (label = '') => {
    const l = label.toLowerCase()
    if (l.includes('proposal') || l.includes('rfp')) return <FileText size={12} />
    if (l.includes('whatsapp')) return <MessageSquare size={12} />
    if (l.includes('service') || l.includes('m&e') || l.includes('survey')) return <Briefcase size={12} />
    if (l.includes('contact') || l.includes('call')) return <PhoneCall size={12} />
    return <Sparkles size={12} />
  }

  return (
    <div className="hcpl-quick-actions-bar">
      {actions.map((act, idx) => {
        const label = typeof act === 'string' ? act : act.label
        return (
          <button
            key={idx}
            type="button"
            disabled={isBusy}
            onClick={() => onSelectAction(act)}
            className="hcpl-action-chip"
          >
            {getIcon(label)}
            <span>{label}</span>
          </button>
        )
      })}
    </div>
  )
}
