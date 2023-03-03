<script setup lang="ts">
import { Descriptions } from '@/components/Descriptions'
import { useI18n } from '@/hooks/web/useI18n'
import { reactive, unref } from 'vue'
import { Form } from '@/components/Form'
import { ElFormItem, ElInput, ElButton } from 'element-plus'
import { useValidator } from '@/hooks/web/useValidator'
import { useForm } from '@/hooks/web/useForm'
import { DescriptionsSchema } from '@/types/descriptions'

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
    label: t('descriptionsDemo.addr'),
    span: 24
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

const { register, elFormRef } = useForm()

const formValidation = () => {
  unref(elFormRef)!.validate((isValid) => {
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

  <Form is-custom :model="form" :rules="rules" @register="register">
    <Descriptions :title="t('descriptionsDemo.form')" :data="data" :schema="schema" class="mt-20px">
      <template #username-label="{ row }">
        <span class="is-required--item">{{ row.label }}</span>
      </template>
      <template #nickName-label="{ row }">
        <span class="is-required--item">{{ row.label }}</span>
      </template>
      <template #phone-label="{ row }">
        <span class="is-required--item">{{ row.label }}</span>
      </template>
      <template #email-label="{ row }">
        <span class="is-required--item">{{ row.label }}</span>
      </template>
      <template #addr-label="{ row }">
        <span class="is-required--item">{{ row.label }}</span>
      </template>

      <template #username>
        <ElFormItem prop="username">
          <ElInput v-model="form.username" />
        </ElFormItem>
      </template>
      <template #nickName>
        <ElFormItem prop="nickName">
          <ElInput v-model="form.nickName" />
        </ElFormItem>
      </template>
      <template #phone>
        <ElFormItem prop="phone">
          <ElInput v-model="form.phone" />
        </ElFormItem>
      </template>
      <template #email>
        <ElFormItem prop="email">
          <ElInput v-model="form.email" />
        </ElFormItem>
      </template>
      <template #addr>
        <ElFormItem prop="addr">
          <ElInput v-model="form.addr" />
        </ElFormItem>
      </template>
    </Descriptions>
    <div class="text-center mt-10px">
      <ElButton @click="formValidation"> {{ t('formDemo.formValidation') }} </ElButton>
    </div>
  </Form>
</template>

<style lang="less" scoped>
.is-required--item {
  position: relative;

  &::before {
    margin-right: 4px;
    color: var(--el-color-danger);
    content: '*';
  }
}
</style>
