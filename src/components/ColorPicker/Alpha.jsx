import React, { useRef } from 'react'
import Checkboard from './Checkboard'
import './Alpha.scss'

const Alpha = ({ value, onChange }) => {
  const containerRef = useRef(null)

  const handleChange = (e, skip) => {
    !skip && e.preventDefault()
    const container = containerRef.current
    const containerWidth = container.clientWidth

    const xOffset = container.getBoundingClientRect().left + window.pageXOffset
    const pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0)
    const left = pageX - xOffset

    let a
    if (left < 0) {
      a = 0
    } else if (left > containerWidth) {
      a = 1
    } else {
      a = Math.round(left * 100 / containerWidth) / 100
    }

    if (value.a !== a) {
      onChange({
        h: value.hsl.h,
        s: value.hsl.s,
        l: value.hsl.l,
        a: a,
        source: 'rgba'
      })
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

  const rgba = value.rgba
  const rgbStr = [rgba.r, rgba.g, rgba.b].join(',')
  const gradientColor = 'linear-gradient(to right, rgba(' + rgbStr + ', 0) 0%, rgba(' + rgbStr + ', 1) 100%)'

  return (
    <div className="vc-alpha">
      <div className="vc-alpha-checkboard-wrap">
        <Checkboard />
      </div>
      <div className="vc-alpha-gradient" style={{ background: gradientColor }}></div>
      <div
        className="vc-alpha-container"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchMove={handleChange}
        onTouchStart={handleChange}
      >
        <div className="vc-alpha-pointer" style={{ left: value.a * 100 + '%' }}>
          <div className="vc-alpha-picker"></div>
        </div>
      </div>
    </div>
  )
}

export default Alpha
