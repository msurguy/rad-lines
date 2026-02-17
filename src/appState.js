import queryState from 'query-state';

export const qs = queryState({}, { useSearch: true });

const currentStateFromQuery = qs.get();

export const defaultScaleFormula = 'i+i*7';
export const defaultRotationFormula = '10*sin(i/2)';
export const defaultXPositionFormula = '400';
export const defaultYPositionFormula = '400';
const icon = (icon, width = '22', height = '22') => ({ icon, width, height })

export const appState = {
  scaleFormula: currentStateFromQuery.sf || defaultScaleFormula,
  rotationFormula: currentStateFromQuery.rf || defaultRotationFormula,
  customPath: currentStateFromQuery.customPath || '',
  xPositionFormula:
    currentStateFromQuery.xpos !== undefined
      ? String(currentStateFromQuery.xpos)
      : defaultXPositionFormula,
  yPositionFormula:
    currentStateFromQuery.ypos !== undefined
      ? String(currentStateFromQuery.ypos)
      : defaultYPositionFormula,
  paper: {
    width: currentStateFromQuery.pwidth || 800,
    height: currentStateFromQuery.pheight  || 800,
    color: currentStateFromQuery.pcolor || null,
  },
  seed: {
    value: currentStateFromQuery.seed || 10,
  },
  angle: {
    leftIcon: icon('angle-short'),
    rightIcon: icon('angle-wide'),
    min: currentStateFromQuery.mina || 0,
    max: currentStateFromQuery.maxa || 360,
  },
  sides: {
    leftIcon: icon('triangle-large'),
    rightIcon: icon('hexagon'),
    value: currentStateFromQuery.sd || 5,
  },
  quantity: {
    leftIcon: icon('square'),
    rightIcon: icon('squares'),
    value: currentStateFromQuery.qt || 25,
  },
  randomize: {
    value: currentStateFromQuery.rd || false,
  },
  roundness: {
    leftIcon: icon('line-sharp'),
    rightIcon: icon('line-curve'),
    value: currentStateFromQuery.rn || 0.8,
    enabled: true,
  },
  radius: {
    leftIcon: icon('triangle'),
    rightIcon: icon('triangle-large'),
    min: currentStateFromQuery.minrd || 20,
    max: currentStateFromQuery.maxrd || 50,
  },
  fill: {
    enabled: currentStateFromQuery.fe || false,
    startColor: currentStateFromQuery.fsc || '#ff0000',
    endColor: currentStateFromQuery.fec || '#0000ff',
  },
  stroke: {
    color: currentStateFromQuery.scolor || '#000000',
    width:
      currentStateFromQuery.swidth !== undefined
        ? String(currentStateFromQuery.swidth)
        : '0.4mm',
  },
  curve: {
    selected: currentStateFromQuery.cv || 'curveCardinalClosed',
    options: [
      { text: 'curveBasis', value: 'curveBasis' },
      { text: 'curveBasisClosed', value: 'curveBasisClosed' },
      { text: 'curveBasisOpen', value: 'curveBasisOpen' },
      { text: 'curveBumpX', value: 'curveBumpX' },
      { text: 'curveBumpY', value: 'curveBumpY' },
      { text: 'curveBundle', value: 'curveBundle' },
      { text: 'curveCardinal', value: 'curveCardinal' },
      { text: 'curveCardinalClosed', value: 'curveCardinalClosed' },
      { text: 'curveCardinalOpen', value: 'curveCardinalOpen' },
      { text: 'curveCatmullRom', value: 'curveCatmullRom' },
      { text: 'curveCatmullRomClosed', value: 'curveCatmullRomClosed' },
      { text: 'curveCatmullRomOpen', value: 'curveCatmullRomOpen' },
      { text: 'curveLinear', value: 'curveLinear' },
      { text: 'curveLinearClosed', value: 'curveLinearClosed' },
      { text: 'curveMonotoneX', value: 'curveMonotoneX' },
      { text: 'curveMonotoneY', value: 'curveMonotoneY' },
      { text: 'curveNatural', value: 'curveNatural' },
      { text: 'curveStep', value: 'curveStep' },
      { text: 'curveStepAfter', value: 'curveStepAfter' },
      { text: 'curveStepBefore', value: 'curveStepBefore' },
    ],
  },
};
