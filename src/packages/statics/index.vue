<template>
  <div>
    <div id="chart" style="width:640px;height:480px"/>
  </div>
</template>

<script>
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/component/polar')

import web from '@/web'

var moment = require('moment')

export default {
  data: function () {
    return {

    }
  },
  mounted () {
    var option = {
      title: {
        text: '积分'
      },
      xAxis: {
        type: 'category',
        data: []
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [],
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        },
        smooth: true
      }]
    }

    let chart = this.$echarts.init(document.getElementById('chart'), 'light')

    var tomorrow = moment().add(1, 'days')
    var one_month_ago = moment().subtract(14, 'days')

    var params = {
      from_date: one_month_ago.format("YYYY-MM-DD"), 
      to_date: tomorrow.format("YYYY-MM-DD"), 
      is_correct: 1
    }

    web.list(params, ( response ) => {
      var dates = this.getDateArray(one_month_ago, tomorrow)

      var datas = {}

      response.data.data.forEach( (value) => {
        if (datas[value.date]) {
          datas[value.date] += this.score(value)
        } else {
          datas[value.date] = this.score(value)
        }
      })

      
      dates.forEach( (date) => {
        var val = datas[date]

        if (val) {
          option.series[0].data.push(val)
        } else {
          option.series[0].data.push(0)
        }
      })

      option.xAxis.data = dates
      chart.setOption(option)
      
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
    },
    score (value) {
      var weight = 0
      switch (value.kind) 
      {
        case 0:
        weight = 4
        break;
        case 1:
        weight = 1
        break;
        case 2:
        weight = 3
        break;
        case 3:
        weight = 1
        break;
        default:
      }
      return weight
    }
  }
}
</script>