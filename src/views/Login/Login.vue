<script setup lang="ts">
import { LoginForm } from './components'
// import { ElCard } from 'element-plus'
// import { ThemeSwitch } from '@/components/ThemeSwitch'
// import { LocaleDropdown } from '@/components/LocaleDropdown'
// import { SizeDropdown } from '@/components/SizeDropdown'
import { useDesign } from '@/hooks/web/useDesign'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('login')
</script>

<template>
  <div :class="prefixCls" class="h-[100%] relative">
    <div class="relative h-full flex mx-auto border-dark-50 border-2px">
      <div
        :class="`${prefixCls}__left`"
        class="flex-1 bg-gray-500 bg-opacity-20 relative p-30px <xl:hidden"
      >
        <div class="flex items-center text-white">
          <img src="@/assets/imgs/logo.png" alt="" class="w-48px h-48px mr-10px" />
          <span class="text-20px font-bold">ButterflyAdmin</span>
        </div>
        <div :class="`${prefixCls}__left--message`" class="absolute top-[50%] left-[50%]">
          <img src="@/assets/svgs/login-box-bg.svg" alt="" class="w-350px" />
          <div class="text-3xl text-white">{{ t('login.message1') }}</div>
          <div class="mt-5 font-normal text-white text-14px"> {{ t('login.message2') }} </div>
        </div>
      </div>
      <div :class="`${prefixCls}__right`" class="flex-1 p-30px relative">
        <div :class="`${prefixCls}__form`" class="absolute top-[50%] left-[50%] w-[40%]">
          <LoginForm />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-login';

.@{prefix-cls} {
  &__left {
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      background-image: url('@/assets/svgs/login-dark-bg.svg');
      background-position: center;
      background-repeat: no-repeat;
      content: '';
    }

    &--message {
      transform: translate(-50%, -50%);
    }
  }

  &__form {
    transform: translate(-50%, -50%);
  }
}
</style>
