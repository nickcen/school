<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>难度</span>
      </div>
      <el-form :model="setting" label-width="100px">
        <el-form-item label="数学">
          <el-slider v-model="setting.math1" show-stops :min="0" :max="5">
          </el-slider>
        </el-form-item>
        <el-form-item label="声母/韵母">
          <el-slider v-model="setting.pinyin1" show-stops :min="0" :max="5">
          </el-slider>
        </el-form-item>
        <el-form-item label="写拼音">
          <el-slider v-model="setting.pinyin2" show-stops :min="0" :max="5">
          </el-slider>
        </el-form-item>
        <el-form-item label="选生字">
          <el-slider v-model="setting.pinyin3" show-stops :min="0" :max="5">
          </el-slider>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">计算</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    setting: {
      type: Object
    }
  },
  methods: {
    submit () {
      this.$emit('submit')
    },
    restart () {
      this.$emit('restart')
    }
  }
}
</script>
