// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import './sass/bootstrap.scss'
import SvgIcon from 'vue-svgicon'
import VueGtag from "vue-gtag";

export const eventBus = new Vue()

Vue.config.productionTip = false

// Default tag name is 'svgicon'
Vue.use(SvgIcon, {
  tagName: 'svgicon'
})

Vue.use(VueGtag, {
  config: { id: "G-PXKJMQHXV3" }
});

/* eslint-disable no-new */

new Vue({
  render: (h) => h(App),
}).$mount('#app');
