<template>
  <div class="main-wrapper">
    <div class="main-nav">
      <div class="brand">
        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="32">
          <g fill="none" fill-rule="evenodd" stroke="#848484">
            <path d="M22.3 13.5c-.3-.5-8.3-.5-8.6 0-.3.5 3.7 7.5 4.3 7.5.6 0 4.6-7 4.3-7.5"/>
            <path d="M25.9 8.3C25 7.4 7.8 11.8 7.4 13c-.3 1.2 12.1 14 13.3 13.7 1.2-.3 6.1-17.5 5.2-18.4"/>
            <path d="M26.9 1.5C25.2.5 1.1 13.6 1 15.5c0 2 23.4 16.4 25.1 15.5 1.7-1 2.5-28.5.8-29.5"/>
          </g>
        </svg>
        Rad Lines
      </div>
      <div class="nav-more more-tools">
        <span class="text-black-50 small">More Tools: </span>
        <a href="https://msurguy.github.io/flow-lines/">Flow Lines</a>
        <a href="https://msurguy.github.io/SquiggleCam/">SquiggleCam</a>
        <a href="https://drawingbots.net/">DrawingBots</a>
      </div>
      <div class="sharing-wrapper">
        <span class="text-black-50 small">Share this: </span> <a target="_blank" :href="`https://twitter.com/intent/tweet?text=Rad%20Lines%20SVG%20generator&url=${sharingURL}&via=msurguy&hashtags=RadLines%2CSVG`">
        <svg viewBox="0 0 64 64" width="22" height="22"><path stroke-width="0" fill="currentColor" d="M60 16 L54 17 L58 12 L51 14 C42 4 28 15 32 24 C16 24 8 12 8 12 C8 12 2 21 12 28 L6 26 C6 32 10 36 17 38 L10 38 C14 46 21 46 21 46 C21 46 15 51 4 51 C37 67 57 37 54 21 Z"></path> </svg>
      </a>
      </div>
    </div>
    <div class="page">

      <!-- Sidebar -->
      <div class="sidebar">
        <div class="controls-wrapper">
          <div class="controls">
            <control-group title="Shape">
              <toggle label="Randomize Vertices" v-model="appState.randomize.value"></toggle>
              <slider :left-icon="appState.quantity.leftIcon" :right-icon="appState.quantity.rightIcon" :min="1" :max="100" label="Quantity" v-model.number="appState.quantity.value"></slider>
              <slider :left-icon="appState.sides.leftIcon" :right-icon="appState.sides.rightIcon" :min="3" :max="appState.randomize.value ? 200 : 14" label="Number of Sides" v-model.number="appState.sides.value"></slider>
              <slider :left-icon="appState.radius.leftIcon" :right-icon="appState.radius.rightIcon" :step="1" :min="0" :max="300" label="Min Radius" v-model.number="appState.radius.min"></slider>
              <transition name="slide">
                <slider v-if="appState.randomize.value" :left-icon="appState.radius.leftIcon" :right-icon="appState.radius.rightIcon" :step="1" :min="0" :max="300" label="Max Radius" v-model.number="appState.radius.max"></slider>
              </transition>
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
            </control-group>
            <control-group title="Line">
              <slider :disabled="!appState.roundness.enabled" :left-icon="appState.roundness.leftIcon" :right-icon="appState.roundness.rightIcon" :step="0.1" :min="-2" :max="2" label="Roundness" v-model.number="appState.roundness.value"></slider>
              <select-field label="Curve Type" v-model="appState.curve.selected" :options="appState.curve.options"></select-field>
              <text-input label="Color" v-model="appState.stroke.color"></text-input>
              <text-input label="Width" v-model="appState.stroke.width"></text-input>
            </control-group>
            <control-group title="Paper">
              <slider :min="1" :max="10000" label="Randomization Seed" v-model.number="appState.seed.value"></slider>
              <slider :min="1" :max="2000" label="Width" v-model.number="appState.paper.width"></slider>
              <slider :min="1" :max="2000" label="Height" v-model.number="appState.paper.height"></slider>
              <text-input label="Color" v-model="appState.paper.color"></text-input>
              <color-picker :disable-alpha="false" @colorChange="setColor" label="Color" v-model="appState.paper.color"></color-picker>
            </control-group>
          </div>
        </div>

        <div class="bottom-sheet">
          <div class="reveal"></div>
          <div class="d-flex pt-2 pb-2 download-wrapper">
            <button class="btn ml-3 mr-3 btn-primary btn-block" @click.prevent="download">
              Download SVG <svg viewBox="0 6 32 32" width="16" height="16" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <path d="M28 22 L28 30 4 30 4 22 M16 4 L16 24 M8 16 L16 24 24 16"></path>
            </svg>
            </button>
          </div>
        </div>

      </div>

      <!-- Page Content -->
      <div class="paper">
        <div class="sketch">
          <Polygons
            :seed="appState.seed.value"
            :width="appState.paper.width"
            :height="appState.paper.height"
            :paper-color="appState.paper.color"
            :stroke-color="appState.stroke.color"
            :stroke-width="appState.stroke.width"
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
          <p class="small">Project by <a target="_blank" href="http://twitter.com/msurguy">@msurguy</a> | <a target="_blank" href="https://github.com/sponsors/msurguy">Support</a> | <a target="_blank" href="http://github.com/msurguy/rad-lines">Source</a>
            <span class="hide-on-desktop">| <a href="#more" @click="showMoreTools = !showMoreTools">More Tools</a></span>
          </p>
          <transition name="slide">
            <div v-if="showMoreTools" class="more-tools mb-2">
              <a href="https://msurguy.github.io/flow-lines/">Flow Lines</a>
              <a href="https://msurguy.github.io/SquiggleCam/">SquiggleCam</a>
              <a href="https://drawingbots.net/">DrawingBots</a>
            </div>
          </transition>
        </div>
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
import ControlGroup from './components/ControlGroup'

