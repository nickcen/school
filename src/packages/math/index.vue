<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>难度</span>
      </div>
      <setting :setting="form" @submit="generate"/>
    </el-card>
    <el-card>
      <div slot="header" class="clearfix">
        <span>题目</span>
      </div>
      <el-row>
        <el-col :span="12">
          <span style="font-size:30px">
            {{ this.expression.join(' ') }} =
          </span>
        </el-col>
        <el-col :span="12">
          <el-input ref="answer" v-model="answer" @keyup.enter.native="submit" :autofocus="true"></el-input>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <div slot="header" class="clearfix">
        <span>成绩</span>
      </div>
      <result :rates="rates"/>
    </el-card>
  </div>
</template>

<script>
import setting from './setting'
import result from '@/components/result'
import web from '@/web'

export default {
  data () {
    return {
      form: {
        ranges: [1, 10],
        operators: ['+'],
        amount: 4
      },
      answer: null,
      rates: {
        correct_rate: 0,
        wrong_rate: 0
      },
      expression: []
    }
  },
  methods: {
    submit () {
      if (this.answer) {
        var result = Number(eval(this.expression.join('')))
        var is_correct = false
        if (Number(this.answer) === result) {
          is_correct = true
          this.rates.correct_rate += 1

          this.$message({
            message: '答对了',
            type: 'success'
          })
        } else {
          this.rates.wrong_rate += 1
          this.$message.error('答错了')
        }
        var question = {
          kind: 0,
          question: this.expression.join(' '),
          answer: this.answer,
          result: result,
          is_correct: is_correct
        }
        web.create(question)

        if (is_correct) {
          this.generate()
          this.answer = null
        }
      }
      this.$refs['answer'].focus()
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
