import React, { useState, useEffect, useRef } from 'react'
import './EditableInput.scss'

const EditableInput = ({
  label,
  labelText,
  desc,
  value,
  max,
  min,
  arrowOffset = 1,
  onChange
}) => {
  const [val, setVal] = useState(value)
  const inputRef = useRef(null)

  useEffect(() => {
    setVal(value)
  }, [value])

  const handleChange = (newVal) => {
    let data = {}
    data[label] = newVal
    if (data.hex === undefined && data['#'] === undefined) {
      onChange(data)
    } else if (newVal.length > 5) {
      onChange(data)
    }
  }

  const handleInput = (e) => {
    const inputValue = e.target.value
    if (!(max === undefined) && +inputValue > max) {
      if (inputRef.current) {
        inputRef.current.value = max
      }
      setVal(max)
    } else {
      setVal(inputValue)
    }
  }

  const handleUpdate = (e) => {
    handleChange(e.target.value)
  }

  const handleKeyDown = (e) => {
    let currentVal = val
    let number = Number(currentVal)

    if (number) {
      let amount = arrowOffset || 1

      // Up
      if (e.keyCode === 38) {
        currentVal = number + amount
        handleChange(currentVal)
        e.preventDefault()
      }

      // Down
      if (e.keyCode === 40) {
        currentVal = number - amount
        handleChange(currentVal)
        e.preventDefault()
      }
    }
  }

  const labelId = `input__label__${label}__${Math.random().toString().slice(2, 5)}`
  const labelSpanText = labelText || label

  return (
    <div className="vc-editable-input">
      <input
        aria-labelledby={labelId}
        className="vc-input__input"
        value={val}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        onBlur={handleUpdate}
        ref={inputRef}
      />
      <span htmlFor={label} className="vc-input__label" id={labelId}>
        {labelSpanText}
      </span>
      <span className="vc-input__desc">{desc}</span>
    </div>
  )
}

export default EditableInput
