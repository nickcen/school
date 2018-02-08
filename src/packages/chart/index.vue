<template>
  <div>
    <div id="chart0" style="width:640px;height:480px"/>
    <div id="chart1" style="width:640px;height:480px"/>
    <div id="chart2" style="width:640px;height:480px"/>
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
    var options = [
    {
      title: {
        text: '数学'
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
    },
    {
      title: {
        text: '声母，韵母'
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
    },
    {
      title: {
        text: '写拼音'
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
    ]

    let chars = []
    chars[0] = this.$echarts.init(document.getElementById('chart0'), 'light')
    chars[1] = this.$echarts.init(document.getElementById('chart1'), 'light')
    chars[2] = this.$echarts.init(document.getElementById('chart2'), 'light')

    var tomorrow = moment().add(1, 'days')
    var one_month_ago = moment().subtract(14, 'days')

    var params = {
      from_date: one_month_ago.format("YYYY-MM-DD"), 
      to_date: tomorrow.format("YYYY-MM-DD"), 
      is_correct: 1
    }

    web.list(params, ( response ) => {
      var dates = this.getDateArray(one_month_ago, tomorrow)

      var datas = [{}, {}, {}]

      response.data.data.forEach( (value) => {
        var curr = datas[value.kind]
        if (curr[value.date]) {
          curr[value.date] += 1
        } else {
          curr[value.date] = 1
        }
      })

      for (var i = 0; i < 3; i++){
        dates.forEach( (date) => {
          var val = datas[i][date]

          if (val) {
            options[i].series[0].data.push(val)
          } else {
            options[i].series[0].data.push(0)
          }
        })

        options[i].xAxis.data = dates
        chars[i].setOption(options[i])
      }
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