<template>
  <div>sss</div>
  <div v:bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"> sssss </div>
  <div>sss</div>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <div>{{ t('test.about') }}</div>
  <div>{{ t('test2.go') }}</div>
  <button @click="change">切换语言</button>
  <el-icon><ep-add-location /></el-icon>
  <el-button size="mini">ss</el-button>
  <el-radio v-model="radio1" label="1">Option 1</el-radio>
  <el-radio v-model="radio1" label="2">Option 2</el-radio>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
const { t, availableLocales, locale } = useI18n()

const rootStyle = document.documentElement.style
console.log(rootStyle)
const radio1 = ref('')

function change() {
  const color = useCssVar('--el-color-primary', document.documentElement)
  color.value = '#df8543'
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

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
