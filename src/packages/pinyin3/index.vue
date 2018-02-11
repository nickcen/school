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

export default {
  data () {
    return {
      setting: {
        books: [1],
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
        clearInterval(window.interval)

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

      var chars = []

      if (this.setting.books.includes(1)){
        chars = chars.concat(book.book1)
      }

      if (this.setting.books.includes(2)){
        chars = chars.concat(book.book2)
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

      this.speak()
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
        is_correct: is_correct
      }
      web.create(record)
    },
    speak () {
      var utterThis = new window.SpeechSynthesisUtterance();
      utterThis.text = this.result
      utterThis.lang = 'zh-cn'

      window.speechSynthesis.speak(utterThis);
      var i = 0
      var max_i = this.setting.speak_amount - 1
      window.interval = setInterval(function() {
        window.speechSynthesis.speak(utterThis);
        i++;
        if(i >= max_i) clearInterval(window.interval); 
      }, 1500);
    }
  },
  components: {
    setting, question, result
  }
}
</script>
