<template>
  <div class="d-flex" id="wrapper">
    <!-- Sidebar -->
    <div id="sidebar-wrapper">
      <div class="sidebar-heading text-center mt-3 mb-3"><h2>Twisted Polygons</h2></div>
      <slider :left-icon="radius.leftIcon" :right-icon="radius.rightIcon" :step="0.1" :min="0" :max="100" label="Radius" v-model.number="radius.value"></slider>
      <slider :left-icon="sides.leftIcon" :right-icon="sides.rightIcon" :min="3" :max="12" label="Sides" v-model.number="sides.value"></slider>
      <slider :left-icon="quantity.leftIcon" :right-icon="quantity.rightIcon" :min="1" :max="100" label="Quantity" v-model.number="quantity.value"></slider>
      <slider :left-icon="roundness.leftIcon" :right-icon="roundness.rightIcon" :step="0.1" :min="-2" :max="2" label="Roundness" v-model.number="roundness.value"></slider>
      <slider :left-icon="startAngle.leftIcon" :right-icon="startAngle.rightIcon" :step="1" :min="0" :max="360" label="Starting Angle" v-model.number="startAngle.value"></slider>
      <text-input label="Scale Formula" @reset="resetScaleFormula" v-model="scaleFormula"></text-input>
      <text-input label="Rotation Formula" @reset="resetRotationFormula" v-model="rotationFormula"></text-input>
      <text-input label="X Position Formula" @reset="resetXPositionFormula" v-model="xPositionFormula"></text-input>
      <text-input label="Y Position Formula" @reset="resetYPositionFormula" v-model="yPositionFormula"></text-input>
      <select-field label="Curve Options" v-model="curve.selected" :options="curve.options"></select-field>
      <div class="container mt-3">
        <div class="row">
          <div class="col-12">
            <button class="btn btn-primary btn-block" @click.prevent="download">
              Download SVG
            </button>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-12">
            <div class="credits text-center"><p>
              Project by <a target="_blank" href="http://twitter.com/msurguy">@msurguy</a> (<span class="fa fa-github"></span><a target="_blank" href="http://github.com/msurguy/polygon-tool">Source</a>)</p>
            </div>
          </div>

        </div>
      </div>
    </div>
    <!-- /#sidebar-wrapper -->

    <!-- Page Content -->
    <div id="page-content-wrapper">
      <div class="container-fluid">
        <div id="paper">
          <Polygons
            :scale-formula="scaleFormula"
            :xPositionFormula="xPositionFormula"
            :yPositionFormula="yPositionFormula"
            :rotationFormula="rotationFormula"
            :start-angle="startAngle.value"
            :radius="radius.value"
            :sides="sides.value"
            :roundness="roundness.value"
            :quantity="quantity.value"
            :curve="curve.selected">
          </Polygons>
        </div>
      </div>
    </div>
    <!-- /#page-content-wrapper -->
  </div>
</template>

<script>
import Polygons from './components/Polygons'
import Slider from './components/Slider'
import TextInput from './components/TextInput'
import SelectField from './components/SelectField'
import { eventBus } from '@/main'

function initialData () {
  return {
    scaleFormula: 'i+i*7',
    rotationFormula: '10*Math.sin(i/2)',
    xPositionFormula: '0',
    yPositionFormula: '0',
    startAngle: {
      leftIcon: {
        icon: 'angle-short',
        width: '22',
        height: '22'
      },
      rightIcon: {
        icon: 'angle-wide',
        width: '22',
        height: '22'
      },
      value: 0
    },
    sides: {
      leftIcon: {
        icon: 'triangle-large',
        width: '22',
        height: '22'
      },
      rightIcon: {
        icon: 'hexagon',
        width: '22',
        height: '22'
      },
      value: 5
    },
    quantity: {
      leftIcon: {
        icon: 'square',
        width: '22',
        height: '22'
      },
      rightIcon: {
        icon: 'squares',
        width: '22',
        height: '22'
      },
      value: 10
    },
    roundness: {
      leftIcon: {
        icon: 'line-sharp',
        width: '22',
        height: '22'
      },
      rightIcon: {
        icon: 'line-curve',
        width: '22',
        height: '22'
      },
      value: 0.8
    },
    radius: {
      leftIcon: {
        icon: 'triangle',
        width: '12',
        height: '12'
      },
      rightIcon: {
        icon: 'triangle-large',
        width: '22',
        height: '22'
      },
      value: 20
    },
    curve: {
      selected: 'curveCardinalClosed',
      options: [
        {text: 'curveCardinalClosed', value: 'curveCardinalClosed'},
        {text: 'curveLinearClosed', value: 'curveLinearClosed'},
        {text: 'curveBasisClosed', value: 'curveBasisClosed'},
        {text: 'curveCatmullRomClosed', value: 'curveCatmullRomClosed'},
        {text: 'curveNatural', value: 'curveNatural'},
        {text: 'curveBundle', value: 'curveBundle'},
        {text: 'curveLinear', value: 'curveLinear'},
        {text: 'curveStep', value: 'curveStep'},
        {text: 'curveCardinal', value: 'curveCardinal'},
        {text: 'curveBasis', value: 'curveBasis'},
        {text: 'curveBasisOpen', value: 'curveBasisOpen'},
        {text: 'curveCardinalOpen', value: 'curveCardinalOpen'},
        {text: 'curveCatmullRom', value: 'curveCatmullRom'},
        {text: 'curveCatmullRomOpen', value: 'curveCatmullRomOpen'},
        {text: 'curveMonotoneX', value: 'curveMonotoneX'}
      ]
    }
  }
}

export default {
  name: 'App',
  components: {
    Polygons,
    Slider,
    TextInput,
    SelectField
  },
  data () {
    return initialData()
  },
  methods: {
    resetScaleFormula () {
      this.scaleFormula = initialData().scaleFormula
    },
    resetRotationFormula () {
      this.rotationFormula = initialData().rotationFormula
    },
    resetXPositionFormula () {
      this.xPositionFormula = initialData().xPositionFormula
    },
    resetYPositionFormula () {
      this.yPositionFormula = initialData().yPositionFormula
    },
    download () {
      eventBus.$emit('download')
    }
  }
}
</script>

<style>
  #wrapper {
    flex-direction: column;
  }

  #page-content-wrapper {
    width: 100%;
    background-color: #C5C5C5;
  }

  @media (min-width: 768px) {
    #wrapper {
      flex-direction: row;
    }

    #sidebar-wrapper {
      min-height: 100vh;
      width: 300px;
      min-width: 300px;
    }
  }
</style>
