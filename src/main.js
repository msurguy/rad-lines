// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './sass/bootstrap.scss'
import SvgIcon from 'vue-svgicon'

Vue.config.productionTip = false

// Default tag name is 'svgicon'
Vue.use(SvgIcon, {
  tagName: 'svgicon'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
