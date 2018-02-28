<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>选择日期</span>
      </div>
      <setting :form="form" @submit="load"/>
    </el-card>
    <div v-for="(ds, date) in datas">
      <sheet :date="date" :maths="ds[0]" :pinyin1s="ds[1]" :pinyin2s="ds[2]" :pinyin3s="ds[3]"></sheet>
    </div>
  </div>
</template>

<script>
import setting from './setting'
import sheet from './sheet'
import web from '@/web'

var moment = require('moment')

export default {
  data: function () {
    return {
      form: {
        date: [moment().format("YYYY-MM-DD"), moment().add(1, 'days').format("YYYY-MM-DD")]
      },
      datas: []
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      var from_date = this.form.date[0]
      var to_date = this.form.date[1]

      var params = {
        from_date: from_date, 
        to_date: to_date
      }

      web.list(params, ( response ) => {
        var datas = this.getDateArray(moment(from_date), moment(to_date))

        response.data.data.forEach( (value) => {
          datas[value.date][value.kind].push(value)
        })

        this.datas = datas
      })
    },
    getDateArray (start, end) {
      var arr = {};

      while (start <= end) {
        arr[start.format("YYYY-MM-DD")] = [[], [], [], []];
        start.add(1, 'd');
      }

      return arr;
    }
  },
  components: {
    setting, sheet
  }
}
</script>

<style>
.el-table .warning-row {
  color: #F56C6C;
}
</style>