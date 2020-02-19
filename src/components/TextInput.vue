<template>
  <div class="sidebar-control">
    <div class="control-header">
      <div>
        <svgicon v-if="leftIcon" :name="leftIcon" :width="22" :height="22" color="#FFFFFF" :fill="false"></svgicon>
      </div>
      <div class="control-label">
        <span>{{ label }}</span>
        <popper
          class="ml-2"
          v-if="tooltip"
          trigger="click"
          :options="{ placement: 'top' }">
          <div class="popper popper-content" v-html="tooltip"></div>
          <button class="tooltip-trigger btn badge badge-pill badge-dark" slot="reference">
            ?
          </button>
        </popper>
      </div>
      <div class="right-icon">
        <svgicon v-if="rightIcon" :name="rightIcon" :width="22" :height="22" color="#FFFFFF" :fill="false"></svgicon>
      </div>
    </div>
    <div class="control-header">
      <input class="control-text-input" type="text" :value="value" @change="onInput">
      <a v-if="showReset" class="btn" @click="$emit('reset')">reset</a>
    </div>
  </div>
</template>

<script>
import '@/icons'
import Popper from 'vue-popperjs'
import 'vue-popperjs/dist/vue-popper.css'

export default {
  name: 'TextInput',
  components: {
    'popper': Popper
  },
  props: {
    leftIcon: {
      type: String
    },
    rightIcon: {
      type: String
    },
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    tooltip: {
      type: String,
      default: ''
    },
    showReset: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onInput ($event) {
      this.$emit('input', $event.target.value)
    }
  }
}
</script>

<style scoped>
  .popper-content {
    width: 280px;
    text-align: left;
    padding: 10px;
  }
</style>
