<template>
  <div>
    <el-form :model="setting" label-width="80px">
      <el-form-item label="运算符">
        <el-checkbox-group v-model="setting.books" :min="1">
          <el-checkbox border :label="1">第一册</el-checkbox>
          <el-checkbox border :label="2">第二册</el-checkbox>
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
