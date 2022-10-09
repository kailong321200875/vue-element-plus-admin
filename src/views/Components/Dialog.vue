<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { Dialog } from '@/components/Dialog'
import { ElButton } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { ref, reactive, unref } from 'vue'
import { Form, FormExpose } from '@/components/Form'
import { useValidator } from '@/hooks/web/useValidator'
import { getDictOneApi } from '@/api/common'
import { FormSchema } from '@/types/form'

const { required } = useValidator()

const { t } = useI18n()

const dialogVisible = ref(false)

const dialogVisible2 = ref(false)

const schema = reactive<FormSchema[]>([
  {
    field: 'field1',
    label: t('formDemo.input'),
    component: 'Input',
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'field2',
    label: t('formDemo.select'),
    component: 'Select',
    componentProps: {
      options: [
        {
          label: 'option1',
          value: '1'
        },
        {
          label: 'option2',
          value: '2'
        }
      ]
    }
  },
  {
    field: 'field3',
    label: t('formDemo.radio'),
    component: 'Radio',
    componentProps: {
      options: [
        {
          label: 'option-1',
          value: '1'
        },
        {
          label: 'option-2',
          value: '2'
        }
      ]
    }
  },
  {
    field: 'field4',
    label: t('formDemo.checkbox'),
    component: 'Checkbox',
    value: [],
    componentProps: {
      options: [
        {
          label: 'option-1',
          value: '1'
        },
        {
          label: 'option-2',
          value: '2'
        },
        {
          label: 'option-3',
          value: '3'
        }
      ]
    }
  },
  {
    field: 'field5',
    component: 'DatePicker',
    label: t('formDemo.datePicker'),
    componentProps: {
      type: 'date'
    }
  },
  {
    field: 'field6',
    component: 'TimeSelect',
    label: t('formDemo.timeSelect')
  }
])

const getDictOne = async () => {
  const res = await getDictOneApi()
  if (res) {
    schema[1].componentProps!.options = res.data
  }
}
getDictOne()

const formRef = ref<FormExpose>()

const formSubmit = () => {
  unref(formRef)
    ?.getElFormRef()
    ?.validate((valid) => {
      if (valid) {
        console.log('submit success')
      } else {
        console.log('submit fail')
      }
    })
}
</script>

<template>
  <ContentWrap :title="t('dialogDemo.dialog')" :message="t('dialogDemo.dialogDes')">
    <ElButton type="primary" @click="dialogVisible = !dialogVisible">
      {{ t('dialogDemo.open') }}
    </ElButton>

    <ElButton type="primary" @click="dialogVisible2 = !dialogVisible2">
      {{ t('dialogDemo.combineWithForm') }}
    </ElButton>

    <Dialog v-model="dialogVisible" :title="t('dialogDemo.dialog')">
      <div v-for="v in 10000" :key="v">{{ v }}</div>
      <template #footer>
        <ElButton @click="dialogVisible = false">{{ t('dialogDemo.close') }}</ElButton>
      </template>
    </Dialog>

    <Dialog v-model="dialogVisible2" :title="t('dialogDemo.dialog')">
      <Form ref="formRef" :schema="schema" />
      <template #footer>
        <ElButton type="primary" @click="formSubmit">{{ t('dialogDemo.submit') }}</ElButton>
        <ElButton @click="dialogVisible2 = false">{{ t('dialogDemo.close') }}</ElButton>
      </template>
    </Dialog>
  </ContentWrap>
</template>
