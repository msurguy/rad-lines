<template>
  <svg ref="renderedPolygons" :width="width" :height="height" title="polygons" version="1.1" :viewBox="`0 0 ${width} ${height}`" xmlns="http://www.w3.org/2000/svg">
    <g :transform="radial ? `translate(${width/2}, ${height/2})` : 'translate(0, 0)' ">
    <desc>sf:{{scaleFormula}};rf:{{rotationFormula}};xf:{{xPositionFormula}};yf:{{yPositionFormula}};qt:{{quantity}};sd:{{sides}};rn:{{roundness}};minrd:{{minRadius}};maxrd:{{maxRadius}};mina:{{minAngle}};maxa:{{maxAngle}};cv:{{curve}};rd:{{radial}}</desc>
      <closed-polyline v-for="(polygon, index) in polygons" :roundness="roundness" :key="index" :lineData="polygon" :curve="curve" :radial="radial"></closed-polyline>
    </g>
  </svg>
</template>

<script>
/* eslint-disable standard/object-curly-even-spacing,no-new-func */
import {eventBus} from '@/main'
import ClosedPolyline from './ClosedPolyline'
const math = require('mathjs-expression-parser')

let seed = 2

let seededRandom = () => {
  let x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

let randomInRange = (min, max) => {
  return seededRandom() * (max - min) + min
}

let generatePoints = (maxAngle, minRadius, maxRadius, breaks) => {
  let points = []
  const slice = degreesToRadians(maxAngle) / breaks

  for (let i = 0; i <= breaks; i++) {
    const point = [ i * slice, randomInRange(minRadius, maxRadius) ]
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
    radial: {
      type: Boolean,
      deafult: false
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
    radial () {
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
    scaleFunc (x) {
      function generateFunc (form) {
        return `function sizeEquation(i) {  return ${form}}`
      }

      function compileFunction (code) {
        try {
          let creator = new Function(code + '\n return sizeEquation')
          return creator()
        } catch (e) {
        }
      }
      try {
        let myFunc = compileFunction(generateFunc(this.scaleFormula))
        return myFunc(x)
      } catch (e) {
      }
    },
    xPositionFunc (x) {
      function generateFunc (form) {
        return `function xPosEquation(i) {  return ${form}}`
      }

      function compileFunction (code) {
        try {
          let creator = new Function(code + '\n return xPosEquation')
          return creator()
        } catch (e) {
        }
      }

      try {
        let myFunc = compileFunction(generateFunc(this.xPositionFormula))
        return myFunc(x)
      } catch (e) {
      }
    },
    yPositionFunc (x) {
      function generateFunc (form) {
        return `function yPosEquation(i) {  return ${form}}`
      }

      function compileFunction (code) {
        try {
          let creator = new Function(code + '\n return yPosEquation')
          return creator()
        } catch (e) {
        }
      }

      try {
        let myFunc = compileFunction(generateFunc(this.yPositionFormula))
        return myFunc(x)
      } catch (e) {
      }
    },
    rotationFunc (x) {
      function generateFunc (rotation) {
        return `function rotationEquation(i) {  return ${rotation}}`
      }

      function compileFunction (code) {
        try {
          let creator = new Function(code + '\n return rotationEquation')
          return creator()
        } catch (e) {
        }
      }

      try {
        let myFunc = compileFunction(generateFunc(this.rotationFormula))
        return myFunc(x)
      } catch (e) {
      }
    },
    generatePolygonData () {
      this.polygons = []
      let originalPoints = this.radial ? generatePoints(this.maxAngle, this.minRadius, this.maxRadius, this.sides) : []
      for (let i = 0; i < this.quantity; i++) {
        try {
          if (this.radial) {
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
      svgString = svgString.replace(/([+]?\d+\.\d{3,}([eE][+]?\d+)?)/g, (x) => (+x).toFixed(1)
      )
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
