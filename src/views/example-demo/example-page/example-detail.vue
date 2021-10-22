<template>
  <detail :id="id" />
</template>

<script setup lang="ts" name="ExampleDetail">
import Detail from './components/Detail.vue'
import { useRoute } from 'vue-router'
const { query } = useRoute()
const id = query.id as string
</script>
