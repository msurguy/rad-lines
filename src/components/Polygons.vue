<template>
  <svg ref="renderedPolygons" class="svg-paper" :width="width" :height="height" title="polygons" version="1.1" :viewBox="`0 0 ${width} ${height}`" xmlns="http://www.w3.org/2000/svg">
    <rect v-if="paperColorEnabled" :width="width" :height="height" :fill="paperColor"></rect>
    <g :transform="randomize ? `translate(${width/2}, ${height/2})` : false ">
    <desc>pwidth:{{width}};pheight:{{height}};pcolor:{{paperColor}};seed:{{seed}}};sf:{{scaleFormula}};rf:{{rotationFormula}};xf:{{xPositionFormula}};yf:{{yPositionFormula}};qt:{{quantity}};sd:{{sides}};rn:{{roundness}};minrd:{{minRadius}};maxrd:{{maxRadius}};mina:{{minAngle}};maxa:{{maxAngle}};cv:{{curve}};rd:{{randomize}}</desc>
      <closed-polyline v-for="(polygon, index) in polygons" :roundness="roundness" :key="index" :lineData="polygon.points" :fill="polygon.fill" :curve="curve" :randomize="randomize" :stroke-width="strokeWidth" :stroke-color="strokeColor"></closed-polyline>
    </g>
  </svg>
</template>

<script>
/* eslint-disable standard/object-curly-even-spacing,no-new-func */
import {eventBus} from '@/main'
import ClosedPolyline from './ClosedPolyline.vue'
import downloadSVG from 'svg-file-downloader';
import math from '../lib/math';
import Randoma from 'randoma';

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

let lerpColor = (hex1, hex2, t) => {
  const r1 = parseInt(hex1.slice(1,3), 16), g1 = parseInt(hex1.slice(3,5), 16), b1 = parseInt(hex1.slice(5,7), 16)
  const a1 = hex1.length > 7 ? parseInt(hex1.slice(7,9), 16) : 255
  const r2 = parseInt(hex2.slice(1,3), 16), g2 = parseInt(hex2.slice(3,5), 16), b2 = parseInt(hex2.slice(5,7), 16)
  const a2 = hex2.length > 7 ? parseInt(hex2.slice(7,9), 16) : 255
  const r = Math.round(r1 + (r2 - r1) * t), g = Math.round(g1 + (g2 - g1) * t), b = Math.round(b1 + (b2 - b1) * t)
  const a = Math.round(a1 + (a2 - a1) * t)
  if (a < 255) {
    return '#' + [r, g, b, a].map(c => c.toString(16).padStart(2, '0')).join('')
  }
  return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('')
}

let getPathPoints = (pathStr, numPoints = 100) => {
  // Create a temporary SVG and path element.
  const tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const tempPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  tempPath.setAttribute("d", pathStr);
  tempSvg.appendChild(tempPath);
  document.body.appendChild(tempSvg); // attach so that getTotalLength works reliably

  const pathLength = tempPath.getTotalLength();
  let points = [];
  for (let i = 0; i < numPoints; i++) {
    const pt = tempPath.getPointAtLength(pathLength * i / (numPoints - 1));
    points.push([pt.x, pt.y]);
  }
  document.body.removeChild(tempSvg);
  return points;
};

// Applies a scale, rotation (in degrees), and translation (tx, ty) to an array of Cartesian points.
let transformCustomPathPoints = (points, scale, rotation, tx, ty) => {
  const rad = rotation * (Math.PI / 180);
  return points.map(p => {
    // First scale the point.
    let xScaled = p[0] * scale;
    let yScaled = p[1] * scale;
    // Then rotate it.
    let xRotated = xScaled * Math.cos(rad) - yScaled * Math.sin(rad);
    let yRotated = xScaled * Math.sin(rad) + yScaled * Math.cos(rad);
    // Finally, translate it.
    return [xRotated + tx, yRotated + ty];
  });
};

export default {
  name: 'Polygons',
  components: {
    ClosedPolyline
  },
  props: {
    customPath: {
      type: String,
      default: ''
    },
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
    },
    fillEnabled: {
      type: Boolean,
      default: false
    },
    fillStartColor: {
      type: String,
      default: '#ff0000'
    },
    fillEndColor: {
      type: String,
      default: '#0000ff'
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
    },
    customPath() {
      this.generatePolygonData();
    },
    fillEnabled () {
      this.generatePolygonData()
    },
    fillStartColor () {
      this.generatePolygonData()
    },
    fillEndColor () {
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
    this.polygons = [];
    math.config({randomSeed: this.seed});

    const getFill = (i) => {
      if (!this.fillEnabled) return 'none'
      const t = this.quantity <= 1 ? 0 : i / (this.quantity - 1)
      return lerpColor(this.fillStartColor, this.fillEndColor, t)
    }

    if (this.customPath && this.customPath.trim() !== "") {
      // Custom path branch:
      const basePoints = getPathPoints(this.customPath, 100); // sample 100 points along the path
      for (let i = this.quantity - 1; i >= 0; i--) {
        try {
          // Evaluate transformation formulas for instance i.
          const scaleVal    = math.evaluate(this.scaleFormula, { i: i });
          const rotationVal = math.evaluate(this.rotationFormula, { i: i });
          const tx          = math.evaluate(this.xPositionFormula, { i: i });
          const ty          = math.evaluate(this.yPositionFormula, { i: i });
          // Transform the sampled points from the custom path.
          const transformedPoints = transformCustomPathPoints(basePoints, scaleVal, rotationVal, tx, ty);

          this.polygons.push({ points: transformedPoints, fill: getFill(i) });
        } catch (e) {
          console.log(e);
        }
      }
    } else {
      // Existing polygon generation logic.
      let originalPoints = this.randomize
          ? generatePoints(this.seed, this.maxAngle, this.minRadius, this.maxRadius, this.sides)
          : [];
      for (let i = this.quantity - 1; i >= 0; i--) {
        try {
          if (this.randomize) {
            this.polygons.push({
              points: transformPoints(
                originalPoints,
                math.evaluate(this.scaleFormula, { i: i }),
                this.minAngle + math.evaluate(this.rotationFormula, { i: i})
              ),
              fill: getFill(i)
            });
          } else {
            this.polygons.push({
              points: this.createPolygon(
                math.evaluate(this.xPositionFormula, { i: i }),
                math.evaluate(this.yPositionFormula, { i: i }),
                this.sides,
                this.minRadius + math.evaluate(this.scaleFormula, { i: i }),
                this.minAngle + math.evaluate(this.rotationFormula, { i: i }),
                this.maxAngle
              ),
              fill: getFill(i)
            });
          }
        } catch (e) {
          console.log(e);
        }
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
