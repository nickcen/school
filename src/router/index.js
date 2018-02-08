/* eslint-disable */

import Vue from 'vue'
import Router from 'vue-router'
import math from '@/packages/math/index'
import pinyin from '@/packages/pinyin/index'
import report from '@/packages/report/index'

Vue.use(Router)

export default new Router({
  routes: [
  {
    path: '/', component: math
  },
  {
    path: '/pinyin', component: pinyin
  },
  {
    path: '/report', component: report
  }
  ]
})
