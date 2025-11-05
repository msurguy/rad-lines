import React, { useState } from 'react'
import SvgIcon from './SvgIcon'
import './TextInput.scss'

const TextInput = ({
  leftIcon,
  rightIcon,
  label = '',
  value = '',
  tooltip = '',
  showReset = false,
  onChange,
  onReset
}) => {
  const [showTooltip, setShowTooltip] = useState(false)

  const handleInput = (e) => {
    onChange(e.target.value)
  }

  return (
    <div className="sidebar-control">
      <div className="control-header">
        <div>
          {leftIcon && (
            <SvgIcon name={leftIcon} width="22" height="22" color="#FFFFFF" fill={false} />
          )}
        </div>
        <div className="control-label">
          <span>{label}</span>
          {tooltip && (
            <span className="tooltip-container">
              <button
                className="tooltip-trigger btn badge badge-pill badge-dark ml-2"
                onClick={() => setShowTooltip(!showTooltip)}
              >
                ?
              </button>
              {showTooltip && (
                <div className="popper popper-content" dangerouslySetInnerHTML={{ __html: tooltip }} />
              )}
            </span>
          )}
        </div>
        <div className="right-icon">
          {rightIcon && (
            <SvgIcon name={rightIcon} width="22" height="22" color="#FFFFFF" fill={false} />
          )}
        </div>
      </div>
      <div className="control-header">
        <input
          className="control-text-input"
          type="text"
          value={value}
          onChange={handleInput}
        />
        {showReset && (
          <a className="btn" onClick={onReset}>
            reset
          </a>
        )}
      </div>
    </div>
  )
}

export default TextInput
