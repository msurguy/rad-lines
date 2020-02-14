<template>
  <div class="sidebar-control">
    <div class="control-header">
      <label :for="labelId" class="control-label color-control-label" :id="labelId">{{ label }}</label>
      <div class="color-indicator-wrapper">
        <div class="color-indicator" :style="{ 'background-color': `#${hex}` }" @click="toggleColorPicker"></div>
        <input :aria-labelledby="labelId"
               class="control-text-input color-control-text-input" type="text" :value="hex"
               @change="basicInputChange">
        <button class="btn btn-xsm btn-outline-secondary color-picker-button" @click.prevent="emitChange">SET</button>
      </div>
    </div>
    <transition name="slide">
      <div v-if="showColorPicker" role="application" aria-label="Color picker"
           class="mt-2"
           :class="['vc-sketch', disableAlpha ? 'vc-sketch__disable-alpha' : '']">
        <div class="vc-sketch-saturation-wrap">
          <saturation v-model="colors" @change="childChange"></saturation>
        </div>
        <div class="vc-sketch-controls">
          <div class="vc-sketch-sliders">
            <div class="vc-sketch-hue-wrap">
              <hue v-model="colors" @change="childChange"></hue>
            </div>
            <div class="vc-sketch-alpha-wrap" v-if="!disableAlpha">
              <alpha v-model="colors" @change="childChange"></alpha>
            </div>
          </div>
          <div class="vc-sketch-color-wrap">
            <div :aria-label="`Current color is ${activeColor}`" class="vc-sketch-active-color"
                 :style="{background: activeColor}"></div>
            <checkboard></checkboard>
          </div>
        </div>
        <div class="vc-sketch-field" v-if="!disableFields">
          <!-- rgba -->
          <div class="vc-sketch-field--double">
            <ed-in label="hex" :value="hex" @change="inputChange"></ed-in>
          </div>
          <div class="vc-sketch-field--single">
            <ed-in label="r" :value="colors.rgba.r" @change="inputChange"></ed-in>
          </div>
          <div class="vc-sketch-field--single">
            <ed-in label="g" :value="colors.rgba.g" @change="inputChange"></ed-in>
          </div>
          <div class="vc-sketch-field--single">
            <ed-in label="b" :value="colors.rgba.b" @change="inputChange"></ed-in>
          </div>
          <div class="vc-sketch-field--single" v-if="!disableAlpha">
            <ed-in label="a" :value="colors.a" :arrow-offset="0.01" :max="1" @change="inputChange"></ed-in>
          </div>
        </div>
        <div class="vc-sketch-presets" role="group"
             aria-label="A color preset, pick one to set as current color">
          <template v-for="c in presetColors">
            <div
              v-if="!isTransparent(c)"
              class="vc-sketch-presets-color"
              :aria-label="'Color:' + c"
              :key="c"
              :style="{background: c}"
              @click="handlePreset(c)">
            </div>
            <div
              v-else
              :key="c"
              :aria-label="'Color:' + c"
              class="vc-sketch-presets-color"
              @click="handlePreset(c)">
              <checkboard/>
            </div>
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import colorMixin from './colorMixin'
import editableInput from './EditableInput.vue'
import saturation from './Saturation.vue'
import hue from './Hue.vue'
import alpha from './Alpha.vue'
import checkboard from './Checkboard.vue'

const presetColors = [
  '#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321',
  '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2',
  '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#CCCCCC',
  '#FFFFFF'
]

