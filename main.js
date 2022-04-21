import Vue from 'vue'
import App from './App'

import Request from 'util/request.js'

import $mUtils from '@/util/time.js'

Vue.prototype.$request  = Request

Vue.prototype.$mUtils = $mUtils;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
