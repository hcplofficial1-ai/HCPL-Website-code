import { useState, useRef, useEffect, useCallback } from 'react'

/**
 * ImageAdjuster
 * Interactive Profile Picture Adjustment Tool (Drag-to-Pan, Zoom, Fine Position Sliders, & Presets)
 */
export default function ImageAdjuster({
  image,
  imagePosition = '50% 10%',
  imageZoom = 1,
  onChangePosition,
  onChangeZoom,
  onImageUpload,
  onRemoveImage,
  label = '📷 Profile Picture & Framing Adjustment',
}) {
  // Parse position string (e.g. "50% 10%" or "center 12%")
  const parsePosition = (posStr) => {
    if (!posStr) return { x: 50, y: 10 }
    const parts = posStr.trim().split(/\s+/)
    let x = 50
    let y = 10

    if (parts.length >= 1) {
      if (parts[0] === 'left') x = 0
      else if (parts[0] === 'right') x = 100
      else if (parts[0] === 'center') x = 50
      else {
        const val = parseFloat(parts[0])
        if (!isNaN(val)) x = val
      }
    }
    if (parts.length >= 2) {
      if (parts[1] === 'top') y = 0
      else if (parts[1] === 'bottom') y = 100
      else if (parts[1] === 'center') y = 50
      else {
        const val = parseFloat(parts[1])
        if (!isNaN(val)) y = val
      }
    }
    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) }
  }

  const { x: posX, y: posY } = parsePosition(imagePosition)
  const currentZoom = typeof imageZoom === 'number' && imageZoom > 0 ? imageZoom : 1

  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef({ startMouseX: 0, startMouseY: 0, startPosX: posX, startPosY: posY })
  const previewRef = useRef(null)

  const handleMouseDown = (e) => {
    if (!image) return
    setIsDragging(true)
    dragStartRef.current = {
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      startPosX: posX,
      startPosY: posY,
    }
    e.preventDefault()
  }

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !previewRef.current) return
    const rect = previewRef.current.getBoundingClientRect()
    const deltaX = ((e.clientX - dragStartRef.current.startMouseX) / rect.width) * 100
    const deltaY = ((e.clientY - dragStartRef.current.startMouseY) / rect.height) * 100

    // Reverse delta so dragging moves the image focal position naturally
    const newX = Math.round(Math.max(0, Math.min(100, dragStartRef.current.startPosX - deltaX)))
    const newY = Math.round(Math.max(0, Math.min(100, dragStartRef.current.startPosY - deltaY)))

    onChangePosition(`${newX}% ${newY}%`)
  }, [isDragging, onChangePosition])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const handlePreset = (x, y, zoom) => {
    onChangePosition(`${x}% ${y}%`)
    if (typeof zoom === 'number') onChangeZoom(zoom)
  }

  return (
    <div
      style={{
        background: '#faf5ff',
        padding: '1.25rem',
        borderRadius: '16px',
        border: '1.5px solid rgba(118,12,176,0.18)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {/* Header Label */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <label
          style={{
            fontSize: '0.8125rem',
            fontWeight: 800,
            color: '#760CB0',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            margin: 0,
          }}
        >
          {label}
        </label>
        {image && onRemoveImage && (
          <button
            type="button"
            onClick={onRemoveImage}
            style={{
              background: '#fee2e2',
              color: '#ef4444',
              border: '1px solid #fca5a5',
              padding: '0.2rem 0.55rem',
              borderRadius: '6px',
              fontSize: '0.72rem',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            ✕ Remove Image
          </button>
        )}
      </div>

      {/* File Upload Input */}
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={onImageUpload}
          style={{ fontSize: '0.8125rem', width: '100%', marginBottom: '0.4rem' }}
        />
      </div>

      {/* Interactive Frame & Alignment Workspace */}
      {image ? (
        <div
          style={{
            background: '#ffffff',
            borderRadius: '14px',
            border: '1px solid rgba(118,12,176,0.12)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Interactive Circular Viewport */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
              <div
                ref={previewRef}
                onMouseDown={handleMouseDown}
                title="Click and drag to position the face inside the circle"
                style={{
                  width: '130px',
                  height: '130px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(118, 12, 176, 0.2)',
                  border: '3.5px solid #760CB0',
                  background: 'linear-gradient(135deg, #f5effc 0%, #ebe0f8 100%)',
                  cursor: isDragging ? 'grabbing' : 'grab',
                  position: 'relative',
                  userSelect: 'none',
                  touchAction: 'none',
                }}
              >
                <img
                  src={image}
                  alt="Avatar Framing Preview"
                  draggable={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: `${posX}% ${posY}%`,
                    transform: `scale(${currentZoom})`,
                    transformOrigin: `${posX}% ${posY}%`,
                    pointerEvents: 'none',
                    display: 'block',
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />

                {/* Subtle Crosshair Guide Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    border: '1px dashed rgba(118,12,176,0.25)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                  }}
                />
              </div>
              <span style={{ fontSize: '0.72rem', color: '#760CB0', fontWeight: 700 }}>
                ✋ Drag photo to pan
              </span>
            </div>

            {/* Quick Alignment Presets */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '180px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#555', textTransform: 'uppercase' }}>
                Quick Focal Presets:
              </div>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => handlePreset(50, 10, 1.15)}
                  style={{
                    background: posY <= 20 ? '#760CB0' : '#faf5ff',
                    color: posY <= 20 ? '#ffffff' : '#760CB0',
                    border: '1px solid rgba(118,12,176,0.2)',
                    padding: '0.35rem 0.65rem',
                    borderRadius: '7px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  👤 Focus Face (Top)
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset(50, 50, 1.0)}
                  style={{
                    background: posY > 35 && posY < 65 ? '#760CB0' : '#faf5ff',
                    color: posY > 35 && posY < 65 ? '#ffffff' : '#760CB0',
                    border: '1px solid rgba(118,12,176,0.2)',
                    padding: '0.35rem 0.65rem',
                    borderRadius: '7px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  🎯 Center
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset(50, 10, 1.0)}
                  style={{
                    background: '#faf5ff',
                    color: '#555',
                    border: '1px solid #ddd',
                    padding: '0.35rem 0.65rem',
                    borderRadius: '7px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  🔄 Reset (1.0x)
                </button>
              </div>
            </div>
          </div>

          {/* Precision Sliders */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderTop: '1px solid rgba(118,12,176,0.08)', paddingTop: '0.75rem' }}>
            {/* Zoom Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: '#444', marginBottom: '0.2rem' }}>
                <span>🔍 Zoom / Scale</span>
                <span style={{ color: '#760CB0', fontWeight: 800 }}>{currentZoom.toFixed(2)}x</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => onChangeZoom(Math.max(1.0, parseFloat((currentZoom - 0.1).toFixed(2))))}
                  style={{ background: '#faf5ff', border: '1px solid rgba(118,12,176,0.2)', borderRadius: '4px', width: '24px', height: '24px', cursor: 'pointer', fontWeight: 800, color: '#760CB0' }}
                >
                  -
                </button>
                <input
                  type="range"
                  min="1.0"
                  max="2.5"
                  step="0.05"
                  value={currentZoom}
                  onChange={(e) => onChangeZoom(parseFloat(e.target.value))}
                  style={{ flex: 1, accentColor: '#760CB0', cursor: 'pointer' }}
                />
                <button
                  type="button"
                  onClick={() => onChangeZoom(Math.min(2.5, parseFloat((currentZoom + 0.1).toFixed(2))))}
                  style={{ background: '#faf5ff', border: '1px solid rgba(118,12,176,0.2)', borderRadius: '4px', width: '24px', height: '24px', cursor: 'pointer', fontWeight: 800, color: '#760CB0' }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Vertical Y Position Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: '#444', marginBottom: '0.2rem' }}>
                <span>↕️ Vertical Position (Top ↔ Bottom)</span>
                <span style={{ color: '#760CB0', fontWeight: 800 }}>{posY}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={posY}
                onChange={(e) => onChangePosition(`${posX}% ${e.target.value}%`)}
                style={{ width: '100%', accentColor: '#760CB0', cursor: 'pointer' }}
              />
            </div>

            {/* Horizontal X Position Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: '#444', marginBottom: '0.2rem' }}>
                <span>↔️ Horizontal Position (Left ↔ Right)</span>
                <span style={{ color: '#760CB0', fontWeight: 800 }}>{posX}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={posX}
                onChange={(e) => onChangePosition(`${e.target.value}% ${posY}%`)}
                style={{ width: '100%', accentColor: '#760CB0', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
