<template>
  <div>
    <el-form :model="form" label-width="80px">
      <el-form-item label="日期">
        <el-date-picker v-model="form.date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object
    }
  },
  methods: {
    submit () {
      this.$emit('submit')
    }
  }
}
</script>
