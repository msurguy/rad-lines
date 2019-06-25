<template>
  <div class="page">
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="controls-wrapper">
        <div class="controls">
          <toggle label="Randomize Edges" v-model="mode.value"></toggle>
          <slider :left-icon="radius.leftIcon" :right-icon="radius.rightIcon" :step="1" :min="0" :max="300" label="Min Radius" v-model.number="radius.min"></slider>
          <transition name="slide">
            <slider v-if="mode.value" :left-icon="radius.leftIcon" :right-icon="radius.rightIcon" :step="1" :min="0" :max="300" label="Max Radius" v-model.number="radius.max"></slider>
          </transition>
          <slider :left-icon="sides.leftIcon" :right-icon="sides.rightIcon" :min="3" :max="mode.value ? 200 : 14" label="Sides" v-model.number="sides.value"></slider>
          <slider :left-icon="quantity.leftIcon" :right-icon="quantity.rightIcon" :min="1" :max="100" label="Quantity" v-model.number="quantity.value"></slider>
          <slider :disabled="!roundness.enabled" :left-icon="roundness.leftIcon" :right-icon="roundness.rightIcon" :step="0.1" :min="-2" :max="2" label="Roundness" v-model.number="roundness.value"></slider>
          <slider :left-icon="angle.leftIcon" :right-icon="angle.rightIcon" :step="1" :min="0" :max="360" label="Starting Angle" v-model.number="angle.min"></slider>
          <slider :left-icon="angle.leftIcon" :right-icon="angle.rightIcon" :step="1" :min="0" :max="360" label="Arc Extent" v-model.number="angle.max"></slider>
          <text-input label="Scale Formula" @reset="resetScaleFormula" v-model="scaleFormula"></text-input>
          <text-input label="Rotation Formula" @reset="resetRotationFormula" v-model="rotationFormula"></text-input>
          <transition name="slide">
            <div v-if="!mode.value" >
              <text-input label="X Position Formula" @reset="resetXPositionFormula" v-model="xPositionFormula"></text-input>
              <text-input label="Y Position Formula" @reset="resetYPositionFormula" v-model="yPositionFormula"></text-input>
            </div>
          </transition>
          <select-field label="Curve Options" v-model="curve.selected" :options="curve.options"></select-field>
        </div>
      </div>

      <div class="button">
        <div class="reveal"></div>
        <button class="btn btn-primary btn-block" @click.prevent="download">
          Download SVG
        </button>
      </div>
    </div>

    <!-- Page Content -->
    <div class="paper">
      <div class="sketch">
        <Polygons
          :scale-formula="scaleFormula"
          :xPositionFormula="xPositionFormula"
          :yPositionFormula="yPositionFormula"
          :rotationFormula="rotationFormula"
          :min-angle="angle.min"
          :max-angle="angle.max"
          :min-radius="radius.min"
          :max-radius="radius.max"
          :sides="sides.value"
          :roundness="roundness.value"
          :quantity="quantity.value"
          :curve="curve.selected"
          :radial="mode.value">
        </Polygons>
      </div>
    </div>
    <div class="footer-wrapper">
        <div class="footer">
          <h1>Rad Lines</h1>
          <p>Project by <a target="_blank" href="http://twitter.com/msurguy">@msurguy</a> (<a target="_blank" href="http://github.com/msurguy/rad-lines">Source</a>)</p>
        </div>
      </div>
  </div>
</template>

<script>
import Polygons from './components/Polygons'
import Slider from './components/Slider'
import TextInput from './components/TextInput'
import Toggle from './components/Toggle'
import SelectField from './components/SelectField'
import { eventBus } from '@/main'

function initialData () {
  return {
    scaleFormula: 'i+i*7',
    rotationFormula: '10*Math.sin(i/2)',
    xPositionFormula: '400',
    yPositionFormula: '400',
    angle: {
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
      min: 0,
      max: 360
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
    mode: {
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
      value: false
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
      value: 0.8,
      enabled: true
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
      min: 20,
      max: 50
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
    SelectField,
    Toggle
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
  },
  watch: {
    'curve.selected' (curveType) {
      const roundnessCurveTypes = ['curveCardinalClosed', 'curveBundle', 'curveCardinal', 'curveCardinalOpen', 'curveCatmullRom', 'curveCatmullRomClosed', 'curveCatmullRomOpen']
      this.roundness.enabled = roundnessCurveTypes.indexOf(curveType) >= 0
    }
  }
}
</script>

<style scoped>
  .page {
    position: relative;
    height: 100%;
    display: flex;
  }

  .controls {
    background-color: grey;
    width: 100%;
    margin-bottom: 50px;
  }

  .controls-wrapper {
    max-height: 100vh;
    overflow: scroll;
  }

  .button {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
  }

  .reveal {
    display: block;
    height: 15px;
    background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgb(47, 47, 47) 100%);
  }

  .paper {
    background-color: #dedede;
    position: relative;
    max-height: 100vh;
    width: calc(100% - 300px);
    overflow: scroll;
  }

  .sidebar {
    width: 300px;
    position: relative;
  }

  .footer-wrapper {
    position: absolute;
    bottom: 0;
    right: 0;
    color: #2D2D2D;
  }

  .footer {
    padding: 15px 15px 0 15px;
    text-align: right;
  }

  @media (max-width: 767px) {
    .page {
      flex-direction: column;
    }

    .controls-wrapper {
      max-height: none;
    }

    .sidebar {
      width: 100%;
    }

    .paper {
      width: 100%;
      max-height: none;
    }

    .footer-wrapper {
      position: relative;
    }
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: all 300ms ease-in-out;
  }
  .slide-enter-to,
  .slide-leave {
    max-height: 200px;
    opacity: 1;
    overflow: hidden;
  }
  .slide-enter,
  .slide-leave-to {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
  }
</style>
