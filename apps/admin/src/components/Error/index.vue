<script setup lang="ts">
  import pageError from '@/assets/svgs/404.svg'
  import { ElButton } from 'element-plus'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const emit = defineEmits(['errorClick'])

  const btnClick = () => {
    emit('errorClick')
  }
</script>

<template>
  <div class="flex justify-center">
    <div class="text-center">
      <img width="350" :src="pageError" alt="" />
      <div class="text-14px text-[var(--el-color-info)]">{{ t('error.pageError') }}</div>
      <div class="mt-20px">
        <ElButton type="primary" @click="btnClick">{{ t('error.returnToHome') }}</ElButton>
      </div>
    </div>
  </div>
</template>
