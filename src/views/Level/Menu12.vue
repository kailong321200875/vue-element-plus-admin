<script setup lang="ts">
import { useI18n } from '@/hooks/web/useI18n'

defineOptions({
  name: 'Menu12'
})

const { t } = useI18n()

const text = ref('')
</script>

<template>
  <ContentWrap :title="t('levelDemo.menu')">
    <div class="flex items-center"> Menu12: <ElInput v-model="text" class="pl-20px" /> </div>
  </ContentWrap>
</template>
