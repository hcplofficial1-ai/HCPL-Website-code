import React, { useState, useRef, useEffect } from 'react'
import { Send } from './Icons'

export default function ChatInput({ onSendMessage, isBusy = false }) {
  const [text, setText] = useState('')
  const textareaRef = useRef(null)

  // Auto-resize textarea up to max 90px
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 90)}px`
    }
  }, [text])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    const trimmed = text.trim()
    if (!trimmed || isBusy) return
    onSendMessage(trimmed)
    setText('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  return (
    <div className="hcpl-chat-input-area">
      <div className="hcpl-input-box">
        <textarea
          ref={textareaRef}
          rows={1}
          disabled={isBusy}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask HCPL AI about evaluations, surveys, proposals..."
          className="hcpl-textarea"
        />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!text.trim() || isBusy}
          aria-label="Send message"
          className="hcpl-send-btn"
        >
          <Send size={15} />
        </button>
      </div>
      <div className="hcpl-input-footer">
        <span>Press Enter ↵ to send</span>
        <span>HCPL AI Advisory</span>
      </div>
    </div>
  )
}
