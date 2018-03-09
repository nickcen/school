<template>
  <div>
    <setting :setting="setting" @submit="generate"/>
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
        books: [1, 2]
      },
      question: {
        question: null,
        answer: null
      },
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

      var chars = []
      var pys = []

      if (this.setting.books.includes(1)){
        chars = chars.concat(book.book1)
        pys = pys.concat(book.book1_py)
      }

      if (this.setting.books.includes(2)){
        chars = chars.concat(book.book2)
        pys = pys.concat(book.book2_py)
      }

      var idx = Math.floor(Math.random() * chars.length)
      this.question.question = chars[idx]
      this.result = pys[idx]
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
    save_question (is_correct) {
      var record = {
        kind: 2,
        question: this.question.question,
        answer: this.question.answer,
        result: this.result,
        is_correct: is_correct,
        score: this.score()
      }
      web.create(record)
    },
    score (){
      return 3
    }
  },
  components: {
    setting, question, result
  }
}
</script>
