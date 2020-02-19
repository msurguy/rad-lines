<template>
<div>
  <div class="sidebar-control control-group" @click="isGroupOpened = !isGroupOpened">
    <div class="control-header">
      <span>{{ title }}</span>
      <svgicon name="chevron-right" width="12" height="22" :fill="false" class="chevron" :class="{ 'chevron-rotated' : isGroupOpened }"></svgicon>
    </div>
  </div>
  <transition name="slide">
    <div v-if="isGroupOpened">
      <slot></slot>
    </div>
  </transition>
</div>
</template>

<script>

const setLocalStorageObject = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

const getLocalStorageObject = function (key) {
  const value = localStorage.getItem(key)
  return value && JSON.parse(value)
}

export default {
  name: 'ControlGroup',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isGroupOpened: false
    }
  },
  mounted () {
    if (this.title) {
      const state = this.getCollapseState()
      if (state) {
        this.isGroupOpened = state[this.title]
      }
    }
  },
  methods: {
    getCollapseState () {
      return getLocalStorageObject('collapsibles') || {}
    },
    saveCollapsedState (value) {
      const state = this.getCollapseState()
      state[this.title] = value
      setLocalStorageObject('collapsibles', state)
    }
  },
  watch: {
    isGroupOpened (newValue) {
      if (this.title) {
        this.saveCollapsedState(newValue)
      }
      this.$emit('groupCollapseChanged', newValue)
    }
  }
}
</script>

<style scoped>
  .control-group {
    background-image: none;
    background-color: #1b1b1b;
    border-bottom: 1px solid #3a3a3a;
  }

  .chevron {
    transition: transform 0.2s ease-in-out;
  }
  .chevron-rotated {
    transform: rotate(90deg);
  }
</style>
