<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { ref, unref } from 'vue'
import { ElButton, ElDivider, ElRow, ElCol } from 'element-plus'
import { hasPermi } from '@/components/Permission'

const permission = ref('add')

setTimeout(() => {
  permission.value = 'view'
}, 3000)
</script>

<template>
  <ContentWrap>
    <ElDivider>组件方式判断（已经全局注册，支持动态修改）</ElDivider>
    <ElRow :gutter="20">
      <ElCol :span="8">
        新增权限：
        <Permission permission="add">
          <ElButton type="primary"> Add </ElButton>
        </Permission>
      </ElCol>
      <ElCol :span="8">
        删除权限：
        <Permission permission="delete">
          <ElButton type="danger"> Delete </ElButton>
        </Permission>
      </ElCol>
      <ElCol :span="8">
        3秒后切换查看权限：
        <Permission :permission="permission">
          <ElButton type="primary"> View </ElButton>
        </Permission>
      </ElCol>
    </ElRow>

    <ElDivider>指令方式判断（已经全局注册，不支持动态修改）</ElDivider>
    <ElRow :gutter="20">
      <ElCol :span="8">
        新增权限：
        <ElButton v-hasPermi="'add'" type="primary"> Add </ElButton>
      </ElCol>
      <ElCol :span="8">
        删除权限：
        <ElButton v-hasPermi="'delete'" type="danger"> Delete </ElButton>
      </ElCol>
      <ElCol :span="8">
        3秒后切换查看权限（无法动态修改）：
        <ElButton v-hasPermi="permission" type="primary"> View </ElButton>
      </ElCol>
    </ElRow>

    <ElDivider>函数方式判断</ElDivider>
    <ElRow :gutter="20">
      <ElCol :span="8">
        新增权限：
        <ElButton v-if="hasPermi('add')" type="primary"> Add </ElButton>
      </ElCol>
      <ElCol :span="8">
        删除权限：
        <ElButton v-if="hasPermi('delete')" type="danger"> Delete </ElButton>
      </ElCol>
      <ElCol :span="8">
        3秒后切换查看权限：
        <ElButton v-if="hasPermi(unref(permission))" type="primary"> View </ElButton>
      </ElCol>
    </ElRow>
  </ContentWrap>
</template>
