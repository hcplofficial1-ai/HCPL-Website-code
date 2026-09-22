import React, { useState, useEffect } from 'react'
import { MessageSquare, X, Minimize2, RefreshCw, Bot } from './Icons'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'
import QuickActions from './QuickActions'
import ProposalModal from './ProposalModal'
import { CHAT_CONFIG } from './chatConfig'
import {
  sendChatMessage,
  loadStoredSession,
  saveStoredSession,
  clearStoredSession
} from '../../services/chatService'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [isProposalOpen, setIsProposalOpen] = useState(false)
  const [hasUnread, setHasUnread] = useState(false)
  const [quickActions, setQuickActions] = useState(CHAT_CONFIG.initialQuickActions)

  const [messages, setMessages] = useState(() => {
    const saved = loadStoredSession()
    if (saved && saved.length > 0) {
      return saved
    }
    return [
      {
        role: 'assistant',
        content: CHAT_CONFIG.welcomeMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]
  })

  // Persist session changes
  useEffect(() => {
    saveStoredSession(messages)
  }, [messages])

  // Clear unread when opened
  const handleToggle = () => {
    if (!isOpen) {
      setHasUnread(false)
    }
    setIsOpen((prev) => !prev)
  }

  // Reset chat session
  const handleReset = () => {
    clearStoredSession()
    const initial = [
      {
        role: 'assistant',
        content: CHAT_CONFIG.welcomeMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]
    setMessages(initial)
    setQuickActions(CHAT_CONFIG.initialQuickActions)
  }

  // Sending a chat message
  const handleSendMessage = async (text) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const userMsg = { role: 'user', content: text, timestamp: timeStr }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setIsTyping(true)

    try {
      const response = await sendChatMessage(updated)
      const botMsg = {
        role: 'assistant',
        content: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages((prev) => [...prev, botMsg])

      if (response.quickActions && response.quickActions.length > 0) {
        setQuickActions(response.quickActions)
      }

      if (!isOpen) {
        setHasUnread(true)
      }
    } catch (err) {
      console.error('Chat error:', err)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'I am currently experiencing network latency. You can contact our advisory team directly at **info@himatconsulting.com** or via WhatsApp at **+92 343 4484598**.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])
    } finally {
      setIsTyping(false)
    }
  }

  // Quick Action Handler
  const handleSelectAction = (act) => {
    const label = typeof act === 'string' ? act : act.label
    const actionType = typeof act === 'object' ? act.action : null
    const l = label.toLowerCase()

    // 1. Open Proposal Modal
    if (actionType === 'open_proposal_modal' || l.includes('proposal') || l.includes('rfp')) {
      setIsProposalOpen(true)
      return
    }

    // 2. Open WhatsApp
    if (actionType === 'open_whatsapp' || l.includes('whatsapp')) {
      const phone = CHAT_CONFIG.contact.whatsappNumber || '923434484598'
      const text = encodeURIComponent('Hello HCPL, I would like to inquire about your consulting services.')
      window.open(`https://wa.me/${phone}?text=${text}`, '_blank', 'noopener,noreferrer')
      return
    }

    // 3. Text prompt action
    const promptText = typeof act === 'object' && act.prompt ? act.prompt : label
    handleSendMessage(promptText)
  }

  const handleProposalSuccess = (notificationText) => {
    const botMsg = {
      role: 'assistant',
      content: notificationText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages((prev) => [...prev, botMsg])
  }

  return (
    <>
      {/* Floating Action Button */}
      <div className="hcpl-chat-fab-wrap">
        {!isOpen && <div className="hcpl-chat-fab-tooltip">Chat with HCPL AI</div>}
        <button
          type="button"
          onClick={handleToggle}
          aria-label={isOpen ? 'Close chat popup' : 'Open chat popup'}
          className="hcpl-chat-fab"
        >
          {isOpen ? <X size={22} /> : <MessageSquare size={24} />}
          {hasUnread && !isOpen && <span className="hcpl-chat-fab-badge" />}
        </button>
      </div>

      {/* Floating Chat Window */}
      {isOpen && (
        <aside className="hcpl-chat-window" aria-label="HCPL AI Chat Assistant">
          {/* Header */}
          <div className="hcpl-chat-header">
            <div className="hcpl-chat-header-info">
              <div className="hcpl-chat-avatar">
                <Bot size={20} />
                <span className="hcpl-chat-avatar-status" />
              </div>
              <div className="hcpl-chat-title-group">
                <h3>{CHAT_CONFIG.assistantName}</h3>
                <p>
                  <span className="hcpl-live-dot" />
                  Online • Advisory Assistant
                </p>
              </div>
            </div>

            <div className="hcpl-chat-header-actions">
              <button
                type="button"
                onClick={handleReset}
                title="Restart conversation"
                aria-label="Restart conversation"
                className="hcpl-header-btn"
              >
                <RefreshCw size={15} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Minimize chat"
                aria-label="Minimize chat"
                className="hcpl-header-btn"
              >
                <Minimize2 size={16} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                aria-label="Close chat"
                className="hcpl-header-btn"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <ChatMessages messages={messages} isTyping={isTyping} />

          {/* Quick Actions Carousel */}
          <QuickActions
            actions={quickActions}
            onSelectAction={handleSelectAction}
            isBusy={isTyping}
          />

          {/* Input Area */}
          <ChatInput onSendMessage={handleSendMessage} isBusy={isTyping} />

          {/* Proposal / RFP Modal Overlay */}
          <ProposalModal
            isOpen={isProposalOpen}
            onClose={() => setIsProposalOpen(false)}
            onSuccessNotification={handleProposalSuccess}
          />
        </aside>
      )}
    </>
  )
}
