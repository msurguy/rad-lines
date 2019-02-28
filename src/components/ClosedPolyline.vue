<template>
  <path stroke="#000000" stroke-width="0.4mm" fill="none" :d="line"></path>
</template>

<script>
import { line, curveCardinalClosed } from 'd3'

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
    }
  },
  computed: {
    line () {
      const path = line()
        .x(d => d[0])
        .y(d => d[1])
        .curve(curveCardinalClosed.tension(this.roundness))
      return path(this.lineData)
    }
  }
}
</script>
