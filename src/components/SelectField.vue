<template>
  <div class="sidebar-control">
    <div class="control-header">
      <div>
        <svgicon v-if="leftIcon" :name="leftIcon.icon" :width="leftIcon.width" :height="leftIcon.height" color="#FFFFFF"
                 :fill="false"></svgicon>
      </div>
      <div class="control-label">
        {{ label }}
      </div>
      <div>
        <svgicon v-if="rightIcon" :name="rightIcon.icon" :width="rightIcon.width" :height="rightIcon.height"
                 color="#FFFFFF" :fill="false"></svgicon>
      </div>
    </div>
    <div class="control-header">
      <select
        v-model="selectedOption"
        class="custom-select custom-select-sm custom-select-input"
        @change="onInput">
        <option
          v-for="(item, index) in options"
          :key="index"
          :value="item.value">
          {{ item.text }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import '@/icons'

export default {
  name: 'SelectField',
  props: {
    leftIcon: {
      type: Object
    },
    rightIcon: {
      type: Object
    },
    label: {
      type: String,
      default: 'Label'
    },
    value: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    selectedOption: ''
  }),
  watch: {
    value: function (newValue) {
      this.selectedOption = newValue
    }
  },
  mounted () {
    this.selectedOption = this.value
  },
  methods: {
    onInput ($event) {
      this.$emit('input', $event.target.value)
      this.selectedOption = $event.target.value
    }
  }
}
</script>
