<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { useRouter } from 'vue-router'

const { push } = useRouter()

const openTab = (item: number) => {
  push(`/function/multiple-tabs-demo/${item}`)
}
</script>

<template>
  <ContentWrap>
    <BaseButton v-for="item in 5" :key="item" type="primary" @click="openTab(item)">
      打开详情页{{ item }}
    </BaseButton>
  </ContentWrap>
</template>
