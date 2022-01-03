<script setup lang="ts">
import { Form } from '@/components/Form'

const schema: FormSchema[] = [
  {
    field: 'username',
    component: 'Input'
  },
  {
    field: 'password',
    component: 'InputPassword'
  }
]
</script>

<template>
  <Form :schema="schema" :label-width="0" />
</template>
