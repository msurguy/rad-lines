<template>
  <path stroke="#CCC" stroke-width="2" fill="none" :d="line"></path>
</template>

<script>
import { line, curveCardinalClosed } from 'd3'

export default {
  name: 'ClosedPolyline',
  props: ['lineData'],
  data () {
    return {
    }
  },
  computed: {
    line () {
      const path = line()
        .x(d => d[0])
        .y(d => d[1])
        .curve(curveCardinalClosed.tension(0.4))
      return path(this.lineData)
    }
  }
}
</script>

<style scoped>

</style>
