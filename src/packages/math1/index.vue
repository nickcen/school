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
  import utility from '../utility'

  export default {
    data () {
      return {
        setting: {
          ranges: 20,
          operators: ['+'],
          amount: 2
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
            message: '得' + this.score() + '分',
            type: 'success'
          })
          utility.speak('答对了，得' + this.score() + '分')
          this.generate()
        }else{
          this.rates.wrong_rate += 1
          this.$message.error('继续加油')
          utility.speak('继续加油')
        }
      },
      generate () {
        this.reset()

        this.result = -1
        var questions = []

        while(this.result < 0 || this.result > this.setting.ranges){
          questions = []  
          for (var i = 0; i < this.setting.amount; i++) {
            if (i !== 0) {
              questions.push(this.pick_operator())
            }
            questions.push(this.pick_number())
          }
          this.result = Number(eval(questions.join('')))
        }

        this.question.questions = questions
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
        var max = 1.5 * this.setting.ranges / this.setting.amount
        return Math.floor(Math.random() * max)
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
          is_correct: is_correct,
          score: this.score()
        }
        web.create(record)
      },
      score (){
        return (this.question.questions.length + 1) / 2
      }
    },
    components: {
      setting, question, result
    }
  }
</script>
