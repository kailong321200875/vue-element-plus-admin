<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { ElButton } from 'element-plus'
import { useTagsView } from '@/hooks/web/useTagsView'
import { useRouter } from 'vue-router'

const { push } = useRouter()

const { closeAll, closeLeft, closeRight, closeOther, closeCurrent, refreshPage } = useTagsView()

const closeAllTabs = () => {
  closeAll(() => {
    push('/dashboard/analysis')
  })
}

const closeLeftTabs = () => {
  closeLeft()
}

const closeRightTabs = () => {
  closeRight()
}

const closeOtherTabs = () => {
  closeOther()
}

const refresh = () => {
  refreshPage()
}

const closeCurrentTab = () => {
  closeCurrent(undefined, () => {
    push('/dashboard/analysis')
  })
}
</script>

<template>
  <ContentWrap title="useTagsView">
    <ElButton @click="closeAllTabs"> 关闭所有标签页 </ElButton>
    <ElButton @click="closeLeftTabs"> 关闭左侧标签页 </ElButton>
    <ElButton @click="closeRightTabs"> 关闭右侧标签页 </ElButton>
    <ElButton @click="closeOtherTabs"> 关闭其他标签页 </ElButton>
    <ElButton @click="closeCurrentTab"> 关闭当前标签页 </ElButton>
    <ElButton @click="refresh"> 刷新当前标签页 </ElButton>
  </ContentWrap>
</template>
@/hooks/web/useTagsView
