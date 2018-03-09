<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>难度</span>
      </div>
      <el-form :model="setting" label-width="100px">
        <el-form-item label="数量">
          <el-slider v-model="setting.amount" show-stops :min="8" :max="20">
          </el-slider>
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
