<template>
  <div id="app">
    <el-container>
      <el-header>
        <navigator/>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer>
        @小远 & 淇淇
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import navigator from '@/components/navigator'

export default {
  name: 'App',
  components: {
    navigator
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
