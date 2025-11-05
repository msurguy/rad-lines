import { useState, useEffect } from 'react'
import { appState as initialAppState, qs } from '../appState'

export const useAppState = () => {
  const [appState, setAppState] = useState(initialAppState)

  return [appState, setAppState]
}

export const useQuerySync = (appState) => {
  useEffect(() => {
    // Sync all state changes to query string
    if (appState.sides?.value !== undefined) qs.set({ sd: appState.sides.value })
    if (appState.scaleFormula !== undefined) qs.set({ sf: appState.scaleFormula })
    if (appState.rotationFormula !== undefined) qs.set({ rf: appState.rotationFormula })
    if (appState.xPositionFormula !== undefined) qs.set({ xpos: appState.xPositionFormula })
    if (appState.yPositionFormula !== undefined) qs.set({ ypos: appState.yPositionFormula })
    if (appState.angle?.min !== undefined) qs.set({ mina: appState.angle.min })
    if (appState.angle?.max !== undefined) qs.set({ maxa: appState.angle.max })
    if (appState.quantity?.value !== undefined) qs.set({ qt: appState.quantity.value })
    if (appState.randomize?.value !== undefined) qs.set({ rd: appState.randomize.value })
    if (appState.roundness?.value !== undefined) qs.set({ rn: appState.roundness.value })
    if (appState.radius?.min !== undefined) qs.set({ minrd: appState.radius.min })
    if (appState.radius?.max !== undefined) qs.set({ maxrd: appState.radius.max })
    if (appState.curve?.selected !== undefined) qs.set({ cv: appState.curve.selected })
    if (appState.seed?.value !== undefined) qs.set({ seed: appState.seed.value })
    if (appState.paper?.width !== undefined) qs.set({ pwidth: appState.paper.width })
    if (appState.paper?.height !== undefined) qs.set({ pheight: appState.paper.height })
    if (appState.paper?.color !== undefined && appState.paper?.color !== null) {
      qs.set({ pcolor: appState.paper.color })
    } else {
      qs.unset('pcolor')
    }
    if (appState.stroke?.width !== undefined) qs.set({ swidth: appState.stroke.width })
    if (appState.stroke?.color !== undefined) qs.set({ scolor: appState.stroke.color })
  }, [appState])
}
