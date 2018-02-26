<template>
  <div>
    <setting :setting="setting" @submit="generate" @restart="restart"/>
    <question :question="question" @submit="submit"/>
    <result :rates="rates"/>
  </div>
</template>

<script>
import setting from './setting'
import question from './question'
import result from '@/components/result'
import web from '@/web'

export default {
  data () {
    return {
      setting: {
        ranges: [10, 20],
        operators: ['+'],
        amount: 3
      },
      question: {
        questions: [],
        answer: null
      },
      result: null,
      rates: {
        correct_rate: 0,
        wrong_rate: 0
      }
    }
  },
  methods: {
    submit () {
      var is_correct = false

      if (this.question.answer === this.result) {
        is_correct = true
      }

      this.save_question(is_correct)

      if (is_correct) {
        this.rates.correct_rate += 1

        this.$message({
          message: '答对了',
          type: 'success'
        })

        this.generate()
      }else{
        this.rates.wrong_rate += 1
        this.$message.error('答错了')
      }
    },
    generate () {
      this.reset()

      var questions = []
      
      for (var i = 0; i < this.setting.amount; i++) {
        if (i !== 0) {
          questions.push(this.pick_operator())
        }
        questions.push(this.pick_number())
      }

      this.question.questions = questions
      this.result = Number(eval(this.question.questions.join('')))
    },
    restart () {
      this.rates.correct_rate = 0
      this.rates.wrong_rate = 0
    },
    pick_operator () {
      var opMax = this.setting.operators.length
      return this.setting.operators[Math.floor(Math.random() * opMax)]
    },
    pick_number () {
      var [min, max] = this.setting.ranges
      return Math.floor(Math.random() * (max - min) + min)
    },
    reset() {
      this.question.questions = []
      this.question.answer = null

      this.result = null
    },
    save_question (is_correct) {
      var record = {
        kind: 0,
        question: this.question.questions.join(' '),
        answer: this.question.answer,
        result: this.result,
        is_correct: is_correct
      }
      web.create(record)
    }
  },
  components: {
    setting, question, result
  }
}
</script>
