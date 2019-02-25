<template>
  <div class="slider">
    <div class="header">
      <div>
        <img v-if="leftIcon" :src="leftIcon" width="12px" height="12px">
      </div>
      <div class="label">
        <div class="output">{{ num }}</div>{{ label }}
      </div>
      <div>
        <img v-if="rightIcon" :src="rightIcon" width="22px" height="22px">
      </div>
    </div>
    <input class="custom-range" type="range" :min="min" :max="max" :step="step" v-model="num">
  </div>
</template>

<script>
export default {
  name: 'Slider',
  props: {
    leftIcon: {
      type: String,
      default: ''
    },
    rightIcon: {
      type: String,
      default: ''
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
    defaultValue: {
      type: Number,
      default: 50
    }
  },
  data () {
    return {
      num: this.defaultValue
    }
  },
  mounted () {
    this.$emit('update:num', this.num)
  },
  watch: {
    num (value) {
      this.$emit('update:num', value)
    }
  }
}
</script>
