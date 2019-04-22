<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>难度</span>
      </div>
      <el-form :model="setting" label-width="100px">
        <el-form-item label="候选词数量">
          <el-slider v-model="setting.amount" show-stops :min="5" :max="10">
          </el-slider>
        </el-form-item>
        <el-form-item label="朗读次数">
          <el-slider v-model="setting.speak_amount" show-stops :max="5">
          </el-slider>
        </el-form-item>
        <el-form-item label="语文书">
          <el-checkbox-group v-model="setting.units" :min="1">
            <el-checkbox v-for="val in [1,2,3,4,5,6,7,8]" border :key="val" :label="val">第{{val}}单元</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">出题</el-button>
          <el-button type="primary" @click="restart">重新开始</el-button>
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
