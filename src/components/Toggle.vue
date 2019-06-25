<template>
  <div class="sidebar-control">
    <div class="control-header">
      <div class="custom-control custom-switch">
        <input type="checkbox" class="custom-control-input" :id="label" :value="value" :checked="!!value" @change="onInput">
        <label class="custom-control-label" :for="label">{{ label }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import '@/icons'

export default {
  name: 'Toggle',
  props: {
    leftIcon: {
      type: Object
    },
    rightIcon: {
      type: Object
    },
    label: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onInput ($event) {
      this.$emit('input', $event.target.checked)
    }
  }
}
</script>
