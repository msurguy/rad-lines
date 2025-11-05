import React from 'react'
import SvgIcon from './SvgIcon'

const SelectField = ({
  leftIcon,
  rightIcon,
  label = 'Label',
  value = '',
  options = [],
  onChange
}) => {
  const handleInput = (e) => {
    onChange(e.target.value)
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
        <div className="control-label">{label}</div>
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
      <div className="control-header">
        <select
          value={value}
          className="custom-select custom-select-sm custom-select-input"
          onChange={handleInput}
        >
          {options.map((item, index) => (
            <option key={index} value={item.value}>
              {item.text}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default SelectField
