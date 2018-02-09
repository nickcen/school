/* eslint-disable */

import Vue from 'vue'
import Router from 'vue-router'
import math1 from '@/packages/math1/index'
import pinyin1 from '@/packages/pinyin1/index'
import pinyin2 from '@/packages/pinyin2/index'
import pinyin3 from '@/packages/pinyin3/index'
import chart from '@/packages/chart/index'
import report from '@/packages/report/index'

Vue.use(Router)

export default new Router({
  routes: [
  {
    path: '/', component: math1
  },
  {
    path: '/pinyin1', component: pinyin1
  },
  {
    path: '/pinyin2', component: pinyin2
  },
  {
    path: '/pinyin3', component: pinyin3
  },
  {
    path: '/chart', component: chart
  },
  {
    path: '/report', component: report
  }
  ]
})
