import React, { useState, useEffect } from 'react'
import { colorChange, isValidHex, isTransparent } from './colorUtils'
import EditableInput from './EditableInput'
import Saturation from './Saturation'
import Hue from './Hue'
import Alpha from './Alpha'
import Checkboard from './Checkboard'
import './ColorPicker.scss'

const presetColors = [
  '#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321',
  '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2',
  '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#CCCCCC',
  '#FFFFFF'
]

const ColorPicker = ({
  value,
  showToggle = false,
  toggleValue = false,
  disableAlpha = true,
  disableFields = false,
  label = '',
  onToggle,
  onColorChange
}) => {
  const [colors, setColors] = useState(colorChange(value))
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [oldHue, setOldHue] = useState(0)

  useEffect(() => {
    setColors(colorChange(value))
  }, [value])

  const handleColorChange = (data) => {
    const newColors = colorChange(data, oldHue || colors.hsl.h)
    setOldHue(newColors.hsl.h)
    setColors(newColors)
  }

  const hex = colors.a < 1 ? colors.hex8.replace('#', '') : colors.hex.replace('#', '')
  const activeColor = `rgba(${colors.rgba.r},${colors.rgba.g},${colors.rgba.b},${colors.rgba.a})`
  const labelId = `input__label__color__${Math.random().toString().slice(2, 5)}`

  const handleToggle = (e) => {
    onToggle && onToggle(e.target.checked)
    onColorChange && onColorChange(`#${hex}`)
  }

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker)
  }

  const emitChange = () => {
    onColorChange && onColorChange(`#${hex}`)
    setShowColorPicker(false)
  }

  const handlePreset = (c) => {
    handleColorChange({
      hex: c,
      source: 'hex'
    })
  }

  const basicInputChange = (e) => {
    if (isValidHex(e.target.value)) {
      handleColorChange({
        hex: e.target.value,
        source: 'hex'
      })
    }
    onColorChange && onColorChange(`#${hex}`)
  }

  const inputChange = (data) => {
    if (!data) {
      return
    }
    if (data.hex) {
      if (isValidHex(data.hex)) {
        handleColorChange({
          hex: data.hex,
          source: 'hex'
        })
      }
    } else if (data.r || data.g || data.b || data.a) {
      handleColorChange({
        r: data.r || colors.rgba.r,
        g: data.g || colors.rgba.g,
        b: data.b || colors.rgba.b,
        a: data.a || colors.rgba.a,
        source: 'rgba'
      })
    }
  }

  return (
    <div className="sidebar-control">
      <div className="control-header">
        {showToggle && (
          <div className="custom-controls custom-switch">
            <input
              id={`${labelId}-toggle`}
              type="checkbox"
              className="custom-control-input"
              value={toggleValue}
              checked={!!toggleValue}
              onChange={handleToggle}
            />
            <label className="custom-control-label" htmlFor={`${labelId}-toggle`}></label>
          </div>
        )}
        <label htmlFor={labelId} className="control-label color-control-label" id={labelId}>
          {label}
        </label>
        <div className="color-indicator-wrapper">
          <div
            className="color-indicator"
            style={{ backgroundColor: `#${hex}` }}
            onClick={toggleColorPicker}
          ></div>
          <input
            aria-labelledby={labelId}
            className="control-text-input color-control-text-input"
            type="text"
            value={hex}
            onChange={basicInputChange}
          />
          <button className="btn btn-xsm btn-outline-secondary color-picker-button" onClick={emitChange}>
            SET
          </button>
        </div>
      </div>
      {showColorPicker && (
        <div
          role="application"
          aria-label="Color picker"
          className={`mt-2 vc-sketch ${disableAlpha ? 'vc-sketch__disable-alpha' : ''}`}
        >
          <div className="vc-sketch-saturation-wrap">
            <Saturation value={colors} onChange={handleColorChange} />
          </div>
          <div className="vc-sketch-controls">
            <div className="vc-sketch-sliders">
              <div className="vc-sketch-hue-wrap">
                <Hue value={colors} onChange={handleColorChange} />
              </div>
              {!disableAlpha && (
                <div className="vc-sketch-alpha-wrap">
                  <Alpha value={colors} onChange={handleColorChange} />
                </div>
              )}
            </div>
            <div className="vc-sketch-color-wrap">
              <div
                aria-label={`Current color is ${activeColor}`}
                className="vc-sketch-active-color"
                style={{ background: activeColor }}
              ></div>
              <Checkboard />
            </div>
          </div>
          {!disableFields && (
            <div className="vc-sketch-field">
              <div className="vc-sketch-field--double">
                <EditableInput label="hex" value={hex} onChange={inputChange} />
              </div>
              <div className="vc-sketch-field--single">
                <EditableInput label="r" value={colors.rgba.r} onChange={inputChange} />
              </div>
              <div className="vc-sketch-field--single">
                <EditableInput label="g" value={colors.rgba.g} onChange={inputChange} />
              </div>
              <div className="vc-sketch-field--single">
                <EditableInput label="b" value={colors.rgba.b} onChange={inputChange} />
              </div>
              {!disableAlpha && (
                <div className="vc-sketch-field--single">
                  <EditableInput label="a" value={colors.a} arrowOffset={0.01} max={1} onChange={inputChange} />
                </div>
              )}
            </div>
          )}
          <div className="vc-sketch-presets" role="group" aria-label="A color preset, pick one to set as current color">
            {presetColors.map((c) => (
              !isTransparent(c) ? (
                <div
                  key={c}
                  className="vc-sketch-presets-color"
                  aria-label={'Color:' + c}
                  style={{ background: c }}
                  onClick={() => handlePreset(c)}
                ></div>
              ) : (
                <div
                  key={c}
                  aria-label={'Color:' + c}
                  className="vc-sketch-presets-color"
                  onClick={() => handlePreset(c)}
                >
                  <Checkboard />
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ColorPicker
