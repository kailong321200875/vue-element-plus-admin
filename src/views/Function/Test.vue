<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { ref, unref } from 'vue'
import { ElDivider, ElRow, ElCol } from 'element-plus'
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
          <BaseButton type="primary"> Add </BaseButton>
        </Permission>
      </ElCol>
      <ElCol :span="8">
        删除权限：
        <Permission permission="delete">
          <BaseButton type="danger"> Delete </BaseButton>
        </Permission>
      </ElCol>
      <ElCol :span="8">
        3秒后切换查看权限：
        <Permission :permission="permission">
          <BaseButton type="primary"> View </BaseButton>
        </Permission>
      </ElCol>
    </ElRow>

    <ElDivider>指令方式判断（已经全局注册，不支持动态修改）</ElDivider>
    <ElRow :gutter="20">
      <ElCol :span="8">
        新增权限：
        <BaseButton v-hasPermi="'add'" type="primary"> Add </BaseButton>
      </ElCol>
      <ElCol :span="8">
        删除权限：
        <BaseButton v-hasPermi="'delete'" type="danger"> Delete </BaseButton>
      </ElCol>
      <ElCol :span="8">
        3秒后切换查看权限（无法动态修改）：
        <BaseButton v-hasPermi="permission" type="primary"> View </BaseButton>
      </ElCol>
    </ElRow>

    <ElDivider>函数方式判断</ElDivider>
    <ElRow :gutter="20">
      <ElCol :span="8">
        新增权限：
        <BaseButton v-if="hasPermi('add')" type="primary"> Add </BaseButton>
      </ElCol>
      <ElCol :span="8">
        删除权限：
        <BaseButton v-if="hasPermi('delete')" type="danger"> Delete </BaseButton>
      </ElCol>
      <ElCol :span="8">
        3秒后切换查看权限：
        <BaseButton v-if="hasPermi(unref(permission))" type="primary"> View </BaseButton>
      </ElCol>
    </ElRow>
  </ContentWrap>
</template>
