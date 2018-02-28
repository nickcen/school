<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>{{ date }}</span>
      </div>
      <template>
        <el-table :data="maths.concat(pinyin1s).concat(pinyin2s).concat(pinyin3s)" style="width: 100%" :row-class-name="tableRowClassName">
          <el-table-column type="index" width="50">
          </el-table-column>
          <el-table-column prop="kind" label="类型" width="180" :formatter="fmt_kind">
          </el-table-column>
          <el-table-column prop="question" label="题目" width="180">
          </el-table-column>
          <el-table-column prop="answer" label="回答"  width="180">
          </el-table-column>
          <el-table-column prop="result" label="答案">
          </el-table-column>
        </el-table>
      </template>
    </el-card>
  </div>
</template>

<script>

export default {
  props: {
    date: {
      type: String
    },
    maths: {
      type: Array
    },
    pinyin1s: {
      type: Array
    },
    pinyin2s: {
      type: Array
    },
    pinyin3s: {
      type: Array
    }
  },
  methods: {
    tableRowClassName ({row, rowIndex}) {
      if (!row.is_correct){
        return 'warning-row'
      }
    },
    fmt_kind (row, column, cellValue) {
      if(cellValue == 0){
        return '数学';
      }else if(cellValue == 1){
        return '声母/韵母';
      }else if(cellValue == 2){
        return '写拼音';
      }else if(cellValue == 3){
        return '选生字';
      }
    }
  }
}
</script>

<style>
.el-table .warning-row {
  color: #F56C6C;
}
</style>