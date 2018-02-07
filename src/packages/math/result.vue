<template>
  <div>
    <el-form :model="result" label-width="120px" @submit.native.prevent>
      <el-form-item label="答案">
        <el-input ref="result" v-model="result.result" @keyup.enter.native="submit" :autofocus="true"></el-input>
      </el-form-item>
      <el-form-item label="答对">
        <el-rate v-model="result.correct_rate" disabled :max="10" :icon-classes="correct_icon_classes" :colors="correct_colors"></el-rate>
      </el-form-item>
      <el-form-item label="答错">
        <el-rate v-model="result.wrong_rate" disabled :max="10" :icon-classes="wrong_icon_classes" :colors="wrong_colors"></el-rate>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    result: {
      type: Object
    }
  },
  data () {
    return {
      correct_icon_classes: ['el-icon-circle-check', 'el-icon-circle-check', 'el-icon-circle-check'],
      correct_colors: ['#6AC044', '#6AC044', '#6AC044'],
      wrong_icon_classes: ['el-icon-circle-close', 'el-icon-circle-close', 'el-icon-circle-close'],
      wrong_colors: ['#F36D6E', '#F36D6E', '#F36D6E']
    }
  },
  methods: {
    submit () {
      this.$refs['result'].focus()
      this.$emit('submit')
    }
  }
}
</script>
