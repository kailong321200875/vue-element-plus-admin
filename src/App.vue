<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>sss</div>
  <div v:bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"> sssss </div>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div>sss</div>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<style scoped>
#app {
  margin-top: 60px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
}

div {
  color: #2c3e50;
}
</style>
