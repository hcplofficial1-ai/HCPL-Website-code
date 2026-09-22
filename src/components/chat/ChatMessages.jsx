import React, { useEffect, useRef } from 'react'
import { Bot, User } from './Icons'

// Safe lightweight markdown parser for chat bubbles
function formatMarkdown(text = '') {
  if (!text) return ''

  // Split into paragraphs / lines
  const lines = text.split('\n')
  const elements = []

  let inList = false
  let listItems = []

  lines.forEach((line, lineIdx) => {
    const trimmed = line.trim()

    // Unordered bullet item
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      inList = true
      listItems.push(trimmed.substring(2))
      return
    }

    // Flush any pending list
    if (inList && (!trimmed.startsWith('- ') && !trimmed.startsWith('* '))) {
      elements.push(
        <ul key={`ul-${lineIdx}`} className="hcpl-markdown-list">
          {listItems.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: renderInline(item) }} />
          ))}
        </ul>
      )
      inList = false
      listItems = []
    }

    if (!trimmed) {
      elements.push(<div key={`br-${lineIdx}`} style={{ height: '6px' }} />)
      return
    }

    elements.push(
      <p key={`p-${lineIdx}`} dangerouslySetInnerHTML={{ __html: renderInline(trimmed) }} />
    )
  })

  if (inList && listItems.length > 0) {
    elements.push(
      <ul key="ul-end" className="hcpl-markdown-list">
        {listItems.map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: renderInline(item) }} />
        ))}
      </ul>
    )
  }

  return elements
}

// Basic inline markdown (bold, italic, links, code)
function renderInline(str = '') {
  let res = str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Bold
  res = res.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  // Italic
  res = res.replace(/\*(.*?)\*/g, '<em>$1</em>')
  // Code
  res = res.replace(/`(.*?)`/g, '<code style="background:rgba(0,0,0,0.06);padding:2px 4px;border-radius:4px;font-size:11px;font-family:monospace;">$1</code>')
  // Links
  res = res.replace(
    /\[(.*?)\]\((.*?)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  )

  return res
}

export default function ChatMessages({ messages = [], isTyping = false }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  return (
    <div className="hcpl-chat-messages">
      {messages.map((msg, index) => {
        const isUser = msg.role === 'user'

        return (
          <div
            key={index}
            className={`hcpl-message-row ${isUser ? 'hcpl-msg-user' : 'hcpl-msg-bot'}`}
          >
            {/* Avatar */}
            <div className={`hcpl-msg-avatar ${isUser ? 'user' : 'bot'}`}>
              {isUser ? <User size={15} /> : <Bot size={15} />}
            </div>

            {/* Bubble */}
            <div className="hcpl-msg-bubble">
              {isUser ? (
                <div style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</div>
              ) : (
                <div className="hcpl-markdown-content">{formatMarkdown(msg.content)}</div>
              )}
              <div className="hcpl-msg-time">
                {msg.timestamp ||
                  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        )
      })}

      {/* Typing indicator */}
      {isTyping && (
        <div className="hcpl-message-row hcpl-msg-bot">
          <div className="hcpl-msg-avatar bot">
            <Bot size={15} />
          </div>
          <div className="hcpl-typing-indicator">
            <span className="hcpl-typing-dot" />
            <span className="hcpl-typing-dot" />
            <span className="hcpl-typing-dot" />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}
