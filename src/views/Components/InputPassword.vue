<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { InputPassword } from '@/components/InputPassword'
import { ref } from 'vue'

const { t } = useI18n()

const password = ref('')
</script>

<template>
  <ContentWrap
    :title="t('inputPasswordDemo.title')"
    :message="t('inputPasswordDemo.inputPasswordDes')"
  >
    <InputPassword v-model="password" class="mb-20px" />
    <InputPassword v-model="password" strength />
    <InputPassword v-model="password" strength disabled class="mt-20px" />
  </ContentWrap>
</template>
