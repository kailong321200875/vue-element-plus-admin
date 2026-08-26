<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { ElCheckbox, ElForm, ElFormItem, ElInput } from 'element-plus'
  import { useRouter } from 'vue-router'
  import { required, useForm } from '@vea/hooks'
  import { loginApi } from '@/api/login'
  import type { LoginParams } from '@/api/login/types'
  import { ElButton } from 'element-plus'
  import { useI18n } from 'vue-i18n'
  import { useUserStore } from '@/store/modules/user'
  import { ensureDynamicRoutes } from '@/permission'

  const emit = defineEmits(['to-register'])
  const userStore = useUserStore()
  const { currentRoute, push } = useRouter()
  const { t } = useI18n()

  const { state, actions } = useForm<LoginParams>({
    initialValues: { username: userStore.rememberedUsername || 'admin', password: 'admin' },
    rules: {
      username: required(() => t('common.required')),
      password: required(() => t('common.required'))
    }
  })
  const values = computed(() => state.values.value)
  const errors = computed(() => state.errors.value)
  const submitting = computed(() => state.submitting.value)
  const remember = ref(userStore.rememberMe)
  const redirect = computed(() => {
    const value = currentRoute.value.query.redirect
    return typeof value === 'string' ? value : ''
  })

  const login = async (formData: LoginParams) => {
    const res = await loginApi(formData)
    if (!res) return

    userStore.rememberUsername(formData.username, remember.value)
    userStore.setSession(res.data)
    try {
      await ensureDynamicRoutes()
      await push(redirect.value || '/')
    } catch (error) {
      userStore.clearSession()
      throw error
    }
  }

  const signIn = () => actions.submit(login)
</script>

<template>
  <ElForm
    :model="values"
    label-position="top"
    hide-required-asterisk
    size="large"
    class="login-form"
    @submit.prevent="signIn()"
  >
    <div class="form-intro">
      <span class="form-kicker">{{ t('login.welcome') }}</span>
      <h2>{{ t('login.login') }}</h2>
      <p>{{ t('login.message') }}</p>
    </div>

    <ElFormItem class="login-field" :label="t('login.username')" :error="errors.username?.[0]">
      <ElInput
        v-model="values.username"
        :placeholder="t('login.usernamePlaceholder')"
        autocomplete="username"
        :disabled="submitting"
        @input="actions.clearErrors('username')"
        @blur="actions.validateField('username')"
      />
    </ElFormItem>

    <ElFormItem class="login-field" :label="t('login.password')" :error="errors.password?.[0]">
      <ElInput
        v-model="values.password"
        type="password"
        show-password
        :placeholder="t('login.passwordPlaceholder')"
        autocomplete="current-password"
        :disabled="submitting"
        @input="actions.clearErrors('password')"
        @blur="actions.validateField('password')"
      />
    </ElFormItem>

    <div class="login-options">
      <ElCheckbox v-model="remember" :label="t('login.remember')" size="small" />
      <span class="secure-note"><i></i>SSL</span>
    </div>

    <ElButton native-type="submit" :loading="submitting" type="primary" class="login-submit">
      {{ t('login.login') }}
    </ElButton>

    <button type="button" class="register-link" @click="emit('to-register')">
      <span>{{ t('login.register') }}</span>
      <i aria-hidden="true">↗</i>
    </button>
  </ElForm>
</template>

