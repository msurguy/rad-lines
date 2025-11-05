import React from 'react'

// Icon data extracted from generated icon files
const icons = {
  'triangle': {
    viewBox: '0 0 23.3 21.2',
    path: 'M11.6 1L.8 20.7h21.6L11.6 1z'
  },
  'triangle-large': {
    viewBox: '0 0 23.3 21.2',
    path: 'M11.6 1L.8 20.7h21.6L11.6 1z'
  },
  'hexagon': {
    viewBox: '0 0 24 24',
    path: 'M12 2l9 5v10l-9 5-9-5V7z'
  },
  'square': {
    viewBox: '0 0 24 24',
    path: 'M3 3h18v18H3z'
  },
  'squares': {
    viewBox: '0 0 24 24',
    path: 'M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z'
  },
  'line-sharp': {
    viewBox: '0 0 24 24',
    path: 'M2 12h20M7 7l5-5 5 5M7 17l5 5 5-5'
  },
  'line-curve': {
    viewBox: '0 0 24 24',
    path: 'M2 12c0 0 5-5 10-5s10 5 10 5'
  },
  'angle-short': {
    viewBox: '0 0 24 24',
    path: 'M12 2v20M12 12h10'
  },
  'angle-wide': {
    viewBox: '0 0 24 24',
    path: 'M12 2v20M2 12h20'
  },
  'chevron-right': {
    viewBox: '0 0 24 24',
    path: 'M9 18l6-6-6-6'
  }
}

const SvgIcon = ({ name, width = '22', height = '22', color = '#FFFFFF', fill = false, className = '' }) => {
  const icon = icons[name]

  if (!icon) {
    console.warn(`Icon "${name}" not found`)
    return null
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={icon.viewBox}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d={icon.path}
        fill={fill ? color : 'none'}
        stroke={!fill ? color : 'none'}
        strokeMiterlimit="10"
      />
    </svg>
  )
}

export default SvgIcon
