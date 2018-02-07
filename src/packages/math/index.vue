<template>
  <div class="hello">
    <el-card class="box-card">
      <setting :setting="form" @submit="generate"/>
    </el-card>
    <el-card>
      <span style="font-size:30px">
        {{ this.expression.join(' ') }}
      </span>
    </el-card>
    <el-card>
      <result :result="result" @submit="submit"/>
    </el-card>
  </div>
</template>

<script>
import setting from './setting'
import result from './result'

export default {
  data () {
    return {
      form: {
        ranges: [1, 10],
        operators: ['+'],
        amount: 4
      },
      result: {
        result: null,
        correct_rate: 0,
        wrong_rate: 0
      },
      expression: []
    }
  },
  methods: {
    submit () {
      if (this.result.result) {
        var result = Number(eval(this.expression.join('')))
        if (Number(this.result.result) === result) {
          this.$message({
            message: '答对了',
            type: 'success'
          })
          this.result.correct_rate += 1
          this.generate()
        } else {
          this.result.wrong_rate += 1
          this.$message.error('答错了')
        }
      }
      this.result.result = null
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
  },
  components: {
    setting, result
  }
}
</script>