<style lang="less" scoped>
  .login-form {
    width: 100%;
    color: var(--login-ink);
  }

  .form-intro {
    margin-bottom: 30px;

    h2 {
      margin: 7px 0 8px;
      font-family: 'Avenir Next', 'PingFang SC', 'Microsoft YaHei', sans-serif;
      font-size: clamp(30px, 3vw, 38px);
      font-weight: 720;
      line-height: 1.15;
      letter-spacing: -0.035em;
      color: var(--login-ink);
    }

    p {
      display: none;
      margin: 0;
      font-size: 14px;
      line-height: 1.65;
      color: var(--login-muted);
    }
  }

  .form-kicker {
    font-family: SFMono-Regular, Consolas, monospace;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.16em;
    color: var(--login-blue);
    text-transform: uppercase;
  }

  .login-field {
    margin-bottom: 21px;

    :deep(.el-form-item__label) {
      height: auto;
      padding: 0;
      margin-bottom: 8px;
      font-size: 13px;
      font-weight: 650;
      line-height: 1.3;
      color: var(--login-ink);
    }

    :deep(.el-input__wrapper) {
      min-height: 52px;
      padding: 0 15px;
      background: color-mix(in srgb, var(--login-panel) 72%, var(--login-card));
      border-radius: 14px;
      box-shadow: inset 0 0 0 1px var(--login-line);
      transition:
        box-shadow 180ms ease,
        transform 180ms ease,
        background-color 180ms ease;
    }

    :deep(.el-input__wrapper:hover) {
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--login-blue) 42%, var(--login-line));
    }

    :deep(.el-input__wrapper.is-focus) {
      background: var(--login-card);
      transform: translateY(-1px);
      box-shadow:
        inset 0 0 0 1.5px var(--login-blue),
        0 7px 20px rgb(52 126 223 / 10%);
    }

    :deep(.el-input__inner) {
      font-size: 14px;
      color: var(--login-ink);
    }

    :deep(.el-input__inner::placeholder) {
      color: color-mix(in srgb, var(--login-muted) 70%, transparent);
    }

    :deep(.el-form-item__error) {
      padding-top: 5px;
      font-size: 11px;
    }
  }

  .login-options {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 24px;
    margin-top: -2px;

    :deep(.el-checkbox__label) {
      font-size: 12px;
      color: var(--login-muted);
    }
  }

  .secure-note {
    display: flex;
    font-family: SFMono-Regular, Consolas, monospace;
    font-size: 9px;
    letter-spacing: 0.12em;
    color: var(--login-muted);
    gap: 6px;
    align-items: center;

    i {
      width: 6px;
      height: 6px;
      background: #2ecb8f;
      border-radius: 50%;
      box-shadow: 0 0 0 4px rgb(46 203 143 / 11%);
    }
  }

  .login-submit {
    width: 100%;
    min-height: 50px;
    margin-top: 24px;
    font-size: 14px;
    font-weight: 650;
    letter-spacing: 0.04em;
    border: 0;
    border-radius: 14px;
    box-shadow: 0 13px 28px color-mix(in srgb, var(--el-color-primary) 25%, transparent);
    transition:
      transform 180ms ease,
      box-shadow 180ms ease;

    &:hover:not(.is-disabled) {
      transform: translateY(-2px);
      box-shadow: 0 16px 34px color-mix(in srgb, var(--el-color-primary) 32%, transparent);
    }

    &:focus-visible {
      outline: 3px solid color-mix(in srgb, var(--el-color-primary) 24%, transparent);
      outline-offset: 3px;
    }
  }

  .register-link {
    display: flex;
    width: 100%;
    padding: 5px;
    margin-top: 20px;
    font: inherit;
    font-size: 12px;
    color: var(--login-muted);
    cursor: pointer;
    background: transparent;
    border: 0;
    transition: color 160ms ease;
    gap: 9px;
    align-items: center;
    justify-content: center;

    i {
      display: grid;
      width: 21px;
      height: 21px;
      font-style: normal;
      border: 1px solid var(--login-line);
      border-radius: 50%;
      transition:
        border-color 160ms ease,
        transform 160ms ease;
      place-items: center;
    }

    &:hover {
      color: var(--login-blue);

      i {
        border-color: var(--login-blue);
        transform: translate(2px, -2px);
      }
    }

    &:focus-visible {
      border-radius: 8px;
      outline: 2px solid var(--login-blue);
      outline-offset: 3px;
    }
  }

  @media (width <= 860px) {
    .form-intro p {
      display: block;
    }
  }

  @media (width <= 520px) {
    .form-intro {
      margin-bottom: 25px;

      h2 {
        font-size: 30px;
      }
    }

    .login-field {
      margin-bottom: 18px;

      :deep(.el-input__wrapper) {
        min-height: 50px;
      }
    }

    .login-submit {
      margin-top: 22px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .login-submit,
    .register-link,
    .register-link i,
    .login-field :deep(.el-input__wrapper) {
      transition: none;
    }
  }
</style>
