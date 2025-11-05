import React, { useMemo } from 'react'
import './Checkboard.scss'

let _checkboardCache = {}

function renderCheckboard(c1, c2, size) {
  if (typeof document === 'undefined') {
    return null
  }
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size * 2
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return null
  }
  ctx.fillStyle = c1
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = c2
  ctx.fillRect(0, 0, size, size)
  ctx.translate(size, size)
  ctx.fillRect(0, 0, size, size)
  return canvas.toDataURL()
}

function getCheckboard(c1, c2, size) {
  const key = c1 + ',' + c2 + ',' + size

  if (_checkboardCache[key]) {
    return _checkboardCache[key]
  } else {
    const checkboard = renderCheckboard(c1, c2, size)
    _checkboardCache[key] = checkboard
    return checkboard
  }
}

const Checkboard = ({
  size = 8,
  white = '#fff',
  grey = '#e6e6e6'
}) => {
  const bgStyle = useMemo(() => ({
    backgroundImage: 'url(' + getCheckboard(white, grey, size) + ')'
  }), [white, grey, size])

  return <div className="vc-checkerboard" style={bgStyle}></div>
}

export default Checkboard
