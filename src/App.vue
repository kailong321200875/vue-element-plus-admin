<script setup lang="ts">
import { ref, onMounted, unref } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
// import en from 'element-plus/lib/locale/lang/en'
import { BfFrom, BfFormExpose } from '@/components/Form'
const formRef = ref<ComponentRef<typeof BfFrom> & BfFormExpose>()

onMounted(() => {
  const form = unref(formRef.value)
  console.log(form?.$el)

  const schema: BfFormSchema = [
    {
      field: '1',
      colProps: {}
    }
  ]
  console.log(schema)
})
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <BfFrom ref="formRef" />
    <Component :is="BfFrom" />
    <!-- <RouterView class="app" /> -->
  </ElConfigProvider>
</template>
