<template>
  <div>
    <el-form :model="setting" label-width="80px">
      <el-form-item label="数量">
        <el-slider v-model="setting.amount" show-stops :max="45">
        </el-slider>
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
