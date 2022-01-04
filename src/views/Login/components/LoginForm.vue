<script setup lang="ts">
import { Form } from '@/components/Form'
import { useI18n } from '@/hooks/web/useI18n'
import { ElButton } from 'element-plus'

const { t } = useI18n()

const schema: FormSchema[] = [
  {
    field: 'username',
    label: t('login.username'),
    component: 'Input',
    colProps: {
      span: 24
    }
  },
  {
    field: 'password',
    label: t('login.password'),
    component: 'InputPassword',
    colProps: {
      span: 24
    },
    componentProps: {
      style: {
        width: '100%'
      }
    }
  },
  {
    field: 'login'
  }
]
</script>

<template>
  <Form :schema="schema" label-position="top">
    <template #login>
      <ElButton type="primary" class="w-[100%]">{{ t('login.login') }}</ElButton>
    </template>
  </Form>
</template>
