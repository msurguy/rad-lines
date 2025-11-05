import React from 'react'
import SvgIcon from './SvgIcon'

const Slider = ({
  disabled = false,
  leftIcon,
  rightIcon,
  min = 0,
  max = 100,
  step = 1,
  label = 'Label',
  value = 50,
  onChange
}) => {
  const handleInput = (e) => {
    const inputValue = parseFloat(e.target.value)
    if (inputValue > min) {
      onChange(inputValue)
    } else {
      onChange(min)
    }
  }

  return (
    <div className="sidebar-control">
      <div className="control-header">
        <div>
          {leftIcon && (
            <SvgIcon
              name={leftIcon.icon}
              width={leftIcon.width}
              height={leftIcon.height}
              color="#FFFFFF"
              fill={false}
            />
          )}
        </div>
        <div className="control-label">
          <div className="control-output">
            <input
              disabled={disabled}
              type="text"
              value={value}
              onChange={handleInput}
            />
          </div>
          {label}
        </div>
        <div>
          {rightIcon && (
            <SvgIcon
              name={rightIcon.icon}
              width={rightIcon.width}
              height={rightIcon.height}
              color="#FFFFFF"
              fill={false}
            />
          )}
        </div>
      </div>
      <input
        disabled={disabled}
        className="custom-range"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleInput}
      />
    </div>
  )
}

export default Slider
