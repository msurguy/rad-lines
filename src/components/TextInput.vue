<template>
  <div class="sidebar-control">
    <div class="control-header">
      <div>
        <svgicon v-if="leftIcon" :name="leftIcon.icon" :width="leftIcon.width" :height="leftIcon.height" color="#FFFFFF" :fill="false"></svgicon>
      </div>
      <div class="control-label">
        {{ label }}
      </div>
      <div>
        <svgicon v-if="rightIcon" :name="rightIcon.icon" :width="rightIcon.width" :height="rightIcon.height" color="#FFFFFF" :fill="false"></svgicon>
        <popper
          trigger="click"
          :options="{ placement: 'top' }">
          <div class="popper popper-content">
            <h6>Formula Field</h6>
            <p>In this field, <code>i</code> represents the current loop iteration. You can use the following:</p>
            <p>
            Operators:	<code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code>, <code>mod</code><br>
            Arithmetic:	<code>abs</code>, <code>exp</code>, <code>log</code>, <code>sqrt</code>, <code>ceil</code>, <code>floor</code>, <code>random</code>, <code>round</code><br>
            Trigonometry:	<code>tan</code>, <code>sin</code>, <code>cos</code>, <code>acos</code>, <code>asin</code>, <code>atan</code>, <code>atan2</code><br>
            Statistics:	<code>max</code>, <code>min</code><br>
            Constants: <code>pi</code>, <code>e</code></p>
            <p>Examples:</p>
            <ul class="pl-3">
              <li>
                <code>i*20 + sin(i)*random()*100</code>
              </li>
              <li>
                <code>
                  10i+sin(10i)*pi
                </code>
              </li>
            </ul>
          </div>
          <button class="btn badge badge-pill badge-dark" slot="reference">
            ?
          </button>
        </popper>
      </div>
    </div>
    <div class="control-header">
      <input class="control-text-input" type="text" :value="value" @change="onInput">
      <a class="btn" @click="$emit('reset')">reset</a>
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
    /*background-color: #fafafa;*/
    /*color: #212121;*/
    width: 280px;
    text-align: left;
    border: 1px #ebebeb solid;
    padding: 10px;
  }
</style>
