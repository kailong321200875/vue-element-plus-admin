<script setup lang="ts">
import { Form, FormSchema } from '@/components/Form'
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { useForm } from '@/hooks/web/useForm'
import { reactive, unref, ref } from 'vue'
import { ElButton, ElInput, FormItemProp, ComponentSize } from 'element-plus'
import { useValidator } from '@/hooks/web/useValidator'
import { getDictOneApi } from '@/api/common'

const { required } = useValidator()

const { t } = useI18n()

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
    },
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'field3',
    label: t('formDemo.radio'),
    component: 'RadioGroup',
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
    component: 'CheckboxGroup',
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

const { formRegister, formMethods } = useForm()
const {
  setProps,
  delSchema,
  addSchema,
  setValues,
  setSchema,
  getComponentExpose,
  getFormItemExpose,
  getElFormExpose
} = formMethods

const changeLabelWidth = (width: number | string) => {
  setProps({
    labelWidth: width
  })
}

const changeSize = (size: ComponentSize) => {
  setProps({
    size
  })
}

const changeDisabled = (bool: boolean) => {
  setProps({
    disabled: bool
  })
}

const changeSchema = (del: boolean) => {
  if (del) {
    delSchema('field2')
  } else if (!del && schema[1].field !== 'field2') {
    addSchema(
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
      1
    )
  }
}

const setValue = async (reset: boolean) => {
  const elFormExpose = await getElFormExpose()
  if (reset) {
    elFormExpose?.resetFields()
  } else {
    setValues({
      field1: 'field1',
      field2: '2',
      field3: '2',
      field4: ['1', '3'],
      field5: '2022-01-27',
      field6: '17:00'
    })
  }
}

const index = ref(7)

const setLabel = () => {
  setSchema([
    {
      field: 'field2',
      path: 'label',
      value: `${t('formDemo.select')} ${index.value}`
    },
    {
      field: 'field2',
      path: 'componentProps.options',
      value: [
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
  ])
  index.value++
}

const addItem = () => {
  if (unref(index) % 2 === 0) {
    addSchema({
      field: `field${unref(index)}`,
      label: `${t('formDemo.input')}${unref(index)}`,
      component: 'Input'
    })
  } else {
    addSchema(
      {
        field: `field${unref(index)}`,
        label: `${t('formDemo.input')}${unref(index)}`,
        component: 'Input'
      },
      unref(index)
    )
  }
  index.value++
}

const formValidation = async () => {
  const elFormExpose = await getElFormExpose()
  elFormExpose?.validate((isValid) => {
    console.log(isValid)
  })
}

const verifyReset = async () => {
  const elFormExpose = await getElFormExpose()
  elFormExpose?.resetFields()
}

const getDictOne = async () => {
  const res = await getDictOneApi()
  if (res) {
    setSchema([
      {
        field: 'field2',
        path: 'componentProps.options',
        value: res.data
      }
    ])
  }
}

const inoutFocus = async () => {
  const inputEl: ComponentRef<typeof ElInput> = await getComponentExpose('field1')
  inputEl?.focus()
}

const inoutValidation = async () => {
  const formItem = await getFormItemExpose('field1')
  const inputEl: ComponentRef<typeof ElInput> = await getComponentExpose('field1')
  inputEl?.focus()
  formItem?.validate('focus', (val: boolean) => {
    console.log(val)
  })
}

const formValidate = (prop: FormItemProp, isValid: boolean, message: string) => {
  console.log(prop, isValid, message)
}
</script>

<template>
  <ContentWrap :title="`UseForm ${t('formDemo.operate')}`" style="margin-bottom: 20px">
    <ElButton @click="changeLabelWidth(150)">{{ t('formDemo.change') }} labelWidth</ElButton>
    <ElButton @click="changeLabelWidth('auto')">{{ t('formDemo.restore') }} labelWidth</ElButton>

    <ElButton @click="changeSize('large')">{{ t('formDemo.change') }} size</ElButton>
    <ElButton @click="changeSize('default')">{{ t('formDemo.restore') }} size</ElButton>

    <ElButton @click="changeDisabled(true)">{{ t('formDemo.disabled') }}</ElButton>
    <ElButton @click="changeDisabled(false)">{{ t('formDemo.disablement') }}</ElButton>

    <ElButton @click="changeSchema(true)">
      {{ t('formDemo.delete') }} {{ t('formDemo.select') }}
    </ElButton>
    <ElButton @click="changeSchema(false)">
      {{ t('formDemo.add') }} {{ t('formDemo.select') }}
    </ElButton>

    <ElButton @click="setValue(false)">{{ t('formDemo.setValue') }}</ElButton>
    <ElButton @click="setValue(true)">{{ t('formDemo.resetValue') }}</ElButton>

    <ElButton @click="setLabel">
      {{ t('formDemo.set') }} {{ t('formDemo.select') }} label
    </ElButton>

    <ElButton @click="addItem"> {{ t('formDemo.add') }} {{ t('formDemo.subitem') }} </ElButton>

    <ElButton @click="formValidation"> {{ t('formDemo.formValidation') }} </ElButton>
    <ElButton @click="verifyReset"> {{ t('formDemo.verifyReset') }} </ElButton>

    <ElButton @click="getDictOne">
      {{ `${t('formDemo.select')} ${t('searchDemo.dynamicOptions')}` }}
    </ElButton>

    <ElButton @click="inoutFocus">
      {{ `${t('formDemo.input')} ${t('formDemo.focus')}` }}
    </ElButton>
    <ElButton @click="inoutValidation">
      {{ `${t('formDemo.input')} ${t('formDemo.formValidation')}` }}
    </ElButton>
  </ContentWrap>
  <ContentWrap :title="`UseForm ${t('formDemo.example')}`">
    <Form :schema="schema" @register="formRegister" @validate="formValidate" />
  </ContentWrap>
</template>

<style lang="less" scoped>
.el-button {
  margin-top: 10px;
}
</style>
