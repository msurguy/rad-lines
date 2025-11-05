import React, { useState, useEffect, useRef } from 'react'
import Polygons from './components/Polygons'
import Slider from './components/Slider'
import TextInput from './components/TextInput'
import Toggle from './components/Toggle'
import SelectField from './components/SelectField'
import ControlGroup from './components/ControlGroup'
import ColorPicker from './components/ColorPicker/ColorPicker'
import helpStrings from './helpStrings'
import { eventBus } from './utils/eventBus'
import {
  appState as initialAppState,
  qs,
  defaultRotationFormula,
  defaultScaleFormula,
  defaultXPositionFormula,
  defaultYPositionFormula
} from './appState'
import * as query from 'query-state/lib/query'
import './App.scss'

const projectURL = 'https://msurguy.github.io/rad-lines/'

function App() {
  const [appState, setAppState] = useState(initialAppState)
  const [sharingURL, setSharingURL] = useState(projectURL)
  const [strokeColor, setStrokeColor] = useState({ hex: initialAppState.stroke.color })
  const [bgColor, setBgColor] = useState({ hex: initialAppState.paper.color })
  const [bgColorEnabled, setBgColorEnabled] = useState(false)
  const [showMoreTools, setShowMoreTools] = useState(false)

  const updateAppState = (updates) => {
    setAppState(prev => ({ ...prev, ...updates }))
  }

  const updateNestedAppState = (path, value) => {
    setAppState(prev => {
      const newState = { ...prev }
      const keys = path.split('.')
      let current = newState
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] }
        current = current[keys[i]]
      }
      current[keys[keys.length - 1]] = value
      return newState
    })
  }

  const toggleBackgroundColor = (value) => {
    setBgColorEnabled(value)
  }

  const handleStrokeColorChange = (value) => {
    updateNestedAppState('stroke.color', value)
  }

  const handleBackgroundColorChange = (value) => {
    updateNestedAppState('paper.color', value)
  }

  const resetScaleFormula = () => {
    updateAppState({ scaleFormula: defaultScaleFormula })
  }

  const resetRotationFormula = () => {
    updateAppState({ rotationFormula: defaultRotationFormula })
  }

  const resetXPositionFormula = () => {
    updateAppState({ xPositionFormula: defaultXPositionFormula })
  }

  const resetYPositionFormula = () => {
    updateAppState({ yPositionFormula: defaultYPositionFormula })
  }

  const download = () => {
    eventBus.emit('download')
  }

  const updateSharingURL = (appendQuery) => {
    const queryPresent = window.location.href.indexOf('?') >= 0
    const queryPrefix = (appendQuery || queryPresent) ? '?' : ''
    const encodedURL = query.stringify(qs.get())
    setSharingURL(encodeURIComponent(projectURL + queryPrefix + encodedURL))
  }

  useEffect(() => {
    const roundnessCurveTypes = [
      'curveCardinalClosed',
      'curveBundle',
      'curveCardinal',
      'curveCardinalOpen',
      'curveCatmullRom',
      'curveCatmullRomClosed',
      'curveCatmullRomOpen'
    ]
    updateNestedAppState('roundness.enabled', roundnessCurveTypes.indexOf(appState.curve.selected) >= 0)
    setBgColorEnabled(appState.paper.color !== null)
    updateSharingURL(false)
  }, [])

  useEffect(() => {
    updateSharingURL(true)
  }, [appState])

  useEffect(() => {
    if (bgColorEnabled) {
      updateNestedAppState('paper.color', bgColor.hex)
    } else {
      updateNestedAppState('paper.color', null)
      qs.unset('pcolor')
    }
  }, [bgColorEnabled])

  useEffect(() => {
    if (appState.sides?.value !== undefined) qs.set({ sd: appState.sides.value })
  }, [appState.sides?.value])

  useEffect(() => {
    if (appState.scaleFormula !== undefined) qs.set({ sf: appState.scaleFormula })
  }, [appState.scaleFormula])

  useEffect(() => {
    if (appState.rotationFormula !== undefined) qs.set({ rf: appState.rotationFormula })
  }, [appState.rotationFormula])

  useEffect(() => {
    if (appState.xPositionFormula !== undefined) qs.set({ xpos: appState.xPositionFormula })
  }, [appState.xPositionFormula])

  useEffect(() => {
    if (appState.yPositionFormula !== undefined) qs.set({ ypos: appState.yPositionFormula })
  }, [appState.yPositionFormula])

  useEffect(() => {
    if (appState.angle?.min !== undefined) qs.set({ mina: appState.angle.min })
  }, [appState.angle?.min])

  useEffect(() => {
    if (appState.angle?.max !== undefined) qs.set({ maxa: appState.angle.max })
  }, [appState.angle?.max])

  useEffect(() => {
    if (appState.quantity?.value !== undefined) qs.set({ qt: appState.quantity.value })
  }, [appState.quantity?.value])

  useEffect(() => {
    if (appState.randomize?.value !== undefined) qs.set({ rd: appState.randomize.value })
  }, [appState.randomize?.value])

  useEffect(() => {
    if (appState.roundness?.value !== undefined) qs.set({ rn: appState.roundness.value })
  }, [appState.roundness?.value])

  useEffect(() => {
    if (appState.radius?.min !== undefined) qs.set({ minrd: appState.radius.min })
  }, [appState.radius?.min])

  useEffect(() => {
    if (appState.radius?.max !== undefined) qs.set({ maxrd: appState.radius.max })
  }, [appState.radius?.max])

  useEffect(() => {
    if (appState.curve?.selected !== undefined) {
      qs.set({ cv: appState.curve.selected })
      const roundnessCurveTypes = [
        'curveCardinalClosed',
        'curveBundle',
        'curveCardinal',
        'curveCardinalOpen',
        'curveCatmullRom',
        'curveCatmullRomClosed',
        'curveCatmullRomOpen'
      ]
      updateNestedAppState('roundness.enabled', roundnessCurveTypes.indexOf(appState.curve.selected) >= 0)
    }
  }, [appState.curve?.selected])

  useEffect(() => {
    if (appState.seed?.value !== undefined) qs.set({ seed: appState.seed.value })
  }, [appState.seed?.value])

  useEffect(() => {
    if (appState.paper?.width !== undefined) qs.set({ pwidth: appState.paper.width })
  }, [appState.paper?.width])

  useEffect(() => {
    if (appState.paper?.height !== undefined) qs.set({ pheight: appState.paper.height })
  }, [appState.paper?.height])

  useEffect(() => {
    if (appState.paper?.color !== undefined && appState.paper?.color !== null) {
      qs.set({ pcolor: appState.paper.color })
    } else {
      qs.unset('pcolor')
    }
  }, [appState.paper?.color])

  useEffect(() => {
    if (appState.stroke?.width !== undefined) qs.set({ swidth: appState.stroke.width })
  }, [appState.stroke?.width])

  useEffect(() => {
    if (appState.stroke?.color !== undefined) qs.set({ scolor: appState.stroke.color })
  }, [appState.stroke?.color])

  return (
    <div className="main-wrapper">
      <div className="main-nav">
        <div className="brand">
          <svg xmlns="http://www.w3.org/2000/svg" width="29" height="32">
            <g fill="none" fillRule="evenodd" stroke="#848484">
              <path d="M22.3 13.5c-.3-.5-8.3-.5-8.6 0-.3.5 3.7 7.5 4.3 7.5.6 0 4.6-7 4.3-7.5" />
              <path d="M25.9 8.3C25 7.4 7.8 11.8 7.4 13c-.3 1.2 12.1 14 13.3 13.7 1.2-.3 6.1-17.5 5.2-18.4" />
              <path d="M26.9 1.5C25.2.5 1.1 13.6 1 15.5c0 2 23.4 16.4 25.1 15.5 1.7-1 2.5-28.5.8-29.5" />
            </g>
          </svg>
          Rad Lines
        </div>
        <div className="nav-more more-tools">
          <span className="text-black-50 small">More Tools: </span>
          <a href="https://msurguy.github.io/flow-lines/">Flow Lines</a>
          <a href="https://msurguy.github.io/SquiggleCam/">SquiggleCam</a>
          <a href="https://drawingbots.net/">DrawingBots</a>
        </div>
        <div className="sharing-wrapper">
          <span className="text-black-50 small">Share this: </span>
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://twitter.com/intent/tweet?text=Rad%20Lines%20SVG%20generator&url=${sharingURL}&via=msurguy&hashtags=RadLines%2CSVG`}
          >
            <svg viewBox="0 0 64 64" width="22" height="22">
              <path
                strokeWidth="0"
                fill="currentColor"
                d="M60 16 L54 17 L58 12 L51 14 C42 4 28 15 32 24 C16 24 8 12 8 12 C8 12 2 21 12 28 L6 26 C6 32 10 36 17 38 L10 38 C14 46 21 46 21 46 C21 46 15 51 4 51 C37 67 57 37 54 21 Z"
              ></path>
            </svg>
          </a>
        </div>
      </div>
      <div className="page">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="controls-wrapper">
            <div className="controls">
              <ControlGroup title="Shape">
                <Toggle
                  label="Randomize Vertices"
                  value={appState.randomize.value}
                  onChange={(val) => updateNestedAppState('randomize.value', val)}
                />
                <TextInput
                  tooltip={helpStrings.customShape}
                  label="Custom SVG Path"
                  placeholder="M10,10 L50,10 L50,50 L10,50 Z"
                  value={appState.customPath}
                  onChange={(val) => updateAppState({ customPath: val })}
                />
                <Slider
                  leftIcon={appState.quantity.leftIcon}
                  rightIcon={appState.quantity.rightIcon}
                  min={1}
                  max={100}
                  label="Quantity"
                  value={appState.quantity.value}
                  onChange={(val) => updateNestedAppState('quantity.value', val)}
                />
                <Slider
                  leftIcon={appState.sides.leftIcon}
                  rightIcon={appState.sides.rightIcon}
                  min={3}
                  max={appState.randomize.value ? 200 : 14}
                  label="Number of Sides"
                  value={appState.sides.value}
                  onChange={(val) => updateNestedAppState('sides.value', val)}
                />
                <Slider
                  leftIcon={appState.radius.leftIcon}
                  rightIcon={appState.radius.rightIcon}
                  step={1}
                  min={0}
                  max={300}
                  label="Min Radius"
                  value={appState.radius.min}
                  onChange={(val) => updateNestedAppState('radius.min', val)}
                />
                {appState.randomize.value && (
                  <Slider
                    leftIcon={appState.radius.leftIcon}
                    rightIcon={appState.radius.rightIcon}
                    step={1}
                    min={0}
                    max={300}
                    label="Max Radius"
                    value={appState.radius.max}
                    onChange={(val) => updateNestedAppState('radius.max', val)}
                  />
                )}
                <Slider
                  leftIcon={appState.angle.leftIcon}
                  rightIcon={appState.angle.rightIcon}
                  step={1}
                  min={0}
                  max={360}
                  label="Starting Angle"
                  value={appState.angle.min}
                  onChange={(val) => updateNestedAppState('angle.min', val)}
                />
                <Slider
                  leftIcon={appState.angle.leftIcon}
                  rightIcon={appState.angle.rightIcon}
                  step={1}
                  min={0}
                  max={360}
                  label="Arc Extent"
                  value={appState.angle.max}
                  onChange={(val) => updateNestedAppState('angle.max', val)}
                />
                <TextInput
                  tooltip={helpStrings.operatorsHelp}
                  label="Scale Formula"
                  onReset={resetScaleFormula}
                  showReset={true}
                  value={appState.scaleFormula}
                  onChange={(val) => updateAppState({ scaleFormula: val })}
                />
                <TextInput
                  tooltip={helpStrings.operatorsHelp}
                  label="Rotation Formula"
                  onReset={resetRotationFormula}
                  showReset={true}
                  value={appState.rotationFormula}
                  onChange={(val) => updateAppState({ rotationFormula: val })}
                />
                {!appState.randomize.value && (
                  <>
                    <TextInput
                      tooltip={helpStrings.operatorsHelp}
                      label="X Position Formula"
                      showReset={true}
                      onReset={resetXPositionFormula}
                      value={appState.xPositionFormula}
                      onChange={(val) => updateAppState({ xPositionFormula: val })}
                    />
                    <TextInput
                      tooltip={helpStrings.operatorsHelp}
                      label="Y Position Formula"
                      showReset={true}
                      onReset={resetYPositionFormula}
                      value={appState.yPositionFormula}
                      onChange={(val) => updateAppState({ yPositionFormula: val })}
                    />
                  </>
                )}
              </ControlGroup>

              <ControlGroup title="Line">
                <Slider
                  disabled={!appState.roundness.enabled}
                  leftIcon={appState.roundness.leftIcon}
                  rightIcon={appState.roundness.rightIcon}
                  step={0.1}
                  min={-2}
                  max={2}
                  label="Roundness"
                  value={appState.roundness.value}
                  onChange={(val) => updateNestedAppState('roundness.value', val)}
                />
                <SelectField
                  label="Curve Type"
                  value={appState.curve.selected}
                  options={appState.curve.options}
                  onChange={(val) => updateNestedAppState('curve.selected', val)}
                />
                <ColorPicker
                  disableAlpha={false}
                  onColorChange={handleStrokeColorChange}
                  label="Stroke"
                  value={strokeColor}
                />
                <TextInput
                  tooltip={helpStrings.width}
                  label="Width"
                  value={appState.stroke.width}
                  onChange={(val) => updateNestedAppState('stroke.width', val)}
                />
              </ControlGroup>

              <ControlGroup title="Paper">
                <ColorPicker
                  showToggle={true}
                  toggleValue={bgColorEnabled}
                  disableAlpha={false}
                  onToggle={toggleBackgroundColor}
                  onColorChange={handleBackgroundColorChange}
                  label="Color"
                  value={bgColor}
                />
                <Slider
                  min={1}
                  max={10000}
                  label="Randomization Seed"
                  value={appState.seed.value}
                  onChange={(val) => updateNestedAppState('seed.value', val)}
                />
                <Slider
                  min={1}
                  max={2000}
                  label="Width"
                  value={appState.paper.width}
                  onChange={(val) => updateNestedAppState('paper.width', val)}
                />
                <Slider
                  min={1}
                  max={2000}
                  label="Height"
                  value={appState.paper.height}
                  onChange={(val) => updateNestedAppState('paper.height', val)}
                />
              </ControlGroup>
            </div>
          </div>

          <div className="bottom-sheet">
            <div className="reveal"></div>
            <div className="d-flex pt-2 pb-2 download-wrapper">
              <button className="btn ml-3 mr-3 btn-primary btn-block" onClick={download}>
                Download SVG{' '}
                <svg
                  viewBox="0 6 32 32"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentcolor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <path d="M28 22 L28 30 4 30 4 22 M16 4 L16 24 M8 16 L16 24 24 16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="paper">
          <div className="sketch">
            <Polygons
              seed={appState.seed.value}
              width={appState.paper.width}
              height={appState.paper.height}
              strokeColor={appState.stroke.color}
              strokeWidth={appState.stroke.width}
              paperColorEnabled={bgColorEnabled}
              paperColor={appState.paper.color}
              scaleFormula={appState.scaleFormula}
              xPositionFormula={appState.xPositionFormula}
              yPositionFormula={appState.yPositionFormula}
              rotationFormula={appState.rotationFormula}
              minAngle={appState.angle.min}
              maxAngle={appState.angle.max}
              minRadius={appState.radius.min}
              maxRadius={appState.radius.max}
              sides={appState.sides.value}
              roundness={appState.roundness.value}
              quantity={appState.quantity.value}
              curve={appState.curve.selected}
              randomize={appState.randomize.value}
              customPath={appState.customPath}
            />
          </div>
        </div>
        <div className="footer-wrapper">
          <div className="footer">
            <p className="small">
              Project by{' '}
              <a target="_blank" rel="noreferrer" href="http://twitter.com/msurguy">
                @msurguy
              </a>{' '}
              |{' '}
              <a target="_blank" rel="noreferrer" href="https://github.com/sponsors/msurguy">
                Support
              </a>{' '}
              |{' '}
              <a target="_blank" rel="noreferrer" href="http://github.com/msurguy/rad-lines">
                Source
              </a>
              <span className="hide-on-desktop">
                |{' '}
                <a href="#more" onClick={() => setShowMoreTools(!showMoreTools)}>
                  More Tools
                </a>
              </span>
            </p>
            {showMoreTools && (
              <div className="more-tools mb-2">
                <a href="https://msurguy.github.io/flow-lines/">Flow Lines</a>
                <a href="https://msurguy.github.io/SquiggleCam/">SquiggleCam</a>
                <a href="https://drawingbots.net/">DrawingBots</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
