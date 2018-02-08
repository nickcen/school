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
          data: ['数学', '拼音']
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
          name: '拼音',
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

    console.log(myChart)
    // myChart.setOption(this.options)

    web.list('2018-02-01', '2018-02-21', ( response ) => {
      var dates = this.getDateArray('2018-02-01', '2018-02-21')
      
      var maths = {}
      var pinyins = {}
      var curr = null

      response.data.data.forEach( (value) => {
        if (value.kind == 'math'){
          curr = maths
        } else {
          curr = pinyins
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

        val = pinyins[date]

        if (val) {
          this.options.series[1].data.push(val)
        } else {
          this.options.series[1].data.push(0)
        }
      })

      this.options.xAxis.data = dates
      myChart.setOption(this.options)
    })
  },
  methods: {
    getDateArray (start, end) {
      var arr = [], dt = moment(start);

      while (dt <= moment(end)) {
        arr.push(dt.format("YYYY-MM-DD"));
        dt.add(1, 'd');
      }

      return arr;
    }
  }
}
</script>