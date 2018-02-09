<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>题目</span>
      </div>
      <el-form :model="question" label-width="80px">
        <el-form-item label="选出听到的字">
          <el-radio-group v-model="question.answer">
            <el-radio v-for="val in question.questions" :label='val' :key="val" border></el-radio>
          </el-radio-group>
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
