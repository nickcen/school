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
import book from '@/book'
import utility from '../utility'

export default {
  data () {
    return {
      setting: {
        units: [1, 2, 3, 4],
        speak_amount: 3,
        amount: 5
      },
      rates: {
        correct_rate: 0,
        wrong_rate: 0
      },
      question: {
        questions: [],
        answer: null  
      },
      result: null
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
        utility.speak(this.result, this.setting.speak_amount)
      }
    },
    generate () {
      this.reset()

      var chars = []

      for (var i = 0; i < this.setting.units.length; i++) {
        var unit = this.setting.units[i]

        chars = chars.concat(book.book_2[unit-1])
      }

      var questions = []
      for (var i = 0; i < this.setting.amount;) {
        var char = this.pick_char(chars)
        if (!questions.includes(char)) {
          questions.push(char)
          i++
        }
      }

      var idx = Math.floor(Math.random() * questions.length)

      this.question.questions = questions
      this.result = questions[idx]

      utility.speak(this.result, this.setting.speak_amount, 0.7)
    },
    restart () {
      this.rates.correct_rate = 0
      this.rates.wrong_rate = 0
    },
    reset() {
      this.question.questions = []
      this.question.answer = null

      this.result = null
    },
    pick_char (chars) {
      var idx = Math.floor(Math.random() * chars.length)
      return chars[idx]
    },
    save_question (is_correct) {
      var record = {
        kind: 3,
        question: this.question.questions.join(' '),
        answer: this.question.answer,
        result: this.result,
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
