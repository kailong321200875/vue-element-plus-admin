<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { ElInput } from 'element-plus'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTagsView } from '@/hooks/web/useTagsView'

const { setTitle } = useTagsView()

const { query } = useRoute()

const val = ref(query.id as string)

setTitle(`详情页query-${val.value}`)
</script>

<template>
  <ContentWrap> 获取参数： <ElInput v-model="val" /> </ContentWrap>
</template>
