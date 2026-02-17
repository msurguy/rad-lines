<template>
  <path :stroke="strokeColor" :stroke-width="strokeWidth" :fill="fill" :d="line"></path>
</template>
<script>
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

export default {
  name: 'ClosedPolyline',
  props: {
    lineData: { type: Array, default: () => [] },
    roundness: { type: Number, default: 0.8 },
    curve: { type: String, default: 'curveCardinalClosed' },
    randomize: { type: Boolean, default: false },
    strokeColor: { type: String, default: '#000000' },
    strokeWidth: { default: '0.4mm' },
    fill: { type: String, default: 'none' }
  },
  computed: {
    line() {
      const path = this.randomize ? radialLine() : line()
      // Get the curve function from our map.
      const selected = curveMap[this.curve]
      const curveFn = typeof selected === 'function' && this.curve.indexOf('curveBundle') !== -1 ||
                      this.curve.indexOf('curveCardinal') !== -1 ||
                      this.curve.indexOf('curveCatmullRom') !== -1
                        ? selected(this.roundness)
                        : selected
      if (!curveFn) {
        console.warn(`Unknown curve type: ${this.curve}. Defaulting to curveLinear.`)
        return path.curve(curveLinear)(this.lineData)
      }
      return path.curve(curveFn)(this.lineData)
    }
  }
}
</script>
