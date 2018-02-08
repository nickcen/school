/* eslint-disable */

import Vue from 'vue'
import Router from 'vue-router'
import math from '@/packages/math/index'
import pinyin from '@/packages/pinyin/index'

Vue.use(Router)

export default new Router({
  routes: [
  {
    path: '/', component: math
  },
  {
    path: '/pinyin', component: pinyin
  }
  ]
})
