<script setup lang="ts">
import { ref, onMounted, unref, reactive } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
// import en from 'element-plus/lib/locale/lang/en'
import { VFrom, VFormExpose } from '@/components/Form'
const formRef = ref<ComponentRef<typeof VFrom> & VFormExpose>()
import { useI18n } from '@/hooks/web/useI18n'
const { t } = useI18n()

onMounted(() => {
  const form = unref(formRef.value)
  console.log(form)
})
const schema = reactive<VFormSchema[]>([
  {
    field: 'field1',
    component: 'Divider',
    componentProps: {
      text: 'input示例'
    }
  },
  {
    field: 'field2',
    label: '字段1',
    component: 'Input'
  }
])
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <!-- <VFrom ref="formRef" is-custom>
      <template #default> hahahah </template>
    </VFrom> -->
    <VFrom :schema="schema" />
    <!-- <VFrom :is-col="false" :schema="schema" /> -->
    <!-- <Component :is="VFrom" /> -->
    <!-- <RouterView class="app" /> -->
    <div>{{ t('common.inputText') }}</div>
  </ElConfigProvider>
</template>
