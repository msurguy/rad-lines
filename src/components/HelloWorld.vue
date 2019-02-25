<template>
  <svg width="100" height="100"><path stroke-width="2" stroke="#CCCCCC" :d="_d"></path> </svg>
</template>

<script>
// import _ from 'lodash'
import * as d3 from 'd3-shape'

export default {
  name: 'HelloWorld',
  data () {
    return {}
  },
  props: {
    dataset: {
      type: Array,
      default () {
        return [[12, 50], [40, 70], [50, 10], [80, 30], [143, 90], [180, 20]]
      }
    },
    xGetter: {
      type: Function,
      default: v => v[0]
    },
    yGetter: {
      type: Function,
      default: v => v[1]
    },
    curve: {
      type: Function,
      default: d3.curveLinear
    }
  },
  computed: {
    _d () {
      return (
        d3
          .line()
          // .curve(curveCardinal)
          .curve(this.curve)
          .x(this.xGetter)
          .y(this.yGetter)(this.dataset)
      )
    }
  }
}
</script>

<style scoped lang="scss">
  path {
    fill: none;
    stroke: #fff;
  }
</style>
