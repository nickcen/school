/* eslint-disable */

import Vue from 'vue'
import Router from 'vue-router'
import math from '@/packages/math/index'

Vue.use(Router)

export default new Router({
  routes: [
  {
    path: '/', component: math
  }
  ]
})
