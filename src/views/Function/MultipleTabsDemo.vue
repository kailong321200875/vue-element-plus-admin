<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { ElInput } from 'element-plus'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const { params } = useRoute()

const val = ref(params.id as string)
</script>

<template>
  <ContentWrap> 获取参数： <ElInput v-model="val" /> </ContentWrap>
</template>
