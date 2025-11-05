import React, { useState, useEffect } from 'react'
import SvgIcon from './SvgIcon'
import './ControlGroup.scss'

const setLocalStorageObject = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const getLocalStorageObject = (key) => {
  const value = localStorage.getItem(key)
  return value && JSON.parse(value)
}

const ControlGroup = ({ title = '', children }) => {
  const [isGroupOpened, setIsGroupOpened] = useState(false)

  useEffect(() => {
    if (title) {
      const state = getLocalStorageObject('collapsibles') || {}
      if (state[title] !== undefined) {
        setIsGroupOpened(state[title])
      }
    }
  }, [title])

  useEffect(() => {
    if (title) {
      const state = getLocalStorageObject('collapsibles') || {}
      state[title] = isGroupOpened
      setLocalStorageObject('collapsibles', state)
    }
  }, [isGroupOpened, title])

  return (
    <div>
      <div
        className="sidebar-control control-group"
        onClick={() => setIsGroupOpened(!isGroupOpened)}
      >
        <div className="control-header">
          <span>{title}</span>
          <SvgIcon
            name="chevron-right"
            width="12"
            height="22"
            fill={false}
            className={`chevron ${isGroupOpened ? 'chevron-rotated' : ''}`}
          />
        </div>
      </div>
      <div className={`slide-enter ${isGroupOpened ? 'slide-enter-active' : ''}`}>
        {isGroupOpened && children}
      </div>
    </div>
  )
}

export default ControlGroup
