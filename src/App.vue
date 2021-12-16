<script setup lang="ts">
import { reactive } from 'vue'
import { ElConfigProvider, ElIcon } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
// import en from 'element-plus/lib/locale/lang/en'
import { VFrom } from '@/components/Form'
import Calendar from '~icons/ep/calendar'

const schema = reactive<VFormSchema[]>([
  {
    field: 'field1',
    component: 'Divider',
    componentProps: {
      text: 'Input'
    }
  },
  {
    field: 'field2',
    label: 'default',
    component: 'Input'
  },
  {
    field: 'field3',
    label: 'input-icon1',
    component: 'Input',
    componentProps: {
      suffixIcon: Calendar,
      prefixIcon: Calendar
    }
  },
  {
    field: 'field4',
    label: 'input-icon2',
    component: 'Input',
    componentProps: {
      slots: {
        suffix: true,
        prefix: true
      }
    }
  },
  {
    field: 'field5',
    label: 'input-mixed',
    component: 'Input',
    componentProps: {
      slots: {
        prepend: true,
        append: true
      }
    }
  },
  {
    field: 'field6',
    label: 'textarea',
    component: 'Input',
    componentProps: {
      type: 'textarea',
      rows: 1
    }
  },
  {
    field: 'field7',
    component: 'Divider',
    componentProps: {
      text: 'Autocomplete'
    }
  }
])
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <VFrom :schema="schema">
      <template #field4-prefix>
        <ElIcon class="el-input__icon"><Calendar /></ElIcon>
      </template>
      <template #field4-suffix>
        <ElIcon class="el-input__icon"><Calendar /></ElIcon>
      </template>

      <template #field5-prepend> Http:// </template>
      <template #field5-append> .com </template>
    </VFrom>
  </ElConfigProvider>
</template>
