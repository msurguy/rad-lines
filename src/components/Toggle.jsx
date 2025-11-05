import React from 'react'

const Toggle = ({
  label = '',
  value = false,
  onChange
}) => {
  const handleInput = (e) => {
    onChange(e.target.checked)
  }

  return (
    <div className="sidebar-control">
      <div className="control-header">
        <div className="custom-control custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            id={label}
            value={value}
            checked={!!value}
            onChange={handleInput}
          />
          <label className="custom-control-label" htmlFor={label}>
            {label}
          </label>
        </div>
      </div>
    </div>
  )
}

export default Toggle
