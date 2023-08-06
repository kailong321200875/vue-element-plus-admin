<script setup lang="tsx">
import { Descriptions } from '@/components/Descriptions'
import { useI18n } from '@/hooks/web/useI18n'
import { reactive } from 'vue'
import { Form } from '@/components/Form'
import { ElFormItem, ElInput, ElButton } from 'element-plus'
import { useValidator } from '@/hooks/web/useValidator'
import { useForm } from '@/hooks/web/useForm'
import { DescriptionsSchema } from '@/components/Descriptions'

const { required } = useValidator()

const { t } = useI18n()

const data = reactive({
  username: 'chenkl',
  nickName: '梦似花落。',
  age: 26,
  phone: '13655971xxxx',
  email: '502431556@qq.com',
  addr: '这是一个很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的地址',
  sex: '男',
  certy: '3505831994xxxxxxxx'
})

const schema = reactive<DescriptionsSchema[]>([
  {
    field: 'username',
    label: t('descriptionsDemo.username')
  },
  {
    field: 'nickName',
    label: t('descriptionsDemo.nickName')
  },
  {
    field: 'phone',
    label: t('descriptionsDemo.phone')
  },
  {
    field: 'email',
    label: t('descriptionsDemo.email')
  },
  {
    field: 'addr',
    label: t('descriptionsDemo.addr')
  }
])

const schema2 = reactive<DescriptionsSchema[]>([
  {
    field: 'username',
    label: t('descriptionsDemo.username'),
    slots: {
      label: (row) => {
        return <span class="is-required--item">{row.label}</span>
      },
      default: () => {
        return (
          <ElFormItem prop="username">
            <ElInput v-model={form.username} />
          </ElFormItem>
        )
      }
    }
  },
  {
    field: 'nickName',
    label: t('descriptionsDemo.nickName'),
    slots: {
      label: (row) => {
        return <span class="is-required--item">{row.label}</span>
      },
      default: () => {
        return (
          <ElFormItem prop="nickName">
            <ElInput v-model={form.nickName} />
          </ElFormItem>
        )
      }
    }
  },
  {
    field: 'phone',
    label: t('descriptionsDemo.phone'),
    slots: {
      label: (row) => {
        return <span class="is-required--item">{row.label}</span>
      },
      default: () => {
        return (
          <ElFormItem prop="phone">
            <ElInput v-model={form.phone} />
          </ElFormItem>
        )
      }
    }
  },
  {
    field: 'email',
    label: t('descriptionsDemo.email'),
    slots: {
      label: (row) => {
        return <span class="is-required--item">{row.label}</span>
      },
      default: () => {
        return (
          <ElFormItem prop="email">
            <ElInput v-model={form.email} />
          </ElFormItem>
        )
      }
    }
  },
  {
    field: 'addr',
    label: t('descriptionsDemo.addr'),
    slots: {
      label: (row) => {
        return <span class="is-required--item">{row.label}</span>
      },
      default: () => {
        return (
          <ElFormItem prop="addr">
            <ElInput v-model={form.addr} />
          </ElFormItem>
        )
      }
    }
  }
])

const form = reactive({
  username: '',
  nickName: '',
  phone: '',
  email: '',
  addr: ''
})

const rules = reactive({
  username: [required()],
  nickName: [required()],
  phone: [required()],
  email: [required()],
  addr: [required()]
})

const { formRegister, formMethods } = useForm()
const { getElFormExpose } = formMethods

const formValidation = async () => {
  const elFormExpose = await getElFormExpose()
  elFormExpose?.validate((isValid) => {
    console.log(isValid)
  })
}
</script>

<template>
  <Descriptions
    :title="t('descriptionsDemo.descriptions')"
    :message="t('descriptionsDemo.descriptionsDes')"
    :data="data"
    :schema="schema"
  />

  <Form is-custom :model="form" :rules="rules" @register="formRegister">
    <Descriptions
      :title="t('descriptionsDemo.form')"
      :data="data"
      :schema="schema2"
      class="mt-20px"
    />
    <div class="text-center mt-10px">
      <ElButton @click="formValidation"> {{ t('formDemo.formValidation') }} </ElButton>
    </div>
  </Form>
</template>

<style lang="less" scoped>
:deep(.is-required--item) {
  position: relative;

  &::before {
    margin-right: 4px;
    color: var(--el-color-danger);
    content: '*';
  }
}
</style>
