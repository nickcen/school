<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>难度</span>
      </div>
      <el-form :model="setting" label-width="100px">
        <el-form-item label="数字范围">
          <el-slider v-model="setting.ranges" range show-stops :min="10" :max="20">
          </el-slider>
        </el-form-item>
        <el-form-item label="几个数字">
          <el-input-number v-model="setting.amount" :min="2" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="运算符">
          <el-checkbox-group v-model="setting.operators" :min="1">
            <el-checkbox border label="+">加法</el-checkbox>
            <el-checkbox border label="-">减法</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">出题</el-button>
          <el-button type="primary" @click="restart">重新开始</el-button>
        </el-form-item>
      </el-form>
    </el-card>
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
    },
    restart () {
      this.$emit('restart')
    }
  }
}
</script>
