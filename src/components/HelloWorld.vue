<template>
  <div class="hello">
    <el-card class="box-card">
      <el-form :model="form" label-width="120px">
        <el-form-item label="数字范围">
          <el-slider v-model="form.ranges" range show-stops :max="20">
          </el-slider>
        </el-form-item>
        <el-form-item label="几个数字">
          <el-input-number v-model="form.amount"  :min="1" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="运算符">
          <el-checkbox-group v-model="form.operators">
            <el-checkbox border label="+">加法</el-checkbox>
            <el-checkbox border label="-">减法</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-button type="primary" @click="generate">开始</el-button>
      </el-form>
    </el-card>
    <el-card>
      {{ this.expression.join(' ') }}
    </el-card>
    <el-card>
      <el-form :model="form" label-width="120px">
        <el-form-item label="答案">
          <el-input ref="result" v-model="form.result" @keyup.enter.native="submit" :autofocus="true"></el-input>
        </el-form-item>
        <el-form-item label="答对">
          <el-rate v-model="form.correct_rate" disabled :max="10" :icon-classes="correct_icon_classes"></el-rate>
        </el-form-item>
        <el-form-item label="答错">
          <el-rate v-model="form.wrong_rate" disabled :max="10" :icon-classes="wrong_icon_classes"></el-rate>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        ranges: [1, 10],
        operators: ['+', '-'],
        amount: 4,
        result: null
      },
      expression: [],
      correct_rate: 0,
      wrong_rate: 0,
      correct_icon_classes: ['el-icon-circle-check', 'el-icon-circle-check', 'el-icon-circle-check'],
      wrong_icon_classes: ['el-icon-circle-close', 'el-icon-circle-close', 'el-icon-circle-close']
    }
  },
  methods: {
    submit () {
      if (this.form.result) {
        var result = Number(eval(this.expression.join('')))
        if (Number(this.form.result) == result) {
          this.$message({
            message: '答对了',
            type: 'success'
          })
          this.form.correct_rate += 1
          this.generate()
        } else {
          this.form.wrong_rate += 1
          this.$message.error('答错了')
        }  
      }
      this.form.result = null
      this.$refs['result'].focus()
    },
    generate () {
      var expression = []
      var [min, max] = this.form.ranges
      var opMax = this.form.operators.length

      for (var i = 0; i < this.form.amount; i++) {
        if (i !== 0) {
          var operator = this.form.operators[Math.floor(Math.random() * opMax)]
          expression.push(operator)
        }
        expression.push(Math.floor(Math.random() * (max - min) + min))
      }

      this.expression = expression
    }
  }
}
</script>
