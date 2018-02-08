/* eslint-disable */

import Vue from 'vue'
import Router from 'vue-router'
import math from '@/packages/math/index'
import pinyin from '@/packages/pinyin/index'
import pinyin2 from '@/packages/pinyin2/index'
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
    path: '/pinyin2', component: pinyin2
  },
  {
    path: '/report', component: report
  }
  ]
})
