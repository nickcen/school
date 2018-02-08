<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>选择日期</span>
      </div>
      <setting :form="form" @submit="load"/>
    </el-card>
    <el-card>
      <div slot="header" class="clearfix">
        <span>数学</span>
      </div>
      <template>
        <el-table :data="maths" style="width: 100%" :row-class-name="tableRowClassName">
          <el-table-column prop="question" label="题目">
          </el-table-column>
          <el-table-column prop="answer" label="回答">
          </el-table-column>
          <el-table-column prop="result" label="答案">
          </el-table-column>
        </el-table>
      </template>
    </el-card>
    <el-card>
      <div slot="header" class="clearfix">
        <span>声母，韵母</span>
      </div>
      <template>
        <el-table :data="pinyin1s" style="width: 100%" :row-class-name="tableRowClassName">
          <el-table-column prop="question" label="题目">
          </el-table-column>
          <el-table-column prop="answer" label="回答">
          </el-table-column>
          <el-table-column prop="result" label="答案">
          </el-table-column>
        </el-table>
      </template>
    </el-card>
    <el-card>
      <div slot="header" class="clearfix">
        <span>写拼音</span>
      </div>
      <template>
        <el-table :data="pinyin2s" style="width: 100%" :row-class-name="tableRowClassName">
          <el-table-column prop="question" label="题目">
          </el-table-column>
          <el-table-column prop="answer" label="回答">
          </el-table-column>
          <el-table-column prop="result" label="答案">
          </el-table-column>
        </el-table>
      </template>
    </el-card>
  </div>
</template>

<script>
import setting from './setting'
import web from '@/web'

var moment = require('moment')

export default {
  data: function () {
    return {
      form: {
        date: moment().format("YYYY-MM-DD")
      },
      maths: [],
      pinyin1s: [],
      pinyin2s: []
    }
  },
  created () {
    this.load()
  },
  methods: {
    tableRowClassName ({row, rowIndex}) {
      if (!row.is_correct){
        return 'warning-row'
      }
    },
    load () {
      var from_date = moment(this.form.date)
      var to_date = from_date.clone().add(1, 'days')

      var params = {
        from_date: from_date.format("YYYY-MM-DD"), 
        to_date: to_date.format("YYYY-MM-DD")
      }

      web.list(params, ( response ) => {
        var datas = [[],[],[]]

        response.data.data.forEach( (value) => {
          datas[value.kind].push(value)
        })

        this.maths = datas[0]
        this.pinyin1s = datas[1]
        this.pinyin2s = datas[2]
      })
    }
  },
  components: {
    setting
  }
}
</script>

<style>
.el-table .warning-row {
  color: #F56C6C;
}
</style>