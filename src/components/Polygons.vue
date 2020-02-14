<template>
  <svg ref="renderedPolygons" class="svg-paper" :width="width" :height="height" title="polygons" version="1.1" :viewBox="`0 0 ${width} ${height}`" xmlns="http://www.w3.org/2000/svg">
    <g :transform="randomize ? `translate(${width/2}, ${height/2})` : 'translate(0, 0)' ">
    <desc>pwidth:{{width}};pheight:{{height}};pcolor:{{color}};seed:{{seed}}};sf:{{scaleFormula}};rf:{{rotationFormula}};xf:{{xPositionFormula}};yf:{{yPositionFormula}};qt:{{quantity}};sd:{{sides}};rn:{{roundness}};minrd:{{minRadius}};maxrd:{{maxRadius}};mina:{{minAngle}};maxa:{{maxAngle}};cv:{{curve}};rd:{{randomize}}</desc>
      <closed-polyline v-for="(polygon, index) in polygons" :roundness="roundness" :key="index" :lineData="polygon" :curve="curve" :randomize="randomize" :stroke-width="strokeWidth" :stroke-color="strokeColor"></closed-polyline>
    </g>
  </svg>
</template>

<script>
/* eslint-disable standard/object-curly-even-spacing,no-new-func */
import {eventBus} from '@/main'
import ClosedPolyline from './ClosedPolyline'

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
      default: '#CCC'
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
      this.downloadSVG()
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
      let originalPoints = this.randomize ? generatePoints(this.seed, this.maxAngle, this.minRadius, this.maxRadius, this.sides) : []
      for (let i = 0; i < this.quantity; i++) {
        try {
          if (this.randomize) {
            this.polygons.push(transformPoints(originalPoints, math.eval(this.scaleFormula, { i: i}), this.minAngle + math.eval(this.rotationFormula, { i: i})))
          } else {
            this.polygons.push(this.createPolygon(math.eval(this.xPositionFormula, { i: i}), math.eval(this.yPositionFormula, { i: i}), this.sides, this.minRadius + math.eval(this.scaleFormula, { i: i}), this.minAngle + math.eval(this.rotationFormula, { i: i}), this.maxAngle))
          }
        } catch (e) {
          console.log(e)
        }
      }
    },
    downloadSVG () {
      const svgDoctype = '<?xml version="1.0" standalone="no"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'

      // serialize our SVG XML to a string.
      let svgString = (new XMLSerializer()).serializeToString(this.$refs.renderedPolygons)

      // reduce the SVG path by cutting off floating point values after the first digit beyond floating point (~50% less MBs)
      svgString = svgString.replace(/([+]?\d+\.\d{3,}([eE][+]?\d+)?)/g, (x) => (+x).toFixed(1))
      // remove Vue's data IDs
      svgString = svgString.replace(/ data-v-([0-9a-z]){8}=""/g, () => '')

      const blob = new Blob([svgDoctype + svgString], {type: 'image/svg+xml;charset=utf-8'})

      /* This portion of script saves the file to local filesystem as a download */
      let svgUrl = URL.createObjectURL(blob)

      const downloadLink = document.createElement('a')
      downloadLink.href = svgUrl
      downloadLink.download = 'polygons' + Date.now() + '.svg'
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
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
