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
      <el-form :model="form" label-width="80px">
        <el-form-item>
          <el-checkbox-group v-model="right">
            <el-checkbox v-for="val in left" :label='val' :key="val"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">回答</el-button>
        </el-form-item>
      </el-form>
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
        amount: 5
      },
      rates: {
        correct_rate: 0,
        wrong_rate: 0
      },
      shengmus: ['b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'zh', 'ch', 'sh', 'r', 'z', 'c', 's'],
      yunmus: ['a', 'o', 'e', 'i', 'u', 'ü', 'ai', 'ei', 'ui', 'ao', 'ou', 'iu', 'ie', 'üe', 'er', 'an', 'en', 'in', 'un', 'ün', 'ang', 'eng', 'ing', 'ong'],
      left: [],
      right: [],
      answer: []
    }
  },
  methods: {
    submit () {
      var is_correct = false;
      var test = this.right.every( (char) => {
        return this.answer.includes(char)
      })

      if (test && this.answer.length === this.right.length) {
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
        kind: 'pinyin',
        question: this.left.join(' '),
        answer: this.right.join(' '),
        result: this.answer.join(' '),
        is_correct: is_correct
      }
      web.create(question)  
      if (is_correct) {
        this.answer = []
        this.generate()
      }
    },
    generate () {
      var left = []
      var chars = [].concat(this.shengmus).concat(this.yunmus)

      for (var i = 0; i < this.form.amount;) {
        var idx = Math.floor(Math.random() * chars.length)
        var char = chars[idx]
        if (!left.includes(char)) {
          left.push(char)
          i++
          if (this.yunmus.includes(char)) {
            this.answer.push(char)
          }
        }
      }

      this.left = left
      this.right = []
    }
  },
  components: {
    setting, result
  }
}
</script>
