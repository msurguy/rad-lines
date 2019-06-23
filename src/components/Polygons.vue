<template>
  <div class="paper">
    <svg ref="renderedPolygons" width="800" height="800" title="polygons" version="1.1" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <g>
        <desc>sf:{{scaleFormula}};rf:{{rotationFormula}};qt:{{quantity}};sd:{{sides}};rn:{{roundness}};rd:{{radius}};sa:{{startAngle}};</desc>
        <closed-polyline v-for="(polygon, index) in polygons" :roundness="roundness" :key="index" :lineData="polygon" :curve="curve"></closed-polyline>
      </g>
    </svg>
  </div>
</template>

<script>
/* eslint-disable standard/object-curly-even-spacing,no-new-func */
import {eventBus} from '@/main'
import ClosedPolyline from './ClosedPolyline'

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
      default: '10 * Math.sin(i * Math.PI / 9)'
    },
    xPositionFormula: {
      type: String,
      default: '500'
    },
    yPositionFormula: {
      type: String,
      default: '500'
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
    radius: {
      type: Number,
      default: 20
    },
    startAngle: {
      type: Number,
      default: 0
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
    startAngle () {
      this.generatePolygonData()
    },
    radius () {
      this.generatePolygonData()
    },
    roundness () {
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
    }
  },
  methods: {
    createPolygon (x, y, numOfSides, radius, startAngle) {
      let arr = []
      let xo
      let yo
      for (let i = 0; i < numOfSides; i++) {
        let t = (2 * Math.PI / numOfSides * i) + startAngle * (Math.PI / 180)
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
      for (let i = 0; i < this.quantity; i++) {
        this.polygons.push(this.createPolygon(this.xPositionFunc(i), this.yPositionFunc(i), this.sides, this.radius + this.scaleFunc(i), this.startAngle + this.rotationFunc(i)))
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

<style scoped>
.paper {
  display: block;
}
</style>
