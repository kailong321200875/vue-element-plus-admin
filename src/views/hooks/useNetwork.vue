<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { useNetwork } from '@/hooks/web/useNetwork'

const { online } = useNetwork()
</script>

<template>
  <ContentWrap title="useNetwork">
    当前网络状态: <code>{{ online ? '已连接' : '已断开' }}</code>
  </ContentWrap>
</template>
