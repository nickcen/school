<template>
  <div>
    <div id="myChart" style="width:1024px;height:600px"/>
  </div>
</template>

<script>
require('echarts/lib/chart/line')
require('echarts/lib/component/polar')

import web from '@/web'

var moment = require('moment')

export default {
  data: function () {
    return {
      options: {
        color: ['#61a0a8', '#91c7ae', '#749f83', '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
        tooltip : {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap : false,
          data: []
        },
        legend: {
          data: ['数学', '声母，韵母', '写拼音']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '数学',
          stack: '总量',
          data: [],
          type: 'line',
          areaStyle: {normal: {}},
          smooth: true
        }, {
          name: '声母，韵母',
          stack: '总量',
          data: [],
          type: 'line',
          areaStyle: {normal: {}},
          smooth: true
        }, {
          name: '写拼音',
          stack: '总量',
          data: [],
          type: 'line',
          areaStyle: {normal: {}},
          smooth: true
        }]
      }
    }
  },
  mounted () {
    let myChart = this.$echarts.init(document.getElementById('myChart'))

    var tomorrow = moment().add(1, 'days')
    var one_month_ago = moment().subtract(1, 'months')

    web.list(one_month_ago.format("YYYY-MM-DD"), tomorrow.format("YYYY-MM-DD"), ( response ) => {
      var dates = this.getDateArray(one_month_ago, tomorrow)
      
      var maths = {}
      var pinyins1 = {}
      var pinyins2 = {}
      var curr = null

      response.data.data.forEach( (value) => {
        if (value.kind == 'math1'){
          curr = maths
        } else if (value.kind == 'pinyin1') {
          curr = pinyins1
        } else  {
          curr = pinyins2
        }
        if (curr[value.date]) {
          curr[value.date] += 1
        } else {
          curr[value.date] = 1
        }
      })
      
      dates.forEach( (date) => {
        var val = maths[date]

        if (val) {
          this.options.series[0].data.push(val)
        } else {
          this.options.series[0].data.push(0)
        }

        val = pinyins1[date]

        if (val) {
          this.options.series[1].data.push(val)
        } else {
          this.options.series[1].data.push(0)
        }

        val = pinyins2[date]

        if (val) {
          this.options.series[2].data.push(val)
        } else {
          this.options.series[2].data.push(0)
        }
      })

      this.options.xAxis.data = dates
      myChart.setOption(this.options)
    })
  },
  methods: {
    getDateArray (start, end) {
      var arr = [];

      while (start <= end) {
        arr.push(start.format("YYYY-MM-DD"));
        start.add(1, 'd');
      }

      return arr;
    }
  }
}
</script>