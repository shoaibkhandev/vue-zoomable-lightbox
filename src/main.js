import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

import InnerImageZoom from 'vue-inner-image-zoom';

import 'vue-inner-image-zoom/lib/vue-inner-image-zoom.css';

import App from './App.vue'

import PinchZoom from 'vue-pinch-zoom';

Vue.component('pinch-zoom', PinchZoom);

Vue.use(VueLazyload)

Vue.component('inner-image-zoom', InnerImageZoom)

new Vue({
  el: '#app',
  render: h => h(App)
})
