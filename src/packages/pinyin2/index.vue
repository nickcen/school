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
            {{ this.char }}
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
        books: [1]
      },
      rates: {
        correct_rate: 0,
        wrong_rate: 0
      },
      char: null, 
      result: null,
      answer: null,
      book1: ['人', '口', '大', '中', '小', '哭', '笑', '一', '上', '下', '爸', '妈', '天', '太', '月', '二', '地', '阳', '亮', '星', '云', '火', '水', '三', '土', '山', '石', '木', '我', '好', '有', '田', '牛', '羊', '聪', '耳', '目', '心', '和', '四', '明', '头', '眉', '鼻', '手', '花', '树', '五', '草', '叶', '日', '风', '雨', '的', '孩', '六', '白', '红', '是', '家', '多', '唱', '子', '七', '爱', '爷', '奶', '少', '歌', '不', '朋', '八', '宝', '在', '学', '书', '游', '友', '儿', '九', '贝', '生', '习', '看', '戏', '字', '气', '十'],
      book1_py: ['ren', 'kou', 'da', 'zhong', 'xiao', 'ku', 'xiao', 'yi', 'shang', 'xia', 'ba', 'ma', 'tian', 'tai', 'yue', 'er', 'de', 'yang', 'liang', 'xing', 'yun', 'huo', 'shui', 'san', 'tu', 'shan', 'shi', 'mu', 'wo', 'hao', 'you', 'tian', 'niu', 'yang', 'cong', 'er', 'mu', 'xin', 'he', 'si', 'ming', 'tou', 'mei', 'bi', 'shou', 'hua', 'shu', 'wu', 'cao', 'ye', 'ri', 'feng', 'yu', 'de', 'hai', 'liu', 'bai', 'hong', 'shi', 'jia', 'duo', 'chang', 'zi', 'qi', 'ai', 'ye', 'nai', 'shao', 'ge', 'bu', 'peng', 'ba', 'bao', 'zai', 'xue', 'shu', 'you', 'you', 'r', 'jiu', 'bei', 'sheng', 'xi', 'kan', 'xi', 'zi', 'qi', 'shi'],
      book2: ['会', '见', '早', '雪', '鸡', '绿', '黄', '青', '鱼', '做', '飞', '跑', '要', '吃', '鸟', '他', '们', '春', '夏', '秋', '冬', '季', '都', '个', '狗', '猫', '蓝', '落', '真', '开', '说', '也', '马', '米', '哥', '姐', '来', '黑', '去', '出', '跳', '着', '了', '你', '又', '弟', '妹', '东', '就', '还', '快', '得', '西', '乐', '到', '起', '玩', '捉', '迷', '球', '很', '高', '鸭', '哈', '方', '爬', '藏', '兴', '向', '对', '能', '叫', '变', '问', '成', '再', '急', '教', '门', '只', '回', '公', '打', '兔', '请', '过', '吗', '泳'],
      book2_py: ['hui', 'jian', 'zao', 'xue', 'ji', 'lu', 'huang', 'qing', 'yu', 'zuo', 'fei', 'pao', 'yao', 'chi', 'niao', 'ta', 'men', 'chun', 'xia', 'qiu', 'dong', 'ji', 'dou', 'ge', 'gou', 'mao', 'lan', 'luo', 'zhen', 'kai', 'shuo', 'ye', 'ma', 'mi', 'ge', 'jie', 'lai', 'hei', 'qu', 'chu', 'tiao', 'zhe', 'le', 'ni', 'you', 'di', 'mei', 'dong', 'jiu', 'hai', 'kuai', 'de', 'xi', 'le', 'dao', 'qi', 'wan', 'zhuo', 'mi', 'qiu', 'hen', 'gao', 'ya', 'ha', 'fang', 'pa', 'cang', 'xing', 'xiang', 'dui', 'neng', 'jiao', 'bian', 'wen', 'cheng', 'zai', 'ji', 'jiao', 'men', 'zhi', 'hui', 'gong', 'da', 'tu', 'qing', 'guo', 'ma', 'yong']
    }
  },
  methods: {
    submit () {
      var is_correct = false
      if (this.answer === this.result) {
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
        kind: 'pinyin2',
        question: this.char,
        answer: this.answer,
        result: this.result,
        is_correct: is_correct
      }
      web.create(question)
      if (is_correct) {
        this.answer = null
        this.generate()
      }
      this.$refs['answer'].focus()
    },
    generate () {
      var chars = []
      var pys = []

      if (this.form.books.includes(1)){
        chars = chars.concat(this.book1)
        pys = pys.concat(this.book1_py)
      }

      if (this.form.books.includes(2)){
        chars = chars.concat(this.book2)
        pys = pys.concat(this.book2_py)
      }

      var idx = Math.floor(Math.random() * chars.length)
      this.char = chars[idx]
      this.result = pys[idx]
    }
  },
  components: {
    setting, result
  }
}
</script>
