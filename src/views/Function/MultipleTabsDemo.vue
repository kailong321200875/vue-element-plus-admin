<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { ElInput } from 'element-plus'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTagsView } from '@/hooks/web/useTagsView'

const { setTitle } = useTagsView()

const { params } = useRoute()

const val = ref(params.id as string)

setTitle(`详情页-${val.value}`)
</script>

<template>
  <ContentWrap> 获取参数： <ElInput v-model="val" /> </ContentWrap>
</template>
