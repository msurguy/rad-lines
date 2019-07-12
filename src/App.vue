<template>
  <div class="page">
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="controls-wrapper">
        <div class="controls">
          <toggle label="Randomize Edges" v-model="appState.randomize.value"></toggle>
          <slider :left-icon="appState.radius.leftIcon" :right-icon="appState.radius.rightIcon" :step="1" :min="0" :max="300" label="Min Radius" v-model.number="appState.radius.min"></slider>
          <transition name="slide">
            <slider v-if="appState.randomize.value" :left-icon="appState.radius.leftIcon" :right-icon="appState.radius.rightIcon" :step="1" :min="0" :max="300" label="Max Radius" v-model.number="appState.radius.max"></slider>
          </transition>
          <slider :left-icon="appState.sides.leftIcon" :right-icon="appState.sides.rightIcon" :min="3" :max="appState.randomize.value ? 200 : 14" label="Sides" v-model.number="appState.sides.value"></slider>
          <slider :left-icon="appState.quantity.leftIcon" :right-icon="appState.quantity.rightIcon" :min="1" :max="100" label="Quantity" v-model.number="appState.quantity.value"></slider>
          <slider :disabled="!appState.roundness.enabled" :left-icon="appState.roundness.leftIcon" :right-icon="appState.roundness.rightIcon" :step="0.1" :min="-2" :max="2" label="Roundness" v-model.number="appState.roundness.value"></slider>
          <slider :left-icon="appState.angle.leftIcon" :right-icon="appState.angle.rightIcon" :step="1" :min="0" :max="360" label="Starting Angle" v-model.number="appState.angle.min"></slider>
          <slider :left-icon="appState.angle.leftIcon" :right-icon="appState.angle.rightIcon" :step="1" :min="0" :max="360" label="Arc Extent" v-model.number="appState.angle.max"></slider>
          <text-input label="Scale Formula" @reset="resetScaleFormula" v-model="appState.scaleFormula"></text-input>
          <text-input label="Rotation Formula" @reset="resetRotationFormula" v-model="appState.rotationFormula"></text-input>
          <transition name="slide">
            <div v-if="!appState.randomize.value" >
              <text-input label="X Position Formula" @reset="resetXPositionFormula" v-model="appState.xPositionFormula"></text-input>
              <text-input label="Y Position Formula" @reset="resetYPositionFormula" v-model="appState.yPositionFormula"></text-input>
            </div>
          </transition>
          <select-field label="Curve Options" v-model="appState.curve.selected" :options="appState.curve.options"></select-field>
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
          :scale-formula="appState.scaleFormula"
          :xPositionFormula="appState.xPositionFormula"
          :yPositionFormula="appState.yPositionFormula"
          :rotationFormula="appState.rotationFormula"
          :min-angle="appState.angle.min"
          :max-angle="appState.angle.max"
          :min-radius="appState.radius.min"
          :max-radius="appState.radius.max"
          :sides="appState.sides.value"
          :roundness="appState.roundness.value"
          :quantity="appState.quantity.value"
          :curve="appState.curve.selected"
          :randomize="appState.randomize.value">
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
import { appState, qs, defaultRotationFormula, defaultScaleFormula, defaultXPositionFormula, defaultYPositionFormula } from './appState'

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
    return {
      appState
    }
  },
  methods: {
    resetScaleFormula () {
      this.appState.scaleFormula = defaultScaleFormula
    },
    resetRotationFormula () {
      this.appState.rotationFormula = defaultRotationFormula
    },
    resetXPositionFormula () {
      this.appState.xPositionFormula = defaultXPositionFormula
    },
    resetYPositionFormula () {
      this.appState.yPositionFormula = defaultYPositionFormula
    },
    download () {
      eventBus.$emit('download')
    }
  },
  mounted () {
    const roundnessCurveTypes = ['curveCardinalClosed', 'curveBundle', 'curveCardinal', 'curveCardinalOpen', 'curveCatmullRom', 'curveCatmullRomClosed', 'curveCatmullRomOpen']
    this.appState.roundness.enabled = roundnessCurveTypes.indexOf(this.appState.curve.selected) >= 0
  },
  watch: {
    'appState.sides.value' (value) {
      qs.set({sd: value})
    },
    'appState.scaleFormula' (value) {
      qs.set({sf: value})
    },
    'appState.rotationFormula' (value) {
      qs.set({rf: value})
    },
    'appState.xPositionFormula' (value) {
      qs.set({xpos: value})
    },
    'appState.yPositionFormula' (value) {
      qs.set({ypos: value})
    },
    'appState.angle.min' (value) {
      qs.set({mina: value})
    },
    'appState.angle.max' (value) {
      qs.set({maxa: value})
    },
    'appState.quantity.value' (value) {
      qs.set({qt: value})
    },
    'appState.randomize.value' (value) {
      qs.set({rd: value})
    },
    'appState.roundness.value' (value) {
      qs.set({rn: value})
    },
    'appState.radius.min' (value) {
      qs.set({minrd: value})
    },
    'appState.radius.max' (value) {
      qs.set({maxrd: value})
    },
    'appState.curve.selected' (value) {
      qs.set({cv: value})
      const roundnessCurveTypes = ['curveCardinalClosed', 'curveBundle', 'curveCardinal', 'curveCardinalOpen', 'curveCatmullRom', 'curveCatmullRomClosed', 'curveCatmullRomOpen']
      this.appState.roundness.enabled = roundnessCurveTypes.indexOf(value) >= 0
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
    z-index: 1;
  }

  .sidebar {
    z-index: 10;
    width: 300px;
    position: relative;
  }

  .footer-wrapper {
    z-index: 1000;
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
      background-color: #CCC;
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
