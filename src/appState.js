import queryState from 'query-state'

export const qs = queryState({}, {useSearch: true})

const currentStateFromQuery = qs.get()

export const defaultScaleFormula = 'i+i*7'
export const defaultRotationFormula = '10*sin(i/2)'
export const defaultXPositionFormula = '400'
export const defaultYPositionFormula = '400'

export const appState = {
  scaleFormula: currentStateFromQuery.sf || defaultScaleFormula,
  rotationFormula: currentStateFromQuery.rf || defaultRotationFormula,
  xPositionFormula: currentStateFromQuery.xpos || defaultXPositionFormula,
  yPositionFormula: currentStateFromQuery.ypos || defaultYPositionFormula,
  paper: {
    width: currentStateFromQuery.pwidth || 800,
    height: currentStateFromQuery.pheight || 800,
    color: currentStateFromQuery.pcolor || false
  },
  seed: {
    value: currentStateFromQuery.seed || 10
  },
  angle: {
    leftIcon: {
      icon: 'angle-short',
      width: '22',
      height: '22'
    },
    rightIcon: {
      icon: 'angle-wide',
      width: '22',
      height: '22'
    },
    min: currentStateFromQuery.mina || 0,
    max: currentStateFromQuery.maxa || 360
  },
  sides: {
    leftIcon: {
      icon: 'triangle-large',
      width: '22',
      height: '22'
    },
    rightIcon: {
      icon: 'hexagon',
      width: '22',
      height: '22'
    },
    value: currentStateFromQuery.sd || 5
  },
  quantity: {
    leftIcon: {
      icon: 'square',
      width: '22',
      height: '22'
    },
    rightIcon: {
      icon: 'squares',
      width: '22',
      height: '22'
    },
    value: currentStateFromQuery.qt || 25
  },
  randomize: {
    value: currentStateFromQuery.rd || false
  },
  roundness: {
    leftIcon: {
      icon: 'line-sharp',
      width: '22',
      height: '22'
    },
    rightIcon: {
      icon: 'line-curve',
      width: '22',
      height: '22'
    },
    value: currentStateFromQuery.rn || 0.8,
    enabled: true
  },
  radius: {
    leftIcon: {
      icon: 'triangle',
      width: '12',
      height: '12'
    },
    rightIcon: {
      icon: 'triangle-large',
      width: '22',
      height: '22'
    },
    min: currentStateFromQuery.minrd || 20,
    max: currentStateFromQuery.maxrd || 50
  },
  stroke: {
    color: currentStateFromQuery.scolor || '#000000',
    width: currentStateFromQuery.swidth || '0.4mm'
  },
  curve: {
    selected: currentStateFromQuery.cv || 'curveCardinalClosed',
    options: [
      {text: 'curveCardinalClosed', value: 'curveCardinalClosed'},
      {text: 'curveLinearClosed', value: 'curveLinearClosed'},
      {text: 'curveBasisClosed', value: 'curveBasisClosed'},
      {text: 'curveCatmullRomClosed', value: 'curveCatmullRomClosed'},
      {text: 'curveNatural', value: 'curveNatural'},
      {text: 'curveBundle', value: 'curveBundle'},
      {text: 'curveLinear', value: 'curveLinear'},
      {text: 'curveStep', value: 'curveStep'},
      {text: 'curveCardinal', value: 'curveCardinal'},
      {text: 'curveBasis', value: 'curveBasis'},
      {text: 'curveBasisOpen', value: 'curveBasisOpen'},
      {text: 'curveCardinalOpen', value: 'curveCardinalOpen'},
      {text: 'curveCatmullRom', value: 'curveCatmullRom'},
      {text: 'curveCatmullRomOpen', value: 'curveCatmullRomOpen'},
      {text: 'curveMonotoneX', value: 'curveMonotoneX'}
    ]
  }
}
