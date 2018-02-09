<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>题目</span>
      </div>
      <el-row>
        <el-col :span="12">
          <span style="font-size:30px">
            {{ question.question }}
          </span>
        </el-col>
        <el-col :span="12">
          <el-input ref="answer" v-model="question.answer" @keyup.enter.native="submit" :autofocus="true"></el-input>
        </el-col>
      </el-row>
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
