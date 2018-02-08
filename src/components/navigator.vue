<template lang="html">
  <div>
    <el-menu router mode="horizontal">
      <el-menu-item index="/">数学</el-menu-item>
      <el-submenu index="2">
        <template slot="title">拼音</template>
        <el-menu-item index="/pinyin">区分声母，韵母</el-menu-item>
        <el-menu-item index="/pinyin2">写拼音</el-menu-item>
      </el-submenu>
      <el-menu-item index="/report">报告</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>

<style>
</style>
