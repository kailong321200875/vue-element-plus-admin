<script setup lang="ts">
import { Form } from '@/components/Form'
import { reactive, ref, unref } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useForm } from '@/hooks/web/useForm'
import { ElButton, ElInput, FormRules, ElMessage } from 'element-plus'
import { getCodeApi, registerApi } from '@/api/register'
import { useValidator } from '@/hooks/web/useValidator'
import { IUserModel } from '@/api-types/user'

const emit = defineEmits(['to-login'])

const { register, methods, elFormRef } = useForm()

const { getFormData } = methods

const { t } = useI18n()

const { required, lengthRange, notSpace, notSpecialCharacters, isEqual } = useValidator()

const schema = reactive<FormSchema[]>([
  {
    field: 'title',
    colProps: {
      span: 24
    }
  },
  {
    field: 'user_name',
    label: t('login.username'),
    value: '',
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      placeholder: t('login.usernamePlaceholder')
    }
  },
  {
    field: 'password',
    label: t('login.password'),
    value: '',
    component: 'InputPassword',
    colProps: {
      span: 24
    },
    componentProps: {
      style: {
        width: '100%'
      },
      strength: true,
      placeholder: t('login.passwordPlaceholder')
    }
  },
  {
    field: 'check_password',
    label: t('login.checkPassword'),
    value: '',
    component: 'InputPassword',
    colProps: {
      span: 24
    },
    componentProps: {
      style: {
        width: '100%'
      },
      strength: true,
      placeholder: t('login.passwordPlaceholder')
    }
  },
  {
    field: 'code',
    label: t('login.code'),
    colProps: {
      span: 24
    }
  },
  {
    field: 'register',
    colProps: {
      span: 24
    }
  }
])

const rules: FormRules = {
  user_name: [
    required('用户名不能为空'),
    {
      validator: (_, value, callback) =>
        lengthRange(value, callback, { min: 2, max: 10, message: '用户名长度必须在2-10之间' })
    },
    {
      validator: (_, value, callback) => notSpace(value, callback, '用户名不能有空格')
    }
  ],
  password: [
    required('密码不能为空'),
    {
      validator: (_, value, callback) =>
        lengthRange(value, callback, { min: 6, max: 20, message: '密码长度必须在6-20之间' })
    },
    {
      validator: (_, value, callback) => notSpecialCharacters(value, callback, '密码不能是特殊字符')
    }
  ],
  check_password: [
    required('确认密码不能为空'),
    {
      validator: (_, value, callback) =>
        lengthRange(value, callback, { min: 6, max: 20, message: '确认密码长度必须在6-20之间' })
    },
    {
      validator: (_, value, callback) =>
        notSpecialCharacters(value, callback, '确认密码不能是特殊字符')
    },
    {
      validator: async (_, value, callback) => {
        const formData = await getFormData<Omit<IUserModel, 'is_admin'>>()
        return isEqual(value, formData.password, callback, '两次密码不一致')
      }
    }
  ],
  code: [required('验证码不能为空')]
}

const toLogin = () => {
  emit('to-login')
}

const codeUrl = ref('')
const getCode = async () => {
  const { data } = await getCodeApi()
  codeUrl.value = data.result
}
getCode()

const loading = ref(false)

const loginRegister = async () => {
  const formRef = unref(elFormRef)
  formRef?.validate(async (valid) => {
    if (valid) {
      try {
        loading.value = true
        const formData = await getFormData<Omit<IUserModel, 'is_admin'>>()
        const { data } = await registerApi(formData)
        if (data) {
          ElMessage.success('注册成功')
          toLogin()
        }
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<template>
  <Form
    :schema="schema"
    :rules="rules"
    label-position="top"
    hide-required-asterisk
    size="large"
    class="dark:(border-1 border-[var(--el-border-color)] border-solid)"
    @register="register"
  >
    <template #title>
      <h2 class="text-2xl font-bold text-center w-[100%]">{{ t('login.register') }}</h2>
    </template>

    <template #code="form">
      <div class="w-[100%] flex">
        <ElInput v-model="form['code']" :placeholder="t('login.codePlaceholder')" class="flex-2" />
        <div v-html="codeUrl" class="h-38px flex-1 cursor-pointer" @click="getCode"></div>
      </div>
    </template>

    <template #register>
      <div class="w-[100%]">
        <ElButton type="primary" class="w-[100%]" :loading="loading" @click="loginRegister">
          {{ t('login.register') }}
        </ElButton>
      </div>
      <div class="w-[100%] mt-15px">
        <ElButton class="w-[100%]" @click="toLogin">
          {{ t('login.hasUser') }}
        </ElButton>
      </div>
    </template>
  </Form>
</template>