export default {
  name: 'ColorPicker',
  mixins: [colorMixin],
  data () {
    return {
      showColorPicker: false
    }
  },
  components: {
    saturation,
    hue,
    alpha,
    'ed-in': editableInput,
    checkboard
  },
  props: {
    presetColors: {
      type: Array,
      default () {
        return presetColors
      }
    },
    disableAlpha: {
      type: Boolean,
      default: true
    },
    disableFields: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    }
  },
  computed: {
    labelId () {
      return `input__label__color__${Math.random().toString().slice(2, 5)}`
    },
    hex () {
      let hex
      if (this.colors.a < 1) {
        hex = this.colors.hex8
      } else {
        hex = this.colors.hex
      }
      return hex.replace('#', '')
    },
    activeColor () {
      const rgba = this.colors.rgba
      return 'rgba(' + [rgba.r, rgba.g, rgba.b, rgba.a].join(',') + ')'
    }
  },
  methods: {
    toggleColorPicker () {
      this.showColorPicker = !this.showColorPicker
    },
    emitChange (e) {
      this.$emit('colorChange', `#${this.hex}`)
      this.showColorPicker = false
    },
    handlePreset (c) {
      this.colorChange({
        hex: c,
        source: 'hex'
      })
    },
    childChange (data) {
      this.colorChange(data)
    },
    basicInputChange (e) {
      this.isValidHex(e.target.value) && this.colorChange({
        hex: e.target.value,
        source: 'hex'
      })
      this.$emit('colorChange', `#${this.hex}`)
    },
    inputChange (data) {
      if (!data) {
        return
      }
      if (data.hex) {
        this.isValidHex(data.hex) && this.colorChange({
          hex: data.hex,
          source: 'hex'
        })
      } else if (data.r || data.g || data.b || data.a) {
        this.colorChange({
          r: data.r || this.colors.rgba.r,
          g: data.g || this.colors.rgba.g,
          b: data.b || this.colors.rgba.b,
          a: data.a || this.colors.rgba.a,
          source: 'rgba'
        })
      }
    }
  }
}
</script>

<style scoped>
  .vc-sketch {
    width: 100%;
    display: block;
    padding: 10px 10px 0;
    background: #fff;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, .15), 0 8px 16px rgba(0, 0, 0, .15);
  }

  .vc-sketch-saturation-wrap {
    width: 100%;
    padding-bottom: 75%;
    position: relative;
    overflow: hidden;
  }

  .vc-sketch-controls {
    display: flex;
  }

  .vc-sketch-sliders {
    padding: 4px 0;
    flex: 1;
  }

  .vc-sketch-hue-wrap {
    position: relative;
    height: 20px;
  }

  .vc-sketch-alpha-wrap {
    position: relative;
    height: 10px;
    margin-top: 4px;
    overflow: hidden;
  }

  .vc-sketch-color-wrap {
    width: 24px;
    height: 24px;
    position: relative;
    margin-top: 4px;
    margin-left: 4px;
    border-radius: 3px;
  }

  .vc-sketch-active-color {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 2px;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15), inset 0 0 4px rgba(0, 0, 0, .25);
    z-index: 2;
  }

  .vc-sketch-field {
    display: flex;
    padding-top: 4px;
  }

  .vc-sketch-field--single {
    flex: 1;
    padding-left: 6px;
  }

  .vc-sketch-field--double {
    flex: 2;
  }

  .vc-sketch-presets {
    margin-right: -10px;
    margin-left: -10px;
    padding-left: 10px;
    padding-top: 10px;
    border-top: 1px solid #eee;
  }

  .vc-sketch-presets-color {
    border-radius: 3px;
    overflow: hidden;
    position: relative;
    display: inline-block;
    margin: 0 10px 10px 0;
    vertical-align: top;
    cursor: pointer;
    width: 16px;
    height: 16px;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15);
  }

  .vc-sketch__disable-alpha .vc-sketch-color-wrap {
    height: 20px;
  }

  .color-picker-wrapper {
    position: relative;
  }

  .color-control-label {
    margin-top: 2px;
    margin-bottom: 0;
    align-self: center;
    flex: 0 0 100px;
  }

  .color-picker-button, .color-indicator {
    margin-top: 5px;
  }

  .color-picker-button {
    margin-left: 10px;
  }

  .color-indicator {
    margin-top: 5px;
    width: 20px;
    height: 20px;
    background-color: red;
    display: block;
    position: relative;
  }

  .color-indicator-wrapper {
    position: relative;
    display: flex;
  }

  .color-control-text-input {
    display: inline-block;
    width: 70px;
  }
</style>
