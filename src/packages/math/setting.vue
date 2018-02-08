<template>
  <div>
    <el-form :model="setting" label-width="80px">
      <el-form-item label="数字范围">
        <el-slider v-model="setting.ranges" range show-stops :max="20">
        </el-slider>
      </el-form-item>
      <el-form-item label="几个数字">
        <el-input-number v-model="setting.amount"  :min="1" :max="10"></el-input-number>
      </el-form-item>
      <el-form-item label="运算符">
        <el-checkbox-group v-model="setting.operators">
          <el-checkbox border label="+">加法</el-checkbox>
          <el-checkbox border label="-">减法</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">出题</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    setting: {
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
