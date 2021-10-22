<template>
  <info-write :id="id" @success="success" />
</template>

<script setup lang="ts">
import InfoWrite from './components/InfoWrite.vue'
import bus from '@/vue-bus'
import { useRoute } from 'vue-router'
const { query } = useRoute()
const id = query.id as string

// 成功之后的回调
function success(type: string) {
  // 由于使用的是页面跳转，所以只能通过vueBus去进行通信
  bus.$emit('success', type)
}
</script>
