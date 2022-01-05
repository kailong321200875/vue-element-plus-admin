<script setup lang="ts">
import { LoginForm } from './components'
import { ThemeSwitch } from '@/components/ThemeSwitch'
import { LocaleDropdown } from '@/components/LocaleDropdown'
import { useDesign } from '@/hooks/web/useDesign'
import { useI18n } from '@/hooks/web/useI18n'
import { underlineToHump } from '@/utils'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()

const { t } = useI18n()

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('login')
</script>

<template>
  <div :class="prefixCls" class="h-[100%] relative overflow-hidden <xl:bg-v-dark">
    <div class="relative h-full flex mx-auto">
      <div
        :class="`${prefixCls}__left`"
        class="flex-1 bg-gray-500 bg-opacity-20 relative p-30px <xl:hidden"
      >
        <div class="flex items-center text-white">
          <img src="@/assets/imgs/logo.png" alt="" class="w-48px h-48px mr-10px" />
          <span class="text-20px font-bold">{{ underlineToHump(appStore.getTitle) }}</span>
        </div>
        <div class="flex justify-center items-center h-[calc(100%-60px)]">
          <div>
            <img src="@/assets/svgs/login-box-bg.svg" alt="" class="w-350px" />
            <div class="text-3xl text-white">{{ t('login.welcome') }}</div>
            <div class="mt-5 font-normal text-white text-14px"> {{ t('login.message') }} </div>
          </div>
        </div>
      </div>
      <div class="flex-1 @2xl:p-30px @xl:p-30px @md:p-30px <md:pt-30px dark:bg-v-dark relative">
        <div class="flex justify-between items-center text-white @2xl:justify-end @xl:justify-end">
          <div class="flex items-center @2xl:hidden @xl:hidden">
            <img src="@/assets/imgs/logo.png" alt="" class="w-48px h-48px mr-10px" />
            <span class="text-20px font-bold">{{ underlineToHump(appStore.getTitle) }}</span>
          </div>

          <div class="flex justify-end items-center space-x-10px">
            <ThemeSwitch />
            <LocaleDropdown />
          </div>
        </div>
        <div
          :class="`${prefixCls}__form`"
          class="flex justify-center items-center <xl:(bg-white rounded-3xl) absolute top-[50%] left-[50%] w-[100%] @md:w-[calc(100%-60px)]"
        >
          <LoginForm class="p-20px" />
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
      background-image: url('@/assets/svgs/login-bg.svg');
      background-position: center;
      background-repeat: no-repeat;
      content: '';
    }
  }

  &__form {
    transform: translate(-50%, -50%);
  }
}
</style>
