<template>
  <svg ref="renderedPolygons" class="svg-paper" :width="width" :height="height" title="polygons" version="1.1" :viewBox="`0 0 ${width} ${height}`" xmlns="http://www.w3.org/2000/svg">
    <rect v-if="paperColorEnabled" :width="width" :height="height" :fill="paperColor"></rect>
    <g :transform="randomize ? `translate(${width/2}, ${height/2})` : false ">
    <desc>pwidth:{{width}};pheight:{{height}};pcolor:{{paperColor}};seed:{{seed}}};sf:{{scaleFormula}};rf:{{rotationFormula}};xf:{{xPositionFormula}};yf:{{yPositionFormula}};qt:{{quantity}};sd:{{sides}};rn:{{roundness}};minrd:{{minRadius}};maxrd:{{maxRadius}};mina:{{minAngle}};maxa:{{maxAngle}};cv:{{curve}};rd:{{randomize}}</desc>
      <closed-polyline v-for="(polygon, index) in polygons" :roundness="roundness" :key="index" :lineData="polygon.points" :curve="curve" :randomize="randomize" :stroke-width="strokeWidth" :stroke-color="strokeColor" :fill="polygon.fill"></closed-polyline>
    </g>
  </svg>
</template>

<script>
/* eslint-disable standard/object-curly-even-spacing,no-new-func */
import {eventBus} from '@/main'
import ClosedPolyline from './ClosedPolyline'
import {
  scaleSequential, //, interpolateSpectral, interpolateRdYlGn, interpolateGreys, interpolatePlasma, interpolateCool,
  interpolateRainbow
} from 'd3'

const downloadSVG = require('svg-file-downloader')
const math = require('../lib/math').default
const Randoma = require('randoma')

let generatePoints = (seed, maxAngle, minRadius, maxRadius, breaks) => {
  const random = new Randoma({seed: seed})

  let points = []
  const slice = degreesToRadians(maxAngle) / breaks

  for (let i = 0; i <= breaks; i++) {
    const point = [ i * slice, random.integerInRange(minRadius, maxRadius) ]
    points.push(point)
  }
  points[0][1] = points[points.length - 1][1]

  return points
}

let transformPoints = (points, scaleIncrement, rotationIncrement) => {
  return points.map((point) => {
    return [degreesToRadians(rotationIncrement) + point[0], scaleIncrement + point[1]]
  })
}

let degreesToRadians = (degrees) => {
  return degrees * (Math.PI / 180)
}

export default {
  name: 'Polygons',
  components: {
    ClosedPolyline
  },
  props: {
    scaleFormula: {
      type: String,
      default: 'i*i/2'
    },
    rotationFormula: {
      type: String,
      default: '10 * sin(i * pi / 9)'
    },
    paperColor: {
      type: String,
      default: '#CCCCCC'
    },
    paperColorEnabled: {
      type: Boolean,
      default: true
    },
    strokeColor: {
      type: String,
      default: '#000000'
    },
    strokeWidth: {
      type: String,
      default: '0.4mm'
    },
    xPositionFormula: {
      type: String,
      default: '400'
    },
    yPositionFormula: {
      type: String,
      default: '400'
    },
    width: {
      type: Number,
      default: 800
    },
    height: {
      type: Number,
      default: 800
    },
    quantity: {
      type: Number,
      default: 10
    },
    sides: {
      type: Number,
      default: 5
    },
    roundness: {
      type: Number,
      default: 0.8
    },
    minRadius: {
      type: Number,
      default: 20
    },
    maxRadius: {
      type: Number,
      default: 50
    },
    minAngle: {
      type: Number,
      default: 0
    },
    maxAngle: {
      type: Number,
      default: 360
    },
    x: {
      type: Number,
      default: 500
    },
    y: {
      type: Number,
      default: 500
    },
    curve: {
      type: String,
      default: 'curveCardinalClosed'
    },
    randomize: {
      type: Boolean,
      default: false
    },
    seed: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      polygons: []
    }
  },
  created () {
    eventBus.$on('download', () => {
      downloadSVG(this.$refs.renderedPolygons, 2, 'rad-lines' + Date.now() + '.svg', true)
    })
  },
  watch: {
    x () {
      this.generatePolygonData()
    },
    y () {
      this.generatePolygonData()
    },
    minAngle () {
      this.generatePolygonData()
    },
    maxAngle () {
      this.generatePolygonData()
    },
    minRadius () {
      this.generatePolygonData()
    },
    maxRadius () {
      this.generatePolygonData()
    },
    sides () {
      this.generatePolygonData()
    },
    quantity () {
      this.generatePolygonData()
    },
    width () {
      this.generatePolygonData()
    },
    height () {
      this.generatePolygonData()
    },
    scaleFormula () {
      this.generatePolygonData()
    },
    rotationFormula () {
      this.generatePolygonData()
    },
    xPositionFormula () {
      this.generatePolygonData()
    },
    yPositionFormula () {
      this.generatePolygonData()
    },
    randomize () {
      this.generatePolygonData()
    },
    seed () {
      this.generatePolygonData()
    },
    strokeWidth () {
      this.generatePolygonData()
    },
    strokeColor () {
      this.generatePolygonData()
    }
  },
  methods: {
    createPolygon (x, y, numOfSides, radius, minAngle, maxAngle) {
      let arr = []
      let xo
      let yo
      for (let i = 0; i < numOfSides; i++) {
        let t = (degreesToRadians(maxAngle) / numOfSides * i) + minAngle * (Math.PI / 180)
        xo = x + radius * Math.sin(t)
        yo = y + radius * Math.cos(t)
        arr.push([xo, yo])
      }
      return arr
    },
    generatePolygonData () {
      this.polygons = []
      math.config({randomSeed: this.seed})
      const color = scaleSequential(interpolateRainbow).domain([0, this.quantity])
      let originalPoints = this.randomize ? generatePoints(this.seed, this.maxAngle, this.minRadius, this.maxRadius, this.sides) : []
      for (let i = this.quantity; i > 0; i--) {
        try {
          if (this.randomize) {
            this.polygons.push({
              fill: color(i),
              points: transformPoints(originalPoints, math.eval(this.scaleFormula, { i: i}), this.minAngle + math.eval(this.rotationFormula, { i: i}))})
          } else {
            this.polygons.push({
              fill: color(i),
              points: this.createPolygon(math.eval(this.xPositionFormula, { i: i}), math.eval(this.yPositionFormula, { i: i}), this.sides, this.minRadius + math.eval(this.scaleFormula, { i: i}), this.minAngle + math.eval(this.rotationFormula, { i: i}), this.maxAngle)})
          }
        } catch (e) {
          console.log(e)
        }
      }
    }
  },
  mounted () {
    this.generatePolygonData()
  }
}
</script>

<style lang="scss">
  .svg-paper {
    @media (max-width: 767px) {
      width: 100%;
      height: 100%;
    }
  }
</style>
