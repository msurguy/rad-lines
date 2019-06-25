<template>
  <div class="sidebar-control">
    <div class="control-header">
      <div>
        <svgicon v-if="leftIcon" :name="leftIcon.icon" :width="leftIcon.width" :height="leftIcon.height" color="#FFFFFF" :fill="false"></svgicon>
      </div>
      <div class="control-label">
        <div class="control-output">
          <input :disabled="disabled" type="text" :value="value" @change="onInput">
        </div>{{ label }}
      </div>
      <div>
        <svgicon v-if="rightIcon" :name="rightIcon.icon" :width="rightIcon.width" :height="rightIcon.height" color="#FFFFFF" :fill="false"></svgicon>
      </div>
    </div>
    <input :disabled="disabled" class="custom-range" type="range" :min="min" :max="max" :step="step" :value="value" @input="onInput">
  </div>
</template>

<script>
import '@/icons'

export default {
  name: 'Slider',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    leftIcon: {
      type: Object
    },
    rightIcon: {
      type: Object
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    label: {
      type: String,
      default: 'Label'
    },
    value: {
      type: Number,
      default: 50
    }
  },
  methods: {
    onInput ($event) {
      if ($event.target.value > this.min) {
        this.$emit('input', $event.target.value)
      } else {
        this.$emit('input', this.min)
      }
      if ($event.target.value < this.min) {
        this.$emit('input', this.min)
      }
    }
  }
}
</script>
