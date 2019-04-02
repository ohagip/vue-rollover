import Vue from 'vue'
import App from './App.vue'
import VueRollover from './vue-rollover'

Vue.config.productionTip = false

Vue.use(VueRollover)

new Vue({
  render: h => h(App),
}).$mount('#app')