import { eventBus } from '@/main'
import { appState, qs, defaultRotationFormula, defaultScaleFormula, defaultXPositionFormula, defaultYPositionFormula } from './appState'
import * as query from 'query-state/lib/query'

const projectURL = 'https://msurguy.github.io/rad-lines/'

export default {
  name: 'App',
  components: {
    Polygons,
    Slider,
    TextInput,
    SelectField,
    Toggle,
    ControlGroup
  },
  data () {
    return {
      appState,
      sharingURL: projectURL,
      showMoreTools: false,
      groupToggles: {
        paper: false,
        shape: false,
        line: false
      }
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
    },
    updateSharingURL (appendQuery) {
      const queryPresent = window.location.href.indexOf('?') >= 0
      const queryPrefix = (appendQuery || queryPresent) ? '?' : ''
      // For twitter, we need to replace = and & with HTML encoded characters
      const encodedURL = query.stringify(qs.get())
      this.sharingURL = encodeURIComponent(projectURL + queryPrefix + encodedURL)
    }
  },
  mounted () {
    const roundnessCurveTypes = ['curveCardinalClosed', 'curveBundle', 'curveCardinal', 'curveCardinalOpen', 'curveCatmullRom', 'curveCatmullRomClosed', 'curveCatmullRomOpen']
    this.appState.roundness.enabled = roundnessCurveTypes.indexOf(this.appState.curve.selected) >= 0
    this.updateSharingURL(false)
  },
  watch: {
    appState: {
      handler () {
        // Need to wait until all items in appState is updated
        this.$nextTick(function () {
          this.updateSharingURL(true)
        })
      },
      deep: true
    },
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
    },
    'appState.seed.value' (value) {
      qs.set({seed: value})
    },
    'appState.paper.width' (value) {
      qs.set({pwidth: value})
    },
    'appState.paper.height' (value) {
      qs.set({pheight: value})
    },
    'appState.paper.color' (value) {
      qs.set({pcolor: value})
    },
    'appState.stroke.width' (value) {
      qs.set({swidth: value})
    },
    'appState.stroke.color' (value) {
      qs.set({scolor: value})
    }
  }
}
</script>

<style scoped lang="scss">
  .main-wrapper {
    min-height: 100vh;
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .main-nav {
    flex: 1;
    height: 50px;
    max-height: 50px;
    background-color: #ffffff;
    display: flex;
    padding-left: 15px;
    padding-right: 15px;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .brand {
      svg {
        margin-right: 5px;
      }
      display: flex;
      align-items: center;
      font-size: 24px;
      color: rgba(0,0,0,0.46);
      letter-spacing: 0;
    }
  }

  .more-tools {
    a {
      margin-left: 20px;
      text-decoration: none;
    }
  }

  .page {
    height: calc(100vh - 50px);
    position: relative;
    display: flex;
  }

  .controls {
    background-color: grey;
    width: 100%;
    margin-bottom: 55px;
    position: relative;
    height: auto;
  }

  .bottom-sheet {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    z-index: 3;
  }

  .download-wrapper {
    background-color: #393939;
  }

  .controls-wrapper {
    max-height: calc(100vh - 50px);
    overflow: auto;
    position: relative;
    z-index: 2;
  }

  .sharing-wrapper {
    color: #2D2D2D;
    padding: 10px 0 10px 10px;
  }

  .button {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
  }

  .reveal {
    pointer-events: none;
    display: block;
    height: 5px;
    background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgb(47, 47, 47) 100%);
  }

  .paper {
    background-color: #dedede;
    position: relative;
    max-height: calc(100vh - 50px);
    width: calc(100% - 300px);
    overflow: scroll;
    padding: 10px;
    z-index: 1;
  }

  .sketch {
    display: inline-block;
    border: 6px ridge #FFFFFF;
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

    .hide-on-desktop {
      display: none;
    }
  }

  @media (max-width: 767px) {
    .main-nav {
      padding-left: 10px;
      padding-right: 10px;
    }
    .nav-more {
      display: none;
    }
    .page {
      flex-direction: column-reverse;
      height: auto;
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
      overflow: hidden;
    }

    .footer-wrapper {
      position: relative;
      background-color: #CCC;

      .hide-on-desktop {
        display: inline-block;
      }
    }
  }
</style>
