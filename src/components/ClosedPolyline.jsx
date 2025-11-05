import React, { useMemo } from 'react'
import {
  line, radialLine,
  curveBasis, curveBasisClosed, curveBasisOpen,
  curveBumpX, curveBumpY,
  curveBundle,
  curveCardinal, curveCardinalClosed, curveCardinalOpen,
  curveCatmullRom, curveCatmullRomClosed, curveCatmullRomOpen,
  curveLinear, curveLinearClosed,
  curveMonotoneX, curveMonotoneY,
  curveNatural,
  curveStep, curveStepAfter, curveStepBefore
} from 'd3'

const curveMap = {
  curveBasis,
  curveBasisClosed,
  curveBasisOpen,
  curveBumpX,
  curveBumpY,
  curveBundle: (r) => curveBundle.beta(r),
  curveCardinal: (r) => curveCardinal.tension(r),
  curveCardinalClosed: (r) => curveCardinalClosed.tension(r),
  curveCardinalOpen: (r) => curveCardinalOpen.tension(r),
  curveCatmullRom: (r) => curveCatmullRom.alpha(r),
  curveCatmullRomClosed: (r) => curveCatmullRomClosed.alpha(r),
  curveCatmullRomOpen: (r) => curveCatmullRomOpen.alpha(r),
  curveLinear,
  curveLinearClosed,
  curveMonotoneX,
  curveMonotoneY,
  curveNatural,
  curveStep,
  curveStepAfter,
  curveStepBefore,
}

const ClosedPolyline = ({
  lineData = [],
  roundness = 0.8,
  curve = 'curveCardinalClosed',
  randomize = false,
  strokeColor = '#000000',
  strokeWidth = '0.4mm'
}) => {
  const linePath = useMemo(() => {
    const path = randomize ? radialLine() : line()

    // Get the curve function from our map.
    const selected = curveMap[curve]
    const curveFn = typeof selected === 'function' && (
      curve.indexOf('curveBundle') !== -1 ||
      curve.indexOf('curveCardinal') !== -1 ||
      curve.indexOf('curveCatmullRom') !== -1
    )
      ? selected(roundness)
      : selected

    if (!curveFn) {
      console.warn(`Unknown curve type: ${curve}. Defaulting to curveLinear.`)
      return path.curve(curveLinear)(lineData)
    }

    return path.curve(curveFn)(lineData)
  }, [lineData, roundness, curve, randomize])

  return (
    <path
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      fill="none"
      d={linePath}
    />
  )
}

export default ClosedPolyline
