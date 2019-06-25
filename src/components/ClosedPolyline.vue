<template>
  <path stroke="#000000" stroke-width="0.4mm" fill="none" :d="line"></path>
</template>

<script>
import {
  line, radialLine, curveCardinalClosed,
  curveBundle, curveLinear, curveLinearClosed, curveBasis,
  curveBasisOpen, curveBasisClosed, curveCardinal,
  curveCardinalOpen, curveCatmullRom, curveCatmullRomClosed,
  curveCatmullRomOpen, curveNatural, curveMonotoneX, curveStep
} from 'd3'

export default {
  name: 'ClosedPolyline',
  props: {
    lineData: {
      type: Array,
      default: function () {
        return []
      }
    },
    roundness: {
      type: Number,
      default: 0.8
    },
    curve: {
      type: String,
      default: 'curveCardinalClosed'
    },
    radial: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    line () {
      const path = this.radial ? radialLine()
        .curve(this.getCurve(this.curve)) : line()
        .curve(this.getCurve(this.curve))
      return path(this.lineData)
    }
  },
  methods: {
    getCurve (curveName) {
      switch (curveName) {
        case 'curveCardinalClosed':
          return curveCardinalClosed.tension(this.roundness)
        case 'curveLinear':
          return curveLinear
        case 'curveBasis':
          return curveBasis
        case 'curveMonotoneX':
          return curveMonotoneX
        case 'curveStep':
          return curveStep
        case 'curveBundle':
          return curveBundle.beta(this.roundness)
        case 'curveLinearClosed':
          return curveLinearClosed
        case 'curveBasisOpen':
          return curveBasisOpen
        case 'curveBasisClosed':
          return curveBasisClosed
        case 'curveCardinal':
          return curveCardinal.tension(this.roundness)
        case 'curveCardinalOpen':
          return curveCardinalOpen.tension(this.roundness)
        case 'curveCatmullRom':
          return curveCatmullRom.alpha(this.roundness)
        case 'curveCatmullRomClosed':
          return curveCatmullRomClosed.alpha(this.roundness)
        case 'curveCatmullRomOpen':
          return curveCatmullRomOpen.alpha(this.roundness)
        case 'curveNatural':
          return curveNatural
      }
    }
  }
}
</script>
