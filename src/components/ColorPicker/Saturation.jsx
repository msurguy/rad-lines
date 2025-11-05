import React, { useRef } from 'react'
import clamp from 'clamp'
import throttle from 'lodash.throttle'
import './Saturation.scss'

const Saturation = ({ value, onChange }) => {
  const containerRef = useRef(null)

  const handleChange = (e, skip) => {
    !skip && e.preventDefault()
    const container = containerRef.current
    const containerWidth = container.clientWidth
    const containerHeight = container.clientHeight

    let xOffset = container.getBoundingClientRect().left + window.pageXOffset
    let yOffset = container.getBoundingClientRect().top + window.pageYOffset
    let pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0)
    let pageY = e.pageY || (e.touches ? e.touches[0].pageY : 0)
    let left = clamp(pageX - xOffset, 0, containerWidth)
    let top = clamp(pageY - yOffset, 0, containerHeight)
    let saturation = left / containerWidth
    let bright = clamp(-(top / containerHeight) + 1, 0, 1)

    throttledChange({
      h: value.hsv.h,
      s: saturation,
      v: bright,
      a: value.hsv.a,
      source: 'hsva'
    })
  }

  const throttledChange = throttle((data) => {
    onChange(data)
  }, 20, { leading: true, trailing: false })

  const handleMouseDown = (e) => {
    const handleMouseMove = (e) => handleChange(e, false)
    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  const bgColor = `hsl(${value.hsv.h}, 100%, 50%)`
  const pointerTop = (-(value.hsv.v * 100) + 1) + 100 + '%'
  const pointerLeft = value.hsv.s * 100 + '%'

  return (
    <div
      className="vc-saturation"
      style={{ background: bgColor }}
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchMove={handleChange}
      onTouchStart={handleChange}
    >
      <div className="vc-saturation--white"></div>
      <div className="vc-saturation--black"></div>
      <div className="vc-saturation-pointer" style={{ top: pointerTop, left: pointerLeft }}>
        <div className="vc-saturation-circle"></div>
      </div>
    </div>
  )
}

export default Saturation
