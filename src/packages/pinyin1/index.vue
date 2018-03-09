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
import pinyin from '@/pinyin'
import utility from '../utility'

export default {
  data () {
    return {
      setting: {
        amount: 8
      },
      question: {
        questions: [],
        answer: []
      },
      rates: {
        correct_rate: 0,
        wrong_rate: 0
      },
      result: [],
      chars: pinyin.shengmus.concat(pinyin.yunmus)
    }
  },
  methods: {
    submit () {
      var is_correct = false

      if (this.question.answer.length === this.result.length){
        var test = this.result.every( (char) => {
          return this.question.answer.includes(char)
        })
        if (test) {
          is_correct = true
        }
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
      
      var questions = []

      for (var i = 0; i < this.setting.amount;) {
        var char = this.pick_char()
        if (!questions.includes(char)) {
          questions.push(char)
          i++
          if (pinyin.yunmus.includes(char)) {
            this.result.push(char)
          }
        }
      }

      this.question.questions = questions
    },
    restart () {
      this.rates.correct_rate = 0
      this.rates.wrong_rate = 0
    },
    pick_char () {
      var idx = Math.floor(Math.random() * this.chars.length)
      return this.chars[idx]
    },
    reset() {
      this.question.questions = []
      this.question.answer = []

      this.result = []
    },
    save_question (is_correct) {
      var record = {
        kind: 1,
        question: this.question.questions.join(' '),
        answer: this.question.answer.join(' '),
        result: this.result.join(' '),
        is_correct: is_correct,
        score: this.score()
      }
      web.create(record)
    },
    score (){
      return Math.floor((this.setting.amount) / 4)
    }
  },
  components: {
    setting, question, result
  }
}
</script>

<style scoped>
span.el-checkbox__label {
  font-size: 60px;
}
</style>