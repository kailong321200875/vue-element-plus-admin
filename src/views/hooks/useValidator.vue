<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { Form, FormSchema } from '@/components/Form'
import { useValidator } from '@/hooks/web/useValidator'
import { useForm } from '@/hooks/web/useForm'
import { reactive } from 'vue'
import { FormItemRule } from 'element-plus'

const { formRegister, formMethods } = useForm()

const { getFormData } = formMethods

const { required, lengthRange, notSpace, notSpecialCharacters } = useValidator()

const formSchema = reactive<FormSchema[]>([
  {
    field: 'field1',
    label: '必填',
    component: 'Input'
  },
  {
    field: 'field2',
    label: '长度范围',
    component: 'Input'
  },
  {
    field: 'field3',
    label: '不能有空格',
    component: 'Input'
  },
  {
    field: 'field4',
    label: '不能有特殊字符',
    component: 'Input'
  },
  {
    field: 'field5',
    label: '是否相等-值1',
    component: 'Input'
  },
  {
    field: 'field6',
    label: '是否相等-值2',
    component: 'Input'
  }
])

const rules = reactive<{
  [key: string]: FormItemRule[]
}>({
  field1: [required()],
  field2: [
    lengthRange({
      min: 2,
      max: 5
    })
  ],
  field3: [notSpace()],
  field4: [notSpecialCharacters()],
  field5: [
    {
      asyncValidator: async (_, val, callback) => {
        const formData = await getFormData()
        const { field6 } = formData
        if (val !== field6) {
          callback(new Error('两个值不相等'))
        } else {
          callback()
        }
      }
    }
  ]
})
</script>

<template>
  <ContentWrap title="useValidator">
    <Form :schema="formSchema" :rules="rules" @register="formRegister" />
  </ContentWrap>
</template>
