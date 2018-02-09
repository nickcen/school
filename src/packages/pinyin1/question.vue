<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>题目</span>
      </div>
      <el-form :model="question" label-width="80px">
        <el-form-item label="选韵母">
          <el-checkbox-group v-model="question.answer">
            <el-checkbox v-for="val in question.questions" :label='val' :key="val" border></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">回答</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    question: {
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
