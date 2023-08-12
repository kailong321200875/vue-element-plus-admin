<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { ElButton } from 'element-plus'
import { useRouter } from 'vue-router'

const { push } = useRouter()

const openTab = (item: number) => {
  push(`/function/multiple-tabs-demo/${item}`)
}
</script>

<template>
  <ContentWrap>
    <ElButton v-for="item in 5" :key="item" type="primary" @click="openTab(item)">
      打开详情页{{ item }}
    </ElButton>
  </ContentWrap>
</template>
