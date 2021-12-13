<script setup lang="ts">
import { ref, onMounted, unref } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
// import en from 'element-plus/lib/locale/lang/en'
import { VFrom, VFormExpose } from '@/components/Form'
const formRef = ref<ComponentRef<typeof VFrom> & VFormExpose>()

onMounted(() => {
  const form = unref(formRef.value)
  console.log(form?.$el)

  const schema: VFormSchema = [
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
    <VFrom ref="formRef" />
    <Component :is="VFrom" />
    <!-- <RouterView class="app" /> -->
  </ElConfigProvider>
</template>
