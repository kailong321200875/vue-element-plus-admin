<template>
  <info-write @success="success" />
</template>

<script setup lang="ts" name="ExampleAdd">
import InfoWrite from './components/InfoWrite.vue'
import bus from '@/vue-bus'
function success(type: string) {
  bus.$emit('success', type)
}
</script>
