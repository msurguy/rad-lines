import React, { useRef, useState } from 'react'
import './Hue.scss'

const Hue = ({ value, direction = 'horizontal', onChange }) => {
  const containerRef = useRef(null)
  const [oldHue, setOldHue] = useState(0)
  const [pullDirection, setPullDirection] = useState('')

  const h = value.hsl.h
  if (h !== 0 && h - oldHue > 0) setPullDirection('right')
  if (h !== 0 && h - oldHue < 0) setPullDirection('left')
  setOldHue(h)

  const handleChange = (e, skip) => {
    !skip && e.preventDefault()

    const container = containerRef.current
    const containerWidth = container.clientWidth
    const containerHeight = container.clientHeight

    let xOffset = container.getBoundingClientRect().left + window.pageXOffset
    let yOffset = container.getBoundingClientRect().top + window.pageYOffset
    let pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0)
    let pageY = e.pageY || (e.touches ? e.touches[0].pageY : 0)
    let left = pageX - xOffset
    let top = pageY - yOffset

    let hue
    let percent

    if (direction === 'vertical') {
      if (top < 0) {
        hue = 360
      } else if (top > containerHeight) {
        hue = 0
      } else {
        percent = -(top * 100 / containerHeight) + 100
        hue = (360 * percent / 100)
      }

      if (value.hsl.h !== hue) {
        onChange({
          h: hue,
          s: value.hsl.s,
          l: value.hsl.l,
          a: value.hsl.a,
          source: 'hsl'
        })
      }
    } else {
      if (left < 0) {
        hue = 0
      } else if (left > containerWidth) {
        hue = 360
      } else {
        percent = left * 100 / containerWidth
        hue = (360 * percent / 100)
      }

      if (value.hsl.h !== hue) {
        onChange({
          h: hue,
          s: value.hsl.s,
          l: value.hsl.l,
          a: value.hsl.a,
          source: 'hsl'
        })
      }
    }
  }

  const handleMouseDown = (e) => {
    handleChange(e, true)
    const handleMouseMove = (e) => handleChange(e, false)
    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  const directionClass = direction === 'horizontal' ? 'vc-hue--horizontal' : 'vc-hue--vertical'

  const pointerTop = direction === 'vertical'
    ? (value.hsl.h === 0 && pullDirection === 'right' ? 0 : -((value.hsl.h * 100) / 360) + 100 + '%')
    : 0

  const pointerLeft = direction === 'vertical'
    ? 0
    : (value.hsl.h === 0 && pullDirection === 'right' ? '100%' : (value.hsl.h * 100) / 360 + '%')

  return (
    <div className={`vc-hue ${directionClass}`}>
      <div
        className="vc-hue-container"
        role="slider"
        aria-valuenow={value.hsl.h}
        aria-valuemin="0"
        aria-valuemax="360"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchMove={handleChange}
        onTouchStart={handleChange}
      >
        <div className="vc-hue-pointer" style={{ top: pointerTop, left: pointerLeft }} role="presentation">
          <div className="vc-hue-picker"></div>
        </div>
      </div>
    </div>
  )
}

export default Hue
